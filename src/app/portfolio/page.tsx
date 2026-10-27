import type { Metadata } from "next";
import PortfolioClient from "../PortfolioClient";
import { getPageSEO } from "@/lib/seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('/portfolio');
  return {
    title: seo.title || "Portfolio | Techtonic",
    description: seo.metaDescription || "Explore Techtonic's portfolio of successful projects in software development, robotics & automation, and enterprise consultancy.",
    alternates: { canonical: "/portfolio" },
    openGraph: {
      title: seo.metaTitle || "Portfolio | Techtonic",
      description: seo.metaDescription || "Explore Techtonic's portfolio of successful projects in software, robotics, and consultancy.",
      type: "website",
      url: `${siteUrl}/portfolio`,
      siteName: "Techtonic",
      images: [{ url: seo.heroImageUrl || "/og-default.png", width: 1200, height: 630, alt: "Techtonic Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Portfolio | Techtonic",
      description: seo.metaDescription || "Explore Techtonic's portfolio of successful projects in software, robotics, and consultancy.",
      images: [seo.heroImageUrl || "/og-default.png"],
    },
  };
}

export default function PortfolioPage() {
  return <PortfolioClient />;
}
