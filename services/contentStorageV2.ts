/**
 * Content Storage Service - Hybrid Mode
 * 
 * This service provides a unified interface for content storage.
 * - In production: Uses Vercel Functions API → Neon PostgreSQL
 * - In development/offline: Falls back to localStorage
 * 
 * The hybrid approach ensures the app works even if the API is unavailable.
 */

import * as api from './api';
import { TechStackItem, RoadmapItem, Wing, TeamMember, Milestone, Partnership } from '../types';
import { WINGS as DEFAULT_WINGS } from '../data/wings';
import { PROJECTS } from '../data/projects';
import { TEAM as DEFAULT_TEAM } from '../data/team';
import { TIMELINE as DEFAULT_TIMELINE } from '../data/timeline';
import { PARTNERSHIPS as DEFAULT_PARTNERSHIPS } from '../data/partnerships';
import { HOME_CONTENT as DEFAULT_HOME_CONTENT } from '../data/pages/home';
import { COMPANY_CONTENT as DEFAULT_COMPANY_CONTENT } from '../data/pages/company';
import {
    INNOVATION_CONTENT as DEFAULT_INNOVATION_CONTENT,
    INNOVATION_TECH_STACK as DEFAULT_TECH_STACK,
    INNOVATION_ROADMAP as DEFAULT_ROADMAP
} from '../data/pages/innovation';

// Storage keys for localStorage fallback
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
} as const;

// Flag to determine if we should use API or localStorage
const USE_API = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');

// ----------------------------------------------------------------------
// GENERIC HELPERS
// ----------------------------------------------------------------------

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return defaultValue;
    }
}

function saveToLocalStorage<T>(key: string, value: T): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`Error saving ${key}:`, error);
        return false;
    }
}

// ----------------------------------------------------------------------
// ASYNC CONTENT GETTERS (API PRIMARY, LOCALSTORAGE FALLBACK)
// ----------------------------------------------------------------------

export const getTechStackAsync = async (): Promise<TechStackItem[]> => {
    if (USE_API) {
        const data = await api.getContent<TechStackItem[]>('techStack');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.TECH_STACK, DEFAULT_TECH_STACK);
};

export const getRoadmapAsync = async (): Promise<RoadmapItem[]> => {
    if (USE_API) {
        const data = await api.getContent<RoadmapItem[]>('roadmap');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.ROADMAP, DEFAULT_ROADMAP);
};

export const getProjectsAsync = async (): Promise<any[]> => {
    if (USE_API) {
        const data = await api.getContent<any[]>('projects');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.PROJECTS, PROJECTS);
};

export const getWingsAsync = async (): Promise<Wing[]> => {
    if (USE_API) {
        const data = await api.getContent<Wing[]>('wings');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.WINGS, DEFAULT_WINGS);
};

export const getTeamAsync = async (): Promise<TeamMember[]> => {
    if (USE_API) {
        const data = await api.getContent<TeamMember[]>('team');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.TEAM, DEFAULT_TEAM);
};

export const getTimelineAsync = async (): Promise<Milestone[]> => {
    if (USE_API) {
        const data = await api.getContent<Milestone[]>('timeline');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE);
};

export const getPartnershipsAsync = async (): Promise<Partnership[]> => {
    if (USE_API) {
        const data = await api.getContent<Partnership[]>('partnerships');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.PARTNERSHIPS, DEFAULT_PARTNERSHIPS);
};

export const getHomeContentAsync = async () => {
    if (USE_API) {
        const data = await api.getContent('homeContent');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.HOME_CONTENT, DEFAULT_HOME_CONTENT);
};

export const getCompanyContentAsync = async () => {
    if (USE_API) {
        const data = await api.getContent('companyContent');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.COMPANY_CONTENT, DEFAULT_COMPANY_CONTENT);
};

export const getInnovationContentAsync = async () => {
    if (USE_API) {
        const data = await api.getContent('innovationContent');
        if (data) return data;
    }
    return getFromLocalStorage(STORAGE_KEYS.INNOVATION_CONTENT, DEFAULT_INNOVATION_CONTENT);
};

// ----------------------------------------------------------------------
// ASYNC CONTENT SAVERS (API PRIMARY, LOCALSTORAGE BACKUP)
// ----------------------------------------------------------------------

export const saveTechStackAsync = async (items: TechStackItem[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.TECH_STACK, items); // Always save locally as backup
    if (USE_API) {
        return await api.saveContent('techStack', items);
    }
    return true;
};

export const saveRoadmapAsync = async (items: RoadmapItem[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.ROADMAP, items);
    if (USE_API) {
        return await api.saveContent('roadmap', items);
    }
    return true;
};

export const saveProjectsAsync = async (items: any[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.PROJECTS, items);
    if (USE_API) {
        return await api.saveContent('projects', items);
    }
    return true;
};

