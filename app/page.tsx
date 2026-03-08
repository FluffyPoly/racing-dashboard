import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Clock, ShieldAlert, LogOut } from 'lucide-react';
import RaceCard from '@/components/RaceCard';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getRaces() {
  const cookieStore = await cookies();
  
  // Use env vars with hardcoded fallbacks for reliability
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txsuawougiptdlmmiasy.supabase.co';
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4c3Vhd291Z2lwdGRsbW1pYXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NTczNDksImV4cCI6MjA4ODUzMzM0OX0.5QlkuPtjIxF3dNNUBIlgQeM3ZRw1KH-aoNOt_b9B8d0';

  const supabase = createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: races, error } = await supabase
    .from('races')
    .select('*');

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  return races.map(r => r.full_data).sort((a: any, b: any) => {
    const timeA = a.meta.time || "00:00";
    const timeB = b.meta.time || "00:00";
    
    // Create comparable dates for today
    const dateA = new Date(`${todayStr}T${timeA}:00Z`);
    const dateB = new Date(`${todayStr}T${timeB}:00Z`);

    const diffA = dateA.getTime() - now.getTime();
    const diffB = dateB.getTime() - now.getTime();

    // 1. Both upcoming -> Soonest first
    if (diffA > 0 && diffB > 0) return diffA - diffB;
    
    // 2. Both past -> Most recent first
    if (diffA <= 0 && diffB <= 0) return diffB - diffA;

    // 3. One upcoming, one past -> Prioritize upcoming
    return diffA > 0 ? -1 : 1;
  });
}

export default async function PaddockPage() {
  const races = await getRaces();

  return (
    <main className="min-h-screen pb-20 bg-[#f8f9fa]">
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl border-b-4 border-gold text-center md:text-left">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Racing Intelligence</h1>
            <p className="text-gold font-bold flex items-center justify-center md:justify-start gap-2 tracking-widest text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              LIVE PADDOCK • SUBSCRIBER ACCESS
            </p>
          </div>
          <nav className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="/" className="border-b-2 border-gold pb-1 text-gold hover:text-gold transition-colors">Dashboard</a>
            <a href="/learnings" className="text-white/70 hover:text-gold transition-colors">Lab</a>
            
            <form action="/api/logout" method="POST">
              <button type="submit" className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer group">
                <LogOut size={16} className="group-hover:translate-x-1 transition-transform" /> 
                <span className="hidden md:inline text-[10px]">Exit</span>
              </button>
            </form>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {races.length === 0 ? (
          <div className="col-span-full text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <ShieldAlert className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-bold italic tracking-tight uppercase">Subscription Required or No Data Available</p>
          </div>
        ) : (
          races.map((race: any) => (
            <RaceCard key={race.race_id} race={race} />
          ))
        )}
      </section>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-200 text-center space-y-4">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
          Professional Analytical Intelligence • Strictly 18+
        </p>
        <div className="flex justify-center gap-6">
          <a href="/legal" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-colors">
            Legal & Risk Disclaimer
          </a>
          <span className="text-gray-300">|</span>
          <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">
            Capital at Risk
          </span>
        </div>
      </footer>
    </main>
  );
}
// Force rebuild for Next.js 16 cookie fix
