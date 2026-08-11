import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

/**
 * GET /api/content?type=wings|projects|team|partnerships|timeline|techStack|roadmap|settings|contactConfig|homeContent
 *
 * Public: returns the content for the given entity type from the database.
 * If no type is given, returns a summary of counts.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  try {
    // ── Wings ─────────────────────────────────────────────────────────
    if (type === "wings") {
      const rows = await db.wing.findMany({ orderBy: { id: "asc" } });
      return NextResponse.json({
        data: rows.map((w) => ({
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
      });
    }

    // ── Projects ──────────────────────────────────────────────────────
    if (type === "projects") {
      const rows = await db.project.findMany({ orderBy: { id: "asc" } });
      return NextResponse.json({
        data: rows.map((p) => ({
          id: p.slug,
          title: p.title,
          category: p.category || "Software",
          client: p.clientName || "",
          challenge: p.challengeDesc || "",
          solution: p.solutionDesc || "",
          impact: p.impactDesc || "",
          image: p.imageUrl || "",
          links: p.featured ? { live: "#" } : undefined,
        })),
      });
    }

    // ── Team (leadership) ─────────────────────────────────────────────
    if (type === "team") {
      const rows = await db.leader.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({
        data: rows.map((l) => ({
          id: String(l.id),
          name: l.name,
          role: l.role,
          bio: l.bio || "",
          image: l.imageUrl || "",
          website:
            (l.socialLinks as any)?.website ||
            (l.socialLinks as any)?.linkedin ||
            "",
        })),
      });
    }

    // ── Partnerships ──────────────────────────────────────────────────
    if (type === "partnerships") {
      const rows = await db.partner.findMany({
        orderBy: { orderIndex: "asc" },
      });
      return NextResponse.json({
        data: rows.map((p) => ({
          id: String(p.id),
          name: p.name,
          logo: p.logoUrl || "",
          category: p.category || "",
          description: p.description || "",
          since: p.sinceDate
            ? new Date(p.sinceDate).getFullYear().toString()
            : "",
        })),
      });
    }

    // ── Timeline (company_missions) ───────────────────────────────────
    if (type === "timeline") {
      const rows = await db.companyMission.findMany({
        orderBy: { orderIndex: "asc" },
      });
      return NextResponse.json({
        data: rows.map((m) => ({
          year: "",
          title: m.title,
          description: m.description || "",
        })),
      });
    }

    // ── Tech Stack (tech_ecosystem) ───────────────────────────────────
    if (type === "techStack") {
      const rows = await db.techEcosystem.findMany({
        orderBy: { orderIndex: "asc" },
      });
      return NextResponse.json({
        data: rows.map((t) => ({
          id: String(t.id),
          name: t.name,
          version: t.version || "",
          status: t.status || "",
          iconName: t.iconName || "Code",
          color: t.colorClass || "text-cyan-400",
          order: t.orderIndex || 0,
        })),
      });
    }

    // ── Roadmap ───────────────────────────────────────────────────────
    if (type === "roadmap") {
      const rows = await db.roadmapItem.findMany({
        orderBy: { orderIndex: "asc" },
      });
      return NextResponse.json({
        data: rows.map((r) => ({
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
      });
    }

    // ── Site Settings ─────────────────────────────────────────────────
    if (type === "settings") {
      const rows = await db.siteSetting.findMany();
      const settings: Record<string, any> = {};
      for (const r of rows) {
        try {
          settings[r.key] = r.type === "json" ? JSON.parse(r.value || "{}") : r.value;
        } catch {
          settings[r.key] = r.value;
        }
      }
      return NextResponse.json({ data: settings });
    }

    // ── Contact Config ────────────────────────────────────────────────
    if (type === "contactConfig") {
      const row = await db.siteSetting.findUnique({
        where: { key: "contact_info" },
      });
      if (row) {
        try {
          return NextResponse.json({ data: JSON.parse(row.value || "{}") });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ data: null });
    }

    // ── Home Content ──────────────────────────────────────────────────
    if (type === "homeContent") {
      const row = await db.siteSetting.findUnique({
        where: { key: "home_content" },
      });
      if (row) {
        try {
          return NextResponse.json({ data: JSON.parse(row.value || "{}") });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ data: null });
    }

    // ── Company Content ───────────────────────────────────────────────
    if (type === "companyContent") {
      const row = await db.siteSetting.findUnique({
        where: { key: "company_content" },
      });
      if (row) {
        try {
          return NextResponse.json({ data: JSON.parse(row.value || "{}") });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ data: null });
    }

    // ── Portfolio Content ─────────────────────────────────────────────
    if (type === "portfolioContent") {
      const row = await db.siteSetting.findUnique({
        where: { key: "portfolio_content" },
      });
      if (row) {
        try {
          return NextResponse.json({ data: JSON.parse(row.value || "{}") });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ data: null });
    }

    // ── Industries ────────────────────────────────────────────────────
    if (type === "industries") {
      const rows = await db.industry.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({
        data: rows.map((i) => ({
          id: i.slug,
          slug: i.slug,
          name: i.name,
          description: i.description || "",
          metaTitle: i.metaTitle || "",
          metaDescription: i.metaDescription || "",
          icon: i.icon || "Building",
          orderIndex: i.orderIndex || 0,
        })),
      });
    }

    // ── Service Pages ─────────────────────────────────────────────────
    if (type === "servicePages") {
      const rows = await db.servicePage.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({
        data: rows.map((sp) => ({
          id: String(sp.id),
          industrySlug: sp.industrySlug,
          serviceSlug: sp.serviceSlug,
          title: sp.title,
          metaTitle: sp.metaTitle || "",
          metaDescription: sp.metaDescription || "",
          heroTitle: sp.heroTitle || "",
          heroSubtitle: sp.heroSubtitle || "",
          heroDescription: sp.heroDescription || "",
          bodyContent: sp.bodyContent || "",
          features: sp.features || [],
          techStack: sp.techStack || [],
          ctaText: sp.ctaText || "",
          ctaLink: sp.ctaLink || "",
          imageUrl: sp.imageUrl || "",
          isActive: sp.isActive !== false,
          orderIndex: sp.orderIndex || 0,
        })),
      });
    }

    // ── Company Stats ─────────────────────────────────────────────────
    if (type === "companyStats") {
      const rows = await db.companyStat.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({
        data: rows.map((s) => ({
          id: String(s.id),
          label: s.label,
          value: s.value,
          suffix: s.suffix || "",
          iconName: s.iconName || "TrendingUp",
          orderIndex: s.orderIndex || 0,
        })),
      });
    }

    // ── Certifications ────────────────────────────────────────────────
    if (type === "certifications") {
      const rows = await db.certification.findMany({ orderBy: { orderIndex: "asc" } });
      return NextResponse.json({
        data: rows.map((c) => ({
          id: String(c.id),
          name: c.name || "",
          issuer: c.issuer || "",
          date: c.date ? new Date(c.date).toISOString().split("T")[0] : "",
          description: c.description || "",
          orderIndex: c.orderIndex || 0,
        })),
      });
    }

    // ── Pages (SEO Meta) ──────────────────────────────────────────────
    if (type === "pages") {
      const rows = await db.page.findMany();
      return NextResponse.json({
        data: rows.map((p) => ({
          id: String(p.id),
          routePath: p.routePath,
          title: p.title,
          metaTitle: p.metaTitle || "",
          metaDescription: p.metaDescription || "",
          heroTitle: p.heroTitle || "",
          heroSubtitle: p.heroSubtitle || "",
          heroText: p.heroText || "",
          heroImageUrl: p.heroImageUrl || "",
        })),
      });
    }

    // ── Section Visibility ──────────────────────────────────────────────
    if (type === "sections") {
      const rows = await db.sectionVisibility.findMany({ orderBy: { order: "asc" } });
      return NextResponse.json({
        data: rows.map((s) => ({
          id: String(s.id),
          page: s.page,
          section: s.section,
          label: s.label,
          visible: s.visible,
          order: s.order,
        })),
      });
    }

    // ── Counts (no type) ──────────────────────────────────────────────
    const [
      wingsCount, projectsCount, teamCount, partnersCount,
      timelineCount, techCount, roadmapCount, contactCount, userCount,
    ] = await Promise.all([
      db.wing.count(), db.project.count(), db.leader.count(),
      db.partner.count(), db.companyMission.count(),
      db.techEcosystem.count(), db.roadmapItem.count(),
      db.contactSubmission.count(), db.user.count(),
    ]);

    return NextResponse.json({
      counts: {
        wings: wingsCount, projects: projectsCount, team: teamCount,
        partnerships: partnersCount, timeline: timelineCount,
        techStack: techCount, roadmap: roadmapCount,
        inquiries: contactCount, users: userCount,
      },
    });
  } catch (error) {
    console.error("Content API GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/content?type=... — admin-only bulk replace or settings update.
 *
 * For entity types (wings, projects, team, etc.): replaces ALL rows with
 * the provided data array. This is the "full sync" approach — the
 * dashboard sends the complete array and the DB is replaced.
 *
 * For settings/contactConfig/homeContent: upserts the JSON value.
 */
