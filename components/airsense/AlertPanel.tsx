'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, Info, X, Bell } from 'lucide-react';
import { Alert } from '@/lib/sensor-data';
import { useState } from 'react';
import { useI18n, interpolate } from '@/lib/i18n/I18nProvider';

interface AlertPanelProps {
  alerts: Alert[];
}

const alertConfig = {
  critical: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    dot: 'bg-red-400',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
  info: {
    icon: Info,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
  },
};

function useAlertText() {
  const { t } = useI18n();
  return (alert: Alert) => ({
    label: t.alerts.types[alert.type],
    zone: t.airMap.zoneNames[alert.zoneId],
    message: interpolate(t.alerts.messages[alert.messageKey], alert.messageParams ?? {}),
  });
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const resolve = useAlertText();
  const visible = alerts.filter(a => !dismissed.has(a.id));

  if (visible.length === 0) return null;

  return (
    <div className="fixed top-20 end-4 z-40 flex flex-col gap-2 w-72 sm:w-80">
      <AnimatePresence>
        {visible.slice(0, 3).map((alert, i) => {
          const cfg = alertConfig[alert.type];
          const Icon = cfg.icon;
          const text = resolve(alert);
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className={`glass-strong rounded-xl p-3.5 border shadow-xl ${cfg.bg} ${cfg.border}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 flex-shrink-0 ${cfg.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-bold tracking-wider ${cfg.color}`}>{text.label}</span>
                    <span className="text-slate-500 text-xs truncate">{text.zone}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{text.message}</p>
                </div>
                <button
                  onClick={() => setDismissed(prev => { const next = new Set(Array.from(prev)); next.add(alert.id); return next; })}
                  className="text-slate-600 hover:text-slate-300 flex-shrink-0 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function AlertSection({ alerts }: AlertPanelProps) {
  const { t } = useI18n();
  const resolve = useAlertText();
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">{t.alerts.sectionTitle}</h3>
          {alerts.length > 0 && (
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full border border-amber-500/30">
              {alerts.length}
            </span>
          )}
        </div>
        {alerts.length === 0 ? (
          <div className="glass rounded-xl p-6 text-center text-slate-500 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
              <Info className="w-5 h-5 text-emerald-400" />
            </div>
            {t.alerts.allNormal}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {alerts.map((alert) => {
              const cfg = alertConfig[alert.type];
              const Icon = cfg.icon;
              const text = resolve(alert);
              return (
                <div key={alert.id} className={`glass rounded-xl p-4 border ${cfg.bg} ${cfg.border}`}>
                  <div className="flex items-start gap-3">
                    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.color}`} />
                    <div>
                      <div className={`text-xs font-bold tracking-wider mb-1 ${cfg.color}`}>{text.label}</div>
                      <div className="text-xs text-slate-400 mb-1">{text.zone}</div>
                      <div className="text-sm text-slate-200">{text.message}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
