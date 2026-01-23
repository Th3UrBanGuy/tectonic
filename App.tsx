import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { ContentProvider } from './components/ContentContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SystemStatusWrapper from './components/SystemStatusWrapper';
import { AnimatePresence } from 'framer-motion';
import PageSkeleton from './components/ui/PageSkeleton';
import ContactTopBar from './components/layout/ContactTopBar';

// Pages (Lazy Loaded)
const Home = React.lazy(() => import('./pages/Home'));
const Wings = React.lazy(() => import('./pages/Wings'));
const Innovation = React.lazy(() => import('./pages/Innovation'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Company = React.lazy(() => import('./pages/Company'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const ContentWrapper = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <SystemStatusWrapper>
      <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white dark:bg-dark-bg dark:text-gray-100 transition-colors duration-500">
        {!isDashboard && (
          <>
            <ContactTopBar />
            <Navbar theme={theme} toggleTheme={toggleTheme} className="top-10" />
          </>
        )}
        {/* Added flex-grow to ensure footer pushes down and pt-0 to allow hero sections to touch top if needed, 
            but ensured z-index layering is correct. Added pt-10 to account for ContactBar header. */}
        <main className={`flex-grow relative z-0 ${isDashboard ? 'h-screen' : 'pt-10'}`}>
          <React.Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/wings" element={<Wings />} />
                <Route path="/innovation" element={<Innovation />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/company" element={<Company />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </AnimatePresence>
          </React.Suspense>
        </main>
        {!isDashboard && <Footer />}
      </div>
    </SystemStatusWrapper>
  );
};



function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <ContentProvider>
          <ContentWrapper />
        </ContentProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;