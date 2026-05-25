'use client';

import { motion } from 'framer-motion';
import { Wind, Github, Mail, ExternalLink, Heart } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

export default function Footer() {
  const { t } = useI18n();
  const projectLinks = [
    { label: t.footer.links.beyondBorders, href: '#' },
    { label: t.footer.links.prototype, href: '#' },
    { label: t.footer.links.paper, href: '#' },
    { label: t.footer.links.api, href: '#' },
  ];

  return (
    <footer className="py-16 px-4 border-t border-white/5 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-12 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-cyan-500/20" />
                <Wind className="w-5 h-5 text-cyan-400 relative z-10" />
              </div>
              <span className="font-bold text-lg text-white">NTU AirSense</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              {t.footer.brandDescription}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Heart className="w-3 h-3 text-red-500/60" />
              {t.footer.builtFor}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold tracking-wider text-slate-500 mb-4">{t.footer.projectHeading}</div>
            <div className="space-y-3">
              {projectLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-bold tracking-wider text-slate-500 mb-4">{t.footer.connectHeading}</div>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                {t.footer.githubRepo}
              </a>
              <a
                href="mailto:eric050801@gmail.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                eric050801@gmail.com
              </a>
            </div>

            <div className="mt-6 glass rounded-xl p-4 border border-cyan-500/15">
              <div className="text-xs text-cyan-400 font-semibold mb-1">{t.footer.prototypeBox.title}</div>
              <div className="text-xs text-slate-500">
                {t.footer.prototypeBox.line1}<br />
                {t.footer.prototypeBox.line2}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {t.footer.copyright}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>{t.footer.dataSimulated}</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              {t.footer.allSystemsOperational}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
