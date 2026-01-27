import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { ContentProvider } from './components/ContentContext';
import { AuthProvider } from './components/AuthContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SystemStatusWrapper from './components/SystemStatusWrapper';
import { AnimatePresence, motion } from 'framer-motion';
import PageSkeleton from './components/ui/PageSkeleton';
import ContactTopBar from './components/layout/ContactTopBar';
import ScrollToTop from './components/ScrollToTop';

// Auth
import ProtectedRoute from './components/ProtectedRoute';

// Pages (Lazy Loaded)
const Home = React.lazy(() => import('./pages/Home'));
const Wings = React.lazy(() => import('./pages/Wings'));
const Innovation = React.lazy(() => import('./pages/Innovation'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Company = React.lazy(() => import('./pages/Company'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));

const ContentWrapper = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isLogin = location.pathname === '/login';

  return (
    <SystemStatusWrapper>
      <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-white dark:bg-dark-bg dark:text-gray-100 transition-colors duration-500">
        {!isDashboard && !isLogin && (
          <>
            <ContactTopBar />
            <Navbar theme={theme} toggleTheme={toggleTheme} className="top-10" />
          </>
        )}
        <main className={`flex-grow relative z-0 ${isDashboard || isLogin ? 'h-screen' : 'pt-10'}`}>
          <React.Suspense fallback={<PageSkeleton />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <Routes location={location}>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/wings" element={<Wings />} />
                  <Route path="/innovation" element={<Innovation />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:id" element={<ProjectDetail />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />

                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute requireAdmin>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </React.Suspense>
        </main>
        {!isDashboard && !isLogin && <Footer />}
      </div>
    </SystemStatusWrapper>
  );
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <ContentProvider>
            <ContentWrapper />
          </ContentProvider>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;