import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, Lock, Clock, Users, Calendar, Sparkles, AlertCircle, Check } from 'lucide-react';
import { LinkFormData, ShortenedLink } from '../../types';
import { generateSlug, validateUrl, sanitizeSlug, calculateExpirationDate, createShortUrl } from '../../utils/linkUtils';

interface LinkFormProps {
    onSubmit: (link: ShortenedLink) => void;
    existingSlugs: string[];
    editingLink?: ShortenedLink | null;
}

const LinkForm: React.FC<LinkFormProps> = ({ onSubmit, existingSlugs, editingLink }) => {
    const [formData, setFormData] = useState<LinkFormData>({
        originalUrl: '',
        customSlug: '',
        expirationType: 'never',
        expirationDate: '',
        expirationDuration: 24,
        password: '',
        waitingTime: 0,
        maxVisits: undefined,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

    // Populate form when editing
    useEffect(() => {
        if (editingLink) {
            setFormData({
                originalUrl: editingLink.originalUrl,
                customSlug: editingLink.slug,
                expirationType: editingLink.expiresAt ? 'date' : 'never',
                expirationDate: editingLink.expiresAt || '',
                password: editingLink.password || '',
                waitingTime: editingLink.waitingTime,
                maxVisits: editingLink.maxVisits,
            });
        }
    }, [editingLink]);

    const handleGenerateSlug = () => {
        setIsGeneratingSlug(true);
        setTimeout(() => {
            let slug = generateSlug(6);
            while (existingSlugs.includes(slug)) {
                slug = generateSlug(6);
            }
            setFormData({ ...formData, customSlug: slug });
            setErrors({ ...errors, customSlug: '' });
            setIsGeneratingSlug(false);
        }, 300);
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        // Validate URL
        if (!formData.originalUrl) {
            newErrors.originalUrl = 'URL is required';
        } else if (!validateUrl(formData.originalUrl)) {
            newErrors.originalUrl = 'Invalid URL format';
        }

        // Validate slug
        if (!formData.customSlug) {
            newErrors.customSlug = 'Slug is required';
        } else {
            const sanitized = sanitizeSlug(formData.customSlug);
            if (sanitized.length === 0) {
                newErrors.customSlug = 'Slug must contain at least one valid character';
            }
            if (!editingLink && existingSlugs.includes(formData.customSlug)) {
                newErrors.customSlug = 'Slug already in use';
            }
        }

        // Validate expiration
        if (formData.expirationType === 'date' && !formData.expirationDate) {
            newErrors.expirationDate = 'Expiration date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        let expiresAt: string | undefined;
        if (formData.expirationType === 'date' && formData.expirationDate) {
            expiresAt = formData.expirationDate;
        } else if (formData.expirationType === 'duration' && formData.expirationDuration) {
            expiresAt = calculateExpirationDate(formData.expirationDuration);
        }

        const link: ShortenedLink = {
            id: editingLink?.id || `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            originalUrl: formData.originalUrl,
            slug: formData.customSlug!,
            shortUrl: createShortUrl(formData.customSlug!),
            createdAt: editingLink?.createdAt || new Date().toISOString(),
            expiresAt,
            isActive: editingLink?.isActive ?? true,
            password: formData.password || undefined,
            waitingTime: formData.waitingTime,
            maxVisits: formData.maxVisits,
            currentVisits: editingLink?.currentVisits || 0,
            accessTimeRange: formData.accessTimeRange,
            analytics: editingLink?.analytics || {
                totalVisits: 0,
                uniqueVisitors: 0,
                referrers: {},
                devices: { desktop: 0, mobile: 0, tablet: 0 },
                visitHistory: [],
            },
        };

        onSubmit(link);

        // Reset form if not editing
        if (!editingLink) {
            setFormData({
                originalUrl: '',
                customSlug: '',
                expirationType: 'never',
                expirationDate: '',
                expirationDuration: 24,
                password: '',
                waitingTime: 0,
                maxVisits: undefined,
            });
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm space-y-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Link2 className="text-cyan-400" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">
                    {editingLink ? 'Edit Link' : 'Create New Link'}
                </h3>
            </div>

            {/* Original URL */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">
                    ORIGINAL URL *
                </label>
                <input
                    type="text"
                    value={formData.originalUrl}
                    onChange={(e) => {
                        setFormData({ ...formData, originalUrl: e.target.value });
                        setErrors({ ...errors, originalUrl: '' });
                    }}
                    placeholder="https://example.com/very/long/url"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                {errors.originalUrl && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle size={14} />
                        <span>{errors.originalUrl}</span>
                    </div>
                )}
            </div>

            {/* Custom Slug */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">
                    CUSTOM SLUG *
                </label>
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">
                            tech.link/
                        </span>
                        <input
                            type="text"
                            value={formData.customSlug}
                            onChange={(e) => {
                                setFormData({ ...formData, customSlug: sanitizeSlug(e.target.value) });
                                setErrors({ ...errors, customSlug: '' });
                            }}
                            placeholder="my-link"
                            className="w-full pl-24 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors font-mono"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleGenerateSlug}
                        disabled={isGeneratingSlug}
                        className="px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
                    >
                        <Sparkles size={16} className={isGeneratingSlug ? 'animate-spin' : ''} />
                        Generate
                    </button>
                </div>
                {errors.customSlug && (
                    <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle size={14} />
                        <span>{errors.customSlug}</span>
                    </div>
                )}
            </div>

            {/* Expiration */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2">
                    EXPIRATION
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                    {(['never', 'date', 'duration'] as const).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, expirationType: type })}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${formData.expirationType === type
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {formData.expirationType === 'date' && (
                    <input
                        type="datetime-local"
                        value={formData.expirationDate}
                        onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                )}

                {formData.expirationType === 'duration' && (
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            value={formData.expirationDuration}
                            onChange={(e) => setFormData({ ...formData, expirationDuration: parseInt(e.target.value) })}
                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                        <span className="text-slate-400">hours</span>
                    </div>
                )}
            </div>

            {/* Password Lock */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2 flex items-center gap-2">
                    <Lock size={14} />
                    PASSWORD PROTECTION
                </label>
                <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave empty for no password"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Waiting Time */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2 flex items-center gap-2">
                    <Clock size={14} />
                    WAITING TIME (seconds)
                </label>
                <input
                    type="number"
                    min="0"
                    max="60"
                    value={formData.waitingTime}
                    onChange={(e) => setFormData({ ...formData, waitingTime: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-slate-500 mt-1">Users will wait this long before redirect</p>
            </div>

            {/* Max Visits */}
            <div>
                <label className="block text-sm font-mono text-slate-400 mb-2 flex items-center gap-2">
                    <Users size={14} />
                    MAXIMUM VISITS
                </label>
                <input
                    type="number"
                    min="1"
                    value={formData.maxVisits || ''}
                    onChange={(e) => setFormData({ ...formData, maxVisits: e.target.value ? parseInt(e.target.value) : undefined })}
                    placeholder="Unlimited"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
                <Check size={18} />
                {editingLink ? 'Update Link' : 'Create Link'}
            </button>
        </motion.form>
    );
};

export default LinkForm;
