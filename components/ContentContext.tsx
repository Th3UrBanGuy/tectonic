import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as contentStorage from '../services/contentStorage';
import * as configStorage from '../services/configStorage';
import { Wing, TeamMember, Milestone, Partnership, TechStackItem, RoadmapItem } from '../types';

// ----------------------------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------------------------

/**
 * Shape of the Content Context data.
 * Provides access to all dynamic content and configuration settings.
 */
interface ContentContextType {
    // --- Core Entity Data ---
    wings: Wing[];
    setWings: (wings: Wing[]) => void;
    team: TeamMember[];
    setTeam: (team: TeamMember[]) => void;
    timeline: Milestone[];
    setTimeline: (timeline: Milestone[]) => void;
    partnerships: Partnership[];
    setPartnerships: (partnerships: Partnership[]) => void;
    projects: any[];
    setProjects: (projects: any[]) => void;

    // --- Innovation Page Specs ---
    techStack: TechStackItem[];
    setTechStack: (items: TechStackItem[]) => void;
    roadmap: RoadmapItem[];
    setRoadmap: (items: RoadmapItem[]) => void;

    // --- Page Specific Content Objects ---
    homeContent: any;
    setHomeContent: (content: any) => void;
    companyContent: any;
    setCompanyContent: (content: any) => void;
    innovationContent: any;
    setInnovationContent: (content: any) => void;

    // --- Configuration & Settings ---
    siteSettings: configStorage.SiteSettings;
    setSiteSettings: (settings: configStorage.SiteSettings) => void;
    contactConfig: configStorage.ContactConfig;
    setContactConfig: (config: configStorage.ContactConfig) => void;

    // --- Actions ---
    /**
     * Re-fetches all data from local storage.
     * Useful after a bulk import or reset.
     */
    refreshContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// ----------------------------------------------------------------------
// PROVIDER COMPONENT
// ----------------------------------------------------------------------

/**
 * Global provider for application content and state.
 * Syncs changes to localStorage via the storage services.
 */
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // --- State Initialization ---
    const [wings, setWingsState] = useState<Wing[]>([]);
    const [team, setTeamState] = useState<TeamMember[]>([]);
    const [timeline, setTimelineState] = useState<Milestone[]>([]);
    const [partnerships, setPartnershipsState] = useState<Partnership[]>([]);
    const [projects, setProjectsState] = useState<any[]>([]);
    const [techStack, setTechStackState] = useState<TechStackItem[]>([]);
    const [roadmap, setRoadmapState] = useState<RoadmapItem[]>([]);

    const [homeContent, setHomeContentState] = useState<any>({});
    const [companyContent, setCompanyContentState] = useState<any>({});
    const [innovationContent, setInnovationContentState] = useState<any>({});

    const [siteSettings, setSiteSettingsState] = useState<configStorage.SiteSettings>({
        siteName: 'Techtonic',
        siteTagline: 'Architecting Tomorrow',
        maintenanceMode: false,
        allowRegistration: false,
    });

    const [contactConfig, setContactConfigState] = useState<configStorage.ContactConfig>({
        address: { street: '', sector: '', coordinates: '' },
        contact: { email: '', phone: '' },
        socials: { linkedin: '', facebook: '', instagram: '', twitter: '', github: '' }
    });

    /**
     * Loads all content from persistent storage into state.
     * Includes error handling to prevent app crashes on corrupted data.
     */
    const refreshContent = useCallback(() => {
        try {
            // Core Entities
            setWingsState(contentStorage.getWings());
            setTeamState(contentStorage.getTeam());
            setTimelineState(contentStorage.getTimeline());
            setPartnershipsState(contentStorage.getPartnerships());
            setProjectsState(contentStorage.getProjects());
            setTechStackState(contentStorage.getTechStack());
            setRoadmapState(contentStorage.getRoadmap());

            // Page Content
            setHomeContentState(contentStorage.getHomeContent());
            setCompanyContentState(contentStorage.getCompanyContent());
            setInnovationContentState(contentStorage.getInnovationContent());

            // Config
            setSiteSettingsState(configStorage.getSiteSettings());
            setContactConfigState(configStorage.getContactConfig());
        } catch (error) {
            console.error("CRITICAL: Failed to refresh content context.", error);
            // Optionally set error state here if UI needs to show a fallback
        }
    }, []);

    // Initial Data Load
    useEffect(() => {
        refreshContent();
    }, [refreshContent]);

    // --- Wrapped Setters (Update State + Persist) ---
    // These functions allow components to update data without worrying about persistence.

    const setWings = (newWings: Wing[]) => {
        setWingsState(newWings);
        contentStorage.saveWings(newWings);
    };

    const setTeam = (newTeam: TeamMember[]) => {
        setTeamState(newTeam);
        contentStorage.saveTeam(newTeam);
    };

    const setTimeline = (newTimeline: Milestone[]) => {
        setTimelineState(newTimeline);
        contentStorage.saveTimeline(newTimeline);
    };

    const setPartnerships = (newPartnerships: Partnership[]) => {
        setPartnershipsState(newPartnerships);
        contentStorage.savePartnerships(newPartnerships);
    };

    const setProjects = (newProjects: any[]) => {
        setProjectsState(newProjects);
        contentStorage.saveProjects(newProjects);
    };

    const setTechStack = (newItems: TechStackItem[]) => {
        setTechStackState(newItems);
        contentStorage.saveTechStack(newItems);
    };

    const setRoadmap = (newItems: RoadmapItem[]) => {
        setRoadmapState(newItems);
        contentStorage.saveRoadmap(newItems);
    };

    const setHomeContent = (newContent: any) => {
        setHomeContentState(newContent);
        contentStorage.saveHomeContent(newContent);
    };

    const setCompanyContent = (newContent: any) => {
        setCompanyContentState(newContent);
        contentStorage.saveCompanyContent(newContent);
    };

    const setInnovationContent = (newContent: any) => {
        setInnovationContentState(newContent);
        contentStorage.saveInnovationContent(newContent);
    };

    const setSiteSettings = (newSettings: configStorage.SiteSettings) => {
        setSiteSettingsState(newSettings);
        configStorage.saveSiteSettings(newSettings);
    };

    const setContactConfig = (newConfig: configStorage.ContactConfig) => {
        setContactConfigState(newConfig);
        configStorage.saveContactConfig(newConfig);
    };

    return (
        <ContentContext.Provider value={{
            wings, setWings,
            team, setTeam,
            timeline, setTimeline,
            partnerships, setPartnerships,
            projects, setProjects,
            techStack, setTechStack,
            roadmap, setRoadmap,
            homeContent, setHomeContent,
            companyContent, setCompanyContent,
            innovationContent, setInnovationContent,
            siteSettings, setSiteSettings,
            contactConfig, setContactConfig,
            refreshContent
        }}>
            {children}
        </ContentContext.Provider>
    );
};

/**
 * Hook to consume the Content Context.
 * @throws {Error} If used outside of a ContentProvider.
 * @returns {ContentContextType} The context data and actions.
 */
export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
