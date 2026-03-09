import React from 'react';
import { ShieldCheck, Lock, Eye, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 font-sans">
      <header className="bg-racing-green text-white py-16 px-6 shadow-xl border-b-4 border-gold text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <ShieldCheck className="mx-auto text-gold mb-4" size={48} />
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic drop-shadow-md">
            Privacy Policy
          </h1>
          <p className="text-gold font-bold tracking-[0.3em] text-xs uppercase">
            Your Data Intelligence & Protection
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 space-y-12 text-gray-700">
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Eye className="text-gold" size={24} /> 1. Data Collection
            </h2>
            <p className="leading-relaxed font-medium italic border-l-4 border-gold pl-4">
              Horse Racing Intelligence collects only what is necessary to deliver your professional analytics and manage your secure subscriber portal.
            </p>
            <ul className="space-y-3 list-disc pl-6 text-sm font-bold uppercase tracking-wide text-gray-500">
              <li>Account Credentials (Email, Encrypted Passwords)</li>
              <li>Subscription Status & Tier via Stripe Integration</li>
              <li>Operational Logs for AI Agent Performance (Cecil, Ruby, etc.)</li>
              <li>Browser Metadata for Security and Anti-Fraud Measures</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Globe className="text-gold" size={24} /> 2. Data Usage & Security
            </h2>
            <p className="leading-relaxed">
              We do not sell, rent, or trade your personal information. Data is used exclusively for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <Lock className="text-racing-green mb-2" size={20} />
                <h4 className="font-black uppercase text-xs mb-2">Secure Access</h4>
                <p className="text-[11px] font-medium leading-relaxed uppercase">Authentication via Supabase Auth for high-fidelity identity protection.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <Globe className="text-racing-green mb-2" size={20} />
                <h4 className="font-black uppercase text-xs mb-2">Service Delivery</h4>
                <p className="text-[11px] font-medium leading-relaxed uppercase">Personalizing your dashboard with relevant race intel based on your subscription tier.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Globe className="text-gold" size={24} /> 3. Payment Processing
            </h2>
            <p className="leading-relaxed">
              All financial transactions are handled securely by **Stripe**. Horse Racing Intelligence does not store your credit card or bank details on our servers. Stripe&apos;s privacy policy governs the processing of your payment data.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-racing-green uppercase italic flex items-center gap-3">
              <Globe className="text-gold" size={24} /> 4. Cookies & Analytics
            </h2>
            <p className="leading-relaxed">
              We use functional cookies to maintain your login session and Vercel Analytics to monitor site performance. These tools do not track you across other websites.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100 text-center space-y-6">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              Last Updated: March 2026 • GDPR Compliant Analytics
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
