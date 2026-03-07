import React from 'react';
import fs from 'fs';
import path from 'path';
import { Trophy, Zap, BarChart3, BrainCircuit, Clock, ChevronRight } from 'lucide-react';

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
        <div className="max-w-6xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase italic">Racing Intelligence</h1>
            <p className="text-gold font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE PADDOCK • AUTOMATED ANALYTICS
            </p>
          </div>
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest pb-1">
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
            <div key={race.race_id} className="racing-card p-6 rounded-r-xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-racing-green italic leading-tight uppercase">
                    {race.meta.track}
                  </h3>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">
                    {race.meta.time} • {race.meta.race_name}
                  </p>
                </div>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">
                  {race.meta.class}
                </span>
              </div>

              <div className="space-y-4">
                {race.analysis.ruby.rankings.slice(0, 3).map((horse: any, idx: number) => (
                  <div key={horse.name} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0 ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-sm text-gray-800">{horse.name}</span>
                        <span className="text-xs font-black text-racing-green italic">
                          {Math.round(horse.win_probability * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-gray-100 mt-1 overflow-hidden rounded-full">
                        <div 
                          className={`h-full ${idx === 0 ? 'bg-gold' : 'bg-racing-green/40'}`} 
                          style={{ width: `${horse.win_probability * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <div className="flex gap-2">
                  <span title="Probability Depth" className="text-gray-300 hover:text-gold cursor-help transition-colors">
                    <BarChart3 size={16} />
                  </span>
                  <span title="Market Calibrated" className="text-gray-300 hover:text-gold cursor-help transition-colors">
                    <Zap size={16} />
                  </span>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-black uppercase text-gold tracking-widest hover:translate-x-1 transition-transform">
                  Full Intel <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
