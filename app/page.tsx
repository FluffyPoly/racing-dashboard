'use client';

import React, { useState } from 'react';
import { Trophy, Check, ArrowRight, ShieldCheck, Zap, Star, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const PLANS = [
  {
    name: 'Weekly Pass',
    priceId: 'price_1T8iCzIWMCL4q0q2TBCfKfcN',
    price: '£14.99',
    period: '/ week',
    desc: 'Perfect for Festival weeks like Cheltenham.',
    features: ['All UK/IRE Meetings', 'T-30m Predictions', 'Full Agent Analysis'],
    highlight: false
  },
  {
    name: 'Monthly Intel',
    priceId: 'price_1T8iD0IWMCL4q0q22ixc4wy7',
    price: '£44.99',
    period: '/ month',
    desc: 'The professional choice for daily punters.',
    features: ['Everything in Weekly', 'Priority Support', 'Full Improvement Lab access'],
    highlight: true
  },
  {
    name: 'Quarterly Edge',
    priceId: 'price_1T8iD1IWMCL4q0q2q4epQ1Rh',
    price: '£99.99',
    period: '/ quarter',
    desc: 'Save 25% over monthly subscriptions.',
    features: ['Everything in Monthly', 'Historical Data Export', 'Market Calibration Deep-Dive'],
    highlight: false
  },
  {
    name: 'Annual Legacy',
    priceId: 'price_1T8iD1IWMCL4q0q2v6IIzRab',
    price: '£299.99',
    period: '/ year',
    desc: 'The ultimate punter package.',
    features: ['Best Value', 'Exclusive Festival Intel', 'Personalized Agent Tuning'],
    highlight: false
  }
];

export default function LandingPage() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string) => {
    setLoadingId(priceId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      {/* Top Nav */}
      <nav className="absolute top-0 w-full z-50 p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="text-white font-black italic uppercase tracking-tighter text-xl flex items-center gap-2 drop-shadow-md">
          <Trophy className="text-gold" size={24} /> Horse Racing Intelligence
        </div>
        <Link href="/login" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs transition-all border border-white/20 flex items-center gap-2">
          <Lock size={14} /> Subscriber Portal
        </Link>
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

      {/* Trust Markers */}
      <section className="max-w-6xl mx-auto mt-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 relative z-20">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform -translate-y-16 hover:-translate-y-18 transition-transform">
          <ShieldCheck className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">Expert UK Horse Racing Tips</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Every prediction is proofed against official results in our data-driven Improvement Lab.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform -translate-y-12 hover:-translate-y-14 transition-transform md:-translate-y-16">
          <Zap className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">AI-Driven Racing Predictions</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Live cards processed 30 minutes before off-time for professional market alignment.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform -translate-y-8 hover:-translate-y-10 transition-transform md:-translate-y-16">
          <Trophy className="mx-auto text-gold mb-4" size={44} />
          <h3 className="font-black text-racing-green uppercase tracking-tighter italic text-xl">Cheltenham Festival Intel</h3>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed mt-3 uppercase tracking-wider">Deep learning models primed for Cheltenham, Aintree, and Royal Ascot festivals.</p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="max-w-4xl mx-auto px-6 mt-12 text-center space-y-6">
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
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-racing-green uppercase tracking-tighter italic">Professional Membership</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PLANS.map((plan) => (
            <div 
              key={plan.name} 
              className={`bg-white rounded-[2rem] p-10 shadow-xl border-2 transition-all hover:shadow-2xl flex flex-col ${
                plan.highlight ? 'border-gold ring-8 ring-gold/5 relative scale-105' : 'border-gray-50 hover:border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold text-racing-green text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl whitespace-nowrap italic">
                  Most Popular Choice
                </div>
              )}
              <h2 className="text-racing-green font-black uppercase italic tracking-tight text-2xl mb-2 mt-2">{plan.name}</h2>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-racing-green tracking-tighter">{plan.price}</span>
                <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{plan.period}</span>
              </div>
              <p className="text-gray-500 text-[13px] italic mb-8 leading-relaxed flex-grow">{plan.desc}</p>
              
              <div className="space-y-4 mb-10 border-t border-gray-50 pt-8">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 text-[11px] font-black uppercase tracking-widest text-racing-green/70">
                    <Check size={16} className="text-gold mt-[-1px] shrink-0" /> {f}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={!!loadingId}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 italic active:scale-[0.98] cursor-pointer ${
                plan.highlight 
                  ? 'bg-racing-green text-white shadow-xl shadow-racing-green/20 hover:bg-racing-green/90' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}>
                {loadingId === plan.priceId ? <Loader2 className="animate-spin" size={18} /> : <>Purchase Access <ArrowRight size={16} /></>}
              </button>
            </div>
          ))}
        </div>
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
