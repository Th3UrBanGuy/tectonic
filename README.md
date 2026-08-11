# Techtonic — Enterprise Digital Platform

> **Architecting Tomorrow's Infrastructure**

Techtonic is a premium, production-grade enterprise platform built with Next.js 16, Tailwind CSS v4, Prisma ORM, and Neon PostgreSQL. It serves as the official digital presence for a technology enterprise specializing in software development, robotics & automation, and consultancy services.

---

## Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Admin Panel](#admin-panel)
- [SEO System](#seo-system)
- [Deployment](#deployment)
- [Development](#development)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (SPA)                       │
│  ThemeContext ─── AuthContext ─── ContentContext          │
│       │              │                  │                │
│  ThemeProvider   AuthProvider      ContentProvider       │
│       │              │                  │                │
│       └──────────────┴──────────────────┘                │
│                    AppShell                              │
│              ┌───────┴────────┐                          │
│           Navbar        DashboardLayout                  │
│           Footer         Sidebar                         │
│      ContactTopBar       Tabs                           │
└──────────────────────┬──────────────────────────────────┘
                       │  fetch()
┌──────────────────────┴──────────────────────────────────┐
│                   Next.js 16 App Router                  │
│                  (Server + Client Components)            │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              API Routes (16 endpoints)           │    │
│  │  /api/auth/*    /api/content/*   /api/links     │    │
│  │  /api/contact/* /api/chat/*      /api/og        │    │
│  │  /api/certification-gallery     /api/go/[slug]  │    │
│  └──────────────────────┬──────────────────────────┘    │
│                         │                                │
│  ┌──────────────────────┴──────────────────────────┐    │
│  │              Prisma ORM                          │    │
│  │         Neon PostgreSQL (Serverless)             │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| App Router (not Pages) | Server components for SEO metadata, RSC streaming, route handlers |
| Client wrappers per page | Each page exports `generateMetadata` (server) + renders `"use client"` wrapper |
| ContentContext as master store | Single batch fetch from `/api/content/all`, 60s localStorage cache, optimistic UI |
| DB as single source of truth | All content managed via admin → DB, no static data files |
| ISR for pSEO pages | `revalidate: 3600` on 8×8 = 64 industry×service pages |
| force-dynamic on main pages | DB queried at request time for fresh content |

---

## Tech Stack

### Core
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.x | React framework (App Router) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first CSS |

### Backend
| Technology | Purpose |
|-----------|---------|
| Prisma ORM | Database access layer |
| Neon PostgreSQL | Serverless PostgreSQL database |
| bcryptjs | Password hashing (cost 12) |
| jsonwebtoken | JWT authentication (HS256) |

### UI
| Technology | Purpose |
|-----------|---------|
| Framer Motion | Animations & page transitions |
| Lucide React | Icon system (100+ icons) |
| Recharts | Dashboard charts |
| Sonner | Toast notifications |
| Radix UI | Accessible primitives |

### SEO & Analytics
| Technology | Purpose |
|-----------|---------|
| Google Analytics 4 | Traffic analytics (`G-2TX572FMD6`) |
| Google Search Console | Search performance |
| Ahrefs Analytics | Backlink & SEO analytics |
| Vercel Speed Insights | Core Web Vitals monitoring |
| Schema.org JSON-LD | Structured data (Organization, WebSite, BreadcrumbList, etc.) |

### Deployment
| Technology | Purpose |
|-----------|---------|
| Vercel | Primary deployment target |
| Docker | Containerized deployment |
| Caddy | Reverse proxy (self-hosted) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **Bun** (recommended) or npm
- **Neon PostgreSQL** account (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/Th3UrBanGuy/tectonic.git
cd tectonic
bun install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment Variables](#environment-variables)).

### 3. Initialize Database

```bash
bun run db:push      # Push Prisma schema to Neon
bun run seed:db      # Seed admin user + sample data
bun run seed:sections # Seed 33 section visibility records
```

### 4. Start Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 5. Admin Login

Navigate to `/login` and use credentials from `.env` (default: `admin@techtonic.dev` / seed password).

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon PostgreSQL connection string |
| `JWT_SECRET` | ✅ | JWT signing secret (min 32 chars) |
| `CONTACT_EMAIL` | ✅ | Contact form recipient email |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production site URL |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | ❌ | Google Search Console token |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | ❌ | GA4 measurement ID |
| `NEXT_PUBLIC_AHREFS_ANALYTICS_KEY` | ❌ | Ahrefs Analytics key |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, JsonLd, SpeedInsights)
│   ├── page.tsx                  # Home (force-dynamic)
│   ├── not-found.tsx             # Custom 404
│   ├── sitemap.ts                # Dynamic XML sitemap
│   ├── robots.ts                 # Dynamic robots.txt
│   ├── globals.css               # Global styles + CSS variables
│   ├── [industry]/page.tsx       # pSEO industry landing (ISR)
│   ├── [industry]/[service]/     # pSEO service landing (ISR)
│   ├── portfolio/[id]/           # Project detail
│   ├── api/                      # API routes (16 endpoints)
│   └── *Client.tsx               # Client wrappers for each page
│
├── components/                   # Next.js app-level components
│   ├── AppShell.tsx              # Theme + Auth + Content providers
│   ├── JsonLd.tsx                # Structured data (Organization, WebSite, NavElement)
│   ├── Breadcrumbs.tsx           # Breadcrumb nav with JSON-LD
│   └── ServiceLanding.tsx        # pSEO landing page template
│
├── lib/                          # Server-side utilities
│   ├── auth.ts                   # JWT + password utilities
│   ├── db.ts                     # Prisma client singleton
│   ├── seo.ts                    # Dynamic SEO metadata from DB
│   └── utils-jsonld.ts           # safeJsonLd() XSS prevention
│
└── tectonic/                     # Core SPA codebase
    ├── components/
    │   ├── ThemeContext.tsx       # Light/dark theme
    │   ├── AuthContext.tsx        # JWT auth state
    │   ├── ContentContext.tsx     # Master content store
    │   ├── Loader.tsx             # Premium glass shimmer loader
    │   ├── layout/                # Navbar, Footer, ContactTopBar, TectonicLogo
    │   ├── home/                  # HeroTitle, WhatWeDeliver, ThreeDBackground, LightParticles
    │   ├── ui/                    # 17 reusable UI components
    │   └── dashboard/             # 27 admin panel components
    ├── pages/                     # Page components (Home, Company, Contact, etc.)
    ├── services/                  # contentStorage, auth, configStorage
    ├── data/                      # Static data (wings, projects, team, timeline)
    └── types.ts                   # TypeScript type definitions
```

---

## Database Schema

### Core Models

| Model | Fields | Purpose |
|-------|--------|---------|
| **User** | id, name, email, password, role, avatarUrl, createdAt | Admin users |
| **ContactSubmission** | id, name, email, subject, message, phone, status, createdAt | Contact form |
| **ShortLink** | id, slug, url, password, maxVisits, expiresAt, active, visits, createdAt | URL shortener |
| **LinkVisit** | id, linkId, ip, userAgent, referer, createdAt | Visit analytics |
| **ChatThread** | id, userId, title, createdAt | Support chat threads |
| **ChatMessage** | id, threadId, sender, content, createdAt | Chat messages |
| **Industry** | id, name, slug, description, metaTitle, metaDescription, icon, orderIndex | pSEO industries |
| **ServicePage** | id, industryId, serviceSlug, pageTitle, metaTitle, metaDescription, heroTitle, heroDescription, bodyContent, features, techStack, ctaText, ctaLink, imageUrl, active | pSEO service pages |
| **CertificationGallery** | id, title, issuer, date, description, imageUrl, linkUrl, category, orderIndex, active | Certificate gallery |
| **CompanyStat** | id, label, value, suffix, iconName, orderIndex | Company metrics |
| **CompanyMission** | id, mission, vision, values | Mission statement |
| **Timeline** | id, title, description, iconName, orderIndex | Company milestones |
| **TechEcosystem** | id, name, version, status, iconName, colorClass | Tech stack items |
| **RoadmapItem** | id, refId, quarter, title, description, progress, status, colorClass | Roadmap milestones |
| **Partner** | id, name, logoUrl, type, orderIndex | Business partners |
| **PageSEO** | id, routePath, metaTitle, metaDescription, ogImage, keywords, noIndex | Per-page SEO |
| **SiteSetting** | id, key, value | Site-wide settings (JSON) |
| **SectionVisibility** | id, sectionKey, visible, page | Section toggle state |

### JSON Content Fields (stored in SiteSetting)

| Key | Content |
|-----|---------|
| `wings` | Wing array (id, name, tagline, description, team, tech, features) |
| `projects` | Portfolio projects (title, category, client, challenge/solution/impact, image) |
| `team` | Leadership team (name, role, bio, image, website) |
| `partnerships` | Partners (name, logo, type) |
| `homeContent` | Home page hero, services, testimonials |
| `companyContent` | Company page sections, certifications |
| `portfolioContent` | Portfolio page configuration |
| `contactConfig` | Contact page topbar, form settings |

---

## API Reference

### Authentication

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | Login, returns JWT |
| `/api/auth/verify` | GET | Token | Verify JWT validity |
| `/api/auth/count` | GET | No | User count (lightweight) |
| `/api/auth/profile` | GET/PUT | Bearer | Get/update user profile |
| `/api/auth/avatar` | POST/DELETE | Bearer | Upload/remove avatar |
| `/api/auth/change-password` | POST | Bearer | Change password |
| `/api/auth/users` | GET/POST/PUT/DELETE | Bearer | CRUD admin users |

### Content

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/content?type={type}` | GET | No | Fetch content by type |
| `/api/content?type={type}` | PUT | Admin | Update content by type |
| `/api/content/all` | GET | No | All content in single request |

### Public

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/contact` | POST | No | Submit contact form |
| `/api/og` | GET | No | Dynamic OG image generation |
| `/api/go/{slug}` | GET | No | Short link redirect |

### Admin

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/contact/{id}` | PATCH/DELETE | Middleware | Manage inquiries |
| `/api/links` | GET/POST/PUT/DELETE | Bearer | CRUD short links |
| `/api/chat/threads` | GET/POST/DELETE | Bearer | Chat threads |
| `/api/chat/messages` | GET/POST | Bearer | Chat messages |
| `/api/certification-gallery` | GET/POST/PUT/DELETE | Admin | Gallery CRUD |

---

## Admin Panel

### Access

- URL: `/login`
- Default credentials: Set in seed script or create via API

### Dashboard Tabs

| Tab | Purpose |
|-----|---------|
| **Overview** | Stats cards, link visit chart, system status |
| **Operatives** | Admin user CRUD (name, email, role, password) |
| **Inquiries** | Contact form submissions management |
| **Content** | 14 sub-tabs for all site content |
| **Visibility** | Toggle 33 sections on/off per page |
| **Link Center** | URL shortener with analytics |
| **Messages** | Internal chat system |
| **SEO** | SEO health dashboard + page metadata editor |
| **Docs & Guides** | Built-in documentation (7 sections) |
| **Settings** | Profile, password, notifications, appearance |

### Content Management (14 Sub-Tabs)

| Sub-Tab | What It Manages |
|---------|----------------|
| Innovation | Tech stack items + roadmap milestones |
| Portfolio | Project cards (title, category, challenge/solution/impact) |
| Wings | Department/division cards (team, tech, features) |
| Team | Leadership team profiles |
| Partners | Business partner logos |
| Certs & Awards | Company achievements + wing milestones |
| Cert Gallery | Certificate images with upload/link |
| Stats | Company metrics (label, value, suffix, icon) |
| Timeline | Company milestone entries |
| Industries | pSEO industry definitions |
| Home Content | Home page hero, services, testimonials |
| Company Content | Company page sections |
| Portfolio Content | Portfolio page configuration |
| Site Settings | Site name, contact info, social links, maintenance mode |

### Section Visibility (33 Sections)

**Layout:** topbar, navbar, navHome, navWings, navPortfolio, navCompany, navContact, navDashboard, footer, footerEcosystem, footerCompany, footerConnect, footerCopyright

**Home:** hero, deliver, wings, projects, techStack, roadmap, partners

**Company:** hero, stats, mission, leadership, certifications, certGallery, timeline

**Portfolio:** hero, projects

**Wings:** hero, grid

**Contact:** hero, form

---

## SEO System

### Structured Data (JSON-LD)

Every page includes Schema.org JSON-LD:

- **Root layout:** Organization (sameAs, ContactPoint, areaServed), WebSite (SearchAction), SiteNavigationElement
- **Industry pages:** CollectionPage + ItemList of services + BreadcrumbList
- **Service pages:** Service + BreadcrumbList
- **Portfolio detail:** Article (datePublished, dateModified)
- **All pages:** BreadcrumbList navigation

### Programmatic SEO (pSEO)

8 industries × 8 services = **64 landing pages** with ISR (revalidate: 3600s):

| Industry | Services |
|----------|----------|
| Retail, Healthcare, Education, Manufacturing, Finance, Automotive, Real Estate, Logistics | Web Apps, Mobile Apps, SaaS, AI Integration, Cloud/DevOps, UI/UX Design, API Development, Data Engineering |

Each page has: unique meta title/description, hero section, body content, features list, tech stack, CTA.

### Meta Tags

- Dynamic `generateMetadata` on every page route
- OG images (dynamic via `/api/og`)
- Twitter Card meta tags
- Canonical URLs
- Google Search Console verification
- Ahrefs site verification

### Sitemap & Robots

- **sitemap.ts:** Dynamic — includes static pages, portfolio projects, industries, service pages
- **robots.ts:** Dynamic — allows `/`, disallows `/dashboard`, `/login`, `/api/`

---

## Deployment

### Vercel (Recommended)

```bash
bun install -g vercel
vercel --prod
```

Set environment variables in Vercel Dashboard.

### Docker

```bash
docker build -t techtonic .
docker run -p 3000:3000 techtonic
```

### Self-Hosted

```bash
bun run build
bun run start
```

Use Caddy/Nginx as reverse proxy.

---

## Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build |
| `bun run start` | Start production server |
| `bun run lint` | ESLint |
| `bun run db:push` | Push schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run migrations |
| `bun run db:reset` | Reset database |
| `bun run seed:db` | Seed admin + sample data |
| `bun run seed:sections` | Seed 33 section visibility records |

### Code Conventions

- All tectonic/ components are `"use client"` (SPA pattern)
- Page files are server components (for `generateMetadata`)
- Client wrappers bridge server → client rendering
- Content managed via `useContent()` context (single source of truth)
- Auth tokens stored in `localStorage` as `techtonic_auth_token`
- API calls use Bearer token authentication
- CSS variables for theming (`--bg`, `--surface`, `--text`, `--brand`)
- Glassmorphism + claymorphism design system

### Git Workflow

```bash
# Feature branch
git checkout -b feature/my-feature
git add .
git commit -m "feat: description"
git push origin feature/my-feature

# Merge to main
git checkout main
git merge feature/my-feature
git push origin main
```

---

## License

Proprietary — Techtonic Enterprise. All rights reserved.
