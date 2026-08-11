"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import Link from 'next/link';
import { useNotFound } from '@/components/AppShell';
import { useTheme } from '@/tectonic/components/ThemeContext';

const NotFound = () => {
    const [glitch, setGlitch] = useState(false);
    const { set404 } = useNotFound();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    useEffect(() => {
        set404(true);
        return () => set404(false);
    }, [set404]);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`min-h-screen flex items-center justify-center overflow-hidden relative transition-colors duration-500 ${
            isDark
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                : 'bg-gradient-to-br from-white via-slate-50 to-brand-50/30'
        }`}>
            {/* Background grid */}
            <div className={`absolute inset-0 ${isDark ? 'opacity-[0.03]' : 'opacity-[0.04]'}`}>
                <div className="absolute inset-0" style={{
                    backgroundImage: isDark
                        ? `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`
                        : `linear-gradient(rgba(20,184,166,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.25) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }} />
            </div>

            {/* Floating orbs */}
            <div className={`absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[120px] animate-pulse ${
                isDark ? 'bg-brand-500/10' : 'bg-brand-300/20'
            }`} />
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[140px] animate-pulse ${
                isDark ? 'bg-cyan-500/8' : 'bg-purple-200/25'
            }`} style={{ animationDelay: '2s' }} />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] ${
                isDark ? 'bg-purple-500/5' : 'bg-cyan-200/15'
            }`} />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-lg">
                {/* Glitch 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        {/* Glow behind */}
                        <div className={`absolute inset-0 blur-[40px] rounded-full ${
                            isDark ? 'bg-brand-500/20' : 'bg-brand-400/15'
                        }`} />

                        <h1
                            className={`relative text-[120px] sm:text-[160px] font-black leading-none tracking-tighter bg-clip-text text-transparent select-none transition-all duration-100 ${
                                isDark
                                    ? 'from-white via-white/80 to-white/20'
                                    : 'from-slate-800 via-slate-700 to-slate-400'
                            } bg-gradient-to-b ${
                                glitch ? 'translate-x-1 skew-x-1' : ''
                            }`}
                        >
                            404
                        </h1>

                        {/* Glitch lines */}
                        {glitch && (
                            <>
                                <div className={`absolute top-[20%] left-0 right-0 h-[2px] -translate-x-2 ${
                                    isDark ? 'bg-cyan-400/60' : 'bg-brand-400/40'
                                }`} />
                                <div className={`absolute top-[60%] left-0 right-0 h-[1px] translate-x-3 ${
                                    isDark ? 'bg-red-400/40' : 'bg-purple-400/30'
                                }`} />
                                <div className={`absolute top-[80%] left-0 right-0 h-[1px] -translate-x-1 ${
                                    isDark ? 'bg-brand-400/50' : 'bg-cyan-400/35'
                                }`} />
                            </>
                        )}
                    </div>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className={`h-px w-8 bg-gradient-to-r ${
                            isDark ? 'from-transparent to-brand-500/50' : 'from-transparent to-brand-400/40'
                        }`} />
                        <Zap size={14} className={isDark ? 'text-brand-400' : 'text-brand-500'} />
                        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${
                            isDark ? 'text-brand-400/80' : 'text-brand-600/70'
                        }`}>Signal Lost</span>
                        <Zap size={14} className={isDark ? 'text-brand-400' : 'text-brand-500'} />
                        <div className={`h-px w-8 bg-gradient-to-l ${
                            isDark ? 'from-transparent to-brand-500/50' : 'from-transparent to-brand-400/40'
                        }`} />
                    </div>

                    <h2 className={`text-xl sm:text-2xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-slate-800'
                    }`}>
                        This page has drifted off
                    </h2>
                    <p className={`text-sm leading-relaxed max-w-md mx-auto ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                        The page you're looking for doesn't exist or has been moved to a different sector.
                        Let's get you back to solid ground.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
                >
                    <Link
                        href="/"
                        className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                            isDark
                                ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40'
                                : 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-white shadow-lg shadow-brand-400/20 hover:shadow-brand-400/35'
                        }`}
                    >
                        <Home size={16} />
                        Back to Base
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className={`group flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                            isDark
                                ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white'
                                : 'bg-white/60 hover:bg-white/80 border border-slate-200 hover:border-brand-300/50 text-slate-600 hover:text-slate-900 shadow-sm'
                        }`}
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        Previous Sector
                    </button>
                </motion.div>

                {/* Terminal decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className={`mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-xl ${
                        isDark
                            ? 'bg-white/[0.03] border border-white/[0.06]'
                            : 'bg-white/50 border border-slate-200/60'
                    }`}
                >
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                        isDark ? 'bg-red-500/80' : 'bg-red-400/70'
                    }`} />
                    <span className={`text-[11px] font-mono ${
                        isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}>
                        ERR_PAGE_NOT_FOUND · sector 0x{(404).toString(16).toUpperCase()}
                    </span>
                </motion.div>
            </div>

            {/* Bottom gradient line */}
            <div className={`absolute bottom-0 left-0 right-0 h-px ${
                isDark
                    ? 'bg-gradient-to-r from-transparent via-brand-500/30 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-brand-400/20 to-transparent'
            }`} />
        </div>
    );
};

export default NotFound;
