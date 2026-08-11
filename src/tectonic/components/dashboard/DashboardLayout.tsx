"use client";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, MessageSquare, Users, Mail, LogOut, Settings as SettingsIcon,
    Database, Link2, Menu, X, Globe, BarChart3, Award, Clock, FileText, Search,
    ChevronLeft, ChevronRight, Sparkles, BookOpen, Eye
} from 'lucide-react';
import TectonicLogo from '../layout/TectonicLogo';
import ThemeToggle from '../ui/ThemeToggle';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const TAB_GROUPS = [
    {
        label: 'Main',
        items: [
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'members', label: 'Operatives', icon: Users },
            { id: 'contact', label: 'Inquiries', icon: Mail, badge: true },
        ],
    },
    {
        label: 'Content',
        items: [
            { id: 'content', label: 'Content', icon: Database },
            { id: 'visibility', label: 'Visibility', icon: Eye },
        ],
    },
    {
        label: 'Tools',
        items: [
            { id: 'links', label: 'Link Center', icon: Link2 },
            { id: 'chat', label: 'Messages', icon: MessageSquare, badge: true },
        ],
    },
    {
        label: 'Advanced',
        items: [
            { id: 'seo', label: 'SEO', icon: Search },
        ],
        advanced: true,
    },
    {
        label: '',
        items: [
            { id: 'docs', label: 'Docs & Guides', icon: BookOpen },
            { id: 'settings', label: 'Settings', icon: SettingsIcon },
        ],
    },
];

const ALL_TABS = TAB_GROUPS.flatMap(g => g.items);

