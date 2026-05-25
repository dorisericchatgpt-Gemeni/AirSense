'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ZoneData,
  TimeSeriesPoint,
  Alert,
  AirQualityStatus,
  Recommendation,
  generateZoneData,
  generateTimeSeriesPoint,
  getOverallStatus,
  generateAlerts,
  generateRecommendations,
} from '@/lib/sensor-data';

const HISTORY_LENGTH = 30;

export function useSensorData() {
  const [zones, setZones] = useState<ZoneData[]>([]);
  const [history, setHistory] = useState<TimeSeriesPoint[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [status, setStatus] = useState<AirQualityStatus>('GOOD');
  const zonesRef = useRef(zones);
  const historyRef = useRef(history);

  useEffect(() => {
    zonesRef.current = zones;
  }, [zones]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  useEffect(() => {
    const initialZones = generateZoneData();
    const initialHistory: TimeSeriesPoint[] = [];
    let prev: TimeSeriesPoint | undefined;
    for (let i = 0; i < HISTORY_LENGTH; i++) {
      const pt = generateTimeSeriesPoint(prev);
      initialHistory.push(pt);
      prev = pt;
    }
    setZones(initialZones);
    setHistory(initialHistory);
    setAlerts(generateAlerts(initialZones));
    setRecommendations(generateRecommendations(initialZones));
    setStatus(getOverallStatus(initialZones));

    const interval = setInterval(() => {
      const newZones = generateZoneData(zonesRef.current);
      const lastPt = historyRef.current[historyRef.current.length - 1];
      const newPt = generateTimeSeriesPoint(lastPt);

      setZones(newZones);
      setHistory(prev => [...prev.slice(-HISTORY_LENGTH + 1), newPt]);
      setAlerts(generateAlerts(newZones));
      setRecommendations(generateRecommendations(newZones));
      setStatus(getOverallStatus(newZones));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { zones, history, alerts, recommendations, status };
}
