import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { X, TrendingUp, Users, Monitor, Smartphone, Tablet, ExternalLink } from 'lucide-react';
import { ShortenedLink } from '../../types';
import { formatDate } from '../../utils/linkUtils';

interface LinkStatsProps {
    link: ShortenedLink;
    onClose: () => void;
}

const LinkStats: React.FC<LinkStatsProps> = ({ link, onClose }) => {
    // Prepare visit history data for chart
    const visitData = link.analytics.visitHistory
        .slice(-30) // Last 30 visits
        .reduce((acc, visit) => {
            const date = new Date(visit.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const existing = acc.find(item => item.date === date);
            if (existing) {
                existing.visits += 1;
            } else {
                acc.push({ date, visits: 1 });
            }
            return acc;
        }, [] as { date: string; visits: number }[]);

    // Prepare device data for pie chart
    const deviceData = [
        { name: 'Desktop', value: link.analytics.devices.desktop, color: '#06b6d4' },
        { name: 'Mobile', value: link.analytics.devices.mobile, color: '#8b5cf6' },
        { name: 'Tablet', value: link.analytics.devices.tablet, color: '#10b981' },
    ].filter(item => item.value > 0);

    // Top referrers
    const topReferrers = Object.entries(link.analytics.referrers)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Link Analytics</h2>
                        <div className="flex items-center gap-2 text-cyan-400 font-mono">
                            <span>{link.shortUrl}</span>
                            <a href={link.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="text-slate-400" size={20} />
                    </button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <TrendingUp size={16} />
                            <span>Total Visits</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{link.analytics.totalVisits}</div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <Users size={16} />
                            <span>Unique Visitors</span>
                        </div>
                        <div className="text-3xl font-bold text-white">{link.analytics.uniqueVisitors}</div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                            <Monitor size={16} />
                            <span>Conversion Rate</span>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {link.analytics.totalVisits > 0
                                ? ((link.analytics.uniqueVisitors / link.analytics.totalVisits) * 100).toFixed(1)
                                : 0}%
                        </div>
                    </div>
                </div>

                {/* Visit History Chart */}
                {visitData.length > 0 && (
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-bold text-white mb-4">Visit History</h3>
                        <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={visitData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="date" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        itemStyle={{ color: '#06b6d4' }}
                                    />
                                    <Area type="monotone" dataKey="visits" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorVisits)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Device Distribution & Top Referrers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Device Distribution */}
                    {deviceData.length > 0 && (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Device Distribution</h3>
                            <div className="h-[200px] flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="text-center">
                                    <Monitor className="text-cyan-400 mx-auto mb-1" size={20} />
                                    <div className="text-white font-bold">{link.analytics.devices.desktop}</div>
                                    <div className="text-xs text-slate-400">Desktop</div>
                                </div>
                                <div className="text-center">
                                    <Smartphone className="text-purple-400 mx-auto mb-1" size={20} />
                                    <div className="text-white font-bold">{link.analytics.devices.mobile}</div>
                                    <div className="text-xs text-slate-400">Mobile</div>
                                </div>
                                <div className="text-center">
                                    <Tablet className="text-emerald-400 mx-auto mb-1" size={20} />
                                    <div className="text-white font-bold">{link.analytics.devices.tablet}</div>
                                    <div className="text-xs text-slate-400">Tablet</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Top Referrers */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Top Referrers</h3>
                        <div className="space-y-3">
                            {topReferrers.length > 0 ? (
                                topReferrers.map(([referrer, count], index) => (
                                    <div key={referrer} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                                                {index + 1}
                                            </div>
                                            <span className="text-slate-300 truncate text-sm">{referrer}</span>
                                        </div>
                                        <span className="text-white font-bold ml-2">{count}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-slate-500 py-8">
                                    No referrer data yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Visits */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Visits</h3>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {link.analytics.visitHistory.slice(-10).reverse().map((visit, index) => (
                            <div key={index} className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg">
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm text-slate-300 truncate">{visit.referrer}</div>
                                    <div className="text-xs text-slate-500">{formatDate(visit.timestamp)}</div>
                                </div>
                            </div>
                        ))}
                        {link.analytics.visitHistory.length === 0 && (
                            <div className="text-center text-slate-500 py-8">
                                No visits yet
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LinkStats;
