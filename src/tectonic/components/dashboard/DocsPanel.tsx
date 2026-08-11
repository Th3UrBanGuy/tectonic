"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, Globe, FileText, Database, Users, BarChart3,
    Settings, Link2, Award, Clock, ChevronDown, ChevronRight,
    Lightbulb, AlertTriangle, CheckCircle, ExternalLink, Sparkles,
    Eye, Hash, Layers, MessageSquare, Mail, Shield, Plus,
    Key, Bell, Palette, Lock, Unlock, Copy, Trash2, Edit3,
    Zap, TrendingUp, RefreshCw,     Code, Server, Cpu, HardDrive,
    GitBranch, AlertCircle, Info, Download, Upload, RotateCcw,
    LayoutDashboard, Building2
} from 'lucide-react';

type DocSection = 'overview' | 'quickstart' | 'seo' | 'pseo' | 'content' | 'dashboard' | 'linkcenter' | 'visibility' | 'settings' | 'api' | 'security' | 'faq';

interface DocItem {
    title: string;
    icon: React.ElementType;
    content: React.ReactNode;
}

interface InfoBoxProps {
    type: 'info' | 'warning' | 'success' | 'tip';
    title?: string;
    children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, children }) => {
    const styles = {
        info: {
            wrapper: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
            icon: <Info size={14} className="text-blue-500" />,
            title: 'text-blue-700 dark:text-blue-300',
            text: 'text-blue-600 dark:text-blue-400',
        },
        warning: {
            wrapper: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
            icon: <AlertTriangle size={14} className="text-amber-500" />,
            title: 'text-amber-700 dark:text-amber-300',
            text: 'text-amber-600 dark:text-amber-400',
        },
        success: {
            wrapper: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
            icon: <CheckCircle size={14} className="text-emerald-500" />,
            title: 'text-emerald-700 dark:text-emerald-300',
            text: 'text-emerald-600 dark:text-emerald-400',
        },
        tip: {
            wrapper: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
            icon: <Lightbulb size={14} className="text-purple-500" />,
            title: 'text-purple-700 dark:text-purple-300',
            text: 'text-purple-600 dark:text-purple-400',
        },
    };
    const s = styles[type];
    return (
        <div className={`p-3 rounded-xl border ${s.wrapper}`}>
            {(title || type) && (
                <div className="flex items-center gap-2 mb-1">
                    {s.icon}
                    <span className={`font-semibold text-xs ${s.title}`}>{title || (type === 'info' ? 'Info' : type === 'warning' ? 'Warning' : type === 'success' ? 'Success' : 'Tip')}</span>
                </div>
            )}
            <div className={`text-xs ${s.text}`}>{children}</div>
        </div>
    );
};

