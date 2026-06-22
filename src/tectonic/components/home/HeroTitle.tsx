import React from 'react';
import { motion } from 'framer-motion';

const HeroTitle = () => {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center text-center mb-10">

      {/* "THE" - Technical & Precision */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex items-center gap-4 md:gap-6 mb-2"
      >
        <div className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-brand-500"></div>
        <span className="font-mono text-xs md:text-sm tracking-[0.5em] md:tracking-[0.8em] text-brand-600 dark:text-brand-400 uppercase font-bold">The</span>
        <div className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-brand-500"></div>
      </motion.div>

      {/* "TECHTONIC" - The Core Brand */}
      <div className="relative group">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-6xl md:text-9xl font-black tracking-tighter mix-blend-normal leading-[0.9]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:via-gray-100 dark:to-gray-400 drop-shadow-2xl">
            TECTONIC
          </span>
        </motion.h1>

        {/* Glow Effect Behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-brand-500/20 blur-[80px] -z-10 animate-pulse-slow"></div>

        {/* Tech Accents - Decoration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -right-4 md:-right-8 top-2 hidden md:block"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-1 h-12 bg-gradient-to-b from-brand-500 to-transparent"></div>
            <span className="text-[10px] font-mono text-brand-600 dark:text-brand-500 writing-vertical-rl rotate-180 opacity-70">SYS.CORE</span>
          </div>
        </motion.div>
      </div>

      {/* "SHIFT" - The Movement */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative mt-[-0.5rem] md:mt-[-1.5rem] z-0"
      >
        <h2
          className="text-5xl md:text-8xl font-black italic tracking-tighter text-slate-200 dark:text-transparent dark:opacity-40 select-none"
          style={{ WebkitTextStroke: '1px rgba(120,120,120,0.2)' }}
        >
          <span className="dark:hidden">SHIFT</span>
          <span className="hidden dark:block" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>SHIFT</span>
        </h2>

        {/* Corner Brackets for SHIFT */}
        <div className="absolute top-1/2 -left-4 w-2 h-2 border-t border-l border-slate-400 dark:border-white/30 hidden md:block"></div>
        <div className="absolute top-1/2 -right-4 w-2 h-2 border-b border-r border-slate-400 dark:border-white/30 hidden md:block"></div>
      </motion.div>

    </div>
  )
}

export default HeroTitle;