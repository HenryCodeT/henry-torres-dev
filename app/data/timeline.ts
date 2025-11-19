export interface TimelineItem {
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  icon: string;
  color: 'terracotta' | 'sky-blue' | 'weaving-pink' | 'weaving-purple';
}

export const timelineData: TimelineItem[] = [
  {
    year: '2021',
    title: 'Junior Full-Stack Developer',
    company: 'Tech Startup',
    location: 'Lima, Peru',
    description: 'Started my professional journey building scalable web applications',
    achievements: [
      'Built responsive web applications using React and Node.js',
      'Collaborated with cross-functional teams in agile environment',
      'Contributed to legacy codebase modernization',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    icon: '🚀',
    color: 'terracotta',
  },
  {
    year: '2022',
    title: 'Full-Stack Developer',
    company: 'Digital Agency',
    location: 'Remote',
    description: 'Expanded expertise in modern web technologies and cloud platforms',
    achievements: [
      'Led development of 10+ client projects from concept to deployment',
      'Implemented CI/CD pipelines reducing deployment time by 60%',
      'Mentored junior developers and conducted code reviews',
    ],
    technologies: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
    icon: '⚡',
    color: 'sky-blue',
  },
  {
    year: '2023',
    title: 'Senior Full-Stack Developer',
    company: 'SaaS Company',
    location: 'Remote',
    description: 'Advanced to senior role, architecting enterprise-level solutions',
    achievements: [
      'Architected microservices infrastructure serving 100k+ users',
      'Optimized application performance achieving 40% faster load times',
      'Led technical interviews and helped grow engineering team',
    ],
    technologies: ['React', 'Next.js', 'Docker', 'Kubernetes', 'GraphQL'],
    icon: '🎯',
    color: 'weaving-pink',
  },
  {
    year: '2024',
    title: 'Tech Lead & Consultant',
    company: 'Independent',
    location: 'Peru & Worldwide',
    description: 'Consulting and leading technical projects for global clients',
    achievements: [
      'Delivered 15+ projects with 100% client satisfaction',
      'Specialized in AI integration and modern web architectures',
      'Built this amazing portfolio with AI-powered features',
    ],
    technologies: ['Next.js', 'AI/ML', 'Vercel', 'Tailwind', 'TypeScript'],
    icon: '🦙',
    color: 'weaving-purple',
  },
];

export const aboutStats = [
  {
    value: '4+',
    label: 'Years of Experience',
    color: 'terracotta',
  },
  {
    value: '50+',
    label: 'Projects Completed',
    color: 'sky-blue',
  },
  {
    value: '20+',
    label: 'Happy Clients',
    color: 'weaving-pink',
  },
  {
    value: '100%',
    label: 'Dedication',
    color: 'weaving-purple',
  },
];

export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'WebSockets'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  devops: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'Kubernetes'],
  tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jira'],
};
