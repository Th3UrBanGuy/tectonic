-- ============================================================
-- TECTONIC DATABASE - SEED DATA (Final V3)
-- ============================================================
-- Populates the database with initial data matching the previous hardcoded files.
-- Updates: Dynamic Leadership Links, Unified Contact Info.
-- ============================================================

-- 1. SITE SETTINGS (Single Source of Truth for Contact)
INSERT INTO site_settings (key, value, type, description) VALUES
('site_name', 'Techtonic', 'text', 'Global site name'),
('site_tagline', 'Architecting the substrate of the future.', 'text', 'Hero tagline'),
('contact_address_street', 'Silicon Heights, Sector 7', 'text', 'HQ Street'),
('contact_address_sector', 'Dhaka', 'text', 'HQ City/Sector'),
('contact_email', 'contact@techtonic.example.com', 'text', 'Main contact email (Header & Contact Page)'),
('contact_phone', '+880 1234 567890', 'text', 'Main contact phone (Header & Contact Page)'),
('footer_copyright', '© 2026 Techtonic Industries. All rights reserved.', 'text', 'Footer copyright text');

-- 2. SOCIAL PLATFORMS (Global Company Socials)
INSERT INTO social_platforms (platform_name, url, icon_name, order_index) VALUES
('LinkedIn', 'https://linkedin.com', 'Linkedin', 1),
('Facebook', 'https://facebook.com', 'Facebook', 2),
('Twitter', 'https://twitter.com', 'Twitter', 3),
('GitHub', 'https://github.com', 'Github', 4),
('Instagram', 'https://instagram.com', 'Instagram', 5);

-- 3. PAGES (SEO & HERO)
INSERT INTO pages (route_path, title, meta_title, meta_description, hero_title, hero_subtitle, hero_text) VALUES
('/', 'Home', 'Techtonic - Architecting Future', 'Integrated solutions in Software, Robotics, and Security.', 'TECTONIC', 'SHIFT', 'Architecting the substrate of the future through integrated software, security, and robotic solutions.'),
('/wings', 'Wings', 'Our Divisions - Techtonic', 'OPERATIONAL', 'WINGS', 'WINGS', NULL),
('/innovation', 'Innovation', 'Innovation Hub - Techtonic', 'FUTURE', 'LABS', 'LABS', NULL),
('/portfolio', 'Portfolio', 'Case Studies - Techtonic', 'GLOBAL', 'IMPACT', 'IMPACT', NULL),
('/company', 'Company', 'About Us - Techtonic', 'CORE', 'IDENTITY', 'IDENTITY', NULL),
('/contact', 'Contact', 'Contact Us - Techtonic', 'INITIATE', 'PROTOCOL', 'PROTOCOL', NULL);


-- 4. NAVIGATION MENUS
INSERT INTO menus (location_slug, name) VALUES 
('navbar_main', 'Main Navbar'),
('footer_ecosystem', 'Footer Ecosystem Links'),
('footer_company', 'Footer Company Links');

-- Menu Items
INSERT INTO menu_items (menu_id, label, path, order_index) VALUES
((SELECT id FROM menus WHERE location_slug='navbar_main'), 'HOME', '/', 1),
((SELECT id FROM menus WHERE location_slug='navbar_main'), 'WINGS', '/wings', 2),
((SELECT id FROM menus WHERE location_slug='navbar_main'), 'INNOVATION', '/innovation', 3),
((SELECT id FROM menus WHERE location_slug='navbar_main'), 'PORTFOLIO', '/portfolio', 4),
((SELECT id FROM menus WHERE location_slug='navbar_main'), 'COMPANY', '/company', 5);

