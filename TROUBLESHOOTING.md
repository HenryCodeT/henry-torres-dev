# 🔧 i18n Troubleshooting Guide

## ✅ Configuration Fixed

The middleware and configuration have been updated to work correctly with `next-intl`. Here's what was changed:

### Fixed Files:

1. **[middleware.ts](./middleware.ts)** - Now uses `next-intl/middleware`
2. **[i18n/request.ts](./i18n/request.ts)** - Updated to read from headers
3. **[app/actions/locale.ts](./app/actions/locale.ts)** - NEW: Server action for locale switching
4. **[app/components/LanguageToggle.tsx](./app/components/LanguageToggle.tsx)** - Uses server action

## 🧪 How to Test

### 1. Start the Development Server

```bash
npm run dev
```

### 2. Test Browser Language Detection

1. Open Chrome DevTools
2. Open the Console tab
3. Type this to clear cookies:
   ```js
   document.cookie.split(";").forEach(c => {
     document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
   ```
4. Change your browser language to Spanish:
   - Chrome: `chrome://settings/languages`
   - Edge: `edge://settings/languages`
   - Add Spanish and move it to the top
5. Refresh the page
6. **Expected:** Navigation should show Spanish text

### 3. Test Language Toggle

1. Click the 🌐 button in the navigation
2. You should see a dropdown with:
   - 🇺🇸 English
   - 🇪🇸 Español
3. Click "Español"
4. **Expected:** Page reloads and navigation shows:
   - "About" → "Sobre Mí"
   - "Skills" → "Habilidades"
   - "Projects" → "Proyectos"
   - "Services" → "Servicios"
   - "Contact" → "Contacto"

### 4. Test Chatbot

1. With Spanish selected, click the 🦙 chatbot button
2. **Expected Welcome Message:** "¡Hola! Soy Llamita, la asistente de IA de Henry..."
3. **Expected Suggested Questions in Spanish:**
   - "¿En qué tecnologías se especializa Henry?"
   - "Cuéntame sobre la experiencia de Henry en integración de IA"
   - "¿Qué servicios ofrece Henry?"
4. Ask a question in Spanish: "¿Qué servicios ofrece Henry?"
5. **Expected:** Response in Spanish about services

### 5. Test Cookie Persistence

1. Switch to Spanish
2. Close the browser tab
3. Open a new tab and go to your site
4. **Expected:** Site loads in Spanish
5. Check cookies in DevTools → Application → Cookies
6. **Expected:** Cookie named `NEXT_LOCALE` with value `es`

## 🐛 Common Issues & Solutions

### Issue: Navigation text not changing

**Symptoms:**
- Click language toggle
- Navigation stays in English

**Solutions:**

1. **Check if translations are loading:**
   - Open DevTools Console
   - Look for errors related to `messages/es.json`
   - If you see 404 errors, the translation files aren't being found

2. **Verify cookie is set:**
   - DevTools → Application → Cookies
   - Look for `NEXT_LOCALE` cookie
   - If missing, the server action might not be working

3. **Clear cache and rebuild:**
   ```bash
   # Stop dev server (Ctrl+C)
   rm -rf .next
   npm run dev
   ```

4. **Check middleware is running:**
   - Add console.log to middleware.ts:
   ```ts
   export default function middleware(request: NextRequest) {
     console.log('Middleware running:', request.url);
     return intlMiddleware(request);
   }
   ```
   - You should see logs in the terminal

### Issue: Page not reloading after language switch

**Symptoms:**
- Click Español
- Dropdown closes but nothing happens

**Solutions:**

1. **Check browser console for errors**
   - Open DevTools → Console
   - Look for JavaScript errors

2. **Verify server action is working:**
   - Check `app/actions/locale.ts` exists
   - Try manual cookie setting:
   ```js
   // In browser console
   document.cookie = 'NEXT_LOCALE=es; path=/; max-age=31536000';
   location.reload();
   ```

### Issue: Chatbot still in English

**Symptoms:**
- Site is in Spanish
- Chatbot shows English text

**Solutions:**

1. **Check if using correct component:**
   - Open `app/layout.tsx`
   - Should import `LlamitaChatI18n` not `LlamitaChat`
   ```tsx
   import LlamitaChatI18n from "./components/LlamitaChatI18n";
   ```

2. **Verify chatbot translations:**
   - Check `messages/es.json` has `chat` section
   - Should have keys: `title`, `subtitle`, `welcome`, `placeholder`, etc.

3. **Check API is receiving locale:**
   - Open browser Network tab
   - Send a chat message
   - Check the request payload
   - Should include `"locale": "es"`

### Issue: "NEXT_LOCALE is not defined" error

**Symptoms:**
- Console shows errors about NEXT_LOCALE

