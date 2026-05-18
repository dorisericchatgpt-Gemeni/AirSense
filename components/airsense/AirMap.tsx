'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Thermometer, Droplets, Users, Wind, Activity } from 'lucide-react';
import { ZoneData, ZoneId } from '@/lib/sensor-data';

interface ZoneOverlay {
  id: ZoneId;
  label: string;
  x: number; // percent
  y: number;
  w: number;
  h: number;
}

const zones: ZoneOverlay[] = [
  { id: 'a-area',     label: 'A Area',        x: 35, y: 25, w: 22, h: 50 },
  { id: 'b-area',     label: 'B Area',        x: 72, y: 22, w: 18, h: 50 },
  { id: 'conference', label: 'Conference',    x: 56, y: 42, w: 14, h: 22 },
  { id: 'discussion', label: 'Discussion',    x: 38, y: 76, w: 16, h: 14 },
  { id: 'restroom',   label: 'Restroom',      x: 42, y: 8,  w: 10, h: 10 },
];

function getHeatColor(score: number): string {
  if (score >= 70) return 'rgba(16,185,129,0.25)'; // green
  if (score >= 45) return 'rgba(245,158,11,0.25)'; // yellow
  return 'rgba(239,68,68,0.25)';                   // red
}

function getBorderColor(score: number): string {
  if (score >= 70) return 'rgba(16,185,129,0.6)';
  if (score >= 45) return 'rgba(245,158,11,0.6)';
  return 'rgba(239,68,68,0.6)';
}

function getScoreLabel(score: number) {
  if (score >= 70) return { label: 'FRESH', color: 'text-emerald-400' };
  if (score >= 45) return { label: 'MODERATE', color: 'text-amber-400' };
  return { label: 'POOR', color: 'text-red-400' };
}

interface PopupProps {
  zone: ZoneOverlay;
  data: ZoneData;
  onClose: () => void;
}

