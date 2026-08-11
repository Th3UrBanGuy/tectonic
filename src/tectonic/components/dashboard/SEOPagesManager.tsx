"use client";
import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2, FileText, ChevronDown, ChevronUp, Eye } from 'lucide-react';

interface PageMeta {
  id: string;
  routePath: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroText: string;
  heroImageUrl: string;
}

const PAGES_ROUTES = [
  { path: '/', title: 'Home' },
  { path: '/company', title: 'Company' },
  { path: '/wings', title: 'Wings' },
  { path: '/portfolio', title: 'Portfolio' },
  { path: '/contact', title: 'Contact' },
  { path: '/login', title: 'Login' },
];

const SEOPagesManager: React.FC = () => {
  const [pages, setPages] = useState<PageMeta[]>([]);
  const [saving, setSaving] = useState(false);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    const res = await fetch('/api/content?type=pages');
    const data = await res.json();
    setPages(data.data || []);
  };

  const save = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'pages', data: pages }),
      });
    } finally { setSaving(false); }
  };

  const addPage = () => {
    const newPage: PageMeta = {
      id: `page-${Date.now()}`,
      routePath: '',
      title: '',
      metaTitle: '',
      metaDescription: '',
      heroTitle: '',
      heroSubtitle: '',
      heroText: '',
      heroImageUrl: '',
    };
    setPages([...pages, newPage]);
    setExpandedPage(newPage.id);
  };

  const updatePage = (id: string, field: keyof PageMeta, value: string) => {
    setPages(pages.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id));
    if (expandedPage === id) setExpandedPage(null);
  };

  const missingRoutes = PAGES_ROUTES.filter(
    pr => !pages.some(p => p.routePath === pr.path)
  );

  const addMissingRoutes = () => {
    const newPages = missingRoutes.map(pr => ({
      id: `page-${Date.now()}-${pr.path.replace(/\//g, '')}`,
      routePath: pr.path,
      title: pr.title,
      metaTitle: `${pr.title} | Techtonic`,
      metaDescription: '',
      heroTitle: pr.title,
      heroSubtitle: '',
      heroText: '',
      heroImageUrl: '',
    }));
    setPages([...pages, ...newPages]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">SEO Meta Pages</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage meta titles, descriptions, and hero content for each page</p>
        </div>
        <div className="flex gap-2">
          {missingRoutes.length > 0 && (
            <button onClick={addMissingRoutes} className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors">
              <Plus size={16} /> Add Missing Pages ({missingRoutes.length})
            </button>
          )}
          <button onClick={addPage} className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors">
            <Plus size={16} /> Add Page
          </button>
          <button onClick={save} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50">
            <Save size={16} /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <div key={page.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedPage(expandedPage === page.id ? null : page.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">{page.title || 'Untitled'}</span>
                <code className="text-xs bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">{page.routePath}</code>
                {page.metaTitle && (
                  <span className="text-xs text-green-600 dark:text-green-400">✓ Has meta</span>
                )}
              </div>
              {expandedPage === page.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
            </button>

            {expandedPage === page.id && (
              <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-white/5 pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Route Path</label>
                    <input type="text" value={page.routePath} onChange={(e) => updatePage(page.id, 'routePath', e.target.value)} placeholder="/about" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Page Title</label>
                    <input type="text" value={page.title} onChange={(e) => updatePage(page.id, 'title', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Title (SEO)</label>
                  <input type="text" value={page.metaTitle} onChange={(e) => updatePage(page.id, 'metaTitle', e.target.value)} placeholder="Page Title | Techtonic" className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  <p className="text-xs text-slate-400 mt-1">{page.metaTitle.length}/60 characters {page.metaTitle.length > 60 ? '⚠️ Too long' : ''}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Description (SEO)</label>
                  <textarea value={page.metaDescription} onChange={(e) => updatePage(page.id, 'metaDescription', e.target.value)} rows={2} placeholder="Brief description for search engines..." className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
                  <p className="text-xs text-slate-400 mt-1">{page.metaDescription.length}/160 characters {page.metaDescription.length > 160 ? '⚠️ Too long' : ''}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Title</label>
                    <input type="text" value={page.heroTitle} onChange={(e) => updatePage(page.id, 'heroTitle', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Subtitle</label>
                    <input type="text" value={page.heroSubtitle} onChange={(e) => updatePage(page.id, 'heroSubtitle', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Text</label>
                  <textarea value={page.heroText} onChange={(e) => updatePage(page.id, 'heroText', e.target.value)} rows={3} className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Image URL</label>
                  <input type="text" value={page.heroImageUrl} onChange={(e) => updatePage(page.id, 'heroImageUrl', e.target.value)} placeholder="https://..." className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Preview: {page.routePath}</span>
                  <button onClick={() => removePage(page.id)} className="flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm transition-colors">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {pages.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <FileText size={40} className="mx-auto mb-3 opacity-50" />
            <p>No SEO pages configured. Add pages or click &quot;Add Missing Pages&quot;.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOPagesManager;
