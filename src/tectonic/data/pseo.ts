// Programmatic SEO seed data — Industries × Services combinations.
// Each entry generates a route at /{industry-slug}/{service-slug}.

export interface IndustrySeed {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
}

export interface ServicePageSeed {
  industrySlug: string;
  serviceSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  bodyContent: string;
  features: string[];
  techStack: string[];
  ctaText: string;
  ctaLink: string;
}

export const INDUSTRIES: IndustrySeed[] = [
  {
    slug: "retail",
    name: "Retail & E-Commerce",
    description:
      "Digital transformation solutions for retail businesses, from inventory management to omnichannel experiences.",
    metaTitle:
      "Retail & E-Commerce Software Solutions | Techtonic",
    metaDescription:
      "Custom software, POS systems, and automation solutions built for retail and e-commerce businesses. Boost sales and streamline operations with Techtonic.",
    icon: "ShoppingCart",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "HIPAA-compliant software systems for hospitals, clinics, and health-tech startups.",
    metaTitle:
      "Healthcare Software Development | Techtonic",
    metaDescription:
      "Secure, compliant software solutions for healthcare providers. EHR systems, telemedicine platforms, and patient management built by Techtonic.",
    icon: "Heart",
  },
  {
    slug: "finance",
    name: "Finance & Banking",
    description:
      "Fintech solutions, payment systems, and regulatory-compliant platforms for financial institutions.",
    metaTitle:
      "Fintech & Banking Software Solutions | Techtonic",
    metaDescription:
      "Build secure fintech platforms, payment gateways, and banking software with Techtonic. Regulatory compliance and enterprise security guaranteed.",
    icon: "Landmark",
  },
  {
    slug: "education",
    name: "Education & EdTech",
    description:
      "Learning management systems, student portals, and edtech platforms for modern education.",
    metaTitle:
      "Education & EdTech Software Development | Techtonic",
    metaDescription:
      "Custom LMS, student management, and edtech platforms built for schools, universities, and online education providers by Techtonic.",
    icon: "GraduationCap",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description:
      "Industrial automation, IoT integration, and smart factory solutions for manufacturers.",
    metaTitle:
      "Manufacturing Automation & IoT Solutions | Techtonic",
    metaDescription:
      "Automate production lines, integrate IoT sensors, and build smart factory systems with Techtonic's manufacturing software solutions.",
    icon: "Factory",
  },
  {
    slug: "logistics",
    name: "Logistics & Supply Chain",
    description:
      "Fleet management, warehouse automation, and supply chain optimization platforms.",
    metaTitle:
      "Logistics & Supply Chain Software | Techtonic",
    metaDescription:
      "Optimize your supply chain with custom logistics software, fleet tracking, and warehouse automation from Techtonic.",
    icon: "Truck",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description:
      "Property management systems, listing platforms, and CRM solutions for real estate businesses.",
    metaTitle:
      "Real Estate Software Solutions | Techtonic",
    metaDescription:
      "Build property management systems, real estate CRMs, and listing platforms with Techtonic's custom software solutions.",
    icon: "Building2",
  },
  {
    slug: "hospitality",
    name: "Hospitality & Food",
    description:
      "Booking systems, restaurant management, and hospitality platforms for hotels and restaurants.",
    metaTitle:
      "Hospitality & Restaurant Software | Techtonic",
    metaDescription:
      "Custom booking systems, restaurant management, and hospitality platforms built by Techtonic. Streamline operations and boost guest satisfaction.",
    icon: "UtensilsCrossed",
  },
];

export const SERVICES = [
  {
    slug: "custom-software",
    name: "Custom Software Development",
  },
  {
    slug: "automation",
    name: "Process Automation",
  },
  {
    slug: "pos-systems",
    name: "POS Systems",
  },
  {
    slug: "inventory-management",
    name: "Inventory Management",
  },
  {
    slug: "data-analytics",
    name: "Data Analytics & BI",
  },
  {
    slug: "cloud-migration",
    name: "Cloud Migration",
  },
  {
    slug: "ai-ml",
    name: "AI & Machine Learning",
  },
  {
    slug: "mobile-apps",
    name: "Mobile App Development",
  },
];

// ─── Page content for each industry × service combination ──────────────────
// Key format: "{industrySlug}/{serviceSlug}"

