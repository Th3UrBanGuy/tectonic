// Content storage service for all dynamic content
import { TechStackItem, RoadmapItem, Wing, TeamMember, Milestone, Partnership } from '../types';
import { WINGS as DEFAULT_WINGS } from '../data/wings';
import { PROJECTS as DEFAULT_PROJECTS_STATIC, PROJECTS } from '../data/projects';
import { TEAM as DEFAULT_TEAM } from '../data/team';
import { TIMELINE as DEFAULT_TIMELINE } from '../data/timeline';
import { PARTNERSHIPS as DEFAULT_PARTNERSHIPS } from '../data/partnerships';
import { HOME_CONTENT as DEFAULT_HOME_CONTENT } from '../data/pages/home';

import { COMPANY_CONTENT as RAW_COMPANY_CONTENT, COMPANY_ACHIEVEMENTS } from '../data/pages/company';
const DEFAULT_COMPANY_CONTENT = { ...RAW_COMPANY_CONTENT, achievements: COMPANY_ACHIEVEMENTS };
import {
    INNOVATION_CONTENT as DEFAULT_INNOVATION_CONTENT,
    INNOVATION_TECH_STACK as DEFAULT_TECH_STACK_STATIC,
    INNOVATION_ROADMAP as DEFAULT_ROADMAP_STATIC

} from '../data/pages/innovation';
import { PORTFOLIO_CONTENT as DEFAULT_PORTFOLIO_CONTENT } from '../data/pages/portfolio';

// API Configuration
const API_BASE_URL = '/api/content';

// Storage keys configuration (Legacy - moving to DB)
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
    INNOVATION_CONTENT: 'techtonic_innovation_content',
    PORTFOLIO_CONTENT: 'techtonic_portfolio_content',
} as const;

// ----------------------------------------------------------------------
// API HELPERS (ASYNC)
// ----------------------------------------------------------------------

/**
 * Fetches content from the backend API.
 * Uses default value if API fails or returns 404.
 */
async function fetchFromApi<T>(type: string, defaultValue: T): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}/${type}`);
        if (!response.ok) {
            if (response.status === 404) return defaultValue;
            throw new Error(`API returned ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`Failed to fetch ${type} from API, using default.`, error);
        return defaultValue;
    }
}

/**
 * Saves content to the backend API.
 */
async function saveToApi<T>(type: string, data: T): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data }),
        });
        return response.ok;
    } catch (error) {
        console.error(`Failed to save ${type} to API:`, error);
        return false;
    }
}

// ----------------------------------------------------------------------
// GENERIC STORAGE HELPER (LEGACY - SYNC)
// ----------------------------------------------------------------------

function getFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return defaultValue;
    }
}

function saveToStorage<T>(key: string, value: T): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
        return false;
    }
}

// ----------------------------------------------------------------------
// PUBLIC API
// ----------------------------------------------------------------------

// --- Tech Stack ---
export const getTechStack = (): TechStackItem[] => getFromStorage(STORAGE_KEYS.TECH_STACK, DEFAULT_TECH_STACK_STATIC);
export const fetchTechStack = () => fetchFromApi<TechStackItem[]>('techStack', DEFAULT_TECH_STACK_STATIC);
export const saveTechStack = (items: TechStackItem[]) => saveToStorage(STORAGE_KEYS.TECH_STACK, items);
export const updateTechStack = (items: TechStackItem[]) => saveToApi('techStack', items);

// --- Roadmap ---
export const getRoadmap = (): RoadmapItem[] => getFromStorage(STORAGE_KEYS.ROADMAP, DEFAULT_ROADMAP_STATIC);
export const fetchRoadmap = () => fetchFromApi<RoadmapItem[]>('roadmap', DEFAULT_ROADMAP_STATIC);
export const saveRoadmap = (items: RoadmapItem[]) => saveToStorage(STORAGE_KEYS.ROADMAP, items);
export const updateRoadmap = (items: RoadmapItem[]) => saveToApi('roadmap', items);

// --- Projects ---
export const getProjects = (): any[] => getFromStorage(STORAGE_KEYS.PROJECTS, PROJECTS);
export const fetchProjects = () => fetchFromApi<any[]>('projects', PROJECTS);
export const saveProjects = (items: any[]) => saveToStorage(STORAGE_KEYS.PROJECTS, items);
export const updateProjects = (items: any[]) => saveToApi('projects', items);

// --- Wings ---
export const getWings = (): Wing[] => getFromStorage(STORAGE_KEYS.WINGS, DEFAULT_WINGS);
export const fetchWings = () => fetchFromApi<Wing[]>('wings', DEFAULT_WINGS);
export const saveWings = (items: Wing[]) => saveToStorage(STORAGE_KEYS.WINGS, items);
export const updateWings = (items: Wing[]) => saveToApi('wings', items);

