import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Settings as SettingsIcon, Lightbulb, Briefcase, Database, Download, Upload,
    Layout, Users, Globe, Layers, Share2, Save, Plus, Trash2, Image as ImageIcon,
    Home, BarChart3, Building2, FileText, Sparkles
} from 'lucide-react';
import InnovationManager from './InnovationManager';
import PortfolioManager from './PortfolioManager';
import WingsManager from './WingsManager';
import TeamManager from './TeamManager';
import { useContent } from '../ContentContext';
import { exportAllContent, importAllContent, resetToDefaults } from '../../services/contentStorage';

type SettingsTab = 'home' | 'innovation' | 'portfolio' | 'wings' | 'team' | 'partnerships';

const ContentManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('innovation');

    const handleExport = () => {
        const data = exportAllContent();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `techtonic-content-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const content = event.target?.result as string;
                    if (importAllContent(content)) {
                        alert('Content imported successfully! Refresh the page to see changes.');
                        window.location.reload();
                    } else {
                        alert('Failed to import content. Please check the file format.');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
            if (resetToDefaults()) {
                alert('Content reset to defaults! Refresh the page to see changes.');
                window.location.reload();
            }
        }
    };

    const tabs = [
        { id: 'innovation' as SettingsTab, label: 'Innovation', icon: Lightbulb },
        { id: 'portfolio' as SettingsTab, label: 'Portfolio', icon: Briefcase },
        { id: 'wings' as SettingsTab, label: 'Wings', icon: Layers },
        { id: 'team' as SettingsTab, label: 'Team', icon: Users },
        { id: 'home' as SettingsTab, label: 'Pages & Hero', icon: Layout },
        { id: 'partnerships' as SettingsTab, label: 'Partners', icon: Share2 },
    ];

    // This replacer is for ContentManagement.tsx
    // Rewriting the component with theme-aware classes.

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Content Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Manage dynamic content across the application</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 bg-white dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    <button
                        onClick={handleExport}
                        title="Export Content"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <Download size={18} />
                    </button>
                    <button
                        onClick={handleImport}
                        title="Import Content"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                        <Upload size={18} />
                    </button>
                    <div className="w-px bg-slate-200 dark:bg-white/10 my-1 mx-1"></div>
                    <button
                        onClick={handleReset}
                        title="Reset to Defaults"
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-500/20 rounded-lg text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                    >
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
                {activeTab === 'home' && <PagesContentManager />}
                {activeTab === 'partnerships' && <PartnersEditor />}
            </motion.div>
        </div>
    );
};

// Inline Editors for simpler sections

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
            {/* Add Partner Card */}
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
                        <input
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); } }}
                            placeholder="e.g., Acme Corp"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Logo URL</label>
                        <input
                            value={newItem.logo}
                            onChange={e => setNewItem({ ...newItem, logo: e.target.value })}
                            placeholder="https://example.com/logo.png"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center gap-2 text-sm transition-all"
                    >
                        <Plus size={16} />
                        Add Partner
                    </button>
                    {newItem.logo && (
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <span className="uppercase tracking-wide font-semibold">Preview:</span>
                            <div className="w-10 h-10 rounded-md bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden p-1">
                                <img src={newItem.logo} alt="Logo preview" className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-screen" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Partners Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Current Partners</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{partnerships.length} total</span>
                </div>
                {partnerships.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                        No partners yet. Add your first partner above.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {partnerships.map((p) => (
                            <div key={p.id} className="relative group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center min-h-[120px] shadow-sm dark:shadow-none hover:shadow-md hover:border-cyan-500/30 transition-all">
                                {p.logo ? (
                                    <img src={p.logo} alt={p.name} className="h-10 w-auto max-w-full object-contain mix-blend-multiply dark:mix-blend-screen" />
                                ) : (
                                    <div className="h-10 w-10 rounded-md bg-slate-100 dark:bg-slate-950/50 flex items-center justify-center text-slate-400 dark:text-slate-600">
                                        <ImageIcon size={20} />
                                    </div>
                                )}
                                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 text-center font-medium">{p.name}</p>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="absolute top-2 right-2 p-1.5 rounded-md bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                                    title="Delete partner"
                                >
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

const PagesContentManager: React.FC = () => {
    const { homeContent, setHomeContent, companyContent, setCompanyContent } = useContent();

    // Simplified editors for complex JSON content - could be expanded to proper forms later
    // Using simple text/check inputs for key visible fields

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Home Page Content */}
            <div className="space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Home size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Home Page</h3>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm dark:shadow-none space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Sparkles size={12} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Hero Section</h4>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Title</label>
                        <input
                            value={homeContent.hero?.title || ''}
                            onChange={e => setHomeContent({ ...homeContent, hero: { ...homeContent.hero, title: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Subtitle</label>
                        <input
                            value={homeContent.hero?.subtitle || ''}
                            onChange={e => setHomeContent({ ...homeContent, hero: { ...homeContent.hero, subtitle: e.target.value } })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm dark:shadow-none space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <BarChart3 size={12} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Partnership Stats</h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(homeContent?.partnerships?.stats || []).map((stat: any, idx: number) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-white/10 space-y-2">
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-500 mb-1 uppercase tracking-wide">Label</label>
                                    <input
                                        value={stat.label}
                                        onChange={e => {
                                            const newStats = [...(homeContent.partnerships?.stats || [])];
                                            newStats[idx] = { ...stat, label: e.target.value };
                                            setHomeContent({
                                                ...homeContent,
                                                partnerships: { ...homeContent.partnerships, stats: newStats }
                                            });
                                        }}
                                        className="w-full bg-transparent border-b border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500 pb-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-slate-500 dark:text-slate-500 mb-1 uppercase tracking-wide">Value</label>
                                    <input
                                        value={stat.value}
                                        onChange={e => {
                                            const newStats = [...(homeContent.partnerships?.stats || [])];
                                            newStats[idx] = { ...stat, value: e.target.value };
                                            setHomeContent({
                                                ...homeContent,
                                                partnerships: { ...homeContent.partnerships, stats: newStats }
                                            });
                                        }}
                                        className="w-full bg-transparent border-b border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-cyan-500 pb-1"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Company Page Content */}
            <div className="space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/10">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Building2 size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Company Page</h3>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm dark:shadow-none space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <FileText size={12} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Brief History</h4>
                    </div>
                    <div>
                        <textarea
                            value={companyContent.history || ''}
                            onChange={e => setCompanyContent({ ...companyContent, history: e.target.value })}
                            rows={6}
                            placeholder="Share the story of how the company started and key milestones."
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 shadow-sm dark:shadow-none space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <Lightbulb size={12} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mission Statement</h4>
                    </div>
                    <div>
                        <textarea
                            value={companyContent.mission || ''}
                            onChange={e => setCompanyContent({ ...companyContent, mission: e.target.value })}
                            rows={4}
                            placeholder="The core mission and purpose of the company."
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;
