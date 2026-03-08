'use client';

import React from 'react';
import { Trophy, Check, ArrowRight, ShieldCheck, Zap, Star } from 'lucide-react';

const PLANS = [
  {
    name: 'Weekly Pass',
    price: '£14.99',
    period: '/ week',
    desc: 'Perfect for Festival weeks.',
    features: ['All UK/IRE Meetings', 'T-30m Predictions', 'Full Agent Analysis'],
    highlight: false
  },
  {
    name: 'Monthly Intel',
    price: '£44.99',
    period: '/ month',
    desc: 'The professional choice.',
    features: ['Everything in Weekly', 'Priority Support', 'Full Improvement Lab access'],
    highlight: true
  },
  {
    name: 'Quarterly Edge',
    price: '£99.99',
    period: '/ quarter',
    desc: 'Save 25% over monthly.',
    features: ['Everything in Monthly', 'Historical Data Export', 'Market Calibration Deep-Dive'],
    highlight: false
  },
  {
    name: 'Annual Legacy',
    price: '£299.99',
    period: '/ year',
    desc: 'The ultimate punter package.',
    features: ['Best Value', 'Exclusive Cheltenham Intel', 'Personalized Agent Tuning'],
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Visual Hero */}
      <section className="relative h-[40vh] bg-racing-green overflow-hidden flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1534493872551-856c2bb2279f?auto=format&fit=crop&q=80&w=2000" 
            alt="UK Racing" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-gold/30">
            <Star size={14} fill="currentColor" /> Premium Access
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter leading-none">
            Unlock the <br /> <span className="text-gold">Intelligence.</span>
          </h1>
          <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto font-medium italic">
            Institutional-grade UK & Ireland racing models. Predicted, Calibrated, and Verified.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-3xl p-8 shadow-xl border-2 transition-all hover:scale-[1.02] ${
                plan.highlight ? 'border-gold ring-4 ring-gold/10' : 'border-gray-100'
              }`}
            >
              {plan.highlight && (
                <div className="bg-gold text-racing-green text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter mb-4 inline-block">
                  Most Popular
                </div>
              )}
              <h2 className="text-racing-green font-black uppercase italic tracking-tight text-lg mb-1">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black text-racing-green">{plan.price}</span>
                <span className="text-gray-400 font-bold uppercase text-[10px]">{plan.period}</span>
              </div>
              <p className="text-gray-500 text-xs italic mb-6 leading-relaxed">{plan.desc}</p>
              
              <div className="space-y-3 mb-8 border-t border-gray-50 pt-6">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-2 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                    <Check size={14} className="text-gold mt-0.5 shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 italic active:scale-[0.98] ${
                plan.highlight 
                  ? 'bg-racing-green text-white shadow-lg shadow-racing-green/20 hover:bg-racing-green/90' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
                Secure My Edge <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Markers */}
      <section className="max-w-4xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-6">
        <div className="space-y-2">
          <ShieldCheck className="mx-auto text-gold" size={32} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic">Verified Logic</h3>
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Every prediction is proofed against official results.</p>
        </div>
        <div className="space-y-2">
          <Zap className="mx-auto text-gold" size={32} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic">T-30m Advantage</h3>
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Live cards processed 30 minutes before off-time.</p>
        </div>
        <div className="space-y-2">
          <Trophy className="mx-auto text-gold" size={32} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic">Festival Ready</h3>
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase">Deep models for Cheltenham, Aintree, and Ascot.</p>
        </div>
      </section>
    </main>
  );
}