// --- Team ---
export const getTeam = (): TeamMember[] => getFromStorage(STORAGE_KEYS.TEAM, DEFAULT_TEAM);
export const fetchTeam = () => fetchFromApi<TeamMember[]>('team', DEFAULT_TEAM);
export const saveTeam = (items: TeamMember[]) => saveToStorage(STORAGE_KEYS.TEAM, items);
export const updateTeam = (items: TeamMember[]) => saveToApi('team', items);

// --- Timeline ---
export const getTimeline = (): Milestone[] => getFromStorage(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE);
export const fetchTimeline = () => fetchFromApi<Milestone[]>('timeline', DEFAULT_TIMELINE);
export const saveTimeline = (items: Milestone[]) => saveToStorage(STORAGE_KEYS.TIMELINE, items);
export const updateTimeline = (items: Milestone[]) => saveToApi('timeline', items);

// --- Partnerships ---
export const getPartnerships = (): Partnership[] => getFromStorage(STORAGE_KEYS.PARTNERSHIPS, DEFAULT_PARTNERSHIPS);
export const fetchPartnerships = () => fetchFromApi<Partnership[]>('partnerships', DEFAULT_PARTNERSHIPS);
export const savePartnerships = (items: Partnership[]) => saveToStorage(STORAGE_KEYS.PARTNERSHIPS, items);
export const updatePartnerships = (items: Partnership[]) => saveToApi('partnerships', items);

// --- Home Content ---
export const getHomeContent = () => getFromStorage(STORAGE_KEYS.HOME_CONTENT, DEFAULT_HOME_CONTENT);
export const fetchHomeContent = () => fetchFromApi('homeContent', DEFAULT_HOME_CONTENT);
export const saveHomeContent = (content: typeof DEFAULT_HOME_CONTENT) => saveToStorage(STORAGE_KEYS.HOME_CONTENT, content);
export const updateHomeContent = (content: typeof DEFAULT_HOME_CONTENT) => saveToApi('homeContent', content);

// --- Company Content ---
export const getCompanyContent = () => getFromStorage(STORAGE_KEYS.COMPANY_CONTENT, DEFAULT_COMPANY_CONTENT);
export const fetchCompanyContent = () => fetchFromApi('companyContent', DEFAULT_COMPANY_CONTENT);
export const saveCompanyContent = (content: typeof DEFAULT_COMPANY_CONTENT) => saveToStorage(STORAGE_KEYS.COMPANY_CONTENT, content);

export const updateCompanyContent = (content: typeof DEFAULT_COMPANY_CONTENT) => saveToApi('companyContent', content);

// --- Portfolio Content ---
export const getPortfolioContent = () => getFromStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, DEFAULT_PORTFOLIO_CONTENT);
export const fetchPortfolioContent = () => fetchFromApi('portfolioContent', DEFAULT_PORTFOLIO_CONTENT);
export const savePortfolioContent = (content: typeof DEFAULT_PORTFOLIO_CONTENT) => saveToStorage(STORAGE_KEYS.PORTFOLIO_CONTENT, content);
export const updatePortfolioContent = (content: typeof DEFAULT_PORTFOLIO_CONTENT) => saveToApi('portfolioContent', content);

// --- Innovation Content ---
export const getInnovationContent = () => getFromStorage(STORAGE_KEYS.INNOVATION_CONTENT, DEFAULT_INNOVATION_CONTENT);
export const fetchInnovationContent = () => fetchFromApi('innovationContent', DEFAULT_INNOVATION_CONTENT);
export const saveInnovationContent = (content: typeof DEFAULT_INNOVATION_CONTENT) => saveToStorage(STORAGE_KEYS.INNOVATION_CONTENT, content);
export const updateInnovationContent = (content: typeof DEFAULT_INNOVATION_CONTENT) => saveToApi('innovationContent', content);

// ----------------------------------------------------------------------
// DATA MANAGEMENT UTILITIES
// ----------------------------------------------------------------------

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
        innovationContent: getInnovationContent(),
    }, null, 2);
};

export const importAllContent = (jsonData: string): boolean => {
    try {
        const data = JSON.parse(jsonData);
        // Save to local storage (legacy)
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
        if (data.innovationContent) saveInnovationContent(data.innovationContent);

        // Also try to update API (fire and forget for now, or could make this async)
        // Ideally import should be updated to full async
        return true;
    } catch (error) {
        console.error('Error importing content:', error);
        return false;
    }
};

export const resetToDefaults = (): boolean => {
    try {
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
        return true;
    } catch (error) {
        console.error('Error resetting to defaults:', error);
        return false;
    }
};
