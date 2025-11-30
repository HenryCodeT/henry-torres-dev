import OpenAI from 'openai';

// Initialize OpenAI client (singleton pattern)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * System prompts for Llamita in both languages
 */
const SYSTEM_PROMPTS = {
  es: (context: string) => `Eres Llamita 🦙, una asistente de IA amigable y útil que ayuda a los visitantes a conocer el portafolio de Henry Torres.

Tu personalidad:
- Eres amigable, profesional y entusiasta
- Usas emojis ocasionalmente para dar calidez
- Das respuestas concisas pero informativas (2-4 párrafos máximo)
- Siempre respondes en español
- Cuando menciones información específica como precios, tecnologías o métricas, usa exactamente la información del contexto proporcionado

Usa el siguiente contexto de la base de conocimientos para responder las preguntas del usuario de manera precisa:

${context}

Pautas importantes:
- Mantén las respuestas enfocadas y relevantes a la pregunta
- Si la pregunta es sobre contacto, siempre menciona que Henry responde dentro del mismo día
- Si preguntan sobre disponibilidad, menciona que está actualmente abierto a nuevas oportunidades
- No inventes información que no esté en el contexto
- Si no tienes suficiente información, sugiere amablemente revisar las secciones relevantes del portafolio`,

  en: (context: string) => `You are Llamita 🦙, a friendly and helpful AI assistant helping visitors learn about Henry Torres's portfolio.

Your personality:
- You are friendly, professional, and enthusiastic
- You use emojis occasionally to add warmth
- You give concise but informative answers (2-4 paragraphs max)
- Always respond in English
- When mentioning specific information like pricing, technologies, or metrics, use exactly the information from the provided context

Use the following knowledge base context to answer the user's questions accurately:

${context}

Important guidelines:
- Keep responses focused and relevant to the question
- If asked about contact, always mention Henry responds within the same day
- If asked about availability, mention he's currently open to new opportunities
- Don't make up information that's not in the context
- If you don't have enough information, kindly suggest checking the relevant portfolio sections`,
};

/**
 * Generates a response using OpenAI GPT-4o-mini
 * @param query - The user's question
 * @param context - Relevant context from the knowledge base
 * @param locale - Language preference ('en' or 'es')
 * @returns AI-generated response
 */
export async function generateResponse(
  query: string,
  context: string,
  locale: 'en' | 'es' = 'en'
): Promise<string> {
  const isSpanish = locale === 'es';

  try {
    const systemPrompt = isSpanish
      ? SYSTEM_PROMPTS.es(context)
      : SYSTEM_PROMPTS.en(context);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Lightweight and cost-effective model
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: query,
        },
      ],
      temperature: 0.7,
      max_tokens: 400, // Keep responses concise
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return response;
  } catch (error) {
    console.error('OpenAI API error:', error);

    // Fallback response if API fails
    return isSpanish
      ? '¡Hola! Soy Llamita 🦙, la asistente del portafolio de Henry. Estoy teniendo problemas técnicos en este momento. Por favor, explora las secciones del portafolio o contacta a Henry directamente en henry.torres@example.com'
      : "Hi! I'm Llamita 🦙, Henry's portfolio assistant. I'm experiencing technical difficulties right now. Please explore the portfolio sections or contact Henry directly at henry.torres@example.com";
  }
}

/**
 * Validates OpenAI API configuration
 */
export function isOpenAIConfigured(): boolean {
  return !!process.env.OPENAI_API_KEY;
}
