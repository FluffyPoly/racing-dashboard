'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Trophy, ShieldCheck, Mail, Lock, ChevronRight, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

function OnboardingForm() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setPasswordConfirm] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txsuawougiptdlmmiasy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0'
  );

  useEffect(() => {
    async function verify() {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
        const data = await res.json();
        if (data.email) {
          setEmail(data.email);
        } else {
          setError("Could not verify payment session.");
        }
      } catch (err) {
        setError("Connection error. Please contact support.");
      } finally {
        setVerifying(false);
      }
    }
    verify();
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

    const { error: signUpError } = await supabase.auth.signUp({
      email: email!,
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

  if (verifying) {
    return (
      <div className="text-center p-12 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10">
        <Loader2 className="animate-spin mx-auto text-gold mb-4" size={32} />
        <p className="font-bold italic text-white/70 uppercase tracking-widest text-[10px]">Syncing with Stripe...</p>
      </div>
    );
  }

  if (!sessionId || error) {
    return (
      <div className="text-center p-12 bg-white/10 rounded-2xl backdrop-blur-md border border-red-500/30">
        <p className="font-bold italic text-white mb-4">{error || "Invalid Session"}</p>
        <button onClick={() => router.push('/')} className="text-gold uppercase text-[10px] font-black tracking-widest border-b border-gold pb-1">Return Home</button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gold">
      <div className="bg-racing-green p-8 text-center border-b border-gold/20">
        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <ShieldCheck className="text-racing-green w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight">
          Welcome to <br /> The Club
        </h1>
        <div className="mt-4 bg-white/10 py-2 px-4 rounded-lg inline-flex items-center gap-2 border border-white/10">
          <Mail size={12} className="text-gold" />
          <span className="text-white text-xs font-bold">{email}</span>
        </div>
      </div>

      <form onSubmit={handleOnboarding} className="p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-lg border border-red-100 italic">
            ⚠️ {error}
          </div>
        )}

        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center italic leading-relaxed px-4">
          Payment confirmed. Choose your access password to finalize your membership.
        </p>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-racing-green uppercase tracking-widest ml-1">
            Choose Password
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
            I verify that I am <span className="text-racing-green font-black">18 years or older</span> and I accept the <a href="/legal" className="text-gold underline">legal disclaimer</a>.
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
              Enter Dashboard <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <main className="min-h-screen bg-racing-green flex items-center justify-center p-6">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 text-white">
          <Loader2 className="animate-spin text-gold" size={40} />
          <p className="font-black uppercase tracking-widest text-[10px] italic">Securing Portal...</p>
        </div>
      }>
        <OnboardingForm />
      </Suspense>
    </main>
  );
}
