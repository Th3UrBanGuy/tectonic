"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Settings as SettingsIcon, Lightbulb, Briefcase, Database, Download, Upload,
    Layout, Users, Globe, Layers, Share2, Save, Plus, Trash2, Image as ImageIcon,
    Home, BarChart3, Building2, FileText, Sparkles, Award, Clock, TrendingUp
} from 'lucide-react';
import InnovationManager from './InnovationManager';
import PortfolioManager from './PortfolioManager';
import WingsManager from './WingsManager';
import TeamManager from './TeamManager';
import PortfolioContentEditor from './PortfolioContentEditor';
import HomeContentEditor from './HomeContentEditor';
import CompanyContentEditor from './CompanyContentEditor';
import CertificationsManager from './CertificationsManager';
import CompanyStatsManager from './CompanyStatsManager';
import TimelineManager from './TimelineManager';
import IndustriesManager from './IndustriesManager';
import CertificationGalleryManager from './CertificationGalleryManager';
import SiteSettingsManager from './SiteSettingsManager';
import { useContent } from '../ContentContext';
import { exportAllContent, importAllContent, resetToDefaults } from '../../services/contentStorage';

type SettingsTab =
    | 'innovation' | 'portfolio' | 'wings' | 'team'
    | 'partnerships' | 'portfolioContent' | 'homeContent' | 'companyContent'
    | 'certifications' | 'certGallery' | 'stats' | 'timeline' | 'industries'
    | 'siteSettings';

const ContentManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('innovation');
    const [exporting, setExporting] = useState(false);
    const [importing, setImporting] = useState(false);
    const [resetting, setResetting] = useState(false);

    const handleExport = async () => {
        setExporting(true);
        try {
            const data = await exportAllContent();
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `techtonic-content-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            alert('Failed to export content.');
        } finally {
            setExporting(false);
        }
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const content = event.target?.result as string;
                    setImporting(true);
                    try {
                        const success = await importAllContent(content);
                        if (success) {
                            alert('Content imported successfully! Refreshing...');
                            window.location.reload();
                        } else {
                            alert('Failed to import content. Please check the file format.');
                        }
                    } finally {
                        setImporting(false);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleReset = async () => {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            setResetting(true);
            try {
                const success = await resetToDefaults();
                if (success) {
                    alert('Content reset to defaults! Refreshing...');
                    window.location.reload();
                }
            } finally {
                setResetting(false);
            }
        }
    };

    const tabs = [
        { id: 'innovation' as SettingsTab, label: 'Innovation', icon: Lightbulb },
        { id: 'portfolio' as SettingsTab, label: 'Portfolio', icon: Briefcase },
        { id: 'wings' as SettingsTab, label: 'Wings', icon: Layers },
        { id: 'team' as SettingsTab, label: 'Team', icon: Users },
        { id: 'partnerships' as SettingsTab, label: 'Partners', icon: Share2 },
        { id: 'certifications' as SettingsTab, label: 'Certs & Awards', icon: Award },
        { id: 'certGallery' as SettingsTab, label: 'Cert Gallery', icon: ImageIcon },
        { id: 'stats' as SettingsTab, label: 'Stats', icon: BarChart3 },
        { id: 'timeline' as SettingsTab, label: 'Timeline', icon: Clock },
        { id: 'industries' as SettingsTab, label: 'Industries', icon: Globe },
        { id: 'homeContent' as SettingsTab, label: 'Home Content', icon: Home },
        { id: 'companyContent' as SettingsTab, label: 'Company Content', icon: Building2 },
        { id: 'portfolioContent' as SettingsTab, label: 'Portfolio Content', icon: FileText },
        { id: 'siteSettings' as SettingsTab, label: 'Site Settings', icon: SettingsIcon },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Content Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage all content, data, and section visibility</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 bg-white dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    <button onClick={handleExport} disabled={exporting} title="Export Content" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                        <Download size={18} />
                    </button>
                    <button onClick={handleImport} disabled={importing} title="Import Content" className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                        <Upload size={18} />
                    </button>
                    <div className="w-px bg-slate-200 dark:bg-white/10 my-1 mx-1"></div>
                    <button onClick={handleReset} disabled={resetting} title="Reset to Defaults" className="p-2 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors disabled:opacity-50">
                        <Database size={18} />
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2 backdrop-blur-sm overflow-x-auto shadow-sm dark:shadow-none">
                <div className="flex gap-2 min-w-max">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'innovation' && <InnovationManager />}
                {activeTab === 'portfolio' && <PortfolioManager />}
                {activeTab === 'wings' && <WingsManager />}
                {activeTab === 'team' && <TeamManager />}
                {activeTab === 'partnerships' && <PartnersEditor />}
                {activeTab === 'certifications' && <CertificationsManager />}
                {activeTab === 'certGallery' && <CertificationGalleryManager />}
                {activeTab === 'stats' && <CompanyStatsManager />}
                {activeTab === 'timeline' && <TimelineManager />}
                {activeTab === 'industries' && <IndustriesManager />}
                {activeTab === 'homeContent' && <HomeContentEditor />}
                {activeTab === 'companyContent' && <CompanyContentEditor />}
                {activeTab === 'portfolioContent' && <PortfolioContentEditor />}
                {activeTab === 'siteSettings' && <SiteSettingsManager />}
            </motion.div>
        </div>
    );
};

// ── Partners Editor (inline) ──────────────────────────────────────────────
const PartnersEditor: React.FC = () => {
    const { partnerships, setPartnerships } = useContent();
    const [newItem, setNewItem] = useState({ name: '', logo: '', type: 'strategic' });

    const handleAdd = () => {
        if (!newItem.name) return;
        setPartnerships([...partnerships, { ...newItem, id: `partner_${Date.now()}` } as any]);
        setNewItem({ name: '', logo: '', type: 'strategic' });
    };

    const handleDelete = (id: string) => {
        setPartnerships(partnerships.filter(p => p.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Share2 size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Add New Partner</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Partner Name</label>
                        <input value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }} placeholder="e.g., Acme Corp" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Logo URL</label>
                        <input value={newItem.logo} onChange={e => setNewItem({ ...newItem, logo: e.target.value })} placeholder="https://example.com/logo.png" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all" />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={handleAdd} className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2 text-sm transition-all">
                        <Plus size={16} /> Add Partner
                    </button>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Current Partners</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{partnerships.length} total</span>
                </div>
                {partnerships.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">No partners yet.</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {partnerships.map((p) => (
                            <div key={p.id} className="relative group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center min-h-[120px] shadow-sm dark:shadow-none hover:shadow-md hover:border-cyan-500/30 transition-all">
                                {p.logo ? (
                                    <img src={p.logo} alt={p.name} className="h-10 w-auto max-w-full object-contain mix-blend-multiply dark:mix-blend-screen" />
                                ) : (
                                    <div className="h-10 w-10 rounded-md bg-slate-100 dark:bg-slate-950/50 flex items-center justify-center text-slate-400 dark:text-slate-600"><ImageIcon size={20} /></div>
                                )}
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 text-center font-medium">{p.name}</p>
                                <button onClick={() => handleDelete(p.id)} className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all" title="Delete partner">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
