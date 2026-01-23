import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { TechStackItem, RoadmapItem } from '../../types';
import { useContent } from '../../components/ContentContext';

type Section = 'tech' | 'roadmap';

const InnovationManager: React.FC = () => {
    const { techStack, setTechStack, roadmap, setRoadmap } = useContent();
    const [section, setSection] = useState<Section>('tech');
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [showForm, setShowForm] = useState(false);

    // Tech Helper Functions
    const handleAddTech = (data: Omit<TechStackItem, 'id' | 'order'>) => {
        const newItem: TechStackItem = {
            ...data,
            id: `tech_${Date.now()}`,
            order: techStack.length
        };
        setTechStack([...techStack, newItem]);
        setShowForm(false);
    };

    const handleUpdateTech = (id: string, data: Partial<TechStackItem>) => {
        const updated = techStack.map(item => item.id === id ? { ...item, ...data } : item);
        setTechStack(updated);
        setEditingItem(null);
    };

    const handleDeleteTech = (id: string) => {
        if (confirm('Delete this tech stack item?')) {
            const updated = techStack.filter(item => item.id !== id);
            setTechStack(updated);
        }
    };

    // Roadmap Helper Functions
    const handleAddRoadmap = (data: Omit<RoadmapItem, 'id' | 'order'>) => {
        const newItem: RoadmapItem = {
            ...data,
            id: `roadmap_${Date.now()}`,
            order: roadmap.length
        };
        setRoadmap([...roadmap, newItem]);
        setShowForm(false);
    };

    const handleUpdateRoadmap = (id: string, data: Partial<RoadmapItem>) => {
        const updated = roadmap.map(item => item.id === id ? { ...item, ...data } : item);
        setRoadmap(updated);
        setEditingItem(null);
    };

    const handleDeleteRoadmap = (id: string) => {
        if (confirm('Delete this roadmap item?')) {
            const updated = roadmap.filter(item => item.id !== id);
            setRoadmap(updated);
        }
    };

    return (
        <div className="space-y-6">
            {/* Section Tabs */}
            {/* Section Tabs */}
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        onClick={() => setSection('tech')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${section === 'tech'
                            ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:border-white/10'
                            }`}
                    >
                        Tech Stack
                    </button>
                    <button
                        onClick={() => setSection('roadmap')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${section === 'roadmap'
                            ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:hover:bg-white/10 dark:border-white/10'
                            }`}
                    >
                        Roadmap
                    </button>
                </div>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingItem(null);
                    }}
                    className="sm:ml-auto w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus size={16} />
                    Add {section === 'tech' ? 'Technology' : 'Roadmap Item'}
                </button>
            </div>

            {/* Tech Stack Section */}
            {section === 'tech' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {techStack.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-4 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTech(item.id)}
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p className="text-slate-500 dark:text-slate-400">Version: {item.version}</p>
                                <p className="text-slate-500 dark:text-slate-400">Status: {item.status}</p>
                                <p className="text-slate-500 dark:text-slate-400">Icon: {item.iconName}</p>
                                <p className={`${item.color}`}>Color Preview</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Roadmap Section */}
            {section === 'roadmap' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roadmap.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            className="bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl p-5 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-xs text-slate-500 font-mono">{item.refId}</span>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h3>
                                    <span className="text-xs text-cyan-600 dark:text-cyan-400">{item.quarter}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingItem(item)}
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRoadmap(item.id)}
                                        className="p-1 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{item.description}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-500"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                                <span className="text-xs text-slate-400">{item.progress}%</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                                    {item.status.replace('_', ' ')}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Form Modal */}
            <AnimatePresence>
                {(showForm || editingItem) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowForm(false);
                            setEditingItem(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            {section === 'tech' ? (
                                <TechForm
                                    item={editingItem}
                                    onSave={(data) => {
                                        if (editingItem) {
                                            handleUpdateTech(editingItem.id, data);
                                        } else {
                                            handleAddTech(data as Omit<TechStackItem, 'id' | 'order'>);
                                        }
                                    }}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingItem(null);
                                    }}
                                />
                            ) : (
                                <RoadmapForm
                                    item={editingItem}
                                    onSave={(data) => {
                                        if (editingItem) {
                                            handleUpdateRoadmap(editingItem.id, data);
                                        } else {
                                            handleAddRoadmap(data as Omit<RoadmapItem, 'id' | 'order'>);
                                        }
                                    }}
                                    onCancel={() => {
                                        setShowForm(false);
                                        setEditingItem(null);
                                    }}
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Forms kept as internal components for simplicity

const TechForm: React.FC<{
    item?: TechStackItem | null;
    onSave: (data: Partial<TechStackItem>) => void;
    onCancel: () => void;
}> = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        version: item?.version || '',
        status: item?.status || '',
        iconName: item?.iconName || 'Code',
        color: item?.color || 'text-cyan-400',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {item ? 'Edit' : 'Add'} Technology
            </h2>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Version</label>
                    <input
                        type="text"
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Status</label>
                    <input
                        type="text"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                        required
                    />
                </div>
            </div>
            {/* Same fields as before, just ensuring they are here */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Icon Name (Lucide)</label>
                    <input
                        type="text"
                        value={formData.iconName}
                        onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="e.g., Code, Zap, Cloud"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Color Class</label>
                    <select
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="text-cyan-400">Cyan</option>
                        <option value="text-blue-400">Blue</option>
                        <option value="text-purple-400">Purple</option>
                        <option value="text-green-400">Green</option>
                        <option value="text-orange-400">Orange</option>
                        <option value="text-red-400">Red</option>
                        <option value="text-slate-900 dark:text-white">White/Default</option>
                    </select>
                </div>
            </div>

            <div className="flex gap-2 pt-4">
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                    <Save size={16} />
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium flex items-center gap-2"
                >
                    <X size={16} />
                    Cancel
                </button>
            </div>
        </form>
    );
};

const RoadmapForm: React.FC<{
    item?: RoadmapItem | null;
    onSave: (data: Partial<RoadmapItem>) => void;
    onCancel: () => void;
}> = ({ item, onSave, onCancel }) => {
    // Similarly keeping the form logic, just wrapped in component
    const [formData, setFormData] = useState({
        refId: item?.refId || '',
        quarter: item?.quarter || '',
        title: item?.title || '',
        description: item?.description || '',
        progress: item?.progress || 0,
        status: item?.status || 'SCHEDULED' as RoadmapItem['status'],
        colorTheme: item?.colorTheme || 'from-blue-600/20 to-blue-900/10',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {item ? 'Edit' : 'Add'} Roadmap Item
            </h2>
            {/* Same fields as before */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Reference ID</label>
                    <input
                        type="text"
                        value={formData.refId}
                        onChange={(e) => setFormData({ ...formData, refId: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="e.g., R-2025-A"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Quarter/Year</label>
                    <input
                        type="text"
                        value={formData.quarter}
                        onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                        placeholder="e.g., Q1 2025"
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    rows={3}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Progress (%)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as RoadmapItem['status'] })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="INITIAL_CONCEPT">Initial Concept</option>
                        <option value="SCHEDULED">Scheduled</option>
                        <option value="HYPOTHETICAL">Hypothetical</option>
                    </select>
                </div>
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

export default InnovationManager;
