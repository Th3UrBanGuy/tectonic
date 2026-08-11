"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Home, Sparkles, BarChart3, Layers } from 'lucide-react';

interface DeliverItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface HomeContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    buttons: { primary: string; secondary: string };
  };
  deliver: {
    title: string;
    items: DeliverItem[];
  };
  wings: { title: string };
  projects: { title: string; description: string; viewAll: string };
  partnerships: {
    title: string;
    description: string;
    stats: { value: string; label: string; color: string }[];
  };
}

const HomeContentEditor: React.FC = () => {
  const [content, setContent] = useState<HomeContent>({
    hero: { title: '', subtitle: '', description: '', buttons: { primary: '', secondary: '' } },
    deliver: { title: '', items: [] },
    wings: { title: '' },
    projects: { title: '', description: '', viewAll: '' },
    partnerships: { title: '', description: '', stats: [] },
  });
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=homeContent');
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
        body: JSON.stringify({ type: 'homeContent', data: content }),
      });
    } finally { setSaving(false); }
  };

  const addDeliverItem = () => {
    const newItem: DeliverItem = { id: `deliver-${Date.now()}`, title: '', description: '', icon: 'Globe' };
    setContent({ ...content, deliver: { ...content.deliver, items: [...content.deliver.items, newItem] } });
  };

  const updateDeliverItem = (id: string, field: keyof DeliverItem, value: string) => {
    setContent({
      ...content,
      deliver: {
        ...content.deliver,
        items: content.deliver.items.map(item => item.id === id ? { ...item, [field]: value } : item),
      },
    });
  };

  const removeDeliverItem = (id: string) => {
    setContent({
      ...content,
      deliver: { ...content.deliver, items: content.deliver.items.filter(item => item.id !== id) },
    });
  };

  const addPartnershipStat = () => {
    setContent({
      ...content,
      partnerships: {
        ...content.partnerships,
        stats: [...content.partnerships.stats, { value: '', label: '', color: 'from-cyan-600 to-purple-600' }],
      },
    });
  };

  const updatePartnershipStat = (index: number, field: string, value: string) => {
    const newStats = [...content.partnerships.stats];
    (newStats[index] as any)[field] = value;
    setContent({ ...content, partnerships: { ...content.partnerships, stats: newStats } });
  };

  const removePartnershipStat = (index: number) => {
    setContent({
      ...content,
      partnerships: {
        ...content.partnerships,
        stats: content.partnerships.stats.filter((_, i) => i !== index),
      },
    });
  };

  const sections = [
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'deliver', label: 'What We Deliver', icon: Layers },
    { id: 'projects', label: 'Projects Section', icon: BarChart3 },
    { id: 'partnerships', label: 'Partnerships', icon: Home },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Home Page Content</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Edit hero, deliverables, projects, and partnerships sections</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Section Tabs */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2 flex flex-wrap gap-2">
        {sections.map(sec => (
          <button key={sec.id} onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${expandedSection === sec.id ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'}`}>
            <sec.icon size={16} />
            {sec.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {expandedSection === 'hero' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Hero Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
              <input type="text" value={content.hero.title} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Subtitle</label>
              <input type="text" value={content.hero.subtitle} onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
            <textarea value={content.hero.description} onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })} rows={3} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Primary Button</label>
              <input type="text" value={content.hero.buttons.primary} onChange={(e) => setContent({ ...content, hero: { ...content.hero, buttons: { ...content.hero.buttons, primary: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Secondary Button</label>
              <input type="text" value={content.hero.buttons.secondary} onChange={(e) => setContent({ ...content, hero: { ...content.hero, buttons: { ...content.hero.buttons, secondary: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
          </div>
        </div>
      )}

      {/* Deliver Section */}
      {expandedSection === 'deliver' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">What We Deliver</h3>
            <button onClick={addDeliverItem} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
              <Plus size={14} /> Add Item
            </button>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Section Title</label>
            <input type="text" value={content.deliver.title} onChange={(e) => setContent({ ...content, deliver: { ...content.deliver, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div className="space-y-3">
            {content.deliver.items.map((item) => (
              <div key={item.id} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-3 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input type="text" value={item.title} onChange={(e) => updateDeliverItem(item.id, 'title', e.target.value)} placeholder="Title" className="px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                  <input type="text" value={item.description} onChange={(e) => updateDeliverItem(item.id, 'description', e.target.value)} placeholder="Description" className="px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                  <div className="flex gap-2">
                    <input type="text" value={item.icon} onChange={(e) => updateDeliverItem(item.id, 'icon', e.target.value)} placeholder="Icon" className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                    <button onClick={() => removeDeliverItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {expandedSection === 'projects' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Featured Projects Section</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Section Title</label>
              <input type="text" value={content.projects.title} onChange={(e) => setContent({ ...content, projects: { ...content.projects, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">View All Button Text</label>
              <input type="text" value={content.projects.viewAll} onChange={(e) => setContent({ ...content, projects: { ...content.projects, viewAll: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
            <textarea value={content.projects.description} onChange={(e) => setContent({ ...content, projects: { ...content.projects, description: e.target.value } })} rows={2} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
          </div>
        </div>
      )}

      {/* Partnerships Section */}
      {expandedSection === 'partnerships' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Partnerships</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
              <input type="text" value={content.partnerships.title} onChange={(e) => setContent({ ...content, partnerships: { ...content.partnerships, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
              <input type="text" value={content.partnerships.description} onChange={(e) => setContent({ ...content, partnerships: { ...content.partnerships, description: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stats</span>
            <button onClick={addPartnershipStat} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
              <Plus size={14} /> Add Stat
            </button>
          </div>
          <div className="space-y-2">
            {content.partnerships.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" value={stat.value} onChange={(e) => updatePartnershipStat(index, 'value', e.target.value)} placeholder="Value" className="w-24 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                <input type="text" value={stat.label} onChange={(e) => updatePartnershipStat(index, 'label', e.target.value)} placeholder="Label" className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                <input type="text" value={stat.color} onChange={(e) => updatePartnershipStat(index, 'color', e.target.value)} placeholder="Gradient class" className="w-48 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                <button onClick={() => removePartnershipStat(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeContentEditor;
