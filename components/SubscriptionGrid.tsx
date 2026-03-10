'use client';

import React, { useState } from 'react';
import { Check, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const PLANS = [
  {
    name: 'Festival Pass',
    priceId: 'price_festival_pass', // Note: Placeholder, would need Stripe sync
    price: '£9.99',
    period: '/ festival',
    desc: 'Full access for the 4 days of Cheltenham. High-fidelity only.',
    features: ['All 28 Festival Races', 'T-30m Deep Analytics', 'Daily Intel Recap'],
    highlight: false,
    badge: 'Limited Time'
  },
  {
    name: 'Monthly Intel',
    priceId: 'price_1T8iD0IWMCL4q0q22ixc4wy7',
    price: '£24.99',
    period: '/ month',
    desc: 'The professional choice for daily punters.',
    features: ['All UK/IRE Meetings', 'Historical Form Data', 'Value Alerts Enabled'],
    highlight: true,
    badge: 'Best Value'
  },
  {
    name: 'Annual Legacy',
    priceId: 'price_1T8iD1IWMCL4q0q2v6IIzRab',
    price: '£149.99',
    period: '/ year',
    desc: 'The ultimate season-long intelligence package.',
    features: ['Everything in Monthly', 'Exclusive Festival Intel', 'Priority Agent Support'],
    highlight: false
  }
];

export default function SubscriptionGrid() {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {PLANS.map((plan) => (
        <div 
          key={plan.name} 
          className={`bg-white rounded-[2rem] p-10 shadow-xl border-2 transition-all hover:shadow-2xl flex flex-col ${
            plan.highlight ? 'border-gold ring-8 ring-gold/5 relative scale-105 z-10' : 'border-gray-50 hover:border-gray-200'
          }`}
        >
          {plan.badge && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold text-racing-green text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-xl whitespace-nowrap italic flex items-center gap-2">
              <Sparkles size={12} /> {plan.badge}
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
  );
}
