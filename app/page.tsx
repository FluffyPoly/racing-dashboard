import React from 'react';
import fs from 'fs';
import path from 'path';
import { Clock } from 'lucide-react';
import RaceCard from '@/components/RaceCard';

async function getRaces() {
  const dataDir = path.join(process.cwd(), 'data/predictions');
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir);
  return files.map(file => {
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
}

export default async function PaddockPage() {
  const races = await getRaces();

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase italic">Racing Intelligence</h1>
            <p className="text-gold font-medium flex items-center justify-center md:justify-start gap-2">
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
      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {races.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium italic">Awaiting race data from Auto-Pilot...</p>
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
