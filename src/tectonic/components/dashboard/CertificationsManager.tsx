"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ChevronDown, ChevronRight, Trophy, Star } from 'lucide-react';
import { useContent } from '../ContentContext';

interface CompanyAchievement {
  title: string;
  issuer: string;
  year: string;
  color: string;
  border: string;
}

const CertificationsManager: React.FC = () => {
  const [companyAchievements, setCompanyAchievements] = useState<CompanyAchievement[]>([]);
  const [companyContentRaw, setCompanyContentRaw] = useState<any>(null);
  const [savingAchievements, setSavingAchievements] = useState(false);
  const { wings, setWings } = useContent();
  const [expandedWing, setExpandedWing] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const ccRes = await fetch('/api/content?type=companyContent');
    const ccData = await ccRes.json();
    const cc = ccData.data || {};
    setCompanyContentRaw(cc);
    setCompanyAchievements(cc.achievements || []);
  };

  const saveAchievements = async () => {
    setSavingAchievements(true);
    try {
      const updated = { ...companyContentRaw, achievements: companyAchievements };
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'companyContent', data: updated }),
      });
      setCompanyContentRaw(updated);
    } finally { setSavingAchievements(false); }
  };

  const addCompanyAchievement = () => {
    setCompanyAchievements([...companyAchievements, { title: '', issuer: '', year: '', color: 'text-emerald-500 dark:text-emerald-400', border: 'hover:border-emerald-500/50' }]);
  };

  const updateCompanyAchievement = (index: number, field: keyof CompanyAchievement, value: string) => {
    const updated = [...companyAchievements];
    (updated[index] as any)[field] = value;
    setCompanyAchievements(updated);
  };

  const removeCompanyAchievement = (index: number) => {
    setCompanyAchievements(companyAchievements.filter((_, i) => i !== index));
  };

  const updateWingAchievements = (wingSlug: string, achievements: string[]) => {
    setWings(wings.map(w => w.id === wingSlug ? { ...w, teamAchievements: achievements } : w));
  };

  const addWingAchievement = (wingSlug: string) => {
    const wing = wings.find(w => w.id === wingSlug);
    if (!wing) return;
    updateWingAchievements(wingSlug, [...(wing.teamAchievements || []), '']);
  };

  const updateWingAchievement = (wingSlug: string, index: number, value: string) => {
    const wing = wings.find(w => w.id === wingSlug);
    if (!wing) return;
    const updated = [...(wing.teamAchievements || [])];
    updated[index] = value;
    updateWingAchievements(wingSlug, updated);
  };

  const removeWingAchievement = (wingSlug: string, index: number) => {
    const wing = wings.find(w => w.id === wingSlug);
    if (!wing) return;
    updateWingAchievements(wingSlug, (wing.teamAchievements || []).filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Achievements</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage company achievements and per-wing milestones</p>
      </div>

      {/* ── Company Achievements ────────────────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star size={18} className="text-amber-500" />
              Company Achievements
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Shown on the Company page — hackathons, competitions, recognitions</p>
          </div>
          <div className="flex gap-2">
            <button onClick={addCompanyAchievement} className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
              <Plus size={14} /> Add
            </button>
            <button onClick={saveAchievements} disabled={savingAchievements} className="flex items-center gap-2 px-3 py-1.5 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
              <Save size={14} /> {savingAchievements ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {companyAchievements.map((ach, idx) => (
            <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Title</label>
                  <input type="text" value={ach.title} onChange={(e) => updateCompanyAchievement(idx, 'title', e.target.value)} placeholder="e.g., BGCTUB IT Fest Hackathon (1st Place)" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Issuer</label>
                  <input type="text" value={ach.issuer} onChange={(e) => updateCompanyAchievement(idx, 'issuer', e.target.value)} placeholder="e.g., BGCTUB IT CLUB" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Year</label>
                  <input type="text" value={ach.year} onChange={(e) => updateCompanyAchievement(idx, 'year', e.target.value)} placeholder="e.g., 2025" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                </div>
                <div className="sm:col-span-2 flex items-end justify-end">
                  <button onClick={() => removeCompanyAchievement(idx)} className="flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm transition-colors">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          {companyAchievements.length === 0 && (
            <div className="text-center py-6 text-slate-400 text-sm">
              <Star size={32} className="mx-auto mb-2 opacity-50" />
              <p>No company achievements yet. Add one to display on the Company page.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Wing Achievements ────────────────────────────────────────── */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" />
            Wing Achievements
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Per-wing achievements — also displayed on the Company page</p>
        </div>

        <div className="space-y-2">
          {wings.map((wing) => (
            <div key={wing.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedWing(expandedWing === wing.id ? null : wing.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${wing.color}`}>{wing.name}</span>
                  <span className="text-xs text-slate-400 font-mono">{wing.teamAchievements?.length || 0} achievements</span>
                </div>
                {expandedWing === wing.id ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
              </button>

              {expandedWing === wing.id && (
                <div className="px-4 pb-4 border-t border-slate-100 dark:border-white/5">
                  <div className="space-y-2 mt-3">
                    {(wing.teamAchievements || []).map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={ach}
                          onChange={(e) => updateWingAchievement(wing.id, idx, e.target.value)}
                          placeholder="Achievement description"
                          className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                        />
                        <button onClick={() => removeWingAchievement(wing.id, idx)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => addWingAchievement(wing.id)} className="mt-3 flex items-center gap-2 px-3 py-1.5 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 rounded-lg text-sm font-medium transition-colors">
                    <Plus size={14} /> Add Achievement
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CertificationsManager;
