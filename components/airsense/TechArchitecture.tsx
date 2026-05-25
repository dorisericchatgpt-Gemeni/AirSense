'use client';

import { motion } from 'framer-motion';
import { Cpu, Server, Database, Monitor, ArrowDown, Wifi } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nProvider';

const nodeMeta = [
  { key: 'sensors' as const,   icon: Cpu,      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'shadow-emerald-500/10' },
  { key: 'gateway' as const,   icon: Wifi,     color: 'text-cyan-400',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/30',    glow: 'shadow-cyan-500/10' },
  { key: 'database' as const,  icon: Database, color: 'text-blue-400',    bg: 'bg-blue-500/10',    border: 'border-blue-500/30',    glow: 'shadow-blue-500/10' },
  { key: 'analytics' as const, icon: Server,   color: 'text-violet-400',  bg: 'bg-violet-500/10',  border: 'border-violet-500/30',  glow: 'shadow-violet-500/10' },
  { key: 'dashboard' as const, icon: Monitor,  color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   glow: 'shadow-amber-500/10' },
];

const techStackItems = {
  frontend: ['Next.js 13', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'],
  backend: ['Supabase', 'Edge Functions', 'PostgreSQL', 'TimescaleDB'],
  iot: ['LoRaWAN', 'BLE Mesh', 'MQTT', 'WebSocket'],
  aiml: ['Air quality models', 'Occupancy prediction', 'Anomaly detection'],
} as const;

export default function TechArchitecture() {
  const { t } = useI18n();
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(56,189,248,0.04)_0%,_transparent_60%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-4">
            <Server className="w-3.5 h-3.5" />
            {t.tech.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.tech.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.tech.subtitle}
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-0 mb-16">
          {nodeMeta.map((meta, i) => {
            const Icon = meta.icon;
            const node = t.tech.nodes[meta.key];
            return (
              <div key={meta.key} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`glass rounded-2xl px-8 py-5 border shadow-xl flex items-center gap-4 w-full max-w-sm ${meta.border} ${meta.glow}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${meta.bg}`}>
                    <Icon className={`w-6 h-6 ${meta.color}`} />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{node.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{node.sublabel}</div>
                  </div>
                  <div className="ms-auto">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className={`w-2.5 h-2.5 rounded-full ${meta.color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </motion.div>

                {i < nodeMeta.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.1 }}
                    className="flex flex-col items-center my-1"
                  >
                    <div className="w-px h-4 bg-gradient-to-b from-cyan-500/40 to-cyan-500/10" />
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowDown className="w-4 h-4 text-cyan-500/50" />
                    </motion.div>
                    <div className="w-px h-4 bg-gradient-to-b from-cyan-500/10 to-cyan-500/40" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {(Object.keys(techStackItems) as (keyof typeof techStackItems)[]).map(key => (
            <div key={key} className="glass rounded-2xl p-5 border border-white/5">
              <div className="text-xs font-bold tracking-wider text-cyan-400 mb-3">{t.tech.stack[key].toUpperCase()}</div>
              <div className="space-y-2">
                {techStackItems[key].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className="w-1 h-1 bg-cyan-400/60 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
