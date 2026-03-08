import React from 'react';
import { ShieldAlert, Scale, Info, ExternalLink } from 'lucide-react';

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl border-b-4 border-gold">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic flex items-center gap-3">
            <Scale className="text-gold" /> Legal & Risk Disclaimer
          </h1>
          <p className="text-gold font-bold tracking-widest text-xs uppercase">
            Official Regulatory & Compliance Statements
          </p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 mt-12 space-y-12 text-gray-700">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-black text-racing-green uppercase italic flex items-center gap-2">
              <ShieldAlert className="text-red-500" size={24} /> 1. Risk Warning: Capital at Risk
            </h2>
            <p className="leading-relaxed font-medium">
              Horse racing betting involves significant risk. You should only gamble with funds that you can afford to lose. There is no such thing as a "guaranteed" winner or a "sure thing."
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 italic font-bold text-red-700">
              By using Racing Intelligence, you acknowledge that any betting activity has an inherent risk of loss of capital. YOUR CAPITAL IS AT RISK.
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-black text-racing-green uppercase italic flex items-center gap-2">
              <Info className="text-gold" size={24} /> 2. No Guarantees
            </h2>
            <p className="leading-relaxed">
              While we strive to provide accurate information and expert analysis via our automated agents (Cecil, Ruby, Keenan, Mordin, and Persad), Racing Intelligence makes no guarantees regarding the results or financial gain from following our predictions.
            </p>
            <p className="leading-relaxed">
              Past performance is not a reliable indicator of future results. Betting outcomes are subject to numerous factors beyond our control, including track conditions, non-runners, and late market movements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-black text-racing-green uppercase italic flex items-center gap-2">
              <Scale className="text-gold" size={24} /> 3. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              Racing Intelligence and its owners shall not be held responsible for any financial losses, damages, or costs incurred as a result of following the information, predictions, or links provided on this service. All bets are placed at your own risk and discretion.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-black text-racing-green uppercase italic flex items-center gap-2">
              <Scale className="text-gold" size={24} /> 4. Accuracy of Information
            </h2>
            <p className="leading-relaxed">
              We make every effort to ensure the information provided is correct at the time of publishing (T-30m). However, horse racing is a fast-moving environment. We are not liable for any errors, omissions, or outdated information. Please verify all details with your licensed bookmaker before placing any wagers.
            </p>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-black text-racing-green uppercase italic">5. Responsible Gambling</h2>
            <p className="leading-relaxed text-sm">
              We are committed to responsible gambling. If you believe you may have a gambling problem, we strongly urge you to seek help from professional organizations:
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gold font-bold hover:underline">
                BeGambleAware.org <ExternalLink size={14} />
              </a>
              <a href="https://www.gamstop.co.uk" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gold font-bold hover:underline">
                GamStop.co.uk <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center pt-8 border-t border-gray-50">
            Strictly 18+ Only • Professional Analytics Service
          </div>
        </div>

        <div className="text-center">
          <a href="/login" className="text-racing-green font-black uppercase tracking-widest text-xs hover:text-gold transition-colors">
            Return to Portal
          </a>
        </div>
      </section>
    </main>
  );
}
