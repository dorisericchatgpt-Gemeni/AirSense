'use client';

import { motion } from 'framer-motion';
import { Cpu, Server, Database, ChartBar as BarChart2, Monitor, ArrowDown, Wifi } from 'lucide-react';

const nodes = [
  {
    icon: Cpu,
    label: 'IoT Sensors',
    sublabel: 'CO2, Temp, Humidity, PIR',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/10',
  },
  {
    icon: Wifi,
    label: 'Edge Gateway',
    sublabel: 'LoRaWAN / BLE Mesh',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    glow: 'shadow-cyan-500/10',
  },
  {
    icon: Database,
    label: 'Cloud Database',
    sublabel: 'Supabase / TimescaleDB',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    glow: 'shadow-blue-500/10',
  },
  {
    icon: Server,
    label: 'Analytics Engine',
    sublabel: 'Edge Functions / ML',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    glow: 'shadow-violet-500/10',
  },
  {
    icon: Monitor,
    label: 'AirSense Dashboard',
    sublabel: 'Next.js / Real-time UI',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    glow: 'shadow-amber-500/10',
  },
];

const techStack = [
  { label: 'Frontend', items: ['Next.js 13', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'] },
  { label: 'Backend', items: ['Supabase', 'Edge Functions', 'PostgreSQL', 'TimescaleDB'] },
  { label: 'IoT Protocol', items: ['LoRaWAN', 'BLE Mesh', 'MQTT', 'WebSocket'] },
  { label: 'AI/ML', items: ['Air quality models', 'Occupancy prediction', 'Anomaly detection'] },
];

export default function TechArchitecture() {
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
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Technical Architecture</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            End-to-end data pipeline from IoT sensors to intelligent visualization.
          </p>
        </motion.div>

        {/* Architecture diagram */}
        <div className="flex flex-col items-center gap-0 mb-16">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`glass rounded-2xl px-8 py-5 border shadow-xl flex items-center gap-4 w-full max-w-sm ${node.border} ${node.glow}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${node.bg}`}>
                    <Icon className={`w-6 h-6 ${node.color}`} />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{node.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{node.sublabel}</div>
                  </div>
                  {/* Pulse dot */}
                  <div className="ml-auto">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      className={`w-2.5 h-2.5 rounded-full ${node.color.replace('text-', 'bg-')}`}
                    />
                  </div>
                </motion.div>

                {/* Arrow connector */}
                {i < nodes.length - 1 && (
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

        {/* Tech stack grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {techStack.map(stack => (
            <div key={stack.label} className="glass rounded-2xl p-5 border border-white/5">
              <div className="text-xs font-bold tracking-wider text-cyan-400 mb-3">{stack.label.toUpperCase()}</div>
              <div className="space-y-2">
                {stack.items.map(item => (
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
