import React from 'react';
import { BookOpen, Target, ShieldCheck, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RulesAndRegulations() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      <header className="bg-racing-green text-white py-16 px-6 shadow-xl border-b-4 border-gold text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <BookOpen className="mx-auto text-gold mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic drop-shadow-md">
            Rules & Regulations
          </h1>
          <p className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
            Operational Standards & Intelligence Lifecycle
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 space-y-12 text-gray-700">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Zap className="text-gold" size={24} /> 1. Intelligence Delivery (T-30m)
            </h2>
            <p className="leading-relaxed">
              Official Intelligence Reports are generated and delivered approximately **30 minutes prior to the scheduled post-time** of each UK and Irish race. This window is designed to provide maximum market alignment while ensuring sufficient time for analysis. 
            </p>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
              *Late market movements or non-runners after the T-30m mark may not be reflected in the initial automated report.*
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Target className="text-gold" size={24} /> 2. The Analytical Chain
            </h2>
            <p className="leading-relaxed font-medium italic border-l-4 border-gold pl-4">
              Our service operates on a multi-agent validation chain:
            </p>
            <ul className="space-y-3 list-disc pl-6 text-[11px] font-black uppercase tracking-widest text-racing-green/80">
              <li><span className="text-gold">CECIL:</span> Official Data Gathering & Fact Verification.</li>
              <li><span className="text-gold">RUBY:</span> Probabilistic Win/Place Modeling.</li>
              <li><span className="text-gold">KEENAN:</span> Combinatorial Forecast & Tricast Distributions.</li>
              <li><span className="text-gold">MORDIN:</span> Market Calibration & Value Divergence Detection.</li>
              <li><span className="text-gold">PERSAD:</span> Final Narrative Reporting & Subscriber Delivery.</li>
            </ul>
          </div>

          <div className="space-y-4 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <ShieldCheck className="text-gold" size={24} /> 3. Integrity & Responsible Use
            </h2>
            <p className="leading-relaxed">
              Subscribers are prohibited from redistributing, reselling, or sharing the Intelligence Reports. Our proprietary models are protected. Any detected systematic scraping or sharing of the dashboard will result in permanent account suspension without refund.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <BookOpen className="text-gold" size={24} /> 4. "No Refund" Enforcement
            </h2>
            <p className="leading-relaxed">
              In accordance with our Terms & Conditions, all subscription sales are final. We do not provide refunds for races that are cancelled due to weather, or for any perceived &quot;incorrect&quot; outcomes of our predictions. Our service provides **Intelligence**—not guaranteed financial returns.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 text-center space-y-6">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Last Updated: March 2026 • Professional Rules of Operation
            </p>
            <Link href="/" className="inline-flex items-center gap-2 bg-racing-green text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gold hover:text-racing-green transition-all italic">
              <ArrowLeft size={16} /> Return to Intelligence
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
