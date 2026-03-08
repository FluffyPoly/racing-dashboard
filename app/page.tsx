import React from 'react';
import fs from 'fs';
import path from 'path';
import { Clock } from 'lucide-react';
import RaceCard from '@/components/RaceCard';

async function getRaces() {
  const dataDir = path.join(process.cwd(), 'data/predictions');
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir);
  const races = files.map(file => {
    try {
      const filePath = path.join(dataDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      if (!content.trim()) return null;
      return JSON.parse(content);
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
      return null;
    }
  }).filter(race => race !== null);

  // SORTING LOGIC: Next race first
  // We sort by HH:MM time string chronologically
  return races.sort((a: any, b: any) => {
    const timeA = a.meta.time || "00:00";
    const timeB = b.meta.time || "00:00";
    return timeA.localeCompare(timeB);
  });
}

export default async function PaddockPage() {
  const races = await getRaces();

  return (
    <main className="min-h-screen pb-20 bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl border-b-4 border-gold">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Racing Intelligence</h1>
            <p className="text-gold font-bold flex items-center justify-center md:justify-start gap-2 tracking-widest text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE PADDOCK • AUTOMATED ANALYTICS
            </p>
          </div>
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="/" className="border-b-2 border-gold pb-1 text-gold">Dashboard</a>
            <a href="/learnings" className="text-white/70 hover:text-gold transition-colors">Improvement Lab</a>
          </nav>
        </div>
      </header>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {races.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Clock className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-bold italic tracking-tight">Awaiting upcoming race data...</p>
          </div>
        ) : (
          races.map((race: any) => (
            <RaceCard key={race.race_id} race={race} />
          ))
        )}
      </section>
    </main>
  );
}
