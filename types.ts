import { LucideIcon } from 'lucide-react';

export interface Wing {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  techStack: string[];
  features: string[];
  teamName?: string;
  teamLogo?: string;
  teamSubtitle?: string;
  teamPurpose?: string;
  teamTimeline?: Array<{
    year: string;
    event: string;
  }>;
  teamAchievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Software' | 'Security' | 'Robotics' | 'Consultancy';
  client: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Partnership {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  since: string;
}


// Link Center Types
export interface ShortenedLink {
  id: string;
  originalUrl: string;
  slug: string;
  shortUrl: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;

  // Access Controls
  password?: string;
  waitingTime: number; // seconds
  maxVisits?: number;
  currentVisits: number;
  accessTimeRange?: {
    start: string;
    end: string;
  };

  // Analytics
  analytics: LinkAnalytics;
}

export interface LinkAnalytics {
  totalVisits: number;
  uniqueVisitors: number;
  referrers: Record<string, number>;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  visitHistory: VisitRecord[];
}

export interface VisitRecord {
  timestamp: string;
  referrer: string;
  userAgent: string;
  ipHash?: string;
}

export interface LinkFormData {
  originalUrl: string;
  customSlug?: string;
  expirationType: 'never' | 'date' | 'duration';
  expirationDate?: string;
  expirationDuration?: number; // hours
  password?: string;
  waitingTime: number;
  maxVisits?: number;
  accessTimeRange?: {
    start: string;
    end: string;
  };
}

export type Theme = 'light' | 'dark';

// Content Management Types
export interface TechStackItem {
  id: string;
  name: string;
  version: string;
  status: string;
  iconName: string; // Lucide icon name
  color: string; // Tailwind color class
  order: number;
}

export interface RoadmapItem {
  id: string;
  refId: string;
  quarter: string;
  title: string;
  description: string;
  progress: number;
  status: 'IN_PROGRESS' | 'INITIAL_CONCEPT' | 'SCHEDULED' | 'HYPOTHETICAL';
  colorTheme: string;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Software' | 'Security' | 'Robotics' | 'Consultancy';
  client: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string; // URL or base64
  createdAt: string;
}