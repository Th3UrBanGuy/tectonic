"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Clock } from 'lucide-react';

interface TimelineEntry {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

const ICON_OPTIONS = ['Clock', 'Rocket', 'Target', 'Globe', 'Code', 'Database', 'Shield', 'Zap', 'Star', 'Award'];

const TimelineManager: React.FC = () => {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=timeline');
    const data = await res.json();
    setEntries((data.data || []).map((t: any, i: number) => ({
      id: `timeline-${i}`,
      title: t.title || '',
      description: t.description || '',
      iconName: t.iconName || 'Clock',
    })));
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'timeline', data: entries.map((e, i) => ({ ...e, orderIndex: i })) }),
      });
    } finally { setSaving(false); }
  };

  const add = () => {
    setEntries([...entries, { id: `timeline-${Date.now()}`, title: '', description: '', iconName: 'Clock' }]);
  };

  const update = (id: string, field: keyof TimelineEntry, value: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const remove = (id: string) => setEntries(entries.filter(e => e.id !== id));

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newEntries = [...entries];
    [newEntries[index - 1], newEntries[index]] = [newEntries[index], newEntries[index - 1]];
    setEntries(newEntries);
  };

  const moveDown = (index: number) => {
    if (index === entries.length - 1) return;
    const newEntries = [...entries];
    [newEntries[index], newEntries[index + 1]] = [newEntries[index + 1], newEntries[index]];
    setEntries(newEntries);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Company Timeline</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Key milestones and achievements in company history</p>
        </div>
        <div className="flex gap-2">
          <button onClick={add} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
            <Plus size={16} /> Add Entry
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={entry.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 pt-2">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="text-slate-400 hover:text-slate-600 disabled:opacity-30 text-xs">▲</button>
                <span className="text-xs text-slate-400 font-mono">{index + 1}</span>
                <button onClick={() => moveDown(index)} disabled={index === entries.length - 1} className="text-slate-400 hover:text-slate-600 disabled:opacity-30 text-xs">▼</button>
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
                    <input type="text" value={entry.title} onChange={(e) => update(entry.id, 'title', e.target.value)} placeholder="e.g., Founded Techtonic" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Icon</label>
                    <select value={entry.iconName} onChange={(e) => update(entry.id, 'iconName', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none">
                      {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
                  <textarea value={entry.description} onChange={(e) => update(entry.id, 'description', e.target.value)} rows={2} placeholder="Brief description of this milestone" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
                </div>
              </div>
              <button onClick={() => remove(entry.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mt-2">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {entries.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Clock size={40} className="mx-auto mb-3 opacity-50" />
            <p>No timeline entries yet. Add your first milestone.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineManager;
