export type ZoneId = 'a-area' | 'b-area' | 'discussion' | 'conference' | 'restroom';

export interface ZoneData {
  id: ZoneId;
  name: string;
  co2: number;
  temperature: number;
  humidity: number;
  crowdDensity: number; // 0-100
  airQualityScore: number; // 0-100
  comfortScore: number;
  freshness: number;
  focusScore: number;
}

export interface TimeSeriesPoint {
  time: string;
  co2: number;
  temperature: number;
  humidity: number;
  occupancy: number;
}

export type AirQualityStatus = 'GOOD' | 'MODERATE' | 'BAD';

export interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  zone: string;
  message: string;
  timestamp: Date;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function jitter(base: number, range: number) {
  return base + (Math.random() - 0.5) * 2 * range;
}

export function generateZoneData(prev?: ZoneData[]): ZoneData[] {
  const defaults: Omit<ZoneData, 'airQualityScore' | 'comfortScore' | 'freshness' | 'focusScore'>[] = [
    { id: 'a-area', name: 'A Area (24hr Study)', co2: 950, temperature: 24, humidity: 58, crowdDensity: 80 },
    { id: 'b-area', name: 'B Area', co2: 680, temperature: 23, humidity: 52, crowdDensity: 45 },
    { id: 'discussion', name: 'Discussion Area', co2: 820, temperature: 25, humidity: 60, crowdDensity: 60 },
    { id: 'conference', name: 'International Conference Hall', co2: 740, temperature: 22, humidity: 50, crowdDensity: 30 },
    { id: 'restroom', name: 'Restroom Area', co2: 1100, temperature: 26, humidity: 72, crowdDensity: 15 },
  ];

  return defaults.map((d, i) => {
    const prevZone = prev?.[i];
    const co2 = clamp(jitter(prevZone?.co2 ?? d.co2, 25), 400, 1500);
    const temperature = clamp(jitter(prevZone?.temperature ?? d.temperature, 0.3), 18, 32);
    const humidity = clamp(jitter(prevZone?.humidity ?? d.humidity, 1.5), 30, 95);
    const crowdDensity = clamp(jitter(prevZone?.crowdDensity ?? d.crowdDensity, 3), 0, 100);

    // co2 score: 400=100, 1200=0
    const co2Score = clamp(100 - ((co2 - 400) / 800) * 100, 0, 100);
    // temp score: 22 ideal
    const tempScore = clamp(100 - Math.abs(temperature - 22) * 8, 0, 100);
    // humidity score: 50 ideal
    const humScore = clamp(100 - Math.abs(humidity - 50) * 1.5, 0, 100);
    // crowd score
    const crowdScore = clamp(100 - crowdDensity, 0, 100);

    const airQualityScore = Math.round((co2Score * 0.5 + humScore * 0.3 + tempScore * 0.2));
    const comfortScore = Math.round((tempScore * 0.4 + humScore * 0.3 + crowdScore * 0.3));
    const freshness = Math.round(co2Score * 0.7 + humScore * 0.3);
    const focusScore = Math.round((co2Score * 0.4 + comfortScore * 0.4 + crowdScore * 0.2));

    return {
      id: d.id,
      name: d.name,
      co2: Math.round(co2),
      temperature: Math.round(temperature * 10) / 10,
      humidity: Math.round(humidity),
      crowdDensity: Math.round(crowdDensity),
      airQualityScore,
      comfortScore,
      freshness,
      focusScore,
    };
  });
}

export function generateTimeSeriesPoint(prev?: TimeSeriesPoint): TimeSeriesPoint {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  return {
    time: timeStr,
    co2: Math.round(clamp(jitter(prev?.co2 ?? 820, 20), 400, 1500)),
    temperature: Math.round(clamp(jitter(prev?.temperature ?? 23.5, 0.2), 18, 32) * 10) / 10,
    humidity: Math.round(clamp(jitter(prev?.humidity ?? 55, 1), 30, 95)),
    occupancy: Math.round(clamp(jitter(prev?.occupancy ?? 60, 3), 0, 100)),
  };
}

export function getOverallStatus(zones: ZoneData[]): AirQualityStatus {
  const avgAQ = zones.reduce((s, z) => s + z.airQualityScore, 0) / zones.length;
  if (avgAQ >= 65) return 'GOOD';
  if (avgAQ >= 40) return 'MODERATE';
  return 'BAD';
}

export function generateAlerts(zones: ZoneData[]): Alert[] {
  const alerts: Alert[] = [];
  zones.forEach(zone => {
    if (zone.co2 > 1200) {
      alerts.push({
        id: `${zone.id}-critical`,
        type: 'critical',
        zone: zone.name,
        message: `Critical CO2 level: ${zone.co2} ppm`,
        timestamp: new Date(),
      });
    } else if (zone.co2 > 800) {
      alerts.push({
        id: `${zone.id}-warning`,
        type: 'warning',
        zone: zone.name,
        message: `Elevated CO2: ${zone.co2} ppm`,
        timestamp: new Date(),
      });
    }
    if (zone.id === 'restroom' && zone.airQualityScore < 40) {
      alerts.push({
        id: 'restroom-ventilation',
        type: 'warning',
        zone: zone.name,
        message: 'Poor ventilation detected. Recommend immediate ventilation.',
        timestamp: new Date(),
      });
    }
  });
  return alerts;
}

export function generateRecommendations(zones: ZoneData[]): string[] {
  const recs: string[] = [];
  const sorted = [...zones].sort((a, b) => b.comfortScore - a.comfortScore);
  const best = sorted[0];
  const crowded = zones.filter(z => z.crowdDensity > 75);

  recs.push(`Best study environment: ${best.name} (Comfort ${best.comfortScore}%)`);
  if (crowded.length > 0) {
    recs.push(`${crowded[0].name} is crowded. Consider ${sorted[0].name}.`);
  }
  const aArea = zones.find(z => z.id === 'a-area');
  const bArea = zones.find(z => z.id === 'b-area');
  if (aArea && bArea && aArea.co2 > bArea.co2 + 100) {
    recs.push(`A Area CO2 higher than B Area. B Area has better ventilation.`);
  }
  const restroom = zones.find(z => z.id === 'restroom');
  if (restroom && restroom.co2 > 900) {
    recs.push(`Ventilation efficiency decreasing near Restroom Area.`);
  }
  const avgCo2 = zones.reduce((s, z) => s + z.co2, 0) / zones.length;
  if (avgCo2 > 900) {
    recs.push(`Average CO2 rising. Opening windows recommended.`);
  } else {
    recs.push(`Air quality stable. Good conditions for focused study.`);
  }
  return recs.slice(0, 4);
}
