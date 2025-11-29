# 🚀 i18n Quick Start Guide

## Ready-to-Use Implementation

Your Next.js project now has **full internationalization support** with English and Spanish. Everything is configured and ready to use!

## 🎯 What's Already Set Up

### ✅ Core Files Created

1. **Translation Files**
   - `messages/en.json` - English translations
   - `messages/es.json` - Spanish translations

2. **Configuration**
   - `i18n/config.ts` - Language settings
   - `i18n/request.ts` - next-intl config
   - `middleware.ts` - Auto language detection
   - `next.config.ts` - Updated with next-intl

3. **Components**
   - `LanguageToggle.tsx` - Language switcher (🌐 EN/ES dropdown)
   - `LlamitaChatI18n.tsx` - Bilingual RAG chatbot
   - `Navigation.tsx` - Updated with translations

4. **API Routes**
   - `app/api/chat/route.ts` - Responds in selected language

## 🔥 How to Use Right Now

### 1. Start the Dev Server

```bash
npm run dev
```

### 2. Test Language Features

1. **Open your app** in the browser
2. **Look for the 🌐 language toggle** in the navigation
3. **Click it** and select Spanish (🇪🇸)
4. **Watch the navigation menu** change to Spanish
5. **Open the chatbot** (🦙 button) and ask questions in Spanish
6. **Get responses in Spanish!**

### 3. Test Browser Detection

1. Open browser DevTools → Console
2. Clear cookies (Application → Storage → Clear site data)
3. Change browser language to Spanish
4. Refresh the page
5. The site should load in Spanish automatically!

## 📝 Adding i18n to Your Components

### Step 1: Import the Hook

```tsx
'use client';

import { useTranslations } from 'next-intl';
```

### Step 2: Use in Your Component

```tsx
export default function MyComponent() {
  const t = useTranslations('hero'); // Use 'hero' namespace

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Step 3: Add Your Translations

**messages/en.json:**
```json
{
  "hero": {
    "title": "Welcome",
    "subtitle": "This is my subtitle"
  }
}
```

**messages/es.json:**
```json
{
  "hero": {
    "title": "Bienvenido",
    "subtitle": "Este es mi subtítulo"
  }
}
```

## 🤖 RAG Chatbot Example

The chatbot automatically responds in the selected language:

**English:**
```
User: "What technologies does Henry specialize in?"
Bot: "Henry's expertise spans the entire modern web stack..."
```

**Spanish:**
```
User: "¿En qué tecnologías se especializa Henry?"
Bot: "La experiencia de Henry abarca todo el stack web moderno..."
```

## 🎨 Complete Component Examples

### Example 1: Simple Button

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactButton() {
  const t = useTranslations('contact');

  return (
    <button className="px-6 py-2 bg-terracotta text-white rounded-full">
      {t('send')}
    </button>
  );
}
```

### Example 2: Hero Section

Check `app/components/examples/HeroSectionI18n.example.tsx` for a complete example.

### Example 3: Contact Form

Check `app/components/examples/ContactFormI18n.example.tsx` for a complete example.

## 📚 Available Translations

Your translation files already include placeholder text for:

- **Navigation:** Home, About, Skills, Projects, Services, Contact
- **Hero Section:** Greeting, title, subtitle, CTAs
- **About Section:** Title, description, stats
- **Skills Section:** Title, levels
- **Projects Section:** View project, technologies
- **Services Section:** Pricing, duration
- **Contact Section:** Form fields, messages
- **Chatbot:** Welcome message, questions, responses
- **Footer:** Copyright text

## 🔄 Testing the Implementation

### Test Language Toggle:
1. Click 🌐 button in navigation
2. Select "Español"
3. Navigation should change:
   - "About" → "Sobre Mí"
   - "Skills" → "Habilidades"
   - "Contact" → "Contacto"

### Test Chatbot:
1. Click 🦙 button (bottom right)
2. Switch to Spanish
3. Ask: "¿Qué servicios ofrece Henry?"
4. Should get response in Spanish

### Test Browser Detection:
1. Clear cookies
2. Set browser to Spanish
3. Refresh page
4. Should load in Spanish

## 🛠️ Customize Your Translations

### Replace Placeholder Text

Edit `messages/en.json` and `messages/es.json`:

```json
{
  "hero": {
    "greeting": "Your custom greeting",
    "title": "Your custom title"
  }
}
```

### Add New Sections

1. Add to both `en.json` and `es.json`:

```json
{
  "testimonials": {
    "title": "What Clients Say",
    "cta": "Read More Reviews"
  }
}
```

2. Use in component:

```tsx
const t = useTranslations('testimonials');
<h2>{t('title')}</h2>
```

## 🌍 Key Features

- ✅ **Auto-detection:** Detects browser language on first visit
- ✅ **Persistence:** Saves language preference in cookie (1 year)
- ✅ **Manual toggle:** Users can switch anytime with 🌐 button
- ✅ **RAG integration:** Chatbot responds in selected language
- ✅ **Type-safe:** Full TypeScript support
- ✅ **SEO-friendly:** Proper lang attributes

## 📖 Need More Help?

- **Full documentation:** See `I18N_IMPLEMENTATION.md`
- **Component examples:** Check `app/components/examples/`
- **next-intl docs:** https://next-intl-docs.vercel.app/

## 🎉 You're Ready!

Your i18n setup is complete and working. Just:

1. Replace placeholder translations with your actual content
2. Add `useTranslations()` to your components
3. Test in both languages

**Happy translating! 🌍**
