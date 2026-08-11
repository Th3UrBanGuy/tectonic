"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Layout, Navigation, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useContent } from '../ContentContext';

const PAGE_LABELS: Record<string, string> = {
    layout: 'Site Layout',
    home: 'Home Page',
    company: 'Company Page',
    portfolio: 'Portfolio',
    wings: 'Wings',
    contact: 'Contact',
};

const PAGE_ICONS: Record<string, React.ElementType> = {
    layout: Navigation,
    home: Layout,
    company: Layout,
    portfolio: Layout,
    wings: Layout,
    contact: Layout,
};

const pageOrder = ['layout', 'home', 'company', 'portfolio', 'wings', 'contact'];

export default function SectionVisibilityManager() {
    const { sections, setSections, refreshContent } = useContent();
    const [localSections, setLocalSections] = useState(sections);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [hasChanges, setHasChanges] = useState(false);

    const grouped = pageOrder
        .filter((p) => localSections.some((s) => s.page === p))
        .map((p) => ({
            page: p,
            label: PAGE_LABELS[p] || p,
            icon: PAGE_ICONS[p] || Layout,
            sections: localSections.filter((s) => s.page === p).sort((a, b) => a.order - b.order),
        }));

    const toggleSection = (page: string, section: string) => {
        const updated = localSections.map((s) =>
            s.page === page && s.section === section ? { ...s, visible: !s.visible } : s
        );
        setLocalSections(updated);
        setHasChanges(true);
    };

    const togglePage = (page: string, visible: boolean) => {
        const updated = localSections.map((s) =>
            s.page === page ? { ...s, visible } : s
        );
        setLocalSections(updated);
        setHasChanges(true);
    };

    const handleSave = async () => {
        setSaveStatus('saving');
        try {
            const token = localStorage.getItem('techtonic_auth_token');
            const res = await fetch('/api/content?type=sections', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({ type: 'sections', data: localSections }),
            });
            if (res.ok) {
                setSections(localSections);
                setSaveStatus('saved');
                setHasChanges(false);
                // Force fresh fetch on next page load by clearing cache
                try { localStorage.removeItem('techtonic_all_content'); } catch {}
                setTimeout(() => setSaveStatus('idle'), 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        }
    };

    const visibleCount = localSections.filter((s) => s.visible).length;
    const totalCount = localSections.length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Section Visibility</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Toggle any section on/off — click <strong>Save Changes</strong> to apply to the live site
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-2xl font-mono font-bold text-brand-500">{visibleCount}/{totalCount}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">sections visible</div>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={!hasChanges || saveStatus === 'saving'}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            hasChanges
                                ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-500/25'
                                : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                        } ${saveStatus === 'saving' ? 'opacity-70' : ''}`}
                    >
                        {saveStatus === 'saving' ? (
                            <>Saving...</>
                        ) : saveStatus === 'saved' ? (
                            <><CheckCircle size={16} /> Saved</>
                        ) : saveStatus === 'error' ? (
                            <><AlertCircle size={16} /> Error</>
                        ) : (
                            <><Save size={16} /> Save Changes</>
                        )}
                    </button>
                </div>
            </div>

            {hasChanges && (
                <div className="px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 text-sm font-medium">
                    You have unsaved changes. Click &quot;Save Changes&quot; to apply them to the live site.
                </div>
            )}

            {grouped.map(({ page, label, icon: Icon, sections: pageSections }) => {
                const allVisible = pageSections.every((s) => s.visible);
                const someVisible = pageSections.some((s) => s.visible);
                const isLayout = page === 'layout';

                return (
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-xl border overflow-hidden ${
                            isLayout
                                ? 'border-brand-300 dark:border-brand-500/30 bg-gradient-to-br from-brand-50/50 to-white dark:from-brand-900/10 dark:to-[#121212]'
                                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#121212]'
                        }`}
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <Icon size={18} className={isLayout ? 'text-brand-500' : 'text-slate-400 dark:text-slate-500'} />
                                <span className="font-bold text-slate-900 dark:text-white">{label}</span>
                                <span className="text-xs text-slate-400 font-mono">/{page}</span>
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded">
                                    {pageSections.filter(s => s.visible).length}/{pageSections.length}
                                </span>
                            </div>
                            <button
                                onClick={() => togglePage(page, !allVisible)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    allVisible
                                        ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-500/20'
                                        : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                                }`}
                            >
                                {allVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                {allVisible ? 'All On' : someVisible ? 'Some On' : 'All Off'}
                            </button>
                        </div>

                        <div className="divide-y divide-slate-100 dark:divide-white/5">
                            {pageSections.map((s) => (
                                <div
                                    key={`${s.page}-${s.section}`}
                                    className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${s.visible ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{s.section}</span>
                                    </div>
                                    <button
                                        onClick={() => toggleSection(s.page, s.section)}
                                        className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                                            s.visible
                                                ? 'bg-brand-500 shadow-sm shadow-brand-500/25'
                                                : 'bg-slate-200 dark:bg-slate-700'
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                                s.visible ? 'translate-x-[22px]' : 'translate-x-0.5'
                                            }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
