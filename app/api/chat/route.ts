import { NextResponse } from 'next/server';
import { retrieveRelevantContext } from './utils/knowledgeBase';
import { generateResponse } from './utils/openai';

/**
 * Types for the chat API
 */
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

/**
 * POST /api/chat
 * Handles chat messages from Llamita AI chatbot
 *
 * Process:
 * 1. Validates the incoming message
 * 2. Retrieves relevant context from knowledge base (.md files)
 * 3. Generates response using OpenAI GPT-4o-mini
 * 4. Returns the AI-generated response
 */
export async function POST(request: Request) {
  let locale: 'en' | 'es' = 'en';

  try {
    // Parse request body
    const body: ChatRequest = await request.json();
    const { message } = body;
    locale = (body.locale as 'en' | 'es') || 'en';

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Invalid message' },
        { status: 400 }
      );
    }

    // Step 1: Retrieve relevant context from knowledge base
    // This reads the appropriate .md files based on keywords in the query
    const context = retrieveRelevantContext(message);

    // Step 2: Generate response using OpenAI
    // Sends context + query to GPT-4o-mini for dynamic response generation
    const response = await generateResponse(message, context, locale);

    // Return successful response
    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const isSpanish = locale === 'es';

    // Return error response with helpful fallback message
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        response: isSpanish
          ? '¡Lo siento! Estoy teniendo problemas de conexión ahora. Por favor, intenta de nuevo o contacta a Henry directamente a henry.torres@example.com'
          : "Lo siento! I'm having trouble right now. Please try again or contact Henry directly at henry.torres@example.com",
      },
      { status: 500 }
    );
  }
}
