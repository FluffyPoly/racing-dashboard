import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getPerformanceStats() {
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

  const { data: races } = await supabase.from('races').select('*');
  const { data: learnings } = await supabase.from('learnings').select('*').order('created_at', { ascending: false });

  if (!races || !learnings) return { 
    totalAnalyzed: 0, 
    totalWins: 0, 
    totalTop2: 0, 
    winRate: 0, 
    top2Rate: 0, 
    roi: 0,
    recentWinners: [] 
  };

  const allRaces = races.map(r => r.full_data);
  const statsMap: Record<string, { win: boolean, top2: boolean, odds: number, track: string, time: string, horse: string, date: string }> = {};
  
  learnings.forEach((learn: any) => {
    const dateMatch = (learn.race_id || '').match(/\d{8}/);
    const date = dateMatch ? dateMatch[0] : (learn.created_at?.split('T')[0].replace(/-/g, '') || '00000000');
    
    // We already have track and time in many cases, but let's try to find the canonical race
    const correspondingRace = allRaces.find(r => r.race_id === learn.race_id);
    if (!correspondingRace) return;

    const track = (correspondingRace.meta?.track || 'Unknown').trim();
    const time = (correspondingRace.meta?.time || '00:00').trim();
    const canonicalKey = `${track}_${time}_${date}`.toLowerCase().replace(/\s+/g, '');
    
    if (statsMap[canonicalKey]) return;

    const rubyRankings = [...(correspondingRace.analysis?.ruby?.rankings || [])].sort((a, b) => b.win_probability - a.win_probability);
    if (rubyRankings.length === 0) return;

    const actualWinner = (learn.results?.winner || '').toLowerCase().split('(')[0].trim();
    const clean = (s: string) => s.toLowerCase().split('(')[0].trim();

    const isWin = clean(rubyRankings[0].name) === actualWinner;
    const isTop2 = rubyRankings.slice(0, 2).some(h => clean(h.name) === actualWinner);
    
    // Attempt to parse odds for ROI calculation
    let odds = 2.0; // Default fallback for ROI
    const oddsStr = learn.results?.odds || rubyRankings[0].fair_odds || "2/1";
    if (typeof oddsStr === 'string' && oddsStr.includes('/')) {
      const [num, den] = oddsStr.split('/').map(Number);
      odds = (num / den) + 1;
    } else {
      odds = parseFloat(oddsStr) || 2.0;
    }

    statsMap[canonicalKey] = { 
      win: isWin, 
      top2: isTop2, 
      odds: odds,
      track: track,
      time: time,
      horse: learn.results?.winner || rubyRankings[0].name,
      date: correspondingRace.meta?.date || date
    };
  });

  const processedStats = Object.values(statsMap);
  const totalAnalyzed = processedStats.length;
  const totalWins = processedStats.filter(s => s.win).length;
  const totalTop2 = processedStats.filter(s => s.top2).length;
  
  const winRate = totalAnalyzed > 0 ? Math.round((totalWins / totalAnalyzed) * 100) : 0;
  const top2Rate = totalAnalyzed > 0 ? Math.round((totalTop2 / totalAnalyzed) * 100) : 0;

  // ROI: Assuming flat £1 stakes on every top pick
  // Total Stake = totalAnalyzed
  // Total Return = Sum of (odds) for every win
  const totalReturn = processedStats.filter(s => s.win).reduce((sum, s) => sum + s.odds, 0);
  const roi = totalAnalyzed > 0 ? Math.round(((totalReturn - totalAnalyzed) / totalAnalyzed) * 100) : 0;

  const recentWinners = processedStats
    .filter(s => s.win)
    .slice(0, 20)
    .map(s => ({
      track: s.track,
      time: s.time,
      horse: s.horse,
      odds: s.odds,
      date: s.date
    }));

  return { totalAnalyzed, totalWins, totalTop2, winRate, top2Rate, roi, recentWinners };
}
