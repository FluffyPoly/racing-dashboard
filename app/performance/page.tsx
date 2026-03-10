import React from 'react';
import { Trophy, TrendingUp, Target, Percent, ArrowLeft, ShieldCheck, BarChart3, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { getPerformanceStats } from '@/lib/stats';

export const dynamic = 'force-dynamic';

export default async function PerformancePage() {
  const { totalAnalyzed, totalWins, totalTop2, winRate, top2Rate, roi, recentWinners } = await getPerformanceStats();

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans text-slate-900">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-gray-100">
        <Link href="/" className="text-racing-green font-black italic uppercase tracking-tighter text-xl flex items-center gap-2">
          <Trophy className="text-gold" size={24} /> Horse Racing Intelligence
        </Link>
        <Link href="/" className="text-gray-400 hover:text-racing-green transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-widest">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="bg-racing-green text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img 
            src="https://images.pexels.com/photos/12950515/pexels-photo-12950515.jpeg?auto=compress&cs=tinysrgb&w=2000" 
            alt="Performance" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Verified <span className="text-gold">Performance.</span>
          </h1>
          <p className="text-white/70 text-lg font-medium italic max-w-2xl mx-auto uppercase tracking-wide">
            Real-time strike rates and automated proofing against official results.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-racing-green/5 rounded-2xl flex items-center justify-center text-racing-green">
              <BarChart3 size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Races Analyzed</p>
            <p className="text-4xl font-black text-racing-green italic">{totalAnalyzed}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold">
              <Trophy size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Win Strike Rate</p>
            <p className="text-4xl font-black text-racing-green italic">{winRate}%</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Target size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top 2 Accuracy</p>
            <p className="text-4xl font-black text-racing-green italic">{top2Rate}%</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center text-center space-y-2">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${roi >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              <TrendingUp size={24} />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Est. ROI</p>
            <p className={`text-4xl font-black italic ${roi >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {roi > 0 ? '+' : ''}{roi}%
            </p>
          </div>
        </div>
      </section>

      {/* Recent Winners Table */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gray-100"></div>
          <h2 className="text-2xl font-black text-racing-green uppercase tracking-tighter italic px-6">
            Recent Intelligence Successes
          </h2>
          <div className="h-px flex-1 bg-gray-100"></div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date / Time</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Racecourse</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Winning Horse</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Model Odds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentWinners.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic">
                    Historical data is being compiled by agents...
                  </td>
                </tr>
              ) : (
                recentWinners.map((winner, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-white transition-colors">
                          <Calendar size={14} />
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-racing-green">{new Date(winner.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</p>
                          <p className="text-[10px] font-bold text-gray-400">{winner.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-[11px] font-black text-racing-green uppercase tracking-tight">{winner.track}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                          <ShieldCheck size={16} />
                        </div>
                        <p className="text-sm font-bold text-gray-800">{winner.horse}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <p className="text-sm font-black text-racing-green italic">{winner.odds.toFixed(2)}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center space-y-8">
        <div className="p-10 bg-white rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
          <h2 className="text-2xl font-black text-racing-green uppercase italic tracking-tighter">Our Methodology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Verified Proofing</p>
              <p className="text-[12px] text-gray-500 leading-relaxed font-medium italic">
                Every prediction is timestamped and cryptographically locked 30 minutes before the scheduled off-time. We do not retro-fit data.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] font-black text-gold uppercase tracking-[0.2em]">Level Stakes ROI</p>
              <p className="text-[12px] text-gray-500 leading-relaxed font-medium italic">
                Return on Investment is calculated based on a theoretical £1 flat stake on our top-rated selection for every race analyzed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-32 border-t border-gray-100 pt-16 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Professional Analytical Intelligence • Strictly 18+ Only
          </p>
          <div className="pt-8 text-[10px] text-gray-300 font-medium italic pb-20">
            Developed by industrial agents Cecil, Ruby, Keenan, Mordin, and Persad.
          </div>
        </div>
      </footer>
    </main>
  );
}
