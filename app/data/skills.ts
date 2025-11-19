export interface Skill {
  name: string;
  level: number; // 1-5 (5 being expert)
  icon?: string; // Optional emoji
  color: string;
  description: string;
}

export interface SkillLayer {
  name: string;
  elevation: string; // Mountain metaphor
  description: string;
  color: 'terracotta' | 'sky-blue' | 'weaving-pink' | 'weaving-purple' | 'weaving-yellow';
  skills: Skill[];
}

// Mountain structure: Peak (Expert) → Summit → Mid-Mountain → Base → Foundation
export const skillMountain: SkillLayer[] = [
  {
    name: 'Peak',
    elevation: '6,000m - Expert Level',
    description: 'Technologies I master and use daily',
    color: 'weaving-purple',
    skills: [
      {
        name: 'React',
        level: 5,
        icon: '⚛️',
        color: '#61DAFB',
        description: 'Expert in React 19, hooks, context, performance optimization',
      },
      {
        name: 'Next.js',
        level: 5,
        icon: '▲',
        color: '#000000',
        description: 'App Router, SSR, ISR, API Routes, middleware, optimization',
      },
      {
        name: 'TypeScript',
        level: 5,
        icon: '📘',
        color: '#3178C6',
        description: 'Advanced types, generics, type guards, strict mode',
      },
    ],
  },
  {
    name: 'Summit',
    elevation: '5,000m - Advanced',
    description: 'Strong expertise, frequently used',
    color: 'sky-blue',
    skills: [
      {
        name: 'Node.js',
        level: 4,
        icon: '🟢',
        color: '#339933',
        description: 'Express, async patterns, streams, performance',
      },
      {
        name: 'Tailwind CSS',
        level: 5,
        icon: '🎨',
        color: '#06B6D4',
        description: 'Custom configs, plugins, JIT, responsive design',
      },
      {
        name: 'PostgreSQL',
        level: 4,
        icon: '🐘',
        color: '#336791',
        description: 'Schema design, queries, indexes, optimization',
      },
      {
        name: 'GraphQL',
        level: 4,
        icon: '◈',
        color: '#E10098',
        description: 'Schema design, resolvers, Apollo, caching',
      },
    ],
  },
  {
    name: 'Mid-Mountain',
    elevation: '4,000m - Proficient',
    description: 'Solid working knowledge',
    color: 'weaving-pink',
    skills: [
      {
        name: 'Docker',
        level: 4,
        icon: '🐳',
        color: '#2496ED',
        description: 'Containerization, multi-stage builds, compose',
      },
      {
        name: 'AWS',
        level: 3,
        icon: '☁️',
        color: '#FF9900',
        description: 'EC2, S3, Lambda, CloudFront, RDS',
      },
      {
        name: 'MongoDB',
        level: 4,
        icon: '🍃',
        color: '#47A248',
        description: 'Schema design, aggregation, indexing',
      },
      {
        name: 'Redis',
        level: 3,
        icon: '🔴',
        color: '#DC382D',
        description: 'Caching, pub/sub, sessions',
      },
      {
        name: 'Prisma',
        level: 4,
        icon: '△',
        color: '#2D3748',
        description: 'ORM, migrations, type-safe queries',
      },
    ],
  },
  {
    name: 'Base',
    elevation: '3,000m - Competent',
    description: 'Working knowledge and growing',
    color: 'weaving-yellow',
    skills: [
      {
        name: 'Kubernetes',
        level: 3,
        icon: '☸️',
        color: '#326CE5',
        description: 'Deployments, services, pods, configs',
      },
      {
        name: 'Python',
        level: 3,
        icon: '🐍',
        color: '#3776AB',
        description: 'Scripts, data processing, APIs',
      },
      {
        name: 'CI/CD',
        level: 4,
        icon: '🔄',
        color: '#2088FF',
        description: 'GitHub Actions, GitLab CI, automated workflows',
      },
      {
        name: 'Jest',
        level: 4,
        icon: '🃏',
        color: '#C21325',
        description: 'Unit tests, integration tests, mocking',
      },
    ],
  },
  {
    name: 'Foundation',
    elevation: '2,000m - Core Skills',
    description: 'Essential tools and practices',
    color: 'terracotta',
    skills: [
      {
        name: 'Git',
        level: 5,
        icon: '📦',
        color: '#F05032',
        description: 'Version control, branching, rebasing, workflows',
      },
      {
        name: 'REST APIs',
        level: 5,
        icon: '🔌',
        color: '#009688',
        description: 'Design, documentation, best practices',
      },
      {
        name: 'Figma',
        level: 3,
        icon: '🎨',
        color: '#F24E1E',
        description: 'UI design, prototyping, design systems',
      },
      {
        name: 'Agile',
        level: 4,
        icon: '🏃',
        color: '#0052CC',
        description: 'Scrum, sprints, standups, retrospectives',
      },
      {
        name: 'WebSockets',
        level: 3,
        icon: '🔌',
        color: '#010101',
        description: 'Real-time communication, Socket.io',
      },
    ],
  },
];

// Skill categories for filtering
export const skillCategories = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  backend: ['Node.js', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'REST APIs'],
  devops: ['Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Git'],
  testing: ['Jest'],
  design: ['Figma'],
  other: ['Python', 'Agile', 'WebSockets'],
};

// Overall stats
export const skillStats = {
  totalSkills: skillMountain.reduce((sum, layer) => sum + layer.skills.length, 0),
  expertLevel: skillMountain[0].skills.length + skillMountain.filter(layer =>
    layer.skills.some(s => s.level === 5)
  ).length,
  yearsExperience: 4,
  categories: Object.keys(skillCategories).length,
};
