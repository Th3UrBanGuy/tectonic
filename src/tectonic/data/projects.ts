import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Amader Bazar',
    category: 'E-commerce',
    client: 'SkyLine Retail Group',
    challenge: 'Creating a high-performance ecosystem to replace traditional inventory lag with sub-second load times.',
    solution: 'Developed a full-stack ecosystem using Next.js 15 App Router and Serverless Edge Functions.',
    impact: 'Achieved 99.9% performance scores with edge caching and secure Stripe integration.',
    image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/298453987/original/c53dde9b276de00b53844af875dfb74341ced72d/create-an-ecommerce-website-using-woocommerce.png',
    techStack: ['Next.js 15', 'TypeScript', 'Prisma ORM', 'MongoDB', 'Stripe', 'Docker'],
    links: { live: 'https://amader-bazar.tajwar.app/' }
  },
  {
    id: '2',
    title: 'Gym Management System',
    category: 'Software',
    client: 'Titan Fitness Labs',
    challenge: 'Manual tracking of attendance and payments leading to fragmented data and student churn.',
    solution: 'Engineered a multi-role web application with dedicated dashboards for admins, trainers, and students.',
    impact: 'Automated billing and real-time workout tracking for over 500+ active members.',
    image: 'https://techostudios.com/wp-content/uploads/2018/11/Gym-system-cover.jpg',
    techStack: ['Next.js', 'Prisma ORM', 'MongoDB', 'Stripe', 'Material UI', 'Cloudinary'],
    links: { live: 'https://gms.tajwar.app/' }
  },
  {
    id: '3',
    title: 'Dev Resume Template',
    category: 'Web Tool',
    client: 'OpenSource Community',
    challenge: 'Standard resume formats fail to effectively showcase live project demos and technical GitHub metrics.',
    solution: 'Designed a developer-centric template prioritizing project portfolios and technical stack visualization.',
    impact: '100% responsive design with sub-second navigation performance.',
    image: 'https://smashresume.com/wp-content/uploads/edd/2018/09/Simple-Developers-Resume-700x525.jpg',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    links: { live: 'https://dev-resume-template.vercel.app/' }
  },
  {
    id: '4',
    title: 'SmartTodoCanvas',
    category: 'Productivity',
    client: 'FocusFlow Systems',
    challenge: 'List-based task managers lack spatial organization, making it difficult to visualize complex workflows.',
    solution: 'Developed an infinite zooming canvas with AI for automatic categorization and non-overlapping drag-and-drop.',
    impact: 'Increased task visibility and workflow speed via real-time AI-powered task assistance.',
    image: 'https://img.freepik.com/premium-photo/digital-task-mastery-flat-vector-illustration-efficient-todo-management_839035-712021.jpg',
    techStack: ['Next.js', 'React 19', 'Google Generative AI', '@dnd-kit/core', 'Framer Motion'],
    links: { live: 'https://smarttodo.vercel.app/' }
  },
  {
    id: '5',
    title: 'Secondbrains.app',
    category: 'Collaborative Research',
    client: 'EduTech Insights',
    challenge: 'Research materials are often scattered, making it difficult for teams to extract key concepts efficiently.',
    solution: 'Built a centralized hub featuring live-editing boards and AI-driven summarization of research notes.',
    impact: 'Integrated real-time collaboration with automated concept extraction via Google Generative AI.',
    image: 'https://miro.medium.com/v2/resize:fit:1200/1*63rqaLkU67RJxfgovFQ_CA.png',
    techStack: ['Next.js', 'TypeScript', 'Prisma ORM', 'Radix UI', '@google/generative-ai'],
    links: { live: 'https://secondbrains.app/' }
  },
  {
    id: '6',
    title: 'GroceryMart',
    category: 'E-commerce',
    client: 'FreshPick Markets',
    challenge: 'Lack of real-time synchronization between front-end shopping and back-end inventory management.',
    solution: 'Developed a decoupled Next.js and Django platform with real-time inventory updates.',
    impact: 'Streamlined order fulfillment process through an automated custom admin dashboard.',
    image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f408cf128079499.614ef83489687.png',
    techStack: ['Next.js', 'Django', 'Django REST Framework', 'PostgreSQL', 'Stripe', 'Docker'],
    links: { live: 'https://grocery-mart-tsa.vercel.app/' }
  },
  {
    id: '7',
    title: 'Candidate Evaluation AI',
    category: 'Human Resources',
    client: 'TalentStream HR',
    challenge: 'Manual resume screening is prone to human bias and highly inefficient for large applicant pools.',
    solution: 'Developed an AI platform that automates resume parsing and candidate profiling using LLMs.',
    impact: 'Reduced screening time by 70% while providing objective, data-driven candidate rankings.',
    image: 'https://static.vecteezy.com/system/resources/previews/042/346/262/non_2x/ai-in-financial-management-call-center-online-people-are-using-artificial-intelligence-to-use-money-efficiently-online-robots-with-innovative-technologies-help-financiers-automate-bank-payments-vector.jpg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'AI Integration'],
    links: { live: 'https://candidate-evaluation-with-ai.vercel.app/' }
  },
  {
    id: '8',
    title: 'PDF RAG PoC',
    category: 'AI Engineering',
    client: 'InteleDoc Solutions',
    challenge: 'Extracting grounded information from massive PDFs is slow and manually intensive.',
    solution: 'Developed a RAG pipeline indexing PDF content into Qdrant for chat-based document interaction.',
    impact: 'Enabled high-concurrency document querying via an asynchronous BullMQ and Redis architecture.',
    image: 'https://miro.medium.com/v2/resize:fit:1358/1*QEhHhCL51-VAc1BL3iprSA.jpeg',
    techStack: ['React 19', 'Node.js 20', 'LangChain', 'Qdrant', 'OpenAI API', 'Redis'],
    links: { live: 'https://pdf-rag-poc.vercel.app/' }
  },
  {
    id: '9',
    title: 'Urban POS',
    category: 'Software',
    client: 'Urban Retail Co.',
    challenge: 'Standard POS systems lack modularity and real-time pricing synchronization for multi-store setups.',
    solution: 'Engineered a modular POS with separate Access Centers and real-time live pricing triggers.',
    impact: 'Integrated ExchangeRate API for instant pricing accuracy and Firebase for serverless scaling.',
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/1de2be167601063.Y3JvcCwxMzgwLDEwODAsMTAsMA.png',
    techStack: ['Next.js', 'Firebase', 'React', 'Shadcn/ui', 'ExchangeRate API'],
    links: { live: 'https://urbanpos.vercel.app' }
  }
];