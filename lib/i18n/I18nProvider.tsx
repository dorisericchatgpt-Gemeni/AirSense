'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { Dictionary, Locale, RTL_LOCALES } from './types';
import { dictionaries } from './locales';

const STORAGE_KEY = 'airsense.locale';
const DEFAULT_LOCALE: Locale = 'en';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && stored in dictionaries) return stored;
  const browser = window.navigator.language;
  if (browser.startsWith('zh-TW') || browser === 'zh-Hant') return 'zh-TW';
  if (browser.startsWith('zh')) return 'zh-CN';
  const short = browser.slice(0, 2) as Locale;
  if (short in dictionaries) return short;
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(detectInitialLocale());
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.documentElement.dir = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: dictionaries[locale],
    isRTL: RTL_LOCALES.includes(locale),
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
