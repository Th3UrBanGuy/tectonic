# Deployment Guide

## Overview

This guide covers deploying Techtonic to production using Vercel and Neon PostgreSQL.

---

## Prerequisites

- ✅ GitHub account
- ✅ Vercel account
- ✅ Neon database created
- ✅ Local development tested

---

## Deployment Architecture

```mermaid
graph LR
    subgraph "Source"
        GH[GitHub Repository]
    end
    
    subgraph "CI/CD"
        VB[Vercel Build]
    end
    
    subgraph "Production"
        VE[Vercel Edge]
        VF[Vercel Functions]
        NE[Neon PostgreSQL]
    end
    
    GH -->|Push| VB
    VB -->|Deploy| VE
    VB -->|Deploy| VF
    VF -->|Connect| NE
```

---

## Step 1: Prepare Repository

### 1.1 Verify .gitignore

Ensure these are ignored:
```
.env
.env.local
node_modules/
dist/
```

### 1.2 Verify .env.example exists

```bash
cat .env.example
# Should show template without actual secrets
```

### 1.3 Commit all changes

```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

---

## Step 2: Database Setup

### 2.1 Get Neon Connection String

1. Go to [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Copy the connection string

Format:
```
postgresql://user:password@host/database?sslmode=require
```

### 2.2 Deploy Schema (if not done)

```bash
# Set DATABASE_URL in .env
node database/deploy.js
```

### 2.3 Verify Data

```bash
# Connect via Neon SQL Editor
SELECT COUNT(*) FROM users;        -- Should be 1
SELECT COUNT(*) FROM app_content;  -- Should be 10
```

---

## Step 3: Vercel Setup

### 3.1 Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 3.2 Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 3.3 Set Environment Variables

Add these in the Vercel dashboard:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `JWT_SECRET` | Strong random string (32+ chars) |

> ⚠️ **Generate a unique JWT_SECRET for production!**

```bash
# Generate random secret
openssl rand -base64 32
```

### 3.4 Deploy

Click "Deploy" and wait for completion.

---

## Step 4: Verify Deployment

### 4.1 Check Public Pages

- [ ] Home page loads
- [ ] Navigation works
- [ ] Dark/light mode works
- [ ] Animations smooth

### 4.2 Check Authentication

1. Go to `/login`
2. Login with `admin@tectonic.com` / `admin123`
3. Verify dashboard access

### 4.3 Check API

Test endpoint:
```bash
curl https://your-app.vercel.app/api/content/wings
```

---

## Step 5: Post-Deployment

### 5.1 Change Admin Password

1. Login to dashboard
2. Go to Settings
3. Change password

### 5.2 Configure Custom Domain (Optional)

1. Vercel Dashboard → Project → Domains
2. Add your domain
3. Update DNS records

### 5.3 Enable Neon Pooler (Optional)

For high traffic, enable connection pooling in Neon console.

---

## Troubleshooting

### API Returns 500 Error

```
Check:
1. DATABASE_URL is correct in Vercel
2. Neon project is active
3. SSL mode is 'require'
```

### Login Fails

```
Check:
1. JWT_SECRET is set in Vercel
2. Admin user exists in database
3. Password hash is valid
```

### Build Fails

```
Check:
1. All dependencies in package.json
2. No TypeScript errors
3. Build logs in Vercel
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | Neon connection string |
| `JWT_SECRET` | ✅ | Token signing secret |
| `NODE_ENV` | Auto | Set by Vercel |

---

## Rollback

If issues occur:

1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." → "Redeploy"

---

## Monitoring

### Vercel Analytics

Enable in Vercel Dashboard for:
- Page views
- Web Vitals
- Error tracking

### Neon Monitoring

Check in Neon Dashboard:
- Connection count
- Query performance
- Storage usage
