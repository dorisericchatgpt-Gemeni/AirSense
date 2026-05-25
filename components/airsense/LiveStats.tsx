'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, MapPin, Users, Gauge, Radio } from 'lucide-react';
import { ZoneData } from '@/lib/sensor-data';
import { useI18n } from '@/lib/i18n/I18nProvider';

function useCountUp(target: number, duration = 1000) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    startRef.current = null;
    const start = performance.now();
    const initial = value;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(initial + (target - initial) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return value;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  subtext?: string;
  color: string;
  delay?: number;
}

function StatCard({ icon, label, value, suffix = '', subtext, color, delay = 0 }: StatCardProps) {
  const animated = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-6 border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {animated}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-300 mb-1">{label}</div>
      {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
    </motion.div>
  );
}

interface LiveStatsProps {
  zones: ZoneData[];
}

export default function LiveStats({ zones }: LiveStatsProps) {
  const { t } = useI18n();
  if (zones.length === 0) return null;
  const avgCo2 = Math.round(zones.reduce((s, z) => s + z.co2, 0) / zones.length);
  const bestZone = [...zones].sort((a, b) => b.comfortScore - a.comfortScore)[0];
  const mostCrowded = [...zones].sort((a, b) => b.crowdDensity - a.crowdDensity)[0];
  const ventEff = Math.round(zones.reduce((s, z) => s + z.freshness, 0) / zones.length);

  return (
    <section className="py-24 px-4 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.04)_0%,_transparent_70%)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            {t.liveStats.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.liveStats.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.liveStats.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<Wind className="w-5 h-5 text-cyan-400" />}
            label={t.liveStats.avgCo2}
            value={avgCo2}
            suffix=" ppm"
            subtext={t.liveStats.libraryAverage}
            color="bg-cyan-500/10"
            delay={0}
          />
          <StatCard
            icon={<MapPin className="w-5 h-5 text-emerald-400" />}
            label={t.liveStats.bestStudyZone}
            value={bestZone?.comfortScore ?? 0}
            suffix="%"
            subtext={bestZone ? t.airMap.zoneLabels[bestZone.id] : ''}
            color="bg-emerald-500/10"
            delay={0.1}
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-amber-400" />}
            label={t.liveStats.mostCrowded}
            value={mostCrowded?.crowdDensity ?? 0}
            suffix="%"
            subtext={mostCrowded ? t.airMap.zoneLabels[mostCrowded.id] : ''}
            color="bg-amber-500/10"
            delay={0.2}
          />
          <StatCard
            icon={<Gauge className="w-5 h-5 text-blue-400" />}
            label={t.liveStats.ventilationEff}
            value={ventEff}
            suffix="%"
            subtext={t.liveStats.freshnessIndex}
            color="bg-blue-500/10"
            delay={0.3}
          />
          <StatCard
            icon={<Radio className="w-5 h-5 text-violet-400" />}
            label={t.liveStats.activeSensors}
            value={18}
            subtext={t.liveStats.allZonesOnline}
            color="bg-violet-500/10"
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass rounded-2xl p-6 border border-white/5"
        >
          <div className="text-sm font-semibold text-white mb-4">{t.liveStats.sensorStatusGrid}</div>
          <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-18 gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.4, 1, 0.4],
                  scale: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                className="aspect-square rounded-md bg-emerald-400/20 border border-emerald-400/30 flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              {t.liveStats.online} (18/18)
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-slate-600 rounded-full" />
              {t.liveStats.offline} (0)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
