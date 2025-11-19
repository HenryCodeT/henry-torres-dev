# Llamita AI - Portfolio Assistant 🦙

## Overview

Llamita AI is the signature feature of this portfolio - a RAG-powered chatbot that can answer questions about Henry Torres's skills, projects, services, and experience. It provides an interactive way for visitors to explore the portfolio and get instant answers to their questions.

## What is Llamita?

**Llamita** (Spanish for "little llama") is an AI assistant that:
- Answers questions about Henry's portfolio in real-time
- Uses RAG (Retrieval-Augmented Generation) to provide accurate information
- Maintains context across conversations
- Offers suggested questions to guide exploration
- Provides a unique, engaging user experience

## Architecture

### Knowledge Base (Simple RAG)
Location: `/public/knowledge/`

The knowledge base consists of markdown files containing information about:
- `about.md` - Henry's background, experience, and approach
- `skills.md` - Technical skills organized by expertise level
- `services.md` - Service offerings, pricing, and deliverables
- `projects.md` - Portfolio projects with details and highlights
- `contact.md` - Contact information and availability

### Retrieval System
File: `/app/api/chat/route.ts`

**Keyword-Based Retrieval (MVP Version)**
- Analyzes user questions for keywords
- Selects relevant knowledge base files
- Combines context from multiple sources
- Generates responses based on patterns

**Future Enhancement:**
- Replace with vector embeddings (OpenAI, Anthropic, etc.)
- Use cosine similarity for better retrieval
- Implement semantic search
- Add conversation memory with vector DB

### Response Generation
Currently using **rule-based responses** for common questions:
- "Who is Henry?" → About information
- "What skills?" → Technical stack
- "Services?" → Pricing and offerings
- "Projects?" → Portfolio highlights
- "Contact?" → How to reach out

**Future Enhancement:**
- Integrate with LLM API (OpenAI GPT-4, Anthropic Claude)
- Generate dynamic responses
- Maintain conversation context
- Handle follow-up questions

### UI Component
File: `/app/components/LlamitaChat.tsx`

**Features:**
- 🦙 Floating chat button (bottom-right)
- 💬 Chat window with message history
- ⚡ Real-time typing indicators
- 🎯 Suggested questions for first-time users
- 🎨 Peru-inspired gradient design
- ✨ Smooth animations with Framer Motion
- 📱 Responsive mobile-friendly design

## User Experience Flow

### 1. Initial State
- Floating llama button appears in bottom-right corner
- Button has bounce animation on page load
- Gradient background (terracotta to pink)

### 2. Opening Chat
- Click button to open chat window
- Window slides up with spring animation
- Llamita greets with welcome message
- Shows 3 suggested questions

### 3. Asking Questions
- User types question in input field
- Click "Send" or press Enter
- Message appears in chat with timestamp
- Llamita shows typing indicator (3 animated dots)

### 4. Receiving Answers
- Response appears after ~500ms delay
- Message slides in with fade animation
- Llamita avatar appears next to response
- Scroll automatically to latest message

### 5. Conversation Flow
- Chat maintains full message history
- Users can ask follow-up questions
- Suggested questions available when chat is empty
- Scroll through past messages

### 6. Closing Chat
- Click X button or llama button again
- Window slides down with exit animation
- Chat history preserved until page reload

## Features

### Visual Design
- **Peru-Inspired Colors**: Terracotta, pink, and sky blue gradients
- **Llama Avatar**: 🦙 emoji throughout the interface
- **Modern UI**: Rounded corners, shadows, clean typography
- **Smooth Animations**: All interactions animated with Framer Motion

### Message Types
```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
```

### Suggested Questions
Pre-defined questions to help users get started:
- "What technologies does Henry specialize in?"
- "Tell me about Henry's AI integration experience"
- "What services does Henry offer?"
- "Show me Henry's recent projects"
- "How can I contact Henry?"
- "What's Henry's pricing for web development?"

### Loading States
- Animated typing indicator
- 3 colored dots (terracotta, pink, blue)
- Pulsing animation with staggered delays
- Appears while waiting for response

### Error Handling
- Network error fallback messages
- Friendly error with contact information
- Automatic retry suggestion
- No hard crashes

## API Endpoints

### POST `/api/chat`
Handles chat messages and returns responses.

**Request Body:**
```typescript
{
  message: string;        // User's question
  history: Message[];     // Conversation history
}
```

