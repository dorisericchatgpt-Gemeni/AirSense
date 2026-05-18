'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Map, ChartBar as BarChart2, ArrowDown } from 'lucide-react';
import { AirQualityStatus } from '@/lib/sensor-data';

interface HeroProps {
  status: AirQualityStatus;
  avgCo2: number;
  avgTemp: number;
}

const statusConfig = {
  GOOD: { label: 'GOOD', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/40', glow: 'shadow-emerald-500/20' },
  MODERATE: { label: 'MODERATE', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/40', glow: 'shadow-amber-500/20' },
  BAD: { label: 'BAD', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/40', glow: 'shadow-red-500/20' },
};

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.2,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Hero({ status, avgCo2, avgTemp }: HeroProps) {
  const cfg = statusConfig[status];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(99,102,241,0.06)_0%,_transparent_50%)]" />
      <Particles />

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/5 animate-spin-slow" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-cyan-500/8" style={{ animation: 'spin-slow 15s linear infinite reverse' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-500/10 animate-spin-slow" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-2 glass rounded-full text-xs text-slate-400 border border-white/10">
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            NTU Main Library B1 — Smart Campus Prototype
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="text-white">NTU </span>
          <span className="text-gradient">AirSense</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Real-time Air Quality Intelligence for NTU Main Library
          <br />
          <span className="text-slate-500 text-base">Monitor CO2, temperature, humidity and study comfort — live.</span>
        </motion.p>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border shadow-xl ${cfg.bg} ${cfg.border} ${cfg.glow}`}>
            <div className={`relative flex h-3 w-3`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.color.replace('text-', 'bg-')} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${cfg.color.replace('text-', 'bg-')}`} />
            </div>
            <span className={`text-sm font-bold tracking-widest ${cfg.color}`}>
              AIR QUALITY: {status}
            </span>
            <span className="text-slate-500 text-sm">|</span>
            <span className="text-slate-300 text-sm">CO2: <span className="text-white font-semibold">{avgCo2} ppm</span></span>
            <span className="text-slate-500 text-sm">|</span>
            <span className="text-slate-300 text-sm">{avgTemp}°C</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#airmap"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
          >
            <Map className="w-5 h-5" />
            View Air Map
          </a>
          <a
            href="#dashboard"
            className="group flex items-center justify-center gap-2 px-8 py-4 glass border border-cyan-500/30 text-cyan-400 hover:text-white hover:border-cyan-400/50 font-semibold rounded-xl transition-all duration-200 hover:scale-105"
          >
            <BarChart2 className="w-5 h-5" />
            Live Dashboard
          </a>
        </motion.div>

        {/* Live stat chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {[
            { label: 'Active Sensors', value: '18', icon: '●' },
            { label: 'Study Zones', value: '5', icon: '◈' },
            { label: 'Avg Comfort', value: '74%', icon: '◎' },
            { label: 'Update Rate', value: '3s', icon: '◷' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center">
              <div className="text-cyan-400 text-lg font-bold">{stat.value}</div>
              <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
