import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, User } from 'lucide-react';
import { TeamMember } from '../../types';
import { useContent } from '../ContentContext';

const TeamManager: React.FC = () => {
    const { team, setTeam } = useContent();
    const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = (data: Omit<TeamMember, 'id'>) => {
        const newItem = { ...data, id: `tm_${Date.now()}` };
        setTeam([...team, newItem]);
        setShowForm(false);
    };

    const handleUpdate = (id: string, data: Partial<TeamMember>) => {
        const updated = team.map(t => t.id === id ? { ...t, ...data } : t);
        setTeam(updated);
        setEditingMember(null);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this team member?')) {
            const updated = team.filter(t => t.id !== id);
            setTeam(updated);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Leadership Team</h3>
                <button
                    onClick={() => {
                        setEditingMember(null);
                        setShowForm(true);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} />
                    Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <motion.div
                        key={member.id}
                        layout
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/10 transition-colors group shadow-sm dark:shadow-none"
                    >
                        <div className="relative h-48 bg-slate-200 dark:bg-slate-800">
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                                    <User size={48} />
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => setEditingMember(member)}
                                    className="p-1.5 bg-black/50 hover:bg-cyan-500/80 rounded text-white backdrop-blur-sm"
                                >
                                    <Edit2 size={14} />
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="p-1.5 bg-black/50 hover:bg-red-500/80 rounded text-white backdrop-blur-sm"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">{member.name}</h3>
                            <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-2">{member.role}</p>
                            <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-3">{member.bio}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {(showForm || editingMember) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowForm(false);
                            setEditingMember(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-xl"
                        >
                            <TeamMemberForm
                                member={editingMember}
                                onSave={(data) => {
                                    if (editingMember) {
                                        handleUpdate(editingMember.id, data);
                                    } else {
                                        handleAdd(data as Omit<TeamMember, 'id'>);
                                    }
                                }}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingMember(null);
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TeamMemberForm: React.FC<{
    member?: TeamMember | null;
    onSave: (data: Partial<TeamMember>) => void;
    onCancel: () => void;
}> = ({ member, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: member?.name || '',
        role: member?.role || '',
        image: member?.image || '',
        bio: member?.bio || '',
        socials: member?.socials || { linkedin: '', twitter: '', github: '' }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {member ? 'Edit' : 'Add'} Team Member
            </h2>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Role</label>
                <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Image URL</label>
                <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Bio</label>
                <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                    rows={4}
                />
            </div>

            <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                    <Save size={16} /> Save
                </button>
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium flex items-center gap-2">
                    <X size={16} /> Cancel
                </button>
            </div>
        </form>
    );
};

export default TeamManager;
