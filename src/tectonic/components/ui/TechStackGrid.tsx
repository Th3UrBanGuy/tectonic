import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

interface TechStackGridProps {
    technologies: string[];
}

const TechStackGrid: React.FC<TechStackGridProps> = ({ technologies }) => {
    return (
        <div className="relative p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 dark:from-gray-950 dark:to-indigo-950 overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

            <div className="relative z-10">
                {/* Header - Mobile Optimized */}
                <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Cpu className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Technology Stack</h2>
                </div>

                {/* Bento Grid Layout - Mobile Optimized */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {technologies.map((tech, index) => (
                        <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.04, duration: 0.3 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 hover:border-cyan-400 active:bg-white/25 transition-all duration-300 cursor-pointer overflow-hidden min-h-[60px] sm:min-h-[70px] flex items-center justify-center">
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                {/* Tech Name - Mobile Optimized */}
                                <span className="relative block text-white font-mono font-semibold text-xs sm:text-sm lg:text-base text-center leading-tight">
                                    {tech}
                                </span>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TechStackGrid;
