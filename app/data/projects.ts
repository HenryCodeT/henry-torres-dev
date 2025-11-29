export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  technologies: string[];
  category: 'web' | 'mobile' | 'ai' | 'saas' | 'ecommerce';
  year: string;
  role: string;
  client?: string;
  links?: {
    live?: string;
    github?: string;
    case?: string;
  };
  highlights: string[];
  color: 'terracotta' | 'sky-blue' | 'weaving-pink' | 'weaving-purple' | 'weaving-yellow';
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with real-time inventory and AI recommendations',
    longDescription: 'Built a full-featured e-commerce platform serving 50k+ monthly users with real-time inventory management, AI-powered product recommendations, and seamless payment integration. Achieved 99.9% uptime and 40% faster page loads.',
    image: '/projects/ecommerce.jpg',
    tags: ['Frontend', 'Backend', 'AI'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis'],
    category: 'ecommerce',
    year: '2024',
    role: 'Tech Lead',
    client: 'Retail Corp',
    links: {
      live: 'https://example.com',
      case: '#',
    },
    highlights: [
      'Serving 50,000+ monthly active users',
      'Real-time inventory synchronization',
      'AI-powered product recommendations increasing conversion by 25%',
      '40% improvement in page load times',
    ],
    color: 'terracotta',
  },
  {
    id: 'saas-analytics',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics platform for tracking business metrics and KPIs',
    longDescription: 'Developed a comprehensive analytics dashboard that processes millions of events daily, providing real-time insights into user behavior, conversion funnels, and business metrics. Features custom visualization engine and advanced filtering.',
    image: '/projects/analytics.jpg',
    tags: ['Frontend', 'Backend', 'Data'],
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB', 'WebSockets'],
    category: 'saas',
    year: '2024',
    role: 'Full-Stack Developer',
    links: {
      github: 'https://github.com',
    },
    highlights: [
      'Processing 5M+ events per day',
      'Custom visualization engine with D3.js',
      'Real-time updates via WebSockets',
      'Sub-second query performance',
    ],
    color: 'sky-blue',
  },
  {
    id: 'ai-content-generator',
    title: 'AI Content Generator',
    description: 'AI-powered tool for generating marketing content and social media posts',
    longDescription: 'Created an AI content generation platform that helps marketers create engaging content 10x faster. Integrated multiple LLM providers with custom fine-tuning for brand voice consistency.',
    image: '/projects/ai-content.jpg',
    tags: ['AI', 'Frontend', 'Backend'],
    technologies: ['Next.js', 'OpenAI', 'Anthropic', 'Tailwind', 'PostgreSQL'],
    category: 'ai',
    year: '2024',
    role: 'Senior Developer',
    links: {
      live: 'https://example.com',
    },
    highlights: [
      '10x faster content creation',
      'Multi-LLM integration with fallbacks',
      'Brand voice customization',
      '95% customer satisfaction rate',
    ],
    color: 'weaving-purple',
  },
  {
    id: 'fitness-mobile-app',
    title: 'Fitness Tracking App',
    description: 'Cross-platform mobile app for workout tracking and nutrition planning',
    longDescription: 'Developed a comprehensive fitness tracking application with workout planning, nutrition logging, progress visualization, and social features. Built with React Native for iOS and Android.',
    image: '/projects/fitness.jpg',
    tags: ['Mobile', 'Frontend', 'Backend'],
    technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
    category: 'mobile',
    year: '2023',
    role: 'Full-Stack Developer',
    links: {
      live: 'https://example.com',
    },
    highlights: [
      '100,000+ downloads',
      'Cross-platform (iOS & Android)',
      'Offline-first architecture',
      '4.8⭐ average rating',
    ],
    color: 'weaving-pink',
  },
  {
    id: 'real-estate-portal',
    title: 'Real Estate Portal',
    description: 'Property listing platform with virtual tours and AI-powered search',
    longDescription: 'Built a modern real estate platform featuring advanced property search, 360° virtual tours, mortgage calculators, and AI-powered property recommendations based on user preferences.',
    image: '/projects/realestate.jpg',
    tags: ['Web', 'Frontend', 'Backend'],
    technologies: ['Next.js', 'Three.js', 'PostgreSQL', 'AWS'],
    category: 'web',
    year: '2023',
    role: 'Full-Stack Developer',
    highlights: [
      '5,000+ property listings',
      '360° virtual tour integration',
      'AI-powered property matching',
      'Advanced map-based search',
    ],
    color: 'weaving-yellow',
  },
  {
    id: 'healthcare-appointment',
    title: 'Healthcare Appointment System',
    description: 'Telemedicine platform with video consultations and EHR integration',
    longDescription: 'Developed a HIPAA-compliant telemedicine platform enabling video consultations, appointment scheduling, prescription management, and electronic health records integration.',
    image: '/projects/healthcare.jpg',
    tags: ['Web', 'Backend', 'Healthcare'],
    technologies: ['React', 'WebRTC', 'Node.js', 'MongoDB', 'AWS'],
    category: 'saas',
    year: '2023',
    role: 'Senior Developer',
    highlights: [
      'HIPAA-compliant architecture',
      'HD video consultations',
      'EHR system integration',
      '20,000+ successful appointments',
    ],
    color: 'sky-blue',
  },
];

export const projectCategories = [
  { id: 'all', icon: '🎯' },
  { id: 'web', icon: '🌐' },
  { id: 'mobile', icon: '📱' },
  { id: 'ai', icon: '🤖' },
  { id: 'saas', icon: '💼' },
  { id: 'ecommerce', icon: '🛒' },
];

export const projectTags = [
  'Frontend',
  'Backend',
  'Mobile',
  'AI',
  'Data',
  'Web',
  'Healthcare',
];

export const projectStats = {
  totalProjects: projects.length,
  totalClients: projects.filter(p => p.client).length,
  categories: projectCategories.length - 1, // Exclude "All"
  technologies: [...new Set(projects.flatMap(p => p.technologies))].length,
};
