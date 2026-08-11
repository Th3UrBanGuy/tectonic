# Software Development Plan (SDP)
## Techtonic Enterprise Digital Platform

**Version:** 1.0.0  
**Date:** August 2026  
**Status:** Production  

---

## 1. Executive Summary

Techtonic is a premium enterprise digital platform serving as the official web presence for a technology enterprise specializing in software development, robotics & automation, and consultancy services.

### 1.1 Objectives

- Deliver a premium, performant public website with glassmorphism/claymorphism design
- Implement programmatic SEO generating 64+ landing pages automatically
- Provide a full-featured admin CMS controlling all content with no gaps
- Integrate real-time analytics (GA4, Ahrefs, Vercel Speed Insights)
- Ensure sub-second page loads via ISR and streaming server components

### 1.2 Scope

| In Scope | Out of Scope |
|----------|-------------|
| Public website (6 pages + 64 pSEO pages) | E-commerce/payment processing |
| Admin CMS (27 components, 14 content tabs) | Native mobile apps |
| URL shortener with analytics | Multi-language i18n |
| Contact form with inquiry pipeline | Real-time chat (future) |
| SEO infrastructure (JSON-LD, sitemap, OG) | Third-party integrations beyond analytics |
| Certificate gallery with image upload | Video hosting |
| Section visibility toggles (33 sections) | A/B testing framework |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
CLIENT TIER (Browser)
  ThemeContext + AuthContext + ContentContext
  AppShell -> Navbar, Footer, ContactTopBar, DashboardLayout

SERVER TIER (Next.js 16 App Router)
  Middleware (route protection, JWT verification)
  API Routes (16 endpoints, 35 handler functions)
  Prisma ORM -> Neon PostgreSQL (Serverless)
```

### 2.2 Data Flow

```
User Action -> React Component -> ContentContext -> fetch(/api/content)
  -> Next.js Route Handler -> Prisma ORM Query -> Neon PostgreSQL
  -> Response -> Context Update -> UI Re-render
