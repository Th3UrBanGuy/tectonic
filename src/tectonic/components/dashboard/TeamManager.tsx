import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, User, Image as ImageIcon, FileText, Link2 } from 'lucide-react';
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
        website: member?.website || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Form Header */}
            <div className="flex items-center gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-600 dark:text-cyan-400">
                    <User size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {member ? 'Edit' : 'Add'} Team Member
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Add a leader or contributor to your team</p>
                </div>
            </div>

            {/* Member Profile Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <User size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Member Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., John Doe"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Role / Title</label>
                        <input
                            type="text"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            placeholder="e.g., Chief Executive Officer"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Profile Image Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <ImageIcon size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Profile Image</h3>
                </div>
                <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-24 h-24 rounded-xl bg-slate-100 dark:bg-slate-950/50 border-2 border-dashed border-slate-300 dark:border-white/10 overflow-hidden flex items-center justify-center">
                        {formData.image ? (
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User size={32} className="text-slate-400 dark:text-slate-600" />
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://example.com/photo.jpg"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">Paste a direct image URL. Recommended size: 400x400px.</p>
                    </div>
                </div>
            </div>

            {/* About & Contact Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <FileText size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">About & Contact</h3>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Biography</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        rows={4}
                        placeholder="A short bio describing the member's background, expertise, and achievements."
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Website URL</label>
                    <div className="relative">
                        <Link2 size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            placeholder="https://member-site.com"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-5 border-t border-slate-200 dark:border-white/10">
                <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all"
                >
                    <Save size={18} />
                    {member ? 'Update' : 'Save'} Member
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                    <X size={18} />
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default TeamManager;