-- 5. WINGS
INSERT INTO wings (slug, name, tagline, description, icon_name, color_theme, tech_stack, features, team_name, team_logo_url, team_subtitle, team_purpose, team_timeline, team_achievements) VALUES
(
    'software', 
    'Software Mechanism', 
    'Digital Foundations', 
    'Building scalable cloud architectures and next-gen web applications.', 
    'Code', 
    'text-cyan-500', 
    '["React", "Node.js", "AWS", "Docker", "GraphQL"]', 
    '["Custom ERP Solutions", "SaaS Development", "Cloud Migration"]',
    'CODEX',
    'https://i.ibb.co.com/fVNm58bM/codex.png',
    'Software Development Team',
    'CODEX is an elite software development team dedicated to crafting innovative digital solutions. We specialize in building scalable, cloud-native applications that transform businesses and drive digital excellence through cutting-edge technologies and best practices.',
    '[{"year": "2023", "event": "Team Formation & First Enterprise Project"}, {"year": "2024", "event": "Cloud Migration Success - 50+ Clients"}, {"year": "2025", "event": "Launch of Proprietary SaaS Platform"}, {"year": "2026", "event": "AI-Powered Development Tools Release"}]',
    '["🏆 Best Software Team - Tech Excellence Awards 2024", "⚡ 99.9% Uptime Achievement across all projects", "🚀 Deployed 100+ production applications", "💡 Created 5 open-source frameworks", "🌟 5-star client satisfaction rating"]'
),
(
    'robotics', 
    'Robotics & Automation', 
    'Physical Intelligence', 
    'Bridging the gap between digital AI and physical action.', 
    'Bot', 
    'text-purple-500', 
    '["ROS", "C++", "Computer Vision", "IoT"]', 
    '["Industrial Automation", "Autonomous Drones", "Smart Manufacturing"]',
    'Robo Avengers',
    'https://i.ibb.co.com/vvMznZjR/Robo-Avengers.png',
    NULL,
    'Robo Avengers is dedicated to pioneering IoT-based robotics research and development. We focus on creating intelligent automation solutions that bridge the physical and digital worlds, empowering industries and communities through cutting-edge robotic systems.',
    '[{"year": "2024", "event": "Team Formation & First Robot Prototype"}, {"year": "2025", "event": "Regional Robotics Competition Winner"}, {"year": "2026", "event": "IoT Integration & Smart Manufacturing Project"}, {"year": "2027", "event": "Autonomous Drone Fleet Development"}]',
    '["🏆 1st Place - National Robotics Championship 2025", "🎖️ Best Innovation Award - IoT Expo 2025", "🚀 Successfully deployed 15+ automation solutions", "📚 Published 8 research papers on autonomous systems", "🤝 Partnership with 12+ industrial clients"]'
);


-- 6. PROJECTS
INSERT INTO projects (title, slug, category, client_name, challenge_desc, solution_desc, impact_desc, image_url) VALUES
(
    'Nexus Financial Core', 
    'nexus-financial-core', 
    'Software', 
    'FinGlobal Bank', 
    'Legacy systems causing 40% downtime during peak trading.', 
    'Microservices architecture migration using Kubernetes and Go.', 
    '99.99% Uptime, 300% faster transaction processing.', 
    'https://picsum.photos/id/1/800/600'
),
(
    'Aegis Defense Grid', 
    'aegis-defense-grid', 
    'Security', 
    'GovTech Agency', 
    'Vulnerability to zero-day exploits in sensitive data pipelines.', 
    'Implementation of AI-driven anomaly detection and air-gapped backups.', 
    'Secured 5PB of national data; detected 50+ intrusive attempts.', 
    'https://picsum.photos/id/2/800/600'
),
(
    'Auto-Logistics Bot', 
    'auto-logistics-bot', 
    'Robotics', 
    'MegaShip Logistics', 
    'Inefficient warehouse sorting leading to shipping delays.', 
    'Fleet of autonomous mobile robots (AMRs) with swarm intelligence.', 
    'Reduced sorting time by 65%, eliminated human error.', 
    'https://picsum.photos/id/3/800/600'
);

