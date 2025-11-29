# Internationalization (i18n) Implementation Guide

## Overview

This Next.js project now has full internationalization support using `next-intl`. The implementation includes:

- ✅ English (en) and Spanish (es) support
- ✅ Automatic language detection from browser
- ✅ Manual language toggle button
- ✅ RAG chatbot responds in selected language
- ✅ Middleware for language detection and persistence

## 📁 Project Structure

```
henry-torres-dev/
├── i18n/
│   ├── config.ts          # Language configuration
│   └── request.ts         # next-intl request configuration
├── messages/
│   ├── en.json            # English translations
│   └── es.json            # Spanish translations
├── middleware.ts          # Language detection middleware
├── app/
│   ├── layout.tsx         # Updated with NextIntlClientProvider
│   ├── components/
│   │   ├── LanguageToggle.tsx      # Language switcher component
│   │   ├── LlamitaChatI18n.tsx     # i18n-aware chatbot
│   │   └── Navigation.tsx          # Updated with translations
│   └── api/
│       └── chat/
│           └── route.ts            # Bilingual RAG responses
└── next.config.ts         # Updated with next-intl plugin
```

## 🚀 How It Works

### 1. Language Detection

The middleware automatically detects the user's preferred language from:
- Cookie (`NEXT_LOCALE`) if previously set
- Browser's `Accept-Language` header
- Defaults to English if no preference found

### 2. Language Persistence

When a user selects a language via the toggle button:
1. A cookie is set with the selected locale
2. The page reloads to apply the new language
3. The preference persists for 1 year

### 3. Translation Loading

Translations are loaded server-side and provided to client components via `NextIntlClientProvider`:

```tsx
// In layout.tsx
const locale = await getLocale();
const messages = await getMessages();

<NextIntlClientProvider locale={locale} messages={messages}>
  {/* Your app */}
</NextIntlClientProvider>
```

## 💻 Usage Examples

### Basic Component Translation

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('navigation'); // Access 'navigation' namespace

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
```

### Get Current Locale

```tsx
'use client';

import { useLocale } from 'next-intl';

export default function MyComponent() {
  const locale = useLocale(); // Returns 'en' or 'es'

  return <p>Current language: {locale}</p>;
}
```

### Pluralization Example

Add to `messages/en.json`:
```json
{
  "items": {
    "count": "{count, plural, =0 {No items} =1 {One item} other {# items}}"
  }
}
```

Usage:
```tsx
const t = useTranslations('items');
<p>{t('count', { count: 5 })}</p> // "5 items"
```

### Rich Text Formatting

Add to translations:
```json
{
  "welcome": "Welcome <strong>{name}</strong>!"
}
```

Usage:
```tsx
import { useTranslations } from 'next-intl';

const t = useTranslations();
<p>{t.rich('welcome', {
  name: 'Henry',
  strong: (chunks) => <strong>{chunks}</strong>
})}</p>
```

## 🤖 RAG Integration

The chatbot (`LlamitaChatI18n`) sends the current locale to the API:

```tsx
// In component
const locale = useLocale();

await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({
    message: input,
    locale, // ← Sends current language
  }),
});
```

The API route uses the locale to respond in the correct language:

```tsx
// In api/chat/route.ts
function generateResponse(query: string, context: string, locale: string) {
  const isSpanish = locale === 'es';

  if (queryMatches) {
    return isSpanish
      ? "Respuesta en español"
      : "Response in English";
  }
}
```

## 📝 Adding New Translations

### 1. Add to Translation Files

**messages/en.json:**
```json
{
  "newSection": {
    "title": "New Section",
    "description": "This is a new section"
  }
}
```

**messages/es.json:**
```json
{
  "newSection": {
    "title": "Nueva Sección",
    "description": "Esta es una nueva sección"
  }
}
```

### 2. Use in Component

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function NewSection() {
  const t = useTranslations('newSection');

  return (
    <section>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
    </section>
  );
}
```

## 🌐 Adding More Languages

### 1. Update Config

Edit `i18n/config.ts`:
```tsx
export const locales = ['en', 'es', 'fr'] as const; // Add 'fr'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français', // Add French
};
```

### 2. Create Translation File

Create `messages/fr.json` with all translations.

### 3. Update Middleware

Edit `middleware.ts` to detect the new language:
```tsx
for (const lang of languages) {
  if (lang.code === 'es') return 'es';
  if (lang.code === 'en') return 'en';
  if (lang.code === 'fr') return 'fr'; // Add this
}
```

### 4. Update LanguageToggle

Add flag emoji in `app/components/LanguageToggle.tsx`:
```tsx
<span className="text-lg">
  {locale === 'en' ? '🇺🇸' : locale === 'es' ? '🇪🇸' : '🇫🇷'}
</span>
```

## 🎨 Component Examples

### Example: Translated Button

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

### Example: Translated Form

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');

  return (
    <form>
      <input placeholder={t('name')} />
      <input placeholder={t('email')} />
      <textarea placeholder={t('message')} />
      <button type="submit">{t('send')}</button>
    </form>
  );
}
```

### Example: Hero Section with i18n

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section>
      <h1>{t('greeting')} {t('name')}</h1>
      <p>{t('title')}</p>
      <p>{t('subtitle')}</p>
      <button>{t('cta')}</button>
    </section>
  );
}
```

## 🔧 Configuration Files

### next.config.ts
```tsx
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // your config
};

export default withNextIntl(nextConfig);
```

### middleware.ts
Handles automatic language detection and cookie management.

### i18n/request.ts
Configures how next-intl loads translations based on the current locale.

### i18n/config.ts
Defines available locales and their display names.

## 🐛 Troubleshooting

### Translations Not Updating

1. **Clear browser cache and cookies**
2. **Restart dev server:** `npm run dev`
3. **Check console for errors**

### Language Not Persisting

1. **Check cookie is being set** in DevTools → Application → Cookies
2. **Verify middleware is running** (check Network tab)

### TypeScript Errors

If you get type errors, ensure you have:
```bash
npm install --save-dev @types/node
```

## 📚 Additional Resources

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js Internationalization](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

## ✅ Testing Checklist

- [ ] Language toggle switches between EN/ES
- [ ] Page reloads and maintains selected language
- [ ] Browser language detection works on first visit
- [ ] Cookie persists after browser restart
- [ ] All navigation items are translated
- [ ] Chatbot responds in selected language
- [ ] RAG queries work in both languages
- [ ] Suggested questions update with language
- [ ] Error messages appear in correct language
- [ ] Timestamps format according to locale

## 🎯 Next Steps

To use these translations throughout your app:

1. **Update all components** to use `useTranslations()`
2. **Add translations** for all text in `messages/*.json`
3. **Test thoroughly** in both languages
4. **Consider RTL support** if adding Arabic, Hebrew, etc.
5. **Add server component support** using `getTranslations()` from `next-intl/server`

---

**Note:** The current implementation uses placeholder translations. Replace them with your actual content in `messages/en.json` and `messages/es.json`.
