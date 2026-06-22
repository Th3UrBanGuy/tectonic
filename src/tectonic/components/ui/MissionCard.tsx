import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

interface MissionCardProps {
    mission: string;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
    return (
        <div className="relative">
            {/* Vertical Accent Line - Mobile Optimized */}
            <div className="absolute -top-4 sm:-top-8 left-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />

            <div className="pl-6 sm:pl-12">
                {/* Header - Mobile Optimized */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <Target className="text-white" size={20} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
                </div>

                {/* Mission Statement Card - Mobile Optimized */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative p-5 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800 border-2 border-slate-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 active:border-purple-500 dark:active:border-purple-500 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                    {/* Gradient Glow on Hover */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/0 via-indigo-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:via-indigo-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />

                    {/* Quote Mark - Mobile Optimized */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-4xl sm:text-6xl font-serif text-purple-200 dark:text-purple-900/30 opacity-50">"</div>

                    {/* Mission Text - Mobile Optimized */}
                    <p className="relative text-base sm:text-lg lg:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
                        {mission}
                    </p>

                    {/* Bottom Accent - Mobile Optimized */}
                    <div className="mt-4 sm:mt-6 flex gap-1.5 sm:gap-2">
                        <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                        <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
                        <div className="w-3 sm:w-4 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MissionCard;
