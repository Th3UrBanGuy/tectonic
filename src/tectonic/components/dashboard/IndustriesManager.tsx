"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Save, Plus, Trash2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Industry {
  id: string;
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  orderIndex: number;
}

interface ServicePage {
  id: string;
  industrySlug: string;
  serviceSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  bodyContent: string;
  features: string[];
  techStack: string[];
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
  orderIndex: number;
}

const SERVICES = [
  { slug: 'web-apps', name: 'Web Applications' },
  { slug: 'mobile-apps', name: 'Mobile Applications' },
  { slug: 'saas-platforms', name: 'SaaS Platforms' },
  { slug: 'ai-integration', name: 'AI Integration' },
  { slug: 'cloud-devops', name: 'Cloud & DevOps' },
  { slug: 'ui-ux-design', name: 'UI/UX Design' },
  { slug: 'api-development', name: 'API Development' },
  { slug: 'data-engineering', name: 'Data Engineering' },
];

const INDUSTRY_ICONS = ['Building', 'Heart', 'ShoppingCart', 'GraduationCap', 'Cpu', 'Car', 'Landmark', 'Plane'];

const IndustriesManager: React.FC = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [servicePages, setServicePages] = useState<ServicePage[]>([]);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'industries' | 'services'>('industries');
  const [expandedIndustry, setExpandedIndustry] = useState<string | null>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [indRes, svcRes] = await Promise.all([
        fetch('/api/content?type=industries'),
        fetch('/api/content?type=servicePages'),
      ]);
      const indData = await indRes.json();
      const svcData = await svcRes.json();
      setIndustries(indData.data || []);
      setServicePages(svcData.data || []);
    } catch (error) {
      console.error('Failed to load industries:', error);
    }
  };

  const saveIndustries = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'industries', data: industries }),
      });
    } finally {
      setSaving(false);
    }
  };

  const saveServicePages = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('techtonic_auth_token');
      await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ type: 'servicePages', data: servicePages }),
      });
    } finally {
      setSaving(false);
    }
  };

  const addIndustry = () => {
    const newIndustry: Industry = {
      id: `industry-${Date.now()}`,
      slug: '',
      name: '',
      description: '',
      metaTitle: '',
      metaDescription: '',
      icon: 'Building',
      orderIndex: industries.length,
    };
    setIndustries([...industries, newIndustry]);
    setExpandedIndustry(newIndustry.id);
  };

  const updateIndustry = (id: string, field: keyof Industry, value: string | number) => {
    setIndustries(industries.map(ind =>
      ind.id === id ? { ...ind, [field]: value } : ind
    ));
  };

  const removeIndustry = (id: string) => {
    setIndustries(industries.filter(ind => ind.id !== id));
    if (expandedIndustry === id) setExpandedIndustry(null);
  };

  const addServicePage = () => {
    const newPage: ServicePage = {
      id: `sp-${Date.now()}`,
      industrySlug: industries[0]?.slug || '',
      serviceSlug: SERVICES[0].slug,
      title: '',
      metaTitle: '',
      metaDescription: '',
      heroTitle: '',
      heroSubtitle: '',
      heroDescription: '',
      bodyContent: '',
      features: [],
      techStack: [],
      ctaText: 'Get Started',
      ctaLink: '/contact',
      imageUrl: '',
      isActive: true,
      orderIndex: servicePages.length,
    };
    setServicePages([...servicePages, newPage]);
    setExpandedService(newPage.id);
  };

  const updateServicePage = (id: string, field: keyof ServicePage, value: any) => {
    setServicePages(servicePages.map(sp =>
      sp.id === id ? { ...sp, [field]: value } : sp
    ));
  };

  const removeServicePage = (id: string) => {
    setServicePages(servicePages.filter(sp => sp.id !== id));
    if (expandedService === id) setExpandedService(null);
  };

  const generateServicePages = () => {
    const existing = new Set(servicePages.map(sp => `${sp.industrySlug}-${sp.serviceSlug}`));
    const newPages: ServicePage[] = [];
    for (const industry of industries) {
      for (const service of SERVICES) {
        const key = `${industry.slug}-${service.slug}`;
        if (!existing.has(key)) {
          newPages.push({
            id: `sp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            industrySlug: industry.slug,
            serviceSlug: service.slug,
            title: `${service.name} for ${industry.name}`,
            metaTitle: `${service.name} Development for ${industry.name} | Techtonic`,
            metaDescription: `Expert ${service.name.toLowerCase()} solutions tailored for the ${industry.name.toLowerCase()} industry.`,
            heroTitle: `${service.name}`,
            heroSubtitle: `for ${industry.name}`,
            heroDescription: `We build ${service.name.toLowerCase()} solutions designed specifically for the ${industry.name.toLowerCase()} industry.`,
            bodyContent: '',
            features: [],
            techStack: [],
            ctaText: 'Get Started',
            ctaLink: '/contact',
            imageUrl: '',
            isActive: true,
            orderIndex: servicePages.length + newPages.length,
          });
        }
      }
    }
    setServicePages([...servicePages, ...newPages]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Industries & Service Pages</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage programmatic SEO landing pages (8 industries × 8 services)</p>
        </div>
        <div className="flex gap-2">
          {activeSection === 'services' && (
            <button
              onClick={generateServicePages}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-lg text-sm font-medium hover:bg-purple-500/20 transition-colors"
            >
              <Plus size={16} />
              Auto-Generate Missing
            </button>
          )}
          <button
            onClick={activeSection === 'industries' ? saveIndustries : saveServicePages}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30 rounded-lg text-sm font-medium hover:bg-brand-500/20 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-2">
        <div className="flex gap-2">
          {[
            { id: 'industries' as const, label: `Industries (${industries.length})`, icon: Globe },
            { id: 'services' as const, label: `Service Pages (${servicePages.length})`, icon: ExternalLink },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === tab.id
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Industries Section */}
      {activeSection === 'industries' && (
        <div className="space-y-3">
          <button
            onClick={addIndustry}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
          >
            <Plus size={16} />
            Add Industry
          </button>

          {industries.map((industry) => (
            <div key={industry.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedIndustry(expandedIndustry === industry.id ? null : industry.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-slate-900 dark:text-white">{industry.name || 'Untitled Industry'}</span>
                  <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-full">{industry.slug}</span>
                </div>
                {expandedIndustry === industry.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
              </button>

              {expandedIndustry === industry.id && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-white/5 pt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={industry.name}
                        onChange={(e) => updateIndustry(industry.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Slug (URL)</label>
                      <input
                        type="text"
                        value={industry.slug}
                        onChange={(e) => updateIndustry(industry.id, 'slug', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none"
                        placeholder="e.g., fintech"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
                    <textarea
                      value={industry.description}
                      onChange={(e) => updateIndustry(industry.id, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={industry.metaTitle}
                        onChange={(e) => updateIndustry(industry.id, 'metaTitle', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Icon</label>
                      <select
                        value={industry.icon}
                        onChange={(e) => updateIndustry(industry.id, 'icon', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none"
                      >
                        {INDUSTRY_ICONS.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Description</label>
                    <textarea
                      value={industry.metaDescription}
                      onChange={(e) => updateIndustry(industry.id, 'metaDescription', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 outline-none resize-none"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-slate-400">URL: /{industry.slug}</span>
                    <button
                      onClick={() => removeIndustry(industry.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm transition-colors"
                    >
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Service Pages Section */}
      {activeSection === 'services' && (
        <div className="space-y-3">
          <button
            onClick={addServicePage}
            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30 rounded-lg text-sm font-medium hover:bg-green-500/20 transition-colors"
          >
            <Plus size={16} />
            Add Service Page
          </button>

          {servicePages.map((sp) => {
            const industryName = industries.find(i => i.slug === sp.industrySlug)?.name || sp.industrySlug;
            const serviceName = SERVICES.find(s => s.slug === sp.serviceSlug)?.name || sp.serviceSlug;

            return (
              <div key={sp.id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedService(expandedService === sp.id ? null : sp.id)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{industryName} → {serviceName}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sp.isActive ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                      {sp.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {expandedService === sp.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </button>

                {expandedService === sp.id && (
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-100 dark:border-white/5 pt-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Industry</label>
                        <select
                          value={sp.industrySlug}
                          onChange={(e) => updateServicePage(sp.id, 'industrySlug', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
                        >
                          {industries.map(ind => (
                            <option key={ind.slug} value={ind.slug}>{ind.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Service</label>
                        <select
                          value={sp.serviceSlug}
                          onChange={(e) => updateServicePage(sp.id, 'serviceSlug', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
                        >
                          {SERVICES.map(svc => (
                            <option key={svc.slug} value={svc.slug}>{svc.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Page Title</label>
                      <input
                        type="text"
                        value={sp.title}
                        onChange={(e) => updateServicePage(sp.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Title</label>
                        <input
                          type="text"
                          value={sp.metaTitle}
                          onChange={(e) => updateServicePage(sp.id, 'metaTitle', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Title</label>
                        <input
                          type="text"
                          value={sp.heroTitle}
                          onChange={(e) => updateServicePage(sp.id, 'heroTitle', e.target.value)}
                          className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Meta Description</label>
                      <textarea
                        value={sp.metaDescription}
                        onChange={(e) => updateServicePage(sp.id, 'metaDescription', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Hero Description</label>
                      <textarea
                        value={sp.heroDescription}
                        onChange={(e) => updateServicePage(sp.id, 'heroDescription', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white outline-none resize-none"
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs text-slate-400">URL: /{sp.industrySlug}/{sp.serviceSlug}</span>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={sp.isActive}
                            onChange={(e) => updateServicePage(sp.id, 'isActive', e.target.checked)}
                            className="rounded border-slate-300 dark:border-white/20 text-brand-500 focus:ring-brand-500/50"
                          />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Active</span>
                        </label>
                        <button
                          onClick={() => removeServicePage(sp.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm transition-colors"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IndustriesManager;
