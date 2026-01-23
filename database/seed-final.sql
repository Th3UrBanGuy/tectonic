-- ============================================================
-- TECHTONIC DATABASE - SEED DATA
-- ============================================================
-- Version: 2.0
-- Run AFTER schema-final.sql
-- ============================================================

-- ============================================================
-- 1. DEFAULT ADMIN USER
-- ============================================================
-- Password: admin123 (bcrypt hashed)
INSERT INTO users (email, password_hash, name, role, is_active) 
VALUES (
    'admin@tectonic.com', 
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'System Admin', 
    'admin',
    true
)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    name = EXCLUDED.name,
    updated_at = NOW();

-- ============================================================
-- 2. CONTENT DATA
-- ============================================================

-- Wings
INSERT INTO app_content (entity_type, data) VALUES ('wings', '[
  {
    "id": "software",
    "name": "Software Mechanism",
    "tagline": "Digital Foundations",
    "description": "Building scalable cloud architectures and next-gen web applications.",
    "icon": "Code",
    "color": "text-cyan-500",
    "techStack": ["React", "Node.js", "AWS", "Docker", "GraphQL"],
    "features": ["Custom ERP Solutions", "SaaS Development", "Cloud Migration"],
    "teamName": "CODEX",
    "teamLogo": "https://i.ibb.co.com/fVNm58bM/codex.png",
    "teamSubtitle": "Software Development Team",
    "teamPurpose": "CODEX is an elite software development team dedicated to crafting innovative digital solutions.",
    "teamTimeline": [
      { "year": "2023", "event": "Team Formation & First Enterprise Project" },
      { "year": "2024", "event": "Cloud Migration Success - 50+ Clients" },
      { "year": "2025", "event": "Launch of Proprietary SaaS Platform" },
      { "year": "2026", "event": "AI-Powered Development Tools Release" }
    ],
    "teamAchievements": [
      "🏆 Best Software Team - Tech Excellence Awards 2024",
      "⚡ 99.9% Uptime Achievement across all projects",
      "🚀 Deployed 100+ production applications"
    ]
  },
  {
    "id": "robotics",
    "name": "Robotics & Automation",
    "tagline": "Physical Intelligence",
    "description": "Bridging the gap between digital AI and physical action.",
    "icon": "Bot",
    "color": "text-purple-500",
    "techStack": ["ROS", "C++", "Computer Vision", "IoT"],
    "features": ["Industrial Automation", "Autonomous Drones", "Smart Manufacturing"],
    "teamName": "Robo Avengers",
    "teamLogo": "https://i.ibb.co.com/vvMznZjR/Robo-Avengers.png",
    "teamPurpose": "Robo Avengers pioneers IoT-based robotics research and development.",
    "teamTimeline": [
      { "year": "2024", "event": "Team Formation & First Robot Prototype" },
      { "year": "2025", "event": "Regional Robotics Competition Winner" },
      { "year": "2026", "event": "IoT Integration & Smart Manufacturing Project" }
    ],
    "teamAchievements": [
      "🏆 1st Place - National Robotics Championship 2025",
      "🎖️ Best Innovation Award - IoT Expo 2025",
      "🚀 Successfully deployed 15+ automation solutions"
    ]
  }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Team
INSERT INTO app_content (entity_type, data) VALUES ('team', '[
  {"id": "1", "name": "Kazi Ahammad Ullah", "role": "Co-Founder & CEO", "bio": "Vision, decision, leadership", "image": "https://lh3.googleusercontent.com/pw/AP1GczOUW1ZkyvpW6WV-C5OCLzDz1qlmsVlXo9Phu-_prnDMceAMjUlkB0WBrkq_DG1Rc4HgAjd8JyrywCP0fGBLfwWZUm8rqr-itNejJQH-0bFSyNcYBguHnbATvEhIpxGv_CdmStPn3-tBLxH7uKx_Rw4uNQ=w972-h842-s-no-gm", "linkedin": "https://ahammadportfolio.netlify.app/"},
  {"id": "2", "name": "Alahi Majnur Osama", "role": "Co-Founder & COO", "bio": "Operations, management, execution", "image": "https://lh3.googleusercontent.com/pw/AP1GczN5WSGo80KF7P2vNDJ54xRj80ysF_3OidXhDIy8w_YJYdz6w6MsdFTvFgKwuOP66cKs5GodlEDhkSt6ObO7bexL8Sx9nPNXeAfBlTyisWyp6-l1I3NTnGkzNiA8GtVAT64k2B43DWb7HMrEX2sbfjpZ2g=w842-h842-s-no-gm", "linkedin": "https://alahimajnurosama.vercel.app"},
  {"id": "3", "name": "Tajwar Saiyeed Abid", "role": "Co-Founder & CTO", "bio": "Technology, development, product", "image": "https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_1280.jpg", "linkedin": "https://Tajwar.app"},
  {"id": "4", "name": "Tahmidul Alam Ahad", "role": "Co-Founder & CMO", "bio": "Marketing, branding, growth", "image": "https://lh3.googleusercontent.com/pw/AP1GczOLQ8hlzOEeok3ToH61Zg6vwylLLPZAKOFSxmesyBfwz0Oy_XA6mELyhRp5xtqpBQil7v09kRpjv46RHyNDNyReNLDkhPR8Y-l8A_b0Ei7GbKtO4IJzB5LgfDR_jQkMLzNb3LIaJs2W5-vSdistHymJ2Q=w668-h842-s-no-gm", "linkedin": "https://www.linkedin.com/in/tahmidul-ahad"}
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Timeline
INSERT INTO app_content (entity_type, data) VALUES ('timeline', '[
  { "year": "2025", "title": "The Genesis", "description": "Techtonic consolidates 4 independent entities into one ecosystem." },
  { "year": "2026", "title": "AI Integration", "description": "Launch of proprietary Generative AI engine for enterprise code." },
  { "year": "2027", "title": "Quantum Readiness", "description": "R&D Lab begins testing quantum-resistant encryption protocols." },
  { "year": "2028", "title": "Bio-Tech Interface", "description": "Expansion into neural interface software for medical prosthetics." }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Partnerships
INSERT INTO app_content (entity_type, data) VALUES ('partnerships', '[
  { "id": "1", "name": "AWS", "logo": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure", "description": "Strategic cloud partner", "since": "2024" },
  { "id": "2", "name": "Microsoft Azure", "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg", "category": "Enterprise Solutions", "description": "Enterprise cloud and AI", "since": "2024" },
  { "id": "3", "name": "Google Cloud", "logo": "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg", "category": "AI & ML", "description": "AI and analytics", "since": "2025" },
  { "id": "4", "name": "Docker", "logo": "https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png", "category": "DevOps", "description": "Containerization", "since": "2023" },
  { "id": "5", "name": "Kubernetes", "logo": "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg", "category": "Orchestration", "description": "Container orchestration", "since": "2023" },
  { "id": "6", "name": "GitHub", "logo": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", "category": "Development", "description": "Version control", "since": "2022" }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Projects
INSERT INTO app_content (entity_type, data) VALUES ('projects', '[
  { "id": "1", "title": "Nexus Financial Core", "category": "Software", "client": "FinGlobal Bank", "challenge": "Legacy systems causing 40% downtime.", "solution": "Microservices migration using Kubernetes.", "impact": "99.99% Uptime, 300% faster.", "image": "https://picsum.photos/800/600?random=1" },
  { "id": "2", "title": "Aegis Defense Grid", "category": "Security", "client": "GovTech Agency", "challenge": "Zero-day exploit vulnerability.", "solution": "AI-driven anomaly detection.", "impact": "Secured 5PB of data.", "image": "https://picsum.photos/800/600?random=2" },
  { "id": "3", "title": "Auto-Logistics Bot", "category": "Robotics", "client": "MegaShip Logistics", "challenge": "Warehouse sorting delays.", "solution": "Autonomous mobile robots.", "impact": "65% faster sorting.", "image": "https://picsum.photos/800/600?random=3" },
  { "id": "4", "title": "Smart City Initiative", "category": "Consultancy", "client": "Metropolis Council", "challenge": "Traffic congestion.", "solution": "IoT data strategy.", "impact": "25% traffic improvement.", "image": "https://picsum.photos/800/600?random=4" }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Tech Stack
INSERT INTO app_content (entity_type, data) VALUES ('techStack', '[
  { "id": "tech_1", "name": "MERN STACK", "version": "V_8.4", "status": "SCALING", "iconName": "Layers", "color": "text-cyan-400", "order": 0 },
  { "id": "tech_2", "name": "NEXT.JS", "version": "V_14", "status": "OPTIMIZED", "iconName": "Zap", "color": "text-white", "order": 1 },
  { "id": "tech_3", "name": "CLOUD NATIVE", "version": "TERRAFORM", "status": "DEPLOYED", "iconName": "Cloud", "color": "text-blue-400", "order": 2 },
  { "id": "tech_4", "name": "RUST CORE", "version": "LOW_LATENCY", "status": "STABLE", "iconName": "Cpu", "color": "text-orange-400", "order": 3 },
  { "id": "tech_5", "name": "GRAPH DB", "version": "NEO4J", "status": "CONNECTED", "iconName": "Network", "color": "text-purple-400", "order": 4 },
  { "id": "tech_6", "name": "ROBOTICS OS", "version": "ROS_2", "status": "ACTIVE", "iconName": "Bot", "color": "text-green-400", "order": 5 }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Roadmap
INSERT INTO app_content (entity_type, data) VALUES ('roadmap', '[
  { "id": "roadmap_1", "refId": "R-2025-A", "quarter": "Q1 2025", "title": "QUANTUM ENCRYPTION", "description": "Post-quantum cryptographic layers.", "progress": 65, "status": "IN_PROGRESS", "colorTheme": "from-blue-600/20 to-blue-900/10", "order": 0 },
  { "id": "roadmap_2", "refId": "B-2026-X", "quarter": "Q4 2026", "title": "BIOTECH INTERFACES", "description": "Neural link protocols.", "progress": 15, "status": "INITIAL_CONCEPT", "colorTheme": "from-purple-600/20 to-purple-900/10", "order": 1 },
  { "id": "roadmap_3", "refId": "S-2027-V", "quarter": "2027", "title": "AUTONOMOUS COLONIES", "description": "Self-repairing software.", "progress": 0, "status": "SCHEDULED", "colorTheme": "from-gray-700/20 to-gray-900/10", "order": 2 }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Home Content
INSERT INTO app_content (entity_type, data) VALUES ('homeContent', '{
  "hero": {"title": "TECTONIC", "subtitle": "SHIFT", "description": "Architecting tomorrows infrastructure.", "buttons": {"primary": "EXPLORE ECOSYSTEM", "secondary": "R&D LAB ACCESS"}},
  "wings": {"title": "OUR WINGS"},
  "projects": {"title": "FEATURED PROJECTS", "description": "Real-world solutions", "viewAll": "View All Projects"},
  "partnerships": {"title": "OUR PARTNERSHIPS", "description": "Industry leaders", "stats": [{"value": "6+", "label": "Partners", "color": "from-cyan-600 to-purple-600"}, {"value": "4", "label": "Sectors", "color": "from-purple-600 to-orange-600"}, {"value": "99.9%", "label": "Uptime", "color": "from-orange-600 to-emerald-600"}, {"value": "24/7", "label": "Support", "color": "from-emerald-600 to-cyan-600"}]}
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Company Content
INSERT INTO app_content (entity_type, data) VALUES ('companyContent', '{
  "hero": {"badge": "HUMAN-CENTRIC TECHNOLOGY", "title": {"prefix": "THE ARCHITECTS", "highlight": "OF TOMORROW"}, "description": "Tectonic unifies software, security, and robotics."},
  "stats": [{"label": "Founded", "value": "2025"}, {"label": "Offices", "value": "5"}, {"label": "Engineers", "value": "12+"}, {"label": "Patents", "value": "15"}],
  "mission": {"title": "OUR MISSION", "text1": "We operate at the intersection of imagination and engineering.", "highlight": "to dismantle limitations.", "text2": "Every Techtonic innovation is scalable, secure, and sustainable."},
  "certifications": {"title": "CERTIFICATIONS & RECOGNITION"}
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Innovation Content
INSERT INTO app_content (entity_type, data) VALUES ('innovationContent', '{
  "hero": {"badge": "Innovation Lab", "title": "INNOVATION & R&D", "description": "Cutting-edge technology and research", "buttons": {"newProject": "New Project", "exportData": "Export Data"}},
  "sections": {"techStack": {"title": "Tech Ecosystem", "badge": "99.9% Uptime"}, "roadmap": {"title": "Future Roadmap"}},
  "stats": [{"label": "Active Experiments", "value": "42", "change": "+3", "iconName": "FlaskConical", "color": "purple"}, {"label": "Compute Power", "value": "8.4", "unit": "PFLOPS", "iconName": "Activity", "color": "cyan"}, {"label": "Patents Filed", "value": "128", "status": "Verified", "iconName": "CheckCircle2", "color": "green"}]
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- ============================================================
-- 3. CONFIG DATA
-- ============================================================

-- Site Settings
INSERT INTO app_config (key, value, description) VALUES (
    'siteSettings', 
    '{"siteName": "Techtonic", "siteTagline": "Architecting Tomorrow", "maintenanceMode": false, "allowRegistration": false}'::jsonb,
    'Global site settings'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Contact Config
INSERT INTO app_config (key, value, description) VALUES (
    'contactConfig',
    '{"address": {"street": "Chattogram, Bangladesh", "sector": "Dhaka, Bangladesh", "coordinates": "Lat: 23.8103, Long: 90.4125"}, "contact": {"email": "support@techt0nic.com", "phone": "+880 171-1234567"}, "socials": {"linkedin": "https://linkedin.com/company/techtonic", "facebook": "https://facebook.com/techtonic.official", "instagram": "https://instagram.com/techtonic", "twitter": "https://twitter.com/techtonic", "github": "https://github.com/techtonic"}}'::jsonb,
    'Contact information and social links'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================================
-- SEED COMPLETE
-- ============================================================
SELECT 'Seed data loaded successfully!' AS status;
