import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * GET /api/content/all — returns ALL content in a SINGLE request.
 *
 * This replaces 12 separate API calls with 1, reducing latency from
 * 12 × (round-trip + Prisma query) to 1 × (round-trip + parallel queries).
 *
 * Public endpoint — no auth needed (read-only content).
 * Response is cached client-side for 60 seconds via localStorage.
 */
export async function GET() {
  try {
    // Run ALL queries in parallel — Prisma handles connection pooling
    const [
      wings, projects, team, partnerships, timeline,
      techStack, roadmap, settingsRows,
    ] = await Promise.all([
      db.wing.findMany({ orderBy: { id: "asc" } }),
      db.project.findMany({ orderBy: { id: "asc" } }),
      db.leader.findMany({ orderBy: { orderIndex: "asc" } }),
      db.partner.findMany({ orderBy: { orderIndex: "asc" } }),
      db.companyMission.findMany({ orderBy: { orderIndex: "asc" } }),
      db.techEcosystem.findMany({ orderBy: { orderIndex: "asc" } }),
      db.roadmapItem.findMany({ orderBy: { orderIndex: "asc" } }),
      db.siteSetting.findMany(),
    ]);

    // Parse settings into a key-value object
    const settings: Record<string, any> = {};
    for (const r of settingsRows) {
      try {
        settings[r.key] = r.type === "json" ? JSON.parse(r.value || "{}") : r.value;
      } catch {
        settings[r.key] = r.value;
      }
    }

    // Build the response — all content in one JSON payload
    return NextResponse.json({
      // Entity arrays
      wings: wings.map((w) => ({
        id: w.slug,
        name: w.name,
        tagline: w.tagline || "",
        description: w.description || "",
        icon: w.iconName || "Code",
        color: w.colorTheme || "text-cyan-500",
        techStack: w.techStack as string[],
        features: (w.features as string[]) || [],
        teamName: w.teamName || undefined,
        teamLogo: w.teamLogoUrl || undefined,
        teamSubtitle: w.teamSubtitle || undefined,
        teamPurpose: w.teamPurpose || undefined,
        teamTimeline: (w.teamTimeline as any[]) || [],
        teamAchievements: (w.teamAchievements as string[]) || [],
      })),
      projects: projects.map((p) => ({
        id: p.slug,
        title: p.title,
        category: p.category || "Software",
        client: p.clientName || "",
        challenge: p.challengeDesc || "",
        solution: p.solutionDesc || "",
        impact: p.impactDesc || "",
        // Prevent base64 images from bloating the response (use empty string instead)
        image: (p.imageUrl && !p.imageUrl.startsWith("data:")) ? p.imageUrl : "",
        links: p.featured ? { live: "#" } : undefined,
      })),
      team: team.map((l) => ({
        id: String(l.id),
        name: l.name,
        role: l.role,
        bio: l.bio || "",
        image: l.imageUrl || "",
        website: (l.socialLinks as any)?.website || (l.socialLinks as any)?.linkedin || "",
      })),
      partnerships: partnerships.map((p) => ({
        id: String(p.id),
        name: p.name,
        logo: p.logoUrl || "",
        category: p.category || "",
        description: p.description || "",
        since: p.sinceDate ? new Date(p.sinceDate).getFullYear().toString() : "",
      })),
      timeline: timeline.map((m) => ({
        year: "",
        title: m.title,
        description: m.description || "",
      })),
      techStack: techStack.map((t) => ({
        id: String(t.id),
        name: t.name,
        version: t.version || "",
        status: t.status || "",
        iconName: t.iconName || "Code",
        color: t.colorClass || "text-cyan-400",
        order: t.orderIndex || 0,
      })),
      roadmap: roadmap.map((r) => ({
        id: String(r.id),
        refId: r.quarter || "",
        quarter: r.quarter || "",
        title: r.title,
        description: r.description || "",
        progress: r.progress || 0,
        status: (r.status as any) || "SCHEDULED",
        colorTheme: r.colorTheme || "from-blue-600/20 to-blue-900/10",
        order: r.orderIndex || 0,
      })),

      // Page content (from settings JSON)
      homeContent: settings.home_content || null,
      companyContent: settings.company_content || null,
      portfolioContent: settings.portfolio_content || null,
      contactConfig: settings.contact_info || null,

      // Site settings
      siteSettings: {
        siteName: settings.site_name || "Techtonic",
        siteTagline: settings.site_tagline || "Architecting Tomorrow",
        maintenanceMode: false,
        allowRegistration: false,
      },

      // System status
      systemStatus: settings.system_status || "live",

      // Timestamp for cache validation
      fetchedAt: Date.now(),
    });
  } catch (error) {
    console.error("Batch content API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}
