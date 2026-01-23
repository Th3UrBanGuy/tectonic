import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface AchievementCardProps {
    achievements: string[];
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievements }) => {
    return (
        <div className="p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-200 dark:border-amber-900/50 shadow-lg">
            {/* Header - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Trophy className="text-white" size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">Hall of Fame</h3>
            </div>

            {/* Achievement List - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4">
                {achievements.map((achievement, index) => {
                    // Extract emoji and text
                    const emoji = achievement.split(' ')[0];
                    const text = achievement.substring(achievement.indexOf(' ') + 1);

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08, duration: 0.3 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative"
                        >
                            {/* Achievement Card */}
                            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-900/50 hover:border-amber-400 dark:hover:border-amber-700 active:border-amber-500 dark:active:border-amber-600 hover:shadow-md transition-all duration-300 overflow-hidden">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 dark:via-amber-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                                {/* Emoji - Mobile Optimized */}
                                <motion.div
                                    className="text-2xl sm:text-3xl flex-shrink-0"
                                    whileHover={{ scale: 1.3, rotate: 10 }}
                                    whileTap={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {emoji}
                                </motion.div>

                                {/* Text - Mobile Optimized */}
                                <p className="relative text-slate-700 dark:text-gray-300 font-medium text-sm sm:text-base flex-1 pt-0.5 sm:pt-1 leading-snug">
                                    {text}
                                </p>

                                {/* Corner Accent */}
                                <div className="absolute top-0 right-0 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-bl from-amber-200/30 dark:from-amber-500/20 to-transparent rounded-bl-2xl sm:rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementCard;
