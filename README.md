# TECHTONIC

> **Architecting Tomorrow's Infrastructure** — A fully dynamic, database-driven enterprise platform with a powerful admin CMS.

[![Next.js](https://img.shields.io/badge/Next.js-16.x-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql)](https://neon.tech)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Database](#database)
- [Admin Panel](#admin-panel)
- [Security](#security)
- [API Reference](#api-reference)
- [Developer Documentation](#developer-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Overview

Techtonic is a modern enterprise web platform showcasing software development, robotics & automation, and consultancy services. The entire site — every piece of text, every wing, every project, every team member — is **100% database-driven** and editable from a powerful admin dashboard. No static data files. No hardcoded content. The database is the single source of truth.

### Key Highlights

- **Fully Dynamic CMS** — All content (wings, projects, team, partners, timeline, tech stack, roadmap, home page, company page, contact info, site settings) is stored in PostgreSQL and editable from the admin panel
- **Bullet-Fast Data Loading** — A single batch API endpoint fetches all content in one request with 60-second localStorage caching for instant page navigation
- **Skeleton Screens** — Animated skeleton placeholders make page loads feel instant
- **JWT Authentication** — Secure admin portal with bcrypt password hashing, rate limiting, and role-based access control
- **Security Hardened** — CSP headers, X-Frame-Options, rate limiting, input validation, admin-only API guards, and more
- **Responsive Design** — Mobile-first, dark/light theme, framer-motion animations
- **Multi-Platform Deployment** — Z.ai, Vercel, AWS (Docker), Railway, Heroku

---

## Features

### Public Site

| Feature | Description |
|---------|-------------|
| **Home** | Hero section, "WE DELIVER" cards, wings showcase, featured projects |
| **Wings** | Tabbed interface for each wing (Software, Robotics, etc.) with team details, capabilities, tech stack, timeline, achievements |
| **Portfolio** | Filterable project grid with case study detail pages |
| **Company** | Hero, stats, mission statement, leadership team, achievements |
| **Contact** | Multi-step stepper form with DB submission |
| **Theme Toggle** | Dark/light mode with localStorage persistence |

### Admin Dashboard

| Tab | Features |
|-----|----------|
| **Overview** | Real-time DB stats (wings, projects, team, partners, inquiries, users), traffic analytics, system status |
| **Link Center** | URL shortener with password protection, analytics, visit tracking |
| **Messages** | DB-persisted chat threads with auto-reply |
| **Operatives** | Admin user management (CRUD) with role-based access |
| **Inquiries** | Contact form submissions with status management (New/Read/Starred/Archived) |
| **Content** | Full CMS: Wings Manager, Team Manager, Portfolio Manager, Innovation Manager (tech stack + roadmap), Partners Editor, Pages & Hero Editor |
| **Settings** | Personal info, password change, site settings, contact configuration |

---

## Tech Stack

### Frontend
- **Next.js 16** (App Router, Turbopack)
- **TypeScript 5** (strict typing)
- **Tailwind CSS 4** (utility-first styling)
- **Framer Motion** (animations)
- **Recharts** (data visualization)
- **Lucide React** (icons)

### Backend
- **Prisma ORM** (type-safe database client)
- **PostgreSQL** (Neon serverless database)
- **JWT** (jsonwebtoken) for authentication
- **bcryptjs** (password hashing, cost factor 12)

### Infrastructure
- **Bun** (package manager & runtime)
- **Docker** (containerized deployment)
- **Caddy** (reverse proxy gateway)

---

## Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                         │
│                                                              │
│  ┌──────────┐   ┌──────────────┐   ┌─────────────────────┐ │
│  │  Public   │   │   Admin      │   │  ContentContext     │ │
│  │  Pages    │   │  Dashboard   │   │  (React Context)    │ │
│  │           │   │              │   │                     │ │
│  │ Home      │   │ Overview     │   │ ┌─────────────────┐ │ │
│  │ Wings     │   │ Link Center  │   │ │ Batch Fetch     │ │ │
│  │ Portfolio │   │ Messages     │   │ │ (1 API call)    │ │ │
│  │ Company   │   │ Operatives   │   │ │       ↓         │ │ │
│  │ Contact   │   │ Inquiries    │   │ │ localStorage    │ │ │
│  │           │   │ Content CMS  │   │ │ Cache (60s TTL) │ │ │
│  │           │   │ Settings     │   │ │       ↓         │ │ │
│  │           │   │              │   │ │ State → Pages   │ │ │
│  └─────┬─────┘   └──────┬───────┘   └────────┬────────────┘ │
│        │                │                    │              │
└────────┼────────────────┼────────────────────┼──────────────┘
         │                │                    │
         ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS API ROUTES                         │
│                                                              │
│  /api/content/all    → GET all content (batch, public)      │
│  /api/content        → GET/PUT content by type (admin PUT)   │
│  /api/auth/login     → POST login (rate-limited)             │
│  /api/auth/verify    → GET verify JWT                        │
│  /api/auth/users     → GET/POST/PUT/DELETE (admin only)     │
│  /api/auth/change-pw → POST change password                  │
│  /api/contact        → GET (admin) / POST (public)           │
│  /api/contact/[id]   → PATCH/DELETE (admin)                  │
│  /api/chat/threads   → GET/POST/DELETE (admin)               │
│  /api/chat/messages  → GET/POST (admin)                      │
│  /api/content/all    → GET batch (optimized, cached)         │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   PRISMA ORM + PostgreSQL                    │
│                                                              │
│  Tables: users, wings, projects, partners, leadership,       │
│  roadmap_items, tech_ecosystem, company_missions,            │
│  site_settings, social_platforms, contact_submissions,       │
│  chat_threads, chat_messages                                 │
│                                                              │
│  Neon PostgreSQL (serverless, pooled connection)              │
└─────────────────────────────────────────────────────────────┘
```

### How Content Loading Works

1. **First page load** — `ContentContext` calls `GET /api/content/all` (single request). The server runs all Prisma queries in parallel via `Promise.all()`, returns one JSON payload (~16KB). The response is cached in `localStorage` with a 60-second TTL.

2. **Subsequent navigation** (within 60s) — `ContentContext` reads from `localStorage` cache. **Zero API calls.** Pages render instantly.

3. **After 60 seconds** — Cache expires. Next navigation triggers a fresh `GET /api/content/all` call. Old data is shown until the new data arrives (stale-while-revalidate pattern).

4. **After admin edits content** — The cache is immediately invalidated (`localStorage.removeItem`). The next page load fetches fresh data from the DB.

### How Admin Saves Work

1. Admin edits content in a dashboard form (e.g., Wings Manager)
2. The form calls `setWings(newData)` on `ContentContext`
3. `ContentContext` updates React state immediately (optimistic UI)
4. `ContentContext` calls `PUT /api/content?type=wings` with the full array
5. The API validates the admin JWT, replaces all rows in the `wings` table
6. The localStorage cache is invalidated
7. Next page load fetches fresh data from the DB

---

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun 1.0+**
- A **PostgreSQL** database (Neon, Supabase, or local)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tectonic

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Generate Prisma client
bunx prisma generate

# Seed the database with initial content
bun run seed:db

# Start the development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Default Admin Credentials

- **Email:** `admin@tectonic.com`
- **Password:** `admin123`

> ⚠️ **Change the password immediately after first login via Settings → Password.**

---

## Database

### Schema Overview

The database uses 22 Prisma models mapping to existing PostgreSQL tables:

| Model | Purpose | Admin Editable |
|-------|---------|---------------|
| `User` | Admin accounts (JWT auth) | ✅ (Operatives tab) |
| `Wing` | Wings/departments with team data | ✅ (Content → Wings) |
| `Project` | Portfolio projects | ✅ (Content → Portfolio) |
| `Partner` | Technology partners | ✅ (Content → Partners) |
| `Leader` | Leadership team members | ✅ (Content → Team) |
| `RoadmapItem` | Innovation roadmap items | ✅ (Content → Innovation) |
| `TechEcosystem` | Tech stack items | ✅ (Content → Innovation) |
| `CompanyMission` | Timeline milestones | ✅ (Content → Pages) |
| `SiteSetting` | Key-value settings + JSON content (home, company, portfolio, contact) | ✅ (Content → Pages, Settings) |
| `SocialPlatform` | Social media links | ✅ (seeded) |
| `ContactSubmission` | Contact form submissions | ✅ (Inquiries tab) |
| `ChatThread` | Dashboard chat threads | ✅ (Messages tab) |
| `ChatMessage` | Chat messages | ✅ (Messages tab) |

### Seeding

```bash
bun run seed:db
```

This clears all content tables and re-seeds with the data from `src/tectonic/data/*`. It creates the admin user, all wings, projects, team members, partners, roadmap items, tech stack, timeline, site settings, and social platforms.

### Database Connection

The app uses Neon PostgreSQL with Prisma's connection pooling. The `DATABASE_URL` in `.env` should use the pooled connection string (host with `-pooler`):

```
DATABASE_URL=postgresql://user:pass@host-pooler.region.aws.neon.tech/dbname?sslmode=require
```

---

## Admin Panel

### Access

Navigate to `/login` and authenticate with admin credentials. The dashboard is at `/dashboard`.

### Content Management

The **Content** tab has 6 sub-sections:

1. **Innovation** — Manage tech stack items and roadmap items
2. **Portfolio** — Add/edit/delete projects with image upload
3. **Wings** — Manage wings with full team details (name, logo, purpose, timeline, achievements)
4. **Team** — Manage leadership team members
5. **Pages & Hero** — Edit home page content, company page content, partnership stats
6. **Partners** — Add/remove technology partners

All changes are saved to the database instantly via `PUT /api/content?type=...`.

### Settings

- **Personal** — Update admin profile
- **Password** — Change password (bcrypt cost 12)
- **Site Settings** — Site name, tagline, contact info, social links
- **Account** — Export data, danger zone

---

## Security

### Authentication

- **JWT** with 8-hour expiry, `iss`/`aud` claims, HS256 algorithm
- **bcryptjs** password hashing (cost factor 12)
- **Rate limiting** on login (5 attempts / 15 minutes per IP+email)
- **Account lockout** via `isActive` flag

### Authorization

- All admin API routes require `requireAdmin(req)` — checks JWT + `role === 'admin'`
- `GET /api/contact` (PII) requires admin auth
- `PUT /api/content` requires admin auth
- All chat/thread/message routes require admin auth
- User management (CRUD) requires admin auth

### Input Validation

- Email format validation (`validateEmail()`)
- Password strength validation (min 6, max 128 chars)
- String length limits (`sanitizeString()`, max 1000 chars)
- Array size limits (max 1000 items per content type)
- Content type whitelist validation on PUT endpoints
- Contact form rate limiting (10 submissions / 15 minutes)

### Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Edge Middleware

`src/middleware.ts` protects `/dashboard` routes server-side — verifies JWT before serving the page bundle.

---

## API Reference

### Public Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/content/all` | Fetch all content in a single request (batch, cached) |
| `GET` | `/api/content?type={type}` | Fetch a specific content type |
| `POST` | `/api/contact` | Submit a contact form (rate-limited) |
| `POST` | `/api/auth/login` | Login with email + password (rate-limited) |
| `GET` | `/api/auth/verify` | Verify a JWT token |

### Admin Endpoints (require `Authorization: Bearer <token>` with admin role)

| Method | Path | Description |
|--------|------|-------------|
| `PUT` | `/api/content?type={type}` | Replace all content for a type |
| `GET` | `/api/contact` | List all contact submissions |
| `PATCH` | `/api/contact/[id]` | Update submission status |
| `DELETE` | `/api/contact/[id]` | Delete a submission |
| `GET` | `/api/auth/users` | List all admin users |
| `POST` | `/api/auth/users` | Create a new user |
| `PUT` | `/api/auth/users` | Update a user |
| `DELETE` | `/api/auth/users` | Delete a user |
| `POST` | `/api/auth/change-password` | Change current user's password |
| `GET/POST/DELETE` | `/api/chat/threads` | Manage chat threads |
| `GET/POST` | `/api/chat/messages` | List/send chat messages |

### Content Types

`wings`, `projects`, `team`, `partnerships`, `timeline`, `techStack`, `roadmap`, `homeContent`, `companyContent`, `portfolioContent`, `contactConfig`, `settings`

---

## Developer Documentation

### Project Structure

```
tectonic/
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── api/                     # API routes (server-side)
│   │   │   ├── auth/                # Auth endpoints (login, verify, users, change-password)
│   │   │   ├── content/             # Content CRUD + batch endpoint
│   │   │   ├── contact/             # Contact form submissions
│   │   │   └── chat/                # Chat threads + messages
│   │   ├── layout.tsx               # Root layout (fonts, metadata, AppShell)
│   │   ├── page.tsx                 # Home route
│   │   ├── login/page.tsx           # Login route
│   │   ├── dashboard/page.tsx       # Dashboard route (protected)
│   │   ├── wings/page.tsx           # Wings route
│   │   ├── portfolio/page.tsx       # Portfolio route
│   │   ├── portfolio/[id]/page.tsx  # Project detail route (dynamic)
│   │   ├── company/page.tsx         # Company route
│   │   └── contact/page.tsx         # Contact route
│   │
│   ├── components/
│   │   └── AppShell.tsx             # Shared client chrome (providers + layout)
│   │
│   ├── lib/
│   │   ├── db.ts                    # Prisma client singleton
│   │   └── auth.ts                  # JWT, bcrypt, validation helpers
│   │
│   ├── middleware.ts                # Edge middleware (dashboard protection)
│   │
│   └── tectonic/                    # Tectonic application code
│       ├── components/
│       │   ├── ContentContext.tsx   # Global content provider (batch fetch + cache)
│       │   ├── AuthContext.tsx      # Auth state provider
│       │   ├── ThemeContext.tsx     # Dark/light theme provider
│       │   ├── SystemStatusWrapper.tsx  # Maintenance mode checker
│       │   ├── ProtectedRoute.tsx   # Auth guard for /dashboard
│       │   ├── ScrollToTop.tsx      # Scroll restoration on navigation
│       │   ├── dashboard/           # Admin panel components (18 files)
│       │   ├── layout/              # Navbar, Footer, ContactTopBar, TectonicLogo
│       │   ├── home/                # Home page sections (HeroTitle, WhatWeDeliver, ThreeDBackground)
│       │   └── ui/                  # Reusable UI components (cards, buttons, stepper, skeleton)
│       │
│       ├── pages/                   # Page components (Home, Wings, Portfolio, etc.)
│       ├── services/
│       │   ├── contentStorage.ts    # DB-backed content storage (async getters + savers)
│       │   ├── configStorage.ts     # DB-backed config storage (settings + contact)
│       │   ├── auth.ts              # Client-side auth service (login, verify, token management)
│       │   └── linkStorage.ts       # Link center localStorage service
│       │
│       ├── lib/
│       │   ├── router.tsx           # Next.js routing compat shim (Link, useNavigate, useSearchParams, etc.)
│       │   └── utils.ts             # cn() utility (clsx + tailwind-merge)
│       │
│       ├── data/                    # Seed data files (used ONLY by scripts/seed-db.ts)
│       ├── types.ts                 # TypeScript interfaces (Wing, Project, TeamMember, etc.)
│       ├── utils/                   # Link utilities (slug generation, URL validation)
│       └── styles/                  # CSS files (cyberpunk button, loader, tectonic logo)
│
├── prisma/
│   └── schema.prisma                # Prisma schema (22 models, PostgreSQL)
│
├── scripts/
│   └── seed-db.ts                   # Database seed script (Prisma-based)
│
├── public/                          # Static assets (images, logos)
│
├── next.config.ts                   # Next.js config (security headers, CSP)
├── tailwind.config.ts               # Tailwind config
├── eslint.config.mjs                # ESLint config
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies + scripts
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── Dockerfile                       # Docker deployment (3-stage build)
├── docker-compose.yml               # Docker Compose config
├── vercel.json                      # Vercel deployment config
├── railway.json                     # Railway deployment config
├── Procfile                         # Heroku deployment config
├── Caddyfile                        # Caddy reverse proxy config
└── .nvmrc                           # Node version (20)
```

### Key Mechanisms

#### 1. Content Loading (Batch + Cache)

```
Page Mount → ContentContext.refreshContent()
  ↓
  Check localStorage cache (techtonic_all_content)
  ↓ Cache hit (< 60s old)?
  ├── YES → Apply cached data to state → contentLoaded = true → Pages render
  └── NO  → fetch('/api/content/all')
              ↓
              Server: Promise.all([8 Prisma queries]) → JSON response (~16KB)
              ↓
              Cache to localStorage → Apply to state → contentLoaded = true
```

#### 2. Content Saving (Optimistic UI)

```
Admin edits form → setWings(newData)
  ↓
  1. Update React state immediately (optimistic UI)
  2. Invalidate localStorage cache
  3. PUT /api/content?type=wings (with admin JWT)
     ↓
     Server: requireAdmin(req) → validate → deleteMany → createMany
     ↓
  4. setSaveStatus('saved') → UI shows success
  5. If save fails → setSaveStatus('error') → refreshContent() reloads from DB
```

#### 3. Authentication Flow

```
Login page → form submit → authService.login(email, password)
  ↓
  POST /api/auth/login (rate-limited: 5 attempts / 15 min)
  ↓
  Server: ensureDefaultAdmin() → findUnique(email) → comparePassword(bcrypt)
  ↓ Success?
  ├── YES → signToken(user) → store in localStorage → navigate to /dashboard
  └── NO  → return 401 → show error
  ↓
  Subsequent requests: Authorization: Bearer <token>
  ↓
  Server: getUserFromRequest(req) → verifyToken(JWT) → check role
```

#### 4. Routing Shim (src/tectonic/lib/router.tsx)

The Tectonic codebase was originally a Vite + React Router SPA. To work with Next.js App Router without rewriting every component, a thin compatibility shim re-implements the React Router API on top of Next.js primitives:

| React Router | Next.js Shim | Backed By |
|--------------|-------------|-----------|
| `<Link to>` | `<Link>` | `next/link` |
| `useNavigate()` | `useNavigate()` | `next/navigation` `useRouter` |
| `useLocation()` | `useLocation()` | `next/navigation` `usePathname` |
| `useSearchParams()` | `useSearchParams()` | History API + custom events |
| `useParams()` | `useParams()` | `next/navigation` |
| `<Navigate to>` | `<Navigate>` | `useRouter().push/replace` |

The shim dispatches a custom `SEARCH_PARAMS_EVENT` after every navigation so `useSearchParams` picks up URL changes from client-side `next/link` clicks (which don't trigger `popstate`).

### NPM Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server (port 3000, with `prisma generate` via `predev`) |
| `bun run build` | Production build (with `prisma generate` via `prebuild`) |
| `bun run start` | Start production server (with `prisma generate` via `prestart`) |
| `bun run lint` | Run ESLint |
| `bun run seed:db` | Seed the database with initial content |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string (Neon pooled) |
| `JWT_SECRET` | ✅ | JWT signing secret (min 32 chars, fail-fast in production) |
| `INITIAL_ADMIN_PASSWORD` | Optional | Initial admin password (auto-generated if not set) |

---

## Deployment

### Z.ai (Publish Button)

The Z.ai system runs `bun run dev` on port 3000. The `Caddyfile` proxies external traffic to localhost:3000. Environment variables are read from `.env`.

### Vercel

1. Import the repository on Vercel
2. Set environment variables: `DATABASE_URL`, `JWT_SECRET`
3. Deploy — `vercel.json` handles the rest (Bun-based build)

### Docker (AWS / Google Cloud / Azure)

```bash
docker build -t tectonic .
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e JWT_SECRET=your_secret \
  tectonic
```

Or with Docker Compose:

```bash
# Set DATABASE_URL and JWT_SECRET in your shell, then:
docker compose up --build
```

### Railway

Connect the repo → Railway auto-detects `railway.json` → set env vars → deploy.

### Heroku

```bash
heroku create
heroku config:set DATABASE_URL=... JWT_SECRET=...
git push heroku main
```

---

## License

Proprietary software. All rights reserved.

---

## Team

| Name | Role |
|------|------|
| Kazi Ahammad Ullah | Co-Founder & CEO |
| Alahi Majnur Osama | Co-Founder & COO |
| Tajwar Saiyeed Abid | Co-Founder & CTO |
| MD. Tahmidul Alam Ahad | Co-Founder & CMO |

---

<p align="center">
  <strong>TECHTONIC</strong> — Architecting Tomorrow
</p>
