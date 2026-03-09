import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Clock, ShieldAlert, LogOut, Trophy, Target, Percent, TrendingUp } from 'lucide-react';
import RaceCard from '@/components/RaceCard';
import { redirect } from 'next/navigation';
import { getPerformanceStats } from '@/lib/stats';

export const dynamic = 'force-dynamic';

async function getRaces() {
  const cookieStore = await cookies();
  
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

  return races || [];
}

export default async function PaddockPage() {
  const rawRaces = await getRaces();
  const { totalAnalyzed, totalWins, totalTop2, winRate, top2Rate } = await getPerformanceStats();
  
  // 1. Process, Clean, and STRICT DEDUPLICATE
  const uniqueRaces: Record<string, any> = {};
  
  rawRaces.forEach(r => {
    const race = r.full_data;
    const dateMatch = (race.race_id || '').match(/\d{8}/);
    const date = dateMatch ? dateMatch[0] : (race.meta?.date?.replace(/-/g, '') || '00000000');
    const track = (race.meta?.track || 'Unknown Track').trim();
    const time = (race.meta?.time || '00:00').trim();
    
    // Create a canonical key for deduplication: Track_Time_YYYYMMDD
    const canonicalKey = `${track}_${time}_${date}`.toLowerCase().replace(/\s+/g, '');
    
    // Only store if not seen, or if this version has analysis and the previous didn't
    if (!uniqueRaces[canonicalKey] || (race.analysis?.ruby && !uniqueRaces[canonicalKey].analysis?.ruby)) {
      uniqueRaces[canonicalKey] = {
        ...race,
        _date: date,
        _track: track,
        _time: time
      };
    }
  });

  const allProcessed = Object.values(uniqueRaces);
  
  // Use Europe/London to get "today" correctly for UK/IRE racing
  const todayStr = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Europe/London'
  }).format(new Date()).split('/').reverse().join(''); // "YYYYMMDD"

  const filtered = allProcessed.filter(race => race._date >= todayStr);

  // 2. Grouping
  const grouped: Record<string, Record<string, any[]>> = {};
  filtered.forEach(race => {
    if (!grouped[race._date]) grouped[race._date] = {};
    if (!grouped[race._date][race._track]) grouped[race._date][race._track] = [];
    grouped[race._date][race._track].push(race);
  });

  // 4. Date Sorting (Chronological for upcoming)
  const sortedDates = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return (
    <main className="min-h-screen pb-20 bg-racing-green relative overflow-hidden text-slate-900">
      {/* Visual Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/12950515/pexels-photo-12950515.jpeg?auto=compress&cs=tinysrgb&w=2000" 
          alt="Horse Racing Background" 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-racing-green/80 via-racing-green/40 to-[#fcfcfc]"></div>
      </div>

      <div className="relative z-10">
        <header className="bg-racing-green/60 backdrop-blur-md text-white py-12 px-6 shadow-xl border-b-4 border-gold text-center md:text-left">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Horse Racing Intelligence</h1>
              <p className="text-gold font-bold flex items-center justify-center md:justify-start gap-2 tracking-widest text-xs">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                LIVE PADDOCK • SUBSCRIBER ACCESS
              </p>
            </div>
            <nav className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="/dashboard" className="border-b-2 border-gold pb-1 text-gold hover:text-gold transition-colors">Dashboard</a>
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border-b-4 border-gold items-center">
            <div className="flex items-center gap-4 border-r border-gray-100">
              <div className="p-3 bg-racing-green/5 rounded-xl text-racing-green">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Analyzed</p>
                <p className="text-2xl font-black text-racing-green italic">{totalAnalyzed}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 md:border-r md:border-gray-100">
              <div className="p-3 bg-gold/10 rounded-xl text-gold">
                <Trophy size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Top Pick Wins</p>
                <p className="text-2xl font-black text-racing-green italic">{totalWins} <span className="text-xs text-gray-400">({winRate}%)</span></p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-r border-gray-100">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <Target size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Top 2 Accuracy</p>
                <p className="text-2xl font-black text-racing-green italic">{totalTop2} <span className="text-xs text-gray-400">({top2Rate}%)</span></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-500">
                <Percent size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Model State</p>
                <p className="text-2xl font-black text-racing-green italic uppercase">Calibrated</p>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-6xl mx-auto px-6 mt-12 pb-20 space-y-16">
          {allProcessed.length === 0 ? (
            <div className="text-center py-24 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-racing-green/20">
              <ShieldAlert className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold italic tracking-tight uppercase">No upcoming races found</p>
            </div>
          ) : (
            sortedDates.map(date => {
              const y = date.substring(0, 4);
              const m = date.substring(4, 6);
              const d = date.substring(6, 8);
              const displayDate = `${y}-${m}-${d}`;

              // Sort tracks by their earliest race time
              const sortedTracks = Object.keys(grouped[date]).sort((trackA, trackB) => {
                const earliestA = grouped[date][trackA].reduce((min, r) => r._time < min ? r._time : min, '23:59');
                const earliestB = grouped[date][trackB].reduce((min, r) => r._time < min ? r._time : min, '23:59');
                return earliestA.localeCompare(earliestB);
              });

              return (
                <div key={date} className="space-y-10">
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gold/30"></div>
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-black text-gold uppercase tracking-[0.2em] italic bg-racing-green/80 px-8 py-3 rounded-t-2xl border-x border-t border-gold/40 shadow-2xl backdrop-blur-md">
                        {new Date(displayDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </h2>
                      {date === todayStr && (
                        <span className="text-[10px] font-black text-white bg-red-600 px-4 py-1 rounded-full -mt-2 z-10 animate-pulse shadow-lg uppercase tracking-tighter">
                          Active Racing Day
                        </span>
                      )}
                    </div>
                    <div className="h-px flex-1 bg-gold/30"></div>
                  </div>

                  <div className="space-y-12">
                    {sortedTracks.map(track => (
                      <div key={`${date}-${track}`} className="space-y-6">
                        <div className="flex items-center gap-4 border-l-4 border-gold pl-6 py-2 bg-white/50 backdrop-blur-sm rounded-r-xl">
                          <div className="p-2 bg-racing-green rounded-lg shadow-inner">
                            <Clock className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black text-racing-green uppercase tracking-tighter">{track}</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daily Schedule • {grouped[date][track].length} Races Analyzed</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {grouped[date][track]
                            .sort((a, b) => a._time.localeCompare(b._time))
                            .map((race: any) => (
                              <RaceCard key={race.race_id} race={race} />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </section>

        <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-racing-green/10 text-center space-y-4">
          <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em]">
            Professional Analytical Intelligence • Strictly 18+ Only
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <a href="/legal" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Risk Disclaimer
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <a href="/terms" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Terms & Conditions
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <a href="/privacy" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Privacy Policy
            </a>
            <span className="w-1 h-1 rounded-full bg-gray-200"></span>
            <a href="/rules" className="text-[10px] text-gray-500 hover:text-gold font-black uppercase tracking-widest transition-all">
              Rules & Regulations
            </a>
          </div>
          <div className="flex justify-center items-center gap-4">
            <span className="text-[10px] text-red-500/70 font-black uppercase tracking-widest">
              Strictly No Refunds • Capital at Risk
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}
// Force rebuild for Next.js 16 cookie fix