**Response:**
```typescript
{
  success: boolean;
  response: string;       // Llamita's answer
  message?: string;       // Error message if failed
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request
- `500` - Server error

## Question Patterns Recognized

### About Henry
- Keywords: "about", "who", "experience", "background", "bio"
- Returns: Professional summary, location, expertise

### Skills & Technologies
- Keywords: "skill", "technology", "tech stack", "proficient", "expert"
- Returns: Mountain-organized skill breakdown

### Services & Pricing
- Keywords: "service", "offer", "price", "cost", "hire"
- Returns: Service list with pricing and timelines

### Projects
- Keywords: "project", "portfolio", "built", "developed"
- Returns: Featured project highlights with metrics

### Contact Information
- Keywords: "contact", "reach", "email", "hire"
- Returns: Contact methods and availability

### AI/ML Expertise
- Keywords: "ai", "artificial intelligence", "llm", "rag"
- Returns: AI integration experience and projects

### Peru & Culture
- Keywords: "peru", "cusco", "lima"
- Returns: Cultural inspiration and location info

### About Llamita
- Keywords: "llamita", "you", "chatbot"
- Returns: Self-description and capabilities

## Customization

### Update Knowledge Base
Edit markdown files in `/public/knowledge/`:
1. Add new information to existing files
2. Create new `.md` files for new topics
3. Update keyword mappings in API route

### Add New Question Patterns
Edit `/app/api/chat/route.ts`:
```typescript
if (queryLower.includes('your-keyword')) {
  return "Your custom response";
}
```

### Modify Suggested Questions
Edit `/app/components/LlamitaChat.tsx`:
```typescript
const SUGGESTED_QUESTIONS = [
  "Your new question 1",
  "Your new question 2",
  // Add more...
];
```

### Customize Appearance
**Colors:**
```typescript
// Button gradient
className="bg-gradient-to-br from-terracotta to-weaving-pink"

// Header gradient
className="bg-gradient-to-r from-terracotta via-weaving-pink to-sky-blue"

// User message
className="bg-terracotta text-white"
```

**Size:**
```typescript
// Chat window dimensions
className="w-96 h-[600px]"

// Button size
className="w-16 h-16"
```

**Position:**
```typescript
// Button position
className="bottom-6 right-6"

// Window position
className="bottom-24 right-6"
```

### Animation Timing
```typescript
// Button entrance delay
transition={{ delay: 1, type: 'spring' }}

// Response delay
await new Promise((resolve) => setTimeout(resolve, 500));

