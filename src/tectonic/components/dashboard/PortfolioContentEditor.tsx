"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Briefcase } from 'lucide-react';

interface PortfolioContent {
  header: { badge: string; title: string; description: string };
  filters: string[];
  emptyState: { title: string; description: string };
}

const PortfolioContentEditor: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent>({
    header: { badge: '', title: '', description: '' },
    filters: [],
    emptyState: { title: '', description: '' },
  });
  const [saving, setSaving] = useState(false);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=portfolioContent');
    const data = await res.json();
    if (data.data) setContent(data.data);
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'portfolioContent', data: content }),
      });
    } finally { setSaving(false); }
  };

  const addFilter = () => {
    if (!newFilter.trim()) return;
    setContent({ ...content, filters: [...content.filters, newFilter.trim()] });
    setNewFilter('');
  };

  const removeFilter = (index: number) => {
    setContent({ ...content, filters: content.filters.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio Page Content</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Edit header, filter categories, and empty state text</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Header Section */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <Briefcase size={14} />
          </div>
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Header Section</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Badge Text</label>
            <input type="text" value={content.header.badge} onChange={(e) => setContent({ ...content, header: { ...content.header, badge: e.target.value } })} placeholder="e.g., Our Work" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
            <input type="text" value={content.header.title} onChange={(e) => setContent({ ...content, header: { ...content.header, title: e.target.value } })} placeholder="e.g., CASE STUDIES" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
          <textarea value={content.header.description} onChange={(e) => setContent({ ...content, header: { ...content.header, description: e.target.value } })} rows={2} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Filter Categories</h3>
        <div className="flex flex-wrap gap-2">
          {content.filters.map((filter, index) => (
            <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-white/10 rounded-full text-sm text-slate-700 dark:text-slate-300">
              {filter}
              <button onClick={() => removeFilter(index)} className="text-slate-400 hover:text-red-500 transition-colors">
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" value={newFilter} onChange={(e) => setNewFilter(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addFilter(); } }} placeholder="New filter category" className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          <button onClick={addFilter} className="px-3 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Empty State Section */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Empty State</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
            <input type="text" value={content.emptyState.title} onChange={(e) => setContent({ ...content, emptyState: { ...content.emptyState, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
            <input type="text" value={content.emptyState.description} onChange={(e) => setContent({ ...content, emptyState: { ...content.emptyState, description: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioContentEditor;
