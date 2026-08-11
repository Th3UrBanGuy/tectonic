"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as contentStorage from '../services/contentStorage';
import * as configStorage from '../services/configStorage';
import { Wing, TeamMember, Milestone, Partnership, TechStackItem, RoadmapItem } from '../types';

// ----------------------------------------------------------------------
// TYPES & INTERFACES
// ----------------------------------------------------------------------

interface ContentContextType {
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
    techStack: TechStackItem[];
    setTechStack: (items: TechStackItem[]) => void;
    roadmap: RoadmapItem[];
    setRoadmap: (items: RoadmapItem[]) => void;
    companyStats: any[];
    setCompanyStats: (items: any[]) => void;
    homeContent: any;
    setHomeContent: (content: any) => void;
    companyContent: any;
    setCompanyContent: (content: any) => void;
    portfolioContent: any;
    setPortfolioContent: (content: any) => void;
    innovationContent: any;
    setInnovationContent: (content: any) => void;
    certificationGallery: any[];
    setCertificationGallery: (items: any[]) => void;
    siteSettings: configStorage.SiteSettings;
    setSiteSettings: (settings: configStorage.SiteSettings) => void;
    contactConfig: configStorage.ContactConfig;
    setContactConfig: (config: configStorage.ContactConfig) => void;
    sections: { page: string; section: string; label: string; visible: boolean; order: number }[];
    setSections: (sections: { page: string; section: string; label: string; visible: boolean; order: number }[]) => void;
    isSectionVisible: (page: string, section: string) => boolean;
    refreshContent: () => void;
    forceRefreshContent: () => Promise<void>;
    saveStatus: 'idle' | 'saving' | 'saved' | 'error';
    contentLoaded: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Cache key + TTL (60 seconds — instant repeat navigation, fresh enough for edits)
const CACHE_KEY = 'techtonic_all_content';
const CACHE_TTL = 60 * 1000; // 60 seconds

// ----------------------------------------------------------------------
// PROVIDER COMPONENT
// ----------------------------------------------------------------------

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wings, setWingsState] = useState<Wing[]>([]);
    const [team, setTeamState] = useState<TeamMember[]>([]);
    const [timeline, setTimelineState] = useState<Milestone[]>([]);
    const [partnerships, setPartnershipsState] = useState<Partnership[]>([]);
    const [projects, setProjectsState] = useState<any[]>([]);
    const [techStack, setTechStackState] = useState<TechStackItem[]>([]);
    const [roadmap, setRoadmapState] = useState<RoadmapItem[]>([]);
    const [companyStats, setCompanyStatsState] = useState<any[]>([]);

    const [homeContent, setHomeContentState] = useState<any>({});
    const [companyContent, setCompanyContentState] = useState<any>({});
    const [portfolioContent, setPortfolioContentState] = useState<any>({});
    const [innovationContent, setInnovationContentState] = useState<any>({});
    const [certificationGallery, setCertificationGalleryState] = useState<any[]>([]);

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

    const [contentLoaded, setContentLoaded] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
    const [sections, setSectionsState] = useState<{ page: string; section: string; label: string; visible: boolean; order: number }[]>([]);

    const isSectionVisible = useCallback((page: string, section: string) => {
        const s = sections.find((s) => s.page === page && s.section === section);
        return s ? s.visible : true; // default visible if not found
    }, [sections]);

    // Apply cached data to state (instant — from localStorage)
    const applyData = useCallback((data: any) => {
        if (!data) return;
        setWingsState(data.wings || []);
        setTeamState(data.team || []);
        setTimelineState(data.timeline || []);
        setPartnershipsState(data.partnerships || []);
        setProjectsState(data.projects || []);
        setTechStackState(data.techStack || []);
        setRoadmapState(data.roadmap || []);
        setCompanyStatsState(data.companyStats || []);
        setHomeContentState(data.homeContent || {});
        setCompanyContentState(data.companyContent || {});
        setPortfolioContentState(data.portfolioContent || {});
        setInnovationContentState(data.companyContent?.innovation || {});
        if (data.siteSettings) setSiteSettingsState(data.siteSettings);
        if (data.contactConfig) setContactConfigState(data.contactConfig);
        if (data.sections) setSectionsState(data.sections);
        if (data.certificationGallery) setCertificationGalleryState(data.certificationGallery);
        setContentLoaded(true);
    }, []);

    /**
     * SINGLE batch fetch — replaces 12 separate API calls.
     * Uses localStorage cache (60s TTL) for instant repeat navigation.
     */
    const refreshContent = useCallback(async () => {
        // Step 1: Try localStorage cache first (instant — 0ms)
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                const age = Date.now() - (parsed.fetchedAt || 0);
                if (age < CACHE_TTL) {
                    // Cache is fresh — use it instantly
                    applyData(parsed);
                    return;
                }
            }
        } catch { /* ignore */ }

        // Step 2: Fetch from DB via single batch endpoint (1 HTTP request instead of 12)
        try {
            const res = await fetch('/api/content/all');
            if (res.ok) {
                const data = await res.json();
                // Cache to localStorage for instant repeat navigation
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                } catch { /* localStorage might be full — ignore */ }
                applyData(data);
                return;
            }
        } catch { /* network error — fall through */ }

        // Step 3: Fallback — try stale cache even if expired
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                applyData(JSON.parse(cached));
                return;
            }
        } catch { /* ignore */ }

        // Step 4: No data available — mark as loaded (empty state)
        setContentLoaded(true);
    }, [applyData]);

    useEffect(() => {
        refreshContent();
    }, [refreshContent]);

    // Auto-refresh when user switches back to this tab (picks up admin changes)
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                try { localStorage.removeItem(CACHE_KEY); } catch {}
                refreshContent();
            }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [refreshContent]);

    // Force refresh — bypasses cache, always fetches from DB
    const forceRefreshContent = useCallback(async () => {
        try { localStorage.removeItem(CACHE_KEY); } catch {}
        try {
            const res = await fetch('/api/content/all');
            if (res.ok) {
                const data = await res.json();
                try { localStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
                applyData(data);
            }
        } catch {}
    }, [applyData]);

    // --- Wrapped Setters (Update State + Persist to DB + invalidate cache) ---

    const invalidateCache = () => {
        try { localStorage.removeItem(CACHE_KEY); } catch { /* ignore */ }
    };

    const setWings = async (newWings: Wing[]) => {
        setWingsState(newWings);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveWingsAsync(newWings);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setTeam = async (newTeam: TeamMember[]) => {
        setTeamState(newTeam);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveTeamAsync(newTeam);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setTimeline = async (newTimeline: Milestone[]) => {
        setTimelineState(newTimeline);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveTimelineAsync(newTimeline);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setPartnerships = async (newPartnerships: Partnership[]) => {
        setPartnershipsState(newPartnerships);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.savePartnershipsAsync(newPartnerships);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setProjects = async (newProjects: any[]) => {
        setProjectsState(newProjects);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveProjectsAsync(newProjects);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setTechStack = async (newItems: TechStackItem[]) => {
        setTechStackState(newItems);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveTechStackAsync(newItems);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setRoadmap = async (newItems: RoadmapItem[]) => {
        setRoadmapState(newItems);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveRoadmapAsync(newItems);
        setSaveStatus(ok ? 'saved' : 'error');
        if (!ok) setTimeout(() => refreshContent(), 1000);
    };

    const setHomeContent = async (newContent: any) => {
        setHomeContentState(newContent);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveHomeContentAsync(newContent);
        setSaveStatus(ok ? 'saved' : 'error');
    };

    const setCompanyContent = async (newContent: any) => {
        setCompanyContentState(newContent);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.saveCompanyContentAsync(newContent);
        setSaveStatus(ok ? 'saved' : 'error');
    };

    const setPortfolioContent = async (newContent: any) => {
        setPortfolioContentState(newContent);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await contentStorage.savePortfolioContentAsync(newContent);
        setSaveStatus(ok ? 'saved' : 'error');
    };

    const setInnovationContent = (newContent: any) => {
        setInnovationContentState(newContent);
        contentStorage.saveInnovationContent(newContent);
    };

    const setSiteSettings = async (newSettings: configStorage.SiteSettings) => {
        setSiteSettingsState(newSettings);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await configStorage.saveSiteSettingsAsync(newSettings);
        setSaveStatus(ok ? 'saved' : 'error');
    };

    const setContactConfig = async (newConfig: configStorage.ContactConfig) => {
        setContactConfigState(newConfig);
        invalidateCache();
        setSaveStatus('saving');
        const ok = await configStorage.saveContactConfigAsync(newConfig);
        setSaveStatus(ok ? 'saved' : 'error');
    };

    const setSections = async (newSections: { page: string; section: string; label: string; visible: boolean; order: number }[]) => {
        setSectionsState(newSections);
        invalidateCache();
        setSaveStatus('saving');
        try {
            const token = localStorage.getItem('techtonic_auth_token');
            const res = await fetch('/api/content?type=sections', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify({ type: 'sections', data: newSections }),
            });
            setSaveStatus(res.ok ? 'saved' : 'error');
        } catch {
            setSaveStatus('error');
        }
    };

    const setCertificationGallery = async (newItems: any[]) => {
        setCertificationGalleryState(newItems);
        invalidateCache();
        setSaveStatus('saving');
        try {
            const res = await fetch('/api/certification-gallery', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: newItems }),
            });
            setSaveStatus(res.ok ? 'saved' : 'error');
        } catch {
            setSaveStatus('error');
        }
    };

    const setCompanyStats = async (newStats: any[]) => {
        setCompanyStatsState(newStats);
        invalidateCache();
        setSaveStatus('saving');
        try {
            const token = localStorage.getItem('techtonic_auth_token');
            const res = await fetch('/api/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify({ type: 'companyStats', data: newStats }),
            });
            setSaveStatus(res.ok ? 'saved' : 'error');
        } catch {
            setSaveStatus('error');
        }
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
            companyStats, setCompanyStats,
            homeContent, setHomeContent,
            companyContent, setCompanyContent,
            portfolioContent, setPortfolioContent,
            innovationContent, setInnovationContent,
            siteSettings, setSiteSettings,
            contactConfig, setContactConfig,
            sections, setSections, isSectionVisible,
            certificationGallery, setCertificationGallery,
            refreshContent, forceRefreshContent,
            saveStatus,
            contentLoaded,
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
