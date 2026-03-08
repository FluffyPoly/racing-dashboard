'use client';

import React from 'react';
import { Trophy, Check, ArrowRight, ShieldCheck, Zap, Star, Lock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const PLANS = [
  {
    name: 'Weekly Pass',
    price: '£14.99',
    period: '/ week',
    desc: 'Perfect for Festival weeks like Cheltenham.',
    features: ['All UK/IRE Meetings', 'T-30m Predictions', 'Full Agent Analysis'],
    highlight: false
  },
  {
    name: 'Monthly Intel',
    price: '£44.99',
    period: '/ month',
    desc: 'The professional choice for daily punters.',
    features: ['Everything in Weekly', 'Priority Support', 'Full Improvement Lab access'],
    highlight: true
  },
  {
    name: 'Quarterly Edge',
    price: '£99.99',
    period: '/ quarter',
    desc: 'Save 25% over monthly subscriptions.',
    features: ['Everything in Monthly', 'Historical Data Export', 'Market Calibration Deep-Dive'],
    highlight: false
  },
  {
    name: 'Annual Legacy',
    price: '£299.99',
    period: '/ year',
    desc: 'The ultimate punter package.',
    features: ['Best Value', 'Exclusive Festival Intel', 'Personalized Agent Tuning'],
    highlight: false
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Top Nav */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="text-white font-black italic uppercase tracking-tighter text-xl flex items-center gap-2 drop-shadow-md">
          <Trophy className="text-gold" size={24} /> Racing Intelligence
        </div>
        <Link href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all border border-white/20 flex items-center gap-2">
          <Lock size={14} /> Subscriber Portal
        </Link>
      </nav>

      {/* Visual Hero */}
      <section className="relative h-[60vh] bg-racing-green overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=2000" 
            alt="UK Horse Racing" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-racing-green/60 via-transparent to-[#fcfcfc]"></div>
        </div>
        <div className="relative z-10 space-y-6 mt-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-gold/30 backdrop-blur-sm shadow-xl">
            <Star size={14} fill="currentColor" /> Premium UK/IRE Analytics
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-none drop-shadow-2xl">
            Unlock the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Intelligence.</span>
          </h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto font-medium italic drop-shadow-md">
            Institutional-grade automated racing models. Predicted, Calibrated, and Verified. 
            A clear edge for serious punters.
          </p>
        </div>
      </section>

      {/* Trust Markers */}
      <section className="max-w-5xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 relative z-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -translate-y-12">
          <ShieldCheck className="mx-auto text-gold mb-4" size={36} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-lg">Verified Logic</h3>
          <p className="text-xs text-gray-500 font-bold leading-relaxed mt-2">Every prediction is proofed against official results in our Improvement Lab.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -translate-y-8 md:-translate-y-12">
          <Zap className="mx-auto text-gold mb-4" size={36} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-lg">T-30m Advantage</h3>
          <p className="text-xs text-gray-500 font-bold leading-relaxed mt-2">Live cards processed 30 minutes before off-time for maximum market alignment.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transform -translate-y-4 md:-translate-y-12">
          <Trophy className="mx-auto text-gold mb-4" size={36} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-lg">Festival Ready</h3>
          <p className="text-xs text-gray-500 font-bold leading-relaxed mt-2">Deep learning models primed for Cheltenham, Aintree, and Royal Ascot.</p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 mt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-racing-green uppercase tracking-tighter italic">Choose Your Plan</h2>
          <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mt-2">Secure checkout via Stripe</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-[1.02] flex flex-col ${
                plan.highlight ? 'border-gold ring-4 ring-gold/10 relative' : 'border-gray-100'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-racing-green text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <h2 className="text-racing-green font-black uppercase italic tracking-tight text-xl mb-1 mt-2">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-black text-racing-green">{plan.price}</span>
                <span className="text-gray-400 font-bold uppercase text-[10px]">{plan.period}</span>
              </div>
              <p className="text-gray-500 text-xs italic mb-6 leading-relaxed flex-grow">{plan.desc}</p>
              
              <div className="space-y-3 mb-8 border-t border-gray-50 pt-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <Link href="/login" className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2 italic active:scale-[0.98] ${
                plan.highlight 
                  ? 'bg-racing-green text-white shadow-lg shadow-racing-green/20 hover:bg-racing-green/90' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                Subscribe Now <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-20 border-t border-gray-200 pt-8 pb-12 text-center px-6">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-4">
          Professional Analytical Intelligence • Strictly 18+
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Link href="/legal" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-colors">
            Legal & Risk Disclaimer
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">
            Capital at Risk
          </span>
        </div>
      </footer>
    </main>
  );
}
