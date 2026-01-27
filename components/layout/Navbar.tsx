import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, Sun, Moon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WINGS } from '../../data/wings';
import TectonicLogo from './TectonicLogo';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${className} ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-4 shadow-sm dark:shadow-none' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo - Anchored Left */}
        <Link to="/" className="flex items-center group relative z-20">
          <TectonicLogo />
        </Link>

        {/* Desktop Menu - Floating Central Dock */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 bg-white/80 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-full px-8 py-3 backdrop-blur-lg shadow-lg shadow-slate-200/50 dark:shadow-black/50 z-20">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-[11px] font-mono font-bold tracking-widest text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors relative group">
              HOME
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
            </Link>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-[11px] font-mono font-bold tracking-widest text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors">
                <span>WINGS</span>
                <ChevronDown size={10} />
              </button>
              {/* Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-64 bg-white dark:bg-black/90 border border-slate-200 dark:border-white/10 rounded-lg p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 backdrop-blur-xl shadow-xl">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white dark:bg-black border-t border-l border-slate-200 dark:border-white/10 rotate-45"></div>
                {WINGS.map((wing) => (
                  <Link
                    key={wing.id}
                    to={`/wings?id=${wing.id}`}
                    className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 group/item transition-colors border-l-2 border-transparent hover:border-brand-500 rounded-md"
                  >
                    <div className="font-mono text-xs font-bold text-slate-800 dark:text-white group-hover/item:text-brand-600 dark:group-hover/item:text-brand-400 transition-colors">{wing.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-gray-500 font-mono uppercase tracking-wide mt-1">{wing.tagline}</div>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/innovation" className="text-[11px] font-mono font-bold tracking-widest text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors relative group">
              INNOVATION
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
            </Link>
            <Link to="/portfolio" className="text-[11px] font-mono font-bold tracking-widest text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors relative group">
              PORTFOLIO
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
            </Link>
            <Link to="/company" className="text-[11px] font-mono font-bold tracking-widest text-slate-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-white transition-colors relative group">
              COMPANY
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(20,184,166,0.8)]"></span>
            </Link>
          </div>
        </div>

        {/* Right Actions - Anchored Right */}
        <div className="hidden lg:flex items-center space-x-6 z-20">

          {/* THEME SHIFTER */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-inner"
            title="Shift Reality Mode"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={12} className="text-yellow-400" />
                <span>LIGHT</span>
              </>
            ) : (
              <>
                <Moon size={12} className="text-brand-500" />
                <span>DARK</span>
              </>
            )}
          </button>

          <div className="h-4 w-[1px] bg-slate-300 dark:bg-white/10"></div>

          {/* Client Login - Profile Icon */}
          {/*<Link
            to="/dashboard"
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 transition-all duration-300 shadow-lg shadow-slate-200 dark:shadow-black/50 group"
            title="Client Access Portal"
          >
            <User size={16} className="group-hover:scale-110 transition-transform" />
          </Link> */}

          <Link to="/contact" className="relative group overflow-hidden px-6 py-2 bg-brand-600/10 border border-brand-500/50 hover:bg-brand-600 hover:border-brand-500 transition-all duration-300 rounded-sm">
            <div className="relative flex items-center gap-2 text-brand-700 dark:text-brand-400 group-hover:text-white font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
              <span>Contact Us</span>
            </div>
            {/* Tech Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-500"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-500"></div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 z-20">
          <button onClick={toggleTheme} className="text-slate-900 dark:text-white">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-slate-900 dark:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-xl z-10 pt-24 px-6"
          >
            <div className="flex flex-col space-y-6">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">HOME</Link>
              <Link to="/wings" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">WINGS</Link>
              {/* <Link to="/innovation" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">INNOVATION</Link> */}
              <Link to="/portfolio" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">PORTFOLIO</Link>
              <Link to="/company" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">COMPANY</Link>
              {/* <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-2xl font-mono font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4 flex items-center gap-2"><User size={20} /> CLIENT ACCESS</Link> */}

              <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-8 flex items-center justify-between text-brand-700 dark:text-brand-400 font-mono uppercase tracking-widest border border-brand-500/30 p-4 bg-brand-50 dark:bg-brand-900/10 rounded">
                <span>Contact Protocol</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;