export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
  pricing?: string;
  timeline?: string;
  popular?: boolean;
  color: 'terracotta' | 'sky-blue' | 'weaving-pink' | 'weaving-purple' | 'weaving-yellow';
}

export const services: Service[] = [
  {
    id: 'webDevelopment',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies for scalability and performance',
    icon: '🌐',
    features: [
      'Responsive design for all devices',
      'SEO optimization and performance tuning',
      'Modern frameworks (React, Next.js)',
      'Progressive Web Apps (PWA)',
      'API integration and development',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    deliverables: [
      'Fully functional web application',
      'Source code and documentation',
      '3 months of free support',
      'Deployment and hosting setup',
    ],
    pricing: 'Starting at $5,000',
    timeline: '4-8 weeks',
    color: 'sky-blue',
  },
  {
    id: 'fullstackDevelopment',
    title: 'Full-Stack Development',
    description: 'End-to-end solutions from database design to frontend implementation',
    icon: '⚡',
    features: [
      'Complete frontend and backend development',
      'Database design and optimization',
      'RESTful and GraphQL APIs',
      'Real-time features with WebSockets',
      'Cloud deployment and scaling',
    ],
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    deliverables: [
      'Full-stack application',
      'Database schema and migrations',
      'API documentation',
      'CI/CD pipeline setup',
    ],
    pricing: 'Starting at $10,000',
    timeline: '8-12 weeks',
    popular: true,
    color: 'weaving-purple',
  },
  {
    id: 'aiIntegration',
    title: 'AI Integration',
    description: 'Integrate AI and machine learning capabilities into your applications',
    icon: '🤖',
    features: [
      'LLM integration (GPT, Claude, etc.)',
      'Custom AI workflows and automation',
      'RAG systems for knowledge bases',
      'AI-powered features and chatbots',
      'Fine-tuning and prompt engineering',
    ],
    technologies: ['OpenAI', 'Anthropic', 'LangChain', 'Vector DBs'],
    deliverables: [
      'AI-powered features',
      'Integration documentation',
      'Training and knowledge transfer',
      'Optimization and monitoring',
    ],
    pricing: 'Starting at $7,500',
    timeline: '6-10 weeks',
    color: 'weaving-pink',
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    description: 'Expert guidance on architecture, technology choices, and best practices',
    icon: '💡',
    features: [
      'Architecture review and recommendations',
      'Technology stack evaluation',
      'Code review and optimization',
      'Performance audits',
      'Team training and mentorship',
    ],
    technologies: ['Architecture', 'Best Practices', 'Code Review'],
    deliverables: [
      'Detailed technical report',
      'Architecture diagrams',
      'Actionable recommendations',
      'Follow-up sessions',
    ],
    pricing: '$150/hour',
    timeline: 'Flexible',
    color: 'weaving-yellow',
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance for your web applications',
    icon: '🔧',
    features: [
      'Bug fixes and updates',
      'Security patches and monitoring',
      'Performance optimization',
      'Feature enhancements',
      '24/7 emergency support available',
    ],
    technologies: ['All Major Frameworks', 'DevOps', 'Monitoring'],
    deliverables: [
      'Monthly status reports',
      'Regular updates and patches',
      'Performance metrics',
      'Priority support access',
    ],
    pricing: 'Starting at $2,000/month',
    timeline: 'Ongoing',
    color: 'terracotta',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration and inventory management',
    icon: '🛒',
    features: [
      'Custom e-commerce platforms',
      'Payment gateway integration',
      'Inventory management systems',
      'Admin dashboards',
      'Analytics and reporting',
    ],
    technologies: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    deliverables: [
      'Complete e-commerce platform',
      'Payment integration',
      'Admin panel',
      'Analytics dashboard',
    ],
    pricing: 'Starting at $12,000',
    timeline: '10-16 weeks',
    color: 'sky-blue',
  },
];

export const workProcess = [
  {
    step: 1,
    title: 'Discovery',
    description: 'Understanding your needs, goals, and technical requirements',
    icon: '🔍',
    duration: '1-2 days',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'Creating detailed project plan, timeline, and architecture',
    icon: '📋',
    duration: '2-3 days',
  },
  {
    step: 3,
    title: 'Development',
    description: 'Building your solution with regular updates and demos',
    icon: '⚙️',
    duration: 'Project dependent',
  },
  {
    step: 4,
    title: 'Testing',
    description: 'Thorough testing, QA, and performance optimization',
    icon: '🧪',
    duration: '1-2 weeks',
  },
  {
    step: 5,
    title: 'Launch',
    description: 'Deployment, monitoring, and training for your team',
    icon: '🚀',
    duration: '3-5 days',
  },
  {
    step: 6,
    title: 'Support',
    description: 'Ongoing support, maintenance, and improvements',
    icon: '🤝',
    duration: 'Ongoing',
  },
];

export const whyChooseMe = [
  {
    id: 'experience',
    title: '4+ Years Experience',
    description: 'Proven track record delivering high-quality projects',
    icon: '📚',
  },
  {
    id: 'modernStack',
    title: 'Modern Tech Stack',
    description: 'Using cutting-edge technologies and best practices',
    icon: '⚡',
  },
  {
    id: 'communication',
    title: 'Clear Communication',
    description: 'Regular updates and transparent project management',
    icon: '💬',
  },
  {
    id: 'satisfaction',
    title: '100% Satisfaction',
    description: 'Committed to delivering results that exceed expectations',
    icon: '⭐',
  },
];
