import React from 'react';
import fs from 'fs';
import path from 'path';
import { BrainCircuit, Target, ArrowDownUp, ShieldCheck } from 'lucide-react';

async function getLearnings() {
  const dataDir = path.join(process.cwd(), 'data/learnings');
  if (!fs.existsSync(dataDir)) return [];
  const files = fs.readdirSync(dataDir);
  return files.map(file => {
    const filePath = path.join(dataDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  });
}

export default async function LearningsPage() {
  const learnings = await getLearnings();

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Header */}
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl">
        <div className="max-w-6xl mx-auto flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase italic">Improvement Lab</h1>
            <p className="text-gold font-medium flex items-center gap-2 uppercase tracking-widest text-xs">
              Autonomous Knowledge Base • Permanent Calibration
            </p>
          </div>
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest pb-1">
            <a href="/" className="text-white/70 hover:text-gold transition-colors">Dashboard</a>
            <a href="/learnings" className="border-b-2 border-gold pb-1 text-gold">Improvement Lab</a>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 mt-12 space-y-8">
        {learnings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <BrainCircuit className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-medium italic">Calibration pending first results...</p>
          </div>
        ) : (
          learnings.map((learn: any) => (
            <div key={learn.race_id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Race Header */}
              <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-black text-racing-green uppercase italic tracking-tight">
                  {learn.race_id.replace(/_/g, ' ')}
                </h3>
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  <Target size={12} /> Winner: {learn.results.winner}
                </div>
              </div>

              {/* Agent Insights */}
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-racing-green/40 uppercase tracking-widest">
                    <ShieldCheck size={14} /> Ruby (Probabilistic)
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-racing-green/10 pl-4">
                    "{learn.insights.ruby}"
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-racing-green/40 uppercase tracking-widest">
                    <ArrowDownUp size={14} /> Keenan (Order)
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-racing-green/10 pl-4">
                    "{learn.insights.keenan}"
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-racing-green/40 uppercase tracking-widest">
                    <Zap size={14} /> Mordin (Market)
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-racing-green/10 pl-4">
                    "{learn.insights.mordin}"
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
