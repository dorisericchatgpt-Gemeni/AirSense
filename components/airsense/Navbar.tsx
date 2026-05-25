'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Menu, X, Activity } from 'lucide-react';
import { AirQualityStatus } from '@/lib/sensor-data';
import { useI18n } from '@/lib/i18n/I18nProvider';
import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  status: AirQualityStatus;
}

const statusConfig = {
  GOOD: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30', dot: 'bg-emerald-400' },
  MODERATE: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', dot: 'bg-amber-400' },
  BAD: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', dot: 'bg-red-400' },
};

export default function Navbar({ status }: NavbarProps) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = statusConfig[status];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { label: t.navbar.airMap, href: '#airmap' },
    { label: t.navbar.dashboard, href: '#dashboard' },
    { label: t.navbar.comfort, href: '#comfort' },
    { label: t.navbar.vision, href: '#vision' },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-cyan-500/20 animate-pulse" />
            <Wind className="w-5 h-5 text-cyan-400 relative z-10" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            NTU <span className="text-gradient-cyan">AirSense</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
            <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
            {t.status[status]}
          </div>
          <a href="#dashboard" className="hidden md:flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            <Activity className="w-3.5 h-3.5" />
            {t.navbar.live}
          </a>
          <LanguageSwitcher />
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t.navbar.toggleMenu}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-300 hover:text-white py-2 border-b border-white/5 last:border-0"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border w-fit ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                <span className={`w-2 h-2 rounded-full ${cfg.dot} animate-pulse`} />
                {t.navbar.airQuality}: {t.status[status]}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
