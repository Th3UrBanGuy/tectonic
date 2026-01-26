import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import { getProjects } from '../services/contentStorage';
import FeaturedProjectCard from '../components/ui/FeaturedProjectCard';
import { PORTFOLIO_CONTENT } from '../data/pages/portfolio';

const Portfolio = () => {
  const [filter, setFilter] = useState<string>('All');
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filters = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-orange-500/10 border border-slate-200/60 dark:border-gray-700/50 backdrop-blur-xl mb-6">
            <Sparkles size={16} className="text-brand-500" />
            <span className="text-sm font-mono text-slate-600 dark:text-gray-400 uppercase tracking-wider">
              {PORTFOLIO_CONTENT.header.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent">
            {PORTFOLIO_CONTENT.header.title}
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            {PORTFOLIO_CONTENT.header.description}
          </p>
        </motion.div>

        {/* Enhanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-900/50 border border-slate-200/60 dark:border-gray-700/50 backdrop-blur-xl">
            <Filter size={16} className="text-brand-500" />
            <span className="text-xs font-mono text-slate-600 dark:text-gray-400 uppercase tracking-wider">
              Filter
            </span>
          </div>

          {filters.map((f, index) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setFilter(f)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${filter === f
                ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 text-white shadow-lg shadow-purple-500/50'
                : 'bg-white dark:bg-gray-900 text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500'
                }`}
            >
              {filter === f && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 rounded-full"
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <FeaturedProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-gray-900 mb-4">
              <Filter size={32} className="text-slate-400 dark:text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {PORTFOLIO_CONTENT.emptyState.title}
            </h3>
            <p className="text-slate-600 dark:text-gray-400">
              {PORTFOLIO_CONTENT.emptyState.description}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;