**Solution:**
- The cookie name should be exactly `NEXT_LOCALE`
- Check in `app/actions/locale.ts`:
```ts
cookieStore.set('NEXT_LOCALE', locale, { ... });
```

### Issue: Translations not found

**Symptoms:**
- Console error: "Cannot find module '../messages/es.json'"

**Solutions:**

1. **Verify files exist:**
   ```bash
   ls messages/
   # Should show: en.json  es.json
   ```

2. **Check file names are correct:**
   - Must be exactly `en.json` and `es.json` (lowercase)
   - Must be in `messages/` folder at root

3. **Restart dev server:**
   ```bash
   # Ctrl+C to stop
   npm run dev
   ```

## 📋 Verification Checklist

Run through this checklist to ensure everything works:

- [ ] Dev server starts without errors
- [ ] Can see 🌐 button in navigation
- [ ] Clicking 🌐 opens dropdown with EN/ES options
- [ ] Clicking "Español" reloads page
- [ ] After reload, navigation shows Spanish text
- [ ] Cookie `NEXT_LOCALE=es` is set in DevTools
- [ ] Refreshing page keeps Spanish
- [ ] Chatbot welcome message in Spanish
- [ ] Chatbot suggested questions in Spanish
- [ ] Asking chatbot in Spanish gets Spanish response
- [ ] Switching back to English works
- [ ] Closing and reopening browser remembers language

## 🔍 Debug Mode

Add this to your component to see current state:

```tsx
// Add to Navigation.tsx temporarily
import { useLocale } from 'next-intl';

export default function Navigation() {
  const t = useTranslations('navigation');
  const locale = useLocale();

  console.log('Current locale:', locale);
  console.log('Translation test:', t('about'));

  // ... rest of component
}
```

Check the console to see:
- `Current locale: es` (when Spanish selected)
- `Translation test: Sobre Mí` (Spanish) or `About` (English)

## 🧰 Manual Testing Commands

### Test Cookie Setting (Browser Console)

```js
// Set to Spanish
document.cookie = 'NEXT_LOCALE=es; path=/; max-age=31536000; SameSite=Lax';
location.reload();

// Set to English
document.cookie = 'NEXT_LOCALE=en; path=/; max-age=31536000; SameSite=Lax';
location.reload();

// Check current cookie
document.cookie.split(';').find(c => c.includes('NEXT_LOCALE'))
```

### Test Translation Loading (Add to page.tsx)

```tsx
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('hero');
  console.log('Hero title:', t('title'));
  // Should log Spanish or English based on locale
}
```

## 🚨 Emergency Reset

If everything is broken:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Delete build cache
rm -rf .next

# 3. Clear node_modules and reinstall
rm -rf node_modules
npm install

# 4. Rebuild
npm run build

# 5. Start fresh
npm run dev

# 6. Clear browser data
# In browser: DevTools → Application → Clear site data

# 7. Test again
```

## ✅ Expected Behavior Summary

### On First Visit (No Cookie)
1. Middleware detects browser language from `Accept-Language` header
2. If Spanish browser → sets `NEXT_LOCALE=es`
3. If English browser → sets `NEXT_LOCALE=en`
4. Page loads in detected language

### On Language Toggle Click
1. User clicks 🌐 and selects "Español"
2. `setUserLocale('es')` server action runs
3. Cookie `NEXT_LOCALE=es` is set
4. `router.refresh()` triggers re-render
5. Page reloads after 100ms
6. All text appears in Spanish

### On Page Refresh
1. Middleware reads `NEXT_LOCALE` cookie
2. Passes locale to `i18n/request.ts`
3. Loads appropriate `messages/es.json` or `messages/en.json`
4. `NextIntlClientProvider` provides translations to components
5. Components use `useTranslations()` to get text

### In Chatbot
1. Component uses `useLocale()` to get current language
2. Loads translations: `useTranslations('chat')`
3. Sends `{ message, locale: 'es' }` to API
4. API checks `locale === 'es'` and returns Spanish response
5. UI shows Spanish welcome, questions, and responses

## 📞 Still Having Issues?

If you've tried everything and it still doesn't work:

1. **Check the build output:**
   ```bash
   npm run build
   ```
   Look for any errors or warnings

2. **Verify all files exist:**
   - `middleware.ts`
   - `i18n/config.ts`
   - `i18n/request.ts`
   - `messages/en.json`
   - `messages/es.json`
   - `app/actions/locale.ts`
   - `app/components/LanguageToggle.tsx`

3. **Check import paths:**
   - All imports use `@/` prefix (e.g., `@/i18n/config`)
   - TypeScript paths are configured in `tsconfig.json`

4. **Compare with working examples:**
   - See `app/components/examples/` for reference implementations

---

**Last Updated:** November 28, 2025
**Status:** ✅ Configurations Fixed - Ready to Test
