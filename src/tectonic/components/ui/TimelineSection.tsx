"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Rocket, Target, Globe, Code, Database, Shield, Zap, Star, Award } from 'lucide-react';
import { useContent } from '../../components/ContentContext';

const iconMap: Record<string, React.ElementType> = {
    Clock, Rocket, Target, Globe, Code, Database, Shield, Zap, Star, Award,
};

export default function TimelineSection() {
    const { timeline } = useContent();

    if (timeline.length === 0) return null;

    return (
        <section className="py-24 bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-gray-900 transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
                    >
                        OUR JOURNEY
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Key milestones and achievements
                    </motion.p>
                    <div className="w-24 h-1 bg-brand-500 mx-auto mt-6" />
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500/50 via-brand-500/20 to-transparent" />

                    <div className="space-y-8">
                        {timeline.map((entry, index) => {
                            const Icon = iconMap[entry.iconName || 'Clock'] || Clock;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative flex items-start gap-6 pl-4"
                                >
                                    {/* Icon dot */}
                                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-[#050505] border-2 border-brand-500 flex items-center justify-center">
                                        <Icon size={18} className="text-brand-500" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 pb-8">
                                        <div className="p-5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{entry.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{entry.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
