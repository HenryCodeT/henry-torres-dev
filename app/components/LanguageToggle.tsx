'use client';

import { useState, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';

export default function LanguageToggle() {
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);

    startTransition(() => {
      // Replace the current route with the new locale
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 hover:bg-terracotta/20 transition-colors text-sm font-medium text-foreground"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isPending}
      >
        <Globe className="h-5 w-5 text-terracotta" />
        <span>{currentLocale.toUpperCase()}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-48 bg-stone-50 dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 overflow-hidden z-50"
            >
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  disabled={isPending}
                  className={`w-full px-4 py-3 text-left text-foreground dark:text-white hover:bg-terracotta/10 dark:hover:bg-terracotta/30 transition-colors flex items-center justify-between ${
                    currentLocale === locale ? 'bg-terracotta/5 dark:bg-terracotta/40 font-semibold' : ''
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">
                      {locale === 'en' ? '🇺🇸' : '🇪🇸'}
                    </span>
                    <span>{localeNames[locale]}</span>
                  </span>
                  {currentLocale === locale && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-terracotta"
                    >
                      ✓
                    </motion.span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
