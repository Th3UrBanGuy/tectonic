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
    teamLogo: 'https://i.ibb.co.com/fVNm58bM/codex.png',
    teamSubtitle: 'Software Development Team',
    teamPurpose: 'CODEX is an elite software development team dedicated to crafting innovative digital solutions. We specialize in building scalable, cloud-native applications that transform businesses and drive digital excellence through cutting-edge technologies and best practices.',
    teamTimeline: [
      { year: '2023', event: 'Team Formation & First Enterprise Project' },
      { year: '2024', event: 'Cloud Migration Success - 50+ Clients' },
      { year: '2025', event: 'Launch of Proprietary SaaS Platform' },
      { year: '2026', event: 'AI-Powered Development Tools Release' }
    ],
    teamAchievements: [
      '🏆 Best Software Team - Tech Excellence Awards 2024',
      '⚡ 99.9% Uptime Achievement across all projects',
      '🚀 Deployed 100+ production applications',
      '💡 Created 5 open-source frameworks',
      '🌟 5-star client satisfaction rating'
    ]
  },
  {
    id: 'robotics',
    name: 'Robotics & Automation',
    tagline: 'Physical Intelligence',
    description: 'Bridging the gap between digital AI and physical action.',
    icon: Bot,
    color: 'text-purple-500',
    techStack: ['ROS', 'C++', 'Computer Vision', 'IoT'],
    features: ['Industrial Automation', 'Autonomous Drones', 'Smart Manufacturing'],
    teamName: 'Robo Avengers',
    teamLogo: 'https://i.ibb.co.com/vvMznZjR/Robo-Avengers.png',
    teamPurpose: 'Robo Avengers is dedicated to pioneering IoT-based robotics research and development. We focus on creating intelligent automation solutions that bridge the physical and digital worlds, empowering industries and communities through cutting-edge robotic systems.',
    teamTimeline: [
      { year: '2024', event: 'Team Formation & First Robot Prototype' },
      { year: '2025', event: 'Regional Robotics Competition Winner' },
      { year: '2026', event: 'IoT Integration & Smart Manufacturing Project' },
      { year: '2027', event: 'Autonomous Drone Fleet Development' }
    ],
    teamAchievements: [
      '🏆 1st Place - National Robotics Championship 2025',
      '🎖️ Best Innovation Award - IoT Expo 2025',
      '🚀 Successfully deployed 15+ automation solutions',
      '📚 Published 8 research papers on autonomous systems',
      '🤝 Partnership with 12+ industrial clients'
    ]
  }
];