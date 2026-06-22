/**
 * Content Storage Service — fully DB-controlled.
 *
 * All content is read from the Neon PostgreSQL database via /api/content.
 * No static data files are imported — the DB is the single source of truth.
 * If the DB is unavailable, empty arrays/objects are returned (the UI
 * handles loading/empty states).
 */
import { TechStackItem, RoadmapItem, Wing, TeamMember, Milestone, Partnership } from '../types';

// localStorage cache keys (used for optimistic UI + offline fallback)
const STORAGE_KEYS = {
    TECH_STACK: 'techtonic_tech_stack',
    ROADMAP: 'techtonic_roadmap',
    PROJECTS: 'techtonic_projects',
    WINGS: 'techtonic_wings',
    TEAM: 'techtonic_team',
    TIMELINE: 'techtonic_timeline',
    PARTNERSHIPS: 'techtonic_partnerships',
    HOME_CONTENT: 'techtonic_home_content',
    COMPANY_CONTENT: 'techtonic_company_content',
    PORTFOLIO_CONTENT: 'techtonic_portfolio_content',
    INNOVATION_CONTENT: 'techtonic_innovation_content',
} as const;

// ─── localStorage helpers (for caching) ────────────────────────────────
function getFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function saveToStorage<T>(key: string, value: T): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        return false;
    }
}

// ─── DB fetch helper (simple, no retries — fails fast) ─────────────────
async function fetchFromDB<T>(type: string): Promise<T | null> {
    try {
        const res = await fetch(`/api/content?type=${type}`);
        if (!res.ok) return null;
        const json = await res.json();
        return json.data as T;
    } catch {
        return null;
    }
}

// ═══════════════════════════════════════════════════════════════════════
//  ASYNC GETTERS — primary, read from DB
// ═══════════════════════════════════════════════════════════════════════

export const getWingsAsync = async (): Promise<Wing[]> => {
    const data = await fetchFromDB<Wing[]>('wings');
    if (data) {
        saveToStorage(STORAGE_KEYS.WINGS, data);
        return data;
    }
    return getFromStorage<Wing[]>(STORAGE_KEYS.WINGS, []);
};

export const getProjectsAsync = async (): Promise<any[]> => {
    const data = await fetchFromDB<any[]>('projects');
    if (data) {
        saveToStorage(STORAGE_KEYS.PROJECTS, data);
        return data;
    }
    return getFromStorage<any[]>(STORAGE_KEYS.PROJECTS, []);
};

export const getTeamAsync = async (): Promise<TeamMember[]> => {
    const data = await fetchFromDB<TeamMember[]>('team');
    if (data) {
        saveToStorage(STORAGE_KEYS.TEAM, data);
        return data;
    }
    return getFromStorage<TeamMember[]>(STORAGE_KEYS.TEAM, []);
};

export const getTimelineAsync = async (): Promise<Milestone[]> => {
    const data = await fetchFromDB<Milestone[]>('timeline');
    if (data) {
        saveToStorage(STORAGE_KEYS.TIMELINE, data);
        return data;
    }
    return getFromStorage<Milestone[]>(STORAGE_KEYS.TIMELINE, []);
};

export const getPartnershipsAsync = async (): Promise<Partnership[]> => {
    const data = await fetchFromDB<Partnership[]>('partnerships');
    if (data) {
        saveToStorage(STORAGE_KEYS.PARTNERSHIPS, data);
        return data;
    }
    return getFromStorage<Partnership[]>(STORAGE_KEYS.PARTNERSHIPS, []);
};

export const getTechStackAsync = async (): Promise<TechStackItem[]> => {
    const data = await fetchFromDB<TechStackItem[]>('techStack');
    if (data) {
        saveToStorage(STORAGE_KEYS.TECH_STACK, data);
        return data;
    }
    return getFromStorage<TechStackItem[]>(STORAGE_KEYS.TECH_STACK, []);
};

export const getRoadmapAsync = async (): Promise<RoadmapItem[]> => {
    const data = await fetchFromDB<RoadmapItem[]>('roadmap');
    if (data) {
        saveToStorage(STORAGE_KEYS.ROADMAP, data);
        return data;
    }
    return getFromStorage<RoadmapItem[]>(STORAGE_KEYS.ROADMAP, []);
};

// Page content — fetch from DB (site_settings JSON)
export const getHomeContentAsync = async () => {
    const data = await fetchFromDB<any>('homeContent');
    if (data) {
        saveToStorage(STORAGE_KEYS.HOME_CONTENT, data);
        return data;
    }
    return getFromStorage(STORAGE_KEYS.HOME_CONTENT, {});
};

export const getCompanyContentAsync = async () => {
    const data = await fetchFromDB<any>('companyContent');
    if (data) {
        saveToStorage(STORAGE_KEYS.COMPANY_CONTENT, data);
        return data;
    }
    return getFromStorage(STORAGE_KEYS.COMPANY_CONTENT, {});
};

export const getPortfolioContentAsync = async () => {
    const data = await fetchFromDB<any>('portfolioContent');
    if (data) {
        saveToStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, data);
        return data;
    }
    return getFromStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, {});
};

export const getInnovationContentAsync = async () => {
    // Innovation content is part of companyContent for now
    const companyContent = await getCompanyContentAsync();
    return companyContent?.innovation || {};
};

// ═══════════════════════════════════════════════════════════════════════
//  SYNC GETTERS — fallback for initial render (localStorage cache only)
// ═══════════════════════════════════════════════════════════════════════