function ZonePopup({ zone, data, onClose }: PopupProps) {
  const scoreInfo = getScoreLabel(data.airQualityScore);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute z-30 glass-strong rounded-2xl p-4 w-64 shadow-2xl shadow-black/50"
      style={{
        left: `${Math.min(zone.x + zone.w + 1, 62)}%`,
        top: `${Math.max(zone.y - 5, 2)}%`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-white font-semibold text-sm">{data.name}</div>
          <div className={`text-xs font-bold tracking-wider mt-0.5 ${scoreInfo.color}`}>
            {scoreInfo.label}
          </div>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="glass rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Wind className="w-3 h-3 text-cyan-400" /> CO2
          </div>
          <div className={`text-base font-bold ${data.co2 > 1000 ? 'text-red-400' : data.co2 > 800 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {data.co2}
          </div>
          <div className="text-slate-500 text-xs">ppm</div>
        </div>
        <div className="glass rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Thermometer className="w-3 h-3 text-orange-400" /> Temp
          </div>
          <div className="text-base font-bold text-white">{data.temperature}</div>
          <div className="text-slate-500 text-xs">°C</div>
        </div>
        <div className="glass rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Droplets className="w-3 h-3 text-blue-400" /> Humidity
          </div>
          <div className="text-base font-bold text-white">{data.humidity}</div>
          <div className="text-slate-500 text-xs">%</div>
        </div>
        <div className="glass rounded-xl p-2.5">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Users className="w-3 h-3 text-violet-400" /> Crowd
          </div>
          <div className="text-base font-bold text-white">{data.crowdDensity}</div>
          <div className="text-slate-500 text-xs">%</div>
        </div>
      </div>

      {/* Air quality score bar */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <div className="flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3" /> Air Quality Score
          </div>
          <span className={scoreInfo.color + ' font-semibold'}>{data.airQualityScore}/100</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.airQualityScore}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${data.airQualityScore >= 70 ? 'bg-emerald-400' : data.airQualityScore >= 45 ? 'bg-amber-400' : 'bg-red-400'}`}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface AirMapProps {
  zoneData: ZoneData[];
}

export default function AirMap({ zoneData }: AirMapProps) {
  const [selected, setSelected] = useState<ZoneId | null>(null);
  const [hovered, setHovered] = useState<ZoneId | null>(null);

  const getZoneData = (id: ZoneId) => zoneData.find(z => z.id === id)!;
  const selectedZone = zones.find(z => z.id === selected);
  const selectedData = selected ? getZoneData(selected) : null;

  return (
    <section id="airmap" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Interactive Floor Map
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            B1 Air Quality Map
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real-time heatmap overlay on the NTU Main Library B1 floor plan. Click any zone for detailed readings.
          </p>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { color: 'bg-emerald-400', label: 'Fresh (Score ≥ 70)' },
            { color: 'bg-amber-400', label: 'Moderate (45–70)' },
            { color: 'bg-red-400', label: 'Poor (< 45)' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-slate-400">
              <div className={`w-3 h-3 rounded-full ${item.color} opacity-70`} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden glass-strong border border-cyan-500/10 shadow-2xl shadow-black/50"
        >
          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
            <div
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-scan"
              style={{ animationDuration: '8s' }}
            />
          </div>

          {/* Floor plan image */}
          <div className="relative" style={{ paddingBottom: '60%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/image.png"
              alt="NTU Main Library B1 Floor Plan"
              className="absolute inset-0 w-full h-full object-contain bg-[#0d1526]"
              style={{ filter: 'brightness(0.7) saturate(0.5) contrast(1.1)' }}
            />

            {/* Zone overlays */}
            {zones.map(zone => {
              const data = getZoneData(zone.id);
              const score = data?.airQualityScore ?? 50;
              const isHovered = hovered === zone.id;
              const isSelected = selected === zone.id;

              return (
                <motion.button
                  key={zone.id}
                  style={{
                    position: 'absolute',
                    left: `${zone.x}%`,
                    top: `${zone.y}%`,
                    width: `${zone.w}%`,
                    height: `${zone.h}%`,
                    background: isHovered || isSelected ? getHeatColor(score).replace('0.25', '0.4') : getHeatColor(score),
                    border: `2px solid ${getBorderColor(score)}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: isSelected ? 15 : 10,
                    transition: 'all 0.2s ease',
                  }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHovered(zone.id)}
                  onHoverEnd={() => setHovered(null)}
                  onClick={() => setSelected(selected === zone.id ? null : zone.id)}
                  aria-label={`View ${zone.label} air quality data`}
                >
                  {/* Zone label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-white text-xs font-bold drop-shadow-lg text-center leading-tight px-1">
                      {zone.label}
                    </div>
                    {data && (
                      <div className={`text-xs font-semibold drop-shadow-lg mt-0.5 ${score >= 70 ? 'text-emerald-300' : score >= 45 ? 'text-amber-300' : 'text-red-300'}`}>
                        {data.co2} ppm
                      </div>
                    )}
                  </div>

                  {/* Pulse ring for bad zones */}
                  {score < 45 && (
                    <div className="absolute inset-0 rounded border-2 border-red-400/50 animate-ping" style={{ animationDuration: '2s' }} />
                  )}
                </motion.button>
              );
            })}

            {/* Zone popup */}
            <AnimatePresence>
              {selected && selectedZone && selectedData && (
                <ZonePopup
                  key={selected}
                  zone={selectedZone}
                  data={selectedData}
                  onClose={() => setSelected(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status bar */}
          <div className="flex flex-wrap items-center gap-4 px-6 py-3 border-t border-white/5 bg-black/20">
            {zoneData.map(z => {
              const sc = getScoreLabel(z.airQualityScore);
              return (
                <button
                  key={z.id}
                  onClick={() => setSelected(selected === z.id ? null : z.id)}
                  className={`flex items-center gap-2 text-xs transition-all ${selected === z.id ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <span className={`w-2 h-2 rounded-full ${z.airQualityScore >= 70 ? 'bg-emerald-400' : z.airQualityScore >= 45 ? 'bg-amber-400' : 'bg-red-400'}`} />
                  {z.name.split(' (')[0]}
                  <span className={sc.color}>{z.airQualityScore}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
