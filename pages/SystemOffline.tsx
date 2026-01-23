import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { Power, RefreshCcw, WifiOff } from 'lucide-react';

const SystemOffline = () => {
    const [isRetrying, setIsRetrying] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spotlight effect logic
    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const handleRetry = () => {
        setIsRetrying(true);
        setTimeout(() => window.location.reload(), 2500);
    };

    // Generate random sparkles
    const sparkles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 2
    }));

    return (
        <div
            className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center relative overflow-hidden group font-sans"
            onMouseMove={handleMouseMove}
        >
            {/* 1. Dynamic Spotlight Background */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255,255,255,0.06),
                            transparent 80%
                        )
                    `
                }}
            />

            {/* Static Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

            {/* 2. Sparkles Core */}
            <div className="absolute inset-0 z-0">
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{
                            width: sparkle.size,
                            height: sparkle.size,
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                        }}
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                        transition={{
                            duration: sparkle.duration,
                            repeat: Infinity,
                            delay: sparkle.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* 3. Main Content Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="relative z-10 max-w-sm w-full text-center px-6"
            >
                {/* Central Focus Element */}
                <div className="mb-12 relative flex justify-center">
                    <div className="relative group/icon cursor-pointer">
                        <div className="absolute inset-0 bg-red-500/10 blur-2xl rounded-full scale-150 group-hover/icon:scale-175 transition-transform duration-700" />
                        <div className="w-24 h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent opacity-50"
                            />
                            <WifiOff className="w-8 h-8 text-white/70 relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Elegant Typography */}
                <div className="space-y-4 mb-16">
                    <h1 className="text-5xl font-light tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-transparent">
                        Offline
                    </h1>
                    <p className="text-white/30 font-light tracking-widest text-xs uppercase">
                        Connection Severed • Stasis Mode Active
                    </p>
                </div>

                {/* Magnetic Button Interaction */}
                <motion.button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                    <RefreshCcw
                        size={16}
                        className={`text-white/50 group-hover:text-white transition-colors ${isRetrying ? 'animate-spin' : ''}`}
                    />
                    <span className="text-sm font-medium tracking-wide text-white/70 group-hover:text-white">
                        {isRetrying ? 'RECONNECTING...' : 'RE-ESTABLISH LINK'}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-full ring-2 ring-white/10 group-hover:ring-white/30 transition-all opacity-0 group-hover:opacity-100" />
                </motion.button>
            </motion.div>

            {/* Bottom Status */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-[10px] text-white/20 font-mono">
                <div className="flex items-center gap-2">
                    <Power size={10} />
                    <span>SYSTEM_DORMANT</span>
                </div>
                <div>
                    ERR_CODE: 0x503
                </div>
            </div>
        </div>
    );
};

export default SystemOffline;
