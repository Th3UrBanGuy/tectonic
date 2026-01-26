/**
 * API Service Layer for Techtonic
 * Handles all communication with Local Data
 */

import { WINGS } from '../data/wings';
import { TEAM } from '../data/team';
import { TIMELINE } from '../data/timeline';
import { PARTNERSHIPS } from '../data/partnerships';
import { PROJECTS } from '../data/projects';
import { HOME_CONTENT } from '../data/pages/home';
import { COMPANY_CONTENT, COMPANY_ACHIEVEMENTS } from '../data/pages/company';
import { INNOVATION_CONTENT, INNOVATION_TECH_STACK, INNOVATION_ROADMAP } from '../data/pages/innovation';
import { CONTACT_INFO } from '../data/pages/contact';

// Content types that can be fetched/saved
export type ContentType =
    | 'wings' | 'team' | 'timeline' | 'partnerships' | 'projects'
    | 'techStack' | 'roadmap' | 'homeContent' | 'companyContent' | 'innovationContent';

// Config keys
export type ConfigKey = 'siteSettings' | 'contactConfig';

// ============================================================
// CONTENT API
// ============================================================

/**
 * Fetch content by type
 */
export async function getContent<T>(type: ContentType): Promise<T | null> {
    try {
        switch (type) {
            case 'wings': return WINGS as unknown as T;
            case 'team': return TEAM as unknown as T;
            case 'timeline': return TIMELINE as unknown as T;
            case 'partnerships': return PARTNERSHIPS as unknown as T;
            case 'projects': return PROJECTS as unknown as T;
            case 'techStack': return INNOVATION_TECH_STACK as unknown as T;
            case 'roadmap': return INNOVATION_ROADMAP as unknown as T;
            case 'homeContent': return HOME_CONTENT as unknown as T;
            case 'companyContent': return { ...COMPANY_CONTENT, achievements: COMPANY_ACHIEVEMENTS } as unknown as T;
            case 'innovationContent': return INNOVATION_CONTENT as unknown as T;
            default:
                console.warn(`Unknown content type: ${type}`);
                return null;
        }
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        return null;
    }
}

/**
 * Save content by type
 */
export async function saveContent<T>(type: ContentType, data: T): Promise<boolean> {
    console.warn('saveContent is not supported in static mode');
    return true;
}

/**
 * Fetch all content at once (for initial load)
 */
export async function getAllContent(): Promise<{
    content: Record<string, any>;
    config: Record<string, any>;
} | null> {
    try {
        return {
            content: {
                wings: WINGS,
                team: TEAM,
                timeline: TIMELINE,
                partnerships: PARTNERSHIPS,
                projects: PROJECTS,
                techStack: INNOVATION_TECH_STACK,
                roadmap: INNOVATION_ROADMAP,
                homeContent: HOME_CONTENT,
                companyContent: { ...COMPANY_CONTENT, achievements: COMPANY_ACHIEVEMENTS },
                innovationContent: INNOVATION_CONTENT,
            },
            config: {
                contactConfig: CONTACT_INFO,
                siteSettings: {}
            }
        };
    } catch (error) {
        console.error('Failed to fetch all content:', error);
        return null;
    }
}

// ============================================================
// CONFIG API
// ============================================================

/**
 * Fetch config by key
 */
export async function getConfig<T>(key: ConfigKey): Promise<T | null> {
    try {
        switch (key) {
            case 'contactConfig': return CONTACT_INFO as unknown as T;
            case 'siteSettings': return {} as unknown as T;
            default: return null;
        }
    } catch (error) {
        console.error(`Failed to fetch config ${key}:`, error);
        return null;
    }
}

/**
 * Save config by key
 */
export async function saveConfig<T>(key: ConfigKey, value: T): Promise<boolean> {
    console.warn('saveConfig is not supported in static mode');
    return true;
}

// ============================================================
// AUTH API
// ============================================================

export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

/**
 * Admin login
 */
export async function login(email: string, password: string): Promise<User | null> {
    console.warn('Login is not supported in static mode');
    return null;
}

// ============================================================
// UTILITY EXPORTS
// ============================================================

export const api = {
    content: {
        get: getContent,
        save: saveContent,
        getAll: getAllContent,
    },
    config: {
        get: getConfig,
        save: saveConfig,
    },
    auth: {
        login,
    },
};

export default api;

