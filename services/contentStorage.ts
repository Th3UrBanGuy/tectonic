// Content storage service for all dynamic content
import { TechStackItem, RoadmapItem, Wing, TeamMember, Milestone, Partnership } from '../types';
import { WINGS as DEFAULT_WINGS } from '../data/wings';
import { PROJECTS as DEFAULT_PROJECTS_STATIC, PROJECTS } from '../data/projects';
import { TEAM as DEFAULT_TEAM } from '../data/team';
import { TIMELINE as DEFAULT_TIMELINE } from '../data/timeline';
import { PARTNERSHIPS as DEFAULT_PARTNERSHIPS } from '../data/partnerships';
import { HOME_CONTENT as DEFAULT_HOME_CONTENT } from '../data/pages/home';
import { COMPANY_CONTENT as DEFAULT_COMPANY_CONTENT } from '../data/pages/company';
import {
    INNOVATION_CONTENT as DEFAULT_INNOVATION_CONTENT,
    INNOVATION_TECH_STACK as DEFAULT_TECH_STACK_STATIC,
    INNOVATION_ROADMAP as DEFAULT_ROADMAP_STATIC
} from '../data/pages/innovation';

// Storage keys configuration
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

// ----------------------------------------------------------------------
// GENERIC STORAGE HELPER
// ----------------------------------------------------------------------

/**
 * Retrieves data from localStorage with type safety and error handling.
 * 
 * @template T The expected return type of the data.
 * @param {string} key The localStorage key to retrieve.
 * @param {T} defaultValue The value to return if storage is empty or error occurs.
 * @returns {T} The parsed data or default value.
 */
function getFromStorage<T>(key: string, defaultValue: T): T {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return defaultValue;
    }
}

/**
 * Saves data to localStorage with type safety and error handling.
 * 
 * @template T The type of data to save.
 * @param {string} key The localStorage key to save to.
 * @param {T} value The data to serialize and save.
 * @returns {boolean} True if save was successful, false otherwise.
 */
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

/**
 * Retrieves the Innovation Tech Stack configuration.
 * @returns {TechStackItem[]} Array of tech stack items.
 */
export const getTechStack = (): TechStackItem[] => getFromStorage(STORAGE_KEYS.TECH_STACK, DEFAULT_TECH_STACK_STATIC);

/**
 * Saves the Innovation Tech Stack configuration.
 * @param {TechStackItem[]} items The new tech stack items.
 * @returns {boolean} Success status.
 */
export const saveTechStack = (items: TechStackItem[]): boolean => saveToStorage(STORAGE_KEYS.TECH_STACK, items);

/**
 * Retrieves the Innovation Roadmap configuration.
 * @returns {RoadmapItem[]} Array of roadmap items.
 */
export const getRoadmap = (): RoadmapItem[] => getFromStorage(STORAGE_KEYS.ROADMAP, DEFAULT_ROADMAP_STATIC);

/**
 * Saves the Innovation Roadmap configuration.
 * @param {RoadmapItem[]} items The new roadmap items.
 * @returns {boolean} Success status.
 */
export const saveRoadmap = (items: RoadmapItem[]): boolean => saveToStorage(STORAGE_KEYS.ROADMAP, items);

/**
 * Retrieves the Projects list.
 * @returns {any[]} Array of project items.
 */
export const getProjects = (): any[] => getFromStorage(STORAGE_KEYS.PROJECTS, PROJECTS);

/**
 * Saves the Projects list.
 * @param {any[]} items The new project items.
 * @returns {boolean} Success status.
 */
export const saveProjects = (items: any[]): boolean => saveToStorage(STORAGE_KEYS.PROJECTS, items);

/**
 * Retrieves the Wings configuration.
 * @returns {Wing[]} Array of wings.
 */
export const getWings = (): Wing[] => getFromStorage(STORAGE_KEYS.WINGS, DEFAULT_WINGS);

/**
 * Saves the Wings configuration.
 * @param {Wing[]} items The new wings.
 * @returns {boolean} Success status.
 */
export const saveWings = (items: Wing[]): boolean => saveToStorage(STORAGE_KEYS.WINGS, items);

/**
 * Retrieves the Team configuration.
 * @returns {TeamMember[]} Array of team members.
 */
