import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface CapabilityCardProps {
    title: string;
    index: number;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ title, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse position tracking for 3D tilt effect (desktop only)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current || window.innerWidth < 768) return; // Disable on mobile

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    React.useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.98 }}
            style={{
                rotateX: isMobile ? 0 : rotateX,
                rotateY: isMobile ? 0 : rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-[#1a1f2e] backdrop-blur-sm border border-slate-200/80 dark:border-gray-700/50 shadow-lg hover:shadow-2xl active:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-orange-500 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 blur-sm -z-10" />

            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-orange-500/0 group-hover:from-purple-500/10 group-hover:via-cyan-500/10 group-hover:to-orange-500/10 transition-all duration-500" />

            {/* Content */}
            <div className="relative" style={{ transform: isMobile ? "none" : "translateZ(50px)" }}>
                {/* Icon Container */}
                <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-300">
                    <motion.div
                        animate={isHovered ? { rotate: 360, scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <CheckCircle2 className="text-purple-600 dark:text-purple-400" size={18} />
                    </motion.div>
                </div>

                {/* Title - Mobile optimized text */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 pr-12 sm:pr-14 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-cyan-600 group-hover:bg-clip-text transition-all duration-300 leading-snug">
                    {title}
                </h3>

                {/* Accent Bar */}
                <motion.div
                    className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    initial={{ width: 40 }}
                    animate={{ width: isHovered ? 80 : 40 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Sparkle Effect on Hover */}
                {isHovered && (
                    <motion.div
                        className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 180 }}
                        exit={{ scale: 0 }}
                    >
                        <Sparkles className="text-cyan-500" size={14} />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default CapabilityCard;
