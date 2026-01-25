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
    socials: Record<string, string>; // Changed to dynamic record
}

const API_URL = '/api/content/settings';

const DEFAULT_SITE_SETTINGS: SiteSettings = {
    siteName: 'Techtonic',
    siteTagline: 'Architecting Tomorrow',
    maintenanceMode: false,
    allowRegistration: false,
};

// GETters - These are still synchronous in the Context usage pattern (initial state), 
// but the Context `refreshContent` actually populates the state from API now. 
// So these getters might just be fallback defaults or legacy local reads.
// We'll keep them returning defaults for safety, but the app relies on Context.refreshContent()
export const getSiteSettings = (): SiteSettings => {
    return DEFAULT_SITE_SETTINGS;
};

export const getContactConfig = (): ContactConfig => {
    return CONTACT_INFO;
};

// SETters - Now Async calling API
export const saveContactConfig = async (config: ContactConfig) => {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: config })
            // The API expects 'data' root. 
            // The API logic maps data.address/contact/socials.
            // config object matches that structure directly.
        });
    } catch (e) {
        console.error('Error saving contact config to API', e);
    }
};

export const saveSiteSettings = async (settings: SiteSettings) => {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: settings })
            // settings has siteName, siteTagline which matches API expectation
        });
    } catch (e) {
        console.error('Error saving site settings to API', e);
    }
};
