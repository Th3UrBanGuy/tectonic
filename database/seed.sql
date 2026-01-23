-- Techtonic Database Seed Data
-- Contains all default content from the application
-- Generated: 2026-01-23

-- ============================================================
-- CONTENT DATA (app_content table)
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
    "teamPurpose": "CODEX is an elite software development team dedicated to crafting innovative digital solutions. We specialize in building scalable, cloud-native applications that transform businesses and drive digital excellence through cutting-edge technologies and best practices.",
    "teamTimeline": [
      { "year": "2023", "event": "Team Formation & First Enterprise Project" },
      { "year": "2024", "event": "Cloud Migration Success - 50+ Clients" },
      { "year": "2025", "event": "Launch of Proprietary SaaS Platform" },
      { "year": "2026", "event": "AI-Powered Development Tools Release" }
    ],
    "teamAchievements": [
      "🏆 Best Software Team - Tech Excellence Awards 2024",
      "⚡ 99.9% Uptime Achievement across all projects",
      "🚀 Deployed 100+ production applications",
      "💡 Created 5 open-source frameworks",
      "🌟 5-star client satisfaction rating"
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
    "teamPurpose": "Robo Avengers is dedicated to pioneering IoT-based robotics research and development. We focus on creating intelligent automation solutions that bridge the physical and digital worlds, empowering industries and communities through cutting-edge robotic systems.",
    "teamTimeline": [
      { "year": "2024", "event": "Team Formation & First Robot Prototype" },
      { "year": "2025", "event": "Regional Robotics Competition Winner" },
      { "year": "2026", "event": "IoT Integration & Smart Manufacturing Project" },
      { "year": "2027", "event": "Autonomous Drone Fleet Development" }
    ],
    "teamAchievements": [
      "🏆 1st Place - National Robotics Championship 2025",
      "🎖️ Best Innovation Award - IoT Expo 2025",
      "🚀 Successfully deployed 15+ automation solutions",
      "📚 Published 8 research papers on autonomous systems",
      "🤝 Partnership with 12+ industrial clients"
    ]
  }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Team
