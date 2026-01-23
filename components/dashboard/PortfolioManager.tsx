import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import { ProjectItem } from '../../types';
import { useContent } from '../../components/ContentContext';

const PortfolioManager: React.FC = () => {
    const { projects, setProjects } = useContent();
    const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState<string>('All');

    const handleAdd = (data: Omit<ProjectItem, 'id' | 'createdAt'>) => {
        const newItem: ProjectItem = {
            ...data,
            id: `proj_${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        setProjects([...projects, newItem]);
        setShowForm(false);
    };

    const handleUpdate = (id: string, data: Partial<ProjectItem>) => {
        const updated = projects.map(p => p.id === id ? { ...p, ...data } : p);
        setProjects(updated);
        setEditingProject(null);
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this project?')) {
            const updated = projects.filter(p => p.id !== id);
            setProjects(updated);
        }
    };

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    const categories = ['All', 'Software', 'Security', 'Robotics', 'Consultancy'];

    return (
        <div className="space-y-6">
            {/* Header / Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === cat
                                ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                                : 'bg-white dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingProject(null);
                    }}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    <Plus size={16} />
                    Add Project
                </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.id}
                        layout

                        className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden hover:bg-slate-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                    >
                        {/* Image */}
                        <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                            {project.image ? (
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                            <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 backdrop-blur rounded text-xs font-mono text-white">
                                {project.category}
                            </div>
                        </div>

                        {/* Content */}
                        < div className="p-5" >
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{project.title}</h3>
                                    <p className="text-sm text-cyan-600 dark:text-cyan-400">{project.client}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingProject(project)}
                                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-slate-600 dark:text-slate-500 font-medium">Challenge:</span>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{project.challenge}</p>
                                </div>
                                <div>
                                    <span className="text-slate-600 dark:text-slate-500 font-medium">Solution:</span>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{project.solution}</p>
                                </div>
                                <div>
                                    <span className="text-slate-600 dark:text-slate-500 font-medium">Impact:</span>
                                    <p className="text-green-600 dark:text-green-400 line-clamp-1">{project.impact}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))
                }
            </div >

            {
                filteredProjects.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No projects found. Add your first project to get started!
                    </div>
                )
            }

            {/* Form Modal */}
            <AnimatePresence>
                {(showForm || editingProject) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowForm(false);
                            setEditingProject(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}

                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                        >
                            <ProjectForm
                                project={editingProject}
                                onSave={(data) => {
                                    if (editingProject) {
                                        handleUpdate(editingProject.id, data);
                                    } else {
                                        handleAdd(data as Omit<ProjectItem, 'id' | 'createdAt'>);
                                    }
                                }}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingProject(null);
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

const ProjectForm: React.FC<{
    project?: ProjectItem | null;
    onSave: (data: Partial<ProjectItem>) => void;
    onCancel: () => void;
}> = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: project?.title || '',
        category: project?.category || 'Software' as ProjectItem['category'],
        client: project?.client || '',
        challenge: project?.challenge || '',
        solution: project?.solution || '',
        impact: project?.impact || '',
        image: project?.image || '',
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {project ? 'Edit' : 'Add'} Project
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Project Title *</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Category *</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectItem['category'] })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                    >
                        <option value="Software">Software</option>
                        <option value="Security">Security</option>
                        <option value="Robotics">Robotics</option>
                        <option value="Consultancy">Consultancy</option>
                    </select>
                </div>
            </div>
            {/* ... other fields similarly ... */}
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Client Name *</label>
                <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Challenge *</label>
                <textarea
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                    rows={2}
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Solution *</label>
                <textarea
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                    rows={2}
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Impact Metrics *</label>
                <textarea
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                    rows={2}
                    required
                />
            </div>
            <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-2">Project Image</label>
                <div className="space-y-2">
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all"
                        placeholder="Image URL or upload below"
                    />
                    <div className="flex items-center gap-2">
                        <label className="flex-1 px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer flex items-center justify-center gap-2 transition-colors">
                            <Upload size={16} />
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {formData.image && (
                        <div className="mt-2">
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg border border-slate-200 dark:border-white/10"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-2 pt-4">
                <button type="submit" className="flex-1 px-4 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                    <Save size={18} />
                    {project ? 'Update' : 'Create'} Project
                </button>

                <button type="button" onClick={onCancel} className="px-4 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <X size={18} />
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default PortfolioManager;
