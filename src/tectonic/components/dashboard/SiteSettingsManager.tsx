"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe, MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Instagram, Github, Settings as SettingsIcon } from 'lucide-react';
import { useContent } from '../ContentContext';

const SiteSettingsManager: React.FC = () => {
    const { siteSettings, setSiteSettings, contactConfig, setContactConfig } = useContent();
    const [localSiteSettings, setLocalSiteSettings] = useState(siteSettings);
    const [localContactConfig, setLocalContactConfig] = useState(contactConfig);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setLocalSiteSettings(siteSettings);
    }, [siteSettings]);

    useEffect(() => {
        setLocalContactConfig(contactConfig);
    }, [contactConfig]);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            setSiteSettings(localSiteSettings);
            setContactConfig(localContactConfig);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Site Information */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <SettingsIcon size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Site Information</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">SITE NAME</label>
                        <input
                            type="text"
                            value={localSiteSettings.siteName}
                            onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, siteName: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">TAGLINE</label>
                        <input
                            type="text"
                            value={localSiteSettings.siteTagline}
                            onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, siteTagline: e.target.value })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <MapPin size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Contact Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">STREET ADDRESS</label>
                        <input
                            type="text"
                            value={localContactConfig.address?.street || ''}
                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, address: { ...localContactConfig.address, street: e.target.value } })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">SECTOR / CITY</label>
                        <input
                            type="text"
                            value={localContactConfig.address?.sector || ''}
                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, address: { ...localContactConfig.address, sector: e.target.value } })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">COORDINATES</label>
                        <input
                            type="text"
                            value={localContactConfig.address?.coordinates || ''}
                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, address: { ...localContactConfig.address, coordinates: e.target.value } })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">EMAIL</label>
                        <input
                            type="email"
                            value={localContactConfig.contact?.email || ''}
                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, contact: { ...localContactConfig.contact, email: e.target.value } })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">PHONE</label>
                        <input
                            type="text"
                            value={localContactConfig.contact?.phone || ''}
                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, contact: { ...localContactConfig.contact, phone: e.target.value } })}
                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <Globe size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Social Media Links</h3>
                </div>
                <div className="space-y-3">
                    {[
                        { key: 'linkedin', icon: Linkedin, placeholder: 'LinkedIn URL' },
                        { key: 'facebook', icon: Facebook, placeholder: 'Facebook URL' },
                        { key: 'instagram', icon: Instagram, placeholder: 'Instagram URL' },
                        { key: 'twitter', icon: Twitter, placeholder: 'Twitter (X) URL' },
                        { key: 'github', icon: Github, placeholder: 'GitHub URL' },
                    ].map(({ key, icon: Icon, placeholder }) => (
                        <div key={key} className="flex gap-3 items-center">
                            <Icon size={18} className="text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder={placeholder}
                                value={(localContactConfig.socials as any)?.[key] || ''}
                                onChange={(e) => setLocalContactConfig({
                                    ...localContactConfig,
                                    socials: { ...localContactConfig.socials, [key]: e.target.value }
                                })}
                                className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none transition-colors"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Site Options */}
            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-5">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        <SettingsIcon size={14} />
                    </div>
                    <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Site Options</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-900 dark:text-white font-medium">Maintenance Mode</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Temporarily disable public access</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={localSiteSettings.maintenanceMode}
                                onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, maintenanceMode: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-900 dark:text-white font-medium">Allow Registration</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Enable new user signups</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={localSiteSettings.allowRegistration}
                                onChange={(e) => setLocalSiteSettings({ ...localSiteSettings, allowRegistration: e.target.checked })}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center gap-3">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {saving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Save size={18} />
                    )}
                    {saving ? 'Saving...' : 'Save All Settings'}
                </motion.button>
                {saved && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-emerald-600 dark:text-emerald-400 font-medium"
                    >
                        Saved successfully!
                    </motion.span>
                )}
            </div>
        </div>
    );
};

export default SiteSettingsManager;
