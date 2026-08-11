"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useContent } from '../../components/ContentContext';

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    IN_PROGRESS: { label: 'In Progress', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
    INITIAL_CONCEPT: { label: 'Concept', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-500/10', icon: AlertCircle },
    SCHEDULED: { label: 'Scheduled', color: 'text-slate-500 dark:text-slate-400', bg: 'bg-slate-500/10', icon: Calendar },
    HYPOTHETICAL: { label: 'Hypothetical', color: 'text-slate-400 dark:text-slate-500', bg: 'bg-slate-400/10', icon: AlertCircle },
};

export default function RoadmapSection() {
    const { roadmap } = useContent();

    if (roadmap.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 dark:bg-dark-bg border-t border-slate-200 dark:border-gray-900 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-gray-300 dark:to-white bg-clip-text text-transparent"
                    >
                        ROADMAP
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-600 dark:text-gray-400 text-lg max-w-2xl mx-auto"
                    >
                        Our journey and upcoming milestones
                    </motion.p>
                    <div className="w-24 h-1 bg-brand-600 mx-auto mt-6" />
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />

                    <div className="space-y-12">
                        {roadmap.map((item, index) => {
                            const status = statusConfig[item.status] || statusConfig.SCHEDULED;
                            const StatusIcon = status.icon;
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-0`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-500 border-4 border-white dark:border-[#050505] z-10" />

                                    {/* Content card */}
                                    <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                                        <div className="p-6 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{item.refId}</span>
                                                <span className="text-xs font-mono text-brand-500">{item.quarter}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{item.description}</p>

                                            {/* Progress bar */}
                                            <div className="mb-3">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-slate-500 dark:text-slate-400">Progress</span>
                                                    <span className="text-slate-700 dark:text-slate-300 font-mono">{item.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${item.progress}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.3 }}
                                                        className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${status.color} ${status.bg}`}>
                                                <StatusIcon size={12} />
                                                {status.label}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacer for other side */}
                                    <div className="hidden md:block flex-1 md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
