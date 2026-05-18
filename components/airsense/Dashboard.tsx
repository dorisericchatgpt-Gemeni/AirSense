'use client';

import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TimeSeriesPoint } from '@/lib/sensor-data';
import { Wind, Thermometer, Droplets, Users } from 'lucide-react';

interface DashboardProps {
  history: TimeSeriesPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl p-3 border border-white/10 text-xs">
      <div className="text-slate-400 mb-2">{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
          <span className="text-slate-300">{entry.name}:</span>
          <span className="text-white font-semibold">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

interface ChartCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

function ChartCard({ title, icon, children, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-5 border border-white/5 hover:border-cyan-500/20 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="text-cyan-400">{icon}</div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Live
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export default function Dashboard({ history }: DashboardProps) {
  const displayData = history.slice(-20);

  return (
    <section id="dashboard" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-xs text-cyan-400 border border-cyan-500/20 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Updates every 3 seconds
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Live Dashboard</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Real-time sensor telemetry streamed from all study zones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CO2 */}
          <ChartCard title="CO2 Concentration" icon={<Wind className="w-4 h-4" />} delay={0}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={displayData}>
                <defs>
                  <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                <YAxis domain={[400, 1400]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="co2"
                  name="CO2 (ppm)"
                  stroke="#22d3ee"
                  strokeWidth={2}
                  fill="url(#co2Gradient)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2 text-xs text-slate-500">
              <span className="text-amber-400/80">800 ppm: Warning</span>
              <span className="text-red-400/80">1200 ppm: Critical</span>
            </div>
          </ChartCard>

          {/* Temperature */}
          <ChartCard title="Temperature" icon={<Thermometer className="w-4 h-4" />} delay={0.1}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={displayData}>
                <defs>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                <YAxis domain={[18, 32]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  name="Temp (°C)"
                  stroke="#f97316"
                  strokeWidth={2}
                  fill="url(#tempGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Humidity */}
          <ChartCard title="Humidity" icon={<Droplets className="w-4 h-4" />} delay={0.2}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={displayData}>
                <defs>
                  <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                <YAxis domain={[30, 90]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="humidity"
                  name="Humidity (%)"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  fill="url(#humGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Occupancy */}
          <ChartCard title="Occupancy Trend" icon={<Users className="w-4 h-4" />} delay={0.3}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} interval="preserveStartEnd" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="occupancy"
                  name="Occupancy (%)"
                  stroke="#a78bfa"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}
