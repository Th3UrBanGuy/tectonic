import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Eye, Trash2, Star, X, Reply, Inbox, RefreshCw } from 'lucide-react';
import { getToken } from '../../services/auth';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    company?: string | null;
    phone?: string | null;
    department?: string | null;
    projectType?: string | null;
    budget?: string | null;
    subject: string;
    message: string;
    status: string;
    createdAt: string;
}

const Inquiries = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchInquiries = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/contact', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error('Failed to load inquiries');
            const data = await res.json();
            setInquiries(data.submissions || []);
        } catch (err: any) {
            setError(err.message || 'Failed to load inquiries');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInquiries();
    }, [fetchInquiries]);

    const formatDate = (iso: string) => {
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Permanently delete this inquiry?')) return;
        try {
            await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setInquiries(inquiries.filter(i => i.id !== id));
            if (selectedInquiry?.id === id) setSelectedInquiry(null);
        } catch {
            alert('Failed to delete inquiry');
        }
    };

    const handleToggleStatus = async (id: string, newStatus: string) => {
        try {
            await fetch(`/api/contact/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        } catch {
            alert('Failed to update status');
        }
    };

    const handleView = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
        if (inquiry.status === 'New') {
            handleToggleStatus(inquiry.id, 'Read');
        }
    };

    return (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden backdrop-blur-sm relative min-h-[500px] shadow-sm dark:shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Inbox size={16} />
                    <span className="text-sm font-medium">{inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'}</span>
                </div>
                <button
                    onClick={fetchInquiries}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white transition-colors"
                    title="Refresh"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : error ? (
                <div className="text-center py-20 text-red-500 dark:text-red-400">
                    <p className="mb-3">{error}</p>
                    <button onClick={fetchInquiries} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm">Retry</button>
                </div>
            ) : inquiries.length === 0 ? (
                <div className="text-center py-20 text-slate-400 dark:text-slate-600">
                    <Mail size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No inquiries yet</p>
                    <p className="text-sm mt-1">Contact form submissions will appear here</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-mono text-xs uppercase">
                            <tr>
                                <th className="p-4">Sender</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4 hidden md:table-cell">Message</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                            <AnimatePresence>
                                {inquiries.map((inquiry, index) => (
                                    <motion.tr
                                        key={inquiry.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="transition-colors group cursor-pointer relative hover:bg-slate-50 dark:hover:bg-white/5"
                                        onClick={() => handleView(inquiry)}
                                    >
                                        <td className="p-4">
                                            <div className="text-slate-900 dark:text-white font-medium">{inquiry.name}</div>
                                            <div className="text-xs text-slate-500">{inquiry.email}</div>
                                        </td>
                                        <td className="p-4 text-slate-900 dark:text-white font-medium">{inquiry.subject}</td>
                                        <td className="p-4 hidden md:table-cell truncate max-w-xs">{inquiry.message}</td>
                                        <td className="p-4 whitespace-nowrap text-xs font-mono">{formatDate(inquiry.createdAt)}</td>
                                        <td className="p-4">
                                            <motion.span
                                                whileHover={{ scale: 1.1 }}
                                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${inquiry.status === 'New' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' :
                                                    inquiry.status === 'Starred' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                        'bg-slate-700/50 text-slate-400 border-slate-600'
                                                    }`}
                                            >
                                                {inquiry.status}
                                            </motion.span>
                                        </td>
                                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleView(inquiry)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleToggleStatus(inquiry.id, inquiry.status === 'Starred' ? 'Read' : 'Starred')}
                                                    className={`p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors ${inquiry.status === 'Starred' ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400'}`}
                                                    title="Star"
                                                >
                                                    <Star size={16} fill={inquiry.status === 'Starred' ? 'currentColor' : 'none'} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => handleDelete(inquiry.id)}
                                                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg text-slate-400 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}

            {/* View Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="absolute inset-0 z-50 bg-white dark:bg-slate-900/95 backdrop-blur-md flex flex-col p-6 lg:p-12 overflow-y-auto"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
                                >
                                    {selectedInquiry.subject}
                                </motion.h2>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="flex items-center flex-wrap gap-2 text-slate-400"
                                >
                                    <span className="bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-xs text-slate-700 dark:text-white">{selectedInquiry.name}</span>
                                    <span className="text-sm">&lt;{selectedInquiry.email}&gt;</span>
                                    <span className="text-xs">• {formatDate(selectedInquiry.createdAt)}</span>
                                </motion.div>
                                {(selectedInquiry.company || selectedInquiry.phone || selectedInquiry.budget) && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.25 }}
                                        className="flex flex-wrap gap-2 mt-3"
                                    >
                                        {selectedInquiry.company && (
                                            <span className="px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded text-xs">{selectedInquiry.company}</span>
                                        )}
                                        {selectedInquiry.department && (
                                            <span className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded text-xs">{selectedInquiry.department}</span>
                                        )}
                                        {selectedInquiry.budget && (
                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded text-xs">{selectedInquiry.budget}</span>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedInquiry(null)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex-shrink-0"
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-lg overflow-y-auto whitespace-pre-wrap"
                        >
                            {selectedInquiry.message}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-4"
                        >
                            <motion.a
                                whileTap={{ scale: 0.95 }}
                                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
                            >
                                <Reply size={18} />
                                REPLY
                            </motion.a>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    handleDelete(selectedInquiry.id);
                                    setSelectedInquiry(null);
                                }}
                                className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-bold flex items-center gap-2 transition-colors"
                            >
                                <Trash2 size={18} />
                                DELETE
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Inquiries;
