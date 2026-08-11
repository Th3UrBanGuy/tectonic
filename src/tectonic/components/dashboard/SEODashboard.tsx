"use client";
import React, { useState, useEffect } from 'react';
import { Search, CheckCircle, AlertTriangle, ExternalLink, Globe, FileText, RefreshCw } from 'lucide-react';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
}

interface PageStatus {
  route: string;
  hasTitle: boolean;
  hasMetaTitle: boolean;
  hasMetaDescription: boolean;
  hasOG: boolean;
  metaTitleLength: number;
  metaDescLength: number;
}

const SEODashboard: React.FC = () => {
  const [sitemapEntries, setSitemapEntries] = useState<SitemapEntry[]>([]);
  const [pageStatuses, setPageStatuses] = useState<PageStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [sitemapXml, setSitemapXml] = useState('');

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    setLoading(true);
    try {
      // Fetch sitemap
      const sitemapRes = await fetch('/sitemap.xml');
      const sitemapText = await sitemapRes.text();
      setSitemapXml(sitemapText);

      // Parse sitemap entries
      const parser = new DOMParser();
      const doc = parser.parseFromString(sitemapText, 'text/xml');
      const urls = doc.querySelectorAll('url');
      const entries: SitemapEntry[] = Array.from(urls).map((urlEl) => ({
        url: urlEl.querySelector('loc')?.textContent || '',
        lastModified: urlEl.querySelector('lastmod')?.textContent || '',
        changeFrequency: urlEl.querySelector('changefreq')?.textContent || '',
        priority: parseFloat(urlEl.querySelector('priority')?.textContent || '0'),
      }));
      setSitemapEntries(entries);

      // Fetch page statuses
      const pagesRes = await fetch('/api/content?type=pages');
      const pagesData = await pagesRes.json();
      const pages = pagesData.data || [];

      const knownRoutes = ['/', '/company', '/wings', '/portfolio', '/contact', '/login'];
      const statuses: PageStatus[] = knownRoutes.map(route => {
        const page = pages.find((p: any) => p.routePath === route);
        return {
          route,
          hasTitle: !!page?.title,
          hasMetaTitle: !!page?.metaTitle,
          hasMetaDescription: !!page?.metaDescription,
          hasOG: !!page?.heroImageUrl,
          metaTitleLength: page?.metaTitle?.length || 0,
          metaDescLength: page?.metaDescription?.length || 0,
        };
      });
      setPageStatuses(statuses);
    } catch (error) {
      console.error('Failed to load SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scoreSEO = (page: PageStatus) => {
    let score = 0;
    if (page.hasMetaTitle) score += 30;
    if (page.metaTitleLength > 0 && page.metaTitleLength <= 60) score += 20;
    if (page.hasMetaDescription) score += 30;
    if (page.metaDescLength > 0 && page.metaDescLength <= 160) score += 20;
    return score;
  };

  const overallScore = pageStatuses.length > 0
    ? Math.round(pageStatuses.reduce((sum, p) => sum + scoreSEO(p), 0) / pageStatuses.length)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw size={32} className="animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">SEO Dashboard</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Monitor SEO health across the site</p>
        </div>
        <button onClick={loadSEOData} className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors">
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{sitemapEntries.length}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Sitemap URLs</div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{pageStatuses.length}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Tracked Pages</div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
          <div className={`text-2xl font-bold ${overallScore >= 70 ? 'text-green-600 dark:text-green-400' : overallScore >= 40 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
            {overallScore}%
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">SEO Score</div>
        </div>
        <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {pageStatuses.filter(p => p.hasMetaTitle && p.hasMetaDescription).length}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400">Fully Optimized</div>
        </div>
      </div>

      {/* Page-by-Page SEO Status */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText size={16} />
            Page SEO Status
          </h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-white/5">
          {pageStatuses.map((page) => {
            const score = scoreSEO(page);
            return (
              <div key={page.route} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <code className="text-sm font-mono text-slate-700 dark:text-slate-300">{page.route}</code>
                  {score === 100 ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : score >= 50 ? (
                    <AlertTriangle size={16} className="text-yellow-500" />
                  ) : (
                    <AlertTriangle size={16} className="text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${page.hasMetaTitle ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    Title: {page.hasMetaTitle ? `${page.metaTitleLength}ch` : 'Missing'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${page.hasMetaDescription ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    Desc: {page.hasMetaDescription ? `${page.metaDescLength}ch` : 'Missing'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${score === 100 ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : score >= 50 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                    {score}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sitemap Preview */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe size={16} />
            Sitemap URLs ({sitemapEntries.length})
          </h3>
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-xs text-brand-500 hover:text-brand-600 flex items-center gap-1">
            View Full <ExternalLink size={12} />
          </a>
        </div>
        <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
          {sitemapEntries.slice(0, 20).map((entry, i) => (
            <div key={i} className="px-4 py-2 flex items-center justify-between text-sm hover:bg-slate-50 dark:hover:bg-white/5">
              <code className="text-slate-700 dark:text-slate-300 truncate max-w-[60%]">{entry.url}</code>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{entry.changeFrequency}</span>
                <span className="text-xs text-slate-400">p:{entry.priority}</span>
                {entry.lastModified && (
                  <span className="text-xs text-slate-400">{new Date(entry.lastModified).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          ))}
          {sitemapEntries.length > 20 && (
            <div className="px-4 py-2 text-center text-sm text-slate-400">
              ...and {sitemapEntries.length - 20} more URLs
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-brand-50 dark:bg-brand-500/5 border border-brand-200 dark:border-brand-500/20 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-brand-700 dark:text-brand-400 mb-2">SEO Best Practices</h3>
        <ul className="text-sm text-brand-600 dark:text-brand-300 space-y-1">
          <li>• Meta title should be 30-60 characters</li>
          <li>• Meta description should be 120-160 characters</li>
          <li>• Every page should have unique meta title and description</li>
          <li>• Use the SEO Pages tab to edit individual page metadata</li>
          <li>• pSEO pages (industries/services) are auto-generated with proper meta tags</li>
        </ul>
      </div>
    </div>
  );
};

export default SEODashboard;
