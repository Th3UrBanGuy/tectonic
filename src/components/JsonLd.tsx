import { safeJsonLd } from "@/lib/utils-jsonld";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Techtonic",
  url: siteUrl,
  logo: `${siteUrl}/logo-dark.png`,
  description:
    "Modern enterprise platform showcasing software development, robotics & automation, and consultancy services.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Techtonic",
  url: siteUrl,
  description:
    "Architecting Tomorrow's Infrastructure - software development, robotics & automation, and consultancy services.",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/portfolio?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
    </>
  );
}
