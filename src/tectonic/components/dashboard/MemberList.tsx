import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Edit2, Trash2, X, Save, UserPlus, RefreshCw, Shield } from 'lucide-react';
import { getToken } from '../../services/auth';

interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

const MemberList = () => {
    const [members, setMembers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<AdminUser | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'admin', password: '' });
    const [saving, setSaving] = useState(false);

    const fetchMembers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/auth/users', {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (!res.ok) throw new Error('Failed to load operatives');
            const data = await res.json();
            setMembers(data.users || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const openAdd = () => {
        setEditingMember(null);
        setFormData({ name: '', email: '', role: 'admin', password: '' });
        setIsModalOpen(true);
    };

    const openEdit = (member: AdminUser) => {
        setEditingMember(member);
        setFormData({ name: member.name, email: member.email, role: member.role, password: '' });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = getToken();
            if (editingMember) {
                // Update existing user
                const body: any = { id: editingMember.id, name: formData.name, email: formData.email, role: formData.role };
                if (formData.password) body.password = formData.password;
                const res = await fetch('/api/auth/users', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify(body),
                });
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || 'Failed to update');
                }
            } else {
                // Create new user
                if (!formData.password || formData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }
                const res = await fetch('/api/auth/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify(formData),
                });
                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.error || 'Failed to create');
                }
            }
            setIsModalOpen(false);
            fetchMembers();
        } catch (err: any) {
            alert(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to terminate this operative?')) return;
        try {
            const res = await fetch('/api/auth/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
                body: JSON.stringify({ id }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to delete');
            }
            fetchMembers();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const statusForRole = (role: string) => role === 'admin' ? 'Active' : 'Active';

    return (
        <div className="relative">
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={fetchMembers}
                    className="flex items-center gap-2 px-4 py-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm"
                >
                    <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAdd}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                    <UserPlus size={18} />
                    NEW OPERATIVE
                </motion.button>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {members.map((member, index) => (
                            <motion.div
                                key={member.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
                                className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-white/10 transition-colors hover:border-cyan-500/30 relative overflow-hidden shadow-sm dark:shadow-xl"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => openEdit(member)}
                                        className="p-2 bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white transition-colors shadow-lg"
                                        title="Edit Profile"
                                    >
                                        <Edit2 size={14} />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDelete(member.id)}
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
                                        className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/20 ring-2 ring-white/10"
                                    >
                                        {member.name.charAt(0).toUpperCase()}
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
                                        <div className={`w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]`} />
                                        <span className="text-xs text-slate-500 dark:text-slate-300 font-mono">{statusForRole(member.role)}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!loading && members.length === 0 && (
                <div className="text-center py-20 text-slate-400 dark:text-slate-600">
                    <p className="text-lg font-medium">No operatives yet</p>
                    <p className="text-sm mt-1">Click "NEW OPERATIVE" to add an admin user</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
                        >
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </motion.button>

                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <Edit2 size={20} className="text-cyan-600 dark:text-cyan-400" />
                                {editingMember ? 'EDIT OPERATIVE' : 'NEW OPERATIVE'}
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">NAME</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">EMAIL</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">ROLE</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="editor">Editor</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-1">
                                        {editingMember ? 'NEW PASSWORD (leave blank to keep)' : 'PASSWORD *'}
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        placeholder={editingMember ? '••••••••' : 'Min 6 characters'}
                                        required={!editingMember}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-bold transition-colors"
                                >
                                    CANCEL
                                </motion.button>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            {editingMember ? 'SAVE CHANGES' : 'CREATE'}
                                        </>
                                    )}
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
