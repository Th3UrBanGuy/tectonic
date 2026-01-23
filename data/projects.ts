import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus Financial Core',
    category: 'Software',
    client: 'FinGlobal Bank',
    challenge: 'Legacy systems causing 40% downtime during peak trading.',
    solution: 'Microservices architecture migration using Kubernetes and Go.',
    impact: '99.99% Uptime, 300% faster transaction processing.',
    image: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: '2',
    title: 'Aegis Defense Grid',
    category: 'Security',
    client: 'GovTech Agency',
    challenge: 'Vulnerability to zero-day exploits in sensitive data pipelines.',
    solution: 'Implementation of AI-driven anomaly detection and air-gapped backups.',
    impact: 'Secured 5PB of national data; detected 50+ intrusive attempts.',
    image: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: '3',
    title: 'Auto-Logistics Bot',
    category: 'Robotics',
    client: 'MegaShip Logistics',
    challenge: 'Inefficient warehouse sorting leading to shipping delays.',
    solution: 'Fleet of autonomous mobile robots (AMRs) with swarm intelligence.',
    impact: 'Reduced sorting time by 65%, eliminated human error.',
    image: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: '4',
    title: 'Smart City Initiative',
    category: 'Consultancy',
    client: 'Metropolis Council',
    challenge: 'Disjointed public services and traffic congestion.',
    solution: 'Unified IoT data strategy and centralized command center dashboard.',
    impact: 'Traffic flow improved by 25%, energy usage dropped by 15%.',
    image: 'https://picsum.photos/800/600?random=4'
  }
];