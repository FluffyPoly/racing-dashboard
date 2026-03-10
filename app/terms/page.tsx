import React from 'react';
import { Scale, FileText, AlertTriangle, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      <header className="bg-racing-green text-white py-16 px-6 shadow-xl border-b-4 border-gold text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <Scale className="mx-auto text-gold mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic drop-shadow-md">
            Terms & Conditions
          </h1>
          <p className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
            Official Membership Agreement
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 space-y-12 text-gray-700">
          
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-700 font-black uppercase italic tracking-widest text-lg">
              <AlertTriangle size={24} /> STRICT NO-REFUND POLICY
            </div>
            <p className="text-sm font-bold text-red-900 leading-relaxed uppercase tracking-wide">
              By purchasing a subscription, you expressly request that the service begins immediately. You acknowledge and agree that once you gain access to our digital content or the professional analytics dashboard, **YOU LOSE YOUR STATUTORY RIGHT TO CANCEL AND RECEIVE A REFUND** under the Consumer Contracts Regulations 2013 or equivalent local consumer laws.
            </p>
            <p className="text-[11px] text-red-700 italic font-medium">
              We provide immediate, high-value proprietary intelligence that cannot be &quot;returned&quot; once accessed. All sales are final.
            </p>
            </div>

            <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <FileText className="text-gold" size={24} /> 1. Nature of the Service
            </h2>
            <p className="leading-relaxed">
              Horse Racing Intelligence provides automated data analysis and agent-driven predictions. This is an **Informational Service** only. We are not a bookmaker, and we do not accept bets. Our &quot;intelligence&quot; reflects the calculations of automated models and should be treated as professional opinion, not financial advice.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <ShieldCheck className="text-gold" size={24} /> 2. User Responsibilities
            </h2>
            <ul className="space-y-3 list-disc pl-6 text-sm font-bold uppercase tracking-wide text-gray-500">
              <li>You must be at least 18 years of age to use this service.</li>
              <li>You are responsible for ensuring that gambling is legal in your jurisdiction.</li>
              <li>Subscription access is personal and non-transferable. Account sharing results in immediate termination.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Scale className="text-gold" size={24} /> 3. Limitation of Liability
            </h2>
            <p className="leading-relaxed font-medium italic border-l-4 border-gold pl-4">
              CAPITAL AT RISK: Horse Racing Intelligence and its operators shall not be liable for any losses incurred while betting. Betting outcomes are inherently uncertain. You use our analytics at your own risk.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <FileText className="text-gold" size={24} /> 4. Subscription Management
            </h2>
            <p className="leading-relaxed">
              Subscriptions renew automatically. You may cancel your subscription at any time via the Subscriber Portal. Cancellation will take effect at the end of the current billing cycle. **No partial refunds are provided for unused portions of a subscription term.**
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <ShieldCheck className="text-gold" size={24} /> 5. Intellectual Property
            </h2>
            <p className="leading-relaxed text-sm font-bold uppercase tracking-tight text-gray-500">
              All agent-driven analysis, probability distributions, and narrative reports (derived from Cecil, Ruby, Keenan, Mordin, and Persad) are the exclusive property of Horse Racing Intelligence. Users are granted a limited license to view this content for personal use only. Distribution, scraping, or resale of our intelligence is strictly prohibited.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Scale className="text-gold" size={24} /> 6. Governing Law
            </h2>
            <p className="leading-relaxed">
              These Terms & Conditions shall be governed by and construed in accordance with the laws of **England and Wales**. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 text-center space-y-6">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Last Updated: March 2026 • Professional Terms of Service
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
