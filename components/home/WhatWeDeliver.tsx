import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Terminal, Cpu, Bot } from 'lucide-react';
import { HOME_CONTENT } from '../../data/pages/home';

const iconMap: { [key: string]: React.ElementType } = {
    Globe,
    Terminal,
    Cpu,
    Bot
};

const WhatWeDeliver = () => {
    const { deliver } = HOME_CONTENT;

    if (!deliver) return null;

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/5">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-mono font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
                    >
                        {deliver.title}
                    </motion.h2>
                    <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {deliver.items.map((item, index) => {
                        const Icon = iconMap[item.icon] || Globe;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group relative p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Glass Effect Top Highlight */}
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10">
                                    <div className="mb-6 inline-flex p-4 rounded-xl bg-brand-50 dark:bg-white/5 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                                        <Icon size={32} strokeWidth={1.5} />
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white font-mono group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-brand-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-brand-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default WhatWeDeliver;
