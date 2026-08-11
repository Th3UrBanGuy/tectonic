import { safeJsonLd } from "@/lib/utils-jsonld";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

// ─── Unified Entity Graph ─────────────────────────────────────────────
// All schemas share @id references so Google processes them as ONE entity.
// Organization is the root node; WebSite and SiteNavigationElement reference it.

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Techtonic",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo-dark.png`,
    width: 512,
    height: 512,
  },
  description:
    "Modern enterprise platform showcasing software development, robotics & automation, and consultancy services.",
  sameAs: [
    "https://www.linkedin.com/company/tect0nic",
    "https://www.facebook.com/tect0nic",
    "https://www.instagram.com/tect0nic",
    "https://x.com/tect0nic",
    "https://github.com/Th3UrBanGuy",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "tect0nic.official2026@gmail.com",
    availableLanguage: ["English"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
  },
  areaServed: {
    "@type": "Country",
    name: "Global",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: "Techtonic",
  url: siteUrl,
  description:
    "Architecting Tomorrow's Infrastructure - software development, robotics & automation, and consultancy services.",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en-US",
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "@id": `${siteUrl}/#navigation`,
  name: ["Home", "Company", "Wings", "Portfolio", "Contact"],
  url: [
    `${siteUrl}/`,
    `${siteUrl}/company`,
    `${siteUrl}/wings`,
    `${siteUrl}/portfolio`,
    `${siteUrl}/contact`,
  ],
  isPartOf: {
    "@id": `${siteUrl}/#website`,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(siteNavigationSchema) }}
      />
    </>
  );
}
