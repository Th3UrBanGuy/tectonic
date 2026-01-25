-- ============================================================
-- TECTONIC DATABASE - FINAL DYNAMIC SCHEMA (V2)
-- ============================================================
-- Version: 3.1 (Complete Dynamic System)
-- Created: 2026-01-25
-- Description: Fully dynamic schema covering Content, Auth, Navigation, SEO, and Link Center.
-- ============================================================

-- ============================================================
-- 0. CLEANUP (Drop existing tables)
-- ============================================================
-- Reverse order of dependencies
DROP TABLE IF EXISTS link_visits CASCADE;
DROP TABLE IF EXISTS shortened_links CASCADE;
DROP TABLE IF EXISTS legal_docs CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS leadership CASCADE;
DROP TABLE IF EXISTS company_missions CASCADE;
DROP TABLE IF EXISTS company_stats CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS roadmap_items CASCADE;
DROP TABLE IF EXISTS tech_ecosystem CASCADE;
DROP TABLE IF EXISTS partners CASCADE;
DROP TABLE IF EXISTS wings CASCADE;
DROP TABLE IF EXISTS social_platforms CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS app_config CASCADE; -- Legacy
DROP TABLE IF EXISTS app_content CASCADE; -- Legacy
DROP TABLE IF EXISTS users CASCADE;

-- ============================================================
-- 1. AUTHENTICATION & SYSTEM
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_revoked BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. CORE DYNAMIC SITE (Meta, Nav, Pages)
-- ============================================================

-- Site Global Settings
CREATE TABLE IF NOT EXISTS site_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL, 
    value TEXT,
    type VARCHAR(20) DEFAULT 'text', -- text, rich_text, image_url, boolean
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages & SEO (Dynamic Hero Text & Meta)
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    route_path VARCHAR(100) UNIQUE NOT NULL, -- '/', '/wings', '/innovation'
    title VARCHAR(255) NOT NULL, -- Internal name
    meta_title VARCHAR(255),
    meta_description TEXT,
    hero_title VARCHAR(255), -- e.g., "TECTONIC"
    hero_subtitle VARCHAR(255), -- e.g., "SHIFT"
    hero_text TEXT, -- "Architecting the substrate..."
    hero_image_url VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Navigation Menus
CREATE TABLE IF NOT EXISTS menus (
    id SERIAL PRIMARY KEY,
    location_slug VARCHAR(50) UNIQUE NOT NULL, -- 'navbar_main', 'footer_ecosystem', 'footer_company'
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    is_external BOOLEAN DEFAULT false,
    parent_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE, -- For submenus
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 3. CONTENT MODULES
-- ============================================================

-- Social Platforms
CREATE TABLE IF NOT EXISTS social_platforms (
    id SERIAL PRIMARY KEY,
    platform_name VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread',
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wings (Dynamic Sections)
CREATE TABLE IF NOT EXISTS wings (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    icon_name VARCHAR(50),
    color_theme VARCHAR(50),
    
    -- Dynamic Arrays
    tech_stack JSONB DEFAULT '[]', -- ["React", "Node"]
    features JSONB DEFAULT '[]',   -- ["SaaS", "Cloud"]
    
    -- Team Config
    team_name VARCHAR(100),
    team_logo_url VARCHAR(255),
    team_subtitle VARCHAR(255),
    team_purpose TEXT,
    team_timeline JSONB DEFAULT '[]', -- [{year: "2023", event: "..."}]
    team_achievements JSONB DEFAULT '[]', -- ["Award 1", "Award 2"]
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    website_url VARCHAR(255),
    since_date DATE,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Innovation: Tech Ecosystem
CREATE TABLE IF NOT EXISTS tech_ecosystem (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    version VARCHAR(50),
    status VARCHAR(50), -- 'Active', 'Deprecated', 'Beta'
    category VARCHAR(50),
    icon_name VARCHAR(50),
    color_class VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Innovation: Roadmap
CREATE TABLE IF NOT EXISTS roadmap_items (
    id SERIAL PRIMARY KEY,
    quarter VARCHAR(10), 
    year INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    progress INTEGER DEFAULT 0,
    status VARCHAR(50),
    color_theme VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    client_name VARCHAR(255),
    challenge_desc TEXT,
    solution_desc TEXT,
    impact_desc TEXT,
    image_url VARCHAR(255),
    featured BOOLEAN DEFAULT false,
    completion_date DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Stats
CREATE TABLE IF NOT EXISTS company_stats (
    id SERIAL PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(50) NOT NULL,
    suffix VARCHAR(20),
    icon_name VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company Missions
CREATE TABLE IF NOT EXISTS company_missions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leadership
CREATE TABLE IF NOT EXISTS leadership (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    bio TEXT,
    image_url VARCHAR(255),
    social_links JSONB DEFAULT '[]', -- Array of {label: "LinkedIn", url: "...", icon: "Linkedin"}
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    issuing_org VARCHAR(255),
    issue_date DATE,
    expiration_date DATE,
    image_url VARCHAR(255),
    credential_url VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Legal Docs
CREATE TABLE IF NOT EXISTS legal_docs (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL, -- 'privacy', 'terms'
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL, -- Markdown or HTML
    published BOOLEAN DEFAULT true,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 4. LINK CENTER (URL Shortener)
-- ============================================================

CREATE TABLE IF NOT EXISTS shortened_links (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    short_url TEXT, -- Base URL + Slug
    
    -- Security
    password_hash VARCHAR(255),
    
    -- Restrictions
    waiting_time_seconds INTEGER DEFAULT 0,
    max_visits INTEGER,
    current_visits INTEGER DEFAULT 0,
    valid_from TIMESTAMP,
    valid_until TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS link_visits (
    id SERIAL PRIMARY KEY,
    link_id INTEGER REFERENCES shortened_links(id) ON DELETE CASCADE,
    ip_hash VARCHAR(64), -- Anonymized IP
    user_agent TEXT,
    referrer TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- 5. TRIGGER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_ts BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_settings_ts BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_pages_ts BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_menus_ts BEFORE UPDATE ON menu_items FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_wings_ts BEFORE UPDATE ON wings FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_partners_ts BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_tech_ts BEFORE UPDATE ON tech_ecosystem FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_roadmap_ts BEFORE UPDATE ON roadmap_items FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_projects_ts BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_stats_ts BEFORE UPDATE ON company_stats FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_missions_ts BEFORE UPDATE ON company_missions FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_leadership_ts BEFORE UPDATE ON leadership FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_certs_ts BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_legal_ts BEFORE UPDATE ON legal_docs FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_links_ts BEFORE UPDATE ON shortened_links FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================
-- SCHEMA COMPLETE
-- ============================================================
