import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import TectonicLogo from '../layout/TectonicLogo';
import ThemeToggle from '../ui/ThemeToggle';

interface AdminLoginProps {
    onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black relative overflow-hidden transition-colors duration-500">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-white dark:bg-black transition-colors duration-500">
                {/* Light Mode Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:opacity-0 opacity-100 transition-opacity duration-500" />

                {/* Dark Mode Gradients */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950 opacity-0 dark:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Animated Blobs */}
            <motion.div
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.1, 1],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-brand-500/10 to-transparent rounded-full blur-3xl dark:from-brand-500/10 dark:opacity-5"
            />
            <motion.div
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                    scale: [1.1, 1, 1.1],
                    x: [0, -20, 0],
                    y: [0, 20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl dark:from-purple-500/10 dark:opacity-5"
            />

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

            <div className="absolute top-6 right-6 z-20">
                <ThemeToggle />
            </div>

            <div className="relative z-10 w-full max-w-[480px] px-6">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                        <span className="text-sm font-medium dark:font-light tracking-wide">Back to Home</span>
                    </Link>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Glass Card */}
                    <div className="relative bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl border border-slate-200/50 dark:border-white/[0.05] rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
                        {/* Subtle Inner Glow */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none dark:from-white/[0.03]" />

                        {/* Header */}
                        <div className="relative mb-10">
                            <div className="flex items-center justify-between mb-3">
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.8 }}
                                    className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
                                >
                                    Portal
                                </motion.h1>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    <TectonicLogo />
                                </motion.div>
                            </div>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "60px" }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="h-[2px] bg-gradient-to-r from-brand-500 to-transparent"
                            />
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-normal dark:font-light tracking-wide"
                            >
                                Secure authentication required
                            </motion.p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                            >
                                <label className="block text-xs font-semibold dark:font-medium text-slate-500 dark:text-slate-500 mb-3 tracking-widest uppercase">
                                    Email
                                </label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-brand-500 transition-colors duration-300" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/30 dark:hover:border-white/[0.12] focus:border-brand-500/50 rounded-xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/30 transition-all duration-300"
                                        placeholder="admin@tectonic.com"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Password Input */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                            >
                                <label className="block text-xs font-semibold dark:font-medium text-slate-500 dark:text-slate-500 mb-3 tracking-widest uppercase">
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-600 group-focus-within:text-brand-500 transition-colors duration-300" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-brand-500/30 dark:hover:border-white/[0.12] focus:border-brand-500/50 rounded-xl pl-12 pr-4 py-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-brand-500/30 transition-all duration-300"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                            </motion.div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-50 border border-red-200 dark:bg-red-500/10 dark:border-red-500/20 rounded-xl"
                                >
                                    <p className="text-sm text-red-600 dark:text-red-400 font-medium dark:font-light">
                                        Authentication failed. Please verify your credentials.
                                    </p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                type="submit"
                                className="w-full mt-8 group relative overflow-hidden bg-slate-900 dark:bg-white/[0.05] hover:bg-slate-800 dark:hover:bg-white/[0.08] border border-transparent dark:border-white/[0.1] hover:dark:border-brand-500/50 rounded-xl py-4 transition-all duration-500 shadow-xl shadow-brand-500/10"
                            >
                                {/* Hover Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-500/0 via-brand-500/10 to-brand-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex items-center justify-center gap-3">
                                    <span className="text-white font-medium tracking-wide">
                                        Authenticate
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-brand-400 dark:text-brand-500 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </motion.button>
                        </form>
                    </div>

                    {/* Bottom Accent Line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="h-[1px] bg-gradient-to-r from-transparent via-brand-500/30 to-transparent mt-8"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
