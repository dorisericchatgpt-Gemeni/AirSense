'use client';

import { useSensorData } from '@/hooks/use-sensor-data';
import Navbar from '@/components/airsense/Navbar';
import Hero from '@/components/airsense/Hero';
import AirMap from '@/components/airsense/AirMap';
import Dashboard from '@/components/airsense/Dashboard';
import AlertPanel, { AlertSection } from '@/components/airsense/AlertPanel';
import ComfortScores from '@/components/airsense/ComfortScores';
import LiveStats from '@/components/airsense/LiveStats';
import FutureVision from '@/components/airsense/FutureVision';
import TechArchitecture from '@/components/airsense/TechArchitecture';
import Footer from '@/components/airsense/Footer';

export default function Home() {
  const { zones, history, alerts, recommendations, status } = useSensorData();

  const avgCo2 = Math.round(zones.reduce((s, z) => s + z.co2, 0) / zones.length);
  const avgTemp = Math.round(zones.reduce((s, z) => s + z.temperature, 0) / zones.length * 10) / 10;

  return (
    <main className="min-h-screen bg-[#060d1a]">
      <Navbar status={status} />
      <AlertPanel alerts={alerts} />
      <Hero status={status} avgCo2={avgCo2} avgTemp={avgTemp} />
      <AirMap zoneData={zones} />
      <Dashboard history={history} />
      <AlertSection alerts={alerts} />
      <ComfortScores zones={zones} recommendations={recommendations} />
      <LiveStats zones={zones} />
      <FutureVision />
      <TechArchitecture />
      <Footer />
    </main>
  );
}
