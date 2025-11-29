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
  locale?: string;
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

function generateResponse(query: string, context: string, locale: string = 'en'): string {
  // Simple rule-based responses for MVP
  // In production, you'd use an LLM API (OpenAI, Anthropic, etc.)

  const queryLower = query.toLowerCase();
  const isSpanish = locale === 'es';

  // Specific question patterns with bilingual support
  if (queryLower.includes('who') || queryLower.includes('about') || queryLower.includes('sobre') || queryLower.includes('quién')) {
    return isSpanish
      ? "Henry Torres es un Desarrollador Full Stack con sede en Lima, Perú, con más de 4 años de experiencia. Se especializa en React, Next.js, TypeScript e integración de IA. Ha construido más de 50 proyectos con una tasa de satisfacción del cliente del 100%. Henry es apasionado por crear aplicaciones web modernas y eficientes e integrar capacidades de IA de vanguardia en soluciones del mundo real."
      : "Henry Torres is a Full Stack Developer based in Lima, Peru, with over 4 years of experience. He specializes in React, Next.js, TypeScript, and AI integration. He's built 50+ projects with a 100% client satisfaction rate. Henry is passionate about creating modern, performant web applications and integrating cutting-edge AI capabilities into real-world solutions.";
  }

  if (queryLower.includes('skill') || queryLower.includes('technology') || queryLower.includes('tech') || queryLower.includes('habilidad') || queryLower.includes('tecnología')) {
    return isSpanish
      ? "La experiencia de Henry abarca todo el stack web moderno:\n\n🏔️ **Nivel Experto:** Next.js, React, TypeScript, Integración de IA\n⛰️ **Avanzado:** Node.js, Tailwind CSS, PostgreSQL, GraphQL, Python\n🏕️ **Competente:** AWS, Docker, Redis, MongoDB, APIs REST\n\n¡Organiza sus habilidades como una montaña - la 'Montaña del Stack' - con sus habilidades más fuertes en la cima! Puedes explorar el desglose completo en la sección de Habilidades."
      : "Henry's expertise spans the entire modern web stack:\n\n🏔️ **Expert Level:** Next.js, React, TypeScript, AI Integration\n⛰️ **Advanced:** Node.js, Tailwind CSS, PostgreSQL, GraphQL, Python\n🏕️ **Proficient:** AWS, Docker, Redis, MongoDB, REST APIs\n\nHe organizes his skills like a mountain - the 'Montaña del Stack' - with his strongest skills at the peak. You can explore the full breakdown in the Skills section!";
  }

  if (queryLower.includes('service') || queryLower.includes('offer') || queryLower.includes('price') || queryLower.includes('servicio') || queryLower.includes('ofrece') || queryLower.includes('precio')) {
    return isSpanish
      ? "Henry ofrece varios servicios completos:\n\n💻 **Desarrollo Web** - Desde $5,000 (4-8 semanas)\n⚡ **Desarrollo Full-Stack** - Desde $10,000 (8-12 semanas) [MÁS POPULAR]\n🤖 **Integración de IA** - Desde $7,500 (6-10 semanas)\n💡 **Consultoría Técnica** - $150/hora (Flexible)\n🔧 **Mantenimiento y Soporte** - Desde $2,000/mes\n🛒 **Soluciones E-Commerce** - Desde $12,000 (10-16 semanas)\n\nTodos los proyectos incluyen código fuente, documentación y soporte post-lanzamiento. ¿Quieres discutir un proyecto específico?"
      : "Henry offers several comprehensive services:\n\n💻 **Web Development** - Starting at $5,000 (4-8 weeks)\n⚡ **Full-Stack Development** - Starting at $10,000 (8-12 weeks) [MOST POPULAR]\n🤖 **AI Integration** - Starting at $7,500 (6-10 weeks)\n💡 **Technical Consulting** - $150/hour (Flexible)\n🔧 **Maintenance & Support** - Starting at $2,000/month\n🛒 **E-Commerce Solutions** - Starting at $12,000 (10-16 weeks)\n\nAll projects include source code, documentation, and post-launch support. Want to discuss a specific project?";
  }

  if (queryLower.includes('project') || queryLower.includes('portfolio') || queryLower.includes('built') || queryLower.includes('proyecto') || queryLower.includes('portafolio') || queryLower.includes('construido')) {
    return isSpanish
      ? "Henry ha construido algunos proyectos impresionantes:\n\n🛒 **Plataforma E-Commerce** (2024) - Escalado a 50,000+ usuarios con $2M+ en transacciones\n📊 **Dashboard de Análisis SaaS** (2024) - Procesando 5M+ eventos diarios\n🤖 **Generador de Contenido IA** (2024) - Generó 100,000+ piezas de contenido usando GPT-4 y Claude\n💪 **App de Fitness** (2023) - 100,000+ descargas, calificación de 4.8 estrellas\n🏠 **Portal Inmobiliario** (2023) - 10,000+ listados de propiedades con tours virtuales\n🏥 **Sistema de Salud** (2023) - Plataforma de telemedicina compatible con HIPAA\n\n¡Visita la sección de Proyectos para casos de estudio detallados!"
      : "Henry has built some impressive projects:\n\n🛒 **E-Commerce Platform** (2024) - Scaled to 50,000+ users with $2M+ in transactions\n📊 **SaaS Analytics Dashboard** (2024) - Processing 5M+ events daily\n🤖 **AI Content Generator** (2024) - Generated 100,000+ pieces of content using GPT-4 and Claude\n💪 **Fitness App** (2023) - 100,000+ downloads, 4.8-star rating\n🏠 **Real Estate Portal** (2023) - 10,000+ property listings with virtual tours\n🏥 **Healthcare System** (2023) - HIPAA-compliant telemedicine platform\n\nCheck out the Projects section for detailed case studies!";
  }

  if (queryLower.includes('contact') || queryLower.includes('reach') || queryLower.includes('hire') || queryLower.includes('contactar') || queryLower.includes('contratar')) {
    return isSpanish
      ? "Puedes contactar a Henry de varias maneras:\n\n📧 **Email:** henry.torres@example.com (Responde en 24 horas)\n📍 **Ubicación:** Lima, Perú (Trabaja remotamente a nivel mundial)\n💼 **LinkedIn:** linkedin.com/in/henrytorres\n🐙 **GitHub:** github.com/henrytorres\n\n✅ **Actualmente Disponible** para nuevos proyectos!\n\nHenry ofrece una llamada de descubrimiento gratuita de 30 minutos para discutir tu proyecto. Solo envíale un mensaje a través del formulario de contacto o email directamente. Normalmente reserva con 2-4 semanas de anticipación para nuevos compromisos."
      : "You can reach Henry in several ways:\n\n📧 **Email:** henry.torres@example.com (Responds within 24 hours)\n📍 **Location:** Lima, Peru (Works remotely worldwide)\n💼 **LinkedIn:** linkedin.com/in/henrytorres\n🐙 **GitHub:** github.com/henrytorres\n\n✅ **Currently Available** for new projects!\n\nHenry offers a free 30-minute discovery call to discuss your project. Just send him a message through the contact form or email directly. He typically books 2-4 weeks in advance for new engagements.";
  }

  if (queryLower.includes('ai') || queryLower.includes('artificial intelligence') || queryLower.includes('llm') || queryLower.includes('inteligencia artificial')) {
    return isSpanish
      ? "Henry tiene amplia experiencia con integración de IA:\n\n🤖 Construyó sistemas RAG personalizados (¡como este chatbot!)\n🔗 Integró GPT-4, Claude y otros LLMs\n🧠 Desarrolló herramientas de generación de contenido con IA\n📚 Implementó bases de datos vectoriales y búsqueda semántica\n⚙️ Creó flujos de trabajo y automatización de IA personalizados\n\nHa trabajado con OpenAI, Anthropic, LangChain y Pinecone para construir funciones de IA en producción. Uno de sus proyectos de IA generó más de 100,000 piezas de contenido con una reducción del 85% en el tiempo de creación. ¿Quieres agregar IA a tu producto?"
      : "Henry has extensive experience with AI integration:\n\n🤖 Built custom RAG systems (like this chatbot!)\n🔗 Integrated GPT-4, Claude, and other LLMs\n🧠 Developed AI-powered content generation tools\n📚 Implemented vector databases and semantic search\n⚙️ Created custom AI workflows and automation\n\nHe's worked with OpenAI, Anthropic, LangChain, and Pinecone to build production AI features. One of his AI projects generated 100,000+ pieces of content with 85% reduction in creation time. Want to add AI to your product?";
  }

  if (queryLower.includes('peru') || queryLower.includes('cusco') || queryLower.includes('lima') || queryLower.includes('perú')) {
    return isSpanish
      ? "¡Hola! 🦙 Henry está orgullosamente basado en Lima, Perú, y este portafolio está inspirado en los hermosos colores y cultura del Cusco y las tierras altas peruanas. El diseño usa tonos terracota, azules cielo que recuerdan los cielos de gran altitud, y colores vibrantes de tejido de textiles peruanos tradicionales. Como desarrollador peruano, Henry aporta una perspectiva única a proyectos tecnológicos globales mientras mantiene fuertes conexiones con clientes en todo el mundo en todas las zonas horarias."
      : "¡Hola! 🦙 Henry is proudly based in Lima, Peru, and this portfolio is inspired by the beautiful colors and culture of Cusco and the Peruvian highlands. The design uses terracotta tones, sky blues reminiscent of high-altitude skies, and vibrant weaving colors from traditional Peruvian textiles. As a Peruvian developer, Henry brings a unique perspective to global tech projects while maintaining strong connections with clients worldwide across all time zones.";
  }

  if (queryLower.includes('llamita') || queryLower.includes('you') || queryLower.includes('chatbot')) {
    return isSpanish
      ? "¡Hola! Soy Llamita 🦙, ¡la asistente de IA del portafolio de Henry! Fui construida usando un sistema RAG (Generación Aumentada por Recuperación) simple que lee archivos de base de conocimientos para responder tus preguntas sobre las habilidades, proyectos, servicios de Henry y cómo trabajar con él. Piensa en mí como tu guía amigable para explorar este portafolio. Puedo ayudarte a encontrar información sobre:\n\n- Habilidades técnicas y experiencia de Henry\n- Servicios y precios\n- Proyectos anteriores y casos de estudio\n- Cómo ponerse en contacto\n\n¿Qué te gustaría saber?"
      : "¡Hola! I'm Llamita 🦙, Henry's AI portfolio assistant! I was built using a simple RAG (Retrieval-Augmented Generation) system that reads from knowledge base files to answer your questions about Henry's skills, projects, services, and how to work with him. Think of me as your friendly guide to exploring this portfolio. I can help you find information about:\n\n- Henry's technical skills and expertise\n- Services and pricing\n- Past projects and case studies\n- How to get in touch\n\nWhat would you like to know?";
  }

  // Default response with general info
  return isSpanish
    ? "¡Me encantaría ayudarte a aprender más sobre Henry! Aquí hay una vista rápida:\n\n👨‍💻 **Sobre:** Desarrollador Full Stack con más de 4 años de experiencia, basado en Lima, Perú\n🎯 **Especialidades:** Next.js, React, TypeScript, Integración de IA\n💼 **Servicios:** Desarrollo web, integración de IA, consultoría y más\n📊 **Historial:** 50+ proyectos, 100% satisfacción del cliente\n\nPuedes hacerme preguntas específicas sobre:\n- Habilidades técnicas y tecnologías\n- Servicios y precios\n- Proyectos anteriores y casos de estudio\n- Cómo contactar a Henry\n- Experiencia en integración de IA y LLM\n\n¿Qué te gustaría saber más?"
    : "I'd be happy to help you learn more about Henry! Here's a quick overview:\n\n👨‍💻 **About:** Full Stack Developer with 4+ years experience, based in Lima, Peru\n🎯 **Specialties:** Next.js, React, TypeScript, AI Integration\n💼 **Services:** Web development, AI integration, consulting, and more\n📊 **Track Record:** 50+ projects, 100% client satisfaction\n\nYou can ask me specific questions about:\n- Technical skills and technologies\n- Services and pricing\n- Past projects and case studies\n- How to contact Henry\n- AI and LLM integration experience\n\nWhat would you like to know more about?";
}

export async function POST(request: Request) {
  let locale = 'en';
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;
    locale = body.locale || 'en';

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid message' },
        { status: 400 }
      );
    }

    // Retrieve relevant context from knowledge base
    const context = retrieveRelevantContext(message);

    // Generate response (in production, this would call an LLM API)
    const response = generateResponse(message, context, locale);

    // Simulate a slight delay for more natural feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const isSpanish = locale === 'es';
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        response: isSpanish
          ? "¡Lo siento! Estoy teniendo problemas de conexión ahora. Por favor, intenta de nuevo o contacta a Henry directamente a henry.torres@example.com"
          : "Lo siento! I'm having trouble right now. Please try again or contact Henry directly at henry.torres@example.com",
      },
      { status: 500 }
    );
  }
}
