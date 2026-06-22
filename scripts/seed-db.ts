/**
 * Tectonic Database Seed Script — Prisma-based (production-safe)
 *
 * Uses Prisma Client (same as the app) instead of raw pg,
 * so it handles Neon SSL, pooling, and connection strings correctly.
 *
 * Usage: bun run seed:db
 *
 * Make sure .env has the correct DATABASE_URL before running.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// ── Static data imports (used ONLY for seeding — not by the app) ────────
import { WINGS } from "../src/tectonic/data/wings";
import { PROJECTS } from "../src/tectonic/data/projects";
import { TEAM } from "../src/tectonic/data/team";
import { PARTNERSHIPS } from "../src/tectonic/data/partnerships";
import { TIMELINE } from "../src/tectonic/data/timeline";
import {
  INNOVATION_TECH_STACK,
  INNOVATION_ROADMAP,
} from "../src/tectonic/data/pages/innovation";
import { CONTACT_INFO } from "../src/tectonic/data/pages/contact";
import { HOME_CONTENT } from "../src/tectonic/data/pages/home";
import { COMPANY_CONTENT, COMPANY_ACHIEVEMENTS } from "../src/tectonic/data/pages/company";
import { PORTFOLIO_CONTENT } from "../src/tectonic/data/pages/portfolio";

// ── Prisma client ───────────────────────────────────────────────────────
const db = new PrismaClient({
  log: ["error"],
});

// ── Main ────────────────────────────────────────────────────────────────
async function main() {
  console.log("Connecting to Neon PostgreSQL via Prisma...");
  // Test connection
  await db.$connect();
  console.log("✓ Connected\n");

  // 0. Clear all content tables (clean slate)
  console.log("Clearing all content tables...");
  await db.wing.deleteMany({});
  await db.project.deleteMany({});
  await db.partner.deleteMany({});
  await db.leader.deleteMany({});
  await db.roadmapItem.deleteMany({});
  await db.techEcosystem.deleteMany({});
  await db.companyMission.deleteMany({});
  await db.socialPlatform.deleteMany({});
  await db.siteSetting.deleteMany({});
  console.log("  ✓ all content tables cleared");

  // 1. Admin user
  console.log("\nSeeding admin user...");
  const passwordHash = await bcrypt.hash("admin123", 12);
  await db.user.upsert({
    where: { email: "admin@tectonic.com" },
    update: { passwordHash, name: "Administrator", role: "admin", isActive: true },
    create: { email: "admin@tectonic.com", passwordHash, name: "Administrator", role: "admin", isActive: true },
  });
  console.log("  ✓ admin@tectonic.com user seeded");

  // 2. Wings
  console.log("\nSeeding wings...");
  for (const wing of WINGS) {
    await db.wing.create({
      data: {
        slug: wing.id,
        name: wing.name,
        tagline: wing.tagline || null,
        description: wing.description || null,
        iconName: wing.icon?.name || "Code",
        colorTheme: wing.color || "text-cyan-500",
        techStack: wing.techStack || [],
        features: wing.features || [],
        teamName: wing.teamName || null,
        teamLogoUrl: wing.teamLogo || null,
        teamSubtitle: wing.teamSubtitle || null,
        teamPurpose: wing.teamPurpose || null,
        teamTimeline: wing.teamTimeline || [],
        teamAchievements: wing.teamAchievements || [],
      },
    });
  }
  console.log(`  ✓ ${WINGS.length} wings seeded`);

  // 3. Projects
  console.log("\nSeeding projects...");
  for (const project of PROJECTS) {
    await db.project.create({
      data: {
        slug: project.id,
        title: project.title,
        category: project.category,
        clientName: project.client,
        challengeDesc: project.challenge,
        solutionDesc: project.solution,
        impactDesc: project.impact,
        imageUrl: project.image,
        featured: !!project.links?.live,
      },
    });
  }
  console.log(`  ✓ ${PROJECTS.length} projects seeded`);

  // 4. Partners
  console.log("\nSeeding partners...");
  for (let i = 0; i < PARTNERSHIPS.length; i++) {
    const p = PARTNERSHIPS[i];
    await db.partner.create({
      data: {
        name: p.name,
        logoUrl: p.logo,
        category: p.category,
        description: p.description,
        sinceDate: new Date(`${p.since}-01-01`),
        isActive: true,
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${PARTNERSHIPS.length} partners seeded`);

  // 5. Leadership / Team
  console.log("\nSeeding leadership team...");
  for (let i = 0; i < TEAM.length; i++) {
    const m = TEAM[i];
    await db.leader.create({
      data: {
        name: m.name,
        role: m.role,
        bio: m.bio,
        imageUrl: m.image,
        socialLinks: m.website ? { website: m.website } : {},
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${TEAM.length} leaders seeded`);

  // 6. Roadmap
  console.log("\nSeeding roadmap items...");
  for (let i = 0; i < INNOVATION_ROADMAP.length; i++) {
    const r = INNOVATION_ROADMAP[i];
    const year = parseInt(r.quarter.match(/\d{4}/)?.[0] || "2025", 10);
    await db.roadmapItem.create({
      data: {
        quarter: r.quarter,
        year,
        title: r.title,
        description: r.description,
        progress: r.progress,
        status: r.status,
        colorTheme: r.colorTheme,
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${INNOVATION_ROADMAP.length} roadmap items seeded`);

  // 7. Tech ecosystem
  console.log("\nSeeding tech ecosystem...");
  for (let i = 0; i < INNOVATION_TECH_STACK.length; i++) {
    const t = INNOVATION_TECH_STACK[i];
    await db.techEcosystem.create({
      data: {
        name: t.name,
        version: t.version,
        status: t.status,
        iconName: t.iconName,
        colorClass: t.color,
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${INNOVATION_TECH_STACK.length} tech ecosystem items seeded`);

  // 8. Timeline → company_missions
  console.log("\nSeeding timeline (company_missions)...");
  for (let i = 0; i < TIMELINE.length; i++) {
    const m = TIMELINE[i];
    await db.companyMission.create({
      data: {
        title: m.title,
        description: m.description,
        iconName: "Clock",
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${TIMELINE.length} timeline milestones seeded`);

  // 9. Site settings
  console.log("\nSeeding site settings...");
  await db.siteSetting.create({ data: { key: "site_name", value: "Techtonic", type: "text", description: "Site name" } });
  await db.siteSetting.create({ data: { key: "site_tagline", value: "Architecting Tomorrow", type: "text", description: "Site tagline" } });
  await db.siteSetting.create({ data: { key: "contact_email", value: CONTACT_INFO.contact.email, type: "text", description: "Contact email" } });
  await db.siteSetting.create({ data: { key: "contact_phone", value: CONTACT_INFO.contact.phone, type: "text", description: "Contact phone" } });
  await db.siteSetting.create({ data: { key: "address", value: JSON.stringify(CONTACT_INFO.address), type: "json", description: "Company address" } });
  await db.siteSetting.create({ data: { key: "home_content", value: JSON.stringify(HOME_CONTENT), type: "json", description: "Home page content" } });
  await db.siteSetting.create({ data: { key: "contact_info", value: JSON.stringify(CONTACT_INFO), type: "json", description: "Contact info config" } });
  await db.siteSetting.create({ data: { key: "company_content", value: JSON.stringify({ content: COMPANY_CONTENT, achievements: COMPANY_ACHIEVEMENTS }), type: "json", description: "Company page content + achievements" } });
  await db.siteSetting.create({ data: { key: "portfolio_content", value: JSON.stringify(PORTFOLIO_CONTENT), type: "json", description: "Portfolio page content" } });
  console.log("  ✓ 9 site settings seeded");

  // 10. Social platforms
  console.log("\nSeeding social platforms...");
  const socials = Object.entries(CONTACT_INFO.socials);
  const iconMap: Record<string, string> = {
    facebook: "Facebook", linkedin: "Linkedin", whatsapp: "MessageCircle",
    twitter: "Twitter", instagram: "Instagram", github: "Github",
  };
  for (let i = 0; i < socials.length; i++) {
    const [platform, url] = socials[i];
    await db.socialPlatform.create({
      data: {
        platformName: platform,
        url,
        iconName: iconMap[platform] || "Globe",
        isActive: true,
        orderIndex: i,
      },
    });
  }
  console.log(`  ✓ ${socials.length} social platforms seeded`);

  // ── Verify ───────────────────────────────────────────────────────────
  console.log("\n════════════════════════════════════════");
  console.log("VERIFICATION — row counts after seeding:");
  console.log("════════════════════════════════════════");
  const counts = {
    users: await db.user.count(),
    wings: await db.wing.count(),
    projects: await db.project.count(),
    partners: await db.partner.count(),
    leadership: await db.leader.count(),
    roadmap_items: await db.roadmapItem.count(),
    tech_ecosystem: await db.techEcosystem.count(),
    company_missions: await db.companyMission.count(),
    site_settings: await db.siteSetting.count(),
    social_platforms: await db.socialPlatform.count(),
    contact_submissions: await db.contactSubmission.count(),
  };
  for (const [table, count] of Object.entries(counts)) {
    console.log(`  ${table}: ${count} rows`);
  }

  await db.$disconnect();
  console.log("\n✓ Seed complete. Database disconnected.");
}

main().catch((err) => {
  console.error("✗ Seed failed:", err.message);
  process.exit(1);
});
