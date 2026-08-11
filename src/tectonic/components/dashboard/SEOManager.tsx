"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search } from 'lucide-react';
import SEOPagesManager from './SEOPagesManager';
import SEODashboard from './SEODashboard';

type SEOTab = 'pages' | 'dashboard';

const SEOManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SEOTab>('dashboard');

    const tabs = [
        { id: 'dashboard' as SEOTab, label: 'SEO Dashboard', icon: Search },
        { id: 'pages' as SEOTab, label: 'SEO Pages', icon: FileText },
    ];

    return (
        <div className="space-y-5">
            {/* Sub-tabs */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-1.5 flex gap-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                                isActive
                                    ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200/50 dark:border-brand-500/20 shadow-sm'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                            }`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
            >
                {activeTab === 'dashboard' && <SEODashboard />}
                {activeTab === 'pages' && <SEOPagesManager />}
            </motion.div>
        </div>
    );
};

export default SEOManager;
