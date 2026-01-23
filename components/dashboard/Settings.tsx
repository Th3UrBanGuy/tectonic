import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette, Shield, Trash2, Camera, Save, Key, Globe, Clock, Monitor, Moon, Sun, Smartphone, LogOut, Download, AlertTriangle, Settings as SettingsIcon, MapPin, Phone, Mail, Facebook, Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import { useContent } from '../ContentContext';
import { useTheme } from '../ThemeContext';

const Settings = () => {
    const { siteSettings, setSiteSettings, contactConfig, setContactConfig } = useContent();
    const { theme, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState('personal');
    const [profile, setProfile] = useState({
        name: 'Admin User',
        email: 'admin@techtonic.com',
        role: 'System Administrator',
        bio: 'Managing the Techtonic Portal',
        avatar: 'AU'
    });
    const [preferences, setPreferences] = useState({
        notifications: true,
        emailNotifications: false,
        language: 'en',
        timezone: 'UTC+6'
    });

    const [localSiteSettings, setLocalSiteSettings] = useState(siteSettings);
    const [localContactConfig, setLocalContactConfig] = useState(contactConfig);

    useEffect(() => {
        setLocalSiteSettings(siteSettings);
    }, [siteSettings]);

    useEffect(() => {
        setLocalContactConfig(contactConfig);
    }, [contactConfig]);

    const tabs = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'password', label: 'Password', icon: Key },
        { id: 'account', label: 'Account', icon: Shield },
        { id: 'site', label: 'Site Settings', icon: SettingsIcon },
    ];

    const handleSaveProfile = () => {
        alert('Profile updated successfully!');
    };

    const handleChangePassword = () => {
        alert('Password changed successfully!');
    };

    const handleSaveSiteSettings = () => {
        setSiteSettings(localSiteSettings);
        setContactConfig(localContactConfig);
        alert('Site settings and contact info updated successfully!');
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you absolutely sure? This action cannot be undone!')) {
            alert('Account deletion initiated. You will be logged out.');
        }
    };

    // This replacer is too complex for a single block due to distribution.
    // proceeding with smaller chunks or full file rewrite if density is high.
    // The file has heavily hardcoded 'text-white' and 'bg-white/5'.
    // I will rewrite the component parts. Since I have to change almost every line with color classes.
    // I will replace the main render method's JSX.

    return (
        <div className="max-w-5xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-200 dark:border-white/10 scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <motion.button
                            key={tab.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30'
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                                }`}
                        >
                            <Icon size={18} />
                            {tab.label}
                        </motion.button>
                    );
                })}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            {/* Avatar Section */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Profile Picture</h3>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                                            {profile.avatar}
                                        </div>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            className="absolute bottom-0 right-0 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg"
                                        >
                                            <Camera size={16} />
                                        </motion.button>
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-medium mb-1">Upload new photo</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">JPG, PNG or GIF. Max 2MB.</p>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-lg text-sm border border-slate-200 dark:border-white/10 transition-colors"
                                        >
                                            Choose File
                                        </motion.button>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">FULL NAME</label>
                                        <input
                                            type="text"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">EMAIL</label>
                                        <input
                                            type="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">ROLE</label>
                                        <input
                                            type="text"
                                            value={profile.role}
                                            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">BIO</label>
                                        <input
                                            type="text"
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSaveProfile}
                                    className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-colors"
                                >
                                    <Save size={18} />
                                    Save Changes
                                </motion.button>
                            </div>

                            {/* Preferences */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Bell size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Notifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-900 dark:text-white font-medium">Push Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive notifications in the app</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.notifications}
                                                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-900 dark:text-white font-medium">Email Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receive updates via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.emailNotifications}
                                                onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Palette size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Theme
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTheme()}
                                        className={`p-4 rounded-xl border-2 transition-all ${theme === 'light'
                                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10'
                                            : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>Light Mode</p>
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => toggleTheme()}
                                        className={`p-4 rounded-xl border-2 transition-all ${theme === 'dark'
                                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10'
                                            : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                                        <p className={`text-sm font-medium ${theme === 'dark' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-white'}`}>Dark Mode</p>
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'password' && (
                        <div className="space-y-6">
                            {/* Change Password */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Key size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Change Password
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">CURRENT PASSWORD</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">NEW PASSWORD</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">CONFIRM NEW PASSWORD</label>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleChangePassword}
                                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 transition-colors"
                                    >
                                        Update Password
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            {/* Create Admin - Maybe? */}
                            {/* Leaving out for now to focus on dynamic content */}

                            {/* Export Data */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Download size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Export Data
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-4">Download a copy of your data including profile, messages, and settings.</p>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white rounded-lg font-bold border border-slate-200 dark:border-white/10 transition-colors"
                                >
                                    Download Data
                                </motion.button>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/30 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} />
                                    Danger Zone
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDeleteAccount}
                                    className="px-6 py-3 bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg font-bold border border-red-200 dark:border-red-500/30 transition-colors"
                                >
                                    Delete Account
                                </motion.button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'site' && (
                        <div className="space-y-6">
                            {/* Site Information */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Site Information</h3>
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
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <MapPin size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Contact Details
                                </h3>
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
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Globe size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Social Media Links
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4 items-center">
                                        <Linkedin size={20} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="LinkedIn URL"
                                            value={localContactConfig.socials?.linkedin || ''}
                                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, socials: { ...localContactConfig.socials, linkedin: e.target.value } })}
                                            className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Facebook size={20} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Facebook URL"
                                            value={localContactConfig.socials?.facebook || ''}
                                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, socials: { ...localContactConfig.socials, facebook: e.target.value } })}
                                            className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Instagram size={20} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Instagram URL"
                                            value={localContactConfig.socials?.instagram || ''}
                                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, socials: { ...localContactConfig.socials, instagram: e.target.value } })}
                                            className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Twitter size={20} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Twitter (X) URL"
                                            value={localContactConfig.socials?.twitter || ''}
                                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, socials: { ...localContactConfig.socials, twitter: e.target.value } })}
                                            className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Github size={20} className="text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="GitHub URL"
                                            value={localContactConfig.socials?.github || ''}
                                            onChange={(e) => setLocalContactConfig({ ...localContactConfig, socials: { ...localContactConfig.socials, github: e.target.value } })}
                                            className="flex-1 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-2 text-slate-900 dark:text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Site Options */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Site Options</h3>
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
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSaveSiteSettings}
                                    className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-colors"
                                >
                                    <Save size={18} />
                                    Save Site Settings
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Settings;