export const getTechStack = (): TechStackItem[] => getFromStorage(STORAGE_KEYS.TECH_STACK, []);
export const getRoadmap = (): RoadmapItem[] => getFromStorage(STORAGE_KEYS.ROADMAP, []);
export const getProjects = (): any[] => getFromStorage(STORAGE_KEYS.PROJECTS, []);
export const getWings = (): Wing[] => getFromStorage(STORAGE_KEYS.WINGS, []);
export const getTeam = (): TeamMember[] => getFromStorage(STORAGE_KEYS.TEAM, []);
export const getTimeline = (): Milestone[] => getFromStorage(STORAGE_KEYS.TIMELINE, []);
export const getPartnerships = (): Partnership[] => getFromStorage(STORAGE_KEYS.PARTNERSHIPS, []);
export const getHomeContent = () => getFromStorage(STORAGE_KEYS.HOME_CONTENT, {});
export const getCompanyContent = () => getFromStorage(STORAGE_KEYS.COMPANY_CONTENT, {});
export const getPortfolioContent = () => getFromStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, {});
export const getInnovationContent = () => getFromStorage(STORAGE_KEYS.INNOVATION_CONTENT, {});

// ═══════════════════════════════════════════════════════════════════════
//  ASYNC DB SAVERS — write to the database via /api/content PUT
//  Also cache to localStorage for optimistic UI.
// ═══════════════════════════════════════════════════════════════════════

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

export const saveWingsAsync = async (items: Wing[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.WINGS, items);
    return saveToDB('wings', items);
};

export const saveProjectsAsync = async (items: any[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.PROJECTS, items);
    return saveToDB('projects', items);
};

export const saveTeamAsync = async (items: TeamMember[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.TEAM, items);
    return saveToDB('team', items);
};

export const savePartnershipsAsync = async (items: Partnership[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.PARTNERSHIPS, items);
    return saveToDB('partnerships', items);
};

export const saveTimelineAsync = async (items: Milestone[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.TIMELINE, items);
    return saveToDB('timeline', items);
};

export const saveTechStackAsync = async (items: TechStackItem[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.TECH_STACK, items);
    return saveToDB('techStack', items);
};

export const saveRoadmapAsync = async (items: RoadmapItem[]): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.ROADMAP, items);
    return saveToDB('roadmap', items);
};

export const saveHomeContentAsync = async (content: any): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.HOME_CONTENT, content);
    return saveToDB('homeContent', content);
};

export const saveCompanyContentAsync = async (content: any): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.COMPANY_CONTENT, content);
    return saveToDB('companyContent', content);
};

export const savePortfolioContentAsync = async (content: any): Promise<boolean> => {
    saveToStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, content);
    return saveToDB('portfolioContent', content);
};

// Sync savers (localStorage cache only — kept for backward compat)
export const saveTechStack = (items: TechStackItem[]): boolean => saveToStorage(STORAGE_KEYS.TECH_STACK, items);
export const saveRoadmap = (items: RoadmapItem[]): boolean => saveToStorage(STORAGE_KEYS.ROADMAP, items);
export const saveProjects = (items: any[]): boolean => saveToStorage(STORAGE_KEYS.PROJECTS, items);
export const saveWings = (items: Wing[]): boolean => saveToStorage(STORAGE_KEYS.WINGS, items);
export const saveTeam = (items: TeamMember[]): boolean => saveToStorage(STORAGE_KEYS.TEAM, items);
export const saveTimeline = (items: Milestone[]): boolean => saveToStorage(STORAGE_KEYS.TIMELINE, items);
export const savePartnerships = (items: Partnership[]): boolean => saveToStorage(STORAGE_KEYS.PARTNERSHIPS, items);
export const saveHomeContent = (content: any): boolean => saveToStorage(STORAGE_KEYS.HOME_CONTENT, content);
export const saveCompanyContent = (content: any): boolean => saveToStorage(STORAGE_KEYS.COMPANY_CONTENT, content);
export const savePortfolioContent = (content: any): boolean => saveToStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, content);
export const saveInnovationContent = (content: any): boolean => saveToStorage(STORAGE_KEYS.INNOVATION_CONTENT, content);

// ═══════════════════════════════════════════════════════════════════════
//  BULK OPERATIONS
// ═══════════════════════════════════════════════════════════════════════

export const exportAllContent = (): string => {
    return JSON.stringify({
        techStack: getTechStack(),
        roadmap: getRoadmap(),
        projects: getProjects(),
        wings: getWings(),
        team: getTeam(),
        timeline: getTimeline(),
        partnerships: getPartnerships(),
        homeContent: getHomeContent(),
        companyContent: getCompanyContent(),
        portfolioContent: getPortfolioContent(),
    }, null, 2);
};

export const importAllContent = (jsonData: string): boolean => {
    try {
        const data = JSON.parse(jsonData);
        if (data.techStack) saveTechStack(data.techStack);
        if (data.roadmap) saveRoadmap(data.roadmap);
        if (data.projects) saveProjects(data.projects);
        if (data.wings) saveWings(data.wings);
        if (data.team) saveTeam(data.team);
        if (data.timeline) saveTimeline(data.timeline);
        if (data.partnerships) savePartnerships(data.partnerships);
        if (data.homeContent) saveHomeContent(data.homeContent);
        if (data.companyContent) saveCompanyContent(data.companyContent);
        if (data.portfolioContent) savePortfolioContent(data.portfolioContent);
        return true;
    } catch {
        return false;
    }
};

export const resetToDefaults = (): boolean => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
        return true;
    } catch {
        return false;
    }
};
