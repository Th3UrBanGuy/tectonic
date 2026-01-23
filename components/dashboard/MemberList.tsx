import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MoreHorizontal, Shield, Edit2, Trash2, X, Save, UserPlus } from 'lucide-react';

const initialMembers = [
    { id: 1, name: 'Sarah Connor', role: 'System Admin', email: 'sarah@nexus.com', status: 'Active' },
    { id: 2, name: 'John Doe', role: 'Developer', email: 'john@nexus.com', status: 'Active' },
    { id: 3, name: 'Jane Smith', role: 'Designer', email: 'jane@nexus.com', status: 'Offline' },
    { id: 4, name: 'Mike Johnson', role: 'Analyst', email: 'mike@nexus.com', status: 'In Meeting' },
    { id: 5, name: 'Emily Davis', role: 'Manager', email: 'emily@nexus.com', status: 'Active' },
    { id: 6, name: 'David Wilson', role: 'Developer', email: 'david@nexus.com', status: 'Active' },
];

const MemberList = () => {
    const [members, setMembers] = useState(initialMembers);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to terminate this operative?')) {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    const handleEditClick = (member: any) => {
        setEditingMember({ ...member });
        setIsEditModalOpen(true);
    };

    const handleSave = () => {
        setMembers(members.map(m => m.id === editingMember.id ? editingMember : m));
        setIsEditModalOpen(false);
        setEditingMember(null);
    };

    return (
        <div className="relative">
            {/* Header Actions */}
            <div className="flex justify-end mb-6">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                    <UserPlus size={18} />
                    NEW OPERATIVE
                </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                            whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2, zIndex: 10 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                            className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors hover:border-cyan-500/30 relative overflow-hidden shadow-sm dark:shadow-xl"
                            style={{ perspective: 1000 }}
                        >
                            {/* Glass Reflection Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); handleEditClick(member); }}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors shadow-lg"
                                    title="Edit Profile"
                                >
                                    <Edit2 size={14} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => { e.stopPropagation(); handleDelete(member.id); }}
                                    className="p-2 bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                                    title="Terminate"
                                >
                                    <Trash2 size={14} />
                                </motion.button>
                            </div>

                            <div className="flex justify-between items-start mb-4 relative z-0">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20 ring-2 ring-white/10"
                                >
                                    {member.name.charAt(0)}
                                </motion.div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                            <p className="text-sm text-cyan-600 dark:text-cyan-500/80 mb-4 flex items-center gap-1 font-mono">
                                <Shield size={12} />
                                {member.role.toUpperCase()}
                            </p>

                            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/5">
                                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 truncate">
                                    <Mail size={14} className="shrink-0" />
                                    {member.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' :
                                        member.status === 'Offline' ? 'bg-slate-400 dark:bg-slate-500' : 'bg-amber-500'
                                        }`} />
                                    <span className="text-xs text-slate-500 dark:text-slate-300 font-mono">{member.status}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, rotateX: -10 }}
                            animate={{ scale: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.9, y: 50, rotateX: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}

                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                        >
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsEditModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </motion.button>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Edit2 size={20} className="text-cyan-600 dark:text-cyan-400" />
                                EDIT OPERATIVE
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">NAME</label>
                                    <input
                                        type="text"
                                        value={editingMember.name}
                                        onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">ROLE</label>
                                    <input
                                        type="text"
                                        value={editingMember.role}
                                        onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">EMAIL</label>
                                    <input
                                        type="email"
                                        value={editingMember.email}
                                        onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">STATUS</label>
                                    <select
                                        value={editingMember.status}
                                        onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Offline">Offline</option>
                                        <option value="In Meeting">In Meeting</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-bold transition-colors"
                                >
                                    CANCEL
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSave}
                                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                                >
                                    <Save size={18} />
                                    SAVE CHANGES
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MemberList;
