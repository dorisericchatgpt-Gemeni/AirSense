'use client';

import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';
import { ZoneData, Recommendation } from '@/lib/sensor-data';
import { Brain, Heart, Leaf, Lightbulb } from 'lucide-react';
import { useI18n, interpolate } from '@/lib/i18n/I18nProvider';

interface ComfortScoresProps {
  zones: ZoneData[];
  recommendations: Recommendation[];
}

function RadialGauge({ value, color, label, icon: Icon }: { value: number; color: string; label: string; icon: any }) {
  const data = [{ value, fill: color }];
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="65%"
            outerRadius="100%"
            data={data}
            startAngle={225}
            endAngle={-45}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" background={{ fill: 'rgba(255,255,255,0.05)' }} isAnimationActive={false} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 mb-1" style={{ color }} />
          <div className="text-xl font-bold text-white">{value}</div>
          <div className="text-xs text-slate-500">/ 100</div>
        </div>
      </div>
      <div className="text-sm font-medium text-slate-300 mt-2">{label}</div>
    </div>
  );
}

function ZoneComfortCard({ zone }: { zone: ZoneData }) {
  const { t } = useI18n();
  const scores = [
    { label: t.comfort.focus, value: zone.focusScore, color: '#22d3ee' },
    { label: t.comfort.comfort, value: zone.comfortScore, color: '#a78bfa' },
    { label: t.comfort.freshness, value: zone.freshness, color: '#34d399' },
  ];
  const statusLabel =
    zone.comfortScore >= 70 ? t.comfort.optimal :
    zone.comfortScore >= 45 ? t.comfort.moderate :
    t.comfort.poor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-2xl p-5 border border-white/5 hover:border-cyan-500/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="font-semibold text-white text-sm">{t.airMap.zoneLabels[zone.id]}</h4>
          <div className="text-xs text-slate-500 mt-0.5">
            CO2: {zone.co2} ppm · {zone.temperature}°C
          </div>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
          zone.comfortScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' :
          zone.comfortScore >= 45 ? 'bg-amber-500/20 text-amber-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {statusLabel}
        </div>
      </div>

      <div className="space-y-2.5">
        {scores.map(score => (
          <div key={score.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{score.label}</span>
              <span className="text-white font-semibold">{score.value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score.value}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: score.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ComfortScores({ zones, recommendations }: ComfortScoresProps) {
  const { t } = useI18n();
  const avgFocus = Math.round(zones.reduce((s, z) => s + z.focusScore, 0) / zones.length);
  const avgComfort = Math.round(zones.reduce((s, z) => s + z.comfortScore, 0) / zones.length);
  const avgFreshness = Math.round(zones.reduce((s, z) => s + z.freshness, 0) / zones.length);

  const renderRec = (rec: Recommendation): string => {
    const template = t.comfort.recommendations[rec.key];
    const resolvedZones: Record<string, string> = {};
    if (rec.zoneRefs) {
      for (const [k, zoneId] of Object.entries(rec.zoneRefs)) {
        resolvedZones[k] = t.airMap.zoneNames[zoneId];
      }
    }
    return interpolate(template, { ...rec.params, ...resolvedZones });
  };

  return (
    <section id="comfort" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-4">
            <Brain className="w-3.5 h-3.5" />
            {t.comfort.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{t.comfort.title}</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.comfort.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 border border-white/5 mb-8 flex flex-wrap justify-around gap-8"
        >
          <RadialGauge value={avgFocus} color="#22d3ee" label={t.comfort.focusScore} icon={Brain} />
          <RadialGauge value={avgComfort} color="#a78bfa" label={t.comfort.comfortScore} icon={Heart} />
          <RadialGauge value={avgFreshness} color="#34d399" label={t.comfort.freshnessScore} icon={Leaf} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {zones.map(zone => (
            <ZoneComfortCard key={zone.id} zone={zone} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 border border-cyan-500/15"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white">{t.comfort.recommendationsTitle}</h3>
            <span className="ms-auto text-xs text-slate-500">{t.comfort.updatedLive}</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {recommendations.map((rec, i) => (
              <motion.div
                key={`${rec.key}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5"
              >
                <span className="text-cyan-400 mt-0.5 text-xs font-bold">0{i + 1}</span>
                <p className="text-sm text-slate-300 leading-relaxed">{renderRec(rec)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
