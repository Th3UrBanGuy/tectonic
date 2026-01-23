import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, Eye, Trash2, Star, CheckSquare, X, Reply } from 'lucide-react';

const initialInquiries = [
    { id: 1, name: 'Robert Fox', email: 'robert.fox@example.com', subject: 'Project Quote Request', date: 'Oct 24, 2025', status: 'New', preview: 'I would like to discuss a potential partnership...', fullText: 'I would like to discuss a potential partnership regarding your enterprise solutions. We are a FinTech startup looking to scale.' },
    { id: 2, name: 'Savannah Nguyen', email: 'savannah@example.com', subject: 'Technical Support', date: 'Oct 23, 2025', status: 'Read', preview: 'We are experiencing some issues with the API...', fullText: 'We are experiencing some issues with the API endpoints. Documentation seems outdated for v2.0.' },
    { id: 3, name: 'Cody Fisher', email: 'cody.fisher@example.com', subject: 'Job Application', date: 'Oct 22, 2025', status: 'Starred', preview: 'Attached is my resume for the Senior Developer...', fullText: 'Attached is my resume for the Senior Developer position. I have 5 years of experience in React and Node.js.' },
    { id: 4, name: 'Esther Howard', email: 'esther@example.com', subject: 'Product Demo', date: 'Oct 21, 2025', status: 'Read', preview: 'Can we schedule a demo for next Tuesday?', fullText: 'Can we schedule a demo for next Tuesday? Our team is available between 1PM and 4PM EST.' },
    { id: 5, name: 'Jenny Wilson', email: 'jenny@example.com', subject: 'Feedback', date: 'Oct 20, 2025', status: 'New', preview: 'Just wanted to say the new interface looks...', fullText: 'Just wanted to say the new interface looks amazing! The dark mode implementation is top notch.' },
];

const Inquiries = () => {
    const [inquiries, setInquiries] = useState(initialInquiries);
    const [selectedInquiry, setSelectedInquiry] = useState<any>(null);

    const handleDelete = (id: number) => {
        if (confirm('Permanently delete this inquiry?')) {
            setInquiries(inquiries.filter(i => i.id !== id));
            if (selectedInquiry?.id === id) setSelectedInquiry(null);
        }
    };

    const handleToggleStatus = (id: number, newStatus: string) => {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
    };

    const handleView = (inquiry: any) => {
        setSelectedInquiry(inquiry);
        if (inquiry.status === 'New') {
            handleToggleStatus(inquiry.id, 'Read');
        }
    };

    return (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden backdrop-blur-sm relative min-h-[500px] shadow-sm dark:shadow-2xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                    <thead className="bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-mono text-xs uppercase">
                        <tr>
                            <th className="p-4 w-10"><input type="checkbox" className="rounded border-slate-700 bg-slate-800" /></th>
                            <th className="p-4">Sender</th>
                            <th className="p-4">Subject</th>
                            <th className="p-4 hidden md:table-cell">Preview</th>
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
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                                    whileTap={{ scale: 0.99, backgroundColor: 'rgba(6,182,212,0.1)' }}
                                    transition={{ delay: index * 0.05 }}

                                    className="transition-colors group cursor-pointer relative hover:bg-slate-50 dark:hover:bg-white/5"
                                    onClick={() => handleView(inquiry)}
                                >
                                    <td className="p-4" onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" className="rounded border-slate-700 bg-slate-800" />
                                    </td>
                                    <td className="p-4">
                                        <div className="text-slate-900 dark:text-white font-medium">{inquiry.name}</div>
                                        <div className="text-xs text-slate-500">{inquiry.email}</div>
                                    </td>
                                    <td className="p-4 text-slate-900 dark:text-white font-medium">{inquiry.subject}</td>
                                    <td className="p-4 hidden md:table-cell truncate max-w-xs">{inquiry.preview}</td>
                                    <td className="p-4 whitespace-nowrap text-xs font-mono">{inquiry.date}</td>
                                    <td className="p-4">
                                        <motion.span
                                            whileHover={{ scale: 1.1 }}
                                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${inquiry.status === 'New' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' :
                                                inquiry.status === 'Starred' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                                                    'bg-slate-700/50 text-slate-400 border-slate-600'
                                                }`}>
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

            {/* View Modal */}
            <AnimatePresence>
                {selectedInquiry && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}

                        className="absolute inset-0 z-50 bg-white dark:bg-slate-900/95 backdrop-blur-md flex flex-col p-6 lg:p-12"
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
                                    className="flex items-center gap-2 text-slate-400"
                                >
                                    <span className="bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-xs text-slate-700 dark:text-white">{selectedInquiry.name}</span>
                                    <span className="text-sm">&lt;{selectedInquiry.email}&gt;</span>
                                    <span className="text-xs">• {selectedInquiry.date}</span>
                                </motion.div>
                            </div>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedInquiry(null)}

                                className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}

                            className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 text-slate-700 dark:text-slate-300 leading-relaxed font-sans text-lg overflow-y-auto"
                        >
                            {selectedInquiry.fullText}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 flex gap-4"
                        >
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all"
                            >
                                <Reply size={18} />
                                REPLY
                            </motion.button>
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
