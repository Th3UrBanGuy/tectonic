import type { Metadata } from "next";
import WingsClient from "../WingsClient";
import { getPageSEO } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('/wings');
  return {
    title: seo.title || "Wings",
    description: seo.metaDescription || "Explore Techtonic's specialized wings - software development, robotics & automation, security, and consultancy teams driving innovation.",
    alternates: { canonical: "/wings" },
    openGraph: {
      title: seo.metaTitle || "Wings | Techtonic",
      description: seo.metaDescription || "Explore Techtonic's specialized wings driving innovation in software, robotics, security, and consultancy.",
      type: "website",
      images: [{ url: seo.heroImageUrl || "/og-default.png", width: 1200, height: 630, alt: "Techtonic Wings" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Wings | Techtonic",
      description: seo.metaDescription || "Explore Techtonic's specialized wings driving innovation in software, robotics, security, and consultancy.",
      images: [seo.heroImageUrl || "/og-default.png"],
    },
  };
}

export default function WingsPage() {
  return <WingsClient />;
}
