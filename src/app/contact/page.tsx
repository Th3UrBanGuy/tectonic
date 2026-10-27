import type { Metadata } from "next";
import ContactClient from "../ContactClient";
import { getPageSEO } from "@/lib/seo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('/contact');
  return {
    title: seo.title || "Contact | Techtonic",
    description: seo.metaDescription || "Get in touch with Techtonic for software development, robotics & automation, and consultancy inquiries. Book a consultation today.",
    alternates: { canonical: "/contact" },
    openGraph: {
      title: seo.metaTitle || "Contact Us | Techtonic",
      description: seo.metaDescription || "Get in touch with Techtonic for software development, robotics & automation, and consultancy inquiries.",
      type: "website",
      url: `${siteUrl}/contact`,
      siteName: "Techtonic",
      images: [{ url: seo.heroImageUrl || "/og-default.png", width: 1200, height: 630, alt: "Contact Techtonic" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "Contact Us | Techtonic",
      description: seo.metaDescription || "Get in touch with Techtonic for software development, robotics & automation, and consultancy inquiries.",
      images: [seo.heroImageUrl || "/og-default.png"],
    },
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
