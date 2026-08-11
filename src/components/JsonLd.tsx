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
    "@type": "World",
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

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: ["Home", "Company", "Wings", "Portfolio", "Contact"],
  url: [
    `${siteUrl}/`,
    `${siteUrl}/company`,
    `${siteUrl}/wings`,
    `${siteUrl}/portfolio`,
    `${siteUrl}/contact`,
  ],
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
