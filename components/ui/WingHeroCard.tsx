import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award, TrendingUp } from 'lucide-react';

interface WingHeroCardProps {
    teamName: string;
    teamLogo: string;
    teamSubtitle?: string;
    achievementsCount: number;
    techCount: number;
    milestonesCount: number;
}

const WingHeroCard: React.FC<WingHeroCardProps> = ({
    teamName,
    teamLogo,
    teamSubtitle = 'Innovation Team',
    achievementsCount,
    techCount,
    milestonesCount,
}) => {
    const stats = [
        { icon: Award, label: 'Achievements', value: `${achievementsCount}+`, color: 'from-amber-500 to-orange-500', glow: 'shadow-amber-500/20' },
        { icon: Zap, label: 'Technologies', value: techCount, color: 'from-cyan-500 to-blue-500', glow: 'shadow-cyan-500/20' },
        { icon: TrendingUp, label: 'Milestones', value: milestonesCount, color: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/20' },
    ];

    return (
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-600 dark:from-purple-900 dark:via-indigo-900 dark:to-cyan-900 p-6 sm:p-10 lg:p-16">
            {/* Animated Background Orbs - Optimized for mobile */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 w-48 sm:w-96 h-48 sm:h-96 bg-white/10 rounded-full blur-2xl sm:blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-12 sm:-bottom-24 -right-12 sm:-right-24 w-56 sm:w-96 h-56 sm:h-96 bg-cyan-300/10 rounded-full blur-2xl sm:blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
                {/* Team Logo - Mobile Optimized */}
                <motion.div
                    className="relative group"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Glow Effect */}
                    <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                    {/* Logo Container - Responsive sizing */}
                    <div className="relative w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-2 sm:border-4 border-white/20 backdrop-blur-sm">
                        <motion.img
                            src={teamLogo}
                            alt={teamName}
                            className="w-full h-full object-contain drop-shadow-2xl"
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </motion.div>

                {/* Team Info - Mobile Optimized */}
                <div className="flex-1 text-white space-y-4 sm:space-y-6 text-center lg:text-left">
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm font-mono uppercase tracking-wider">Official Team</span>
                    </motion.div>

                    {/* Team Name - Responsive text */}
                    <motion.h1
                        className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {teamName}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-base sm:text-xl lg:text-2xl font-mono text-purple-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {teamSubtitle}
                    </motion.p>

                    {/* Floating Stats Cards - Mobile Grid */}
                    <motion.div
                        className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 justify-center lg:justify-start pt-2 sm:pt-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="group relative px-3 sm:px-5 py-2 sm:py-3 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                {/* Gradient Glow on Hover */}
                                <div className={`absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur transition-opacity duration-300`} />

                                <div className="relative flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                                    <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg bg-gradient-to-r ${stat.color} ${stat.glow} shadow-lg`}>
                                        <stat.icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                                        <div className="text-[10px] sm:text-xs text-purple-200 whitespace-nowrap">{stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WingHeroCard;
