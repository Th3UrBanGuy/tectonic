import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import IndustryPageClient from "./IndustryPageClient";
import { safeJsonLd } from "@/lib/utils-jsonld";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export const revalidate = 3600;

type Props = {
  params: Promise<{ industry: string }>;
};

export async function generateStaticParams() {
  try {
    const industries = await db.industry.findMany({
      select: { slug: true },
    });
    return industries.map((i) => ({ industry: i.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;

  try {
    const ind = await db.industry.findUnique({
      where: { slug: industry },
      select: {
        name: true,
        metaTitle: true,
        metaDescription: true,
        description: true,
      },
    });

    if (!ind) {
      return { title: "Not Found", robots: { index: false } };
    }

    const rawTitle = ind.metaTitle || `${ind.name} Solutions`;
    const title = rawTitle.replace(/\s*\|\s*Techtonic\s*$/i, "").trim();
    const description =
      ind.metaDescription ||
      ind.description?.slice(0, 160) ||
      `${ind.name} software solutions by Techtonic`;

    return {
      title,
      description,
      alternates: {
        canonical: `/${industry}`,
      },
      openGraph: {
        title: `${title} | Techtonic`,
        description,
        type: "website",
        images: [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630, alt: `${title} - Techtonic` }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} | Techtonic`,
        description,
        images: [`${siteUrl}/og-default.png`],
      },
    };
  } catch {
    return { title: "Industry", robots: { index: false } };
  }
}

export default async function IndustryIndexPage({ params }: Props) {
  const { industry } = await params;

  let industryData;
  let servicePages;

  try {
    industryData = await db.industry.findUnique({
      where: { slug: industry },
    });

    if (!industryData) {
      notFound();
    }

    servicePages = await db.servicePage.findMany({
      where: { industrySlug: industry, isActive: true },
      orderBy: { orderIndex: "asc" },
    });
  } catch {
    notFound();
  }

  if (!industryData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/${industry}/#page`,
    name: `${industryData.name} Solutions`,
    description: industryData.description || `Software solutions for ${industryData.name}`,
    url: `${siteUrl}/${industry}`,
    isPartOf: {
      "@id": `${siteUrl}/#website`,
    },
    about: {
      "@id": `${siteUrl}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${industryData.name} Services`,
      numberOfItems: servicePages.length,
      itemListElement: servicePages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/${industry}/${p.serviceSlug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: industryData.name,
        item: `${siteUrl}/${industry}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd) }}
      />
      <IndustryPageClient
        industry={{
          name: industryData.name,
          slug: industryData.slug,
          description: industryData.description || "",
        }}
        servicePages={servicePages.map((p) => ({
          slug: p.serviceSlug,
          title: p.title,
          heroTitle: p.heroTitle || p.title,
          heroSubtitle: p.heroSubtitle || "",
          heroDescription: p.heroDescription || "",
          ctaLink: `/${industry}/${p.serviceSlug}`,
        }))}
      />
    </>
  );
}
