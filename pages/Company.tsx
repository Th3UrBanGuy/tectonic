import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../components/ContentContext';
import Loader from '../components/Loader';
import { Linkedin, Award, ShieldCheck, Globe, Zap, Target, Users, Trophy } from 'lucide-react';

const Company = () => {
    const { companyContent, team, isLoading } = useContent();

    // Icon mapping for achievements
    const iconMap: Record<string, any> = {
        "ISO 27001 Certified": ShieldCheck,
        "Top 50 Innovators": Zap,
        "Carbon Neutral": Globe,
        "Enterprise Security Award": Trophy
    };

    if (isLoading || !companyContent.hero) {
        return <Loader />;
    }

    const COMPANY_CONTENT = companyContent;
    const COMPANY_ACHIEVEMENTS = companyContent.achievements || [];
    const TEAM = team;

    return (
        <div className="min-h-screen pt-24 pb-24 bg-white dark:bg-[#050505] text-slate-900 dark:text-white overflow-hidden relative font-sans transition-colors duration-500">

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-50 to-transparent dark:from-brand-900/10 dark:to-transparent pointer-events-none" />
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/10 blur-[100px] rounded-full pointer-events-none opacity-50 dark:opacity-100" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HERO / INTRO */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-xs font-mono text-brand-600 dark:text-brand-400 mb-6"
                    >
                        <Users size={14} />
                        <span>{COMPANY_CONTENT.hero.badge}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-slate-900 dark:text-white"
                    >
                        {COMPANY_CONTENT.hero.title.prefix}<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-400 dark:from-gray-200 dark:to-gray-600">{COMPANY_CONTENT.hero.title.highlight}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto"
                    >
                        {COMPANY_CONTENT.hero.description}
                    </motion.p>
                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
                    {COMPANY_CONTENT.stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/30 rounded-xl text-center hover:bg-slate-100 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <div className="text-3xl md:text-4xl font-mono font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                            <div className="text-sm text-slate-500 dark:text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* MISSION SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <div>
                        <h2 className="text-3xl font-mono font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                            <Target className="text-brand-500" /> {COMPANY_CONTENT.mission.title}
                        </h2>
                        <div className="space-y-6 text-slate-600 dark:text-gray-400 text-lg leading-relaxed">
                            <p>
                                {COMPANY_CONTENT.mission.text1}
                                <strong className="text-slate-900 dark:text-white"> {COMPANY_CONTENT.mission.highlight}</strong>
                            </p>
                            <p>
                                {COMPANY_CONTENT.mission.text2}
                            </p>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full group-hover:bg-brand-500/20 transition-colors duration-700" />
                        <div className="relative border border-slate-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                            <div className="flex gap-2 mb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                            <div className="font-mono text-sm text-green-600 dark:text-green-500 mb-4">{'>'} {COMPANY_CONTENT.mission.codeBlock.identity}</div>
                            <div className="space-y-2 font-mono text-sm text-slate-600 dark:text-gray-300">
                                <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">{COMPANY_CONTENT.mission.codeBlock.visionVariable}</span> = <span className="text-orange-600 dark:text-orange-400">"{COMPANY_CONTENT.mission.codeBlock.visionValue}"</span>;</p>
                                <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-blue-600 dark:text-blue-400">{COMPANY_CONTENT.mission.codeBlock.valuesVariable}</span> = [<span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT.mission.codeBlock.values[0]}"</span>, <span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT.mission.codeBlock.values[1]}"</span>, <span className="text-green-600 dark:text-green-300">"{COMPANY_CONTENT.mission.codeBlock.values[2]}"</span>];</p>
                                <p><span className="text-purple-600 dark:text-purple-400">while</span>(true) {'{'}</p>
                                <p className="pl-4">Innovation.accelerate();</p>
                                <p className="pl-4">Humanity.empower();</p>
                                <p>{'}'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TEAM SECTION */}
                <div className="mb-32">
                    <div className="flex items-end justify-between mb-12 border-b border-slate-200 dark:border-gray-800 pb-4">
                        <h2 className="text-3xl font-mono font-bold text-slate-900 dark:text-white">THE CORE LEADERSHIP</h2>
                        <div className="hidden md:block text-xs font-mono text-slate-500 dark:text-gray-500">
                    // BOARD OF DIRECTORS // EXECUTIVE WING
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TEAM.map((member, i) => (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative"
                            >
                                {/* Glassy Card Container */}
                                <div className="relative h-[480px] rounded-2xl overflow-hidden bg-white/40 dark:bg-gray-800/30 backdrop-blur-xl border border-slate-200/60 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-500">

                                    {/* Gradient Glow Effect */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-orange-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>

                                    {/* Image Container with Better Aspect Ratio */}
                                    <div className="relative h-[320px] overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 filter brightness-95 group-hover:brightness-100"
                                        />
                                        {/* Subtle Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>

                                        {/* Role Badge - Top Right */}
                                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-slate-200/50 dark:border-gray-700/50">
                                            <p className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{member.role.split('&')[1]?.trim() || member.role.split('-')[0]?.trim()}</p>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="relative p-6 bg-gradient-to-b from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-900/60 backdrop-blur-sm h-[160px] flex flex-col justify-between">

                                        {/* Name and Title */}
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mb-2 uppercase tracking-wide">
                                                {member.role}
                                            </p>
                                            <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                                                {member.bio}
                                            </p>
                                        </div>

                                        {/* Connect Button */}
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-orange-500/10 hover:from-cyan-500/20 hover:via-purple-500/20 hover:to-orange-500/20 border border-slate-200/60 dark:border-gray-700/50 text-sm font-semibold text-slate-900 dark:text-white transition-all duration-300 hover:scale-105 group/btn"
                                        >
                                            {member.linkedin.includes('linkedin.com') ? (
                                                <>
                                                    <Linkedin size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                    <span>LinkedIn Profile</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Globe size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                    <span>Visit Portfolio</span>
                                                </>
                                            )}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ACHIEVEMENTS SECTION */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-mono font-bold mb-4 text-slate-900 dark:text-white">{COMPANY_CONTENT.certifications.title}</h2>
                        <div className="w-24 h-1 bg-brand-500 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COMPANY_ACHIEVEMENTS.map((item, idx) => {
                            const Icon = iconMap[item.title] || Award;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className={`relative p-6 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] group hover:bg-slate-50 dark:hover:bg-gray-900 transition-all duration-300 overflow-hidden ${item.border}`}
                                >
                                    {/* Glow effect */}
                                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color.replace('text-', 'from-')}/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>

                                    <div className={`w-12 h-12 rounded-lg bg-slate-100 dark:bg-gray-900 flex items-center justify-center mb-6 border border-slate-200 dark:border-gray-800 group-hover:scale-110 transition-transform ${item.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">{item.title}</h3>
                                    <p className="text-sm text-slate-500 dark:text-gray-500 font-mono mb-1">{item.issuer}</p>
                                    <div className="text-xs text-slate-400 dark:text-gray-600 border-t border-slate-100 dark:border-gray-800 pt-3 mt-4 flex justify-between items-center">
                                        <span className="flex items-center gap-1"><Award size={12} /> ISSUED</span>
                                        <span className="text-slate-600 dark:text-gray-400 font-bold">{item.year}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Company;