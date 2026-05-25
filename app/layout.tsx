import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n/I18nProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'NTU AirSense — Real-time Air Quality Intelligence',
  description: 'Real-time air quality monitoring dashboard for NTU Main Library B1. Monitor CO2, temperature, humidity and study comfort — live.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans bg-[#060d1a] text-slate-100 overflow-x-hidden`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
