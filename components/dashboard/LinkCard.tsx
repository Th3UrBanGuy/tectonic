import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Copy, Edit2, Trash2, BarChart3, Eye, EyeOff,
    Lock, Clock, Users, Calendar, ExternalLink, Check
} from 'lucide-react';
import { ShortenedLink } from '../../types';
import { calculateTimeRemaining, formatDate, copyToClipboard, isLinkExpired } from '../../utils/linkUtils';

interface LinkCardProps {
    link: ShortenedLink;
    onEdit: (link: ShortenedLink) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string) => void;
    onViewStats: (link: ShortenedLink) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete, onToggleStatus, onViewStats }) => {
    const [copied, setCopied] = useState(false);
    const expired = isLinkExpired(link);
    const visitProgress = link.maxVisits ? (link.currentVisits / link.maxVisits) * 100 : 0;

    const handleCopy = async () => {
        const success = await copyToClipboard(link.shortUrl);
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getStatusColor = () => {
        if (!link.isActive) return 'text-slate-500 bg-slate-500/10';
        if (expired) return 'text-red-400 bg-red-500/10';
        if (link.maxVisits && link.currentVisits >= link.maxVisits) return 'text-orange-400 bg-orange-500/10';
        return 'text-emerald-400 bg-emerald-500/10';
    };

    const getStatusText = () => {
        if (!link.isActive) return 'Inactive';
        if (expired) return 'Expired';
        if (link.maxVisits && link.currentVisits >= link.maxVisits) return 'Limit Reached';
        return 'Active';
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 backdrop-blur-sm dark:hover:bg-white/10 transition-all group"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                    {/* Short URL */}
                    <div className="flex items-center gap-2 mb-2">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group/copy"
                        >
                            <span className="font-mono text-lg font-bold truncate">
                                {link.shortUrl}
                            </span>
                            {copied ? (
                                <Check size={16} className="text-emerald-400" />
                            ) : (
                                <Copy size={16} className="opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                            )}
                        </button>
                    </div>

                    {/* Original URL */}
                    <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-400 hover:text-slate-300 flex items-center gap-1 truncate"
                    >
                        <span className="truncate">{link.originalUrl}</span>
                        <ExternalLink size={12} className="flex-shrink-0" />
                    </a>
                </div>

                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor()} flex-shrink-0 ml-3`}>
                    {getStatusText()}
                </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <BarChart3 size={12} />
                        <span>Visits</span>
                    </div>
                    <div className="text-slate-900 dark:text-white font-bold">
                        {link.currentVisits}
                        {link.maxVisits && <span className="text-slate-400 dark:text-slate-500 text-sm"> / {link.maxVisits}</span>}
                    </div>
                    {link.maxVisits && (
                        <div className="mt-2 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cyan-500 transition-all"
                                style={{ width: `${Math.min(visitProgress, 100)}%` }}
                            />
                        </div>
                    )}
                </div>

                <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                        <Calendar size={12} />
                        <span>Expires</span>
                    </div>
                    <div className={`font-bold ${expired ? 'text-red-500 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                        {calculateTimeRemaining(link.expiresAt)}
                    </div>
                </div>
            </div>

            {/* Features Row */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {link.password && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded text-purple-400 text-xs">
                        <Lock size={10} />
                        <span>Protected</span>
                    </div>
                )}
                {link.waitingTime > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded text-amber-400 text-xs">
                        <Clock size={10} />
                        <span>{link.waitingTime}s wait</span>
                    </div>
                )}
                {link.maxVisits && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-xs">
                        <Users size={10} />
                        <span>Limited</span>
                    </div>
                )}
            </div>

            {/* Created Date */}
            <div className="text-xs text-slate-500 mb-4">
                Created {formatDate(link.createdAt)}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onViewStats(link)}
                    className="flex-1 px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                    <BarChart3 size={14} />
                    Stats
                </button>

                <button
                    onClick={() => onEdit(link)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                >
                    <Edit2 size={14} />
                </button>

                <button
                    onClick={() => onToggleStatus(link.id)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:bg-white/5 dark:border-white/10 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
                >
                    {link.isActive ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>

                <button
                    onClick={() => onDelete(link.id)}
                    className="px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </motion.div>
    );
};

export default LinkCard;
