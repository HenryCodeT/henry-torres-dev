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
    year: '2022',
    title: 'Frontend Developer',
    company: 'Escuela Global',
    location: 'Cusco, Peru',
    description: 'Started my professional career building a complete administrative platform.',
    achievements: [
      'Developed dashboards, calendars and management modules using React and Redux',
      'Implemented form validation with React Hook Form and Yup',
      'Collaborated with backend developer to integrate Django REST APIs',
    ],
    technologies: ['React', 'Redux', 'JavaScript', 'Django', 'AWS EC2', 'MySQL'],
    icon: '💻',
    color: 'terracotta',
  },
  {
    year: '2022 - 2023',
    title: 'Full-Stack Developer',
    company: 'GeoVictoria',
    location: 'Remote',
    description:
      'Resolved complex issues in distributed systems and contributed to multiple integrations.',
    achievements: [
      'Analyzed and fixed escalated issues across .NET microservices and Node.js integrations',
      'Reproduced system failures locally and delivered root-cause fixes',
      'Worked with QA and DevOps teams to deploy stable improvements',
    ],
    technologies: ['React', 'TypeScript', 'C#', '.NET MVC', 'SQL Server', 'Node.js', 'Azure DevOps'],
    icon: '⚙️',
    color: 'sky-blue',
  },
  {
    year: '2023',
    title: 'Freelance Full-Stack Developer',
    company: 'Independent Client',
    location: 'Remote',
    description: 'Built a full-stack platform for a legal-sector client.',
    achievements: [
      'Designed and implemented a full application from scratch',
      'Developed APIs and database models using Prisma and MongoDB',
      'Deployed the platform to Vercel with CI/CD pipelines',
    ],
    technologies: ['Next.js', 'TypeScript', 'Node.js', 'Prisma', 'MongoDB', 'Firebase', 'Vercel'],
    icon: '🧩',
    color: 'weaving-pink',
  },
  {
    year: '2023 - 2024',
    title: 'Full-Stack Developer',
    company: 'FinFast',
    location: 'Remote',
    description: 'Migrated a large legacy React application into a modern Next.js architecture.',
    achievements: [
      'Implemented SSR and CSR strategies to improve performance across dashboards',
      'Built secure Next.js middleware for authentication and role validation',
      'Contributed to CI/CD pipelines and improved sprint workflow efficiency',
    ],
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind',
      'Redux',
      'SWR',
      '.NET 6',
      'LINQ',
      'SQL',
      'GitHub Actions'
    ],
    icon: '🚀',
    color: 'weaving-purple',
  },
  {
    year: '2024',
    title: 'Frontend Developer | LLM Evaluation',
    company: 'Turing',
    location: 'Remote',
    description:
      'Worked at the intersection of frontend development, AI evaluation, and automation.',
    achievements: [
      'Built UI components for multimodal chart generation using React and Next.js',
      'Evaluated AI-generated JavaScript/TypeScript code for correctness and best practices',
      'Created internal tools and automation scripts to improve team productivity',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'Jest'],
    icon: '🤖',
    color: 'sky-blue',
  },
];


export const aboutStats = [
  {
    value: '3+',
    label: 'Years of Experience',
    key: 'yearsExperience',
    color: 'terracotta',
  },
  {
    value: '5',
    label: 'Companies Worked With',
    key: 'companiesWorkedWith',
    color: 'sky-blue',
  },
  {
    value: '1',
    label: 'Freelance Client',
    key: 'freelanceClient',
    color: 'weaving-pink',
  },
];

export const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'GraphQL', 'REST APIs', 'WebSockets'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  devops: ['Docker', 'AWS', 'Vercel', 'CI/CD', 'Kubernetes'],
  tools: ['Git', 'VS Code', 'Figma', 'Postman', 'Jira'],
};
