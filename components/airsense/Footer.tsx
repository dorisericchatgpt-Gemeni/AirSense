'use client';

import { motion } from 'framer-motion';
import { Wind, Github, Mail, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
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
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg bg-cyan-500/20" />
                <Wind className="w-5 h-5 text-cyan-400 relative z-10" />
              </div>
              <span className="font-bold text-lg text-white">NTU AirSense</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Real-time environmental intelligence for NTU Main Library.
              Making every breath count for student wellbeing and academic performance.
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Heart className="w-3 h-3 text-red-500/60" />
              Built for smarter campuses
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-bold tracking-wider text-slate-500 mb-4">PROJECT</div>
            <div className="space-y-3">
              {[
                { label: 'Beyond Borders Initiative', href: '#' },
                { label: 'Smart Campus Prototype', href: '#' },
                { label: 'Research Paper (Placeholder)', href: '#' },
                { label: 'API Documentation', href: '#' },
              ].map(link => (
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

          {/* Contact */}
          <div>
            <div className="text-xs font-bold tracking-wider text-slate-500 mb-4">CONNECT</div>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
              <a
                href="mailto:airsense@ntu.edu.tw"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                airsense@ntu.edu.tw
              </a>
            </div>

            <div className="mt-6 glass rounded-xl p-4 border border-cyan-500/15">
              <div className="text-xs text-cyan-400 font-semibold mb-1">Smart Campus Prototype</div>
              <div className="text-xs text-slate-500">
                NTU Beyond Borders Initiative<br />
                National Taiwan University
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            © 2025 NTU AirSense · Smart Campus Environmental Intelligence
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>Data simulated · For demo purposes</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