export const SERVICE_PAGES: Record<string, ServicePageSeed> = {
  // ── Retail ──────────────────────────────────────────────────────────────
  "retail/custom-software": {
    industrySlug: "retail",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Retail",
    metaTitle:
      "Custom Retail Software Development | Techtonic",
    metaDescription:
      "Build bespoke retail software — e-commerce platforms, POS integrations, and customer loyalty systems — with Techtonic's expert development team.",
    heroTitle: "Custom Software for Retail",
    heroSubtitle: "Digital-First Retail Experiences",
    heroDescription:
      "From e-commerce platforms to in-store systems, we build custom software that powers modern retail operations and delights customers.",
    bodyContent:
      "The retail landscape demands agility. Techtonic builds custom software solutions that unify your online and offline channels, automate inventory workflows, and deliver personalized shopping experiences. Our team architects scalable platforms using Next.js, Node.js, and cloud-native infrastructure — built to handle Black Friday traffic and daily operations alike.",
    features: [
      "E-commerce platform development",
      "POS system integration",
      "Customer loyalty & rewards programs",
      "Omnichannel inventory sync",
      "Real-time analytics dashboards",
      "Mobile shopping applications",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Docker",
      "AWS",
    ],
    ctaText: "Build Your Retail Platform",
    ctaLink: "/contact",
  },
  "retail/automation": {
    industrySlug: "retail",
    serviceSlug: "automation",
    title: "Process Automation for Retail",
    metaTitle:
      "Retail Process Automation Solutions | Techtonic",
    metaDescription:
      "Automate retail operations — inventory restocking, order processing, and customer communications — with Techtonic's automation solutions.",
    heroTitle: "Retail Automation",
    heroSubtitle: "Streamline Every Operation",
    heroDescription:
      "Eliminate manual workflows. Our automation solutions handle inventory reordering, order fulfillment, and customer engagement so your team focuses on growth.",
    bodyContent:
      "Retail operations involve hundreds of repetitive tasks. Techtonic automates the entire pipeline — from smart inventory restocking triggered by real-time sales data, to automated order confirmation and shipping notification sequences. Our solutions integrate with your existing POS, ERP, and CRM systems.",
    features: [
      "Automated inventory replenishment",
      "Order processing automation",
      "Customer email/SMS workflows",
      "Price adjustment automation",
      "Returns & refund processing",
      "Staff scheduling optimization",
    ],
    techStack: [
      "Node.js",
      "Python",
      "RabbitMQ",
      "PostgreSQL",
      "REST APIs",
      "Cron Jobs",
    ],
    ctaText: "Automate Your Retail Operations",
    ctaLink: "/contact",
  },
  "retail/pos-systems": {
    industrySlug: "retail",
    serviceSlug: "pos-systems",
    title: "POS Systems for Retail",
    metaTitle:
      "Custom POS System Development | Techtonic",
    metaDescription:
      "Build modern, cloud-based POS systems for retail stores. Inventory tracking, multi-payment support, and real-time reporting included.",
    heroTitle: "Modern POS Systems",
    heroSubtitle: "Point of Sale, Reimagined",
    heroDescription:
      "Cloud-based POS systems that handle payments, track inventory, and provide real-time sales insights — built for modern retail environments.",
    bodyContent:
      "Techtonic builds POS systems that go beyond simple transactions. Our cloud-based solutions integrate inventory management, customer profiles, and analytics into a single intuitive interface. Whether you need a single-terminal solution or a multi-store enterprise platform, we deliver.",
    features: [
      "Cloud-based POS architecture",
      "Multi-payment method support",
      "Real-time inventory tracking",
      "Customer profile & purchase history",
      "Employee management & permissions",
      "Offline mode with sync capability",
    ],
    techStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Square API",
      "WebSocket",
    ],
    ctaText: "Get Your Custom POS",
    ctaLink: "/contact",
  },
  "retail/inventory-management": {
    industrySlug: "retail",
    serviceSlug: "inventory-management",
    title: "Inventory Management for Retail",
    metaTitle:
      "Retail Inventory Management Software | Techtonic",
    metaDescription:
      "Real-time inventory tracking, automated stock alerts, and warehouse management systems for retail businesses by Techtonic.",
    heroTitle: "Inventory Management",
    heroSubtitle: "Never Run Out, Never Overstock",
    heroDescription:
      "Real-time visibility into every SKU across every location. Smart alerts, automated reordering, and demand forecasting built into one platform.",
    bodyContent:
      "Inventory is your biggest asset and your biggest risk. Techtonic's inventory management solutions provide real-time stock visibility across all channels, automate reorder points based on historical sales data, and integrate with your suppliers for seamless procurement. Reduce carrying costs while preventing stockouts.",
    features: [
      "Real-time multi-location inventory",
      "Automated reorder point alerts",
      "Supplier management portal",
      "Demand forecasting with AI",
      "Barcode/QR code scanning",
      "Dead stock identification",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Barcode APIs",
      "Docker",
    ],
    ctaText: "Optimize Your Inventory",
    ctaLink: "/contact",
  },
  "retail/data-analytics": {
    industrySlug: "retail",
    serviceSlug: "data-analytics",
    title: "Data Analytics for Retail",
    metaTitle:
      "Retail Data Analytics & Business Intelligence | Techtonic",
    metaDescription:
      "Turn retail data into insights. Sales analytics, customer behavior tracking, and predictive forecasting by Techtonic.",
    heroTitle: "Retail Analytics",
    heroSubtitle: "Data-Driven Decisions",
    heroDescription:
      "Transform raw sales data into actionable insights. Understand customer behavior, optimize pricing, and forecast demand with precision.",
    bodyContent:
      "Every transaction tells a story. Techtonic builds analytics platforms that aggregate data from your POS, e-commerce, and marketing channels into unified dashboards. Identify your best-selling products, understand customer buying patterns, and optimize your pricing strategy with real-time intelligence.",
    features: [
      "Sales performance dashboards",
      "Customer behavior analytics",
      "Product affinity analysis",
      "Price optimization models",
      "Marketing ROI tracking",
      "Predictive demand forecasting",
    ],
    techStack: [
      "Python",
      "PostgreSQL",
      "Apache Kafka",
      "Grafana",
      "Machine Learning",
      "Next.js",
    ],
    ctaText: "Unlock Your Retail Data",
    ctaLink: "/contact",
  },
  "retail/cloud-migration": {
    industrySlug: "retail",
    serviceSlug: "cloud-migration",
    title: "Cloud Migration for Retail",
    metaTitle:
      "Retail Cloud Migration Services | Techtonic",
    metaDescription:
      "Migrate your retail systems to the cloud. From legacy POS to cloud-native e-commerce, Techtonic handles the full transition.",
    heroTitle: "Cloud Migration for Retail",
    heroSubtitle: "From Legacy to Cloud-Native",
    heroDescription:
      "Modernize your retail infrastructure. Migrate on-premise systems to scalable cloud platforms with zero downtime and full data integrity.",
    bodyContent:
      "Legacy systems slow you down. Techtonic migrates your retail infrastructure — POS databases, inventory systems, e-commerce platforms — to modern cloud architectures. We ensure zero downtime during migration, data integrity throughout, and immediate performance improvements post-migration.",
    features: [
      "Legacy system assessment",
      "Zero-downtime migration",
      "Data integrity verification",
      "Cloud infrastructure setup (AWS/GCP)",
      "Performance optimization",
      "Staff training & documentation",
    ],
    techStack: [
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "PostgreSQL",
      "Redis",
    ],
    ctaText: "Start Your Cloud Migration",
    ctaLink: "/contact",
  },
  "retail/ai-ml": {
    industrySlug: "retail",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Retail",
    metaTitle:
      "AI & ML Solutions for Retail | Techtonic",
    metaDescription:
      "AI-powered recommendation engines, demand forecasting, and visual search for retail businesses. Built by Techtonic's AI team.",
    heroTitle: "AI for Retail",
    heroSubtitle: "Intelligent Retail Experiences",
    heroDescription:
      "Personalize every customer journey with AI. Recommendation engines, visual search, and demand forecasting that drive revenue.",
    bodyContent:
      "AI is transforming retail. Techtonic builds machine learning models that power personalized product recommendations, predict demand to optimize inventory, enable visual search so customers find products by photo, and automate customer service with intelligent chatbots. Our solutions integrate seamlessly with your existing retail stack.",
    features: [
      "Product recommendation engines",
      "Demand forecasting models",
      "Visual search integration",
      "Customer churn prediction",
      "Dynamic pricing optimization",
      "AI-powered chatbots",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "OpenAI API",
      "FastAPI",
      "PostgreSQL",
      "Redis",
    ],
    ctaText: "Add AI to Your Retail Stack",
    ctaLink: "/contact",
  },
  "retail/mobile-apps": {
    industrySlug: "retail",
    serviceSlug: "mobile-apps",
    title: "Mobile Apps for Retail",
    metaTitle:
      "Retail Mobile App Development | Techtonic",
    metaDescription:
      "Build native and cross-platform retail mobile apps with loyalty programs, push notifications, and in-app purchases by Techtonic.",
    heroTitle: "Retail Mobile Apps",
    heroSubtitle: "Shopping in Your Customers' Pockets",
    heroDescription:
      "Native iOS and Android apps that keep your brand in your customers' pockets. Loyalty programs, push notifications, and seamless checkout.",
    bodyContent:
      "Mobile commerce is growing faster than any other channel. Techtonic builds retail mobile apps that drive engagement and revenue — from loyalty program integration and push notification campaigns to one-tap checkout and augmented reality product previews. We build for both iOS and Android using React Native and Flutter.",
    features: [
      "Native iOS & Android development",
      "Loyalty program integration",
      "Push notification campaigns",
      "In-app payments (Apple Pay, Google Pay)",
      "Augmented reality product preview",
      "Offline catalog browsing",
    ],
    techStack: [
      "React Native",
      "Flutter",
      "Node.js",
      "Firebase",
      "Stripe",
      "Firebase Cloud Messaging",
    ],
    ctaText: "Build Your Retail App",
    ctaLink: "/contact",
  },

  // ── Healthcare ──────────────────────────────────────────────────────────
  "healthcare/custom-software": {
    industrySlug: "healthcare",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Healthcare",
    metaTitle:
      "Healthcare Software Development | Techtonic",
    metaDescription:
      "HIPAA-compliant healthcare software — EHR systems, telemedicine platforms, and patient portals built by Techtonic's secure development team.",
    heroTitle: "Healthcare Software",
    heroSubtitle: "Secure, Compliant, Reliable",
    heroDescription:
      "HIPAA-compliant software built for healthcare providers. From EHR systems to telemedicine platforms, security and reliability come first.",
    bodyContent:
      "Healthcare software demands the highest standards of security and compliance. Techtonic builds HIPAA-compliant systems — electronic health records, telemedicine platforms, patient portals, and clinical workflow tools. Our development process includes security audits, compliance verification, and rigorous testing at every stage.",
    features: [
      "Electronic Health Record (EHR) systems",
      "Telemedicine platform development",
      "Patient portal creation",
      "Clinical workflow automation",
      "HIPAA compliance implementation",
      "Interoperability (HL7/FHIR)",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS (HIPAA)",
      "TypeScript",
    ],
    ctaText: "Build Your Healthcare Platform",
    ctaLink: "/contact",
  },
  "healthcare/automation": {
    industrySlug: "healthcare",
    serviceSlug: "automation",
    title: "Process Automation for Healthcare",
    metaTitle:
      "Healthcare Process Automation | Techtonic",
    metaDescription:
      "Automate patient intake, appointment scheduling, and billing workflows. HIPAA-compliant automation by Techtonic.",
    heroTitle: "Healthcare Automation",
    heroSubtitle: "Automate Clinical Workflows",
    heroDescription:
      "Reduce administrative burden. Automate patient intake, scheduling, billing, and follow-up workflows with HIPAA-compliant solutions.",
    bodyContent:
      "Healthcare providers spend too much time on administrative tasks. Techtonic automates patient intake forms, appointment scheduling, insurance verification, billing workflows, and follow-up communication — freeing your staff to focus on patient care.",
    features: [
      "Automated patient intake",
      "Smart appointment scheduling",
      "Insurance verification automation",
      "Billing & claims processing",
      "Follow-up email/SMS workflows",
      "Staff shift scheduling",
    ],
    techStack: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "REST APIs",
      "FHIR/HL7",
      "Docker",
    ],
    ctaText: "Automate Healthcare Workflows",
    ctaLink: "/contact",
  },
  "healthcare/ai-ml": {
    industrySlug: "healthcare",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Healthcare",
    metaTitle:
      "AI Solutions for Healthcare | Techtonic",
    metaDescription:
      "AI-powered diagnostic assistance, patient risk prediction, and medical image analysis for healthcare providers by Techtonic.",
    heroTitle: "AI for Healthcare",
    heroSubtitle: "Intelligent Clinical Decision Support",
    heroDescription:
      "Augment clinical decision-making with AI. Diagnostic assistance, patient risk scoring, and medical image analysis — built with regulatory compliance.",
    bodyContent:
      "AI in healthcare requires precision and compliance. Techtonic builds machine learning models that assist with clinical diagnosis, predict patient readmission risk, analyze medical images, and automate clinical documentation. All models are designed with explainability and regulatory compliance in mind.",
    features: [
      "Clinical decision support systems",
      "Patient risk prediction models",
      "Medical image analysis",
      "Automated clinical documentation",
      "Drug interaction checking",
      "Population health analytics",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "FastAPI",
      "PostgreSQL",
      "DICOM",
      "Docker",
    ],
    ctaText: "Implement AI in Healthcare",
    ctaLink: "/contact",
  },
  "healthcare/mobile-apps": {
    industrySlug: "healthcare",
    serviceSlug: "mobile-apps",
    title: "Mobile Apps for Healthcare",
    metaTitle:
      "Healthcare Mobile App Development | Techtonic",
    metaDescription:
      "Patient-facing and provider mobile apps for healthcare. Telemedicine, appointment booking, and health tracking by Techtonic.",
    heroTitle: "Healthcare Mobile Apps",
    heroSubtitle: "Healthcare at Your Fingertips",
    heroDescription:
      "Patient and provider mobile apps — telemedicine consultations, appointment booking, prescription management, and health tracking.",
    bodyContent:
      "Mobile apps are transforming patient engagement. Techtonic builds healthcare mobile apps that enable telemedicine consultations, appointment booking, prescription refills, health metric tracking, and secure messaging with providers. All apps meet HIPAA requirements for data protection.",
    features: [
      "Telemedicine video consultations",
      "Appointment booking & reminders",
      "Prescription management",
      "Health metric tracking",
      "Secure provider messaging",
      "Insurance card storage",
    ],
    techStack: [
      "React Native",
      "Flutter",
      "Node.js",
      "WebRTC",
      "Firebase",
      "HIPAA-compliant storage",
    ],
    ctaText: "Build Your Health App",
    ctaLink: "/contact",
  },

  // ── Finance ─────────────────────────────────────────────────────────────
  "finance/custom-software": {
    industrySlug: "finance",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Finance",
    metaTitle:
      "Fintech & Banking Software Development | Techtonic",
    metaDescription:
      "Build secure fintech platforms, banking software, and trading systems with Techtonic. PCI-DSS compliance and enterprise security.",
    heroTitle: "Fintech Software",
    heroSubtitle: "Secure Financial Platforms",
    heroDescription:
      "PCI-DSS compliant software for banks, fintech startups, and financial institutions. Trading platforms, payment systems, and more.",
    bodyContent:
      "Financial software requires uncompromising security. Techtonic builds PCI-DSS compliant platforms — trading systems, payment gateways, loan management, and banking applications. Our security-first approach includes penetration testing, code audits, and compliance verification at every milestone.",
    features: [
      "Payment gateway development",
      "Trading platform creation",
      "Loan management systems",
      "KYC/AML compliance tools",
      "Real-time transaction monitoring",
      "Regulatory reporting automation",
    ],
    techStack: [
      "Node.js",
      "Go",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "Docker",
      "AWS",
    ],
    ctaText: "Build Your Fintech Platform",
    ctaLink: "/contact",
  },
  "finance/automation": {
    industrySlug: "finance",
    serviceSlug: "automation",
    title: "Process Automation for Finance",
    metaTitle:
      "Financial Process Automation | Techtonic",
    metaDescription:
      "Automate compliance checks, transaction processing, and reporting workflows for financial institutions by Techtonic.",
    heroTitle: "Finance Automation",
    heroSubtitle: "Automate Compliance & Operations",
    heroDescription:
      "Automate regulatory compliance, transaction processing, and financial reporting. Reduce manual work and eliminate human error.",
    bodyContent:
      "Financial operations involve complex, error-prone manual processes. Techtonic automates compliance checks, transaction reconciliation, regulatory reporting, and client onboarding workflows — reducing processing time by orders of magnitude while eliminating human error.",
    features: [
      "Automated compliance checking",
      "Transaction reconciliation",
      "Regulatory report generation",
      "Client onboarding automation",
      "Fraud detection workflows",
      "Audit trail automation",
    ],
    techStack: [
      "Python",
      "Node.js",
      "PostgreSQL",
      "Apache Kafka",
      "REST APIs",
      "Docker",
    ],
    ctaText: "Automate Financial Workflows",
    ctaLink: "/contact",
  },
  "finance/ai-ml": {
    industrySlug: "finance",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Finance",
    metaTitle:
      "AI Solutions for Finance & Banking | Techtonic",
    metaDescription:
      "AI-powered fraud detection, credit scoring, and algorithmic trading systems for financial institutions by Techtonic.",
    heroTitle: "AI for Finance",
    heroSubtitle: "Intelligent Financial Intelligence",
    heroDescription:
      "Fraud detection, credit scoring, and algorithmic trading — AI models that give financial institutions a competitive edge.",
    bodyContent:
      "AI is reshaping finance. Techtonic builds machine learning models for real-time fraud detection, automated credit scoring, algorithmic trading strategies, and customer sentiment analysis. Our models are designed for high-throughput, low-latency financial environments.",
    features: [
      "Real-time fraud detection",
      "Automated credit scoring",
      "Algorithmic trading models",
      "Customer risk profiling",
      "Market sentiment analysis",
      "Anti-money laundering (AML) AI",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "Apache Kafka",
      "PostgreSQL",
      "Redis",
      "FastAPI",
    ],
    ctaText: "Add AI to Financial Services",
    ctaLink: "/contact",
  },

  // ── Education ───────────────────────────────────────────────────────────
  "education/custom-software": {
    industrySlug: "education",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Education",
    metaTitle:
      "EdTech Software Development | Techtonic",
    metaDescription:
      "Custom LMS, student management systems, and edtech platforms built for schools, universities, and online education providers by Techtonic.",
    heroTitle: "EdTech Software",
    heroSubtitle: "Learning Platforms, Built Right",
    heroDescription:
      "Custom learning management systems, student portals, and educational platforms that scale from classrooms to global audiences.",
    bodyContent:
      "Education technology needs to be accessible, engaging, and scalable. Techtonic builds custom LMS platforms, student management systems, virtual classroom tools, and assessment engines. Our solutions support millions of learners while maintaining intuitive interfaces for students and educators.",
    features: [
      "Learning Management System (LMS)",
      "Student information systems",
      "Virtual classroom platforms",
      "Assessment & grading engines",
      "Parent portal development",
      "Course marketplace platforms",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "WebRTC",
      "Redis",
      "Docker",
    ],
    ctaText: "Build Your EdTech Platform",
    ctaLink: "/contact",
  },
  "education/ai-ml": {
    industrySlug: "education",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Education",
    metaTitle:
      "AI Solutions for Education | Techtonic",
    metaDescription:
      "AI-powered personalized learning, automated grading, and student performance prediction for edtech platforms by Techtonic.",
    heroTitle: "AI for Education",
    heroSubtitle: "Personalized Learning at Scale",
    heroDescription:
      "Personalized learning paths, automated assessment, and student performance prediction — AI that adapts to every learner.",
    bodyContent:
      "Every student learns differently. Techtonic builds AI systems that personalize learning paths based on individual progress, automate essay grading with natural language processing, predict student performance to enable early intervention, and power intelligent tutoring systems.",
    features: [
      "Personalized learning paths",
      "Automated essay grading (NLP)",
      "Student performance prediction",
      "Intelligent tutoring systems",
      "Plagiarism detection AI",
      "Adaptive assessment engines",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "OpenAI API",
      "FastAPI",
      "PostgreSQL",
      "Redis",
    ],
    ctaText: "Add AI to Your EdTech Platform",
    ctaLink: "/contact",
  },
  "education/mobile-apps": {
    industrySlug: "education",
    serviceSlug: "mobile-apps",
    title: "Mobile Apps for Education",
    metaTitle:
      "Education Mobile App Development | Techtonic",
    metaDescription:
      "Student and teacher mobile apps for education. Offline learning, push notifications, and interactive content by Techtonic.",
    heroTitle: "Education Mobile Apps",
    heroSubtitle: "Learn Anywhere, Anytime",
    heroDescription:
      "Mobile learning apps with offline support, interactive content, and real-time collaboration — built for students and educators on the go.",
    bodyContent:
      "Learning doesn't stop at the classroom door. Techtonic builds education mobile apps that support offline content access, interactive quizzes, real-time collaboration, and push notification reminders. Students learn on their schedule, teachers manage on theirs.",
    features: [
      "Offline content downloading",
      "Interactive quiz & flashcard apps",
      "Real-time collaboration tools",
      "Push notification reminders",
      "Progress tracking dashboards",
      "Parent & teacher communication",
    ],
    techStack: [
      "React Native",
      "Flutter",
      "Node.js",
      "Firebase",
      "SQLite",
      "WebSocket",
    ],
    ctaText: "Build Your Education App",
    ctaLink: "/contact",
  },

  // ── Manufacturing ───────────────────────────────────────────────────────
  "manufacturing/custom-software": {
    industrySlug: "manufacturing",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Manufacturing",
    metaTitle:
      "Manufacturing Software Development | Techtonic",
    metaDescription:
      "Custom MES, ERP modules, and production management software for manufacturers by Techtonic. Industry 4.0 ready.",
    heroTitle: "Manufacturing Software",
    heroSubtitle: "Industry 4.0 Solutions",
    heroDescription:
      "Custom manufacturing execution systems, ERP modules, and production management platforms built for the smart factory era.",
    bodyContent:
      "Manufacturing is undergoing a digital revolution. Techtonic builds custom software that connects your production floor to your business systems — MES platforms, quality management systems, production scheduling, and ERP integrations. Our solutions are built for Industry 4.0.",
    features: [
      "Manufacturing Execution Systems (MES)",
      "Quality management platforms",
      "Production scheduling software",
      "ERP integration modules",
      "Shop floor data collection",
      "Work order management",
    ],
    techStack: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "MQTT",
      "Docker",
      "AWS IoT",
    ],
    ctaText: "Digitize Your Factory",
    ctaLink: "/contact",
  },
  "manufacturing/automation": {
    industrySlug: "manufacturing",
    serviceSlug: "automation",
    title: "Process Automation for Manufacturing",
    metaTitle:
      "Manufacturing Process Automation | Techtonic",
    metaDescription:
      "Industrial automation, robotic process automation, and smart production line optimization by Techtonic.",
    heroTitle: "Manufacturing Automation",
    heroSubtitle: "Automate the Production Line",
    heroDescription:
      "Industrial automation that transforms production lines. Robotic integration, predictive maintenance, and real-time quality control.",
    bodyContent:
      "Techtonic automates manufacturing processes from end to end. Our solutions include robotic process automation for repetitive tasks, predictive maintenance systems that prevent costly downtime, real-time quality control using computer vision, and production line optimization using IoT sensor data.",
    features: [
      "Robotic process automation",
      "Predictive maintenance systems",
      "Computer vision quality control",
      "Production line optimization",
      "Automated reporting & compliance",
      "Energy consumption optimization",
    ],
    techStack: [
      "Python",
      "C++",
      "ROS",
      "TensorFlow",
      "MQTT",
      "PLC Integration",
    ],
    ctaText: "Automate Your Production",
    ctaLink: "/contact",
  },
  "manufacturing/ai-ml": {
    industrySlug: "manufacturing",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Manufacturing",
    metaTitle:
      "AI Solutions for Manufacturing | Techtonic",
    metaDescription:
      "AI-powered predictive maintenance, quality inspection, and production optimization for manufacturers by Techtonic.",
    heroTitle: "AI for Manufacturing",
    heroSubtitle: "Intelligent Production",
    heroDescription:
      "Predictive maintenance, AI-powered quality inspection, and production optimization — reducing waste and maximizing uptime.",
    bodyContent:
      "AI in manufacturing delivers measurable ROI. Techtonic builds machine learning models that predict equipment failures before they happen, inspect products using computer vision, optimize production schedules, and reduce material waste. Our solutions integrate with your existing PLC and SCADA systems.",
    features: [
      "Predictive maintenance AI",
      "Computer vision quality inspection",
      "Production schedule optimization",
      "Material waste reduction models",
      "Energy optimization algorithms",
      "Supply chain demand prediction",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "FastAPI",
      "MQTT",
      "Time Series DB",
    ],
    ctaText: "Add AI to Manufacturing",
    ctaLink: "/contact",
  },

  // ── Logistics ───────────────────────────────────────────────────────────
  "logistics/custom-software": {
    industrySlug: "logistics",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Logistics",
    metaTitle:
      "Logistics Software Development | Techtonic",
    metaDescription:
      "Custom fleet management, warehouse management, and supply chain platforms built by Techtonic for logistics companies.",
    heroTitle: "Logistics Software",
    heroSubtitle: "Supply Chain Intelligence",
    heroDescription:
      "Fleet management, warehouse systems, and supply chain platforms that give logistics companies real-time visibility and control.",
    bodyContent:
      "Logistics operates on precision and timing. Techtonic builds custom software that provides real-time fleet tracking, warehouse management, route optimization, and supply chain visibility. Our platforms integrate with GPS, IoT sensors, and carrier APIs to deliver end-to-end logistics intelligence.",
    features: [
      "Fleet management systems",
      "Warehouse management (WMS)",
      "Route optimization engines",
      "Supply chain visibility platforms",
      "Carrier integration portals",
      "Last-mile delivery tracking",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Mapbox APIs",
      "Docker",
    ],
    ctaText: "Build Your Logistics Platform",
    ctaLink: "/contact",
  },
  "logistics/automation": {
    industrySlug: "logistics",
    serviceSlug: "automation",
    title: "Process Automation for Logistics",
    metaTitle:
      "Logistics Process Automation | Techtonic",
    metaDescription:
      "Automate warehouse operations, shipment tracking, and carrier selection for logistics companies by Techtonic.",
    heroTitle: "Logistics Automation",
    heroSubtitle: "Automate the Supply Chain",
    heroDescription:
      "Automate warehouse workflows, shipment processing, and carrier selection. Reduce manual work and accelerate fulfillment.",
    bodyContent:
      "Logistics is full of repetitive manual processes. Techtonic automates warehouse pick-and-pack workflows, shipment label generation, carrier selection and rate comparison, and delivery confirmation sequences — reducing processing time and eliminating costly errors.",
    features: [
      "Warehouse workflow automation",
      "Automated shipment processing",
      "Smart carrier selection",
      "Delivery confirmation automation",
      "Returns processing automation",
      "Invoice & billing automation",
    ],
    techStack: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "REST APIs",
      "RabbitMQ",
      "Docker",
    ],
    ctaText: "Automate Logistics Operations",
    ctaLink: "/contact",
  },
  "logistics/ai-ml": {
    industrySlug: "logistics",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Logistics",
    metaTitle:
      "AI Solutions for Logistics | Techtonic",
    metaDescription:
      "AI-powered route optimization, demand forecasting, and warehouse automation for logistics companies by Techtonic.",
    heroTitle: "AI for Logistics",
    heroSubtitle: "Intelligent Logistics",
    heroDescription:
      "Route optimization, demand forecasting, and autonomous warehouse operations — AI that makes logistics faster and cheaper.",
    bodyContent:
      "AI optimizes every link in the supply chain. Techtonic builds ML models that optimize delivery routes in real-time, forecast demand to position inventory proactively, automate warehouse robot coordination, and predict delivery times with precision.",
    features: [
      "Real-time route optimization",
      "Demand forecasting models",
      "Warehouse robot coordination",
      "Delivery time prediction",
      "Anomaly detection in shipments",
      "Capacity planning optimization",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "OR-Tools",
      "PostgreSQL",
      "Redis",
      "FastAPI",
    ],
    ctaText: "Add AI to Your Supply Chain",
    ctaLink: "/contact",
  },

  // ── Real Estate ─────────────────────────────────────────────────────────
  "real-estate/custom-software": {
    industrySlug: "real-estate",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Real Estate",
    metaTitle:
      "Real Estate Software Development | Techtonic",
    metaDescription:
      "Custom property management systems, listing platforms, and real estate CRM solutions built by Techtonic.",
    heroTitle: "Real Estate Software",
    heroSubtitle: "Property Tech Solutions",
    heroDescription:
      "Property management systems, listing platforms, and CRM solutions that modernize real estate operations.",
    bodyContent:
      "Real estate is going digital. Techtonic builds custom property management systems, MLS-integrated listing platforms, tenant portals, and CRM solutions that streamline agent workflows and improve client experiences. Our platforms handle everything from virtual tours to lease management.",
    features: [
      "Property management systems",
      "MLS-integrated listing platforms",
      "Tenant portal development",
      "Real estate CRM solutions",
      "Virtual tour integration",
      "Lease management automation",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Mapbox APIs",
      "Cloudinary",
      "Docker",
    ],
    ctaText: "Build Your Property Platform",
    ctaLink: "/contact",
  },
  "real-estate/ai-ml": {
    industrySlug: "real-estate",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Real Estate",
    metaTitle:
      "AI Solutions for Real Estate | Techtonic",
    metaDescription:
      "AI-powered property valuation, market prediction, and intelligent matching for real estate platforms by Techtonic.",
    heroTitle: "AI for Real Estate",
    heroSubtitle: "Smart Property Intelligence",
    heroDescription:
      "Automated property valuation, market trend prediction, and buyer-property matching — AI that closes deals faster.",
    bodyContent:
      "AI transforms how properties are valued, marketed, and sold. Techtonic builds models for automated property valuation (AVM), market trend prediction, buyer-property matching, and investment risk analysis. Our solutions help agents and investors make data-driven decisions.",
    features: [
      "Automated property valuation (AVM)",
      "Market trend prediction",
      "Buyer-property matching AI",
      "Investment risk analysis",
      "Neighborhood scoring models",
      "Price negotiation intelligence",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "PostgreSQL",
      "Geospatial APIs",
      "FastAPI",
      "Redis",
    ],
    ctaText: "Add AI to Real Estate",
    ctaLink: "/contact",
  },

  // ── Hospitality ──────────────────────────────────────────────────────────
  "hospitality/custom-software": {
    industrySlug: "hospitality",
    serviceSlug: "custom-software",
    title: "Custom Software Development for Hospitality",
    metaTitle:
      "Hospitality Software Development | Techtonic",
    metaDescription:
      "Custom booking systems, restaurant management, and hotel operations software built by Techtonic for the hospitality industry.",
    heroTitle: "Hospitality Software",
    heroSubtitle: "Guest Experience Platforms",
    heroDescription:
      "Booking systems, restaurant management platforms, and hotel operations software that elevate guest experiences.",
    bodyContent:
      "Hospitality thrives on guest experience. Techtonic builds custom booking engines, restaurant point-of-sale systems, hotel property management systems, and guest experience platforms. Our solutions integrate with OTA channels, payment processors, and loyalty programs.",
    features: [
      "Booking engine development",
      "Restaurant POS systems",
      "Hotel PMS integration",
      "Guest experience platforms",
      "Channel manager systems",
      "Loyalty program platforms",
    ],
    techStack: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Docker",
    ],
    ctaText: "Build Your Hospitality Platform",
    ctaLink: "/contact",
  },
  "hospitality/automation": {
    industrySlug: "hospitality",
    serviceSlug: "automation",
    title: "Process Automation for Hospitality",
    metaTitle:
      "Hospitality Process Automation | Techtonic",
    metaDescription:
      "Automate hotel check-in, restaurant operations, and guest communication workflows by Techtonic.",
    heroTitle: "Hospitality Automation",
    heroSubtitle: "Automate Guest Journeys",
    heroDescription:
      "Automate check-in/check-out, reservation management, and guest communication. Focus on hospitality, not paperwork.",
    bodyContent:
      "Hospitality staff spend too much time on administration. Techtonic automates hotel check-in/check-out processes, reservation management, guest communication sequences, housekeeping scheduling, and billing workflows — so your team can focus on delivering exceptional experiences.",
    features: [
      "Automated check-in/check-out",
      "Reservation management automation",
      "Guest communication workflows",
      "Housekeeping scheduling",
      "F&B order processing",
      "Review response automation",
    ],
    techStack: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "REST APIs",
      "Twilio",
      "Docker",
    ],
    ctaText: "Automate Hospitality Operations",
    ctaLink: "/contact",
  },
  "hospitality/ai-ml": {
    industrySlug: "hospitality",
    serviceSlug: "ai-ml",
    title: "AI & Machine Learning for Hospitality",
    metaTitle:
      "AI Solutions for Hospitality | Techtonic",
    metaDescription:
      "AI-powered dynamic pricing, guest sentiment analysis, and personalized recommendations for hotels and restaurants by Techtonic.",
    heroTitle: "AI for Hospitality",
    heroSubtitle: "Intelligent Guest Experiences",
    heroDescription:
      "Dynamic pricing, sentiment analysis, and personalized guest recommendations — AI that maximizes revenue and satisfaction.",
    bodyContent:
      "AI helps hospitality businesses maximize revenue and guest satisfaction. Techtonic builds dynamic pricing models for room rates, sentiment analysis for guest reviews, personalized recommendation engines for dining and activities, and demand forecasting for capacity planning.",
    features: [
      "Dynamic pricing optimization",
      "Guest sentiment analysis",
      "Personalized recommendation engines",
      "Demand forecasting",
      "Staff allocation optimization",
      "Menu engineering AI (restaurants)",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "NLP",
      "PostgreSQL",
      "FastAPI",
      "Redis",
    ],
    ctaText: "Add AI to Hospitality",
    ctaLink: "/contact",
  },
};
