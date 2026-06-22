import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface TimelineItem {
    year: string;
    event: string;
}

interface TimelineCardProps {
    timeline: TimelineItem[];
}

const TimelineCard: React.FC<TimelineCardProps> = ({ timeline }) => {
    return (
        <div className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900 border-2 border-slate-200 dark:border-gray-800 shadow-lg">
            {/* Header - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Calendar className="text-white" size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Journey Timeline</h3>
            </div>

            {/* Timeline Items - Mobile Optimized */}
            <div className="space-y-4 sm:space-y-6">
                {timeline.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex gap-3 sm:gap-6 group"
                    >
                        {/* Year Badge - Mobile Optimized */}
                        <div className="flex-shrink-0 relative">
                            <motion.div
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg relative overflow-hidden"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                                <span className="relative font-black text-white text-base sm:text-lg z-10">{item.year}</span>
                            </motion.div>

                            {/* Connecting Line */}
                            {index < timeline.length - 1 && (
                                <div className="absolute top-16 sm:top-20 left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-4 sm:h-6 bg-gradient-to-b from-indigo-300 to-purple-300 dark:from-indigo-700 dark:to-purple-700" />
                            )}
                        </div>

                        {/* Event Description - Mobile Optimized */}
                        <div className="flex-1 pt-2 sm:pt-4">
                            <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-gray-800/50 border border-slate-200 dark:border-gray-700 group-hover:border-purple-400 dark:group-hover:border-purple-600 group-active:border-purple-500 dark:group-active:border-purple-500 transition-colors duration-300">
                                <p className="text-sm sm:text-base lg:text-lg font-semibold text-slate-700 dark:text-gray-300 leading-snug">
                                    {item.event}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TimelineCard;
