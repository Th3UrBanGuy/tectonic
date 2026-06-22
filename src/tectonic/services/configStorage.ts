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
        whatsapp?: string;
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

const EMPTY_CONTACT_CONFIG: ContactConfig = {
    address: { street: '', sector: '', coordinates: '' },
    contact: { email: '', phone: '' },
    socials: { linkedin: '', facebook: '', instagram: '', twitter: '', github: '' },
};

// ─── Sync getters (localStorage cache) ─────────────────────────────────
export const getSiteSettings = (): SiteSettings => {
    try {
        const data = localStorage.getItem(SITE_SETTINGS_KEY);
        if (!data) return DEFAULT_SITE_SETTINGS;
        return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(data) };
    } catch {
        return DEFAULT_SITE_SETTINGS;
    }
};

export const getContactConfig = (): ContactConfig => {
    try {
        const data = localStorage.getItem(CONTACT_CONFIG_KEY);
        if (!data) return EMPTY_CONTACT_CONFIG;
        return { ...EMPTY_CONTACT_CONFIG, ...JSON.parse(data) };
    } catch {
        return EMPTY_CONTACT_CONFIG;
    }
};

// ─── Sync savers (localStorage cache) ──────────────────────────────────
export const saveContactConfig = (config: ContactConfig) => {
    localStorage.setItem(CONTACT_CONFIG_KEY, JSON.stringify(config));
};

export const saveSiteSettings = (settings: SiteSettings) => {
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(settings));
};

// ─── Async DB getters ──────────────────────────────────────────────────
export const getSiteSettingsAsync = async (): Promise<SiteSettings> => {
    try {
        const res = await fetch('/api/content?type=settings');
        if (res.ok) {
            const json = await res.json();
            const data = json.data || {};
            const settings: SiteSettings = {
                siteName: data.site_name || DEFAULT_SITE_SETTINGS.siteName,
                siteTagline: data.site_tagline || DEFAULT_SITE_SETTINGS.siteTagline,
                maintenanceMode: DEFAULT_SITE_SETTINGS.maintenanceMode,
                allowRegistration: DEFAULT_SITE_SETTINGS.allowRegistration,
            };
            saveSiteSettings(settings);
            return settings;
        }
    } catch { /* fall through */ }
    return getSiteSettings();
};

export const getContactConfigAsync = async (): Promise<ContactConfig> => {
    try {
        const res = await fetch('/api/content?type=contactConfig');
        if (res.ok) {
            const json = await res.json();
            if (json.data) {
                const config: ContactConfig = { ...EMPTY_CONTACT_CONFIG, ...json.data };
                saveContactConfig(config);
                return config;
            }
        }
    } catch { /* fall through */ }
    return getContactConfig();
};

// ─── Async DB savers ───────────────────────────────────────────────────
async function saveToDB(type: string, data: any): Promise<boolean> {
    try {
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('techtonic_auth_token') : null;
        const res = await fetch(`/api/content?type=${type}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({ data }),
        });
        return res.ok;
    } catch {
        return false;
    }
}

export const saveSiteSettingsAsync = async (settings: SiteSettings): Promise<boolean> => {
    saveSiteSettings(settings);
    return saveToDB('settings', {
        siteName: settings.siteName,
        siteTagline: settings.siteTagline,
    });
};

export const saveContactConfigAsync = async (config: ContactConfig): Promise<boolean> => {
    saveContactConfig(config);
    return saveToDB('contactConfig', config);
};
