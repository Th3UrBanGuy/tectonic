import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Orbitron, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tect0nic.com";

export const metadata: Metadata = {
  title: {
    default: "Techtonic | Architecting Tomorrow",
    template: "%s | Techtonic",
  },
  description:
    "Techtonic is a modern enterprise platform showcasing software development, robotics & automation, and consultancy services. Architecting Tomorrow's Infrastructure.",
  keywords: [
    "Techtonic",
    "software development",
    "robotics",
    "automation",
    "consultancy",
    "enterprise",
    "infrastructure",
  ],
  authors: [{ name: "Techtonic" }],
  icons: {
    icon: "/logo-dark.png",
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    title: "Techtonic | Architecting Tomorrow",
    description: "Architecting Tomorrow's Infrastructure",
    siteName: "Techtonic",
    type: "website",
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Techtonic - Architecting Tomorrow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techtonic | Architecting Tomorrow",
    description: "Architecting Tomorrow's Infrastructure",
    images: [`${siteUrl}/og-default.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION
      ? { other: { "ahrefs-site-verification": process.env.NEXT_PUBLIC_AHREFS_SITE_VERIFICATION } }
      : {}),
  },
};

// Apply the persisted theme before hydration to avoid a flash of the wrong theme.
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('techtonic-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'dark');
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  } catch (e) {}
})();
`;

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";
const ahrefsKey = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${montserrat.variable} antialiased`}
      >
        <JsonLd />
        <AppShell>{children}</AppShell>
        <SpeedInsights />

        {/* Google Analytics — loaded after interactive to avoid main thread blocking */}
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', { send_page_view: false });
              `}
            </Script>
          </>
        )}

        {/* Ahrefs Analytics — loaded after interactive */}
        {ahrefsKey && (
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={ahrefsKey}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
