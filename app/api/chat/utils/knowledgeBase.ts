import fs from 'fs';
import path from 'path';

/**
 * Knowledge base configuration
 * Maps categories to their corresponding .md files and keywords
 */
const KNOWLEDGE_CONFIG = {
  about: {
    file: 'about.md',
    keywords: {
      en: ['about', 'who', 'experience', 'background', 'bio', 'introduction', 'henry'],
      es: ['sobre', 'quién', 'quien', 'experiencia', 'biografía', 'biografia', 'introducción', 'introduccion', 'henry'],
    },
  },
  skills: {
    file: 'skills.md',
    keywords: {
      en: ['skill', 'technology', 'tech', 'stack', 'know', 'proficient', 'expert', 'language', 'framework', 'tool'],
      es: ['habilidad', 'habilidades', 'tecnología', 'tecnologia', 'stack', 'sabe', 'conoce', 'domina', 'experto', 'lenguaje', 'framework', 'herramienta'],
    },
  },
  services: {
    file: 'services.md',
    keywords: {
      en: ['service', 'offer', 'price', 'pricing', 'cost', 'hire', 'work', 'consulting', 'development', 'build'],
      es: ['servicio', 'servicios', 'ofrece', 'precio', 'precios', 'costo', 'contratar', 'trabajo', 'consultoría', 'consultoria', 'desarrollo', 'construir'],
    },
  },
  projects: {
    file: 'projects.md',
    keywords: {
      en: ['project', 'portfolio', 'built', 'developed', 'work', 'example', 'case', 'study', 'client'],
      es: ['proyecto', 'proyectos', 'portafolio', 'portfolio', 'construido', 'desarrollado', 'trabajo', 'ejemplo', 'caso', 'estudio', 'cliente'],
    },
  },
  contact: {
    file: 'contact.md',
    keywords: {
      en: ['contact', 'reach', 'email', 'message', 'talk', 'discuss', 'availability', 'available', 'hire', 'linkedin', 'github'],
      es: ['contacto', 'contactar', 'correo', 'email', 'mensaje', 'hablar', 'discutir', 'disponibilidad', 'disponible', 'contratar'],
    },
  },
} as const;

type Category = keyof typeof KNOWLEDGE_CONFIG;

/**
 * Retrieves relevant context from the knowledge base based on the user's query
 * @param query - The user's question
 * @returns Combined content from relevant .md files
 */
export function retrieveRelevantContext(query: string): string {
  const knowledgePath = path.join(process.cwd(), 'public', 'knowledge');
  const queryLower = query.toLowerCase();
  const relevantFiles: string[] = [];

  // Check which categories are relevant based on keywords
  Object.entries(KNOWLEDGE_CONFIG).forEach(([category, config]) => {
    const allKeywords = [...config.keywords.en, ...config.keywords.es];
    const isRelevant = allKeywords.some((keyword) => queryLower.includes(keyword));

    if (isRelevant) {
      relevantFiles.push(config.file);
    }
  });

  // If no specific category matched, include about and skills as defaults
  if (relevantFiles.length === 0) {
    relevantFiles.push(
      KNOWLEDGE_CONFIG.about.file,
      KNOWLEDGE_CONFIG.skills.file
    );
  }

  // Read and combine relevant files
  let context = '';
  relevantFiles.forEach((file) => {
    const filePath = path.join(knowledgePath, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      context += `\n\n--- ${file} ---\n${content}`;
    }
  });

  return context;
}

/**
 * Gets all available knowledge files
 * Useful for debugging or admin purposes
 */
export function getAllKnowledgeFiles(): string[] {
  return Object.values(KNOWLEDGE_CONFIG).map((config) => config.file);
}

/**
 * Validates if a file exists in the knowledge base
 */
export function knowledgeFileExists(filename: string): boolean {
  const knowledgePath = path.join(process.cwd(), 'public', 'knowledge');
  const filePath = path.join(knowledgePath, filename);
  return fs.existsSync(filePath);
}
