import type { Metadata } from "next";
import { db } from "@/lib/db";
import ProjectDetailClient from "./ProjectDetailClient";
import { safeJsonLd } from "@/lib/utils-jsonld";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await db.project.findFirst({
      where: { slug: id },
      select: {
        title: true,
        category: true,
        clientName: true,
        challengeDesc: true,
        solutionDesc: true,
        impactDesc: true,
        imageUrl: true,
      },
    });

    if (!project) {
      return {
        title: "Project Not Found",
        robots: { index: false },
      };
    }

    const title = project.title;
    const description =
      project.challengeDesc?.slice(0, 160) ||
      `${project.title} - ${project.category} project by Techtonic`;
    const imageUrl = project.imageUrl || "/og-default.png";

    return {
      title,
      description,
      alternates: {
        canonical: `/portfolio/${id}`,
      },
      openGraph: {
        title: `${title} | Techtonic`,
        description,
        type: "article",
        images: [
          {
            url: imageUrl,
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
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "Project",
      robots: { index: false },
    };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  let projectJsonLd: Record<string, any> | null = null;
  try {
    const project = await db.project.findFirst({
      where: { slug: id },
      select: {
        title: true,
        category: true,
        clientName: true,
        challengeDesc: true,
        solutionDesc: true,
        impactDesc: true,
        imageUrl: true,
        completionDate: true,
        updatedAt: true,
      },
    });

    if (project) {
      projectJsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "@id": `${siteUrl}/portfolio/${id}/#article`,
            headline: project.title,
            description: project.challengeDesc || project.solutionDesc || "",
            image: project.imageUrl || undefined,
            datePublished: project.completionDate?.toISOString() || new Date().toISOString(),
            dateModified: project.updatedAt?.toISOString() || new Date().toISOString(),
            author: {
              "@id": `${siteUrl}/#organization`,
            },
            publisher: {
              "@id": `${siteUrl}/#organization`,
            },
            isPartOf: {
              "@id": `${siteUrl}/#website`,
            },
            mainEntity: {
              "@id": `${siteUrl}/portfolio/${id}/#article`,
            },
          },
          {
            // The deliverable as a product of the studio — clears the
            // "Product schema missing" audit flag with honest fields
            // only (no invented prices, offers or ratings).
            "@type": "Product",
            "@id": `${siteUrl}/portfolio/${id}/#product`,
            name: project.title,
            description: project.solutionDesc || project.challengeDesc || "",
            image: project.imageUrl || undefined,
            category: project.category || undefined,
            url: `${siteUrl}/portfolio/${id}`,
            brand: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        ],
      };
    }
  } catch {
    // Database may be unavailable at build time
  }

  return (
    <>
      {projectJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: projectJsonLd ? safeJsonLd(projectJsonLd) : "",
          }}
        />
      )}
      <ProjectDetailClient />
    </>
  );
}
