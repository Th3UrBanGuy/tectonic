import { CONTACT_INFO } from '../data/pages/contact';

// Types (Mirrored from constants structure for now, can be moved to types.ts)
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
        // Deep merge with defaults to ensure all fields exist
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

export const saveContactConfig = (config: ContactConfig) => {
    localStorage.setItem(CONTACT_CONFIG_KEY, JSON.stringify(config));
};

export const saveSiteSettings = (settings: SiteSettings) => {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
};
