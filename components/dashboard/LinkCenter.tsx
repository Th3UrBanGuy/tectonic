import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Plus, BarChart3, Zap } from 'lucide-react';
import { ShortenedLink } from '../../types';
import LinkForm from './LinkForm';
import LinkList from './LinkList';
import LinkStats from './LinkStats';
import { getAllLinks, saveLink, deleteLink, deleteLinks, toggleLinkStatus } from '../../services/linkStorage';
import { loadSampleLinks, shouldLoadSamples } from '../../utils/sampleLinks';

const LinkCenter: React.FC = () => {
    const [links, setLinks] = useState<ShortenedLink[]>([]);
    const [editingLink, setEditingLink] = useState<ShortenedLink | null>(null);
    const [statsLink, setStatsLink] = useState<ShortenedLink | null>(null);
    const [showForm, setShowForm] = useState(true);

    // Load links on mount
    useEffect(() => {
        // Load sample links if this is the first time
        if (shouldLoadSamples()) {
            loadSampleLinks();
        }
        const loadedLinks = getAllLinks();
        setLinks(loadedLinks);
    }, []);

    const handleSubmitLink = (link: ShortenedLink) => {
        const success = saveLink(link);
        if (success) {
            setLinks(getAllLinks());
            setEditingLink(null);

            // Show success notification (you could add a toast here)
            console.log('Link saved successfully:', link.shortUrl);
        }
    };

    const handleDeleteLink = (id: string) => {
        if (confirm('Are you sure you want to delete this link?')) {
            const success = deleteLink(id);
            if (success) {
                setLinks(getAllLinks());
            }
        }
    };

    const handleBulkDelete = (ids: string[]) => {
        const success = deleteLinks(ids);
        if (success) {
            setLinks(getAllLinks());
        }
    };

    const handleToggleStatus = (id: string) => {
        const success = toggleLinkStatus(id);
        if (success) {
            setLinks(getAllLinks());
        }
    };

    const handleEditLink = (link: ShortenedLink) => {
        setEditingLink(link);
        setShowForm(true);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleViewStats = (link: ShortenedLink) => {
        setStatsLink(link);
    };

    const existingSlugs = links.map(link => link.slug);

    // Calculate stats
    const totalLinks = links.length;
    const activeLinks = links.filter(link => link.isActive).length;
    const totalVisits = links.reduce((sum, link) => sum + link.currentVisits, 0);
    const avgVisits = totalLinks > 0 ? (totalVisits / totalLinks).toFixed(1) : '0';

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
                            <Link2 size={18} />
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold dark:font-mono">TOTAL LINKS</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalLinks}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                            <Zap size={18} />
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold dark:font-mono">ACTIVE</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{activeLinks}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                            <BarChart3 size={18} />
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold dark:font-mono">TOTAL VISITS</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{totalVisits}</div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                            <BarChart3 size={18} />
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold dark:font-mono">AVG VISITS</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 dark:text-white">{avgVisits}</div>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-1"
                >
                    <div className="lg:sticky lg:top-6">
                        {/* Toggle Form Button (Mobile) */}
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="lg:hidden w-full mb-4 px-4 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg text-white font-bold flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            {showForm ? 'Hide Form' : 'Create New Link'}
                        </button>

                        {/* Form */}
                        <div className={`${showForm ? 'block' : 'hidden lg:block'}`}>
                            <LinkForm
                                onSubmit={handleSubmitLink}
                                existingSlugs={existingSlugs}
                                editingLink={editingLink}
                            />
                            {editingLink && (
                                <button
                                    onClick={() => setEditingLink(null)}
                                    className="w-full mt-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    Cancel Editing
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Links List Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="lg:col-span-2"
                >
                    <LinkList
                        links={links}
                        onEdit={handleEditLink}
                        onDelete={handleDeleteLink}
                        onToggleStatus={handleToggleStatus}
                        onViewStats={handleViewStats}
                        onBulkDelete={handleBulkDelete}
                    />
                </motion.div>
            </div>

            {/* Stats Modal */}
            <AnimatePresence>
                {statsLink && (
                    <LinkStats
                        link={statsLink}
                        onClose={() => setStatsLink(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default LinkCenter;
