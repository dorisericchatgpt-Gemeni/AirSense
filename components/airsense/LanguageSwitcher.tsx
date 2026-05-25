'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { LOCALES, Locale } from '@/lib/i18n/types';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/40 bg-white/5 transition-colors"
        aria-label={t.language.selectLabel}
      >
        <Languages className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute end-0 mt-2 w-48 glass-strong rounded-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden z-50"
          >
            <div className="py-1">
              {LOCALES.map(l => {
                const active = l.code === locale;
                return (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLocale(l.code as Locale);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors ${
                      active
                        ? 'bg-cyan-500/10 text-cyan-300'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{l.flag}</span>
                    <span className="flex-1 text-start">{l.label}</span>
                    {active && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
