<p align="center">
  <img src="https://i.ibb.co/fVNm58bM/codex.png" alt="Techtonic Logo" width="120" />
</p>

<h1 align="center">TECHTONIC</h1>
<p align="center"><strong>Architecting Tomorrow's Infrastructure</strong></p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#documentation">Documentation</a> •
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel" alt="Vercel" />
</p>

---

## 📋 Overview

Techtonic is a modern, full-stack enterprise web application that serves as a corporate platform showcasing software development, robotics & automation, and consultancy services. Built with React, TypeScript, and integrated with Neon PostgreSQL for persistent data storage.

### Key Highlights

- 🎨 **Premium UI/UX** - Dark mode, glassmorphism, smooth animations
- 🔐 **JWT Authentication** - Secure admin portal with role-based access
- 📊 **Dynamic CMS** - Admin panel to manage all content
- 🗄️ **PostgreSQL Backend** - Neon serverless database
- ⚡ **Vercel Deployment** - Serverless functions & edge network
- 📱 **Fully Responsive** - Mobile-first design

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Dynamic Content** | All content editable via admin panel |
| **Authentication** | JWT-based login with 24h token expiry |
| **API Layer** | Vercel Functions for secure database access |
| **Real-time Updates** | Optimistic UI updates |
| **Audit Logging** | Track all content changes |
| **Contact Forms** | Submissions stored in database |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Lucide Icons** - Icon library

### Backend
- **Vercel Functions** - Serverless API
- **Neon PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon database account

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/techtonic.git
cd techtonic

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Deploy database schema
node database/deploy.js

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
JWT_SECRET=your_secret_key_here
```

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [Architecture](./docs/ARCHITECTURE.md) | System architecture & design |
| [API Reference](./docs/API.md) | API endpoints documentation |
| [Database](./docs/DATABASE.md) | Schema & data model |
| [Deployment](./docs/DEPLOYMENT.md) | Deployment guide |
| [Developer Guide](./docs/DEVELOPER.md) | Development setup |

---

## 📁 Project Structure

```
techtonic/
├── api/                    # Vercel Functions (API)
│   ├── auth/              # Authentication endpoints
│   ├── content/           # Content CRUD
│   └── config/            # Configuration
├── components/            # React components
│   ├── dashboard/         # Admin panel components
│   ├── layout/            # Layout components
│   └── ui/                # UI components
├── data/                  # Static default data
├── database/              # SQL schemas & scripts
├── docs/                  # Documentation
├── pages/                 # Page components
├── services/              # API & storage services
└── types.ts               # TypeScript types
```

---

## 🔐 Authentication

The admin portal is protected with JWT authentication:

| Credential | Value |
|------------|-------|
| Email | `admin@tectonic.com` |
| Password | `admin123` |

> ⚠️ **Change credentials in production!**

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

See [Deployment Guide](./docs/DEPLOYMENT.md) for details.

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👥 Team

| Name | Role |
|------|------|
| Kazi Ahammad Ullah | Co-Founder & CEO |
| Alahi Majnur Osama | Co-Founder & COO |
| Tajwar Saiyeed Abid | Co-Founder & CTO |
| Tahmidul Alam Ahad | Co-Founder & CMO |

---

<p align="center">
  <strong>TECHTONIC</strong> - Architecting Tomorrow
</p>
