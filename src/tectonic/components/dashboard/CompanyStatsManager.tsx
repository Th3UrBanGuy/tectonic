"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, BarChart3 } from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string;
  suffix: string;
  iconName: string;
  orderIndex: number;
}

const ICON_OPTIONS = ['TrendingUp', 'Users', 'Globe', 'Zap', 'Shield', 'Award', 'Rocket', 'Target'];

const CompanyStatsManager: React.FC = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=companyStats');
    const data = await res.json();
    setStats(data.data || []);
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'companyStats', data: stats }),
      });
    } finally { setSaving(false); }
  };

  const add = () => {
    setStats([...stats, { id: `stat-${Date.now()}`, label: '', value: '', suffix: '', iconName: 'TrendingUp', orderIndex: stats.length }]);
  };

  const update = (id: string, field: keyof Stat, value: string | number) => {
    setStats(stats.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const remove = (id: string) => setStats(stats.filter(s => s.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Company Stats</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Key metrics displayed on the company page</p>
        </div>
        <div className="flex gap-2">
          <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
            <Plus size={16} /> Add Stat
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Label</label>
                <input type="text" value={stat.label} onChange={(e) => update(stat.id, 'label', e.target.value)} placeholder="e.g., Projects Delivered" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Value</label>
                <input type="text" value={stat.value} onChange={(e) => update(stat.id, 'value', e.target.value)} placeholder="e.g., 150" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Suffix</label>
                <input type="text" value={stat.suffix} onChange={(e) => update(stat.id, 'suffix', e.target.value)} placeholder="e.g., +" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Icon</label>
                  <select value={stat.iconName} onChange={(e) => update(stat.id, 'iconName', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none">
                    {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <button onClick={() => remove(stat.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {stats.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <BarChart3 size={40} className="mx-auto mb-3 opacity-50" />
            <p>No stats yet. Add your first company stat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyStatsManager;
