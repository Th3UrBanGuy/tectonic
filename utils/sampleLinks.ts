// Sample/prototype links for testing the Link Center interface
import { ShortenedLink } from '../types';

export const SAMPLE_LINKS: ShortenedLink[] = [
    {
        id: 'sample_1',
        originalUrl: 'https://github.com/techtonic/awesome-project',
        slug: 'github-repo',
        shortUrl: 'tech.link/github-repo',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
        isActive: true,
        waitingTime: 0,
        currentVisits: 1247,
        maxVisits: 5000,
        analytics: {
            totalVisits: 1247,
            uniqueVisitors: 892,
            referrers: {
                'twitter.com': 456,
                'linkedin.com': 234,
                'Direct': 312,
                'reddit.com': 145,
                'hackernews.com': 100,
            },
            devices: {
                desktop: 823,
                mobile: 324,
                tablet: 100,
            },
            visitHistory: Array.from({ length: 30 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
                referrer: ['twitter.com', 'linkedin.com', 'Direct', 'reddit.com'][Math.floor(Math.random() * 4)],
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
    {
        id: 'sample_2',
        originalUrl: 'https://docs.techtonic.io/api/v2/authentication',
        slug: 'api-docs',
        shortUrl: 'tech.link/api-docs',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        expiresAt: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000).toISOString(), // 27 days from now
        isActive: true,
        password: '', // Password removed for security
        waitingTime: 3,
        currentVisits: 456,
        analytics: {
            totalVisits: 456,
            uniqueVisitors: 234,
            referrers: {
                'Direct': 234,
                'google.com': 122,
                'stackoverflow.com': 100,
            },
            devices: {
                desktop: 389,
                mobile: 45,
                tablet: 22,
            },
            visitHistory: Array.from({ length: 20 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
                referrer: ['Direct', 'google.com', 'stackoverflow.com'][Math.floor(Math.random() * 3)],
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
    {
        id: 'sample_3',
        originalUrl: 'https://techtonic.io/promo/black-friday-2026',
        slug: 'bf-sale',
        shortUrl: 'tech.link/bf-sale',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        isActive: true,
        waitingTime: 5,
        currentVisits: 89,
        maxVisits: 100,
        analytics: {
            totalVisits: 89,
            uniqueVisitors: 67,
            referrers: {
                'facebook.com': 45,
                'instagram.com': 23,
                'Direct': 21,
            },
            devices: {
                desktop: 34,
                mobile: 45,
                tablet: 10,
            },
            visitHistory: Array.from({ length: 15 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 6 * 60 * 60 * 1000).toISOString(),
                referrer: ['facebook.com', 'instagram.com', 'Direct'][Math.floor(Math.random() * 3)],
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
    {
        id: 'sample_4',
        originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        slug: 'demo-video',
        shortUrl: 'tech.link/demo-video',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
        isActive: true,
        waitingTime: 0,
        currentVisits: 3421,
        analytics: {
            totalVisits: 3421,
            uniqueVisitors: 2134,
            referrers: {
                'twitter.com': 1234,
                'facebook.com': 876,
                'Direct': 654,
                'linkedin.com': 432,
                'reddit.com': 225,
            },
            devices: {
                desktop: 1567,
                mobile: 1654,
                tablet: 200,
            },
            visitHistory: Array.from({ length: 50 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString(),
                referrer: ['twitter.com', 'facebook.com', 'Direct', 'linkedin.com', 'reddit.com'][Math.floor(Math.random() * 5)],
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
    {
        id: 'sample_5',
        originalUrl: 'https://techtonic.io/careers/senior-developer',
        slug: 'join-us',
        shortUrl: 'tech.link/join-us',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Expired yesterday
        isActive: true,
        waitingTime: 0,
        currentVisits: 234,
        analytics: {
            totalVisits: 234,
            uniqueVisitors: 189,
            referrers: {
                'linkedin.com': 156,
                'indeed.com': 45,
                'Direct': 33,
            },
            devices: {
                desktop: 198,
                mobile: 28,
                tablet: 8,
            },
            visitHistory: Array.from({ length: 25 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
                referrer: ['linkedin.com', 'indeed.com', 'Direct'][Math.floor(Math.random() * 3)],
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
    {
        id: 'sample_6',
        originalUrl: 'https://techtonic.io/beta/new-feature',
        slug: 'beta-access',
        shortUrl: 'tech.link/beta-access',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        isActive: false, // Inactive
        password: '', // Password removed
        waitingTime: 10,
        currentVisits: 12,
        maxVisits: 50,
        analytics: {
            totalVisits: 12,
            uniqueVisitors: 12,
            referrers: {
                'Direct': 12,
            },
            devices: {
                desktop: 10,
                mobile: 2,
                tablet: 0,
            },
            visitHistory: Array.from({ length: 12 }, (_, i) => ({
                timestamp: new Date(Date.now() - i * 10 * 60 * 1000).toISOString(),
                referrer: 'Direct',
                userAgent: 'Mozilla/5.0...',
            })),
        },
    },
];

/**
 * Load sample links into localStorage
 */
export const loadSampleLinks = (): void => {
    localStorage.setItem('techtonic_links', JSON.stringify(SAMPLE_LINKS));
};

/**
 * Check if sample links should be loaded (first time user)
 */
export const shouldLoadSamples = (): boolean => {
    const existing = localStorage.getItem('techtonic_links');
    return !existing || existing === '[]';
};
