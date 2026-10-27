import type { Metadata } from "next";
import CompanyClient from "../CompanyClient";
import { getPageSEO } from "@/lib/seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('/company');
  return {
    title: seo.title || "Company | Techtonic",
    description: seo.metaDescription || "Learn about Techtonic's mission, executive leadership team, certifications, and our commitment to architecting tomorrow's infrastructure.",
    alternates: { canonical: "/company" },
    openGraph: {
      title: seo.metaTitle || "Company | Techtonic",
      description: seo.metaDescription || "Learn about Techtonic's mission, executive leadership team, and certifications.",
      type: "website",
      url: `${siteUrl}/company`,
      siteName: "Techtonic",
      images: [{ url: seo.heroImageUrl || "/og-default.png", width: 1200, height: 630, alt: "Techtonic Company" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Company | Techtonic",
      description: seo.metaDescription || "Learn about Techtonic's mission, executive leadership team, and certifications.",
      images: [seo.heroImageUrl || "/og-default.png"],
    },
  };
}

export default function CompanyPage() {
  return <CompanyClient />;
}
