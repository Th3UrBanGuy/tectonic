"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Search, Globe, FileText, Database, Users, BarChart3,
    Settings, Link2, Award, Clock, ChevronDown, ChevronRight,
    Lightbulb, AlertTriangle, CheckCircle, ExternalLink, Sparkles,
    Eye, Hash, Layers, MessageSquare, Mail, Shield, Plus
} from 'lucide-react';

type DocSection = 'overview' | 'seo' | 'pseo' | 'content' | 'dashboard' | 'settings' | 'faq';

interface DocItem {
    title: string;
    icon: React.ElementType;
    content: React.ReactNode;
}

const DocsPanel: React.FC = () => {
    const [activeSection, setActiveSection] = useState<DocSection>('overview');
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    const toggleItem = (id: string) => {
        setExpandedItem(expandedItem === id ? null : id);
    };

    const sections: { id: DocSection; label: string; icon: React.ElementType }[] = [
        { id: 'overview', label: 'Overview', icon: BookOpen },
        { id: 'seo', label: 'SEO Guide', icon: Search },
        { id: 'pseo', label: 'pSEO Pages', icon: Globe },
        { id: 'content', label: 'Content Management', icon: Database },
        { id: 'dashboard', label: 'Dashboard Features', icon: Layers },
        { id: 'settings', label: 'Settings & Config', icon: Settings },
        { id: 'faq', label: 'FAQ & Tips', icon: Lightbulb },
    ];

    // ─── OVERVIEW ───────────────────────────────────────────────────
    const overviewItems: DocItem[] = [
        {
            title: 'Welcome to Techtonic Admin',
            icon: Sparkles,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The Techtonic admin panel gives you full control over your website content, SEO, and analytics. This guide will walk you through every feature.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                            <div className="font-semibold text-brand-700 dark:text-brand-300 mb-1">13 Admin Tabs</div>
                            <div className="text-xs text-brand-600 dark:text-brand-400">Full control over every aspect of your site</div>
                        </div>
                        <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20">
                            <div className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">56+ Pages</div>
                            <div className="text-xs text-cyan-600 dark:text-cyan-400">Including 37 pSEO landing pages</div>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                            <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Real-time SEO</div>
                            <div className="text-xs text-emerald-600 dark:text-emerald-400">Monitor and optimize search visibility</div>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20">
                            <div className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Instant Updates</div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">Changes reflect within 1 hour (ISR)</div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Quick Start Checklist',
            icon: CheckCircle,
            content: (
                <div className="space-y-2 text-sm">
                    {[
                        { step: 'Set up site settings', desc: 'Go to Settings tab → configure site name, tagline, contact info', done: true },
                        { step: 'Add team members', desc: 'Go to Operatives tab → add team member profiles', done: true },
                        { step: 'Create projects', desc: 'Go to Content → Portfolio → add your projects with images', done: true },
                        { step: 'Configure industries', desc: 'Go to Industries tab → edit industry names and descriptions', done: false },
                        { step: 'Set SEO metadata', desc: 'Go to SEO Pages tab → add meta titles and descriptions', done: false },
                        { step: 'Review pSEO pages', desc: 'Go to Industries → Service Pages → customize generated content', done: false },
                        { step: 'Check SEO score', desc: 'Go to SEO Dashboard → review overall SEO health', done: false },
                    ].map((item, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${item.done ? 'bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20' : 'bg-slate-50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10'}`}>
                            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-400'}`}>
                                {item.done ? <CheckCircle size={12} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                            </div>
                            <div>
                                <div className="font-medium text-slate-800 dark:text-slate-200">{item.step}</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    // ─── SEO GUIDE ──────────────────────────────────────────────────
    const seoItems: DocItem[] = [
        {
            title: 'How SEO Works on This Site',
            icon: Search,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Every page on your site has unique SEO metadata that search engines use to understand and rank your content.</p>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">What Gets Generated Automatically:</div>
                        <ul className="space-y-1 text-xs text-blue-600 dark:text-blue-400">
                            <li>• <strong>Sitemap.xml</strong> — Auto-generated with all pages (home, company, wings, portfolio, pSEO pages)</li>
                            <li>• <strong>Page titles</strong> — Uses template: "Page Name | Techtonic"</li>
                            <li>• <strong>OG/Twitter images</strong> — Fallback images for social sharing</li>
                            <li>• <strong>JSON-LD schemas</strong> — Organization, WebSite, BreadcrumbList, Service</li>
                            <li>• <strong>Canonical URLs</strong> — Prevents duplicate content issues</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                        <div className="font-semibold text-amber-700 dark:text-amber-300 mb-1">What You Need to Configure:</div>
                        <ul className="space-y-1 text-xs text-amber-600 dark:text-amber-400">
                            <li>• Meta titles for each page (30-60 characters)</li>
                            <li>• Meta descriptions for each page (120-160 characters)</li>
                            <li>• Hero content for each page</li>
                            <li>• pSEO page content (industries + services)</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Meta Titles & Descriptions',
            icon: FileText,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>SEO Pages</strong> tab to edit meta information for every page.</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Meta Title Best Practices:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• Keep it 30-60 characters</li>
                                <li>• Put most important words first</li>
                                <li>• Include your brand: "Page Name | Techtonic"</li>
                                <li>• Make it unique for every page</li>
                                <li>• Example: "Custom Software Development | Techtonic"</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Meta Description Best Practices:</div>
                            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                                <li>• Keep it 120-160 characters</li>
                                <li>• Write a compelling summary of the page</li>
                                <li>• Include a call-to-action</li>
                                <li>• Use natural language (not keyword stuffing)</li>
                                <li>• Example: "Build scalable web applications with Techtonic. Expert full-stack development for startups and enterprises."</li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle size={14} className="text-amber-500" />
                            <span className="font-semibold text-amber-700 dark:text-amber-300">Warning:</span>
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400">If you leave meta fields empty, search engines will auto-generate snippets from your page content. Always fill them in for best results.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Structured Data (JSON-LD)',
            icon: Hash,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Structured data helps search engines understand your content better and can enable rich snippets in search results.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Schemas Active on Your Site:</div>
                        <div className="space-y-2">
                            {[
                                { schema: 'Organization', where: 'Every page (root layout)', what: 'Company name, logo, social profiles' },
                                { schema: 'WebSite', where: 'Homepage only', what: 'Site name, search action' },
                                { schema: 'BreadcrumbList', where: 'Portfolio + pSEO pages', what: 'Navigation breadcrumbs' },
                                { schema: 'Service', where: 'Service landing pages', what: 'Service details, pricing, provider' },
                                { schema: 'Article', where: 'Individual project pages', what: 'Project details, author, date' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs">
                                    <span className="font-mono bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400">{s.schema}</span>
                                    <span className="text-slate-400">→</span>
                                    <span className="text-slate-500 dark:text-slate-400">{s.where}: {s.what}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'SEO Dashboard',
            icon: Eye,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The <strong>SEO Dashboard</strong> tab gives you a real-time overview of your site's SEO health.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">What It Shows:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Sitemap URL count</strong> — How many pages are in your sitemap</li>
                            <li>• <strong>SEO Score</strong> — Overall score based on meta tag completeness</li>
                            <li>• <strong>Page-by-page status</strong> — Which pages have meta titles/descriptions</li>
                            <li>• <strong>Character counts</strong> — Warnings for titles {'>'} 60 chars or descriptions {'>'} 160 chars</li>
                            <li>• <strong>Score breakdown</strong> — 100% = fully optimized, 50% = partial, 0% = missing</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Target: 100% SEO Score</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Every page should have a meta title (30-60 chars) and meta description (120-160 chars). Use the SEO Pages tab to fix any missing data.</p>
                    </div>
                </div>
            ),
        },
    ];

    // ─── PSEO GUIDE ─────────────────────────────────────────────────
    const pseoItems: DocItem[] = [
        {
            title: 'What is pSEO?',
            icon: Globe,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p><strong>Programmatic SEO (pSEO)</strong> automatically generates landing pages for every combination of your services and industries. Instead of manually creating 64+ pages, the system generates them from data.</p>
                    <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20">
                        <div className="font-semibold text-brand-700 dark:text-brand-300 mb-2">Your pSEO Structure:</div>
                        <div className="text-xs text-brand-600 dark:text-brand-400 space-y-1">
                            <p><strong>8 Industries</strong> × <strong>8 Services</strong> = <strong>64 landing pages</strong></p>
                            <p>Each page has unique meta tags, hero content, features, and tech stack.</p>
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
                </div>
            ),
        },
        {
            title: 'Managing Industries',
            icon: Globe,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>Industries</strong> tab to manage your industry categories.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Industry Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Name</strong> — Display name (e.g., "Finance")</li>
                            <li>• <strong>Slug</strong> — URL part (e.g., "finance") — appears in /finance/</li>
                            <li>• <strong>Description</strong> — Short industry description</li>
                            <li>• <strong>Meta Title</strong> — SEO title for the industry index page</li>
                            <li>• <strong>Meta Description</strong> — SEO description for the industry index page</li>
                            <li>• <strong>Icon</strong> — Lucide icon name displayed on the page</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle size={14} className="text-amber-500" />
                            <span className="font-semibold text-amber-700 dark:text-amber-300">Important:</span>
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400">Changing a slug changes the URL. Old URLs will 404. Only change slugs before launch or with redirects.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Managing Service Pages',
            icon: FileText,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Go to <strong>Industries</strong> tab → <strong>Service Pages</strong> section to manage pSEO landing pages.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Service Page Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Industry + Service</strong> — Which combination this page covers</li>
                            <li>• <strong>Title</strong> — Page heading</li>
                            <li>• <strong>Meta Title/Description</strong> — SEO metadata</li>
                            <li>• <strong>Hero Title/Subtitle/Description</strong> — Landing page hero section</li>
                            <li>• <strong>Features</strong> — List of service features</li>
                            <li>• <strong>Tech Stack</strong> — Technologies used</li>
                            <li>• <strong>CTA Text/Link</strong> — Call-to-action button</li>
                            <li>• <strong>Active toggle</strong> — Enable/disable the page</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Auto-Generate Missing Pages</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">Click "Auto-Generate Missing" to create stub pages for any industry×service combinations that don't exist yet. Then edit the content.</p>
                    </div>
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
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Do:</div>
                            <ul className="space-y-1 text-xs text-emerald-600 dark:text-emerald-400">
                                <li>✓ Write unique hero descriptions per industry</li>
                                <li>✓ List industry-specific features and benefits</li>
                                <li>✓ Use relevant tech stack for each industry</li>
                                <li>✓ Include case studies or examples when possible</li>
                                <li>✓ Make meta descriptions compelling and unique</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Don't:</div>
                            <ul className="space-y-1 text-xs text-red-600 dark:text-red-400">
                                <li>✗ Copy-paste the same content across pages</li>
                                <li>✗ Stuff keywords unnaturally</li>
                                <li>✗ Leave hero descriptions empty</li>
                                <li>✗ Use the same meta title for multiple pages</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    // ─── CONTENT MANAGEMENT ──────────────────────────────────────────
    const contentItems: DocItem[] = [
        {
            title: 'Content Tab Overview',
            icon: Database,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The <strong>Content</strong> tab has 9 sub-tabs for managing different content types:</p>
                    <div className="space-y-1.5">
                        {[
                            { tab: 'Innovation', desc: 'Tech stack and roadmap items', icon: Sparkles },
                            { tab: 'Portfolio', desc: 'Project cards and categories', icon: FileText },
                            { tab: 'Wings', desc: 'Team wings (departments/divisions)', icon: Layers },
                            { tab: 'Team', desc: 'Team member profiles', icon: Users },
                            { tab: 'Pages & Hero', desc: 'Home and company page hero content', icon: Settings },
                            { tab: 'Partners', desc: 'Partner logos and names', icon: Award },
                            { tab: 'Portfolio Content', desc: 'Portfolio page header and filters', icon: FileText },
                            { tab: 'Home Content', desc: 'Full home page content editor', icon: Settings },
                            { tab: 'Company Content', desc: 'Company page stats, mission, achievements', icon: Shield },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                                <item.icon size={14} className="text-brand-500 flex-shrink-0" />
                                <span className="font-medium text-slate-800 dark:text-slate-200 w-28">{item.tab}</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'Wings Manager',
            icon: Layers,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Wings are your company's divisions or departments. Each wing has its own team, tech stack, and features.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Wing Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Name & Tagline</strong> — Wing identity</li>
                            <li>• <strong>Description</strong> — What this wing does</li>
                            <li>• <strong>Icon & Color</strong> — Visual representation</li>
                            <li>• <strong>Tech Stack</strong> — Technologies used</li>
                            <li>• <strong>Features</strong> — Key capabilities</li>
                            <li>• <strong>Team Info</strong> — Team name, logo, subtitle, purpose</li>
                            <li>• <strong>Timeline</strong> — Team milestones</li>
                            <li>• <strong>Achievements</strong> — Team accomplishments</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Project Portfolio',
            icon: FileText,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage your portfolio projects that appear on the portfolio page.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Project Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Title</strong> — Project name</li>
                            <li>• <strong>Category</strong> — Software, Security, Robotics, or Consultancy</li>
                            <li>• <strong>Description</strong> — Project summary</li>
                            <li>• <strong>Image</strong> — Project screenshot/thumbnail</li>
                            <li>• <strong>Tags</strong> — Technology tags</li>
                            <li>• <strong>Links</strong> — Live demo and GitHub repo URLs</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Image URLs</div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Use direct image URLs (ending in .jpg, .png, .webp). Supported hosts: Cloudinary, Unsplash, Freepik, Behance, and more.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Team Members',
            icon: Users,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Manage team member profiles displayed on the company page.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Member Has:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Name & Role</strong> — Display identity</li>
                            <li>• <strong>Bio</strong> — Short biography</li>
                            <li>• <strong>Skills</strong> — Technical skills list</li>
                            <li>• <strong>Social Links</strong> — GitHub, LinkedIn, Twitter, etc.</li>
                            <li>• <strong>Avatar</strong> — Profile image URL</li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    // ─── DASHBOARD FEATURES ──────────────────────────────────────────
    const dashboardItems: DocItem[] = [
        {
            title: 'All Dashboard Tabs',
            icon: Layers,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="space-y-2">
                        {[
                            { tab: 'Overview', icon: BarChart3, desc: 'Quick stats and recent activity summary' },
                            { tab: 'Messages', icon: MessageSquare, desc: 'Internal chat system with team members' },
                            { tab: 'Operatives', icon: Users, desc: 'Manage team member profiles and roles' },
                            { tab: 'Inquiries', icon: Mail, desc: 'View and manage contact form submissions' },
                            { tab: 'Content', icon: Database, desc: '9 sub-tabs for all content types' },
                            { tab: 'Industries', icon: Globe, desc: 'Manage pSEO industries and service pages' },
                            { tab: 'Stats', icon: BarChart3, desc: 'Company metrics displayed on company page' },
                            { tab: 'Certs', icon: Award, desc: 'Certifications and credentials' },
                            { tab: 'Timeline', icon: Clock, desc: 'Company milestones and history' },
                            { tab: 'SEO Pages', icon: FileText, desc: 'Edit meta titles/descriptions per page' },
                            { tab: 'SEO Dashboard', icon: Search, desc: 'SEO health monitoring and scoring' },
                            { tab: 'Link Center', icon: Link2, desc: 'Create and manage shortened URLs' },
                            { tab: 'Settings', icon: Settings, desc: 'Site name, tagline, contact info' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                                <div className="p-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/10">
                                    <item.icon size={14} className="text-brand-500" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-800 dark:text-slate-200">{item.tab}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: 'Link Center',
            icon: Link2,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Create short, branded URLs for sharing. Useful for social media, emails, and marketing.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">How It Works:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>1. Enter the original URL you want to shorten</li>
                            <li>2. Choose a custom alias (optional)</li>
                            <li>3. The short URL is created: tect0nic.com/go/[alias]</li>
                            <li>4. Share the short URL — it redirects to the original</li>
                            <li>5. Track clicks in the Link Center dashboard</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Inquiries (Contact Submissions)',
            icon: Mail,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>View messages submitted through your contact form.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Each Inquiry Shows:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• Contact name and email</li>
                            <li>• Subject and message content</li>
                            <li>• Submission timestamp</li>
                            <li>• Read/unread status</li>
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    // ─── SETTINGS ────────────────────────────────────────────────────
    const settingsItems: DocItem[] = [
        {
            title: 'Site Settings',
            icon: Settings,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Configure global site settings from the <strong>Settings</strong> tab.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Available Settings:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• <strong>Site Name</strong> — Displayed in header and browser tab</li>
                            <li>• <strong>Site Tagline</strong> — Subtitle shown under the name</li>
                            <li>• <strong>Contact Email</strong> — Business contact email</li>
                            <li>• <strong>Contact Phone</strong> — Business phone number</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <div className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Note:</div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Some settings are also editable through the Content tab's "Pages & Hero" sub-tab for more granular control.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'Environment Variables',
            icon: Shield,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>Key environment variables configured in <code className="bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">.env</code>:</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 font-mono text-xs space-y-2">
                        <div>
                            <span className="text-slate-400">DATABASE_URL=</span>
                            <span className="text-slate-600 dark:text-slate-300">PostgreSQL connection (Neon)</span>
                        </div>
                        <div>
                            <span className="text-slate-400">JWT_SECRET=</span>
                            <span className="text-slate-600 dark:text-slate-300">Authentication secret key</span>
                        </div>
                        <div>
                            <span className="text-slate-400">CONTACT_EMAIL=</span>
                            <span className="text-slate-600 dark:text-slate-300">Contact form recipient</span>
                        </div>
                        <div>
                            <span className="text-slate-400">NEXT_PUBLIC_SITE_URL=</span>
                            <span className="text-slate-600 dark:text-slate-300">https://tect0nic.com</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'ISR (Incremental Static Regeneration)',
            icon: Clock,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>pSEO pages use ISR to balance performance and freshness.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">How ISR Works:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>• Pages are pre-built at build time (static HTML)</li>
                            <li>• After 1 hour (<code className="bg-slate-100 dark:bg-white/5 px-1 rounded">revalidate: 3600</code>), pages rebuild in the background</li>
                            <li>• Users always see the cached version while rebuild happens</li>
                            <li>• Content changes appear within 1 hour automatically</li>
                            <li>• No server restart needed — just edit and save</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Tip:</div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">After making major pSEO content changes, you can force a rebuild by running <code className="bg-emerald-100 dark:bg-emerald-500/20 px-1 rounded">bun run build</code> and redeploying.</p>
                    </div>
                </div>
            ),
        },
    ];

    // ─── FAQ ──────────────────────────────────────────────────────────
    const faqItems: DocItem[] = [
        {
            title: 'Why are my changes not showing?',
            icon: AlertTriangle,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>If you edited content but don't see changes on the live site:</p>
                    <ul className="space-y-1 text-xs">
                        <li>• <strong>pSEO pages</strong> — Wait up to 1 hour (ISR revalidation). Or rebuild and redeploy.</li>
                        <li>• <strong>Home/Company content</strong> — Changes are instant (client-side). Hard refresh if needed.</li>
                        <li>• <strong>Projects/Team/Wings</strong> — Changes are instant (client-side context).</li>
                        <li>• <strong>SEO metadata</strong> — Requires page rebuild (ISR). Wait or rebuild.</li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'How do I add a new page to the site?',
            icon: Plus,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>There are two ways to add pages:</p>
                    <div className="space-y-2">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Static Pages (developer needed)</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Create a new <code className="bg-slate-100 dark:bg-white/5 px-1 rounded">page.tsx</code> file in <code className="bg-slate-100 dark:bg-white/5 px-1 rounded">src/app/[route]/</code>. Add metadata export and JSON-LD schema.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                            <div className="font-semibold text-slate-800 dark:text-slate-200 mb-1">pSEO Pages (admin panel)</div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Go to Industries tab → add new industry or service page. The system auto-generates the URL and SEO metadata.</p>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'What image hosts are supported?',
            icon: ExternalLink,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>For project images and team avatars, these hosts are configured:</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                            <div>• fiverr-res.cloudinary.com</div>
                            <div>• techostudios.com</div>
                            <div>• images.unsplash.com</div>
                            <div>• via.placeholder.com</div>
                            <div>• ui-avatars.com</div>
                            <div>• smashresume.com</div>
                            <div>• img.freepik.com</div>
                            <div>• miro.medium.com</div>
                            <div>• mir-s3-cdn-cf.behance.net</div>
                            <div>• static.vecteezy.com</div>
                        </div>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                        <p className="text-xs text-blue-600 dark:text-blue-400">Need a different host? Add it to <code className="bg-blue-100 dark:bg-blue-500/20 px-1 rounded">next.config.ts</code> → <code className="bg-blue-100 dark:bg-blue-500/20 px-1 rounded">images.remotePatterns</code>.</p>
                    </div>
                </div>
            ),
        },
        {
            title: 'How to use the content export/import?',
            icon: Database,
            content: (
                <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <p>The Content tab has export/import buttons for backup and migration.</p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
                        <div className="font-semibold text-slate-800 dark:text-slate-200 mb-2">How to Use:</div>
                        <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                            <li>1. <strong>Export</strong> — Downloads all content as JSON file</li>
                            <li>2. <strong>Import</strong> — Upload a JSON file to restore content</li>
                            <li>3. <strong>Reset</strong> — Restores all content to default values</li>
                        </ul>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle size={14} className="text-amber-500" />
                            <span className="font-semibold text-amber-700 dark:text-amber-300">Caution:</span>
                        </div>
                        <p className="text-xs text-amber-600 dark:text-amber-400">Import overwrites ALL existing content. Export a backup first. Reset cannot be undone.</p>
                    </div>
                </div>
            ),
        },
    ];

    const sectionItems: Record<DocSection, DocItem[]> = {
        overview: overviewItems,
        seo: seoItems,
        pseo: pseoItems,
        content: contentItems,
        dashboard: dashboardItems,
        settings: settingsItems,
        faq: faqItems,
    };

    const currentItems = sectionItems[activeSection] || [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Documentation & Guides</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Learn how to use every feature of the admin panel</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Section Nav */}
                <div className="lg:w-56 flex-shrink-0">
                    <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-2 space-y-0.5 lg:sticky lg:top-4">
                        {sections.map((sec) => {
                            const Icon = sec.icon;
                            const isActive = activeSection === sec.id;
                            return (
                                <button
                                    key={sec.id}
                                    onClick={() => { setActiveSection(sec.id); setExpandedItem(null); }}
                                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 border border-brand-200/50 dark:border-brand-500/20'
                                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span>{sec.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.15 }}
                            className="space-y-2"
                        >
                            {currentItems.map((item, i) => {
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
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default DocsPanel;
