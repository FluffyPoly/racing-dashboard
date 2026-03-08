import React from 'react';
import { Trophy, Check, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-racing-green flex items-center justify-center p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Value Prop */}
        <div className="text-white space-y-6">
          <div className="w-12 h-12 bg-gold rounded-xl flex items-center justify-center shadow-lg">
            <Trophy className="text-racing-green" />
          </div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
            Unlock the <br /> <span className="text-gold">Intelligence.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Gain exclusive access to the world's most disciplined racing models. Automated analysis, real-time distributions, and permanent agent learning.
          </p>
          <div className="space-y-3 pt-4">
            {['All UK & Ireland Meetings', 'Keenan finishing order models', 'Mordin market calibration', 'Daily agent improvement logs'].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-gold/80">
                <Check size={16} className="text-gold" /> {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-gold relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold text-racing-green text-[10px] font-black px-4 py-1 uppercase tracking-widest italic rounded-bl-xl">
            Premium Access
          </div>
          
          <div className="mb-8">
            <h2 className="text-racing-green font-black uppercase italic tracking-tight text-xl mb-1">Intel Monthly</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-racing-green">£49</span>
              <span className="text-gray-400 font-bold uppercase text-xs">/ month</span>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-gray-500 text-sm italic">Full access to the Live Paddock and Improvement Lab analytical feeds.</p>
            
            {/* This will eventually link to your Stripe Checkout Session */}
            <button className="w-full bg-racing-green hover:bg-racing-green/90 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group italic active:scale-[0.98]">
              Upgrade to Premium <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-[10px] text-gray-400 text-center uppercase font-bold tracking-tighter">
              Secure checkout via Stripe • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
