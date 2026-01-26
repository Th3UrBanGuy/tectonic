import {
  Code, Shield, Bot, Briefcase
} from 'lucide-react';
import { Wing } from '../types';

export const WINGS: Wing[] = [
  {
    id: 'software',
    name: 'Software Mechanism',
    tagline: 'Digital Foundations',
    description: 'Building scalable cloud architectures and next-gen web applications.',
    icon: Code,
    color: 'text-cyan-500',
    techStack: ['React', 'Node.js', 'AWS', 'Docker', 'GraphQL'],
    features: ['Custom ERP Solutions', 'SaaS Development', 'Cloud Migration'],
    teamName: 'CODEX',
    teamLogo: '/assets/images/wings/codex.png',
    teamSubtitle: 'Software Development Team',
    teamPurpose: 'CODEX is an elite software development team dedicated to crafting innovative digital solutions. We specialize in building scalable, cloud-native applications that transform businesses and drive digital excellence through cutting-edge technologies and best practices.',
    teamTimeline: [
      { year: '2025', event: 'Launch of Proprietary SaaS Platform' },
      { year: '2026', event: 'AI-Powered Development Tools Release' }
    ],
    teamAchievements: [
      '🏆 IIUC NextGEN Hackathon - placed 11th place.',
    ]
  },
  {
    id: 'robotics',
    name: 'Robotics & IOT',
    tagline: 'Physical Intelligence',
    description: 'Bridging the gap between digital AI and physical action.',
    icon: Bot,
    color: 'text-purple-500',
    techStack: ['ROS', 'C++', 'Computer Vision', 'IoT'],
    features: ['Industrial Automation', 'Autonomous Drones', 'Smart Manufacturing'],
    teamName: 'Robo Avengers',
    teamLogo: '/assets/images/wings/robo.png',
    teamPurpose: 'Robo Avengers is dedicated to pioneering IoT-based robotics research and development. We focus on creating intelligent automation solutions that bridge the physical and digital worlds, empowering industries and communities through cutting-edge robotic systems.',
    teamTimeline: [
      { year: '2025', event: 'Line Following Robot (LFR) Development' },
      { year: '2025', event: 'Smart Blind Stick' },
      { year: '2024', event: 'IOT & First Robot Prototype' },
      { year: '2024', event: 'Traffic Management Academic Project' }
    ],
    teamAchievements: [
      '🏆 2nd Place - BGC CSE Fest'
    ]
  }
];