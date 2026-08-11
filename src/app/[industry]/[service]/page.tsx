import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import ServiceLanding from "@/components/ServiceLanding";
import { safeJsonLd } from "@/lib/utils-jsonld";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

// ISR: revalidate every hour
export const revalidate = 3600;

type Props = {
  params: Promise<{ industry: string; service: string }>;
};

export async function generateStaticParams() {
  try {
    const pages = await db.servicePage.findMany({
      where: { isActive: true },
      select: { industrySlug: true, serviceSlug: true },
    });
    return pages.map((p) => ({
      industry: p.industrySlug,
      service: p.serviceSlug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry, service } = await params;

  try {
    const page = await db.servicePage.findUnique({
      where: {
        industrySlug_serviceSlug: {
          industrySlug: industry,
          serviceSlug: service,
        },
      },
      select: {
        metaTitle: true,
        metaDescription: true,
        title: true,
        heroDescription: true,
      },
    });

    if (!page) {
      return { title: "Not Found", robots: { index: false } };
    }

    const rawTitle = page.metaTitle || page.title;
    // Strip trailing site name if present (template adds it)
    const title = rawTitle.replace(/\s*\|\s*Techtonic\s*$/i, "").trim();
    const description =
      page.metaDescription ||
      page.heroDescription?.slice(0, 160) ||
      `${page.title} by Techtonic`;

    return {
      title,
      description,
      alternates: {
        canonical: `/${industry}/${service}`,
      },
      openGraph: {
        title: `${title} | Techtonic`,
        description,
        type: "website",
        images: [
          {
            url: "/og-default.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Techtonic`,
        description,
        images: ["/og-default.png"],
      },
    };
  } catch {
    return { title: "Service", robots: { index: false } };
  }
}

export default async function ServicePage({ params }: Props) {
  const { industry, service } = await params;

  let page;
  let industryData;

  try {
    page = await db.servicePage.findUnique({
      where: {
        industrySlug_serviceSlug: {
          industrySlug: industry,
          serviceSlug: service,
        },
      },
    });

    if (!page || !page.isActive) {
      notFound();
    }

    industryData = await db.industry.findUnique({
      where: { slug: industry },
    });
  } catch {
    notFound();
  }

  if (!page || !industryData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.heroDescription || page.bodyContent || "",
    provider: {
      "@type": "Organization",
      name: "Techtonic",
      url: siteUrl,
    },
    areaServed: {
      "@type": "Industry",
      name: industryData.name,
    },
    serviceType: page.heroTitle || "",
    url: `${siteUrl}/${industry}/${service}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <ServiceLanding
        industry={{
          name: industryData.name,
          slug: industryData.slug,
          description: industryData.description || "",
        }}
        servicePage={{
          title: page.title,
          heroTitle: page.heroTitle || page.title,
          heroSubtitle: page.heroSubtitle || "",
          heroDescription: page.heroDescription || "",
          bodyContent: page.bodyContent || "",
          features: (page.features as string[]) || [],
          techStack: (page.techStack as string[]) || [],
          ctaText: page.ctaText || "Get Started",
          ctaLink: page.ctaLink || "/contact",
        }}
      />
    </>
  );
}