// Message animation
transition={{ duration: 0.3 }}
```

## Upgrading to Production RAG

### Step 1: Add Vector Embeddings
```bash
npm install openai pinecone-client
```

### Step 2: Generate Embeddings
```typescript
// Create embeddings for knowledge base
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbeddings() {
  const files = fs.readdirSync('./public/knowledge');

  for (const file of files) {
    const content = fs.readFileSync(`./public/knowledge/${file}`, 'utf-8');

    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: content,
    });

    // Store embeddings in vector database
    await pinecone.upsert({
      vectors: [{
        id: file,
        values: response.data[0].embedding,
        metadata: { content, filename: file },
      }],
    });
  }
}
```

### Step 3: Update Retrieval
```typescript
// Use semantic search instead of keywords
async function retrieveRelevantContext(query: string): Promise<string> {
  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const results = await pinecone.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 3,
    includeMetadata: true,
  });

  return results.matches.map(m => m.metadata.content).join('\n\n');
}
```

### Step 4: Use LLM for Responses
```typescript
async function generateResponse(query: string, context: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are Llamita, a friendly AI assistant helping visitors learn about Henry Torres's portfolio. Use the following context to answer questions accurately:\n\n${context}`,
      },
      {
        role: 'user',
        content: query,
      },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0].message.content;
}
```

### Step 5: Add Environment Variables
```env
OPENAI_API_KEY=your_openai_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_env
PINECONE_INDEX=portfolio-knowledge
```

## Performance Optimization

### Caching
- Cache common question responses
- Store embeddings to avoid regeneration
- Use Redis for conversation memory

### Rate Limiting
- Limit requests per user/IP
- Implement cooldown between messages
- Add CAPTCHA for abuse prevention

### Monitoring
- Track question patterns
- Log failed queries
- Monitor API usage and costs
- A/B test different prompts

## Accessibility

- **Keyboard Navigation**: Tab to button, Enter to send
- **Screen Readers**: Semantic HTML and ARIA labels
- **Color Contrast**: WCAG AA compliant
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Clear focus indicators

## Mobile Responsive

**Desktop (lg+):**
- Full-size chat window (384px wide)
- Bottom-right floating button
- Smooth animations

**Tablet (md):**
- Same as desktop
- Adjusted padding

**Mobile:**
- Full-width chat window (with margins)
- Smaller button
- Touch-friendly input and buttons
- Optimized for vertical scrolling

## Analytics & Insights

Track these metrics to improve Llamita:
- **Popular Questions**: What users ask most
- **Failed Queries**: Questions without good answers
- **Conversation Length**: How many messages per session
- **Click-Through**: Do users contact after chatting?
- **Response Quality**: User feedback on answers

## Future Enhancements

### Short-Term
- [ ] Add conversation memory (Redis)
- [ ] Implement rate limiting
- [ ] Add analytics tracking
- [ ] Create admin dashboard for monitoring
- [ ] Add thumbs up/down feedback

### Medium-Term
- [ ] Upgrade to vector embeddings (Pinecone)
- [ ] Integrate real LLM API (GPT-4/Claude)
- [ ] Add voice input/output
- [ ] Multi-language support (Spanish!)
- [ ] Export chat transcript

### Long-Term
- [ ] Fine-tune custom model on portfolio data
- [ ] Add image understanding (project screenshots)
- [ ] Integrate with calendar for booking
- [ ] Email conversation summary
- [ ] AI-powered project recommendations

## Testing Llamita

### Manual Testing Checklist
- [ ] Chat button appears and is clickable
- [ ] Chat window opens with animation
- [ ] Welcome message displays correctly
- [ ] Suggested questions are visible
- [ ] Can type and send messages
- [ ] Loading indicator shows while waiting
- [ ] Responses appear correctly formatted
- [ ] Timestamps are accurate
- [ ] Can scroll through message history
- [ ] Chat persists across questions
- [ ] Can close and reopen chat
- [ ] Works on mobile devices
- [ ] Keyboard navigation works
- [ ] Error states display properly

### Question Tests
Try these questions to test coverage:
1. "Who is Henry Torres?"
2. "What technologies do you know?"
3. "How much does web development cost?"
4. "Show me some projects"
5. "How can I contact Henry?"
6. "Do you know AI/ML?"
7. "Tell me about Peru"
8. "What are you?"
9. [Random question to test default response]
10. [Very long question to test handling]

## Best Practices

### Writing Good Responses
- **Be Friendly**: Use casual, welcoming tone
- **Be Concise**: 2-3 sentences or bullet points
- **Be Accurate**: Only use info from knowledge base
- **Be Helpful**: Guide users to relevant sections
- **Be Personal**: Reference "Henry" not "we"

### Maintaining Knowledge Base
- **Update Regularly**: Keep info current
- **Be Specific**: Include metrics and numbers
- **Be Consistent**: Match portfolio content
- **Be Organized**: Use clear headings and structure
- **Be Complete**: Cover all common questions

### Error Messages
- **Be Honest**: "I'm having trouble..."
- **Be Helpful**: Provide alternatives
- **Be Professional**: Don't blame the user
- **Be Contact-Ready**: Always include email

## Troubleshooting

### Chat Button Not Appearing
1. Check if LlamitaChat is imported in layout.tsx
2. Verify Framer Motion is installed
3. Check browser console for errors
4. Ensure z-index is high enough (z-50)

### Messages Not Sending
1. Check `/api/chat` endpoint is accessible
2. Verify fetch request format
3. Check network tab for errors
4. Look at server logs

### Responses Are Slow
1. Check artificial delay (currently 500ms)
2. Monitor API response times
3. Optimize knowledge base file reading
4. Consider caching common responses

### Mobile Issues
1. Test different screen sizes
2. Check touch target sizes (min 44px)
3. Verify overflow scrolling works
4. Test keyboard behavior on mobile

## Credits

**Llamita AI** was designed and built as the signature feature of Henry Torres's portfolio. It demonstrates:
- Modern RAG architecture
- AI integration skills
- UX design capabilities
- Full-stack development expertise
- Attention to detail and user experience

The llama (🦙) is a cultural symbol of Peru and represents the Peruvian heritage that inspires this portfolio's design.

---

Ready to chat? Click the floating llama button and ask Llamita anything about Henry's portfolio! 🦙✨
