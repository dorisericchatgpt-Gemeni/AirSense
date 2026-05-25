export type Locale =
  | 'en'
  | 'zh-TW'
  | 'zh-CN'
  | 'ja'
  | 'de'
  | 'es'
  | 'pt'
  | 'nl'
  | 'ru'
  | 'ar';

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
  { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const RTL_LOCALES: Locale[] = ['ar'];

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  navbar: {
    airMap: string;
    dashboard: string;
    comfort: string;
    vision: string;
    live: string;
    airQuality: string;
    toggleMenu: string;
  };
  hero: {
    badge: string;
    subtitleLine1: string;
    subtitleLine2: string;
    airQuality: string;
    viewAirMap: string;
    liveDashboard: string;
    stats: {
      activeSensors: string;
      studyZones: string;
      avgComfort: string;
      updateRate: string;
    };
    explore: string;
  };
  status: {
    GOOD: string;
    MODERATE: string;
    BAD: string;
  };
  airMap: {
    badge: string;
    title: string;
    subtitle: string;
    legendFresh: string;
    legendModerate: string;
    legendPoor: string;
    floorPlanAlt: string;
    viewZoneAria: string;
    co2: string;
    temp: string;
    humidity: string;
    crowd: string;
    airQualityScore: string;
    score: {
      FRESH: string;
      MODERATE: string;
      POOR: string;
    };
    zoneLabels: {
      'a-area': string;
      'b-area': string;
      conference: string;
      discussion: string;
      restroom: string;
    };
    zoneNames: {
      'a-area': string;
      'b-area': string;
      discussion: string;
      conference: string;
      restroom: string;
    };
  };
  dashboard: {
    badge: string;
    title: string;
    subtitle: string;
    live: string;
    co2Title: string;
    co2Warning: string;
    co2Critical: string;
    tempTitle: string;
    humidityTitle: string;
    occupancyTitle: string;
    co2Name: string;
    tempName: string;
    humidityName: string;
    occupancyName: string;
  };
  alerts: {
    sectionTitle: string;
    allNormal: string;
    types: {
      critical: string;
      warning: string;
      info: string;
    };
    messages: {
      criticalCo2: string;
      elevatedCo2: string;
      poorVentilation: string;
    };
  };
  comfort: {
    badge: string;
    title: string;
    subtitle: string;
    focusScore: string;
    comfortScore: string;
    freshnessScore: string;
    focus: string;
    comfort: string;
    freshness: string;
    optimal: string;
    moderate: string;
    poor: string;
    recommendationsTitle: string;
    updatedLive: string;
    recommendations: {
      bestStudy: string;
      crowdedConsider: string;
      aHigherThanB: string;
      restroomVentilation: string;
      avgRising: string;
      stable: string;
    };
  };
  liveStats: {
    badge: string;
    title: string;
    subtitle: string;
    avgCo2: string;
    libraryAverage: string;
    bestStudyZone: string;
    mostCrowded: string;
    ventilationEff: string;
    freshnessIndex: string;
    activeSensors: string;
    allZonesOnline: string;
    sensorStatusGrid: string;
    online: string;
    offline: string;
  };
  vision: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      hvac: { title: string; description: string };
      iot: { title: string; description: string };
      campus: { title: string; description: string };
      energy: { title: string; description: string };
      cognitive: { title: string; description: string };
      carbon: { title: string; description: string };
    };
    roadmapTitle: string;
    phases: {
      p1: { phase: string; label: string; desc: string };
      p2: { phase: string; label: string; desc: string };
      p3: { phase: string; label: string; desc: string };
      p4: { phase: string; label: string; desc: string };
    };
  };
  tech: {
    badge: string;
    title: string;
    subtitle: string;
    nodes: {
      sensors: { label: string; sublabel: string };
      gateway: { label: string; sublabel: string };
      database: { label: string; sublabel: string };
      analytics: { label: string; sublabel: string };
      dashboard: { label: string; sublabel: string };
    };
    stack: {
      frontend: string;
      backend: string;
      iot: string;
      aiml: string;
    };
  };
  footer: {
    brandDescription: string;
    builtFor: string;
    projectHeading: string;
    connectHeading: string;
    links: {
      beyondBorders: string;
      prototype: string;
      paper: string;
      api: string;
    };
    githubRepo: string;
    copyright: string;
    dataSimulated: string;
    allSystemsOperational: string;
    prototypeBox: {
      title: string;
      line1: string;
      line2: string;
    };
  };
  language: {
    selectLabel: string;
  };
}
