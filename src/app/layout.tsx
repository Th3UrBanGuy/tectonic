import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

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

export const metadata: Metadata = {
  title: "Techtonic | Architecting Tomorrow",
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
  openGraph: {
    title: "Techtonic | Architecting Tomorrow",
    description: "Architecting Tomorrow's Infrastructure",
    siteName: "Techtonic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techtonic | Architecting Tomorrow",
    description: "Architecting Tomorrow's Infrastructure",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
