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
    isLoading: boolean;
    error: string | null;

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
    portfolioContent: any;
    setPortfolioContent: (content: any) => void;
    innovationContent: any;
    setInnovationContent: (content: any) => void;

    // --- Configuration & Settings ---
    siteSettings: configStorage.SiteSettings;
    setSiteSettings: (settings: configStorage.SiteSettings) => void;
    contactConfig: configStorage.ContactConfig;
    setContactConfig: (config: configStorage.ContactConfig) => void;

    // --- Actions ---
    /**
     * Re-fetches all data from backend API.
     */
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// ----------------------------------------------------------------------
// PROVIDER COMPONENT
// ----------------------------------------------------------------------

/**
 * Global provider for application content and state.
 * Loads initial data from DB and syncs changes via API.
 */
export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // --- State Initialization ---
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [wings, setWingsState] = useState<Wing[]>([]);
    const [team, setTeamState] = useState<TeamMember[]>([]);
    const [timeline, setTimelineState] = useState<Milestone[]>([]);
    const [partnerships, setPartnershipsState] = useState<Partnership[]>([]);
    const [projects, setProjectsState] = useState<any[]>([]);
    const [techStack, setTechStackState] = useState<TechStackItem[]>([]);
    const [roadmap, setRoadmapState] = useState<RoadmapItem[]>([]);

    const [homeContent, setHomeContentState] = useState<any>({});
    const [companyContent, setCompanyContentState] = useState<any>({});
    const [portfolioContent, setPortfolioContentState] = useState<any>({});
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
     * Loads all content from API into state.
     */
    const refreshContent = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [
                wingsData,
                teamData,
                timelineData,
                partnershipsData,
                projectsData,
                techStackData,
                roadmapData,
                homeData,
                companyData,
                portfolioData,
                innovationData
            ] = await Promise.all([
                contentStorage.fetchWings(),
                contentStorage.fetchTeam(),
                contentStorage.fetchTimeline(),
                contentStorage.fetchPartnerships(),
                contentStorage.fetchProjects(),
                contentStorage.fetchTechStack(),
                contentStorage.fetchRoadmap(),
                contentStorage.fetchHomeContent(),
                contentStorage.fetchCompanyContent(),
                contentStorage.fetchPortfolioContent(),
                contentStorage.fetchInnovationContent()
            ]);

            setWingsState(wingsData);
            setTeamState(teamData);
            setTimelineState(timelineData);
            setPartnershipsState(partnershipsData);
            setProjectsState(projectsData);
            setTechStackState(techStackData);
            setRoadmapState(roadmapData);

            setHomeContentState(homeData);
            setCompanyContentState(companyData);
            setPortfolioContentState(portfolioData);
            setInnovationContentState(innovationData);

            // Config is still local for now or separately managed? 
            // The API endpoints for config exist in index.js but contentStorage doesn't wrap them yet.
            // Keeping config local/legacy for this step as prompt focused on "content".
            // TODO: Move config to DB as well.
            setSiteSettingsState(configStorage.getSiteSettings());
            setContactConfigState(configStorage.getContactConfig());

        } catch (error) {
            console.error("CRITICAL: Failed to load content from API.", error);
            setError("Failed to load content. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial Data Load
    useEffect(() => {
        refreshContent();
    }, [refreshContent]);

    // --- Wrapped Setters (Update State + Persist to API) ---

    const setWings = (newWings: Wing[]) => {
        setWingsState(newWings);
        contentStorage.updateWings(newWings).catch(err => console.error("Failed to save wings", err));
    };

    const setTeam = (newTeam: TeamMember[]) => {
        setTeamState(newTeam);
        contentStorage.updateTeam(newTeam).catch(err => console.error("Failed to save team", err));
    };

    const setTimeline = (newTimeline: Milestone[]) => {
        setTimelineState(newTimeline);
        contentStorage.updateTimeline(newTimeline).catch(err => console.error("Failed to save timeline", err));
    };

    const setPartnerships = (newPartnerships: Partnership[]) => {
        setPartnershipsState(newPartnerships);
        contentStorage.updatePartnerships(newPartnerships).catch(err => console.error("Failed to save partnerships", err));
    };

    const setProjects = (newProjects: any[]) => {
        setProjectsState(newProjects);
        contentStorage.updateProjects(newProjects).catch(err => console.error("Failed to save projects", err));
    };

    const setTechStack = (newItems: TechStackItem[]) => {
        setTechStackState(newItems);
        contentStorage.updateTechStack(newItems).catch(err => console.error("Failed to save tech stack", err));
    };

    const setRoadmap = (newItems: RoadmapItem[]) => {
        setRoadmapState(newItems);
        contentStorage.updateRoadmap(newItems).catch(err => console.error("Failed to save roadmap", err));
    };

    const setHomeContent = (newContent: any) => {
        setHomeContentState(newContent);
        contentStorage.updateHomeContent(newContent).catch(err => console.error("Failed to save home content", err));
    };

    const setCompanyContent = (newContent: any) => {
        setCompanyContentState(newContent);
        contentStorage.updateCompanyContent(newContent).catch(err => console.error("Failed to save company content", err));
    };

    const setPortfolioContent = (newContent: any) => {
        setPortfolioContentState(newContent);
        contentStorage.updatePortfolioContent(newContent).catch(err => console.error("Failed to save portfolio content", err));
    };

    const setInnovationContent = (newContent: any) => {
        setInnovationContentState(newContent);
        contentStorage.updateInnovationContent(newContent).catch(err => console.error("Failed to save innovation content", err));
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
            isLoading, error,
            wings, setWings,
            team, setTeam,
            timeline, setTimeline,
            partnerships, setPartnerships,
            projects, setProjects,
            techStack, setTechStack,
            roadmap, setRoadmap,
            homeContent, setHomeContent,
            companyContent, setCompanyContent,
            portfolioContent, setPortfolioContent,
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
