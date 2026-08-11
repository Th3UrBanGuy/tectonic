# Product Overview
## Techtonic Enterprise Digital Platform

---

## What is Techtonic?

Techtonic is a full-stack enterprise digital platform that serves as the official web presence for a technology enterprise. It combines a premium public website, a comprehensive admin CMS, and real-time analytics into a single, cohesive system.

---

## Core Features

### 1. Public Website
A premium, responsive website with glassmorphism + claymorphism design.

**Pages:**
- **Home** - Hero section, service highlights, tech stack, roadmap, partners
- **Company** - Mission/vision, leadership team, certifications, timeline
- **Portfolio** - Project showcase with detailed case studies
- **Wings** - Department/division showcase (Codex, Robo)
- **Contact** - Contact form with real-time submission

**Design System:**
- Light/dark theme with CSS custom properties
- Framer Motion spring physics animations
- Responsive across all devices
- Custom 404 page with theme support
- Premium glass shimmer loader

### 2. Programmatic SEO (pSEO)
64 automatically generated landing pages for maximum search visibility.

**8 Industries:**
Retail, Healthcare, Education, Manufacturing, Finance, Automotive, Real Estate, Logistics

**8 Services per Industry:**
Web Apps, Mobile Apps, SaaS Platforms, AI Integration, Cloud/DevOps, UI/UX Design, API Development, Data Engineering

**Each page includes:**
- Unique meta title and description
- Custom hero section
- Feature list and tech stack
- Call-to-action
- Breadcrumb navigation with JSON-LD
- ISR revalidation every hour

### 3. Admin CMS
A comprehensive content management system with 27 dashboard components.

**Dashboard Tabs:**
| Tab | What It Does |
|-----|-------------|
| Overview | Stats, charts, system status |
| Operatives | Manage admin users |
| Inquiries | Contact form submissions |
| Content | 14 sub-tabs for all content |
| Visibility | Toggle 33 sections on/off |
| Link Center | URL shortener + analytics |
| Messages | Internal chat |
| SEO | Health dashboard + metadata |
| Docs | Built-in documentation |
| Settings | Profile, password, theme |

**Content Management (14 Sub-Tabs):**
1. Innovation - Tech stack + roadmap
2. Portfolio - Project cards
3. Wings - Department cards
4. Team - Leadership profiles
5. Partners - Business partners
6. Certs & Awards - Company achievements
7. Cert Gallery - Certificate images
8. Stats - Company metrics
9. Timeline - Milestone entries
10. Industries - pSEO industry defs
11. Home Content - Home page config
12. Company Content - Company page config
13. Portfolio Content - Portfolio page config
14. Site Settings - Global settings

### 4. URL Shortener (Link Center)
Create short links with analytics tracking.

**Features:**
- Custom slugs or auto-generated
- Password-protected links
- Visit limits and expiration dates
- Visit analytics (count, IP, user-agent, referer)
- Copy-to-clipboard one-click sharing

### 5. Contact System
Contact form with inquiry pipeline.

**Features:**
- Form validation
- Email notification
- Status tracking (new/read/replied/archived)
- Admin inquiry management

### 6. Analytics Integration
Real-time tracking across four platforms.

| Platform | What It Tracks |
|----------|---------------|
| Google Analytics 4 | Traffic, user behavior, conversions |
| Google Search Console | Search performance, indexing |
| Ahrefs Analytics | Backlinks, SEO health |
| Vercel Speed Insights | Core Web Vitals (LCP, FID, CLS) |

### 7. SEO Infrastructure
Comprehensive SEO on every page.

**Structured Data (JSON-LD):**
- Organization (sameAs, ContactPoint, areaServed)
- WebSite (SearchAction)
- SiteNavigationElement (all nav links)
- BreadcrumbList (navigation)
- Service (pSEO pages)
- Article (portfolio detail)

**Technical SEO:**
- Dynamic XML sitemap
- Dynamic robots.txt
- Canonical URLs
- OG images (dynamic generation)
- Twitter Card meta tags
- Google Search Console verification
- Ahrefs site verification

### 8. Section Visibility
Toggle any section on/off from the admin panel.

**33 Toggleable Sections:**
- Layout: topbar, navbar, 7 nav items, footer sections (13)
- Home: hero, deliver, wings, projects, techStack, roadmap, partners (7)
- Company: hero, stats, mission, leadership, certifications, certGallery, timeline (7)
- Portfolio: hero, projects (2)
- Wings: hero, grid (2)
- Contact: hero, form (2)

### 9. Certificate Gallery
Upload certificate images or add verification links.

**Features:**
- Image upload via multipart FormData
- External verification links
- Category filtering (certification/award/license/completion)
- Order management
- Active/inactive toggle
- Lightbox preview on public site

---

## Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI | React 19, Tailwind CSS 4 |
| Animations | Framer Motion 12 |
| Database | Neon PostgreSQL (serverless) |
| ORM | Prisma 6 |
| Auth | JWT (HS256) + bcryptjs |
| Icons | Lucide React |
| Charts | Recharts |
| Deployment | Vercel / Docker / Self-hosted |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| DATABASE_URL | Yes | Neon PostgreSQL connection string |
| JWT_SECRET | Yes | JWT signing secret (min 32 chars) |
| CONTACT_EMAIL | Yes | Contact form recipient |
| NEXT_PUBLIC_SITE_URL | Yes | Production URL |
| NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION | No | GSC token |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | No | GA4 ID |
| NEXT_PUBLIC_AHREFS_ANALYTICS_KEY | No | Ahrefs key |

---

## API Endpoints Summary

| Category | Endpoints | Methods |
|----------|-----------|---------|
| Auth | 7 | POST, GET, PUT, DELETE |
| Content | 2 | GET, PUT |
| Public | 3 | POST, GET |
| Admin | 4 | GET, POST, PUT, DELETE, PATCH |
| **Total** | **16 routes** | **35 handlers** |

---

## Database Models

17 Prisma models covering:
- Users & Authentication (User)
- Content Management (SiteSetting, SectionVisibility, PageSEO)
- Programmatic SEO (Industry, ServicePage)
- Public Features (ShortLink, LinkVisit, ContactSubmission, CertificationGallery)
- Company Data (CompanyStat, CompanyMission, Timeline, Partner)
- Innovation (TechEcosystem, RoadmapItem)
- Communication (ChatThread, ChatMessage)

---

## Deployment Options

| Option | Best For |
|--------|----------|
| Vercel | Recommended, automatic deploys, ISR handled |
| Docker | Containerized deployments |
| Self-hosted | Full control, use Caddy/Nginx |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Time to Interactive | < 3.5s |
| Total Bundle Size | < 200KB gzipped |

---

## Security Features

- bcryptjs password hashing (cost 12)
- JWT authentication (HS256, 7-day expiry)
- Password policy (8+ chars, complexity)
- Route protection via Middleware
- XSS prevention (safeJsonLd)
- SQL injection prevention (Prisma parameterized queries)
- Production JWT_SECRET length validation
