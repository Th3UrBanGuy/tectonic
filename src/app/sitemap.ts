import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/company`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/wings`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const [projects, industries, servicePages] = await Promise.all([
      db.project.findMany({
        select: { slug: true, updatedAt: true },
        orderBy: { id: "asc" },
      }),
      db.industry.findMany({
        select: { slug: true },
        orderBy: { orderIndex: "asc" },
      }),
      db.servicePage.findMany({
        where: { isActive: true },
        select: {
          industrySlug: true,
          serviceSlug: true,
          updatedAt: true,
        },
        orderBy: { orderIndex: "asc" },
      }),
    ]);

    const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${BASE_URL}/portfolio/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    const industryPages: MetadataRoute.Sitemap = industries.map((i) => ({
      url: `${BASE_URL}/${i.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    const servicePagesSitemap: MetadataRoute.Sitemap = servicePages.map(
      (sp) => ({
        url: `${BASE_URL}/${sp.industrySlug}/${sp.serviceSlug}`,
        lastModified: sp.updatedAt ? new Date(sp.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    );

    return [
      ...staticPages,
      ...projectPages,
      ...industryPages,
      ...servicePagesSitemap,
    ];
  } catch {
    // Database may be unavailable at build time — return static pages only
    return staticPages;
  }
}
