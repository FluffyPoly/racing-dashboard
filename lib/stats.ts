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
  const { data: learnings } = await supabase.from('learnings').select('*');

  if (!races || !learnings) return { totalAnalyzed: 0, totalWins: 0, totalTop2: 0, winRate: 0, top2Rate: 0 };

  const allRaces = races.map(r => r.full_data);
  const statsMap: Record<string, { win: boolean, top2: boolean }> = {};
  
  learnings.forEach((learn: any) => {
    const correspondingRace = allRaces.find(r => r.race_id === learn.race_id);
    if (!correspondingRace) return;

    const dateMatch = (correspondingRace.race_id || '').match(/\d{8}/);
    const date = dateMatch ? dateMatch[0] : (correspondingRace.meta?.date?.replace(/-/g, '') || '00000000');
    const track = (correspondingRace.meta?.track || 'Unknown Track').trim();
    const time = (correspondingRace.meta?.time || '00:00').trim();
    
    // Create a canonical key for deduplication: Track_Time_YYYYMMDD
    const canonicalKey = `${track}_${time}_${date}`.toLowerCase().replace(/\s+/g, '');
    if (statsMap[canonicalKey]) return;

    const rubyRankings = [...(correspondingRace.analysis?.ruby?.rankings || [])].sort((a, b) => b.win_probability - a.win_probability);
    if (rubyRankings.length === 0) return;

    const actualWinner = (learn.results?.winner || '').toLowerCase().split('(')[0].trim();
    const clean = (s: string) => s.toLowerCase().split('(')[0].trim();

    const isWin = clean(rubyRankings[0].name) === actualWinner;
    const isTop2 = rubyRankings.slice(0, 2).some(h => clean(h.name) === actualWinner);
    
    statsMap[canonicalKey] = { win: isWin, top2: isTop2 };
  });

  const totalAnalyzed = Object.keys(statsMap).length;
  const totalWins = Object.values(statsMap).filter(s => s.win).length;
  const totalTop2 = Object.values(statsMap).filter(s => s.top2).length;
  
  const winRate = totalAnalyzed > 0 ? Math.round((totalWins / totalAnalyzed) * 100) : 0;
  const top2Rate = totalAnalyzed > 0 ? Math.round((totalTop2 / totalAnalyzed) * 100) : 0;

  return { totalAnalyzed, totalWins, totalTop2, winRate, top2Rate };
}
