import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Wing } from '../../types';
import { useContent } from '../ContentContext';

const WingsManager: React.FC = () => {
    const { wings, setWings } = useContent();
    const [editingWing, setEditingWing] = useState<Wing | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = (data: Wing) => {
        setWings([...wings, data]);
        setShowForm(false);
    };

    const handleUpdate = (id: string, data: Partial<Wing>) => {
        const updated = wings.map(w => w.id === id ? { ...w, ...data } : w);
        setWings(updated);
        setEditingWing(null);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this wing?')) {
            const updated = wings.filter(w => w.id !== id);
            setWings(updated);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Wings / Departments</h3>
                <button
                    onClick={() => {
                        setEditingWing(null);
                        setShowForm(true);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} />
                    Add Wing
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {wings.map((wing) => (
                    <motion.div
                        key={wing.id}
                        layout
                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{wing.name}</h3>
                                <p className="text-cyan-600 dark:text-cyan-400 text-sm">{wing.tagline}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingWing(wing)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(wing.id)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{wing.description}</p>

                        {/* Summary Chips */}
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs text-slate-600 dark:text-slate-400">
                                Team: {wing.teamName}
                            </span>
                            <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs text-slate-600 dark:text-slate-400">
                                Tech: {wing.techStack.length} items
                            </span>
                            <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 rounded text-xs text-slate-600 dark:text-slate-400">
                                Features: {wing.features.length} items
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {(showForm || editingWing) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowForm(false);
                            setEditingWing(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                        >
                            <WingForm
                                wing={editingWing}
                                onSave={(data) => {
                                    if (editingWing) {
                                        handleUpdate(editingWing.id, data);
                                    } else {
                                        handleAdd(data as Wing);
                                    }
                                }}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingWing(null);
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const WingForm: React.FC<{
    wing?: Wing | null;
    onSave: (data: Partial<Wing>) => void;
    onCancel: () => void;
}> = ({ wing, onSave, onCancel }) => {
    // This needs to be a robust form due to nested complexity
    // For MVP, we will use JSON string replacement ONLY for complex nested arrays if the UI is too hard, 
    // but let's try to do simple array inputs for techStack and features at least.

    const [formData, setFormData] = useState<Partial<Wing>>({
        id: wing?.id || `wing_${Date.now()}`,
        name: wing?.name || '',
        tagline: wing?.tagline || '',
        description: wing?.description || '',
        color: wing?.color || 'text-cyan-500',
        techStack: wing?.techStack || [],
        features: wing?.features || [],
        teamName: wing?.teamName || '',
        teamPurpose: wing?.teamPurpose || '',
        teamLogo: wing?.teamLogo || '',
        teamSubtitle: wing?.teamSubtitle || '',
        teamTimeline: wing?.teamTimeline || [],
        teamAchievements: wing?.teamAchievements || []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    // Helper to update array strings
    const handleArrayChange = (field: 'techStack' | 'features' | 'teamAchievements', value: string) => {
        setFormData({ ...formData, [field]: value.split('\n').filter(s => s.trim()) });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {wing ? 'Edit' : 'Add'} Wing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 border-b border-slate-200 dark:border-white/10 pb-2">General Info</h3>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">ID (Unique)</label>
                        <input
                            type="text"
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                            required
                        />
                    </div>
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
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Tagline</label>
                        <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Color Class</label>
                        <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                            rows={3}
                        />
                    </div>
                </div>

                {/* Team Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 border-b border-slate-200 dark:border-white/10 pb-2">Team Details</h3>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Team Name</label>
                        <input
                            type="text"
                            value={formData.teamName}
                            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Team Subtitle</label>
                        <input
                            type="text"
                            value={formData.teamSubtitle}
                            onChange={(e) => setFormData({ ...formData, teamSubtitle: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Team Logo URL</label>
                        <input
                            type="text"
                            value={formData.teamLogo}
                            onChange={(e) => setFormData({ ...formData, teamLogo: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Team Purpose</label>
                        <textarea
                            value={formData.teamPurpose}
                            onChange={(e) => setFormData({ ...formData, teamPurpose: e.target.value })}
                            className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lists */}
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Tech Stack (One per line)</label>
                    <textarea
                        value={formData.techStack?.join('\n')}
                        onChange={(e) => handleArrayChange('techStack', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        rows={6}
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Features (One per line)</label>
                    <textarea
                        value={formData.features?.join('\n')}
                        onChange={(e) => handleArrayChange('features', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        rows={6}
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Achievements (One per line)</label>
                    <textarea
                        value={formData.teamAchievements?.join('\n')}
                        onChange={(e) => handleArrayChange('teamAchievements', e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                        rows={6}
                    />
                </div>
            </div>

            {/* Timeline Editor Placeholder - Complex Array */}
            {/* For now, just a note or JSON editor if needed, but let's skip for simplicity in V1 and rely on code for timeline structure if complex, OR JSON Area */}
            {/* Actually, let's enable basic JSON edit for timeline just in case */}
            {/* Leaving timeline alone for now or adding simple JSON editor */}
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Team Timeline (JSON) - Advanced</label>
                <textarea
                    value={JSON.stringify(formData.teamTimeline, null, 2)}
                    onChange={(e) => {
                        try {
                            setFormData({ ...formData, teamTimeline: JSON.parse(e.target.value) });
                        } catch (err) {
                            // ignore parse error while typing
                        }
                    }}
                    className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-green-600 dark:text-green-400 font-mono text-xs focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all"
                    rows={6}
                />
                <p className="text-xs text-slate-500 mt-1">Edit JSON array directly. Format: {"[{ \"year\": \"2023\", \"event\": \"...\" }]"} </p>
            </div>

            <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium flex items-center justify-center gap-2">
                    <Save size={18} />
                    Save Wing
                </button>
                <button type="button" onClick={onCancel} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium flex items-center gap-2">
                    <X size={18} />
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default WingsManager;