export const saveWingsAsync = async (items: Wing[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.WINGS, items);
    if (USE_API) {
        return await api.saveContent('wings', items);
    }
    return true;
};

export const saveTeamAsync = async (items: TeamMember[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.TEAM, items);
    if (USE_API) {
        return await api.saveContent('team', items);
    }
    return true;
};

export const saveTimelineAsync = async (items: Milestone[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.TIMELINE, items);
    if (USE_API) {
        return await api.saveContent('timeline', items);
    }
    return true;
};

export const savePartnershipsAsync = async (items: Partnership[]): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.PARTNERSHIPS, items);
    if (USE_API) {
        return await api.saveContent('partnerships', items);
    }
    return true;
};

export const saveHomeContentAsync = async (content: any): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.HOME_CONTENT, content);
    if (USE_API) {
        return await api.saveContent('homeContent', content);
    }
    return true;
};

export const saveCompanyContentAsync = async (content: any): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.COMPANY_CONTENT, content);
    if (USE_API) {
        return await api.saveContent('companyContent', content);
    }
    return true;
};

export const saveInnovationContentAsync = async (content: any): Promise<boolean> => {
    saveToLocalStorage(STORAGE_KEYS.INNOVATION_CONTENT, content);
    if (USE_API) {
        return await api.saveContent('innovationContent', content);
    }
    return true;
};

// ----------------------------------------------------------------------
// SYNC GETTERS (KEPT FOR BACKWARD COMPATIBILITY)
// These read from localStorage only - used during initial render
// ----------------------------------------------------------------------

export const getTechStack = (): TechStackItem[] => getFromLocalStorage(STORAGE_KEYS.TECH_STACK, DEFAULT_TECH_STACK);
export const getRoadmap = (): RoadmapItem[] => getFromLocalStorage(STORAGE_KEYS.ROADMAP, DEFAULT_ROADMAP);
export const getProjects = (): any[] => getFromLocalStorage(STORAGE_KEYS.PROJECTS, PROJECTS);
export const getWings = (): Wing[] => getFromLocalStorage(STORAGE_KEYS.WINGS, DEFAULT_WINGS);
export const getTeam = (): TeamMember[] => getFromLocalStorage(STORAGE_KEYS.TEAM, DEFAULT_TEAM);
export const getTimeline = (): Milestone[] => getFromLocalStorage(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE);
export const getPartnerships = (): Partnership[] => getFromLocalStorage(STORAGE_KEYS.PARTNERSHIPS, DEFAULT_PARTNERSHIPS);
export const getHomeContent = () => getFromLocalStorage(STORAGE_KEYS.HOME_CONTENT, DEFAULT_HOME_CONTENT);
export const getCompanyContent = () => getFromLocalStorage(STORAGE_KEYS.COMPANY_CONTENT, DEFAULT_COMPANY_CONTENT);
export const getInnovationContent = () => getFromLocalStorage(STORAGE_KEYS.INNOVATION_CONTENT, DEFAULT_INNOVATION_CONTENT);

// ----------------------------------------------------------------------
// SYNC SAVERS (KEPT FOR BACKWARD COMPATIBILITY)
// These save to localStorage AND trigger async API save
// ----------------------------------------------------------------------

export const saveTechStack = (items: TechStackItem[]): boolean => {
    saveTechStackAsync(items); // Fire and forget async save
    return saveToLocalStorage(STORAGE_KEYS.TECH_STACK, items);
};

export const saveRoadmap = (items: RoadmapItem[]): boolean => {
    saveRoadmapAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.ROADMAP, items);
};

export const saveProjects = (items: any[]): boolean => {
    saveProjectsAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.PROJECTS, items);
};

export const saveWings = (items: Wing[]): boolean => {
    saveWingsAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.WINGS, items);
};

export const saveTeam = (items: TeamMember[]): boolean => {
    saveTeamAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.TEAM, items);
};

export const saveTimeline = (items: Milestone[]): boolean => {
    saveTimelineAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.TIMELINE, items);
};

export const savePartnerships = (items: Partnership[]): boolean => {
    savePartnershipsAsync(items);
    return saveToLocalStorage(STORAGE_KEYS.PARTNERSHIPS, items);
};

export const saveHomeContent = (content: any): boolean => {
    saveHomeContentAsync(content);
    return saveToLocalStorage(STORAGE_KEYS.HOME_CONTENT, content);
};

export const saveCompanyContent = (content: any): boolean => {
    saveCompanyContentAsync(content);
    return saveToLocalStorage(STORAGE_KEYS.COMPANY_CONTENT, content);
};

export const saveInnovationContent = (content: any): boolean => {
    saveInnovationContentAsync(content);
    return saveToLocalStorage(STORAGE_KEYS.INNOVATION_CONTENT, content);
};

// ----------------------------------------------------------------------
// BULK OPERATIONS
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
        innovationContent: getInnovationContent(),
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
        if (data.innovationContent) saveInnovationContent(data.innovationContent);
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
