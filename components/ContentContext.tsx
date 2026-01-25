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
    pages: any[];
    setPages: (pages: any[]) => void;
    menus: Record<string, any[]>;
    setMenus: (menus: Record<string, any[]>) => void;

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

    // V2 New State
    const [pages, setPagesState] = useState<any[]>([]);
    const [menus, setMenusState] = useState<Record<string, any[]>>({});

    const [homeContent, setHomeContentState] = useState<any>({});
    const [companyContent, setCompanyContentState] = useState<any>({});
    const [portfolioContent, setPortfolioContentState] = useState<any>({});
    const [innovationContent, setInnovationContentState] = useState<any>({});

    // ... (settings state logic remains same)

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
            // Note: contentStorage.fetchWings etc call individual endpoints.
            // But we actually have an aggregate endpoint /api/content (GET).
            // Usually we might want to use that for single request efficiency.
            // For now, let's assume contentStorage acts as a proxy or we keep this pattern.
            // Wait, the previous implementation used Promise.all on individual fetches.
            // BUT, my `api/content/index.js` handles the aggregate. 
            // If I look at `components/ContentContext.tsx` line 107+, it imports fetches.
            // `services/contentStorage.ts` fetch functions hit `/api/content/${type}`.
            // So we need to add fetchMenus and fetchPages to contentStorage first? 
            // OR simpler: Just hit the aggregate endpoint here and distribute! 
            // The previous code hitting individual endpoints is chatty. 
            // Let's switch to calling the aggregate endpoint we built!

            const response = await fetch('/api/content');
            const { content, config } = await response.json();

            setWingsState(content.wings || []);
            setTeamState(content.team || []);
            setTimelineState(content.timeline || []);
            setPartnershipsState(content.partnerships || []);
            setProjectsState(content.projects || []);
            setTechStackState(content.techStack || []);
            setRoadmapState(content.roadmap || []);

            setPagesState(content.pages || []);
            setMenusState(content.menus || {});

            setHomeContentState(content.homeContent || {});
            setCompanyContentState(content.companyContent || {});
            setPortfolioContentState(content.portfolioContent || {});
            setInnovationContentState(content.innovationContent || {});

            if (config) {
                setSiteSettingsState({
                    siteName: config.site_name || config.siteName,
                    siteTagline: config.site_tagline || config.siteTagline,
                    maintenanceMode: config.maintenanceMode === 'true' || config.maintenanceMode === true,
                    allowRegistration: config.allowRegistration === 'true' || config.allowRegistration === true,
                });
                setContactConfigState({
                    address: config.address,
                    contact: config.contact,
                    socials: config.socials
                });
            }

        } catch (error) {
            console.error("CRITICAL: Failed to load content from API.", error);
            setError("Failed to load content. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ... wrapped setters need to act on state ...
    const setPages = (p: any[]) => setPagesState(p); // TODO: Add persistence
    const setMenus = (m: Record<string, any[]>) => setMenusState(m); // TODO: Add persistence

    // ... existing setters ...

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
            pages, setPages,
            menus, setMenus,
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
