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
    id: 'mind-map-generator',
    title: 'Mind Map Generator',
    description: 'Automatic mindmap generator built with Next.js, LangChain, and OpenAI GPT-5-Nano',
    longDescription: 'The system analyzes input text, extracts key ideas, and generates a fully connected hierarchical mindmap with nodes and edges automatically positioned.',
    image: '/projects/mindmap.jpg',
    tags: ['AI', 'Frontend', 'Backend'],
    technologies: ['Next.js', 'LangChain', 'OpenAI GPT-5-Nano', 'text-embedding-3-small', 'Dagre.js', 'TypeScript'],
    category: 'web',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'Self-Project',
    links: {
      github: 'https://github.com/your-username/mental-map-generator',
    },
    highlights: [
      'Automatic hierarchical mindmap generation',
      'Dynamic node positioning with Dagre.js',
      'Output as structured JSON ready for visualization',
      'Mindmaps can be exported as PNG/JPEG',
    ],
    color: 'weaving-purple',
  },
  {
    id: 'web-search-agent',
    title: 'Web Search Agent',
    description: 'AI-powered real-time web search assistant with citation tracking',
    longDescription: 'Built with Next.js, TypeScript, and TailwindCSS. Uses OpenAI GPT-4o or Claude Sonnet to reason about user queries and perform real-time web searches.',
    image: '/projects/web-search.jpg',
    tags: ['AI', 'Frontend', 'Backend'],
    technologies: ['Next.js', 'TailwindCSS', 'OpenAI GPT-4o', 'Claude Sonnet', 'SerpApi'],
    category: 'web',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'Self-Project',
    links: {
      github: 'https://github.com/your-username/web-search-agent',
    },
    highlights: [
      'Real-time web search with SerpApi',
      'Interactive chat UI',
      'Dual LLM support (OpenAI GPT-4o & Claude Sonnet)',
      'Provides cited answers with sources',
    ],
    color: 'sky-blue',
  },
  {
    id: 'investment-dd-agent',
    title: 'Investment Due Diligence Agent',
    description: 'Multi-Agent RAG System for evaluating investment opportunities',
    longDescription: 'AI-powered system combining Financial, Market, and Decision agents, using OpenAI AI SDK and Pinecone for RAG (Retrieval-Augmented Generation) and document retrieval.',
    image: '/projects/investment-dd.jpg',
    tags: ['AI', 'Backend', 'Finance'],
    technologies: ['Next.js 15', 'TypeScript', 'OpenAI AI SDK', 'Pinecone', 'TailwindCSS', 'MCP Toolkit', 'Guardrails'],
    category: 'web',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'Self-Project',
    links: {
      github: 'https://github.com/your-username/investment-due-diligence-mvp',
    },
    highlights: [
      'Multi-agent architecture for financial and market analysis',
      'Generates due diligence reports with recommendations',
      'RAG system with Pinecone for document retrieval',
      'Guardrails and MCP Toolkit for secure and audited execution',
    ],
    color: 'terracotta',
  },
  {
    id: 'saas-ecommerce-ai-platform',
    title: 'SaaS E-Commerce AI Platform',
    description: 'Multi-tenant SaaS e-commerce platform with AI-powered shopping assistant',
    longDescription: 'Built with Next.js 14, TypeScript, Prisma, Supabase, and Vercel AI SDK. Features role-based dashboards, AI shopping assistant, and real-time product filtering.',
    image: '/projects/saas-ecommerce-ai.jpg',
    tags: ['AI', 'Frontend', 'Backend', 'SaaS'],
    technologies: ['Next.js 14', 'TypeScript', 'Prisma', 'Supabase', 'Vercel AI SDK', 'TailwindCSS'],
    category: 'saas',
    year: '2025',
    role: 'Full-Stack Developer',
    client: 'Self-Project',
    links: {
      github: 'https://github.com/your-username/saas-ecommerce-ai',
    },
    highlights: [
      'Multi-tenant architecture with isolated store data',
      'AI shopping assistant with structured tool calling (MCP)',
      'Role-based dashboards for Admin, Client, and End User',
      'Token usage tracking and real-time UI synchronization',
    ],
    color: 'weaving-pink',
  }
];

export const projectCategories = [
  { id: 'all', icon: '🎯' },
  { id: 'web', icon: '🌐' },
  // { id: 'mobile', icon: '📱' },
  // { id: 'ai', icon: '🤖' },
  { id: 'saas', icon: '💼' },
  // { id: 'ecommerce', icon: '🛒' },
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
