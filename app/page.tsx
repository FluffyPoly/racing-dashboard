import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Clock, ShieldAlert } from 'lucide-react';
import RaceCard from '@/components/RaceCard';

export const dynamic = 'force-dynamic';

async function getRaces() {
  const cookieStore = cookies();
  
  // Use env vars with hardcoded fallbacks for reliability
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://txsuawougiptdlmmiasy.supabase.co';
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Mq_3i8KG3M_6JIehVRT-iA_x8qdh-dr';

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
    const dateA = new Date(`${todayStr}T${timeA}:00`);
    const dateB = new Date(`${todayStr}T${timeB}:00`);

    const isAUpcoming = dateA > now;
    const isBUpcoming = dateB > now;

    if (isAUpcoming && isBUpcoming) return dateA.getTime() - dateB.getTime(); // Next race soonest
    if (!isAUpcoming && !isBUpcoming) return dateB.getTime() - dateA.getTime(); // Past race most recent
    return isAUpcoming ? -1 : 1; // Prioritize upcoming over past
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
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="/" className="border-b-2 border-gold pb-1 text-gold">Dashboard</a>
            <a href="/learnings" className="text-white/70 hover:text-gold transition-colors">Improvement Lab</a>
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
    </main>
  );
}
