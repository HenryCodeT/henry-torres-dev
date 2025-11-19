# Henry Torres - Portfolio Website 🦙

A modern, animated portfolio website inspired by the vibrant colors and culture of Peru. Built with Next.js 16, featuring a unique RAG-powered AI assistant named Llamita.

![Peru-Inspired Design](https://img.shields.io/badge/Design-Peru%20Inspired-E86D47)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎨 Peru/Cusco-Inspired Design
- **Color Palette**: Terracotta, sky blue, and traditional weaving colors
- **Cultural Elements**: Llama mascot, mountain metaphors, Peruvian heritage
- **Modern Aesthetics**: Clean, professional, with cultural personality

### 🦙 Llamita AI Assistant
- **RAG-Powered Chatbot**: Answers questions about skills, projects, and services
- **Interactive Experience**: Floating chat button with smooth animations
- **Suggested Questions**: Guides visitors through the portfolio
- **Knowledge Base**: Markdown-based content retrieval system

### 📱 Fully Responsive
- **Mobile-First Design**: Optimized for all screen sizes
- **Touch-Friendly**: Proper touch targets and gestures
- **Progressive Enhancement**: Works without JavaScript (core content)

### ⚡ Performance Optimized
- **Next.js 16 App Router**: Server-side rendering and optimization
- **Turbopack**: Lightning-fast development and builds
- **Optimized Assets**: Lazy loading and code splitting
- **Web Vitals**: High Lighthouse scores

### 🎭 Smooth Animations
- **Framer Motion**: 60fps animations throughout
- **Scroll Triggers**: Elements animate as you scroll
- **Micro-Interactions**: Hover effects, transitions, and feedback
- **Reduced Motion Support**: Respects user preferences

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel-ready

### Project Structure
```
henry-torres-dev/
├── app/
│   ├── components/          # React components
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── LlamitaChat.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── data/                # Content data
│   │   ├── timeline.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   └── services.ts
│   ├── api/                 # API routes
│   │   ├── contact/
│   │   └── chat/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── public/
│   ├── knowledge/           # RAG knowledge base
│   │   ├── about.md
│   │   ├── skills.md
│   │   ├── services.md
│   │   ├── projects.md
│   │   └── contact.md
│   └── animations/          # Lottie animations
└── tailwind.config.ts       # Tailwind configuration
```

## 🎯 Sections

### 1. Hero Section
- Animated llama with Lottie
- Mouse parallax effects
- Scroll-based animations
- Professional introduction
- Call-to-action buttons
- Key statistics

**File**: [app/components/HeroSection.tsx](app/components/HeroSection.tsx)

### 2. About Section
- Professional background
- Career timeline (2021-2024)
- Key achievements
- Skills preview
- Personal statement

**File**: [app/components/AboutSection.tsx](app/components/AboutSection.tsx)

### 3. Skills Section - "Montaña del Stack"
- Mountain visualization (SVG)
- 5 expertise levels (Peak to Foundation)
- Category filtering
- Interactive skill cards
- Hover tooltips

**File**: [app/components/SkillsSection.tsx](app/components/SkillsSection.tsx)
**Data**: [app/data/skills.ts](app/data/skills.ts)

### 4. Projects Section
- 6 featured projects
- Category filtering (Web, Mobile, AI, SaaS)
- Interactive project cards
- Detailed modal view
- External links (live demos, GitHub)

**File**: [app/components/ProjectsSection.tsx](app/components/ProjectsSection.tsx)
**Data**: [app/data/projects.ts](app/data/projects.ts)

### 5. Services Section
- 6 service offerings
- Pricing and timelines
- Expandable feature cards
- Work process (6 steps)
- "Why Work With Me" section

**File**: [app/components/ServicesSection.tsx](app/components/ServicesSection.tsx)
**Data**: [app/data/services.ts](app/data/services.ts)

### 6. Contact Section
- Validated contact form (React Hook Form + Zod)
- Contact information cards
- Social links
- Availability status
- Success/error states

**File**: [app/components/ContactSection.tsx](app/components/ContactSection.tsx)
**API**: [app/api/contact/route.ts](app/api/contact/route.ts)

### 7. Llamita AI Assistant 🦙
- Floating chat button
- Real-time conversation
- RAG-powered responses
- Suggested questions
- Knowledge base retrieval

**File**: [app/components/LlamitaChat.tsx](app/components/LlamitaChat.tsx)
**API**: [app/api/chat/route.ts](app/api/chat/route.ts)
**Docs**: [LLAMITA-AI.md](LLAMITA-AI.md)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/henry-torres-dev.git
   cd henry-torres-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file for optional integrations:

```env
# Email Service (Optional - for contact form)
RESEND_API_KEY=your_resend_api_key
# or
SENDGRID_API_KEY=your_sendgrid_api_key

# LLM Integration (Optional - for production Llamita)
OPENAI_API_KEY=your_openai_api_key
# or
ANTHROPIC_API_KEY=your_anthropic_api_key

# Vector Database (Optional - for production RAG)
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_env
```

## 📝 Customization

### Update Personal Information

1. **Edit content data files**:
   - [app/data/timeline.ts](app/data/timeline.ts) - Career history
   - [app/data/skills.ts](app/data/skills.ts) - Technical skills
   - [app/data/projects.ts](app/data/projects.ts) - Portfolio projects
   - [app/data/services.ts](app/data/services.ts) - Service offerings

2. **Update knowledge base** (for Llamita AI):
   - [public/knowledge/about.md](public/knowledge/about.md)
   - [public/knowledge/skills.md](public/knowledge/skills.md)
   - [public/knowledge/services.md](public/knowledge/services.md)
   - [public/knowledge/projects.md](public/knowledge/projects.md)
   - [public/knowledge/contact.md](public/knowledge/contact.md)

3. **Modify metadata**:
   - [app/layout.tsx](app/layout.tsx) - SEO metadata
   - Update title, description, keywords
   - Add Open Graph images

### Customize Colors

Edit [app/globals.css](app/globals.css):

```css
:root {
  /* Your custom colors */
  --terracotta: 14 45% 45%;
  --sky-blue: 200 70% 50%;
  /* Add more... */
}
```

### Add New Sections

1. Create component in `app/components/`
2. Create data file in `app/data/` (if needed)
3. Import and add to [app/page.tsx](app/page.tsx)

## 🧪 Testing

### Manual Testing
```bash
npm run dev
```

Test checklist:
- [ ] All sections load correctly
- [ ] Navigation smooth scroll works
- [ ] Contact form validation works
- [ ] Llamita chat responds
- [ ] Mobile responsive design
- [ ] Animations are smooth
- [ ] External links work
- [ ] Form submission works

### Build Testing
```bash
npm run build
npm run start
```

Verify production build works correctly.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure project (auto-detected)
   - Deploy

3. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add your API keys (if using email/LLM services)

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy .next folder
```

**Railway:**
```bash
railway init
railway up
```

**Self-Hosted:**
```bash
npm run build
npm run start
# Use PM2 or similar for process management
```

## 🎨 Design System

### Color Palette

| Color | HSL | Hex | Usage |
|-------|-----|-----|-------|
| Terracotta | `14 45% 45%` | `#B76847` | Primary, warm accents |
| Sky Blue | `200 70% 50%` | `#2699D9` | Secondary, cool accents |
| Weaving Pink | `340 65% 55%` | `#E84775` | Highlights, CTAs |
| Weaving Yellow | `45 90% 60%` | `#F5D547` | Energetic accents |
| Weaving Purple | `280 50% 45%` | `#8E47B7` | Premium features |
| Stone | `30 8% 50%` | `#827A77` | Muted backgrounds |

### Typography

- **Headings**: Geist Sans (variable font)
- **Body**: Geist Sans
- **Code**: Geist Mono

### Spacing Scale
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 2rem (32px)
- `xl`: 4rem (64px)

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📚 Documentation

- [LLAMITA-AI.md](LLAMITA-AI.md) - Llamita AI documentation
- [PROJECTS-SECTION.md](PROJECTS-SECTION.md) - Projects section details
- [PRD.md](PRD.md) - Original product requirements

## 🔧 Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Lottie](https://airbnb.io/lottie/) - Vector animations

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Henry Torres**
- Website: [henrytorres.dev](https://henrytorres.dev)
- GitHub: [@henrytorres](https://github.com/henrytorres)
- LinkedIn: [Henry Torres](https://linkedin.com/in/henrytorres)
- Email: henry.torres@example.com
- Location: Lima, Peru 🇵🇪

## 🙏 Acknowledgments

- Inspired by the vibrant culture and colors of Peru and Cusco
- Design influenced by traditional Peruvian textiles and weaving patterns
- Llama mascot represents Peru's cultural heritage
- Built with modern web technologies and best practices

## 🗺️ Roadmap

### Current Version (MVP)
- [x] Hero section with animated llama
- [x] About section with timeline
- [x] Skills mountain visualization
- [x] Projects showcase with filtering
- [x] Services with pricing
- [x] Contact form with validation
- [x] Llamita AI chatbot (keyword-based)

### Future Enhancements
- [ ] Upgrade Llamita to use LLM API (GPT-4/Claude)
- [ ] Add vector embeddings for better RAG
- [ ] Blog section with MDX support
- [ ] Case studies with detailed breakdowns
- [ ] Testimonials from clients
- [ ] Integration with Calendly for bookings
- [ ] Multi-language support (Spanish)
- [ ] Dark mode toggle
- [ ] Analytics dashboard
- [ ] Email newsletter signup

## 📊 Project Stats

- **Total Components**: 15+
- **Lines of Code**: 5,000+
- **Development Time**: 2 weeks
- **Knowledge Base**: 5 markdown files
- **Animations**: 50+ Framer Motion instances
- **Sections**: 7 major sections
- **Responsive Breakpoints**: 5

## 🐛 Known Issues

- Dev server may show port conflicts if multiple instances run (see troubleshooting)
- Contact form requires email service integration for production
- Llamita uses keyword-based responses (upgrade to LLM recommended)
- Project images are gradient placeholders (replace with real images)

## 💡 Tips

### For Development
- Use `npm run dev` for hot reload
- Check console for errors
- Test on multiple screen sizes
- Use browser DevTools for debugging

### For Production
- Set up email service (Resend recommended)
- Add real project images
- Configure analytics (Vercel Analytics, Google Analytics)
- Set up monitoring (Sentry, LogRocket)
- Enable LLM API for better Llamita responses

### For Content Updates
- Edit markdown files in `/public/knowledge/`
- Update data files in `/app/data/`
- Keep information current and accurate
- Test Llamita after content changes

---

**Made with ♥ in Peru** 🇵🇪🦙

**¡Hola!** Thanks for checking out this portfolio. If you have questions or want to collaborate, feel free to reach out through the contact form or connect on social media.

Ready to explore? **Open the site and click the llama button** to chat with Llamita! 🦙✨
