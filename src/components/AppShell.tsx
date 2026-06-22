"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { ThemeProvider, useTheme } from "@/tectonic/components/ThemeContext";
import { AuthProvider } from "@/tectonic/components/AuthContext";
import { ContentProvider, useContent } from "@/tectonic/components/ContentContext";
import SystemStatusWrapper from "@/tectonic/components/SystemStatusWrapper";
import ScrollToTop from "@/tectonic/components/ScrollToTop";
import ContactTopBar from "@/tectonic/components/layout/ContactTopBar";
import Navbar from "@/tectonic/components/layout/Navbar";
import Footer from "@/tectonic/components/layout/Footer";
import Loader from "@/tectonic/components/Loader";

/**
 * Preloader — shows the Tectonic opening animation on the FIRST page load.
 *
 * The animation plays for a minimum of 2.5 seconds (even if content loads
 * faster), then fades out. On subsequent navigations, the preloader does
 * NOT show (content is already cached in localStorage).
 */
function Preloader({ children }: { children: React.ReactNode }) {
  const { contentLoaded } = useContent();
  const [showLoader, setShowLoader] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);

  // Minimum display time for the animation (2.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setMinTimePassed(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Hide loader when both: content is loaded AND minimum time has passed
  useEffect(() => {
    if (contentLoaded && minTimePassed) {
      // Small delay for a smooth fade-out
      const fadeTimer = setTimeout(() => setShowLoader(false), 300);
      return () => clearTimeout(fadeTimer);
    }
  }, [contentLoaded, minTimePassed]);

  if (showLoader) {
    return (
      <div
        style={{
          transition: "opacity 0.4s ease",
          opacity: contentLoaded && minTimePassed ? 0 : 1,
        }}
      >
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * AppShell — the shared client-side chrome for every Next.js route.
 */
function Chrome({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname() ?? "/";
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  return (
    <SystemStatusWrapper>
      <Preloader>
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
      </Preloader>
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
