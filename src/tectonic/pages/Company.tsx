"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useContent } from '../components/ContentContext';
import { Award, ShieldCheck, Globe, Zap, Target, Users, Trophy, ArrowRight } from 'lucide-react';
import { CompanySkeleton } from '../components/ui/Skeleton';
import CertificationGallery from '../components/ui/CertificationGallery';
import TimelineSection from '../components/ui/TimelineSection';

const MemberCard = ({ member, index }: { member: any; index: number }) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const getDeptColor = (role: string) => {
        if (role.includes('CEO')) return 'text-cyan-600 dark:text-cyan-400';
        if (role.includes('COO')) return 'text-purple-600 dark:text-purple-400';
        if (role.includes('CTO')) return 'text-orange-600 dark:text-orange-400';
        if (role.includes('CMO')) return 'text-emerald-600 dark:text-emerald-400';
        return 'text-brand-600 dark:text-brand-400';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            className="group spotlight-card h-[520px] rounded-3xl bg-white dark:bg-slate-950/40 border border-slate-200/80 dark:border-white/5 backdrop-blur-sm overflow-hidden flex flex-col transition-all duration-500 hover:border-brand-300/50 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-slate-900/60 shadow-lg shadow-slate-200/30 dark:shadow-none hover:shadow-xl hover:shadow-brand-100/30 dark:hover:shadow-brand-500/5"
        >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="border-beam animate-[rotate-gradient_4s_linear_infinite]" />
            </div>

            <div className="relative h-[300px] overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-center transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-70 dark:from-slate-950 dark:via-transparent dark:opacity-60" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {member.name}
                    </h3>
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${getDeptColor(member.role)}`}>
                            {member.role}
                        </span>
                    </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-3 mb-6 flex-grow italic">
                    &ldquo;{member.bio}&rdquo;
                </p>

                <div className="mt-auto border-t border-slate-100 dark:border-white/5 pt-4">
                    <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors group/link"
                    >
                        <div className="flex items-center gap-2">
                            <Globe size={14} className="text-brand-500 group-hover/link:rotate-12 transition-transform" />
                            <span>OFFICIAL WEBSITE</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover/link:bg-brand-100 dark:group-hover/link:bg-brand-500/20 transition-colors">
                            <ArrowRight size={14} className="text-slate-400 dark:text-slate-500 group-hover/link:text-brand-600 dark:group-hover/link:text-brand-400 -rotate-45 group-hover/link:rotate-0 transition-transform duration-500" />
                        </div>
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const WING_COLORS = [
    { color: 'text-cyan-500 dark:text-cyan-400', bg: 'from-cyan-500/10 to-cyan-500/5', border: 'hover:border-cyan-500/50' },
    { color: 'text-purple-500 dark:text-purple-400', bg: 'from-purple-500/10 to-purple-500/5', border: 'hover:border-purple-500/50' },
    { color: 'text-orange-500 dark:text-orange-400', bg: 'from-orange-500/10 to-orange-500/5', border: 'hover:border-orange-500/50' },
    { color: 'text-emerald-500 dark:text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/5', border: 'hover:border-emerald-500/50' },
    { color: 'text-rose-500 dark:text-rose-400', bg: 'from-rose-500/10 to-rose-500/5', border: 'hover:border-rose-500/50' },
    { color: 'text-amber-500 dark:text-amber-400', bg: 'from-amber-500/10 to-amber-500/5', border: 'hover:border-amber-500/50' },
    { color: 'text-indigo-500 dark:text-indigo-400', bg: 'from-indigo-500/10 to-indigo-500/5', border: 'hover:border-indigo-500/50' },
    { color: 'text-pink-500 dark:text-pink-400', bg: 'from-pink-500/10 to-pink-500/5', border: 'hover:border-pink-500/50' },
];

const Company = () => {
    const { team, companyContent, wings, certificationGallery, companyStats, contentLoaded, isSectionVisible } = useContent();
    const displayTeam = team;
    const cc = companyContent || {};
    const COMPANY_CONTENT = cc.content || {
        hero: { badge: '', title: { prefix: '', highlight: '' }, description: '' },
        stats: [],
        mission: { title: '', text1: '', highlight: '', text2: '', codeBlock: { identity: '', visionVariable: '', visionValue: '', valuesVariable: '', values: [] } },
        certifications: { title: '' }
    };

    if (!contentLoaded) return <CompanySkeleton />;

    type AchievementItem = { title: string; issuer: string; year: string; color: string; border: string; source: 'company' | 'wing' };

    const iconMap: Record<string, any> = {
        "ISO 27001 Certified": ShieldCheck,
        "Top 50 Innovators": Zap,
        "Carbon Neutral": Globe,
        "Enterprise Security Award": Trophy
    };

    // Merge company-level achievements (from JSON) with wing achievements
    const companyAchievements: AchievementItem[] = (cc.achievements || []).map((a: any, i: number) => ({
        title: a.title,
        issuer: a.issuer,
        year: a.year,
        color: a.color || WING_COLORS[i % WING_COLORS.length].color,
        border: a.border || WING_COLORS[i % WING_COLORS.length].border,
        source: 'company',
    }));

    const wingAchievements: AchievementItem[] = [];
    wings.forEach((wing, wIdx) => {
        (wing.teamAchievements || []).forEach((ach, aIdx) => {
            const ci = (wIdx + aIdx) % WING_COLORS.length;
            wingAchievements.push({
                title: ach,
                issuer: wing.name || wing.teamName || '',
                year: '',
                color: WING_COLORS[ci].color,
                border: WING_COLORS[ci].border,
                source: 'wing',
            });
        });
    });

    const ALL_ACHIEVEMENTS = [...companyAchievements, ...wingAchievements];

    return (
        <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-[#050505] text-slate-900 dark:text-white overflow-hidden relative font-sans transition-colors duration-500">

            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(20,184,166,0.05),transparent_60%)] pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HERO */}
                {isSectionVisible('company', 'hero') && (
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-xs font-mono text-brand-600 dark:text-brand-400 mb-6"
                        >
                            <Users size={14} />
                            <span>{COMPANY_CONTENT?.hero?.badge || ''}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                        >
                            {COMPANY_CONTENT?.hero?.title?.prefix || ''}<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-white dark:to-slate-500">{COMPANY_CONTENT?.hero?.title?.highlight || ''}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto"
                        >
                            {COMPANY_CONTENT?.hero?.description || ''}
                        </motion.p>
                    </div>
                )}

                {/* STATS */}
                {isSectionVisible('company', 'stats') && (() => {
                    const apiStats = companyStats || [];
                    const jsonStats = COMPANY_CONTENT?.stats || [];
                    const displayStats = apiStats.length > 0 ? apiStats : jsonStats;
                    return displayStats.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                            {displayStats.map((stat: any, i: number) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-center hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                                >
                                    <div className="text-3xl md:text-4xl font-mono font-bold text-slate-900 dark:text-white mb-2">{stat.value}{stat.suffix || ''}</div>
                                    <div className="text-sm text-slate-500 dark:text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    );
                })()}

                {/* MISSION */}
                {isSectionVisible('company', 'mission') && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                        <div>
                            <h2 className="text-3xl font-mono font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                                <Target className="text-brand-500" /> {COMPANY_CONTENT?.mission?.title || ''}
                            </h2>
                            <div className="space-y-6 text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                                <p>
                                    {COMPANY_CONTENT?.mission?.text1 || ''}
                                    <strong className="text-slate-900 dark:text-white"> {COMPANY_CONTENT?.mission?.highlight || ''}</strong>
                                </p>
                                <p>
                                    {COMPANY_CONTENT?.mission?.text2 || ''}
                                </p>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full group-hover:bg-brand-500/20 transition-colors duration-700" />
                            <div className="relative border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0a0a0a]/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                                <div className="flex gap-2 mb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="font-mono text-sm text-green-600 dark:text-green-500 mb-4">{'>'} {COMPANY_CONTENT?.mission?.codeBlock?.identity || ''}</div>
                                <div className="space-y-2 font-mono text-sm text-slate-600 dark:text-gray-300">
                                    <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">{COMPANY_CONTENT?.mission?.codeBlock?.visionVariable || ''}</span> = <span className="text-orange-600 dark:text-orange-400">"{COMPANY_CONTENT?.mission?.codeBlock?.visionValue || ''}"</span>;</p>
                                    <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">{COMPANY_CONTENT?.mission?.codeBlock?.valuesVariable || ''}</span> = [<span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT?.mission?.codeBlock?.values?.[0] || ''}"</span>, <span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT?.mission?.codeBlock?.values?.[1] || ''}"</span>, <span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT?.mission?.codeBlock?.values?.[2] || ''}"</span>];</p>
                                    <p><span className="text-purple-600 dark:text-purple-400">while</span>(true) {'{'}</p>
                                    <p className="pl-4">Innovation.accelerate();</p>
                                    <p className="pl-4">Humanity.empower();</p>
                                    <p>{'}'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TEAM / LEADERSHIP */}
                {isSectionVisible('company', 'leadership') && (
                    <div className="mb-32">
                        <div className="flex items-end justify-between mb-12 border-b border-slate-200 dark:border-white/10 pb-6">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Executive Leadership</h2>
                                <p className="text-slate-400 dark:text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">{"// DIRECTORS // ARCHITECTS // ECOSYSTEM"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {displayTeam.map((member, i) => (
                                <MemberCard key={member.id} member={member} index={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* CERTIFICATIONS & ACHIEVEMENTS (merged) */}
                {isSectionVisible('company', 'certifications') && ALL_ACHIEVEMENTS.length > 0 && (
                    <div>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-mono font-bold mb-4 text-slate-900 dark:text-white">{COMPANY_CONTENT?.certifications?.title || 'CERTIFICATIONS & RECOGNITION'}</h2>
                            <div className="w-24 h-1 bg-brand-500 mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ALL_ACHIEVEMENTS.map((item, idx) => {
                                const Icon = iconMap[item.title] || Award;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (idx % 6) * 0.05 }}
                                        className={`relative p-6 rounded-xl border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0a0a0a] group hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none ${item.border}`}
                                    >
                                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color.replace('text-', 'from-')}/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />

                                        <div className={`w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                                            {item.source === 'wing' ? <Trophy size={24} /> : <Icon size={24} />}
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{item.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-gray-500 font-mono mb-1">{item.issuer}</p>
                                        <div className="text-xs text-slate-400 dark:text-gray-600 border-t border-slate-100 dark:border-white/5 pt-3 mt-4 flex justify-between items-center">
                                            <span className="flex items-center gap-1">
                                                {item.source === 'wing' ? <Trophy size={12} /> : <Award size={12} />}
                                                {item.source === 'wing' ? 'WING ACHIEVEMENT' : 'ISSUED'}
                                            </span>
                                            {item.year && <span className="text-slate-600 dark:text-gray-400 font-bold">{item.year}</span>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CERTIFICATION GALLERY */}
                {isSectionVisible('company', 'certGallery') && certificationGallery.length > 0 && (
                    <div className="mt-32">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-mono font-bold mb-4 text-slate-900 dark:text-white">Certification Gallery</h2>
                            <div className="w-24 h-1 bg-brand-500 mx-auto mb-4" />
                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
                                Official certifications, credentials, and verification documents
                            </p>
                        </div>
                        <CertificationGallery items={certificationGallery} />
                    </div>
                )}

                {/* COMPANY TIMELINE */}
                {isSectionVisible('company', 'timeline') && (
                    <div className="mt-32">
                        <TimelineSection />
                    </div>
                )}

            </div>
        </div>
    );
};

export default Company;