INSERT INTO app_content (entity_type, data) VALUES ('team', '[
  {
    "id": "1",
    "name": "Kazi Ahammad Ullah",
    "role": "Co-Founder & CEO",
    "bio": "Vision, decision, leadership",
    "image": "https://lh3.googleusercontent.com/pw/AP1GczOUW1ZkyvpW6WV-C5OCLzDz1qlmsVlXo9Phu-_prnDMceAMjUlkB0WBrkq_DG1Rc4HgAjd8JyrywCP0fGBLfwWZUm8rqr-itNejJQH-0bFSyNcYBguHnbATvEhIpxGv_CdmStPn3-tBLxH7uKx_Rw4uNQ=w972-h842-s-no-gm?authuser=0",
    "linkedin": "https://ahammadportfolio.netlify.app/"
  },
  {
    "id": "2",
    "name": "Alahi Majnur Osama",
    "role": "Co-Founder & COO",
    "bio": "Operations, management, execution",
    "image": "https://lh3.googleusercontent.com/pw/AP1GczN5WSGo80KF7P2vNDJ54xRj80ysF_3OidXhDIy8w_YJYdz6w6MsdFTvFgKwuOP66cKs5GodlEDhkSt6ObO7bexL8Sx9nPNXeAfBlTyisWyp6-l1I3NTnGkzNiA8GtVAT64k2B43DWb7HMrEX2sbfjpZ2g=w842-h842-s-no-gm?authuser=0",
    "linkedin": "https://alahimajnurosama.vercel.app"
  },
  {
    "id": "3",
    "name": "Tajwar Saiyeed Abid",
    "role": "Co-Founder & CTO",
    "bio": "Technology, development, product",
    "image": "https://cdn.pixabay.com/photo/2023/03/05/21/11/ai-generated-7832244_1280.jpg",
    "linkedin": "https://Tajwar.app"
  },
  {
    "id": "4",
    "name": "Tahmidul Alam Ahad",
    "role": "Co-Founder & CMO",
    "bio": "Marketing, branding, growth",
    "image": "https://lh3.googleusercontent.com/pw/AP1GczOLQ8hlzOEeok3ToH61Zg6vwylLLPZAKOFSxmesyBfwz0Oy_XA6mELyhRp5xtqpBQil7v09kRpjv46RHyNDNyReNLDkhPR8Y-l8A_b0Ei7GbKtO4IJzB5LgfDR_jQkMLzNb3LIaJs2W5-vSdistHymJ2Q=w668-h842-s-no-gm?authuser=0",
    "linkedin": "https://www.linkedin.com/in/tahmidul-ahad"
  }
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
  { "id": "1", "name": "AWS", "logo": "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", "category": "Cloud Infrastructure", "description": "Strategic cloud partner for scalable infrastructure", "since": "2024" },
  { "id": "2", "name": "Microsoft Azure", "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg", "category": "Enterprise Solutions", "description": "Enterprise-grade cloud and AI services", "since": "2024" },
  { "id": "3", "name": "Google Cloud", "logo": "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg", "category": "AI & Machine Learning", "description": "Advanced AI and data analytics platform", "since": "2025" },
  { "id": "4", "name": "Docker", "logo": "https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png", "category": "DevOps", "description": "Containerization and deployment solutions", "since": "2023" },
  { "id": "5", "name": "Kubernetes", "logo": "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg", "category": "Orchestration", "description": "Container orchestration and management", "since": "2023" },
  { "id": "6", "name": "GitHub", "logo": "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png", "category": "Development", "description": "Version control and collaboration platform", "since": "2022" }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Projects
INSERT INTO app_content (entity_type, data) VALUES ('projects', '[
  { "id": "1", "title": "Nexus Financial Core", "category": "Software", "client": "FinGlobal Bank", "challenge": "Legacy systems causing 40% downtime during peak trading.", "solution": "Microservices architecture migration using Kubernetes and Go.", "impact": "99.99% Uptime, 300% faster transaction processing.", "image": "https://picsum.photos/800/600?random=1" },
  { "id": "2", "title": "Aegis Defense Grid", "category": "Security", "client": "GovTech Agency", "challenge": "Vulnerability to zero-day exploits in sensitive data pipelines.", "solution": "Implementation of AI-driven anomaly detection and air-gapped backups.", "impact": "Secured 5PB of national data; detected 50+ intrusive attempts.", "image": "https://picsum.photos/800/600?random=2" },
  { "id": "3", "title": "Auto-Logistics Bot", "category": "Robotics", "client": "MegaShip Logistics", "challenge": "Inefficient warehouse sorting leading to shipping delays.", "solution": "Fleet of autonomous mobile robots (AMRs) with swarm intelligence.", "impact": "Reduced sorting time by 65%, eliminated human error.", "image": "https://picsum.photos/800/600?random=3" },
  { "id": "4", "title": "Smart City Initiative", "category": "Consultancy", "client": "Metropolis Council", "challenge": "Disjointed public services and traffic congestion.", "solution": "Unified IoT data strategy and centralized command center dashboard.", "impact": "Traffic flow improved by 25%, energy usage dropped by 15%.", "image": "https://picsum.photos/800/600?random=4" }
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
  { "id": "roadmap_1", "refId": "R-2025-A", "quarter": "Q1 2025", "title": "QUANTUM ENCRYPTION", "description": "Post-quantum cryptographic layers for the core cyber infrastructure.", "progress": 65, "status": "IN_PROGRESS", "colorTheme": "from-blue-600/20 to-blue-900/10", "order": 0 },
  { "id": "roadmap_2", "refId": "B-2026-X", "quarter": "Q4 2026", "title": "BIOTECH INTERFACES", "description": "Neural link protocols for seamless man-machine integration in robotic wings.", "progress": 15, "status": "INITIAL_CONCEPT", "colorTheme": "from-purple-600/20 to-purple-900/10", "order": 1 },
  { "id": "roadmap_3", "refId": "S-2027-V", "quarter": "2027 PROJECT", "title": "AUTONOMOUS COLONIES", "description": "Self-repairing software architecture with genetic algorithmic evolution.", "progress": 0, "status": "SCHEDULED", "colorTheme": "from-gray-700/20 to-gray-900/10", "order": 2 },
  { "id": "roadmap_4", "refId": "G-2028-Z", "quarter": "2028 VIS", "title": "GENETIC ALGO", "description": "Synthesis of biological data storage with silicon based processors.", "progress": 0, "status": "HYPOTHETICAL", "colorTheme": "from-gray-700/20 to-gray-900/10", "order": 3 }
]'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Home Content
INSERT INTO app_content (entity_type, data) VALUES ('homeContent', '{
  "hero": {
    "title": "TECTONIC",
    "subtitle": "SHIFT",
    "description": "Architecting tomorrows infrastructure. We bridge the gap between human potential and machine intelligence.",
    "buttons": { "primary": "EXPLORE ECOSYSTEM", "secondary": "R&D LAB ACCESS" }
  },
  "wings": { "title": "OUR WINGS" },
  "projects": { "title": "FEATURED PROJECTS", "description": "Real-world solutions delivering measurable impact", "viewAll": "View All Projects" },
  "partnerships": {
    "title": "OUR PARTNERSHIPS",
    "description": "Collaborating with industry leaders to deliver excellence",
    "stats": [
      { "value": "6+", "label": "Strategic Partners", "color": "from-cyan-600 to-purple-600" },
      { "value": "4", "label": "Technology Sectors", "color": "from-purple-600 to-orange-600" },
      { "value": "99.9%", "label": "Service Uptime", "color": "from-orange-600 to-emerald-600" },
      { "value": "24/7", "label": "Global Support", "color": "from-emerald-600 to-cyan-600" }
    ]
  }
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Company Content
INSERT INTO app_content (entity_type, data) VALUES ('companyContent', '{
  "hero": {
    "badge": "HUMAN-CENTRIC TECHNOLOGY",
    "title": { "prefix": "THE ARCHITECTS", "highlight": "OF TOMORROW" },
    "description": "Tectonic isnt just a company; its a convergence of specialized intelligence. Founded on the belief that the future belongs to those who build it, we unify software, security, and robotics into a singular, evolutionary force."
  },
  "stats": [
    { "label": "Founded", "value": "2025" },
    { "label": "Global Offices", "value": "5" },
    { "label": "Engineers", "value": "12+" },
    { "label": "Patents", "value": "15" }
  ],
  "mission": {
    "title": "OUR MISSION",
    "text1": "We operate at the intersection of imagination and engineering. Our mandate is simple:",
    "highlight": "to dismantle the limitations of current infrastructure.",
    "text2": "From the microscopic precision of our code to the kinetic power of our robotics, every Techtonic innovation is designed to be scalable, secure, and sustainable. We dont just adapt to change; we author it.",
    "codeBlock": {
      "identity": "System.Identity.Load()",
      "visionVariable": "vision",
      "visionValue": "Limitless",
      "valuesVariable": "values",
      "values": ["Integrity", "Precision", "Evolution"]
    }
  },
  "certifications": { "title": "CERTIFICATIONS & RECOGNITION" }
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- Innovation Content
INSERT INTO app_content (entity_type, data) VALUES ('innovationContent', '{
  "hero": {
    "badge": "Innovation Lab",
    "title": "INNOVATION & R&D",
    "description": "Pushing boundaries with cutting-edge technology and experimental research",
    "buttons": { "newProject": "New Project", "exportData": "Export Data" }
  },
  "sections": {
    "techStack": { "title": "Tech Ecosystem", "badge": "99.9% Uptime" },
    "roadmap": { "title": "Future Roadmap" }
  },
  "stats": [
    { "label": "Active Experiments", "value": "42", "change": "+3", "iconName": "FlaskConical", "color": "purple" },
    { "label": "Compute Power", "value": "8.4", "unit": "PFLOPS", "iconName": "Activity", "color": "cyan" },
    { "label": "Patents Filed", "value": "128", "status": "Verified", "iconName": "CheckCircle2", "color": "green" }
  ]
}'::jsonb)
ON CONFLICT (entity_type) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();

-- ============================================================
-- CONFIG DATA (app_config table)
-- ============================================================

-- Site Settings
INSERT INTO app_config (key, value) VALUES ('siteSettings', '{
  "siteName": "Techtonic",
  "siteTagline": "Architecting Tomorrow",
  "maintenanceMode": false,
  "allowRegistration": false
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- Contact Config
INSERT INTO app_config (key, value) VALUES ('contactConfig', '{
  "address": {
    "street": "Chattogram, Bangladesh",
    "sector": "Dhaka, Bangladesh",
    "coordinates": "Lat: 23.8103, Long: 90.4125"
  },
  "contact": {
    "email": "support@techt0nic.com",
    "phone": "+880 171-1234567"
  },
  "socials": {
    "linkedin": "https://linkedin.com/company/techtonic",
    "facebook": "https://facebook.com/techtonic.official",
    "instagram": "https://instagram.com/techtonic",
    "twitter": "https://twitter.com/techtonic",
    "github": "https://github.com/techtonic"
  }
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- ============================================================
-- DEFAULT ADMIN USER
-- ============================================================

-- Password: admin123 (bcrypt hashed)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@tectonic.com', '$2a$10$rKLqVKzW8W8W8W8W8W8W8uKqVKzW8W8W8W8W8W8W8W8W8W8W8W', 'Admin', 'admin')
ON CONFLICT (email) DO NOTHING;
