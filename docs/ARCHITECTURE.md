# System Architecture

## 1. Overview

Techtonic follows a modern **JAMstack architecture** with serverless backend functions. The system is designed for scalability, security, and maintainability.

---

## 2. Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        B[Browser] --> R[React SPA]
        R --> RC[React Components]
        RC --> CTX[Context Providers]
    end
    
    subgraph "Service Layer"
        CTX --> AS[Auth Service]
        CTX --> CS[Content Service]
        AS --> API
        CS --> API
    end
    
    subgraph "API Layer - Vercel Functions"
        API[API Gateway]
        API --> AUTH[/api/auth/*]
        API --> CONTENT[/api/content/*]
        API --> CONFIG[/api/config/*]
    end
    
    subgraph "Data Layer"
        AUTH --> DB[(Neon PostgreSQL)]
        CONTENT --> DB
        CONFIG --> DB
    end
    
    subgraph "CDN Layer"
        CDN[Vercel Edge Network]
        CDN --> B
    end
```

---

## 3. Component Architecture

```mermaid
graph LR
    subgraph "App Root"
        APP[App.tsx]
    end
    
    subgraph "Providers"
        APP --> TP[ThemeProvider]
        TP --> AP[AuthProvider]
        AP --> CP[ContentProvider]
    end
    
    subgraph "Layout"
        CP --> NAV[Navbar]
        CP --> CTB[ContactTopBar]
        CP --> FT[Footer]
    end
    
    subgraph "Pages"
        CP --> HOME[Home]
        CP --> WINGS[Wings]
        CP --> INNOV[Innovation]
        CP --> PORT[Portfolio]
        CP --> COMP[Company]
        CP --> CONT[Contact]
        CP --> DASH[Dashboard]
        CP --> LOGIN[Login]
    end
    
    subgraph "Protected"
        PR[ProtectedRoute]
        PR --> DASH
    end
```

---

## 4. Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant R as React App
    participant A as API Layer
    participant D as Database
    
    U->>R: Access Dashboard
    R->>R: Check Auth State
    alt Not Authenticated
        R-->>U: Redirect to Login
        U->>R: Enter Credentials
        R->>A: POST /api/auth/login
        A->>D: Verify User
        D-->>A: User Data
        A-->>R: JWT Token
        R->>R: Store Token
    end
    R->>A: GET /api/content/wings
    A->>D: Query app_content
    D-->>A: JSONB Data
    A-->>R: Content JSON
    R-->>U: Render Dashboard
```

---

## 5. Authentication Flow

```mermaid
flowchart TD
    A[User Access] --> B{Has Token?}
    B -->|No| C[Redirect to Login]
    B -->|Yes| D{Token Valid?}
    D -->|No| C
    D -->|Yes| E{Is Admin?}
    E -->|No| F[Access Denied]
    E -->|Yes| G[Grant Access]
    
    C --> H[Enter Credentials]
    H --> I[Submit Login]
    I --> J{Valid?}
    J -->|No| K[Show Error]
    K --> H
    J -->|Yes| L[Generate JWT]
    L --> M[Store in LocalStorage]
    M --> G
```

---

## 6. Technology Stack

### Frontend

| Layer | Technology | Purpose |
|-------|------------|---------|
| UI Framework | React 18 | Component-based UI |
| Language | TypeScript | Type safety |
| Build Tool | Vite | Fast development |
| Styling | Tailwind CSS | Utility-first CSS |
| Animations | Framer Motion | Smooth transitions |
| Routing | React Router v6 | Client-side routing |
| State | Context API | Global state management |

### Backend

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js | JavaScript runtime |
| API | Vercel Functions | Serverless functions |
| Database | Neon PostgreSQL | Serverless Postgres |
| Auth | JWT + bcrypt | Secure authentication |

### Infrastructure

| Layer | Technology | Purpose |
|-------|------------|---------|
| Hosting | Vercel | Edge deployment |
| CDN | Vercel Edge | Global content delivery |
| Database | Neon | Serverless PostgreSQL |
| Version Control | Git/GitHub | Source control |

---

## 7. Security Architecture

```mermaid
graph TD
    subgraph "Security Layers"
        A[HTTPS/TLS] --> B[Vercel Edge]
        B --> C[API Functions]
        C --> D[JWT Verification]
        D --> E[Role-Based Access]
        E --> F[Database]
    end
    
    subgraph "Data Protection"
        F --> G[Encrypted at Rest]
        F --> H[SSL Connection]
    end
```

### Security Measures

| Measure | Implementation |
|---------|----------------|
| Transport | HTTPS enforced |
| Authentication | JWT with 24h expiry |
| Password Storage | bcrypt hashing |
| API Protection | Token verification middleware |
| Database | SSL connection required |
| Secrets | Environment variables |

---

## 8. Scalability

The architecture supports horizontal scaling:

- **Stateless API**: Vercel Functions scale automatically
- **Serverless DB**: Neon auto-scales compute
- **CDN**: Edge caching for static assets
- **No Server State**: JWT-based auth (no sessions)

---

## 9. Deployment Architecture

```mermaid
graph LR
    subgraph "Development"
        DEV[Local Dev] --> GIT[GitHub]
    end
    
    subgraph "CI/CD"
        GIT --> VB[Vercel Build]
        VB --> VD[Vercel Deploy]
    end
    
    subgraph "Production"
        VD --> EDGE[Edge Network]
        VD --> FN[Serverless Functions]
        FN --> NEON[Neon PostgreSQL]
    end
```
