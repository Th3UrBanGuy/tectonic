import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft, ExternalLink, Github, FileText,
    Terminal, Layers, Cpu, Globe, CheckCircle2
} from 'lucide-react';
import { getProjects } from '../services/contentStorage';
import { Project } from '../types';

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const projects: Project[] = getProjects();
    const project = projects.find(p => p.id === id);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                    <button
                        onClick={() => navigate('/portfolio')}
                        className="px-6 py-2 bg-brand-500 rounded-lg font-bold"
                    >
                        Back to Portfolio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24 bg-slate-950 text-white selection:bg-brand-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/portfolio')}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-mono text-sm uppercase tracking-widest">Back to Portfolio</span>
                </motion.button>

                {/* Hero Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative group mt-2"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative rounded-[2.2rem] overflow-hidden border border-white/10 ring-1 ring-white/5">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Tech Badges */}
                        <div className="absolute -bottom-6 -right-6 flex flex-wrap gap-2 max-w-[280px] justify-end">
                            {project.techStack?.slice(0, 3).map((tech, i) => (
                                <div key={i} className="px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl text-xs font-bold text-brand-400 shadow-2xl">
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-md bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-bold tracking-[0.2em] mb-4">
                                {project.category.toUpperCase()}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-3xl font-bold tracking-tight mb-4 text-white">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-400 font-mono text-sm uppercase tracking-wide border-l-2 border-brand-500 pl-4">
                                {project.client}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap gap-4"
                        >
                            {project.links?.live && (
                                <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-brand-500 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Globe size={18} />
                                    <span>LIVE PREVIEW</span>
                                </a>
                            )}
                            {project.links?.github && (
                                <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-slate-900 border border-white/10 rounded-xl font-bold text-sm hover:border-white transition-all transform hover:-translate-y-1">
                                    <Github size={18} />
                                    <span>SOURCE CODE</span>
                                </a>
                            )}
                        </motion.div>

                        {/* Impact Highlight */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-2xl bg-gradient-to-br from-brand-500/20 to-purple-500/5 border border-brand-500/20"
                        >
                            <h4 className="text-xs font-black text-brand-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle2 size={16} /> Key Achievement
                            </h4>
                            <p className="text-lg font-semibold text-white">
                                {project.impact}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Detailed Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-slate-200">
                            <Terminal className="text-brand-500" size={24} />
                            <h2 className="text-2xl font-bold">The Challenge</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {project.challenge}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3 text-slate-200">
                            <Layers className="text-brand-500" size={24} />
                            <h2 className="text-2xl font-bold">The Solution</h2>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {project.solution}
                        </p>
                    </motion.div>
                </div>

                {/* Full Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-12 border-t border-white/5"
                >
                    <div className="flex items-center gap-3 text-slate-200 mb-8">
                        <Cpu className="text-brand-500" size={24} />
                        <h2 className="text-2xl font-bold">Technology Stack</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack?.map((tech, i) => (
                            <div key={i} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-mono text-sm hover:border-brand-500/50 hover:bg-brand-500/5 transition-colors">
                                {tech}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProjectDetail;
