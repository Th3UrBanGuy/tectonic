import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Activity, Box } from 'lucide-react';

const Maintenance = () => {
    const [text, setText] = useState('');
    const [statusIndex, setStatusIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Aceternity-style status messages
    const statuses = [
        "Updating System...",
        "Improving Experience...",
        "Enhancing Performance...",
        "Polishing Interface...",
        "Almost Ready..."
    ];

    useEffect(() => {
        const typeSpeed = isDeleting ? 30 : 80;
        const currentStatus = statuses[statusIndex];

        const timer = setTimeout(() => {
            if (!isDeleting && text === currentStatus) {
                // Finished typing, wait then delete
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && text === '') {
                // Finished deleting, move to next
                setIsDeleting(false);
                setStatusIndex((prev) => (prev + 1) % statuses.length);
            } else {
                // Typing or deleting
                const nextText = isDeleting
                    ? currentStatus.substring(0, text.length - 1)
                    : currentStatus.substring(0, text.length + 1);
                setText(nextText);
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, statusIndex, statuses]);

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-cyan-500/30">
            {/* 1. Grid Beam Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Static Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* Moving Beam */}
                <motion.div
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent shadow-[0_0_20px_rgba(6,182,212,0.5)] z-0 mix-blend-screen"
                />
            </div>

            {/* 2. Main Content Card - Glassmorphism */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent"
            >
                <div className="bg-black/80 backdrop-blur-xl rounded-[22px] p-8 sm:p-14 border border-white/10 shadow-2xl max-w-xl w-full relative overflow-hidden group">

                    {/* Glowing corner accents */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-500/20 blur-[50px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-500/20 blur-[50px] rounded-full pointer-events-none" />

                    {/* Header Icon */}
                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-40"
                            />
                            <div className="relative w-16 h-16 bg-[#0a0a0a] rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
                                <Box className="w-8 h-8 text-cyan-400" />
                            </div>
                        </div>
                    </div>

                    {/* Typography & Status */}
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                            Maintenance
                        </h1>

                        {/* Typewriter Output */}
                        <div className="h-8 sm:h-10 flex items-center justify-center">
                            <span className="font-mono text-cyan-400 text-sm sm:text-lg tracking-widest uppercase">
                                {text}
                                <span className="animate-pulse ml-1">_</span>
                            </span>
                        </div>

                        <p className="text-white/40 text-sm sm:text-base leading-relaxed max-w-sm mx-auto font-light">
                            We are currently upgrading the system to serve you better. We'll be back online very soon.
                        </p>
                    </div>

                    {/* Tech stats row */}
                    <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center gap-2 group/item cursor-default">
                            <Cpu size={16} className="text-slate-500 group-hover/item:text-cyan-400 transition-colors" />
                            <span className="text-[10px] text-slate-600 tracking-wider">CORE OPT.</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group/item cursor-default">
                            <Zap size={16} className="text-slate-500 group-hover/item:text-yellow-400 transition-colors" />
                            <span className="text-[10px] text-slate-600 tracking-wider">POWER EFF.</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 group/item cursor-default">
                            <Activity size={16} className="text-slate-500 group-hover/item:text-green-400 transition-colors" />
                            <span className="text-[10px] text-slate-600 tracking-wider">NETWORK</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Footer */}
            <div className="absolute bottom-6 text-center">
                <div className="flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-[0.3em]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                    Operational Status: Upgrading
                </div>
            </div>
        </div>
    );
};

export default Maintenance;