export const getTeam = (): TeamMember[] => getFromStorage(STORAGE_KEYS.TEAM, DEFAULT_TEAM);

/**
 * Saves the Team configuration.
 * @param {TeamMember[]} items The new team members.
 * @returns {boolean} Success status.
 */
export const saveTeam = (items: TeamMember[]): boolean => saveToStorage(STORAGE_KEYS.TEAM, items);

/**
 * Retrieves the Timeline/Milestones configuration.
 * @returns {Milestone[]} Array of milestones.
 */
export const getTimeline = (): Milestone[] => getFromStorage(STORAGE_KEYS.TIMELINE, DEFAULT_TIMELINE);

/**
 * Saves the Timeline/Milestones configuration.
 * @param {Milestone[]} items The new milestones.
 * @returns {boolean} Success status.
 */
export const saveTimeline = (items: Milestone[]): boolean => saveToStorage(STORAGE_KEYS.TIMELINE, items);

/**
 * Retrieves the Partnerships configuration.
 * @returns {Partnership[]} Array of partnerships.
 */
export const getPartnerships = (): Partnership[] => getFromStorage(STORAGE_KEYS.PARTNERSHIPS, DEFAULT_PARTNERSHIPS);

/**
 * Saves the Partnerships configuration.
 * @param {Partnership[]} items The new partnerships.
 * @returns {boolean} Success status.
 */
export const savePartnerships = (items: Partnership[]): boolean => saveToStorage(STORAGE_KEYS.PARTNERSHIPS, items);

/**
 * Retrieves the Home Page content.
 * @returns {object} The home page content object.
 */
export const getHomeContent = () => getFromStorage(STORAGE_KEYS.HOME_CONTENT, DEFAULT_HOME_CONTENT);

/**
 * Saves the Home Page content.
 * @param {object} content The new home page content.
 * @returns {boolean} Success status.
 */
export const saveHomeContent = (content: typeof DEFAULT_HOME_CONTENT): boolean => saveToStorage(STORAGE_KEYS.HOME_CONTENT, content);

/**
 * Retrieves the Company Page content.
 * @returns {object} The company page content object.
 */
export const getCompanyContent = () => getFromStorage(STORAGE_KEYS.COMPANY_CONTENT, DEFAULT_COMPANY_CONTENT);

/**
 * Saves the Company Page content.
 * @param {object} content The new company page content.
 * @returns {boolean} Success status.
 */
export const saveCompanyContent = (content: typeof DEFAULT_COMPANY_CONTENT): boolean => saveToStorage(STORAGE_KEYS.COMPANY_CONTENT, content);

/**
 * Retrieves the Innovation Page content.
 * @returns {object} The innovation page content object.
 */
export const getInnovationContent = () => getFromStorage(STORAGE_KEYS.INNOVATION_CONTENT, DEFAULT_INNOVATION_CONTENT);

/**
 * Saves the Innovation Page content.
 * @param {object} content The new innovation page content.
 * @returns {boolean} Success status.
 */
export const saveInnovationContent = (content: typeof DEFAULT_INNOVATION_CONTENT): boolean => saveToStorage(STORAGE_KEYS.INNOVATION_CONTENT, content);

// ----------------------------------------------------------------------
// DATA MANAGEMENT UTILITIES
// ----------------------------------------------------------------------

/**
 * Exports all current data state as a JSON string.
 * Useful for backups or migration.
 * 
 * @returns {string} Stringified JSON of the entire application state.
 */
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

/**
 * Imports application state from a JSON string.
 * Handles partial updates safely.
 * 
 * @param {string} jsonData The JSON string to import.
 * @returns {boolean} True if import succeeded, false on parsing error.
 */
export const importAllContent = (jsonData: string): boolean => {
    try {
        const data = JSON.parse(jsonData);
        // We check existence before saving to avoid overwriting with undefined
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

/**
 * Resets all data to factory defaults.
 * Clears localStorage for the defined keys.
 * 
 * @returns {boolean} Always returns true.
 */
export const resetToDefaults = (): boolean => {
    try {
        // We only clear the specific keys we manage, to avoid nuking auth or theme
        Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
        return true;
    } catch (error) {
        console.error('Error resetting to defaults:', error);
        return false;
    }
};
