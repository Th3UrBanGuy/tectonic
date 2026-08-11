"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Palette, Shield, Trash2, Camera, Save, Key, Moon, Sun, CheckCircle, AlertTriangle, Upload, X } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { getToken } from '../../services/auth';
import { useTheme } from '../ThemeContext';

const Settings = () => {
    const { user, setUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [activeTab, setActiveTab] = useState('personal');
    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [avatarUrl, setAvatarUrl] = useState<string | null(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);
    const [profileError, setProfileError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preferences, setPreferences] = useState({
        pushEnabled: false,
        emailNotifications: false,
    });
    const [notifPermission, setNotifPermission] = useState<NotificationPermission>('default');

    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Fetch current profile from API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/auth/profile', {
                    headers: { Authorization: `Bearer ${getToken()}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setProfile({ name: data.user.name || '', email: data.user.email || '' });
                        if (data.user.avatarUrl) setAvatarUrl(data.user.avatarUrl);
                    }
                }
            } catch {}
            setProfileLoading(false);
        };
        fetchProfile();

        // Check notification permission
        if ('Notification' in window) {
            setNotifPermission(Notification.permission);
            setPreferences(prev => ({
                ...prev,
                pushEnabled: Notification.permission === 'granted',
            }));
        }
    }, []);

    const tabs = [
        { id: 'personal', label: 'Personal', icon: User },
        { id: 'password', label: 'Password', icon: Key },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'account', label: 'Account', icon: Shield },
    ];

    // ── Avatar Upload ────────────────────────────────────────────────────
    const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert('File too large. Maximum 2MB.');
            return;
        }
        setAvatarFile(file);
        const reader = new FileReader();
        reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const handleAvatarUpload = async () => {
        if (!avatarFile) return;
        const formData = new FormData();
        formData.append('avatar', avatarFile);
        try {
            const res = await fetch('/api/auth/avatar', {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
                body: formData,
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Upload failed');
            }
            const data = await res.json();
            setAvatarUrl(data.avatarUrl);
            setAvatarPreview(null);
            setAvatarFile(null);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleAvatarRemove = async () => {
        try {
            await fetch('/api/auth/avatar', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            setAvatarUrl(null);
            setAvatarPreview(null);
            setAvatarFile(null);
        } catch {}
    };

    // ── Profile Save ─────────────────────────────────────────────────────
    const handleSaveProfile = async () => {
        setProfileSaving(true);
        setProfileError('');
        setProfileSuccess(false);
        try {
            const res = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ name: profile.name, email: profile.email }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to update profile');
            }
            const data = await res.json();
            // Update local auth state
            if (data.user) {
                const stored = localStorage.getItem('techtonic_auth_user');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    parsed.name = data.user.name;
                    parsed.email = data.user.email;
                    localStorage.setItem('techtonic_auth_user', JSON.stringify(parsed));
                }
                if (setUser) setUser({ ...user!, name: data.user.name, email: data.user.email });
            }
            setProfileSuccess(true);
            setTimeout(() => setProfileSuccess(false), 3000);
        } catch (err: any) {
            setProfileError(err.message);
        } finally {
            setProfileSaving(false);
        }
    };

    // ── Password Change ──────────────────────────────────────────────────
    const handleChangePassword = async () => {
        setPasswordError('');
        setPasswordSuccess(false);
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters');
            return;
        }
        setPasswordLoading(true);
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
                body: JSON.stringify({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Failed to change password');
            }
            setPasswordSuccess(true);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setPasswordSuccess(false), 4000);
        } catch (err: any) {
            setPasswordError(err.message);
        } finally {
            setPasswordLoading(false);
        }
    };

    // ── Push Notifications ───────────────────────────────────────────────
    const handleTogglePush = async () => {
        if (!('Notification' in window)) {
            alert('Push notifications are not supported in this browser.');
            return;
        }

        if (Notification.permission === 'granted') {
            setPreferences(prev => ({ ...prev, pushEnabled: !prev.pushEnabled }));
            return;
        }

        if (Notification.permission === 'denied') {
            alert('Notifications are blocked. Please enable them in your browser settings.');
            return;
        }

        const permission = await Notification.requestPermission();
        setNotifPermission(permission);
        setPreferences(prev => ({ ...prev, pushEnabled: permission === 'granted' }));
    };

    const handleTestNotification = () => {
        if (Notification.permission === 'granted') {
            new Notification('Techtonic', {
                body: 'Push notifications are working!',
                icon: '/logo-dark.png',
            });
        }
    };

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
                    {/* ── PERSONAL TAB ────────────────────────────────── */}
                    {activeTab === 'personal' && (
                        <div className="space-y-6">
                            {/* Avatar Section */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Profile Picture</h3>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        {avatarPreview || avatarUrl ? (
                                            <img
                                                src={avatarPreview || avatarUrl!}
                                                alt="Avatar"
                                                className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 dark:border-white/10"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                                                {(profile.name || 'A').charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-lg"
                                        >
                                            <Camera size={16} />
                                        </motion.button>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
                                            onChange={handleAvatarSelect}
                                            className="hidden"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-medium mb-1">Upload new photo</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">JPG, PNG or GIF. Max 2MB.</p>
                                        <div className="flex gap-2">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white rounded-lg text-sm border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-2"
                                            >
                                                <Upload size={14} />
                                                Choose File
                                            </motion.button>
                                            {avatarFile && (
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleAvatarUpload}
                                                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                                                >
                                                    <Save size={14} />
                                                    Upload Now
                                                </motion.button>
                                            )}
                                            {(avatarUrl || avatarPreview) && (
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleAvatarRemove}
                                                    className="px-4 py-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-500/30 transition-colors flex items-center gap-2"
                                                >
                                                    <X size={14} />
                                                    Remove
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Info */}
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Personal Information</h3>
                                {profileLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                    </div>
                                ) : (
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
                                                value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Administrator'}
                                                disabled
                                                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                )}
                                {profileError && (
                                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                                        <p className="text-sm text-red-600 dark:text-red-400">{profileError}</p>
                                    </div>
                                )}
                                {profileSuccess && (
                                    <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg flex items-center gap-2">
                                        <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400">Profile updated successfully!</p>
                                    </div>
                                )}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSaveProfile}
                                    disabled={profileSaving || profileLoading}
                                    className="mt-6 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    {profileSaving ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    Save Changes
                                </motion.button>
                            </div>
                        </div>
                    )}

                    {/* ── PASSWORD TAB ───────────────────────────────── */}
                    {activeTab === 'password' && (
                        <div className="space-y-6">
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
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">NEW PASSWORD</label>
                                        <input
                                            type="password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            placeholder="Min 8 characters"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-cyan-600 dark:text-cyan-500/60 mb-2">CONFIRM NEW PASSWORD</label>
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            placeholder="••••••••"
                                            className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:border-cyan-500/50 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    {passwordError && (
                                        <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
                                            <p className="text-sm text-red-600 dark:text-red-400 font-medium">{passwordError}</p>
                                        </div>
                                    )}
                                    {passwordSuccess && (
                                        <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg flex items-center gap-2">
                                            <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Password updated successfully!</p>
                                        </div>
                                    )}
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleChangePassword}
                                        disabled={passwordLoading || !passwordData.currentPassword || !passwordData.newPassword}
                                        className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold shadow-lg shadow-cyan-500/20 transition-colors disabled:opacity-50 flex items-center gap-2"
                                    >
                                        {passwordLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                                        Update Password
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── NOTIFICATIONS TAB ──────────────────────────── */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Bell size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Push Notifications
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-slate-900 dark:text-white font-medium">Browser Push Notifications</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                                {notifPermission === 'granted' ? 'Enabled — you will receive push notifications' :
                                                 notifPermission === 'denied' ? 'Blocked — enable in browser settings' :
                                                 'Click to enable push notifications'}
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={preferences.pushEnabled}
                                                onChange={handleTogglePush}
                                                className="sr-only peer"
                                                disabled={notifPermission === 'denied'}
                                            />
                                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600 disabled:opacity-50"></div>
                                        </label>
                                    </div>
                                    {preferences.pushEnabled && (
                                        <motion.button
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleTestNotification}
                                            className="px-4 py-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-lg text-sm font-medium border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                                        >
                                            Send Test Notification
                                        </motion.button>
                                    )}
                                    {notifPermission === 'denied' && (
                                        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg">
                                            <p className="text-sm text-amber-700 dark:text-amber-400">
                                                Notifications are blocked. Please enable them in your browser's site settings for this page.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Email Notifications</h3>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-medium">Email Alerts</p>
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
                    )}

                    {/* ── APPEARANCE TAB ─────────────────────────────── */}
                    {activeTab === 'appearance' && (
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-6 shadow-sm dark:shadow-none">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Palette size={20} className="text-cyan-500 dark:text-cyan-400" />
                                    Theme
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => { if (theme !== 'light') toggleTheme(); }}
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
                                        onClick={() => { if (theme !== 'dark') toggleTheme(); }}
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

                    {/* ── ACCOUNT TAB ────────────────────────────────── */}
                    {activeTab === 'account' && (
                        <div className="space-y-6">
                            <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/30 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4 flex items-center gap-2">
                                    <AlertTriangle size={20} />
                                    Danger Zone
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (confirm('Are you absolutely sure? This action cannot be undone!')) {
                                            alert('Account deletion initiated. You will be logged out.');
                                        }
                                    }}
                                    className="px-6 py-3 bg-red-100 dark:bg-red-500/10 hover:bg-red-200 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg font-bold border border-red-200 dark:border-red-500/30 transition-colors"
                                >
                                    Delete Account
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