-- 7. PARTNERS
INSERT INTO partners (name, logo_url, category, description, since_date) VALUES
('AWS', 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', 'Cloud Infrastructure', 'Strategic cloud partner scale', '2024-01-01'),
('Microsoft Azure', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg', 'Enterprise Solutions', 'Enterprise-grade cloud', '2024-01-01'),
('Google Cloud', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg', 'AI & Machine Learning', 'Advanced AI analytics', '2025-01-01'),
('Docker', 'https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png', 'DevOps', 'Containerization solutions', '2023-01-01');

-- 8. LEADERSHIP (Dynamic Links)
INSERT INTO leadership (name, role, bio, image_url, social_links) VALUES
(
    'Kazi Ahammad Ullah', 
    'Co-Founder & CEO', 
    'Vision, decision, leadership', 
    'https://lh3.googleusercontent.com/pw/AP1GczOUW1ZkyvpW6WV-C5OCLzDz1qlmsVlXo9Phu-_prnDMceAMjUlkB0WBrkq_DG1Rc4HgAjd8JyrywCP0fGBLfwWZUm8rqr-itNejJQH-0bFSyNcYBguHnbATvEhIpxGv_CdmStPn3-tBLxH7uKx_Rw4uNQ=w972-h842-s-no-gm?authuser=0',
    '[{"label": "Portfolio", "url": "https://ahammadportfolio.netlify.app/", "icon": "Globe"}, {"label": "LinkedIn", "url": "https://linkedin.com/in/ahammad", "icon": "Linkedin"}]'
),
(
    'Alahi Majnur Osama', 
    'Co-Founder & COO', 
    'Operations, management, execution', 
    'https://lh3.googleusercontent.com/pw/AP1GczN5WSGo80KF7P2vNDJ54xRj80ysF_3OidXhDIy8w_YJYdz6w6MsdFTvFgKwuOP66cKs5GodlEDhkSt6ObO7bexL8Sx9nPNXeAfBlTyisWyp6-l1I3NTnGkzNiA8GtVAT64k2B43DWb7HMrEX2sbfjpZ2g=w842-h842-s-no-gm?authuser=0', 
    '[{"label": "Website", "url": "https://alahimajnurosama.vercel.app", "icon": "Globe"}]'
),
(
    'Tajwar Saiyeed Abid', 
    'Co-Founder & CTO', 
    'Technology, development, product', 
    'https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_1280.jpg', 
    '[{"label": "App", "url": "https://Tajwar.app", "icon": "Smartphone"}]'
),
(
    'Tahmidul Alam Ahad', 
    'Co-Founder & CMO', 
    'Marketing, branding, growth', 
    'https://lh3.googleusercontent.com/pw/AP1GczOLQ8hlzOEeok3ToH61Zg6vwylLLPZAKOFSxmesyBfwz0Oy_XA6mELyhRp5xtqpBQil7v09kRpjv46RHyNDNyReNLDkhPR8Y-l8A_b0Ei7GbKtO4IJzB5LgfDR_jQkMLzNb3LIaJs2W5-vSdistHymJ2Q=w668-h842-s-no-gm?authuser=0', 
    '[{"label": "LinkedIn", "url": "https://www.linkedin.com/in/tahmidul-ahad", "icon": "Linkedin"}]'
);

-- 9. COMPANY MISSIONS
INSERT INTO company_missions (title, description, icon_name, order_index) VALUES
('2025 Founded', 'Established as a unified ecosystem.', 'Flag', 1),
('Global Offices', '5 locations worldwide.', 'Globe', 2),
('Engineers', '12+ Specialized engineers.', 'Code', 3),
('Patents', '15+ Patents pending.', 'Award', 4);

-- 10. TIMELINE
INSERT INTO roadmap_items (year, title, description, status) VALUES
(2025, 'The Genesis', 'Techtonic consolidates 4 independent entities into one ecosystem.', 'Completed'),
(2026, 'AI Integration', 'Launch of proprietary Generative AI engine for enterprise code.', 'In Progress'),
(2027, 'Quantum Readiness', 'R&D Lab begins testing quantum-resistant encryption protocols.', 'Planned'),
(2028, 'Bio-Tech Interface', 'Expansion into neural interface software for medical prosthetics.', 'Future');
