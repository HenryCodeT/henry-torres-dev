# Henry Torres - Portfolio Website

A modern portfolio website inspired by Peruvian culture, featuring an AI-powered chatbot assistant named Llamita.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## Features

- **Peru-Inspired Design** - Terracotta, sky blue colors and cultural elements
- **AI Assistant** - RAG-powered Llamita chatbot for interactive portfolio exploration
- **Fully Responsive** - Mobile-first design optimized for all devices
- **Smooth Animations** - Framer Motion-powered 60fps animations
- **Performance Optimized** - Next.js 16 with Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: EmailJS

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/HenryCodeT/henry-torres-dev.git
cd henry-torres-dev

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Environment Variables

Create a `.env.local` file for EmailJS integration:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## Project Structure

```
henry-torres-dev/
├── app/
│   ├── components/       # React components
│   ├── data/            # Content data
│   ├── api/             # API routes
│   └── [locale]/        # Internationalization
├── public/
│   ├── knowledge/       # RAG knowledge base
│   └── animations/      # Lottie animations
└── messages/            # i18n translations
```

## Key Sections

1. **Hero** - Animated introduction with Lottie llama
2. **About** - Professional background and timeline
3. **Skills** - Mountain visualization with expertise levels
4. **Projects** - Portfolio showcase with filtering
5. **Services** - Offerings and pricing
6. **Contact** - Form with validation
7. **Llamita AI** - Interactive chatbot assistant

## Customization

### Update Content

- Edit data files in `app/data/`
- Update knowledge base in `public/knowledge/`
- Modify translations in `messages/`

### Customize Colors

Edit `app/globals.css`:

```css
:root {
  --terracotta: 14 45% 45%;
  --sky-blue: 200 70% 50%;
}
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

```bash
# Build
npm run build

# Deploy the .next folder to your hosting platform
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Henry Torres**
- Website: [henrytorres.dev](https://henrytorres.dev)
- GitHub: [@HenryCodeT](https://github.com/HenryCodeT)
- Location: Lima, Peru

---

Made with ♥ in Peru
