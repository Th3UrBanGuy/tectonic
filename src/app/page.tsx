import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getPageSEO } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('/');
  return {
    title: seo.title || "Architecting Tomorrow",
    description: seo.metaDescription || "Techtonic architects tomorrow's infrastructure through integrated software development, robotics & automation, and enterprise consultancy services.",
    alternates: { canonical: "/" },
    openGraph: {
      title: seo.metaTitle || "Techtonic | Architecting Tomorrow",
      description: seo.metaDescription || "Integrated software development, robotics & automation, and enterprise consultancy services.",
      type: "website",
      images: [{ url: seo.heroImageUrl || "/og-default.png", width: 1200, height: 630, alt: "Techtonic - Architecting Tomorrow" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Techtonic | Architecting Tomorrow",
      description: seo.metaDescription || "Integrated software development, robotics & automation, and enterprise consultancy services.",
      images: [seo.heroImageUrl || "/og-default.png"],
    },
  };
}

export default function HomePage() {
  return <HomeClient />;
}
