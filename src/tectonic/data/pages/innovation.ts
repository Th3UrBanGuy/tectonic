import { TechStackItem, RoadmapItem } from '../../types';
import {
  Code, Shield, Bot, Briefcase,
  Globe, Server, Cpu, Zap,
  Layers, Cloud, Network, FlaskConical,
  Activity, CheckCircle2
} from 'lucide-react';

export const INNOVATION_CONTENT = {
  hero: {
    badge: "Innovation Lab",
    title: "INNOVATION & R&D",
    description: "Pushing boundaries with cutting-edge technology and experimental research",
    buttons: {
      newProject: "New Project",
      exportData: "Export Data"
    }
  },
  sections: {
    techStack: {
      title: "Tech Ecosystem",
      badge: "99.9% Uptime"
    },
    roadmap: {
      title: "Future Roadmap"
    }
  },
  stats: [
    {
      label: "Active Experiments",
      value: "42",
      change: "+3",
      iconName: "FlaskConical",
      color: "purple"
    },
    {
      label: "Compute Power",
      value: "8.4",
      unit: "PFLOPS",
      iconName: "Activity",
      color: "cyan"
    },
    {
      label: "Patents Filed",
      value: "128",
      status: "Verified",
      iconName: "CheckCircle2",
      color: "green"
    }
  ]
};

export const INNOVATION_TECH_STACK: TechStackItem[] = [
  {
    id: 'tech_1',
    name: 'MERN STACK',
    version: 'V_8.4',
    status: 'SCALING',
    iconName: 'Layers',
    color: 'text-cyan-400',
    order: 0
  },
  {
    id: 'tech_2',
    name: 'NEXT.JS',
    version: 'V_14',
    status: 'OPTIMIZED',
    iconName: 'Zap',
    color: 'text-white',
    order: 1
  },
  {
    id: 'tech_3',
    name: 'CLOUD NATIVE',
    version: 'TERRAFORM',
    status: 'DEPLOYED',
    iconName: 'Cloud',
    color: 'text-blue-400',
    order: 2
  },
  {
    id: 'tech_4',
    name: 'RUST CORE',
    version: 'LOW_LATENCY',
    status: 'STABLE',
    iconName: 'Cpu',
    color: 'text-orange-400',
    order: 3
  },
  {
    id: 'tech_5',
    name: 'GRAPH DB',
    version: 'NEO4J',
    status: 'CONNECTED',
    iconName: 'Network',
    color: 'text-purple-400',
    order: 4
  },
  {
    id: 'tech_6',
    name: 'ROBOTICS OS',
    version: 'ROS_2',
    status: 'ACTIVE',
    iconName: 'Bot',
    color: 'text-green-400',
    order: 5
  }
];

export const INNOVATION_ROADMAP: RoadmapItem[] = [
  {
    id: 'roadmap_1',
    refId: 'R-2025-A',
    quarter: 'Q1 2025',
    title: 'QUANTUM ENCRYPTION',
    description: 'Post-quantum cryptographic layers for the core cyber infrastructure.',
    progress: 65,
    status: 'IN_PROGRESS',
    colorTheme: 'from-blue-600/20 to-blue-900/10',
    order: 0
  },
  {
    id: 'roadmap_2',
    refId: 'B-2026-X',
    quarter: 'Q4 2026',
    title: 'BIOTECH INTERFACES',
    description: 'Neural link protocols for seamless man-machine integration in robotic wings.',
    progress: 15,
    status: 'INITIAL_CONCEPT',
    colorTheme: 'from-purple-600/20 to-purple-900/10',
    order: 1
  },
  {
    id: 'roadmap_3',
    refId: 'S-2027-V',
    quarter: '2027 PROJECT',
    title: 'AUTONOMOUS COLONIES',
    description: 'Self-repairing software architecture with genetic algorithmic evolution.',
    progress: 0,
    status: 'SCHEDULED',
    colorTheme: 'from-gray-700/20 to-gray-900/10',
    order: 2
  },
  {
    id: 'roadmap_4',
    refId: 'G-2028-Z',
    quarter: '2028 VIS',
    title: 'GENETIC ALGO',
    description: 'Synthesis of biological data storage with silicon based processors.',
    progress: 0,
    status: 'HYPOTHETICAL',
    colorTheme: 'from-gray-700/20 to-gray-900/10',
    order: 3
  }
];