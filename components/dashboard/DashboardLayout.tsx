import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, MessageSquare, Users, Mail, LogOut, Settings as SettingsIcon, Database, Link2, Menu, X } from 'lucide-react';
import TectonicLogo from '../layout/TectonicLogo';
import ThemeToggle from '../ui/ThemeToggle';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard, mobileLabel: 'Home' },
        { id: 'links', label: 'Link Center', icon: Link2, mobileLabel: 'Links' },
        { id: 'chat', label: 'Messages', icon: MessageSquare, mobileLabel: 'Chat' },
        { id: 'members', label: 'Operatives', icon: Users, mobileLabel: 'Team' },
        { id: 'contact', label: 'Inquiries', icon: Mail, mobileLabel: 'Inbox' },
        { id: 'content', label: 'Content', icon: Database, mobileLabel: 'Content' },
        { id: 'settings', label: 'Settings', icon: SettingsIcon, mobileLabel: 'Settings' },
    ];

    // Primary tabs for mobile bottom nav (most used)
    const primaryTabs = tabs.filter(t => ['overview', 'chat', 'members', 'settings'].includes(t.id));
    const secondaryTabs = tabs.filter(t => !['overview', 'chat', 'members', 'settings'].includes(t.id));

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-500">
            {/* Mobile Top Bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.05] safe-top">
                <div className="flex items-center justify-between px-4 h-14">
                    <div className="flex items-center gap-3">
                        <TectonicLogo />
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg active:bg-slate-100 dark:active:bg-white/5"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Top Navigation Bar */}
            <div className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.05]">
                <div className="flex items-center justify-between px-6 h-16 max-w-[1600px] mx-auto">
                    <TectonicLogo />

                    <nav className="flex items-center gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? 'text-brand-600 dark:text-brand-400'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon size={16} />
                                        <span>{tab.label}</span>
                                    </div>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabDesktop"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={onLogout}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-950 rounded-t-3xl z-50 max-h-[70vh] overflow-hidden safe-bottom"
                        >
                            {/* Drawer Handle */}
                            <div className="flex justify-center pt-3 pb-2">
                                <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                            </div>

                            {/* Menu Content */}
                            <div className="px-4 pb-6 overflow-y-auto max-h-[calc(70vh-3rem)]">
                                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-2">
                                    More Options
                                </h3>
                                <nav className="space-y-1">
                                    {secondaryTabs.map((tab) => {
                                        const Icon = tab.icon;
                                        const isActive = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                onClick={() => {
                                                    setActiveTab(tab.id);
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${isActive
                                                    ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400'
                                                    : 'text-slate-700 dark:text-slate-300 active:bg-slate-100 dark:active:bg-white/5'
                                                    }`}
                                            >
                                                <Icon size={20} />
                                                <span>{tab.label}</span>
                                            </button>
                                        );
                                    })}

                                    <div className="h-px bg-slate-200 dark:bg-white/5 my-3" />

                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 active:bg-red-50 dark:active:bg-red-500/10 transition-all active:scale-[0.98]"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="pt-14 lg:pt-16 pb-20 lg:pb-0">
                <div className="max-w-[1600px] mx-auto px-4 py-4 lg:px-6 lg:py-6">
                    {/* Page Header - Mobile Optimized */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 lg:mb-6"
                    >
                        <h1 className="text-xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-1">
                            {tabs.find(t => t.id === activeTab)?.label}
                        </h1>
                        <motion.div
                            layoutId="pageUnderline"
                            className="h-0.5 lg:h-1 w-12 lg:w-16 bg-gradient-to-r from-brand-500 to-cyan-500 rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    </motion.div>

                    {/* Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Mobile Bottom Navigation - Native App Style */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/[0.05] safe-bottom">
                <nav className="flex items-center justify-around px-2 py-2">
                    {primaryTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className="relative flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[60px] transition-all active:scale-95"
                            >
                                <div className={`relative transition-all ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500 dark:text-slate-500'
                                    }`}>
                                    <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabMobile"
                                            className="absolute -inset-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium transition-all ${isActive
                                    ? 'text-brand-600 dark:text-brand-400'
                                    : 'text-slate-500 dark:text-slate-500'
                                    }`}>
                                    {tab.mobileLabel}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default DashboardLayout;
