"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '../../components/ContentContext';
import { Handshake } from 'lucide-react';

// CSS keyframe marquee — smooth infinite slide
function MarqueeTrack({ children, duration = 30 }: { children: React.ReactNode; duration?: number }) {
    const [paused, setPaused] = useState(false);

    return (
        <div
            className="overflow-hidden relative py-2"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-slate-50 dark:from-[#030303] via-slate-50/80 dark:via-[#030303]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-slate-50 dark:from-[#030303] via-slate-50/80 dark:via-[#030303]/80 to-transparent z-10 pointer-events-none" />

            <div
                className="flex gap-6 w-max partners-marquee"
                style={{
                    animationDuration: `${duration}s`,
                    animationPlayState: paused ? 'paused' : 'running',
                }}
            >
                {children}
                {children}
                {children}
                {children}
            </div>

            <style>{`
                @keyframes partners-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
                .partners-marquee {
                    animation: partners-marquee 35s linear infinite;
                }
            `}</style>
        </div>
    );
}

// Partner tile
function PartnerTile({ partner }: { partner: any }) {
    return (
        <div className="group relative flex-shrink-0 w-[190px] h-[100px] flex items-center justify-center rounded-xl border border-slate-200/60 dark:border-white/[0.05] bg-white dark:bg-white/[0.015] transition-all duration-500 hover:border-brand-400/40 dark:hover:border-brand-400/15 hover:shadow-lg hover:shadow-brand-500/5 dark:hover:shadow-brand-500/[0.07]">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-brand-500/0 group-hover:border-brand-500/30 rounded-tl-xl transition-all duration-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-brand-500/0 group-hover:border-brand-500/30 rounded-br-xl transition-all duration-500" />

            <div className="relative flex flex-col items-center justify-center gap-2 px-4">
                {partner.logo ? (
                    <div className="relative w-20 h-11">
                        <Image
                            src={partner.logo}
                            alt={partner.name}
                            fill
                            sizes="80px"
                            className="object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                ) : (
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white text-lg font-black shadow-md shadow-brand-500/20">
                        {partner.name.charAt(0)}
                    </div>
                )}
                <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-500 text-center whitespace-nowrap">
                    {partner.name}
                </span>
            </div>
        </div>
    );
}

export default function PartnersSection() {
    const { partnerships, homeContent } = useContent();
    const content = homeContent || {};
    const partnersData = content.partnerships || {};

    if (partnerships.length === 0) return null;

    return (
        <section className="relative py-28 overflow-hidden bg-slate-50/80 dark:bg-[#030303] transition-colors duration-500">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-500/[0.03] dark:bg-brand-500/[0.04] rounded-full blur-[150px]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.04] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-white/[0.04] to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-brand-200/60 dark:border-brand-500/15 bg-brand-50/80 dark:bg-brand-500/[0.08] text-brand-600 dark:text-brand-400 text-[11px] font-mono font-bold tracking-[0.15em] mb-8 backdrop-blur-sm"
                    >
                        <Handshake size={14} className="opacity-80" />
                        STRATEGIC ALLIANCES
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black mb-5 text-slate-900 dark:text-white tracking-tight"
                    >
                        {partnersData.title || (
                            <>
                                OUR{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-purple-500">
                                    PARTNERS
                                </span>
                            </>
                        )}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 dark:text-gray-400 text-base max-w-lg mx-auto leading-relaxed"
                    >
                        {partnersData.description || 'Collaborating with industry leaders to build the future'}
                    </motion.p>
                </div>

                {/* Stats */}
                {partnersData.stats && partnersData.stats.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
                        {partnersData.stats.map((stat: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="group relative p-5 rounded-2xl border border-slate-200/60 dark:border-white/[0.05] bg-white dark:bg-white/[0.015] text-center overflow-hidden transition-all duration-500 hover:border-brand-400/30 dark:hover:border-brand-400/15"
                            >
                                <div className={`text-3xl md:text-4xl font-black mb-1 ${stat.color || 'text-brand-500'}`}>
                                    {stat.value}
                                </div>
                                <div className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] font-mono font-bold">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Marquee — smooth CSS sliding */}
                <MarqueeTrack>
                    {partnerships.map((partner) => (
                        <PartnerTile key={partner.id} partner={partner} />
                    ))}
                </MarqueeTrack>
            </div>
        </section>
    );
}
