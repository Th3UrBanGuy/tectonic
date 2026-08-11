import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const sections = [
  // ── Layout ──────────────────────────────────────────────────────────
  { page: "layout", section: "topbar", label: "Contact Top Bar", order: 0 },
  { page: "layout", section: "navbar", label: "Navigation Bar", order: 1 },
  { page: "layout", section: "navHome", label: "Nav — Home", order: 2 },
  { page: "layout", section: "navWings", label: "Nav — Wings", order: 3 },
  { page: "layout", section: "navPortfolio", label: "Nav — Portfolio", order: 4 },
  { page: "layout", section: "navCompany", label: "Nav — Company", order: 5 },
  { page: "layout", section: "navContact", label: "Nav — Contact CTA", order: 6 },
  { page: "layout", section: "navDashboard", label: "Nav — Client Access", order: 7 },
  { page: "layout", section: "footer", label: "Footer", order: 8 },
  { page: "layout", section: "footerEcosystem", label: "Footer — Ecosystem Links", order: 9 },
  { page: "layout", section: "footerCompany", label: "Footer — Company Links", order: 10 },
  { page: "layout", section: "footerConnect", label: "Footer — Connect Info", order: 11 },
  { page: "layout", section: "footerCopyright", label: "Footer — Copyright Bar", order: 12 },
  // ── Home ────────────────────────────────────────────────────────────
  { page: "home", section: "hero", label: "Hero Section", order: 0 },
  { page: "home", section: "deliver", label: "What We Deliver", order: 1 },
  { page: "home", section: "wings", label: "Our Wings", order: 2 },
  { page: "home", section: "projects", label: "Featured Projects", order: 3 },
  { page: "home", section: "techStack", label: "Tech Stack", order: 4 },
  { page: "home", section: "roadmap", label: "Roadmap", order: 5 },
  { page: "home", section: "partners", label: "Partners", order: 6 },
  // ── Company ─────────────────────────────────────────────────────────
  { page: "company", section: "hero", label: "Hero Section", order: 0 },
  { page: "company", section: "stats", label: "Company Stats", order: 1 },
  { page: "company", section: "mission", label: "Mission & Vision", order: 2 },
  { page: "company", section: "leadership", label: "Executive Leadership", order: 3 },
  { page: "company", section: "certifications", label: "Certifications & Awards", order: 4 },
  { page: "company", section: "certGallery", label: "Certification Gallery", order: 5 },
  { page: "company", section: "timeline", label: "Company Timeline", order: 6 },
  // ── Portfolio ───────────────────────────────────────────────────────
  { page: "portfolio", section: "hero", label: "Hero Section", order: 0 },
  { page: "portfolio", section: "projects", label: "Projects Grid", order: 1 },
  // ── Wings ───────────────────────────────────────────────────────────
  { page: "wings", section: "hero", label: "Hero Section", order: 0 },
  { page: "wings", section: "grid", label: "Wings Grid", order: 1 },
  // ── Contact ─────────────────────────────────────────────────────────
  { page: "contact", section: "hero", label: "Hero Section", order: 0 },
  { page: "contact", section: "form", label: "Contact Form", order: 1 },
];

async function main() {
  for (const s of sections) {
    await db.sectionVisibility.upsert({
      where: { page_section: { page: s.page, section: s.section } },
      update: { label: s.label, order: s.order },
      create: { ...s, visible: true },
    });
  }
  console.log(`✓ ${sections.length} sections seeded`);
  await db.$disconnect();
}

main().catch(console.error);
