"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Plus, BarChart3, Zap, Trash2, Eye, EyeOff, Copy, ExternalLink, RefreshCw, Loader2, Search, Filter, ArrowUpDown, MoreVertical } from 'lucide-react';

interface Link {
    id: string;
    originalUrl: string;
    slug: string;
    shortUrl: string;
    password: boolean;
    waitingTime: number;
    maxVisits: number | null;
    currentVisits: number;
    isActive: boolean;
    expiresAt: string | null;
    createdAt: string;
    visitCount: number;
}

const LinkCenter: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingLink, setEditingLink] = useState<Link | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'createdAt' | 'currentVisits' | 'slug'>('createdAt');
    const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');

    // Form state
    const [formUrl, setFormUrl] = useState('');
    const [formSlug, setFormSlug] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formMaxVisits, setFormMaxVisits] = useState('');
    const [formExpires, setFormExpires] = useState('');
    const [formError, setFormError] = useState('');

    const loadLinks = useCallback(async () => {
        try {
            const res = await fetch('/api/links');
            const data = await res.json();
            setLinks(data.data || []);
        } catch (error) {
            console.error('Failed to load links:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadLinks(); }, [loadLinks]);

    const handleSubmit = async () => {
        setFormError('');
        if (!formUrl) { setFormError('URL is required'); return; }
        if (!formSlug) { setFormError('Slug is required'); return; }

        setSaving(true);
        try {
            const payload: any = {
                originalUrl: formUrl,
                slug: formSlug,
                shortUrl: formSlug,
                password: formPassword || undefined,
                maxVisits: formMaxVisits ? parseInt(formMaxVisits) : undefined,
                expiresAt: formExpires || undefined,
            };

            if (editingLink) {
                payload.id = editingLink.id;
                await fetch('/api/links', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                const res = await fetch('/api/links', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (!res.ok) { setFormError(data.error || 'Failed to create'); return; }
            }

            setShowForm(false);
            setEditingLink(null);
            resetForm();
            loadLinks();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this link?')) return;
        await fetch(`/api/links?id=${id}`, { method: 'DELETE' });
        loadLinks();
    };

    const handleToggle = async (link: Link) => {
        await fetch('/api/links', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: link.id, isActive: !link.isActive }),
        });
        loadLinks();
    };

    const handleEdit = (link: Link) => {
        setEditingLink(link);
        setFormUrl(link.originalUrl);
        setFormSlug(link.slug);
        setFormMaxVisits(link.maxVisits?.toString() || '');
        setFormExpires(link.expiresAt ? link.expiresAt.split('T')[0] : '');
        setShowForm(true);
    };

    const resetForm = () => {
        setFormUrl(''); setFormSlug(''); setFormPassword('');
        setFormMaxVisits(''); setFormExpires(''); setFormError('');
        setEditingLink(null);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    const generateSlug = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let slug = '';
        for (let i = 0; i < 6; i++) slug += chars[Math.floor(Math.random() * chars.length)];
        setFormSlug(slug);
    };

    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://tect0nic.com';

    // Filter and sort
    const filteredLinks = links
        .filter(l => {
            if (filterActive === 'active') return l.isActive;
            if (filterActive === 'inactive') return !l.isActive;
            return true;
        })
        .filter(l =>
            l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'currentVisits') return b.currentVisits - a.currentVisits;
            if (sortBy === 'slug') return a.slug.localeCompare(b.slug);
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

    const totalLinks = links.length;
    const activeLinks = links.filter(l => l.isActive).length;
    const totalVisits = links.reduce((sum, l) => sum + l.currentVisits, 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Total Links', value: totalLinks, icon: Link2, color: 'cyan' },
                    { label: 'Active', value: activeLinks, icon: Zap, color: 'emerald' },
                    { label: 'Total Visits', value: totalVisits, icon: BarChart3, color: 'purple' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <stat.icon size={14} className={`text-${stat.color}-500`} />
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => { resetForm(); setShowForm(!showForm); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
                >
                    <Plus size={16} />
                    {editingLink ? 'Edit Link' : 'New Link'}
                </button>

                <div className="flex-1 flex gap-2">
                    <div className="flex-1 relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search links..."
                            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                        />
                    </div>
                    <select
                        value={filterActive}
                        onChange={(e) => setFilterActive(e.target.value as any)}
                        className="px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none"
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-700 dark:text-slate-300 outline-none"
                    >
                        <option value="createdAt">Newest</option>
                        <option value="currentVisits">Most Visits</option>
                        <option value="slug">A-Z</option>
                    </select>
                </div>
            </div>

            {/* Create/Edit Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
                            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                {editingLink ? 'Edit Link' : 'Create New Link'}
                            </h3>
                            {formError && (
                                <div className="px-3 py-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-sm text-red-600 dark:text-red-400">
                                    {formError}
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Destination URL</label>
                                    <input
                                        type="url"
                                        value={formUrl}
                                        onChange={(e) => setFormUrl(e.target.value)}
                                        placeholder="https://example.com/your-page"
                                        className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Custom Slug</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formSlug}
                                            onChange={(e) => setFormSlug(e.target.value)}
                                            placeholder="my-link"
                                            className="flex-1 px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 font-mono"
                                        />
                                        <button onClick={generateSlug} className="px-3 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors" title="Generate random slug">
                                            <RefreshCw size={14} />
                                        </button>
                                    </div>
                                    {formSlug && (
                                        <p className="text-xs text-slate-400 mt-1 font-mono">{siteUrl}/go/{formSlug}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Password (optional)</label>
                                    <input
                                        type="text"
                                        value={formPassword}
                                        onChange={(e) => setFormPassword(e.target.value)}
                                        placeholder="Leave empty for no password"
                                        className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Max Visits (optional)</label>
                                    <input
                                        type="number"
                                        value={formMaxVisits}
                                        onChange={(e) => setFormMaxVisits(e.target.value)}
                                        placeholder="Unlimited"
                                        className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Expires (optional)</label>
                                    <input
                                        type="date"
                                        value={formExpires}
                                        onChange={(e) => setFormExpires(e.target.value)}
                                        className="w-full px-3 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-semibold hover:bg-brand-600 transition-colors disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                                    {editingLink ? 'Update Link' : 'Create Link'}
                                </button>
                                <button
                                    onClick={() => { setShowForm(false); resetForm(); }}
                                    className="px-4 py-2.5 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Links List */}
            <div className="space-y-2">
                {filteredLinks.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <Link2 size={40} className="mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No links found</p>
                        <p className="text-sm mt-1">Create your first shortened link above</p>
                    </div>
                ) : (
                    filteredLinks.map((link) => (
                        <motion.div
                            key={link.id}
                            layout
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <button
                                            onClick={() => copyToClipboard(`${siteUrl}/go/${link.slug}`)}
                                            className="flex items-center gap-1.5 text-sm font-mono font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                                        >
                                            /go/{link.slug}
                                            <Copy size={12} className="opacity-50" />
                                        </button>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${link.isActive ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                            {link.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        {link.password && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400">Protected</span>
                                        )}
                                        {link.expiresAt && new Date(link.expiresAt) < new Date() && (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400">Expired</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{link.originalUrl}</p>
                                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                        <span>{link.currentVisits} visits</span>
                                        {link.maxVisits && <span>Max: {link.maxVisits}</span>}
                                        {link.expiresAt && <span>Expires: {new Date(link.expiresAt).toLocaleDateString()}</span>}
                                        <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => copyToClipboard(`${siteUrl}/go/${link.slug}`)}
                                        className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg transition-colors"
                                        title="Copy short URL"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <a
                                        href={link.originalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                        title="Open original"
                                    >
                                        <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => handleToggle(link)}
                                        className={`p-2 rounded-lg transition-colors ${link.isActive ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                        title={link.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {link.isActive ? <Eye size={14} /> : <EyeOff size={14} />}
                                    </button>
                                    <button
                                        onClick={() => handleEdit(link)}
                                        className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <BarChart3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LinkCenter;
