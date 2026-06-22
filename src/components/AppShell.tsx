"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { ThemeProvider, useTheme } from "@/tectonic/components/ThemeContext";
import { AuthProvider } from "@/tectonic/components/AuthContext";
import { ContentProvider } from "@/tectonic/components/ContentContext";
import SystemStatusWrapper from "@/tectonic/components/SystemStatusWrapper";
import ScrollToTop from "@/tectonic/components/ScrollToTop";
import ContactTopBar from "@/tectonic/components/layout/ContactTopBar";
import Navbar from "@/tectonic/components/layout/Navbar";
import Footer from "@/tectonic/components/layout/Footer";

/**
 * AppShell — the shared client-side chrome for every Next.js route.
 *
 * Replaces the old HashRouter `ContentWrapper` from App.tsx:
 *  - wraps the tree in Theme/Auth/Content providers
 *  - runs SystemStatusWrapper + ScrollToTop
 *  - conditionally renders ContactTopBar + Navbar + Footer
 *    (hidden on /login and /dashboard, matching the original layout)
 *  - animates page enter transitions keyed by pathname
 */
function Chrome({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname() ?? "/";
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  return (
    <SystemStatusWrapper>
      <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white dark:bg-dark-bg dark:text-gray-100 transition-colors duration-500">
        <ScrollToTop />

        {!isDashboard && !isLogin && (
          <>
            <ContactTopBar />
            <Navbar theme={theme} toggleTheme={toggleTheme} className="top-10" />
          </>
        )}

        <main
          className={`flex-grow relative z-0 ${
            isDashboard || isLogin ? "h-screen" : "pt-10"
          }`}
        >
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        </main>

        {!isDashboard && !isLogin && <Footer />}
      </div>
    </SystemStatusWrapper>
  );
}

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <Chrome>{children}</Chrome>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
