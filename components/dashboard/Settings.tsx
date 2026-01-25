import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette, Shield, Download, AlertTriangle, Settings as SettingsIcon, MapPin, Globe, Save, Camera, Key, Trash2, Plus, Moon, Sun, Monitor } from 'lucide-react';
import { useContent } from '../ContentContext';
import { useTheme } from '../ThemeContext';
import * as LucideIcons from 'lucide-react';

const Settings = () => {
    const { siteSettings, setSiteSettings, contactConfig, setContactConfig } = useContent();
    const { theme, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState('site');
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@techtonic.com',
        role: 'System Administrator',
        avatar: 'AU'
    });

    const [localSiteSettings, setLocalSiteSettings] = useState(siteSettings);
    const [localContactConfig, setLocalContactConfig] = useState<any>(contactConfig);
    // using any for contactConfig temporarily to handle dynamic socials transition

    useEffect(() => {
        setLocalSiteSettings(siteSettings);
    }, [siteSettings]);

    useEffect(() => {
        setLocalContactConfig(contactConfig);
    }, [contactConfig]);

    const handleSaveSiteSettings = () => {
        setSiteSettings(localSiteSettings);
        setContactConfig(localContactConfig);
        alert('Site settings and contact info updated successfully!');
    };

    // Social Media Handlers
    const [newSocial, setNewSocial] = useState({ platform: '', url: '', icon: 'Globe' });

    // Convert Record to Array for editing
    const socialArray = Object.entries(localContactConfig.socials || {}).map(([key, value]) => ({
        platform: key,
        url: value as string,
        icon: key // Approximating icon from key for legacy data
    }));

    const handleAddSocial = () => {
        if (!newSocial.platform || !newSocial.url) return;
        const updatedSocials = { ...localContactConfig.socials, [newSocial.platform]: newSocial.url };
        setLocalContactConfig({ ...localContactConfig, socials: updatedSocials });
        setNewSocial({ platform: '', url: '', icon: 'Globe' });
    };

    const handleDeleteSocial = (platform: string) => {
        const updated = { ...localContactConfig.socials };
        delete updated[platform];
        setLocalContactConfig({ ...localContactConfig, socials: updated });
    };

    const tabs = [
        { id: 'site', label: 'Site Settings', icon: SettingsIcon },
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'password', label: 'Password', icon: Key },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200 dark:border-white/10 pb-1">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${activeTab === tab.id
                                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-b-2 border-cyan-500'
                                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'}`}
                        >
                            <Icon size={16} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'site' && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Site Info */}
                        <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Site Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">SITE NAME</label>
                                    <input
                                        value={localSiteSettings.siteName}
                                        onChange={e => setLocalSiteSettings({ ...localSiteSettings, siteName: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">TAGLINE</label>
                                    <input
                                        value={localSiteSettings.siteTagline}
                                        onChange={e => setLocalSiteSettings({ ...localSiteSettings, siteTagline: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">FOOTER COPYRIGHT</label>
                                    <input
                                        value={(localSiteSettings as any).footerCopyright || ''}
                                        onChange={e => setLocalSiteSettings({ ...localSiteSettings, footerCopyright: e.target.value } as any)}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <MapPin size={20} className="text-cyan-500" /> Contact Details
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">EMAIL</label>
                                    <input
                                        value={localContactConfig.contact?.email}
                                        onChange={e => setLocalContactConfig({ ...localContactConfig, contact: { ...localContactConfig.contact, email: e.target.value } })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">PHONE</label>
                                    <input
                                        value={localContactConfig.contact?.phone}
                                        onChange={e => setLocalContactConfig({ ...localContactConfig, contact: { ...localContactConfig.contact, phone: e.target.value } })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-mono text-slate-500 mb-1">STREET ADDRESS</label>
                                    <input
                                        value={localContactConfig.address?.street}
                                        onChange={e => setLocalContactConfig({
                                            ...localContactConfig,
                                            address: { ...localContactConfig.address, street: e.target.value }
                                        })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 mb-1">CITY / SECTOR</label>
                                    <input
                                        value={localContactConfig.address?.sector}
                                        onChange={e => setLocalContactConfig({
                                            ...localContactConfig,
                                            address: { ...localContactConfig.address, sector: e.target.value }
                                        })}
                                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Socials */}
                        <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-slate-200 dark:border-white/10">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Globe size={20} className="text-cyan-500" /> Social Media
                            </h3>

                            <div className="flex gap-2 mb-4">
                                <input
                                    placeholder="Platform (e.g. LinkedIn)"
                                    value={newSocial.platform}
                                    onChange={e => setNewSocial({ ...newSocial, platform: e.target.value })}
                                    className="flex-1 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-sm text-slate-900 dark:text-white"
                                />
                                <input
                                    placeholder="URL"
                                    value={newSocial.url}
                                    onChange={e => setNewSocial({ ...newSocial, url: e.target.value })}
                                    className="flex-[2] bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded px-3 py-2 text-sm text-slate-900 dark:text-white"
                                />
                                <button
                                    onClick={handleAddSocial}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {socialArray.map((social) => (
                                    <div key={social.platform} className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-3 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold">
                                                {social.platform.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">{social.platform}</p>
                                                <p className="text-xs text-slate-500 truncate max-w-[200px]">{social.url}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteSocial(social.platform)}
                                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {socialArray.length === 0 && (
                                    <p className="text-sm text-slate-500 text-center py-4">No social links added yet.</p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleSaveSiteSettings}
                                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                            >
                                <Save size={18} /> Save All Changes
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Other tabs omitted for brevity but would be here */}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
