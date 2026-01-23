// LocalStorage service for link persistence
import { ShortenedLink, VisitRecord } from '../types';
import bcrypt from 'bcryptjs';

const STORAGE_KEY = 'techtonic_links';

/**
 * Get all links from localStorage
 */
export const getAllLinks = (): ShortenedLink[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading links from storage:', error);
        return [];
    }
};

/**
 * Get a single link by ID
 */
export const getLinkById = (id: string): ShortenedLink | null => {
    const links = getAllLinks();
    return links.find(link => link.id === id) || null;
};

/**
 * Get a single link by slug
 */
export const getLinkBySlug = (slug: string): ShortenedLink | null => {
    const links = getAllLinks();
    return links.find(link => link.slug === slug) || null;
};

/**
 * Save a new link or update existing one
 */

export const saveLink = (link: ShortenedLink): boolean => {
    try {
        const links = getAllLinks();
        const existingIndex = links.findIndex(l => l.id === link.id);

        // Hash password if it exists and doesn't look like a bcrypt hash (starts with $2a$ or similar)
        // Note: This is a basic check. ideally we'd track "isDirty" or separate password update logic.
        // Assuming if it's plain text len < 50, hash it. bcrypt hashes are 60 chars.
        if (link.password && link.password.length < 50) {
            const salt = bcrypt.genSaltSync(10);
            link.password = bcrypt.hashSync(link.password, salt);
        }

        if (existingIndex >= 0) {
            links[existingIndex] = link;
        } else {
            links.push(link);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
        return true;
    } catch (error) {
        console.error('Error saving link:', error);
        return false;
    }
};

/**
 * Delete a link by ID
 */
export const deleteLink = (id: string): boolean => {
    try {
        const links = getAllLinks();
        const filtered = links.filter(link => link.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting link:', error);
        return false;
    }
};

/**
 * Delete multiple links by IDs
 */
export const deleteLinks = (ids: string[]): boolean => {
    try {
        const links = getAllLinks();
        const filtered = links.filter(link => !ids.includes(link.id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting links:', error);
        return false;
    }
};

/**
 * Track a visit to a link
 */
export const trackVisit = (slug: string, referrer: string, userAgent: string): boolean => {
    try {
        const link = getLinkBySlug(slug);
        if (!link) return false;

        const visit: VisitRecord = {
            timestamp: new Date().toISOString(),
            referrer: referrer || 'Direct',
            userAgent,
        };

        // Update analytics
        link.currentVisits += 1;
        link.analytics.totalVisits += 1;
        link.analytics.visitHistory.push(visit);

        // Update referrers
        const referrerKey = visit.referrer;
        link.analytics.referrers[referrerKey] = (link.analytics.referrers[referrerKey] || 0) + 1;

        // Update device stats
        const deviceType = detectDeviceType(userAgent);
        link.analytics.devices[deviceType] += 1;

        return saveLink(link);
    } catch (error) {
        console.error('Error tracking visit:', error);
        return false;
    }
};

/**
 * Update link analytics
 */
export const updateAnalytics = (id: string, visit: VisitRecord): boolean => {
    try {
        const link = getLinkById(id);
        if (!link) return false;

        link.analytics.visitHistory.push(visit);
        link.analytics.totalVisits += 1;
        link.currentVisits += 1;

        // Update referrers count
        const referrerKey = visit.referrer || 'Direct';
        link.analytics.referrers[referrerKey] = (link.analytics.referrers[referrerKey] || 0) + 1;

        return saveLink(link);
    } catch (error) {
        console.error('Error updating analytics:', error);
        return false;
    }
};

/**
 * Toggle link active status
 */
export const toggleLinkStatus = (id: string): boolean => {
    try {
        const link = getLinkById(id);
        if (!link) return false;

        link.isActive = !link.isActive;
        return saveLink(link);
    } catch (error) {
        console.error('Error toggling link status:', error);
        return false;
    }
};

/**
 * Clear all links (for testing/reset)
 */
export const clearAllLinks = (): boolean => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing links:', error);
        return false;
    }
};

/**
 * Export links as JSON
 */
export const exportLinks = (): string => {
    const links = getAllLinks();
    return JSON.stringify(links, null, 2);
};

/**
 * Import links from JSON
 */
export const importLinks = (jsonData: string): boolean => {
    try {
        const links = JSON.parse(jsonData) as ShortenedLink[];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
        return true;
    } catch (error) {
        console.error('Error importing links:', error);
        return false;
    }
};

// Helper function for device detection
const detectDeviceType = (userAgent: string): 'desktop' | 'mobile' | 'tablet' => {
    const ua = userAgent.toLowerCase();

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
};
