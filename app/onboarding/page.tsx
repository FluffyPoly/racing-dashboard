'use client';

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Trophy, ShieldCheck, Mail, Lock, ChevronRight, Loader2, Calendar } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OnboardingPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirm] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentVerified, setPaymentVerified] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txsuawougiptdlmmiasy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0'
  );

  useEffect(() => {
    // In a production app, we would verify the sessionId with an API call here.
    // For now, we assume the user reached here via Stripe success_url.
    if (sessionId) {
      setPaymentVerified(true);
    }
  }, [sessionId]);

  const handleOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!ageVerified) {
      setError("You must confirm you are over 18.");
      return;
    }

    setLoading(true);
    setError(null);

    // This is a simplified onboarding. 
    // Usually, you would have the user's email from the Stripe session metadata.
    // For this prototype, we'll ask for the email they used.
    const email = searchParams.get('email') || ""; 

    const { error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          age_verified: true,
          is_subscribed: true
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  if (!sessionId) {
    return (
      <main className="min-h-screen bg-racing-green flex items-center justify-center p-6 text-white">
        <p className="font-bold italic">Invalid Session. Please purchase a pass first.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-racing-green flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gold">
        <div className="bg-racing-green p-8 text-center border-b border-gold/20">
          <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="text-racing-green w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            Payment Confirmed
          </h1>
          <p className="text-gold text-[10px] font-bold uppercase tracking-widest mt-1">
            Initialize Your Premium Account
          </p>
        </div>

        <form onSubmit={handleOnboarding} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-lg border border-red-100 italic">
              ⚠️ {error}
            </div>
          )}

          <div className="space-y-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center italic">
            Please set your secure password to access the models.
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-racing-green uppercase tracking-widest ml-1">
              Set Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-gray-800"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-racing-green uppercase tracking-widest ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all text-gray-800"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <input 
              type="checkbox" 
              required
              checked={ageVerified}
              onChange={(e) => setAgeVerified(e.target.checked)}
              className="mt-1 accent-racing-green" 
            />
            <p className="text-[10px] font-bold text-gray-600 uppercase leading-relaxed">
              I verify that I am <span className="text-racing-green font-black">18 years or older</span> and I accept the legal & risk disclaimer.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-racing-green hover:bg-racing-green/90 text-white font-black uppercase tracking-widest py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group italic active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Finalize & Enter Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