```

### 2.3 Caching Strategy

| Layer | Cache | TTL | Purpose |
|-------|-------|-----|---------|
| ContentContext | localStorage | 60s | Avoid refetch on navigation |
| ISR Pages | Vercel Edge | 3600s | pSEO page regeneration |
| API Routes | None | - | Fresh data on every request |

---

## 3. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x |
| CSS | Tailwind CSS | 4.x |
| Animations | Framer Motion | 12.x |
| ORM | Prisma | 6.x |
| Database | Neon PostgreSQL | Serverless |
| Auth | JWT (HS256) + bcryptjs | - |
| Icons | Lucide React | 0.525.x |
| Charts | Recharts | 2.x |

---

## 4. Database Schema (17 Models)

| Model | Purpose |
|-------|---------|
| User | Admin users with roles (admin/editor/viewer) |
| ContactSubmission | Contact form entries with status tracking |
| ShortLink | URL shortener with password/expiry support |
| LinkVisit | Visit analytics (IP, user-agent, referer) |
| ChatThread | Support chat threads |
| ChatMessage | Chat messages per thread |
| Industry | pSEO industry definitions |
| ServicePage | pSEO service pages (8x8=64 combinations) |
| CertificationGallery | Certificate images with upload/link |
| CompanyStat | Key metrics displayed on company page |
| CompanyMission | Mission, vision, values |
| Timeline | Company milestone entries |
| TechEcosystem | Tech stack items with versions |
| RoadmapItem | Roadmap milestones with progress |
| Partner | Business partner logos |
| PageSEO | Per-page SEO metadata |
| SiteSetting | Key-value site settings |
| SectionVisibility | Section toggle state (33 sections) |

---

## 5. API Endpoints (16 routes, 35 handlers)

### Authentication (7 routes)
- POST /api/auth/login - Login, returns JWT
- GET /api/auth/verify - Verify JWT validity
- GET /api/auth/count - Lightweight user count
- GET/PUT /api/auth/profile - Get/update profile
- POST/DELETE /api/auth/avatar - Upload/remove avatar
- POST /api/auth/change-password - Change password
- GET/POST/PUT/DELETE /api/auth/users - CRUD admin users

### Content (2 routes)
- GET/PUT /api/content?type={type} - Fetch/update by type
- GET /api/content/all - All content in single request

### Public (3 routes)
- POST /api/contact - Submit contact form
- GET /api/og - Dynamic OG image generation
- GET /api/go/{slug} - Short link redirect

### Admin (4 routes)
- PATCH/DELETE /api/contact/{id} - Manage inquiries
- GET/POST/PUT/DELETE /api/links - CRUD short links
- GET/POST/DELETE /api/chat/threads - Chat threads
- GET/POST /api/chat/messages - Chat messages
- GET/POST/PUT/DELETE /api/certification-gallery - Gallery CRUD

---

## 6. Security

| Measure | Implementation |
|---------|---------------|
| Password hashing | bcryptjs, cost factor 12 |
| Password policy | Min 8 chars, uppercase + lowercase + number |
| JWT signing | HS256 with 32+ char secret |
| Token expiry | 7 days |
| Production check | Middleware throws if JWT_SECRET < 32 chars |
| Route protection | Middleware for /dashboard/* and /api/* |
| XSS prevention | safeJsonLd() escapes HTML in JSON-LD |
| SQL injection | Prisma parameterized queries |

---

## 7. Performance

| Strategy | Implementation |
|----------|---------------|
| ISR | pSEO pages revalidate every 3600s |
| Force-dynamic | Main pages query DB at request time |
| ContentContext | 60s localStorage cache prevents refetch |
| Request dedup | MemberList 30s cache + deduplication |
| Async script loading | GA4, Ahrefs load async |
| Image optimization | next/image with remote patterns |
| Font optimization | next/font/google (Inter, Orbitron, Montserrat) |

---

## 8. SEO Infrastructure

| Feature | Implementation |
|---------|---------------|
| Meta tags | generateMetadata on every page |
| Structured data | JSON-LD (Organization, WebSite, BreadcrumbList, Service, Article) |
| Sitemap | Dynamic sitemap.ts (static + DB projects + industries + services) |
| Robots | Dynamic robots.ts (allows /, disallows /dashboard, /login, /api/) |
| OG images | Dynamic via /api/og |
| pSEO | 8 industries x 8 services = 64 pages with ISR |
| Breadcrumbs | Breadcrumb nav + BreadcrumbList JSON-LD |
| Canonical URLs | metadataBase + alternates.canonical |

---

## 9. Admin Panel Features

| Feature | Components |
|---------|-----------|
| Overview | Stats cards, link visit chart, system status |
| Operatives | Admin user CRUD with role management |
| Inquiries | Contact form submission pipeline |
| Content Management | 14 sub-tabs for all content types |
| Section Visibility | Toggle 33 sections on/off per page |
| Link Center | URL shortener with analytics |
| Messages | Internal chat system |
| SEO Dashboard | SEO health monitoring + page metadata |
| Docs & Guides | Built-in documentation (7 sections) |
| Settings | Profile, password, notifications, appearance |

---

## 10. Deployment

### Vercel (Recommended)
- Automatic deploys from GitHub
- Environment variables in Vercel Dashboard
- ISR handled by Vercel Edge Network

### Docker
```bash
docker build -t techtonic .
docker run -p 3000:3000 techtonic
```

### Self-Hosted
```bash
bun run build
bun run start
# Use Caddy/Nginx as reverse proxy
```

---

## 11. Development Workflow

```bash
# Setup
bun install
bun run db:push
bun run seed:db
bun run seed:sections

# Development
bun run dev        # Start dev server on port 3000

# Build & Deploy
bun run build      # Production build
bun run start      # Start production server
bun run lint       # ESLint

# Database
bun run db:push    # Push schema changes
bun run db:reset   # Reset database
bun run seed:db    # Seed sample data
```

---

## 12. File Structure Summary

```
src/
  app/              # 10 page routes, 16 API routes, sitemap, robots
  components/       # 4 app-level components (AppShell, JsonLd, Breadcrumbs, ServiceLanding)
  lib/              # 4 server utilities (auth, db, seo, utils-jsonld)
  tectonic/
    components/     # 48 components (layout, home, ui, dashboard)
    pages/          # 9 page components
    services/       # 3 services (contentStorage, auth, configStorage)
    data/           # Static data files
    types.ts        # TypeScript definitions
```
