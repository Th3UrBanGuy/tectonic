import { db } from "@/lib/db";

export interface PageSEO {
  routePath: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroText: string;
  heroImageUrl: string;
}

const DEFAULTS: Record<string, Partial<PageSEO>> = {
  '/': {
    title: 'Architecting Tomorrow',
    metaTitle: 'Techtonic | Architecting Tomorrow',
    metaDescription: 'Techtonic architects tomorrow\'s infrastructure through integrated software development, robotics & automation, and enterprise consultancy services.',
    heroTitle: 'ARCHITECTING',
    heroSubtitle: 'TOMORROW',
    heroText: 'Architecting tomorrow\'s infrastructure.',
  },
  '/company': {
    title: 'Company',
    metaTitle: 'Company | Techtonic',
    metaDescription: 'Learn about Techtonic\'s mission, executive leadership team, certifications, and our commitment to architecting tomorrow\'s infrastructure.',
  },
  '/wings': {
    title: 'Wings',
    metaTitle: 'Wings | Techtonic',
    metaDescription: 'Explore Techtonic\'s specialized wings — software development, cybersecurity, robotics, and more.',
  },
  '/portfolio': {
    title: 'Portfolio',
    metaTitle: 'Portfolio | Techtonic',
    metaDescription: 'Explore Techtonic\'s portfolio of innovative projects across software, security, robotics, and consultancy.',
  },
  '/contact': {
    title: 'Contact',
    metaTitle: 'Contact | Techtonic',
    metaDescription: 'Get in touch with Techtonic for software development, cybersecurity, robotics, and consultancy services.',
  },
  '/login': {
    title: 'Login',
    metaTitle: 'Login | Techtonic',
    metaDescription: 'Access your Techtonic client portal.',
  },
};

export async function getPageSEO(routePath: string): Promise<PageSEO> {
  const defaults = DEFAULTS[routePath] || {};

  try {
    const row = await db.siteSetting.findUnique({
      where: { key: 'seo_pages' },
    });

    if (row) {
      const pages = JSON.parse(row.value || '[]');
      const found = pages.find((p: any) => p.routePath === routePath);
      if (found) {
        return {
          routePath,
          title: found.title || defaults.title || '',
          metaTitle: found.metaTitle || defaults.metaTitle || '',
          metaDescription: found.metaDescription || defaults.metaDescription || '',
          heroTitle: found.heroTitle || defaults.heroTitle || '',
          heroSubtitle: found.heroSubtitle || defaults.heroSubtitle || '',
          heroText: found.heroText || defaults.heroText || '',
          heroImageUrl: found.heroImageUrl || '',
        };
      }
    }
  } catch {
    // DB unavailable — use defaults
  }

  return {
    routePath,
    title: defaults.title || '',
    metaTitle: defaults.metaTitle || '',
    metaDescription: defaults.metaDescription || '',
    heroTitle: defaults.heroTitle || '',
    heroSubtitle: defaults.heroSubtitle || '',
    heroText: defaults.heroText || '',
    heroImageUrl: defaults.heroImageUrl || '',
  };
}
