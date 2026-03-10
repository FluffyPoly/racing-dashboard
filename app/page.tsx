import React from 'react';
import { Trophy, Check, ArrowRight, ShieldCheck, Zap, Star, Lock, TrendingUp, Target, Percent } from 'lucide-react';
import Link from 'next/link';
import { getPerformanceStats } from '@/lib/stats';
import SubscriptionGrid from '@/components/SubscriptionGrid';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const { totalAnalyzed, totalWins, totalTop2, winRate, top2Rate } = await getPerformanceStats();

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      {/* Top Nav */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="text-white font-black italic uppercase tracking-tighter text-xl flex items-center gap-2 drop-shadow-md">
          <Trophy className="text-gold" size={24} /> Horse Racing Intelligence
        </div>
        <div className="flex items-center gap-6">
          <Link href="/performance" className="text-white/80 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-colors">
            Performance
          </Link>
          <Link href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all border border-white/20 flex items-center gap-2">
            <Lock size={14} /> Subscriber Portal
          </Link>
        </div>
      </nav>

      {/* Visual Hero */}
      <section className="relative h-[65vh] bg-racing-green overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/12950515/pexels-photo-12950515.jpeg?auto=compress&cs=tinysrgb&w=2000" 
            alt="Horse Racing Intelligence" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-racing-green/60 via-transparent to-[#fcfcfc]"></div>
        </div>
        <div className="relative z-10 space-y-6 mt-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-gold/30 backdrop-blur-sm shadow-xl">
            <Star size={12} fill="currentColor" /> Institutional Grade UK & IRE Analytics
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-2xl">
            Unlock the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-200">Intelligence.</span>
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto font-medium italic drop-shadow-md">
            The world&apos;s most disciplined automated racing models. <br />
            Predicted, Calibrated, and Verified.
          </p>
        </div>
      </section>

      {/* Live Performance Stats */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-30">
        <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-gold/20 p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Trophy size={160} />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-racing-green text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> Live Performance
              </div>
              <h2 className="text-3xl font-black text-racing-green uppercase italic tracking-tighter">Verified Intelligence.</h2>
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-4">Agent performance proofed against official results in real-time.</p>
              <Link href="/performance" className="inline-flex items-center gap-2 text-gold font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-transform group">
                View Full Audit <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-racing-green shadow-inner">
                <TrendingUp size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Races Analyzed</p>
              <p className="text-4xl font-black text-racing-green italic">{totalAnalyzed}</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold shadow-inner border border-gold/5">
                <Trophy size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top Pick Wins</p>
              <p className="text-4xl font-black text-racing-green italic">{totalWins} <span className="text-sm text-gray-300">({winRate}%)</span></p>
            </div>

            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                <Target size={28} />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Top 2 Accuracy</p>
              <p className="text-4xl font-black text-racing-green italic">{totalTop2} <span className="text-sm text-gray-300">({top2Rate}%)</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 relative z-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
          <ShieldCheck className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">Expert UK Horse Racing Tips</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Every prediction is proofed against official results in our data-driven Improvement Lab.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
          <Zap className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">AI-Driven Racing Predictions</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Live cards processed 30 minutes before off-time for professional market alignment.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
          <Trophy className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">Cheltenham Festival Intel</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Deep learning models primed for Cheltenham, Aintree, and Royal Ascot festivals.</p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20 text-center space-y-6">
        <h2 className="text-2xl font-black text-racing-green uppercase italic tracking-tighter">Professional Horse Racing Analytics & Daily Tips</h2>
        <p className="text-sm text-gray-600 leading-relaxed font-medium italic">
          Welcome to the premier source for <span className="text-racing-green font-bold">UK and Ireland horse racing intelligence</span>. 
          Our automated analytical engine provides <span className="text-racing-green font-bold">data-driven predictions</span>, market calibration, 
          and <span className="text-racing-green font-bold">expert racing tips</span> for every meeting. Whether you are looking for the 
          <span className="text-racing-green font-bold">NAP of the day</span>, <span className="text-racing-green font-bold">Lucky 15 combinations</span>, 
          or deep festival analysis, our AI agents deliver the edge you need.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-racing-green uppercase tracking-tighter italic">Professional Membership</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <SubscriptionGrid />
      </section>

      {/* Compliance / Footer */}
      <footer className="mt-32 border-t border-gray-100 pt-16 pb-20 text-center px-6 bg-gray-50/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center gap-8 opacity-30 grayscale contrast-200">
             {/* Imagine logos here */}
          </div>
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Professional Analytical Intelligence • Strictly 18+ Only
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <Link href="/legal" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Risk Disclaimer
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <Link href="/terms" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Terms & Conditions
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <Link href="/privacy" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Privacy Policy
            </Link>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <Link href="/rules" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Rules & Regulations
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-[10px] text-red-500/70 font-black uppercase tracking-widest">
              Strictly No Refunds • Capital at Risk
            </span>
          </div>
          <div className="pt-8 text-[10px] text-gray-300 font-medium italic">
            Developed by industrial agents Cecil, Ruby, Keenan, Mordin, and Persad.
          </div>
        </div>
      </footer>
    </main>
  );
}
