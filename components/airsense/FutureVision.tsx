'use client';

import { motion } from 'framer-motion';
import { Cpu, Wifi, Database, ChartLine as LineChart, Zap, Brain, Globe, Leaf } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const visionMeta = [
  { key: 'hvac' as const,      icon: Cpu,   color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20' },
  { key: 'iot' as const,       icon: Wifi,  color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  { key: 'campus' as const,    icon: Globe, color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/20' },
  { key: 'energy' as const,    icon: Zap,   color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  { key: 'cognitive' as const, icon: Brain, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { key: 'carbon' as const,    icon: Leaf,  color: 'text-green-400',   bg: 'bg-green-500/10',   border: 'border-green-500/20' },
];

const timelineMeta = [
  { key: 'p1' as const, status: 'active',   year: '2025' },
  { key: 'p2' as const, status: 'upcoming', year: '2026' },
  { key: 'p3' as const, status: 'upcoming', year: '2027' },
  { key: 'p4' as const, status: 'upcoming', year: '2028' },
];

export default function FutureVision() {
  const { t } = useI18n();
  return (
    <section id="vision" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.06)_0%,_transparent_60%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-violet-400 border border-violet-500/20 mb-4">
            <Globe className="w-3.5 h-3.5" />
            {t.vision.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t.vision.title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.vision.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {visionMeta.map((meta, i) => {
            const Icon = meta.icon;
            const item = t.vision.items[meta.key];
            return (
              <motion.div
                key={meta.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`glass rounded-2xl p-6 border hover:scale-105 transition-all duration-300 cursor-default ${meta.border}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${meta.bg}`}>
                  <Icon className={`w-5 h-5 ${meta.color}`} />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/5"
        >
          <h3 className="text-white font-semibold text-lg mb-8 text-center">{t.vision.roadmapTitle}</h3>
          <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {timelineMeta.map((meta, i) => {
                const item = t.vision.phases[meta.key];
                return (
                  <motion.div
                    key={meta.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 z-10 relative border-2 ${
                      meta.status === 'active'
                        ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20'
                        : 'bg-white/5 border-slate-600'
                    }`}>
                      {meta.status === 'active' ? (
                        <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                      ) : (
                        <span className="w-3 h-3 bg-slate-600 rounded-full" />
                      )}
                    </div>
                    <div className={`text-xs font-bold tracking-wider mb-1 ${meta.status === 'active' ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {item.phase}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                    <div className="text-xs text-slate-500 mb-1">{item.desc}</div>
                    <div className={`text-xs font-bold ${meta.status === 'active' ? 'text-cyan-400' : 'text-slate-600'}`}>{meta.year}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
