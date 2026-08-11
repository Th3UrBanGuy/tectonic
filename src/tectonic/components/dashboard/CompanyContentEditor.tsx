"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Building2, Sparkles, Target, Award } from 'lucide-react';

interface CompanyContent {
  hero: {
    badge: string;
    title: { prefix: string; highlight: string };
    description: string;
  };
  stats: { label: string; value: string }[];
  mission: {
    title: string;
    text1: string;
    highlight: string;
    text2: string;
    codeBlock: {
      identity: string;
      visionVariable: string;
      visionValue: string;
      valuesVariable: string;
      values: string[];
    };
  };
  achievements: { title: string; issuer: string; year: string }[];
}

const CompanyContentEditor: React.FC = () => {
  const [content, setContent] = useState<CompanyContent>({
    hero: { badge: '', title: { prefix: '', highlight: '' }, description: '' },
    stats: [],
    mission: { title: '', text1: '', highlight: '', text2: '', codeBlock: { identity: '', visionVariable: '', visionValue: '', valuesVariable: '', values: [] } },
    achievements: [],
  });
  const [saving, setSaving] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('hero');

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=companyContent');
    const data = await res.json();
    if (data.data) {
      const d = data.data;
      setContent({
        hero: d.hero || d.content?.hero || { badge: '', title: { prefix: '', highlight: '' }, description: '' },
        stats: d.stats || d.content?.stats || [],
        mission: d.mission || d.content?.mission || { title: '', text1: '', highlight: '', text2: '', codeBlock: { identity: '', visionVariable: '', visionValue: '', valuesVariable: '', values: [] } },
        achievements: d.achievements || [],
      });
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'companyContent', data: content }),
      });
    } finally { setSaving(false); }
  };

  const addStat = () => {
    setContent({ ...content, stats: [...content.stats, { label: '', value: '' }] });
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...content.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent({ ...content, stats: newStats });
  };

  const removeStat = (index: number) => {
    setContent({ ...content, stats: content.stats.filter((_, i) => i !== index) });
  };

  const addAchievement = () => {
    setContent({ ...content, achievements: [...content.achievements, { title: '', issuer: '', year: '' }] });
  };

  const updateAchievement = (index: number, field: keyof CompanyContent['achievements'][0], value: string) => {
    const newAch = [...content.achievements];
    newAch[index] = { ...newAch[index], [field]: value };
    setContent({ ...content, achievements: newAch });
  };

  const removeAchievement = (index: number) => {
    setContent({ ...content, achievements: content.achievements.filter((_, i) => i !== index) });
  };

  const addMissionValue = () => {
    const cb = content.mission.codeBlock;
    setContent({
      ...content,
      mission: {
        ...content.mission,
        codeBlock: { ...cb, values: [...cb.values, ''] },
      },
    });
  };

  const updateMissionValue = (index: number, value: string) => {
    const cb = content.mission.codeBlock;
    const newValues = [...cb.values];
    newValues[index] = value;
    setContent({
      ...content,
      mission: {
        ...content.mission,
        codeBlock: { ...cb, values: newValues },
      },
    });
  };

  const removeMissionValue = (index: number) => {
    const cb = content.mission.codeBlock;
    setContent({
      ...content,
      mission: {
        ...content.mission,
        codeBlock: { ...cb, values: cb.values.filter((_, i) => i !== index) },
      },
    });
  };

  const sections = [
    { id: 'hero', label: 'Hero', icon: Sparkles },
    { id: 'stats', label: 'Stats', icon: Target },
    { id: 'mission', label: 'Mission', icon: Building2 },
    { id: 'achievements', label: 'Achievements', icon: Award },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Company Page Content</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Edit hero, stats, mission statement, and achievements</p>
        </div>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
          <Save size={16} /> {saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2 flex flex-wrap gap-2">
        {sections.map(sec => (
          <button key={sec.id} onClick={() => setExpandedSection(expandedSection === sec.id ? null : sec.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${expandedSection === sec.id ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'}`}>
            <sec.icon size={16} />
            {sec.label}
          </button>
        ))}
      </div>

      {/* Hero */}
      {expandedSection === 'hero' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Hero Section</h3>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Badge</label>
            <input type="text" value={content.hero.badge} onChange={(e) => setContent({ ...content, hero: { ...content.hero, badge: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title Prefix</label>
              <input type="text" value={content.hero.title.prefix} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: { ...content.hero.title, prefix: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title Highlight</label>
              <input type="text" value={content.hero.title.highlight} onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: { ...content.hero.title, highlight: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
            <textarea value={content.hero.description} onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })} rows={4} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
          </div>
        </div>
      )}

      {/* Stats */}
      {expandedSection === 'stats' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Company Stats</h3>
            <button onClick={addStat} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
              <Plus size={14} /> Add Stat
            </button>
          </div>
          <div className="space-y-2">
            {content.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <input type="text" value={stat.label} onChange={(e) => updateStat(index, 'label', e.target.value)} placeholder="Label (e.g., Founded)" className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                <input type="text" value={stat.value} onChange={(e) => updateStat(index, 'value', e.target.value)} placeholder="Value (e.g., 2025)" className="w-32 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                <button onClick={() => removeStat(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mission */}
      {expandedSection === 'mission' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Mission Statement</h3>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Section Title</label>
            <input type="text" value={content.mission.title} onChange={(e) => setContent({ ...content, mission: { ...content.mission, title: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Opening Text</label>
            <textarea value={content.mission.text1} onChange={(e) => setContent({ ...content, mission: { ...content.mission, text1: e.target.value } })} rows={2} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Highlight Text</label>
            <input type="text" value={content.mission.highlight} onChange={(e) => setContent({ ...content, mission: { ...content.mission, highlight: e.target.value } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Closing Text</label>
            <textarea value={content.mission.text2} onChange={(e) => setContent({ ...content, mission: { ...content.mission, text2: e.target.value } })} rows={3} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/5">
            <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Code Block</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Identity Line</label>
                <input type="text" value={content.mission.codeBlock.identity} onChange={(e) => setContent({ ...content, mission: { ...content.mission, codeBlock: { ...content.mission.codeBlock, identity: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 font-mono text-xs" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Vision Variable</label>
                <input type="text" value={content.mission.codeBlock.visionVariable} onChange={(e) => setContent({ ...content, mission: { ...content.mission, codeBlock: { ...content.mission.codeBlock, visionVariable: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 font-mono text-xs" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Vision Value</label>
                <input type="text" value={content.mission.codeBlock.visionValue} onChange={(e) => setContent({ ...content, mission: { ...content.mission, codeBlock: { ...content.mission.codeBlock, visionValue: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 font-mono text-xs" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Values Variable</label>
                <input type="text" value={content.mission.codeBlock.valuesVariable} onChange={(e) => setContent({ ...content, mission: { ...content.mission, codeBlock: { ...content.mission.codeBlock, valuesVariable: e.target.value } } })} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 font-mono text-xs" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Values Array</label>
                <button onClick={addMissionValue} className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-xs hover:bg-green-500/20 transition-colors">
                  <Plus size={12} /> Add
                </button>
              </div>
              <div className="space-y-1">
                {content.mission.codeBlock.values.map((val, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono w-6">[{i}]</span>
                    <input type="text" value={val} onChange={(e) => updateMissionValue(i, e.target.value)} className="flex-1 px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none font-mono text-xs" />
                    <button onClick={() => removeMissionValue(i)} className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      {expandedSection === 'achievements' && (
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Achievements & Awards</h3>
            <button onClick={addAchievement} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-xs font-medium hover:bg-green-500/20 transition-colors">
              <Plus size={14} /> Add Achievement
            </button>
          </div>
          <div className="space-y-3">
            {content.achievements.map((ach, index) => (
              <div key={index} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-medium text-slate-400 mb-1">Title</label>
                    <input type="text" value={ach.title} onChange={(e) => updateAchievement(index, 'title', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-medium text-slate-400 mb-1">Issuer</label>
                      <input type="text" value={ach.issuer} onChange={(e) => updateAchievement(index, 'issuer', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-medium text-slate-400 mb-1">Year</label>
                      <div className="flex gap-1">
                        <input type="text" value={ach.year} onChange={(e) => updateAchievement(index, 'year', e.target.value)} className="flex-1 px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none" />
                        <button onClick={() => removeAchievement(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyContentEditor;
