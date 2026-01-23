import React from 'react';
import { motion } from 'framer-motion';
import { Partnership } from '../types';

interface InfinitePartnershipCarouselProps {
    partners: Partnership[];
}

const InfinitePartnershipCarousel: React.FC<InfinitePartnershipCarouselProps> = ({ partners }) => {
    // Duplicate partners for seamless loop
    const duplicatedPartners = [...partners, ...partners, ...partners];

    return (
        <div className="w-full py-6 sm:py-12">
            {/* Glass Border Container */}
            <div className="relative w-full">
                {/* Top Glass Border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-gray-700/50 to-transparent" />

                {/* Bottom Glass Border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-gray-700/50 to-transparent" />

                {/* Side Borders with Blur */}
                <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-[#050505] to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-[#050505] to-transparent pointer-events-none z-10" />

                {/* Carousel Content */}
                <div className="overflow-hidden py-4 sm:py-8">
                    {/* First Row - Left to Right */}
                    <div className="mb-4 sm:mb-8">
                        <motion.div
                            className="flex gap-3 sm:gap-6"
                            animate={{
                                x: [0, -1920],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <PartnerCard key={`ltr-${partner.id}-${index}`} partner={partner} />
                            ))}
                        </motion.div>
                    </div>

                    {/* Second Row - Right to Left */}
                    <div>
                        <motion.div
                            className="flex gap-3 sm:gap-6"
                            animate={{
                                x: [-1920, 0],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <PartnerCard key={`rtl-${partner.id}-${index}`} partner={partner} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface PartnerCardProps {
    partner: Partnership;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
    return (
        <motion.div
            className="flex-shrink-0 w-48 h-28 sm:w-64 sm:h-36 relative group cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Clean Card Background - Professional Dark Mode */}
            <div className="absolute inset-0 bg-white/70 dark:bg-[#1a1f2e] backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/80 dark:border-gray-700/50 shadow-lg dark:shadow-xl dark:shadow-black/20 group-hover:shadow-2xl dark:group-hover:border-gray-600/60 transition-all duration-300">
                {/* Subtle Inner Highlight */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 dark:opacity-100" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-3 sm:p-6 z-10">
                {/* Logo Container - Clean Professional Style */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center bg-white dark:bg-[#252b3d] rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md dark:shadow-lg dark:shadow-black/30 group-hover:shadow-xl transition-all border border-slate-200/50 dark:border-gray-600/40">
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain opacity-90 dark:opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{
                            filter: 'brightness(0.95) contrast(1.1) saturate(1.2)'
                        }}
                    />
                </div>

                {/* Partner Name - Clean Typography */}
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-gray-100 mb-1 sm:mb-2 text-center line-clamp-1 transition-colors duration-300">
                    {partner.name}
                </h3>

                {/* Category Badge - Subtle Professional Style */}
                <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-slate-100/90 dark:bg-[#2a3142] backdrop-blur-sm rounded-md sm:rounded-lg border border-slate-200/60 dark:border-gray-600/30 transition-all duration-300">
                    <span className="text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-gray-400 line-clamp-1">
                        {partner.category}
                    </span>
                </div>
            </div>

            {/* Minimal Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t border-l border-slate-300/60 dark:border-gray-600/40 rounded-tl-xl sm:rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b border-r border-slate-300/60 dark:border-gray-600/40 rounded-br-xl sm:rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
    );
};

export default InfinitePartnershipCarousel;
