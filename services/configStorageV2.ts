/**
 * Config Storage Service - Hybrid Mode
 * 
 * Provides site settings and contact configuration.
 * - Production: Uses Vercel Functions API → Neon PostgreSQL
 * - Development/Offline: Falls back to localStorage
 */

import * as api from './api';
import { CONTACT_INFO } from '../data/pages/contact';

// Types
export interface SiteSettings {
    siteName: string;
    siteTagline: string;
    maintenanceMode: boolean;
    allowRegistration: boolean;
}

export interface ContactConfig {
    address: {
        street: string;
        sector: string;
        coordinates: string;
    };
    contact: {
        email: string;
        phone: string;
    };
    socials: {
        linkedin: string;
        facebook: string;
        instagram: string;
        twitter: string;
        github: string;
    };
}

const SITE_SETTINGS_KEY = 'techtonic_site_settings';
const CONTACT_CONFIG_KEY = 'techtonic_contact_config';

const DEFAULT_SITE_SETTINGS: SiteSettings = {
    siteName: 'Techtonic',
    siteTagline: 'Architecting Tomorrow',
    maintenanceMode: false,
    allowRegistration: false,
};

// Flag to determine if we should use API
const USE_API = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');

// ----------------------------------------------------------------------
// ASYNC GETTERS (API PRIMARY)
// ----------------------------------------------------------------------

export const getSiteSettingsAsync = async (): Promise<SiteSettings> => {
    if (USE_API) {
        const data = await api.getConfig<SiteSettings>('siteSettings');
        if (data) return { ...DEFAULT_SITE_SETTINGS, ...data };
    }
    return getSiteSettings();
};

export const getContactConfigAsync = async (): Promise<ContactConfig> => {
    if (USE_API) {
        const data = await api.getConfig<ContactConfig>('contactConfig');
        if (data) {
            return {
                ...CONTACT_INFO,
                ...data,
                address: { ...CONTACT_INFO.address, ...data.address },
                contact: { ...CONTACT_INFO.contact, ...data.contact },
                socials: { ...CONTACT_INFO.socials, ...data.socials },
            };
        }
    }
    return getContactConfig();
};

// ----------------------------------------------------------------------
// ASYNC SAVERS (API + LOCALSTORAGE)
// ----------------------------------------------------------------------

export const saveSiteSettingsAsync = async (settings: SiteSettings): Promise<boolean> => {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
    if (USE_API) {
        return await api.saveConfig('siteSettings', settings);
    }
    return true;
};

export const saveContactConfigAsync = async (config: ContactConfig): Promise<boolean> => {
    localStorage.setItem(CONTACT_CONFIG_KEY, JSON.stringify(config));
    if (USE_API) {
        return await api.saveConfig('contactConfig', config);
    }
    return true;
};

// ----------------------------------------------------------------------
// SYNC GETTERS (LOCALSTORAGE ONLY - FOR BACKWARD COMPATIBILITY)
// ----------------------------------------------------------------------

export const getSiteSettings = (): SiteSettings => {
    try {
        const data = localStorage.getItem(SITE_SETTINGS_KEY);
        if (!data) return DEFAULT_SITE_SETTINGS;

        const parsed = JSON.parse(data);
        return {
            ...DEFAULT_SITE_SETTINGS,
            ...parsed
        };
    } catch (e) {
        console.error('Error loading site settings', e);
        return DEFAULT_SITE_SETTINGS;
    }
};

export const getContactConfig = (): ContactConfig => {
    try {
        const data = localStorage.getItem(CONTACT_CONFIG_KEY);
        if (!data) return CONTACT_INFO;

        const parsed = JSON.parse(data);
        return {
            ...CONTACT_INFO,
            ...parsed,
            address: { ...CONTACT_INFO.address, ...parsed.address },
            contact: { ...CONTACT_INFO.contact, ...parsed.contact },
            socials: { ...CONTACT_INFO.socials, ...parsed.socials },
        };
    } catch (e) {
        console.error('Error loading contact config', e);
        return CONTACT_INFO;
    }
};

// ----------------------------------------------------------------------
// SYNC SAVERS (TRIGGER ASYNC SAVE)
// ----------------------------------------------------------------------

export const saveSiteSettings = (settings: SiteSettings) => {
    saveSiteSettingsAsync(settings); // Fire and forget
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
};

export const saveContactConfig = (config: ContactConfig) => {
    saveContactConfigAsync(config); // Fire and forget
    localStorage.setItem(CONTACT_CONFIG_KEY, JSON.stringify(config));
};
