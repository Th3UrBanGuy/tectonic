"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Bot, Shield, Zap, Cloud, Database, Globe, Cpu, Server, Lock, Terminal, GitBranch, Container, Layers, Monitor, Wifi } from 'lucide-react';
import { useContent } from '../../components/ContentContext';

const iconMap: Record<string, React.ElementType> = {
    Code, Bot, Shield, Zap, Cloud, Database, Globe, Cpu, Server, Lock, Terminal, GitBranch, Container, Layers, Monitor, Wifi,
};

export default function TechStackSection() {
    const { techStack } = useContent();

    if (techStack.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
                    >
                        TECH STACK
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Technologies powering our ecosystem
                    </motion.p>
                    <div className="w-24 h-1 bg-brand-600 mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {techStack.map((item, index) => {
                        const Icon = iconMap[item.iconName] || Code;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-300 hover:border-brand-300/50 dark:hover:border-white/20"
                            >
                                <div className={`text-2xl mb-3 ${item.color}`}>
                                    <Icon size={28} />
                                </div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{item.version}</span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono">
                                        {item.status}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