const DocsPanel: React.FC = () => {
    const [activeSection, setActiveSection] = useState<DocSection>('overview');
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleItem = (id: string) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    const sections: { id: DocSection; label: string; icon: React.ElementType; group: string }[] = [
        { id: 'overview', label: 'Overview', icon: BookOpen, group: 'Getting Started' },
        { id: 'quickstart', label: 'Quick Start', icon: Zap, group: 'Getting Started' },
        { id: 'seo', label: 'SEO Guide', icon: Search, group: 'Content & SEO' },
        { id: 'pseo', label: 'pSEO Pages', icon: Globe, group: 'Content & SEO' },
        { id: 'content', label: 'Content Management', icon: Database, group: 'Content & SEO' },
        { id: 'dashboard', label: 'Dashboard Features', icon: Layers, group: 'Features' },
        { id: 'linkcenter', label: 'Link Center', icon: Link2, group: 'Features' },
        { id: 'visibility', label: 'Section Visibility', icon: Eye, group: 'Features' },
        { id: 'settings', label: 'Settings', icon: Settings, group: 'Account' },
        { id: 'api', label: 'API Reference', icon: Code, group: 'Advanced' },
        { id: 'security', label: 'Security', icon: Shield, group: 'Advanced' },
        { id: 'faq', label: 'FAQ & Troubleshooting', icon: Lightbulb, group: 'Support' },
    ];

    const groupedSections = sections.reduce<Record<string, typeof sections>>((acc, sec) => {
        if (!acc[sec.group]) acc[sec.group] = [];
        acc[sec.group].push(sec);
        return acc;
    }, {});

    // ══════════════════════════════════════════════════════════════════
    // 1. OVERVIEW
    // ══════════════════════════════════════════════════════════════════
    const overviewItems: DocItem[] = [
        {
            title: 'Welcome to Techtonic Admin',
            icon: Sparkles,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The Techtonic admin panel is your centralized command center for managing every aspect of your website. Built with Next.js, Prisma, and a PostgreSQL database (Neon), it provides real-time content management, SEO optimization, analytics, and security controls — all from a single dashboard.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                            <div className="font-semibold text-brand-700 dark:text-brand-300 mb-1">Content Management</div>
                            <div className="text-xs text-brand-600 dark:text-brand-400">Edit projects, team members, wings, partners, timeline, stats, and all page content in real-time.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20">
                            <div className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">SEO Control</div>
                            <div className="text-xs text-cyan-600 dark:text-cyan-400">Meta titles, descriptions, JSON-LD structured data, sitemap management, and real-time SEO scoring.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                            <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Programmatic SEO</div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400">64 auto-generated landing pages across 8 industries × 8 services, each with unique content.</div>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20">
                            <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Full Site Control</div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">Link center, visibility toggles, user management, security settings, and section-level control.</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Dashboard Navigation',
            icon: Layers,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The sidebar organizes 10 tabs into logical groups. Use <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs font-mono">Cmd+[</kbd> (Mac) or <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs font-mono">Ctrl+[</kbd> (Windows) to collapse/expand the sidebar.</p>
                    <div className="space-y-2">
                        {[
                            { group: 'Main', tabs: [{ name: 'Overview', desc: 'Dashboard stats, charts, system status' }, { name: 'Operatives', desc: 'User management — add/edit/delete admins' }, { name: 'Inquiries', desc: 'Contact form submissions' }] },
                            { group: 'Content', tabs: [{ name: 'Content', desc: '14 sub-tabs for all content types' }, { name: 'Visibility', desc: 'Toggle 33 sections on/off per page' }] },
                            { group: 'Tools', tabs: [{ name: 'Link Center', desc: 'Create and manage short URLs (/go/*)' }, { name: 'Messages', desc: 'Internal team chat system' }] },
                            { group: 'Advanced', tabs: [{ name: 'SEO', desc: 'SEO dashboard + page metadata editor' }] },
                            { group: '', tabs: [{ name: 'Docs & Guides', desc: 'This documentation panel' }, { name: 'Settings', desc: 'Profile, password, notifications, theme' }] },
                        ].map((g, gi) => (
                            <div key={gi} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                                <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2 text-xs uppercase tracking-wider">{g.group || 'Bottom'}</div>
                                <div className="space-y-1">
                                    {g.tabs.map((t, ti) => (
                                        <div key={ti} className="flex items-center gap-2 text-xs">
                                            <span className="font-medium text-slate-700 dark:text-slate-300 w-28">{t.name}</span>
                                            <span className="text-slate-500 dark:text-slate-400">{t.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'System Architecture',
            icon: Server,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Understanding the data flow helps you troubleshoot issues and optimize performance.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Data Flow Pipeline:</div>
                        <div className="flex flex-col gap-2 text-xs font-mono">
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 rounded">React UI</span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded">ContentContext</span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded">API Routes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 rounded">Prisma ORM</span>
                                <span className="text-slate-400">→</span>
                                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded">Neon PostgreSQL</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <InfoBox type="info" title="Caching Strategy">
                            ContentContext caches responses for 60 seconds to reduce API calls. Changes appear within 60s without page refresh.
                        </InfoBox>
                        <InfoBox type="tip" title="ISR for pSEO Pages">
                            pSEO pages use Incremental Static Regeneration (revalidate: 3600). Pages rebuild in the background every hour — users always see the cached version.
                        </InfoBox>
                        <InfoBox type="warning" title="Force-Dynamic Pages">
                            Pages like /company, /wings, /portfolio use force-dynamic to always fetch fresh data. This means no caching — every request hits the database.
                        </InfoBox>
                    </div>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 2. QUICK START
    // ══════════════════════════════════════════════════════════════════
    const quickstartItems: DocItem[] = [
        {
            title: 'First Login',
            icon: Lock,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Access the admin panel at <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs font-mono">/login</code>.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Login Steps:</div>
                        <ol className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Navigate to <code className="bg-slate-100 dark:bg-white/10 px-1 rounded">https://yourdomain.com/login</code></li>
                            <li>Enter the seed credentials provided during deployment</li>
                            <li>Click "Sign In" — you'll be redirected to the dashboard</li>
                            <li>Go to <strong>Settings → Password</strong> and change your password immediately</li>
                        </ol>
                    </div>
                    <InfoBox type="warning" title="Security First">
                        Always change the default password on first login. Use a strong password with uppercase, lowercase, numbers, and at least 8 characters.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Your First Content Update',
            icon: Database,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Let's update a tech stack item to see how content management works.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Step-by-Step:</div>
                        <ol className="space-y-2 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Click <strong>Content</strong> in the sidebar</li>
                            <li>Select the <strong>Innovation</strong> sub-tab</li>
                            <li>Find the <strong>Tech Stack</strong> section and click "Add Item"</li>
                            <li>Enter a name (e.g., "React Native"), category, and icon</li>
                            <li>Click <strong>Save</strong></li>
                            <li>Visit your live site — the new tech stack item appears within 60 seconds</li>
                        </ol>
                    </div>
                    <InfoBox type="success" title="Instant Updates">
                        Most content changes (projects, team, wings, stats) appear immediately on the public site through ContentContext.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Check Your SEO',
            icon: Search,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Verify your site's SEO health in 2 minutes.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Quick SEO Check:</div>
                        <ol className="space-y-2 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Click <strong>SEO</strong> in the sidebar</li>
                            <li>Review the <strong>SEO Score</strong> card — aim for 100%</li>
                            <li>Check each page's status — fix any "Missing" badges</li>
                            <li>Go to <strong>SEO Pages</strong> sub-tab to edit metadata</li>
                            <li>Set meta title (30-60 chars) and description (120-160 chars)</li>
                            <li>Check <code className="bg-slate-100 dark:bg-white/10 px-1 rounded">/sitemap.xml</code> to verify all pages are listed</li>
                        </ol>
                    </div>
                    <InfoBox type="tip" title="Target Score">
                        Every page should have a meta title (30-60 chars) and meta description (120-160 chars). Use the SEO Pages tab to fix any missing data.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 3. SEO GUIDE
    // ══════════════════════════════════════════════════════════════════
    const seoItems: DocItem[] = [
        {
            title: 'How SEO Works on This Site',
            icon: Search,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Every page on your site has unique SEO metadata generated from the database. The system uses <code className="px-1.5 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs font-mono">generateMetadata</code> from Next.js to pull the latest data at build/request time.</p>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Automatically Generated:</div>
                        <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
                            <li>• <strong>Sitemap.xml</strong> — Auto-generated with all pages including pSEO landing pages</li>
                            <li>• <strong>robots.txt</strong> — Dynamic rules for crawlers</li>
                            <li>• <strong>Page titles</strong> — Template: "Page Name | Techtonic" (configurable per page)</li>
                            <li>• <strong>OG/Twitter images</strong> — Fallback images for social sharing</li>
                            <li>• <strong>Canonical URLs</strong> — Prevents duplicate content issues</li>
                            <li>• <strong>JSON-LD schemas</strong> — Organization, WebSite, BreadcrumbList, Service, Article</li>
                        </ul>
                    </div>
                    <InfoBox type="warning" title="What You Must Configure">
                        Meta titles and descriptions for each page must be set manually via the SEO Pages tab. The auto-generated defaults are generic — customize them for best rankings.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Editing Page Metadata',
            icon: Edit3,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>SEO → SEO Pages</strong> tab to edit meta information for every page.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">How to Edit:</div>
                        <ol className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Select the page you want to optimize from the page list</li>
                            <li>Enter a meta title (1-60 characters)</li>
                            <li>Enter a meta description (1-160 characters)</li>
                            <li>Click Save — changes are applied to the database</li>
                            <li>Wait for ISR revalidation (pSEO pages) or hard refresh</li>
                        </ol>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">SEO Scoring Algorithm (100%):</div>
                        <div className="space-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                            <div className="flex items-center gap-2"><span className="w-40">Meta Title Exists</span><span className="text-emerald-500">+30 pts</span></div>
                            <div className="flex items-center gap-2"><span className="w-40">Title Length ≤ 60 chars</span><span className="text-emerald-500">+20 pts</span></div>
                            <div className="flex items-center gap-2"><span className="w-40">Meta Description Exists</span><span className="text-emerald-500">+30 pts</span></div>
                            <div className="flex items-center gap-2"><span className="w-40">Description Length ≤ 160</span><span className="text-emerald-500">+20 pts</span></div>
                        </div>
                    </div>
                    <InfoBox type="tip" title="Best Practices">
                        Put most important words first in titles. Include your brand: "Custom Software Development | Techtonic". Write compelling descriptions with a call-to-action. Never keyword stuff.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Structured Data (JSON-LD)',
            icon: Hash,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Structured data helps search engines understand your content and can enable rich snippets in search results.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Schemas Active on Your Site:</div>
                        <div className="space-y-2">
                            {[
                                { schema: 'Organization', where: 'Every page (root layout)', what: 'Company name, logo, social profiles, contact info' },
                                { schema: 'WebSite', where: 'Homepage only', what: 'Site name, SearchAction for sitelinks search box' },
                                { schema: 'BreadcrumbList', where: 'All pages', what: 'Navigation breadcrumbs for SERP display' },
                                { schema: 'Service', where: 'pSEO landing pages', what: 'Service details, provider, area served, pricing' },
                                { schema: 'Article', where: 'Portfolio detail pages', what: 'Project title, author, publish date, image' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs">
                                    <span className="font-mono bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 flex-shrink-0">{s.schema}</span>
                                    <span className="text-slate-400">→</span>
                                    <span className="text-slate-500 dark:text-slate-400"><strong>{s.where}</strong>: {s.what}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <InfoBox type="info" title="Validation">
                        Use Google's Rich Results Test (search.google.com/test/rich-results) to validate your structured data after deployment.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'SEO Dashboard',
            icon: BarChart3,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The <strong>SEO Dashboard</strong> gives you a real-time overview of your site's SEO health.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Dashboard Components:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Sitemap URL count</strong> — Total pages in your sitemap.xml</li>
                            <li>• <strong>Overall SEO Score</strong> — Weighted average across all tracked pages</li>
                            <li>• <strong>Page-by-page status</strong> — Per-page score with title/description indicators</li>
                            <li>• <strong>Character length badges</strong> — Green (optimal), yellow (warning), red (too long)</li>
                            <li>• <strong>Score breakdown</strong> — 100% = fully optimized, 50% = partial, 0% = missing</li>
                        </ul>
                    </div>
                    <InfoBox type="success" title="Target: 100% SEO Score">
                        Every page should have a meta title (30-60 chars) and meta description (120-160 chars). Use the SEO Pages tab to fix any missing data.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 4. pSEO PAGES
    // ══════════════════════════════════════════════════════════════════
    const pseoItems: DocItem[] = [
        {
            title: 'What is pSEO?',
            icon: Globe,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p><strong>Programmatic SEO (pSEO)</strong> automatically generates landing pages for every combination of your services and industries. Instead of manually creating 64+ pages, the system generates them from your data.</p>
                    <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                        <div className="font-semibold text-brand-700 dark:text-brand-300 mb-2">Your pSEO Structure:</div>
                        <div className="text-xs text-brand-600 dark:text-brand-400 space-y-1">
                            <p><strong>8 Industries</strong> × <strong>8 Services</strong> = <strong>64 landing pages</strong></p>
                            <p>Each page has unique meta tags, hero content, features, tech stack, and CTA.</p>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Example URLs:</div>
                        <ul className="space-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                            <li>• tect0nic.com/finance/custom-software</li>
                            <li>• tect0nic.com/healthcare/ai-integration</li>
                            <li>• tect0nic.com/retail/web-apps</li>
                            <li>• tect0nic.com/education/saas-platforms</li>
                        </ul>
                    </div>
                    <InfoBox type="info" title="ISR Revalidation">
                        pSEO pages use Incremental Static Regeneration (revalidate: 3600). After editing, pages rebuild in the background every hour. Users always see the cached version while rebuild happens.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Managing Industries',
            icon: Globe,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>Content → Industries</strong> tab to manage your industry categories.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Industry Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Name</strong> — Display name (e.g., "Finance", "Healthcare")</li>
                            <li>• <strong>Slug</strong> — URL part (e.g., "finance") — appears in /finance/</li>
                            <li>• <strong>Description</strong> — Short industry description</li>
                            <li>• <strong>Meta Title</strong> — SEO title for the industry index page</li>
                            <li>• <strong>Meta Description</strong> — SEO description for the industry index page</li>
                            <li>• <strong>Icon</strong> — Lucide icon name (8 available: Building2, HeartPulse, ShoppingCart, GraduationCap, Cpu, Factory, Car, Leaf)</li>
                            <li>• <strong>Order</strong> — Display order on the page</li>
                        </ul>
                    </div>
                    <InfoBox type="warning" title="Slug Changes">
                        Changing a slug changes the URL. Old URLs will 404. Only change slugs before launch or set up 301 redirects first.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Managing Service Pages',
            icon: FileText,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>Content → Industries → Service Pages</strong> sub-tab to manage individual pSEO landing pages.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Service Page Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Industry + Service</strong> — Which combination this page covers</li>
                            <li>• <strong>pageTitle</strong> — Page heading displayed on the page</li>
                            <li>• <strong>metaTitle</strong> — SEO title (30-60 chars)</li>
                            <li>• <strong>metaDescription</strong> — SEO description (120-160 chars)</li>
                            <li>• <strong>heroTitle</strong> — Landing page hero headline</li>
                            <li>• <strong>heroDescription</strong> — Hero subtitle text</li>
                            <li>• <strong>bodyContent</strong> — Main page content (supports markdown)</li>
                            <li>• <strong>features</strong> — List of service features (JSON array)</li>
                            <li>• <strong>techStack</strong> — Technologies used (JSON array)</li>
                            <li>• <strong>ctaText / ctaLink</strong> — Call-to-action button text and URL</li>
                            <li>• <strong>imageUrl</strong> — Hero image URL</li>
                            <li>• <strong>active</strong> — Enable/disable the page from rendering</li>
                        </ul>
                    </div>
                    <InfoBox type="success" title="Auto-Generate Button">
                        Click "Auto-Generate Missing" to create stub pages for all industry×service combinations that don't exist yet. Then edit the content of each generated page individually.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'pSEO Content Tips',
            icon: Lightbulb,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Each pSEO page should have unique, valuable content — not just copied text with swapped keywords.</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
                            <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Do:</div>
                            <ul className="space-y-1 text-xs text-emerald-600 dark:text-emerald-400">
                                <li>✓ Write unique hero descriptions per industry-service combo</li>
                                <li>✓ List industry-specific features and benefits</li>
                                <li>✓ Use relevant tech stack for each industry (finance → security, healthcare → HIPAA)</li>
                                <li>✓ Include case studies or examples when possible</li>
                                <li>✓ Write compelling, unique meta descriptions with CTAs</li>
                                <li>✓ Link between related service pages (internal linking)</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                            <div className="font-semibold text-red-700 dark:text-red-300 mb-1">Don't:</div>
                            <ul className="space-y-1 text-xs text-red-600 dark:text-red-400">
                                <li>✗ Copy-paste the same content across pages (Google penalizes this)</li>
                                <li>✗ Stuff keywords unnaturally</li>
                                <li>✗ Leave hero descriptions or body content empty</li>
                                <li>✗ Use the same meta title for multiple pages</li>
                                <li>✗ Forget to set CTA links — every page needs a conversion path</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 5. CONTENT MANAGEMENT
    // ══════════════════════════════════════════════════════════════════
    const contentItems: DocItem[] = [
        {
            title: 'Content Tab Overview',
            icon: Database,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The <strong>Content</strong> tab has <strong>14 sub-tabs</strong> for managing every content type on your site:</p>
                    <div className="space-y-1.5">
                        {[
                            { tab: 'Innovation', desc: 'Tech stack items and roadmap milestones', icon: Sparkles },
                            { tab: 'Portfolio', desc: 'Project cards with categories, clients, challenges', icon: FileText },
                            { tab: 'Wings', desc: 'Departments/divisions with tech stacks and features', icon: Layers },
                            { tab: 'Team', desc: 'Leadership and team member profiles', icon: Users },
                            { tab: 'Partners', desc: 'Partner logos, names, and descriptions', icon: Award },
                            { tab: 'Certs & Awards', desc: 'Certifications and credentials list', icon: Shield },
                            { tab: 'Cert Gallery', desc: 'Image upload for certification gallery', icon: Upload },
                            { tab: 'Stats', desc: 'Company metrics (projects completed, team size, etc.)', icon: BarChart3 },
                            { tab: 'Timeline', desc: 'Company milestones and history events', icon: Clock },
                            { tab: 'Industries', desc: 'pSEO industries and service pages', icon: Globe },
                            { tab: 'Home Content', desc: 'Full home page hero, sections, and CTAs', icon: LayoutDashboard },
                            { tab: 'Company Content', desc: 'Company page mission, values, achievements', icon: Building2 },
                            { tab: 'Portfolio Content', desc: 'Portfolio page header, filters, and layout', icon: FileText },
                            { tab: 'Site Settings', desc: 'Site name, tagline, social links, footer', icon: Settings },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                                <div className="p-1 rounded-md bg-brand-50 dark:bg-brand-500/10">
                                    <item.icon size={12} className="text-brand-500" />
                                </div>
                                <span className="font-medium text-slate-800 dark:text-slate-200 w-28 text-xs">{item.tab}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'Adding a New Project',
            icon: Plus,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Create portfolio entries that showcase your work.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Steps:</div>
                        <ol className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Click <strong>Content → Portfolio</strong></li>
                            <li>Click <strong>"Add Project"</strong> button</li>
                            <li>Fill in: <strong>Title</strong>, <strong>Category</strong> (Software / Security / Robotics / Consultancy)</li>
                            <li>Add <strong>Client Name</strong> (optional)</li>
                            <li>Write <strong>Challenge</strong> — What problem did the client face?</li>
                            <li>Write <strong>Solution</strong> — What did you build?</li>
                            <li>Write <strong>Impact</strong> — What results were achieved?</li>
                            <li>Add an <strong>Image URL</strong> (direct link to .jpg, .png, or .webp)</li>
                            <li>Click <strong>Save</strong></li>
                        </ol>
                    </div>
                    <InfoBox type="tip" title="Image URLs">
                        Use direct image URLs ending in .jpg, .png, or .webp. Supported hosts: Cloudinary, Unsplash, Freepik, Behance, or any HTTPS URL.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Managing Team Members',
            icon: Users,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage the team profiles displayed on the company page and throughout the site.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Member Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Name</strong> — Full display name</li>
                            <li>• <strong>Role</strong> — Job title (e.g., "CEO", "Lead Engineer")</li>
                            <li>• <strong>Image URL</strong> — Profile photo (shows full color on public site)</li>
                            <li>• <strong>Bio</strong> — Short biography or description</li>
                            <li>• <strong>Website</strong> — Personal website or portfolio URL</li>
                        </ul>
                    </div>
                    <InfoBox type="info" title="Image Display">
                        Team member images are displayed in full color on the public site. Use high-resolution photos (at least 400×400px) for best results.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Export / Import / Reset',
            icon: Download,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The Content tab includes backup and migration tools for all DB content.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Three Operations:</div>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2 text-xs">
                                <Download size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                                <div><strong>Export</strong> — Downloads all database content as a single JSON file. Use this for backups before making major changes.</div>
                            </div>
                            <div className="flex items-start gap-2 text-xs">
                                <Upload size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                <div><strong>Import</strong> — Uploads a JSON file and writes all content to the database. Overwrites existing data.</div>
                            </div>
                            <div className="flex items-start gap-2 text-xs">
                                <RotateCcw size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                <div><strong>Reset</strong> — Clears all content and restores factory defaults. Cannot be undone.</div>
                            </div>
                        </div>
                    </div>
                    <InfoBox type="warning" title="Important">
                        All three operations now use the DB API (not localStorage). Import overwrites ALL existing content — always export a backup first. Reset cannot be undone.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 6. DASHBOARD FEATURES
    // ══════════════════════════════════════════════════════════════════
    const dashboardItems: DocItem[] = [
        {
            title: 'Overview Tab',
            icon: BarChart3,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The Overview tab shows your site's key metrics at a glance.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">8 Stat Cards:</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <div>• <strong>Wings</strong> — Total departments</div>
                            <div>• <strong>Projects</strong> — Portfolio entries</div>
                            <div>• <strong>Team</strong> — Team members</div>
                            <div>• <strong>Partners</strong> — Partner count</div>
                            <div>• <strong>Links</strong> — Short URLs created</div>
                            <div>• <strong>Visits</strong> — Total link clicks</div>
                            <div>• <strong>Inquiries</strong> — Contact submissions</div>
                            <div>• <strong>Admins</strong> — Registered users</div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <InfoBox type="info" title="Link Visit Chart">
                            The area chart shows link visit trends over time. Hover over data points for exact counts.
                        </InfoBox>
                        <InfoBox type="success" title="New Inquiries Alert">
                            Unread inquiries show a badge on the Inquiries tab and an alert on the overview dashboard.
                        </InfoBox>
                    </div>
                </div>
            ),
        },
        {
            title: 'Operatives (User Management)',
            icon: Users,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage admin users who can access the dashboard. Uses request deduplication with a 30-second cache to prevent duplicate API calls.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">User Roles:</div>
                        <div className="space-y-2">
                            {[
                                { role: 'Admin', access: 'Full access to all features', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
                                { role: 'Editor', access: 'Content management only (no settings, users, or security)', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
                                { role: 'Viewer', access: 'Read-only access to dashboard and content', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-500/10' },
                            ].map((r, i) => (
                                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${r.bg}`}>
                                    <span className={`font-semibold text-xs ${r.color} w-16`}>{r.role}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">{r.access}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <InfoBox type="tip" title="Best Practice">
                        Limit the number of admin accounts. Review operatives regularly and remove unused accounts. Use the principle of least privilege.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Inquiries (Contact Submissions)',
            icon: Mail,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>View and manage messages submitted through your contact form.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Inquiry Shows:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• Contact name and email address</li>
                            <li>• Subject line and full message content</li>
                            <li>• Submission timestamp</li>
                            <li>• Status: <strong>New</strong> (unread) / <strong>Read</strong> / <strong>Replied</strong> / <strong>Archived</strong></li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Actions:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• Click an inquiry to view full details</li>
                            <li>• Update status from New → Read → Replied → Archived</li>
                            <li>• Delete inquiries you no longer need</li>
                            <li>• Badge shows unread count on the sidebar tab</li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 7. LINK CENTER
    // ══════════════════════════════════════════════════════════════════
    const linkcenterItems: DocItem[] = [
        {
            title: 'Creating Short Links',
            icon: Link2,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Create branded short URLs for sharing on social media, emails, and marketing materials.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Steps:</div>
                        <ol className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Click <strong>Link Center</strong> in the sidebar</li>
                            <li>Click <strong>"Create"</strong> button</li>
                            <li>Enter the <strong>destination URL</strong> (where users will be redirected)</li>
                            <li>Enter a <strong>custom slug</strong> (optional — auto-generates if empty)</li>
                            <li>Optionally set a <strong>password</strong> (users must enter to access the link)</li>
                            <li>Optionally set <strong>max visits</strong> (link deactivates after this many clicks)</li>
                            <li>Optionally set an <strong>expiration date</strong></li>
                            <li>Click <strong>Create</strong></li>
                        </ol>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                            Your short URL: <code className="bg-blue-100 dark:bg-blue-500/20 px-1 rounded">tect0nic.com/go/{'{slug}'}</code>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Link Analytics',
            icon: BarChart3,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Monitor how your short links are performing.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Per-Link Metrics:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Visit count</strong> — Total clicks on this link</li>
                            <li>• <strong>Status</strong> — Active, Protected (has password), or Expired</li>
                            <li>• <strong>Creation date</strong> — When the link was created</li>
                            <li>• <strong>Max visits</strong> — If set, shows remaining visits</li>
                            <li>• <strong>Expiration</strong> — If set, shows expiration date</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Total Stats Row:</div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <div className="text-center p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><strong className="block text-lg text-slate-800 dark:text-white">Total Links</strong>count</div>
                            <div className="text-center p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><strong className="block text-lg text-slate-800 dark:text-white">Active</strong>active count</div>
                            <div className="text-center p-2 bg-slate-100 dark:bg-white/5 rounded-lg"><strong className="block text-lg text-slate-800 dark:text-white">Total Visits</strong>visit sum</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Link Management',
            icon: Settings,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Full control over your short links.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Available Actions:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Copy short URL</strong> — One-click copy to clipboard</li>
                            <li>• <strong>Open in new tab</strong> — Preview the redirect</li>
                            <li>• <strong>Toggle active/inactive</strong> — Pause without deleting</li>
                            <li>• <strong>Edit details</strong> — Change URL, slug, password, limits</li>
                            <li>• <strong>Delete</strong> — Permanently remove the link</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Search & Filter:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Search</strong> — Filter by slug or destination URL</li>
                            <li>• <strong>Filter</strong> — Show all, active only, or inactive only</li>
                            <li>• <strong>Sort</strong> — By creation date, visit count, or slug name</li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 8. SECTION VISIBILITY
    // ══════════════════════════════════════════════════════════════════
    const visibilityItems: DocItem[] = [
        {
            title: 'How Visibility Works',
            icon: Eye,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Control which sections appear on the public site without deleting content. Toggle sections on/off per page.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">33 Sections Across 6 Page Groups:</div>
                        <div className="space-y-2">
                            {[
                                { page: 'Layout', count: 13, desc: 'Header, footer, nav, sidebar elements' },
                                { page: 'Home', count: 7, desc: 'Hero, features, stats, partners, CTA sections' },
                                { page: 'Company', count: 7, desc: 'Mission, values, team, achievements' },
                                { page: 'Portfolio', count: 2, desc: 'Portfolio grid, filters' },
                                { page: 'Wings', count: 2, desc: 'Wings list, wing detail' },
                                { page: 'Contact', count: 2, desc: 'Contact form, map' },
                            ].map((g, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{g.page}</span>
                                    <span className="text-slate-400">{g.count} sections — {g.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <InfoBox type="info" title="State Management">
                        Toggle switches update local state immediately. Changes are not applied to the public site until you click "Save". This lets you make multiple changes before publishing.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Using the Visibility Manager',
            icon: Eye,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Steps:</div>
                        <ol className="space-y-1 text-xs text-slate-500 dark:text-slate-400 list-decimal list-inside">
                            <li>Click <strong>Visibility</strong> in the sidebar</li>
                            <li>Toggle sections on/off using the switch controls</li>
                            <li>Unsaved changes warning appears at the top</li>
                            <li>Click <strong>Save</strong> — cache is cleared automatically</li>
                            <li>Changes are live on the next page load</li>
                        </ol>
                    </div>
                    <InfoBox type="tip" title="Bulk Actions">
                        Use the "All On" / "All Off" buttons per page group to quickly toggle entire groups. Useful for temporarily hiding a page section during updates.
                    </InfoBox>
                    <InfoBox type="warning" title="Cache Clearing">
                        After saving, the content cache is cleared. Users may need to hard refresh (Ctrl+Shift+R) if they were already viewing the site.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 9. SETTINGS
    // ══════════════════════════════════════════════════════════════════
    const settingsItems: DocItem[] = [
        {
            title: 'Personal Settings',
            icon: Users,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage your profile information from <strong>Settings → Personal</strong>.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Available Actions:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Upload Avatar</strong> — Click the camera icon on your avatar. Max 2MB, JPG/PNG/GIF/WebP formats</li>
                            <li>• <strong>Edit Name</strong> — Change your display name</li>
                            <li>• <strong>Edit Email</strong> — Update your login email</li>
                            <li>• <strong>View Role</strong> — Your role (admin/editor/viewer) is read-only here</li>
                        </ul>
                    </div>
                    <InfoBox type="info" title="Avatar Upload">
                        The upload modal accepts images up to 2MB. Images are compressed and stored on the server. Recommended size: 400×400px.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Password & Security',
            icon: Key,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage your password and notification preferences.</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Settings → Password:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• Enter your <strong>current password</strong></li>
                                <li>• Enter a <strong>new password</strong> (min 8 chars)</li>
                                <li>• <strong>Confirm</strong> the new password</li>
                                <li>• Requirements: uppercase + lowercase + number</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Settings → Notifications:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• <strong>Browser Push Notifications</strong> — Enable/disable real-time alerts</li>
                                <li>• <strong>Test Notification</strong> — Send a test push to verify setup</li>
                                <li>• Requires browser permission for notifications</li>
                            </ul>
                        </div>
                    </div>
                    <InfoBox type="warning" title="Strong Passwords">
                        Use a unique password with uppercase, lowercase, and numbers. Never reuse passwords from other sites. Consider using a password manager.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Appearance',
            icon: Palette,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Customize the dashboard theme.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Settings → Appearance:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Toggle Light/Dark Theme</strong> — Switch between light and dark modes</li>
                            <li>• Theme persists across sessions (stored in localStorage)</li>
                            <li>• Also accessible from the sidebar theme toggle (sun/moon icon)</li>
                            <li>• System preference is used as default on first visit</li>
                        </ul>
                    </div>
                    <InfoBox type="tip" title="Theme Persistence">
                        Your theme choice is saved in your browser's localStorage. It will persist across sessions and page refreshes. Switching devices or clearing localStorage resets to system preference.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 10. API REFERENCE
    // ══════════════════════════════════════════════════════════════════
    const apiItems: DocItem[] = [
        {
            title: 'Content API',
            icon: Code,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Access and modify all site content via REST API endpoints.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Endpoints:</div>
                        <div className="space-y-2 font-mono text-xs">
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">GET /api/content/all</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Returns all content types in a single response</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">GET /api/content?type={'{type}'}</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Returns specific content type</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-amber-600 dark:text-amber-400 font-semibold">PUT /api/content?type={'{type}'}</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Updates content (requires Bearer token auth)</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Available Types:</div>
                        <div className="flex flex-wrap gap-1.5">
                            {['wings', 'projects', 'team', 'timeline', 'partnerships', 'techStack', 'roadmap', 'homeContent', 'companyContent', 'portfolioContent', 'contactConfig', 'siteSettings', 'sections', 'industries', 'servicePages', 'companyStats', 'pages', 'certificationGallery'].map((type) => (
                                <span key={type} className="px-2 py-0.5 bg-slate-100 dark:bg-white/5 rounded text-xs font-mono text-slate-600 dark:text-slate-400">{type}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Auth API',
            icon: Lock,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Authentication and user management endpoints.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Endpoints:</div>
                        <div className="space-y-2 font-mono text-xs">
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">POST /api/auth/login</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Body: {'{ email, password }'} → Returns {'{ token, user }'}</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">GET /api/auth/verify</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Header: Authorization: Bearer {'{token}'}</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-emerald-600 dark:text-emerald-400 font-semibold">GET /api/auth/profile</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Returns current user profile</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-amber-600 dark:text-amber-400 font-semibold">PUT /api/auth/profile</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Update name, email</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-amber-600 dark:text-amber-400 font-semibold">POST /api/auth/avatar</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Upload avatar (FormData with file)</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-amber-600 dark:text-amber-400 font-semibold">POST /api/auth/change-password</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Body: {'{ currentPassword, newPassword }'}</div>
                            </div>
                            <div className="p-2 bg-slate-100 dark:bg-white/5 rounded-lg">
                                <div className="text-red-600 dark:text-red-400 font-semibold">GET/POST/PUT/DELETE /api/auth/users</div>
                                <div className="text-slate-500 dark:text-slate-400 mt-1">Admin-only user CRUD operations</div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 11. SECURITY
    // ══════════════════════════════════════════════════════════════════
    const securityItems: DocItem[] = [
        {
            title: 'Authentication System',
            icon: Shield,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Techtonic uses JWT-based authentication with bcrypt password hashing.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Security Details:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>JWT Algorithm</strong> — HS256 (HMAC-SHA256)</li>
                            <li>• <strong>Token Expiry</strong> — 7 days</li>
                            <li>• <strong>Password Hashing</strong> — bcryptjs with cost factor 12</li>
                            <li>• <strong>Token Delivery</strong> — Bearer token in Authorization header</li>
                            <li>• <strong>Middleware Protection</strong> — /dashboard/* and /api/* routes require valid token</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Auth Flow:</div>
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1">
                            <div>1. User submits email + password → POST /api/auth/login</div>
                            <div>2. Server validates credentials → Returns JWT token</div>
                            <div>3. Client stores token in localStorage</div>
                            <div>4. Subsequent requests include: Authorization: Bearer {'{token}'}</div>
                            <div>5. Middleware validates token on protected routes</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Security Best Practices',
            icon: Lock,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Keep your admin panel secure with these practices.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Essential Steps:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Change default password immediately</strong> after first login</li>
                            <li>• <strong>Use a strong JWT_SECRET</strong> — 32+ characters, random, stored in .env</li>
                            <li>• <strong>Never share admin credentials</strong> — use Operatives to add team members</li>
                            <li>• <strong>Review operatives regularly</strong> — remove unused accounts</li>
                            <li>• <strong>Check inquiry statuses</strong> — archive old messages to reduce clutter</li>
                            <li>• <strong>Keep .env secure</strong> — never commit to version control</li>
                        </ul>
                    </div>
                    <InfoBox type="warning" title="JWT_SECRET">
                        Your JWT_SECRET is used to sign all authentication tokens. Use a cryptographically random string of 32+ characters. If compromised, all active sessions are at risk. Never use a short or predictable secret.
                    </InfoBox>
                </div>
            ),
        },
    ];

    // ══════════════════════════════════════════════════════════════════
    // 12. FAQ & TROUBLESHOOTING
    // ══════════════════════════════════════════════════════════════════
    const faqItems: DocItem[] = [
        {
            title: 'Changes Not Showing?',
            icon: AlertTriangle,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>If you edited content but don't see changes on the live site, check these common causes:</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">1. Check Section Visibility</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Go to <strong>Visibility</strong> tab. The section might be toggled off. Toggle it on and save.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">2. ContentContext Cache (60s)</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">ContentContext caches API responses for 60 seconds. Wait or refresh the page to see changes.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">3. pSEO ISR Revalidation (1 hour)</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">pSEO pages revalidate every hour via ISR. Changes appear within 60 minutes. Force rebuild with <code className="bg-slate-100 dark:bg-white/10 px-1 rounded">bun run build</code> + redeploy.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">4. Browser Cache</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Hard refresh: <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">Ctrl+Shift+R</kbd> (Windows) or <kbd className="px-1 py-0.5 bg-slate-100 dark:bg-white/10 rounded text-xs">Cmd+Shift+R</kbd> (Mac).</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Image Upload Issues',
            icon: AlertCircle,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Having trouble with images? Here's what you need to know.</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Upload Limits:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• <strong>Certification Gallery</strong> — Max 2MB, JPG/PNG/GIF/WebP</li>
                                <li>• <strong>Avatar Upload</strong> — Max 2MB, JPG/PNG/GIF/WebP</li>
                                <li>• <strong>All Other Content</strong> — Use image URLs (team, projects, partners, etc.)</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Supported Image Hosts:</div>
                            <div className="grid grid-cols-2 gap-1 text-xs text-slate-500 dark:text-slate-400">
                                <div>• Cloudinary</div>
                                <div>• Unsplash</div>
                                <div>• Freepik</div>
                                <div>• Behance</div>
                                <div>• Any HTTPS URL</div>
                                <div>• Self-hosted</div>
                            </div>
                        </div>
                    </div>
                    <InfoBox type="tip" title="Image Optimization">
                        Keep images under 500KB for fast loading. Use WebP format for 25-34% smaller file sizes. Use next/image for automatic optimization.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Database Connection Errors',
            icon: HardDrive,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>If you see database errors, check these common issues.</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Common Causes:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• <strong>Invalid DATABASE_URL</strong> — Check your .env file has the correct connection string</li>
                                <li>• <strong>Neon free tier pause</strong> — Neon pauses databases after inactivity. Visit the Neon dashboard to wake it</li>
                                <li>• <strong>Connection pooling</strong> — Check Prisma connection pool settings in your schema</li>
                                <li>• <strong>Network issues</strong> — Verify your hosting platform can reach Neon</li>
                            </ul>
                        </div>
                    </div>
                    <InfoBox type="warning" title="Neon Free Tier">
                        Neon's free tier pauses the database after ~5 minutes of inactivity. First request after pause may take 1-5 seconds while the database wakes up. Visit the Neon dashboard to manually wake the database.
                    </InfoBox>
                </div>
            ),
        },
        {
            title: 'Performance Tips',
            icon: Zap,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Optimize your site's performance with these best practices.</p>
                    <div className="space-y-2">
                        {[
                            { title: 'Use next/image', desc: 'Automatic optimization, lazy loading, and responsive sizing. Replace standard <img> tags where possible.' },
                            { title: 'Optimize Image Sizes', desc: 'Keep images under 500KB. Use WebP format for 25-34% smaller files without quality loss.' },
                            { title: 'Leverage ContentContext Caching', desc: 'ContentContext prevents redundant API refetches. Content is cached for 60 seconds — design components to use the context.' },
                            { title: 'ISR for Static Pages', desc: 'pSEO pages cache for 1 hour via ISR. This means fast load times (static HTML) with automatic content refresh.' },
                            { title: 'Force-Dynamic Pages', desc: 'Pages like /company, /wings always fetch fresh data. No caching overhead but slightly slower load times.' },
                        ].map((tip, i) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                                <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1 text-xs">{tip.title}</div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{tip.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    // ─── Section Items Map ──────────────────────────────────────────────
    const sectionItems: Record<DocSection, DocItem[]> = {
        overview: overviewItems,
        quickstart: quickstartItems,
        seo: seoItems,
        pseo: pseoItems,
        content: contentItems,
        dashboard: dashboardItems,
        linkcenter: linkcenterItems,
        visibility: visibilityItems,
        settings: settingsItems,
        api: apiItems,
        security: securityItems,
        faq: faqItems,
    };

    const currentItems = sectionItems[activeSection] || [];

    // ─── Search Filter ──────────────────────────────────────────────────
    const filteredItems = searchQuery
        ? currentItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : currentItems;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Documentation & Guides</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Comprehensive guide to every feature of the Techtonic admin panel</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ─── Left Sidebar Navigation ────────────────────────────── */}
                <div className="lg:w-60 flex-shrink-0">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-2 lg:sticky lg:top-4 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin">
                        {Object.entries(groupedSections).map(([group, groupSections]) => (
                            <div key={group} className="mb-3 last:mb-0">
                                <div className="px-3 mb-1.5">
                                    <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-slate-400 dark:text-slate-600">
                                        {group}
                                    </span>
                                </div>
                                <div className="space-y-0.5">
                                    {groupSections.map((sec) => {
                                        const Icon = sec.icon;
                                        const isActive = activeSection === sec.id;
                                        return (
                                            <button
                                                key={sec.id}
                                                onClick={() => { setActiveSection(sec.id); setExpandedItem(null); setSearchQuery(''); }}
                                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                                    isActive
                                                        ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-500/20'
                                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                                                }`}
                                            >
                                                <Icon size={15} />
                                                <span className="truncate">{sec.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Main Content Area ────────────────────────────────────── */}
                <div className="flex-1 min-w-0 space-y-3">
                    {/* Search Bar */}
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:focus:ring-brand-500/20 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                >
                                    ×
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Section Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2"
                        >
                            {filteredItems.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                                    <Search size={24} className="mx-auto mb-3 opacity-50" />
                                    <p className="text-sm">No matching documentation found</p>
                                </div>
                            ) : (
                                filteredItems.map((item, i) => {
                                    const Icon = item.icon;
                                    const id = `${activeSection}-${i}`;
                                    const isExpanded = expandedItem === id;
                                    return (
                                        <div key={id} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                                            <button
                                                onClick={() => toggleItem(id)}
                                                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                                            >
                                                <div className="p-1.5 rounded-xl bg-brand-50 dark:bg-brand-500/10">
                                                    <Icon size={16} className="text-brand-500" />
                                                </div>
                                                <span className="flex-1 text-left text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                    {item.title}
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    <ChevronRight size={16} className="text-slate-400" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 pb-4 pt-1 border-t border-slate-100 dark:border-white/5">
                                                            {item.content}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default DocsPanel;
