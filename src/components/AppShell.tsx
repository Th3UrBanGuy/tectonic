"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
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

// 404 context — not-found page sets this to true
const NotFoundContext = createContext<{ is404: boolean; set404: (v: boolean) => void }>({ is404: false, set404: () => {} });
export const useNotFound = () => useContext(NotFoundContext);

/**
 * Preloader — shows the Tectonic opening animation on:
 *   1. First page load (new session)
 *   2. User-triggered refresh (F5, Ctrl+R, browser button)
 *   3. Navigation to /wings (masks hydration)
 *   NOT on normal client-side navigation to other pages.
 */
function Preloader({ children }: { children: React.ReactNode }) {
  const { contentLoaded } = useContent();
  const pathname = usePathname() ?? "/";
  const isWings = pathname.startsWith("/wings");

  const [minTimePassed, setMinTimePassed] = useState(false);
  // false = show loader, true = show children
  // Starts false on BOTH server and client → no hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);

  // After hydration, decide whether to skip the loader
  useEffect(() => {
    const isRefresh = performance.getEntriesByType('navigation')[0]?.type === 'reload';

    if (isRefresh) {
      sessionStorage.removeItem('tectonic_loader_done');
      setSkipLoader(false);
    } else if (sessionStorage.getItem('tectonic_loader_done')) {
      setSkipLoader(true);
    }

    setMounted(true);
  }, []);

  // Show loader when navigating TO /wings
  useEffect(() => {
    if (isWings && mounted) {
      setSkipLoader(false);
      setMinTimePassed(false);
    }
  }, [isWings, mounted]);

  const showLoader = mounted ? !skipLoader : true;

  // Minimum display time for the animation (2.5 seconds)
  useEffect(() => {
    if (!showLoader) return;
    const timer = setTimeout(() => setMinTimePassed(true), 2500);
    return () => clearTimeout(timer);
  }, [showLoader]);

  // Hide loader when both: content is loaded AND minimum time has passed
  useEffect(() => {
    if (showLoader && mounted && contentLoaded && minTimePassed) {
      const fadeTimer = setTimeout(() => {
        setSkipLoader(true);
        sessionStorage.setItem('tectonic_loader_done', '1');
      }, 300);
      return () => clearTimeout(fadeTimer);
    }
  }, [showLoader, mounted, contentLoaded, minTimePassed]);

  // During SSR and before hydration: always show loader (server + client match)
  // After hydration: show loader or children based on skipLoader
  if (!mounted || showLoader) {
    return (
      <div
        style={{
          transition: "opacity 0.4s ease",
          opacity: mounted && contentLoaded && minTimePassed ? 0 : 1,
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
  const { is404, set404 } = useNotFound();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  // Reset 404 on navigation
  useEffect(() => {
    set404(false);
  }, [pathname, set404]);

  return (
    <SystemStatusWrapper>
      <Preloader>
        <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white dark:bg-dark-bg dark:text-gray-100 transition-colors duration-500">
          <ScrollToTop />

          {!isDashboard && !isLogin && !is404 && (
            <>
              <ContactTopBar />
              <Navbar theme={theme} toggleTheme={toggleTheme} className="top-10" />
            </>
          )}

          <main
            className={`flex-grow relative z-0 ${
              isDashboard || isLogin ? "h-screen" : is404 ? "" : "pt-10"
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

          {!isDashboard && !isLogin && !is404 && <Footer />}
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
  const [is404, set404] = useState(false);
  return (
    <NotFoundContext.Provider value={{ is404, set404 }}>
      <ThemeProvider>
        <AuthProvider>
          <ContentProvider>
            <Chrome>{children}</Chrome>
          </ContentProvider>
        </AuthProvider>
      </ThemeProvider>
    </NotFoundContext.Provider>
  );
}
