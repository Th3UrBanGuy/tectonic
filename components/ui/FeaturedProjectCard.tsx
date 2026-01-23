import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
    project: {
        id: string;
        title: string;
        client: string;
        category: string;
        image: string;
        challenge: string;
        solution: string;
        impact: string;
    };
    index: number;
}

const FeaturedProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Software':
                return 'from-cyan-500 to-blue-500';
            case 'Security':
                return 'from-orange-500 to-red-500';
            case 'Robotics':
                return 'from-purple-500 to-pink-500';
            default:
                return 'from-emerald-500 to-teal-500';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="group relative"
        >
            {/* Animated gradient border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:duration-200 animate-pulse"></div>

            {/* Main card */}
            <div className="relative h-full rounded-3xl border border-slate-200/60 dark:border-gray-700/50 bg-white dark:bg-gray-900 overflow-hidden">
                {/* Image section with parallax effect */}
                <div className="relative h-72 overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                    {/* Floating category badge */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                        className="absolute top-4 right-4"
                    >
                        <div className={cn(
                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xl border border-white/20",
                            `bg-gradient-to-r ${getCategoryColor(project.category)} text-white shadow-lg`
                        )}>
                            {project.category}
                        </div>
                    </motion.div>

                    {/* Title overlay with slide-up animation */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            {project.title}
                        </motion.h3>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.15 + 0.4 }}
                            className="text-sm text-gray-300 font-mono"
                        >
                            {project.client}
                        </motion.p>
                    </div>
                </div>

                {/* Content section with staggered reveal */}
                <div className="p-6 space-y-5">
                    {/* Challenge */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.5 }}
                        className="relative pl-4 border-l-2 border-orange-500"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                            <h4 className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                                Challenge
                            </h4>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                            {project.challenge}
                        </p>
                    </motion.div>

                    {/* Solution */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.6 }}
                        className="relative pl-4 border-l-2 border-cyan-500"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                            <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                                Solution
                            </h4>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                            {project.solution}
                        </p>
                    </motion.div>

                    {/* Impact with special highlight */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.7 }}
                        className="relative mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/50"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                Impact
                            </h4>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {project.impact}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom accent line */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
        </motion.div>
    );
};

export default FeaturedProjectCard;
