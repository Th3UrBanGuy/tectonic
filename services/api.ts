/**
 * API Service Layer for Techtonic
 * Handles all communication with Vercel Functions
 */

// Base API URL - empty for same-origin requests in production
const API_BASE = '';

// Content types that can be fetched/saved
export type ContentType =
    | 'wings' | 'team' | 'timeline' | 'partnerships' | 'projects'
    | 'techStack' | 'roadmap' | 'homeContent' | 'companyContent' | 'innovationContent';

// Config keys
export type ConfigKey = 'siteSettings' | 'contactConfig';

/**
 * Helper function for API requests
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
}

// ============================================================
// CONTENT API
// ============================================================

/**
 * Fetch content by type
 */
export async function getContent<T>(type: ContentType): Promise<T | null> {
    try {
        return await apiRequest<T>(`/api/content/${type}`);
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        return null;
    }
}

/**
 * Save content by type
 */
export async function saveContent<T>(type: ContentType, data: T): Promise<boolean> {
    try {
        await apiRequest(`/api/content/${type}`, {
            method: 'POST',
            body: JSON.stringify({ data }),
        });
        return true;
    } catch (error) {
        console.error(`Failed to save ${type}:`, error);
        return false;
    }
}

/**
 * Fetch all content at once (for initial load)
 */
export async function getAllContent(): Promise<{
    content: Record<string, any>;
    config: Record<string, any>;
} | null> {
    try {
        return await apiRequest('/api/content');
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
        return await apiRequest<T>(`/api/config/${key}`);
    } catch (error) {
        console.error(`Failed to fetch config ${key}:`, error);
        return null;
    }
}

/**
 * Save config by key
 */
export async function saveConfig<T>(key: ConfigKey, value: T): Promise<boolean> {
    try {
        await apiRequest(`/api/config/${key}`, {
            method: 'POST',
            body: JSON.stringify({ value }),
        });
        return true;
    } catch (error) {
        console.error(`Failed to save config ${key}:`, error);
        return false;
    }
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
    try {
        const result = await apiRequest<{ success: boolean; user: User }>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        return result.user;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
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