// Tooltip component for collapsed sidebar
const Tooltip = ({ children, text, show }: { children: React.ReactNode; text: string; show: boolean }) => {
    if (!show) return <>{children}</>;
    return (
        <div className="relative group/tip">
            {children}
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-150 z-[100] shadow-xl">
                {text}
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700" />
            </div>
        </div>
    );
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleTabClick = useCallback((id: string) => {
        setActiveTab(id);
        setMobileMenuOpen(false);
    }, [setActiveTab]);

    const activeTabData = ALL_TABS.find(t => t.id === activeTab);

    // Keyboard shortcut
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === '[') {
                e.preventDefault();
                setSidebarCollapsed(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-black dark:via-slate-950 dark:to-slate-950 transition-colors duration-500">
            {/* ═══════════════════════════════════════════════════════════
                DESKTOP SIDEBAR — Premium Claymorphism
            ═══════════════════════════════════════════════════════════ */}
            <aside className={`hidden lg:flex fixed top-0 left-0 h-screen z-50 flex-col transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                sidebarCollapsed ? 'w-[82px]' : 'w-[272px]'
            }`}>
                {/* Outer glow layer */}
                <div className="absolute inset-y-3 -left-1 w-[calc(100%+4px)] rounded-3xl bg-gradient-to-b from-brand-500/8 via-transparent to-cyan-500/5 dark:from-brand-500/5 dark:via-transparent dark:to-cyan-500/3 blur-xl pointer-events-none" />

                {/* Main sidebar container */}
                <div className="relative h-full flex flex-col m-2 ml-2 rounded-3xl overflow-hidden
                    bg-white/75 dark:bg-[#0c0e14]/80
                    backdrop-blur-2xl
                    border border-white/60 dark:border-white/[0.08]
                    shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.03)]
                    dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(0,0,0,0.15)]">

                    {/* ═══ LOGO / BRAND ═══ */}
                    <div className={`relative flex items-center h-16 border-b border-slate-200/40 dark:border-white/[0.06] ${sidebarCollapsed ? 'justify-center' : 'px-5 gap-3'}`}>
                        <div className="flex-shrink-0 relative">
                            {!sidebarCollapsed && <div className="absolute -inset-1 bg-brand-500/20 rounded-xl blur-md" />}
                            <div className="relative">
                                <TectonicLogo compact={sidebarCollapsed} />
                            </div>
                        </div>
                    </div>

                    {/* ═══ NAVIGATION ═══ */}
                    <nav ref={navRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
                        {TAB_GROUPS.map((group, groupIndex) => (
                            <div key={group.label || `group-${groupIndex}`}>
                                {/* Divider for unlabeled groups */}
                                {!group.label && !sidebarCollapsed && (
                                    <div className="px-3 mb-2 mt-1">
                                        <div className="h-px bg-gradient-to-r from-transparent via-slate-200/60 dark:via-white/[0.06] to-transparent" />
                                    </div>
                                )}
                                {/* Label for named groups */}
                                {group.label && !sidebarCollapsed && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="px-3 mb-2 flex items-center gap-2"
                                    >
                                        {(group as any).advanced && <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 dark:bg-amber-500/40" />}
                                        {!!(group as any).advanced && <span className="text-[10px] font-extrabold tracking-[0.2em] text-amber-500/60 dark:text-amber-400/40 uppercase">Advanced</span>}
                                        {!(group as any).advanced && <div className="w-1 h-1 rounded-full bg-brand-400/60 dark:bg-brand-500/40" />}
                                        <span className={`text-[10px] font-extrabold tracking-[0.2em] uppercase ${
                                            (group as any).advanced
                                                ? 'text-amber-400/40 dark:text-amber-500/30'
                                                : 'text-slate-400 dark:text-slate-600'
                                        }`}>
                                            {group.label}
                                        </span>
                                        <div className="flex-1 h-px bg-gradient-to-r from-slate-200/60 dark:from-white/[0.06] to-transparent" />
                                    </motion.div>
                                )}
                                <div className="space-y-0.5">
                                    {group.items.map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        const isHovered = hoveredTab === tab.id;
                                        return (
                                            <Tooltip key={tab.id} text={tab.label} show={sidebarCollapsed && isHovered}>
                                                <button
                                                    onClick={() => handleTabClick(tab.id)}
                                                    onMouseEnter={() => setHoveredTab(tab.id)}
                                                    onMouseLeave={() => setHoveredTab(null)}
                                                    className={`relative w-full flex items-center gap-3 group/nav rounded-2xl text-sm font-medium transition-all duration-200 outline-none ${
                                                        sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-3'
                                                    } ${
                                                        isActive
                                                            ? 'text-brand-700 dark:text-brand-300'
                                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {/* Active indicator — left accent bar */}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="sidebarAccent"
                                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-brand-500 to-cyan-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                                                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                                        />
                                                    )}

                                                    {/* Active pill background */}
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="sidebarActivePill"
                                                            className="absolute inset-0 rounded-2xl
                                                                bg-gradient-to-r from-brand-500/15 via-brand-500/8 to-cyan-500/10
                                                                border border-brand-400/25 dark:border-brand-400/15
                                                                shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),inset_0_-1px_2px_rgba(99,102,241,0.08),0_2px 8px_rgba(99,102,241,0.08)]
                                                                dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),inset_0_-1px_2px_rgba(99,102,241,0.05),0_2px 8px_rgba(99,102,241,0.06)]"
                                                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                                        />
                                                    )}

                                                    {/* Hover background (non-active) */}
                                                    {!isActive && (
                                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 bg-white/50 dark:bg-white/[0.04] border border-transparent group-hover/nav:border-white/40 dark:group-hover/nav:border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]" />
                                                    )}

                                                    {/* Icon */}
                                                    <div className={`relative z-10 flex-shrink-0 transition-all duration-200 ${
                                                        isActive ? 'text-brand-600 dark:text-brand-400 drop-shadow-sm' : ''
                                                    } ${!isActive && isHovered ? 'scale-110' : ''}`}>
                                                        <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
                                                    </div>

                                                    {/* Label */}
                                                    {!sidebarCollapsed && (
                                                        <span className="relative z-10 truncate transition-all duration-200">
                                                            {tab.label}
                                                        </span>
                                                    )}

                                                    {/* Notification badge */}
                                                    {tab.badge && !sidebarCollapsed && (
                                                        <div className="ml-auto relative z-10">
                                                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)] animate-pulse" />
                                                        </div>
                                                    )}
                                                    {tab.badge && sidebarCollapsed && (
                                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)] animate-pulse z-20" />
                                                    )}
                                                </button>
                                            </Tooltip>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* ═══ BOTTOM SECTION ═══ */}
                    <div className="px-3 pb-4 space-y-2 border-t border-slate-200/40 dark:border-white/[0.06] pt-3">
                        {/* Theme + Logout row */}
                        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                            <ThemeToggle />
                            {!sidebarCollapsed ? (
                                <button
                                    onClick={onLogout}
                                    className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <LogOut size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">Sign Out</span>
                                </button>
                            ) : (
                                <button
                                    onClick={onLogout}
                                    className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all duration-200"
                                    title="Sign Out"
                                >
                                    <LogOut size={16} />
                                </button>
                            )}
                        </div>

                        {/* Collapse toggle */}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[11px] font-medium text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-white/40 dark:hover:bg-white/[0.04] rounded-xl transition-all duration-200"
                        >
                            <motion.div
                                animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronLeft size={14} />
                            </motion.div>
                            {!sidebarCollapsed && <span className="tracking-wide">Collapse</span>}
                        </button>

                        {/* Version */}
                        {!sidebarCollapsed && (
                            <div className="text-center pt-1">
                                <span className="text-[9px] font-medium text-slate-300 dark:text-slate-800 tracking-widest">
                                    v1.0.0 · ⌘[
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* ═══════════════════════════════════════════════════════════
                MOBILE TOP BAR
            ═══════════════════════════════════════════════════════════ */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 safe-top">
                <div className="mx-2 mt-2 rounded-2xl bg-white/70 dark:bg-white/[0.06] backdrop-blur-2xl border border-white/40 dark:border-white/[0.06] shadow-[4px_4px_16px_rgba(0,0,0,0.06),-2px_-2px_8px_rgba(255,255,255,0.8)]">
                    <div className="flex items-center justify-between px-4 h-14">
                        <TectonicLogo />
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-xl active:bg-white/60 dark:active:bg-white/[0.06]"
                            >
                                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                MOBILE DRAWER
            ═══════════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-40"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className="lg:hidden fixed bottom-0 left-2 right-2 z-50 max-h-[80vh] overflow-hidden safe-bottom"
                        >
                            <div className="rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/40 dark:border-white/[0.06] shadow-[0_-8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.8)]">
                                <div className="flex justify-center pt-3 pb-1">
                                    <div className="w-10 h-1.5 bg-slate-300/60 dark:bg-slate-600/60 rounded-full" />
                                </div>

                                <div className="px-4 pb-6 overflow-y-auto max-h-[calc(80vh-3rem)]">
                                    {/* Active page indicator */}
                                    <div className="mb-4 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500/10 to-cyan-500/10 border border-brand-400/20">
                                        <div className="flex items-center gap-2">
                                            {activeTabData && <activeTabData.icon size={16} className="text-brand-600 dark:text-brand-400" />}
                                            <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">
                                                {activeTabData?.label || 'Dashboard'}
                                            </span>
                                        </div>
                                    </div>

                                    {TAB_GROUPS.map((group) => (
                                        <div key={group.label} className="mb-3">
                                            <div className="px-3 mb-1.5 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-brand-400/60" />
                                                <span className="text-[10px] font-extrabold tracking-[0.2em] text-slate-400 dark:text-slate-600 uppercase">
                                                    {group.label}
                                                </span>
                                            </div>
                                            <div className="space-y-0.5">
                                                {group.items.map((tab) => {
                                                    const Icon = tab.icon;
                                                    const isActive = activeTab === tab.id;
                                                    return (
                                                        <button
                                                            key={tab.id}
                                                            onClick={() => handleTabClick(tab.id)}
                                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all active:scale-[0.97] ${
                                                                isActive
                                                                    ? 'bg-gradient-to-r from-brand-500/15 to-cyan-500/10 text-brand-700 dark:text-brand-300 border border-brand-400/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_2px 8px_rgba(99,102,241,0.08)]'
                                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-white/[0.06]'
                                                            }`}
                                                        >
                                                            <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
                                                            <span>{tab.label}</span>
                                                            {tab.badge && (
                                                                <div className="ml-auto w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)] animate-pulse" />
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent my-3" />

                                    <button
                                        onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-[0.97]"
                                    >
                                        <LogOut size={20} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════════════
                MAIN CONTENT AREA
            ═══════════════════════════════════════════════════════════ */}
            <div className={`pt-16 lg:pt-4 pb-24 lg:pb-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                sidebarCollapsed ? 'lg:ml-[86px]' : 'lg:ml-[276px]'
            }`}>
                <div className="max-w-[1400px] mx-auto px-3 py-3 lg:px-6 lg:py-5">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-5 lg:mb-7"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="relative">
                                <div className="absolute -inset-1 bg-brand-500/15 rounded-2xl blur-md" />
                                <div className="relative p-2.5 rounded-2xl bg-gradient-to-br from-brand-500/20 to-cyan-500/15 border border-brand-400/25 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_2px 8px_rgba(99,102,241,0.1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.04),0_2px 8px_rgba(99,102,241,0.08)]">
                                    {activeTabData && <activeTabData.icon size={20} className="text-brand-600 dark:text-brand-400" />}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                                    {activeTabData?.label}
                                </h1>
                                <motion.div
                                    layoutId="pageUnderline"
                                    className="h-0.5 w-10 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-full mt-1"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-3xl bg-white/70 dark:bg-white/[0.03] backdrop-blur-xl border border-white/50 dark:border-white/[0.06] shadow-[6px_6px_20px_rgba(0,0,0,0.06),-3px_-3px_10px_rgba(255,255,255,0.8),inset_0_1px_0_rgba(255,255,255,0.7)] dark:shadow-[6px_6px_20px_rgba(0,0,0,0.3),-3px_-3px_10px_rgba(255,255,255,0.02),inset_0_1px_0_rgba(255,255,255,0.05)] p-4 lg:p-6"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                MOBILE BOTTOM NAV
            ═══════════════════════════════════════════════════════════ */}
            <div className="lg:hidden fixed bottom-2 left-2 right-2 z-40 safe-bottom">
                <div className="rounded-2xl bg-white/70 dark:bg-white/[0.06] backdrop-blur-2xl border border-white/40 dark:border-white/[0.06] shadow-[4px_4px_16px_rgba(0,0,0,0.08),-2px_-2px_8px_rgba(255,255,255,0.8),inset_0_1px_0_rgba(255,255,255,0.6)]">
                    <nav className="flex items-center justify-around px-2 py-2">
                        {ALL_TABS.slice(0, 5).map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                    className="relative flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[56px] transition-all active:scale-95"
                                >
                                    <div className={`relative p-2 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? 'bg-gradient-to-br from-brand-500/20 to-cyan-500/15 text-brand-600 dark:text-brand-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_2px 8px_rgba(99,102,241,0.12)] border border-brand-400/25'
                                            : 'text-slate-500 dark:text-slate-500'
                                    }`}>
                                        <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                                        {tab.badge && (
                                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
                                        )}
                                    </div>
                                    <span className={`text-[10px] font-medium transition-all ${
                                        isActive
                                            ? 'text-brand-600 dark:text-brand-400'
                                            : 'text-slate-500 dark:text-slate-500'
                                    }`}>
                                        {tab.id === 'overview' ? 'Home' : tab.id === 'chat' ? 'Chat' : tab.id === 'members' ? 'Team' : tab.id === 'contact' ? 'Inbox' : tab.id === 'content' ? 'Content' : tab.label}
                                    </span>
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[56px] transition-all active:scale-95"
                        >
                            <div className="p-2 rounded-xl text-slate-500 dark:text-slate-500">
                                <Sparkles size={20} strokeWidth={1.8} />
                            </div>
                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-500">More</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
