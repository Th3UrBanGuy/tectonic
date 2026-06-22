import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Layers, Users, Code, Braces } from 'lucide-react';
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
            {/* Form Header */}
            <div className="flex items-center gap-3 pb-5 border-b border-slate-200 dark:border-white/10">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 text-cyan-600 dark:text-cyan-400">
                    <Layers size={22} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        {wing ? 'Edit' : 'Add'} Wing
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Configure wing details, team, and tech stack</p>
                </div>
            </div>

            {/* General Information Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Layers size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">General Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Unique ID</label>
                        <input
                            type="text"
                            value={formData.id}
                            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                            required
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">Used internally as a unique identifier</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Wing Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Tagline</label>
                        <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                            placeholder="A short catchy phrase"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Color Class</label>
                        <input
                            type="text"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            placeholder="text-cyan-500"
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm font-mono placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">Tailwind text color utility class</p>
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                    />
                </div>
            </div>

            {/* Team Details Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Users size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Team Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Team Name</label>
                        <input
                            type="text"
                            value={formData.teamName}
                            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Team Subtitle</label>
                        <input
                            type="text"
                            value={formData.teamSubtitle}
                            onChange={(e) => setFormData({ ...formData, teamSubtitle: e.target.value })}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Team Logo URL</label>
                    <input
                        type="text"
                        value={formData.teamLogo}
                        onChange={(e) => setFormData({ ...formData, teamLogo: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Team Purpose</label>
                    <textarea
                        value={formData.teamPurpose}
                        onChange={(e) => setFormData({ ...formData, teamPurpose: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                    />
                </div>
            </div>

            {/* Lists & Achievements Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Code size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Lists & Achievements</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Tech Stack</label>
                        <textarea
                            value={formData.techStack?.join('\n')}
                            onChange={(e) => handleArrayChange('techStack', e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">One item per line</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Features</label>
                        <textarea
                            value={formData.features?.join('\n')}
                            onChange={(e) => handleArrayChange('features', e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">One item per line</p>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Achievements</label>
                        <textarea
                            value={formData.teamAchievements?.join('\n')}
                            onChange={(e) => handleArrayChange('teamAchievements', e.target.value)}
                            rows={6}
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-y"
                        />
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">One item per line</p>
                    </div>
                </div>
            </div>

            {/* Advanced: Timeline JSON Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Braces size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Team Timeline (Advanced JSON)</h3>
                </div>
                <div>
                    <textarea
                        value={JSON.stringify(formData.teamTimeline, null, 2)}
                        onChange={(e) => {
                            try {
                                setFormData({ ...formData, teamTimeline: JSON.parse(e.target.value) });
                            } catch (err) {
                                // ignore parse error while typing
                            }
                        }}
                        rows={6}
                        className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-lg text-green-600 dark:text-green-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all resize-y"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1.5">Edit JSON array directly. Format: {"[{ \"year\": \"2023\", \"event\": \"...\" }]"} </p>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 pt-5 border-t border-slate-200 dark:border-white/10">
                <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-md shadow-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all"
                >
                    <Save size={18} />
                    Save Wing
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

export default WingsManager;