export async function PUT(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type) {
    return NextResponse.json({ error: "type is required" }, { status: 400 });
  }

  // Validate type is one of the allowed values
  const validTypes = ["wings", "projects", "team", "partnerships", "timeline", "techStack", "roadmap", "settings", "contactConfig", "homeContent", "companyContent", "portfolioContent", "industries", "servicePages", "companyStats", "certifications", "pages", "sections"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const data = body.data || body;

  // Security: limit array size to prevent DOS (max 1000 items)
  if (Array.isArray(data) && data.length > 1000) {
    return NextResponse.json(
      { error: "Too many items (max 1000)" },
      { status: 400 }
    );
  }

  try {
    // ── Wings ─────────────────────────────────────────────────────────
    if (type === "wings") {
      await db.wing.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const w = data[i];
        await db.wing.create({
          data: {
            slug: w.id || `wing_${Date.now()}_${i}`,
            name: w.name || "",
            tagline: w.tagline || null,
            description: w.description || null,
            iconName: typeof w.icon === "string" ? w.icon : (w.icon?.name || "Code"),
            colorTheme: w.color || "text-cyan-500",
            techStack: w.techStack || [],
            features: w.features || [],
            teamName: w.teamName || null,
            teamLogoUrl: w.teamLogo || null,
            teamSubtitle: w.teamSubtitle || null,
            teamPurpose: w.teamPurpose || null,
            teamTimeline: w.teamTimeline || [],
            teamAchievements: w.teamAchievements || [],
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Projects ──────────────────────────────────────────────────────
    if (type === "projects") {
      await db.project.deleteMany({});
      for (const p of data) {
        await db.project.create({
          data: {
            slug: p.id || `proj_${Date.now()}`,
            title: p.title || "",
            category: p.category || "Software",
            clientName: p.client || null,
            challengeDesc: p.challenge || null,
            solutionDesc: p.solution || null,
            impactDesc: p.impact || null,
            imageUrl: p.image || null,
            featured: !!p.links?.live,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Team (leadership) ─────────────────────────────────────────────
    if (type === "team") {
      await db.leader.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const m = data[i];
        await db.leader.create({
          data: {
            name: m.name || "",
            role: m.role || "",
            bio: m.bio || null,
            imageUrl: m.image || null,
            socialLinks: m.website ? { website: m.website } : {},
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Partnerships ──────────────────────────────────────────────────
    if (type === "partnerships") {
      await db.partner.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const p = data[i];
        await db.partner.create({
          data: {
            name: p.name || "",
            logoUrl: p.logo || null,
            category: p.category || null,
            description: p.description || null,
            sinceDate: p.since ? new Date(`${p.since}-01-01`) : null,
            isActive: true,
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Timeline (company_missions) ───────────────────────────────────
    if (type === "timeline") {
      await db.companyMission.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const m = data[i];
        await db.companyMission.create({
          data: {
            title: m.title || "",
            description: m.description || null,
            iconName: "Clock",
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Tech Stack (tech_ecosystem) ───────────────────────────────────
    if (type === "techStack") {
      await db.techEcosystem.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const t = data[i];
        await db.techEcosystem.create({
          data: {
            name: t.name || "",
            version: t.version || null,
            status: t.status || null,
            iconName: t.iconName || "Code",
            colorClass: t.color || "text-cyan-400",
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Roadmap ───────────────────────────────────────────────────────
    if (type === "roadmap") {
      await db.roadmapItem.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const r = data[i];
        const year = parseInt(r.quarter?.match(/\d{4}/)?.[0] || "2025", 10);
        await db.roadmapItem.create({
          data: {
            quarter: r.quarter || null,
            year: year || null,
            title: r.title || "",
            description: r.description || null,
            progress: r.progress || 0,
            status: r.status || "SCHEDULED",
            colorTheme: r.colorTheme || null,
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Site Settings ─────────────────────────────────────────────────
    if (type === "settings") {
      const { siteName, siteTagline, contactEmail, contactPhone } = data;
      if (siteName !== undefined)
        await upsertSetting("site_name", String(siteName), "text", "Site name");
      if (siteTagline !== undefined)
        await upsertSetting("site_tagline", String(siteTagline), "text", "Site tagline");
      if (contactEmail !== undefined)
        await upsertSetting("contact_email", String(contactEmail), "text", "Contact email");
      if (contactPhone !== undefined)
        await upsertSetting("contact_phone", String(contactPhone), "text", "Contact phone");
      return NextResponse.json({ success: true });
    }

    // ── Contact Config ────────────────────────────────────────────────
    if (type === "contactConfig") {
      await upsertSetting("contact_info", JSON.stringify(data), "json", "Contact info config");
      return NextResponse.json({ success: true });
    }

    // ── Home Content ──────────────────────────────────────────────────
    if (type === "homeContent") {
      await upsertSetting("home_content", JSON.stringify(data), "json", "Home page content");
      return NextResponse.json({ success: true });
    }

    // ── Company Content ───────────────────────────────────────────────
    if (type === "companyContent") {
      await upsertSetting("company_content", JSON.stringify(data), "json", "Company page content");
      return NextResponse.json({ success: true });
    }

    // ── Portfolio Content ─────────────────────────────────────────────
    if (type === "portfolioContent") {
      await upsertSetting("portfolio_content", JSON.stringify(data), "json", "Portfolio page content");
      return NextResponse.json({ success: true });
    }

    // ── Industries ────────────────────────────────────────────────────
    if (type === "industries") {
      await db.industry.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const ind = data[i];
        await db.industry.create({
          data: {
            slug: ind.slug || ind.id || `industry_${Date.now()}_${i}`,
            name: ind.name || "",
            description: ind.description || null,
            metaTitle: ind.metaTitle || null,
            metaDescription: ind.metaDescription || null,
            icon: ind.icon || "Building",
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Service Pages ─────────────────────────────────────────────────
    if (type === "servicePages") {
      await db.servicePage.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const sp = data[i];
        await db.servicePage.create({
          data: {
            industrySlug: sp.industrySlug || "",
            serviceSlug: sp.serviceSlug || "",
            title: sp.title || "",
            metaTitle: sp.metaTitle || null,
            metaDescription: sp.metaDescription || null,
            heroTitle: sp.heroTitle || null,
            heroSubtitle: sp.heroSubtitle || null,
            heroDescription: sp.heroDescription || null,
            bodyContent: sp.bodyContent || null,
            features: sp.features || [],
            techStack: sp.techStack || [],
            ctaText: sp.ctaText || null,
            ctaLink: sp.ctaLink || null,
            imageUrl: sp.imageUrl || null,
            isActive: sp.isActive !== false,
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Company Stats ─────────────────────────────────────────────────
    if (type === "companyStats") {
      await db.companyStat.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const s = data[i];
        await db.companyStat.create({
          data: {
            label: s.label || "",
            value: s.value || "",
            suffix: s.suffix || null,
            iconName: s.iconName || "TrendingUp",
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Certifications ────────────────────────────────────────────────
    if (type === "certifications") {
      await db.certification.deleteMany({});
      for (let i = 0; i < data.length; i++) {
        const c = data[i];
        await db.certification.create({
          data: {
            name: c.name || "",
            issuer: c.issuer || null,
            date: c.date ? new Date(c.date) : null,
            description: c.description || null,
            orderIndex: i,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Pages (SEO Meta) ──────────────────────────────────────────────
    if (type === "pages") {
      await db.page.deleteMany({});
      for (const p of data) {
        await db.page.create({
          data: {
            routePath: p.routePath || "/",
            title: p.title || "",
            metaTitle: p.metaTitle || null,
            metaDescription: p.metaDescription || null,
            heroTitle: p.heroTitle || null,
            heroSubtitle: p.heroSubtitle || null,
            heroText: p.heroText || null,
            heroImageUrl: p.heroImageUrl || null,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    // ── Section Visibility (toggle on/off) ──────────────────────────────
    if (type === "sections") {
      for (const s of data) {
        await db.sectionVisibility.upsert({
          where: { page_section: { page: s.page, section: s.section } },
          update: { visible: s.visible, label: s.label, order: s.order ?? 0 },
          create: {
            page: s.page,
            section: s.section,
            label: s.label || "",
            visible: s.visible ?? true,
            order: s.order ?? 0,
          },
        });
      }
      return NextResponse.json({ success: true, count: data.length });
    }

    return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
  } catch (error) {
    console.error("Content API PUT error:", error);
    return NextResponse.json(
      { error: "Failed to save content" },
      { status: 500 }
    );
  }
}

// Helper: upsert a site_setting row
async function upsertSetting(key: string, value: string, type: string, description: string) {
  await db.siteSetting.upsert({
    where: { key },
    update: { value, type, description, updatedAt: new Date() },
    create: { key, value, type, description },
  });
}
