import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Activity, Users, Globe, Shield, Zap, Link2, Mail, Briefcase, Layers } from 'lucide-react';
import { useContent } from '../ContentContext';
import { getAllLinks } from '../../services/linkStorage';
import { getToken } from '../../services/auth';

const StatCard = ({ title, value, icon: Icon, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="p-6 bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl backdrop-blur-sm hover:shadow-md dark:hover:bg-white/10 transition-all duration-300"
    >
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold dark:font-mono mb-1 tracking-wide">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg bg-${color}-500/10 dark:bg-${color}-500/20 text-${color}-600 dark:text-${color}-400`}>
                <Icon size={20} />
            </div>
        </div>
    </motion.div>
);

const Overview = () => {
    const { wings, team, projects, partnerships } = useContent();
    const [linkCount, setLinkCount] = useState(0);
    const [totalVisits, setTotalVisits] = useState(0);
    const [inquiryCount, setInquiryCount] = useState(0);
    const [newInquiries, setNewInquiries] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Link stats from localStorage
        const links = getAllLinks();
        setLinkCount(links.length);
        setTotalVisits(links.reduce((sum, l) => sum + l.currentVisits, 0));

        // Inquiry + user counts from API
        const fetchStats = async () => {
            try {
                const token = getToken();
                const [inquiryRes, userRes] = await Promise.all([
                    fetch('/api/contact', { headers: { Authorization: `Bearer ${token}` } }),
                    fetch('/api/auth/users', { headers: { Authorization: `Bearer ${token}` } }),
                ]);
                if (inquiryRes.ok) {
                    const data = await inquiryRes.json();
                    const subs = data.submissions || [];
                    setInquiryCount(subs.length);
                    setNewInquiries(subs.filter((s: any) => s.status === 'New').length);
                }
                if (userRes.ok) {
                    const data = await userRes.json();
                    setUserCount((data.users || []).length);
                }
            } catch {
                // silently ignore — stats just stay 0
            }
        };
        fetchStats();
    }, []);

    const trafficData = [
        { name: 'Jan', value: 4000 },
        { name: 'Feb', value: 3000 },
        { name: 'Mar', value: 2000 },
        { name: 'Apr', value: 2780 },
        { name: 'May', value: 1890 },
        { name: 'Jun', value: 4390 },
        { name: 'Jul', value: 3490 },
    ];

    return (
        <div className="space-y-6 text-slate-900 dark:text-white transition-colors duration-500">
            {/* Real content stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="WINGS" value={wings.length} icon={Layers} color="cyan" delay={0.1} />
                <StatCard title="PROJECTS" value={projects.length} icon={Briefcase} color="purple" delay={0.2} />
                <StatCard title="TEAM MEMBERS" value={team.length} icon={Users} color="emerald" delay={0.3} />
                <StatCard title="PARTNERS" value={partnerships.length} icon={Globe} color="amber" delay={0.4} />
            </div>

            {/* Engagement stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="SHORT LINKS" value={linkCount} icon={Link2} color="cyan" delay={0.15} />
                <StatCard title="TOTAL VISITS" value={totalVisits.toLocaleString()} icon={Activity} color="purple" delay={0.25} />
                <StatCard title="INQUIRIES" value={inquiryCount} icon={Mail} color="emerald" delay={0.35} />
                <StatCard title="ADMIN USERS" value={userCount} icon={Shield} color="amber" delay={0.45} />
            </div>

            {/* New inquiries alert */}
            {newInquiries > 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center gap-3"
                >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <p className="text-sm text-cyan-700 dark:text-cyan-400 font-medium">
                        You have {newInquiries} new {newInquiries === 1 ? 'inquiry' : 'inquiries'} awaiting review in the Inquiries tab.
                    </p>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 p-6 bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl backdrop-blur-sm"
                >
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Activity className="text-brand-500 dark:text-cyan-400" size={18} />
                        TRAFFIC ANALYTICS
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" strokeClass="stroke-slate-200 dark:stroke-slate-700" vertical={false} />
                                <XAxis dataKey="name" strokeClass="stroke-slate-400 dark:stroke-slate-500" axisLine={false} tickLine={false} />
                                <YAxis strokeClass="stroke-slate-400 dark:stroke-slate-500" axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#f8fafc', borderRadius: '8px' }}
                                    itemStyle={{ color: '#06b6d4' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 bg-white border border-slate-200 shadow-sm dark:bg-white/5 dark:border-white/10 rounded-xl backdrop-blur-sm"
                >
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Shield className="text-purple-500 dark:text-purple-400" size={18} />
                        SYSTEM STATUS
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold dark:font-mono">System Online</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">All services operational</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold dark:font-mono">Database Connected</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">SQLite — responsive</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors">
                            <div className={`w-2 h-2 rounded-full ${linkCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold dark:font-mono">Link Center Active</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">{linkCount} links tracked</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors">
                            <div className={`w-2 h-2 rounded-full ${inquiryCount > 0 ? 'bg-cyan-500 animate-pulse' : 'bg-slate-400'}`} />
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold dark:font-mono">Inquiries Pipeline</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">{inquiryCount} total · {newInquiries} new</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10 transition-colors">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <div>
                                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold dark:font-mono">Content Synced</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500">{wings.length + team.length + projects.length + partnerships.length} entities managed</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Overview;
