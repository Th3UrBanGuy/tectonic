// Link utility functions for URL shortening and validation
import { ShortenedLink, LinkFormData } from '../types';

const BASE_DOMAIN = 'tech.link'; // Placeholder domain

/**
 * Generate a random slug for shortened URLs
 */
export const generateSlug = (length: number = 6): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let slug = '';
    for (let i = 0; i < length; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
};

/**
 * Check if a slug is available (not already in use)
 */
export const checkSlugAvailability = (slug: string, existingLinks: ShortenedLink[]): boolean => {
    return !existingLinks.some(link => link.slug === slug);
};

/**
 * Check if a link has expired
 */
export const isLinkExpired = (link: ShortenedLink): boolean => {
    if (!link.expiresAt) return false;
    return new Date(link.expiresAt) < new Date();
};

/**
 * Check if a link can be accessed based on all access controls
 */
export const canAccessLink = (link: ShortenedLink): {
    canAccess: boolean;
    reason?: string;
} => {
    // Check if link is active
    if (!link.isActive) {
        return { canAccess: false, reason: 'Link is inactive' };
    }

    // Check expiration
    if (isLinkExpired(link)) {
        return { canAccess: false, reason: 'Link has expired' };
    }

    // Check max visits
    if (link.maxVisits && link.currentVisits >= link.maxVisits) {
        return { canAccess: false, reason: 'Maximum visits reached' };
    }

    // Check time-based access
    if (link.accessTimeRange) {
        const now = new Date();
        const start = new Date(link.accessTimeRange.start);
        const end = new Date(link.accessTimeRange.end);

        if (now < start) {
            return { canAccess: false, reason: 'Link not yet active' };
        }
        if (now > end) {
            return { canAccess: false, reason: 'Access period has ended' };
        }
    }

    return { canAccess: true };
};

/**
 * Calculate time remaining until expiration
 */
export const calculateTimeRemaining = (expiresAt?: string): string => {
    if (!expiresAt) return 'Never expires';

    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

/**
 * Format a date for display
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Create a shortened URL from a slug
 */
export const createShortUrl = (slug: string): string => {
    return `${BASE_DOMAIN}/${slug}`;
};

/**
 * Detect device type from user agent
 */
export const detectDeviceType = (userAgent: string): 'desktop' | 'mobile' | 'tablet' => {
    const ua = userAgent.toLowerCase();

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch {
            document.body.removeChild(textArea);
            return false;
        }
    }
};

/**
 * Calculate expiration date from duration
 */
export const calculateExpirationDate = (hours: number): string => {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date.toISOString();
};

/**
 * Sanitize slug (remove special characters, convert to lowercase)
 */
export const sanitizeSlug = (slug: string): string => {
    return slug
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^a-z0-9-_]/g, '') // Only allow alphanumeric, hyphens, and underscores
        .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
        .substring(0, 50); // Max 50 characters
};
