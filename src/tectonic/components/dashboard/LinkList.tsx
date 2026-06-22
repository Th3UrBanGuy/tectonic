import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Download } from 'lucide-react';
import { ShortenedLink } from '../../types';
import LinkCard from './LinkCard';
import { isLinkExpired } from '../../utils/linkUtils';

interface LinkListProps {
    links: ShortenedLink[];
    onEdit: (link: ShortenedLink) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onViewStats: (link: ShortenedLink) => void;
    onBulkDelete: (ids: string[]) => void;
}

type FilterType = 'all' | 'active' | 'expired' | 'locked';
type SortType = 'newest' | 'oldest' | 'most-visited' | 'expiring-soon';

const LinkList: React.FC<LinkListProps> = ({
    links,
    onEdit,
    onDelete,
    onToggleStatus,
    onViewStats,
    onBulkDelete
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const [sort, setSort] = useState<SortType>('newest');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Filter links
    const filteredLinks = links.filter(link => {
        // Search filter
        const matchesSearch =
            link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        // Status filter
        switch (filter) {
            case 'active':
                return link.isActive && !isLinkExpired(link);
            case 'expired':
                return isLinkExpired(link);
            case 'locked':
                return !!link.password;
            default:
                return true;
        }
    });

    // Sort links
    const sortedLinks = [...filteredLinks].sort((a, b) => {
        switch (sort) {
            case 'newest':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'most-visited':
                return b.currentVisits - a.currentVisits;
            case 'expiring-soon':
                if (!a.expiresAt) return 1;
                if (!b.expiresAt) return -1;
                return new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
            default:
                return 0;
        }
    });

    const handleSelectAll = () => {
        if (selectedIds.length === sortedLinks.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(sortedLinks.map(link => link.id));
        }
    };

    const handleSelectLink = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleBulkDelete = () => {
        if (selectedIds.length > 0 && confirm(`Delete ${selectedIds.length} link(s)?`)) {
            onBulkDelete(selectedIds);
            setSelectedIds([]);
        }
    };

    const handleExport = () => {
        const data = JSON.stringify(sortedLinks, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `links-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-4 backdrop-blur-sm">
                {/* Search */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search links..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-white rounded-lg placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                </div>

                {/* Filters and Sort */}
                <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter size={16} className="text-slate-400" />
                        <div className="flex flex-wrap gap-2">
                            {(['all', 'active', 'expired', 'locked'] as FilterType[]).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f
                                        ? 'bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30'
                                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-400 dark:border-white/10 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortType)}
                            className="px-3 py-1.5 bg-slate-50 border-slate-200 text-slate-700 dark:bg-white/5 dark:border-white/10 dark:text-white rounded-lg text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="most-visited">Most Visited</option>
                            <option value="expiring-soon">Expiring Soon</option>
                        </select>

                        <button
                            onClick={handleExport}
                            className="px-3 py-1.5 bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Download size={16} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedIds.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between"
                    >
                        <span className="text-sm text-slate-400">
                            {selectedIds.length} link{selectedIds.length !== 1 ? 's' : ''} selected
                        </span>
                        <button
                            onClick={handleBulkDelete}
                            className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                        >
                            <Trash2 size={16} />
                            Delete Selected
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-slate-400">
                <span>
                    {sortedLinks.length} link{sortedLinks.length !== 1 ? 's' : ''} found
                </span>
                {sortedLinks.length > 0 && (
                    <button
                        onClick={handleSelectAll}
                        className="hover:text-cyan-400 transition-colors"
                    >
                        {selectedIds.length === sortedLinks.length ? 'Deselect All' : 'Select All'}
                    </button>
                )}
            </div>

            {/* Links Grid */}
            <AnimatePresence mode="popLayout">
                {sortedLinks.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {sortedLinks.map((link) => (
                            <div key={link.id} className="relative">
                                {/* Selection Checkbox */}
                                <div className="absolute top-3 left-3 z-10">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(link.id)}
                                        onChange={() => handleSelectLink(link.id)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/10 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
                                    />
                                </div>
                                <div className="pl-8">
                                    <LinkCard
                                        link={link}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onToggleStatus={onToggleStatus}
                                        onViewStats={onViewStats}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white border border-slate-200 dark:bg-white/5 dark:border-white/10 rounded-xl p-12 text-center"
                    >
                        <div className="text-slate-500 mb-2">
                            {searchQuery || filter !== 'all' ? 'No links match your filters' : 'No links created yet'}
                        </div>
                        <div className="text-sm text-slate-600">
                            {searchQuery || filter !== 'all' ? 'Try adjusting your search or filters' : 'Create your first shortened link to get started'}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LinkList;
