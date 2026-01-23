import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface PartnershipCardProps {
    partner: {
        id: string;
        name: string;
        logo: string;
        category: string;
        description: string;
        since: string;
    };
    index: number;
}

const FloatingPartnershipCard: React.FC<PartnershipCardProps> = ({ partner, index }) => {
    // Create floating animation with different delays for each card
    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 3 + (index % 3) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
        }
    };

    // Rotation on hover for 3D effect
    const [rotateX, setRotateX] = React.useState(0);
    const [rotateY, setRotateY] = React.useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -10;
        const rotateYValue = ((x - centerX) / centerX) * 10;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            animate={floatingAnimation}
            className="group relative"
            style={{ perspective: 1000 }}
        >
            {/* Animated gradient glow */}
            <motion.div
                className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                style={{
                    background: `linear-gradient(${index * 60}deg, #06b6d4, #8b5cf6, #f97316)`,
                }}
                animate={{
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Main card */}
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "relative p-8 rounded-3xl overflow-hidden",
                    "bg-white dark:bg-gray-900",
                    "border border-slate-200/60 dark:border-gray-700/50",
                    "shadow-xl hover:shadow-2xl transition-shadow duration-500",
                    "flex flex-col items-center justify-center aspect-square"
                )}
            >
                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        style={{
                            animation: 'shimmer 2s infinite',
                            transform: 'translateX(-100%)',
                        }}
                    />
                </div>

                {/* Logo container with 3D depth */}
                <motion.div
                    className="relative w-full h-24 mb-4 flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                >
                    <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain filter dark:brightness-0 dark:invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </motion.div>

                {/* Partner name - appears on hover */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        {partner.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-mono uppercase tracking-wide">
                        {partner.category}
                    </p>
                </motion.div>

                {/* Hover overlay with info */}
                <div className="absolute inset-0 p-6 rounded-3xl bg-gradient-to-br from-cyan-500/95 via-purple-500/95 to-orange-500/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-white font-bold text-lg mb-2">{partner.name}</h4>
                        <p className="text-white/90 text-xs font-mono mb-3 uppercase tracking-wide">
                            {partner.category}
                        </p>
                        <p className="text-white/80 text-xs leading-relaxed mb-3">
                            {partner.description}
                        </p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                            <span className="text-white/70 text-xs font-semibold">
                                Since {partner.since}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-orange-500/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>

            <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </motion.div>
    );
};

export default FloatingPartnershipCard;
