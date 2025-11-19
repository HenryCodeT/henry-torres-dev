import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatRequest {
  message: string;
  history: Message[];
}

// Simple keyword-based retrieval for the MVP
// In production, you'd use embeddings and vector search
function retrieveRelevantContext(query: string): string {
  const knowledgePath = path.join(process.cwd(), 'public', 'knowledge');
  const files = ['about.md', 'skills.md', 'services.md', 'projects.md', 'contact.md'];

  const queryLower = query.toLowerCase();
  const keywords = {
    about: ['about', 'who', 'experience', 'background', 'bio', 'introduction', 'henry'],
    skills: ['skill', 'technology', 'tech', 'stack', 'know', 'proficient', 'expert', 'language', 'framework', 'tool'],
    services: ['service', 'offer', 'price', 'pricing', 'cost', 'hire', 'work', 'consulting', 'development', 'build'],
    projects: ['project', 'portfolio', 'built', 'developed', 'work', 'example', 'case', 'study', 'client'],
    contact: ['contact', 'reach', 'email', 'message', 'talk', 'discuss', 'availability', 'available', 'hire'],
  };

  // Determine which files are most relevant
  const relevantFiles: string[] = [];

  Object.entries(keywords).forEach(([category, words]) => {
    if (words.some((word) => queryLower.includes(word))) {
      relevantFiles.push(`${category}.md`);
    }
  });

  // If no specific category matched, include about and skills as defaults
  if (relevantFiles.length === 0) {
    relevantFiles.push('about.md', 'skills.md');
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

function generateResponse(query: string, context: string): string {
  // Simple rule-based responses for MVP
  // In production, you'd use an LLM API (OpenAI, Anthropic, etc.)

  const queryLower = query.toLowerCase();

  // Specific question patterns
  if (queryLower.includes('who') || queryLower.includes('about henry')) {
    return "Henry Torres is a Full Stack Developer based in Lima, Peru, with over 4 years of experience. He specializes in React, Next.js, TypeScript, and AI integration. He's built 50+ projects with a 100% client satisfaction rate. Henry is passionate about creating modern, performant web applications and integrating cutting-edge AI capabilities into real-world solutions.";
  }

  if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('tech stack')) {
    return "Henry's expertise spans the entire modern web stack:\n\n🏔️ **Expert Level:** Next.js, React, TypeScript, AI Integration\n⛰️ **Advanced:** Node.js, Tailwind CSS, PostgreSQL, GraphQL, Python\n🏕️ **Proficient:** AWS, Docker, Redis, MongoDB, REST APIs\n\nHe organizes his skills like a mountain - the 'Montaña del Stack' - with his strongest skills at the peak. You can explore the full breakdown in the Skills section!";
  }

  if (queryLower.includes('service') || queryLower.includes('offer') || queryLower.includes('price')) {
    return "Henry offers several comprehensive services:\n\n💻 **Web Development** - Starting at $5,000 (4-8 weeks)\n⚡ **Full-Stack Development** - Starting at $10,000 (8-12 weeks) [MOST POPULAR]\n🤖 **AI Integration** - Starting at $7,500 (6-10 weeks)\n💡 **Technical Consulting** - $150/hour (Flexible)\n🔧 **Maintenance & Support** - Starting at $2,000/month\n🛒 **E-Commerce Solutions** - Starting at $12,000 (10-16 weeks)\n\nAll projects include source code, documentation, and post-launch support. Want to discuss a specific project?";
  }

  if (queryLower.includes('project') || queryLower.includes('portfolio') || queryLower.includes('built')) {
    return "Henry has built some impressive projects:\n\n🛒 **E-Commerce Platform** (2024) - Scaled to 50,000+ users with $2M+ in transactions\n📊 **SaaS Analytics Dashboard** (2024) - Processing 5M+ events daily\n🤖 **AI Content Generator** (2024) - Generated 100,000+ pieces of content using GPT-4 and Claude\n💪 **Fitness App** (2023) - 100,000+ downloads, 4.8-star rating\n🏠 **Real Estate Portal** (2023) - 10,000+ property listings with virtual tours\n🏥 **Healthcare System** (2023) - HIPAA-compliant telemedicine platform\n\nCheck out the Projects section for detailed case studies!";
  }

  if (queryLower.includes('contact') || queryLower.includes('reach') || queryLower.includes('hire')) {
    return "You can reach Henry in several ways:\n\n📧 **Email:** henry.torres@example.com (Responds within 24 hours)\n📍 **Location:** Lima, Peru (Works remotely worldwide)\n💼 **LinkedIn:** linkedin.com/in/henrytorres\n🐙 **GitHub:** github.com/henrytorres\n\n✅ **Currently Available** for new projects!\n\nHenry offers a free 30-minute discovery call to discuss your project. Just send him a message through the contact form or email directly. He typically books 2-4 weeks in advance for new engagements.";
  }

  if (queryLower.includes('ai') || queryLower.includes('artificial intelligence') || queryLower.includes('llm')) {
    return "Henry has extensive experience with AI integration:\n\n🤖 Built custom RAG systems (like this chatbot!)\n🔗 Integrated GPT-4, Claude, and other LLMs\n🧠 Developed AI-powered content generation tools\n📚 Implemented vector databases and semantic search\n⚙️ Created custom AI workflows and automation\n\nHe's worked with OpenAI, Anthropic, LangChain, and Pinecone to build production AI features. One of his AI projects generated 100,000+ pieces of content with 85% reduction in creation time. Want to add AI to your product?";
  }

  if (queryLower.includes('peru') || queryLower.includes('cusco') || queryLower.includes('lima')) {
    return "¡Hola! 🦙 Henry is proudly based in Lima, Peru, and this portfolio is inspired by the beautiful colors and culture of Cusco and the Peruvian highlands. The design uses terracotta tones, sky blues reminiscent of high-altitude skies, and vibrant weaving colors from traditional Peruvian textiles. As a Peruvian developer, Henry brings a unique perspective to global tech projects while maintaining strong connections with clients worldwide across all time zones.";
  }

  if (queryLower.includes('llamita') || queryLower.includes('you') || queryLower.includes('chatbot')) {
    return "¡Hola! I'm Llamita 🦙, Henry's AI portfolio assistant! I was built using a simple RAG (Retrieval-Augmented Generation) system that reads from knowledge base files to answer your questions about Henry's skills, projects, services, and how to work with him. Think of me as your friendly guide to exploring this portfolio. I can help you find information about:\n\n- Henry's technical skills and expertise\n- Services and pricing\n- Past projects and case studies\n- How to get in touch\n\nWhat would you like to know?";
  }

  // Default response with general info
  return "I'd be happy to help you learn more about Henry! Here's a quick overview:\n\n👨‍💻 **About:** Full Stack Developer with 4+ years experience, based in Lima, Peru\n🎯 **Specialties:** Next.js, React, TypeScript, AI Integration\n💼 **Services:** Web development, AI integration, consulting, and more\n📊 **Track Record:** 50+ projects, 100% client satisfaction\n\nYou can ask me specific questions about:\n- Technical skills and technologies\n- Services and pricing\n- Past projects and case studies\n- How to contact Henry\n- AI and LLM integration experience\n\nWhat would you like to know more about?";
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid message' },
        { status: 400 }
      );
    }

    // Retrieve relevant context from knowledge base
    const context = retrieveRelevantContext(message);

    // Generate response (in production, this would call an LLM API)
    const response = generateResponse(message, context);

    // Simulate a slight delay for more natural feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        response: "Lo siento! I'm having trouble right now. Please try again or contact Henry directly.",
      },
      { status: 500 }
    );
  }
}
