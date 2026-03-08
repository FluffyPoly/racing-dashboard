import React from 'react';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { BrainCircuit, Target, ArrowDownUp, ShieldCheck, Zap, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getLearnings() {
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

  const { data: learnings, error } = await supabase
    .from('learnings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase Error:', error);
    return [];
  }

  return learnings;
}

export default async function LearningsPage() {
  const learnings = await getLearnings();

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      <header className="bg-racing-green text-white py-12 px-6 shadow-xl border-b-4 border-gold">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Improvement Lab</h1>
            <p className="text-gold font-bold flex items-center justify-center md:justify-start gap-2 tracking-widest text-xs uppercase">
              Autonomous Knowledge Base • Performance Calibration
            </p>
          </div>
          <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="/" className="text-white/70 hover:text-gold transition-colors">Dashboard</a>
            <a href="/learnings" className="border-b-2 border-gold pb-1 text-gold">Improvement Lab</a>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 mt-12 space-y-12">
        {learnings.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm">
            <BrainCircuit className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 font-bold italic tracking-tight uppercase">Calibration data locked for subscribers</p>
          </div>
        ) : (
          learnings.map((learn: any) => (
            <div key={learn.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-black text-2xl text-racing-green uppercase italic tracking-tighter">
                    {learn.race_id.replace(/_/g, ' ')}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Processed Evaluation</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Official Result</p>
                    <p className="text-sm font-black text-racing-green italic uppercase">{learn.results.winner}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 border-2 border-green-200">
                    <Target size={24} />
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-gray-100" />
                  <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-gray-100" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black text-racing-green uppercase tracking-widest pb-2 border-b border-gray-50">
                      <ShieldCheck size={18} className="text-gold" /> Ruby Analyst
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic font-serif">{learn.insights.ruby}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black text-racing-green uppercase tracking-widest pb-2 border-b border-gray-50">
                      <ArrowDownUp size={18} className="text-gold" /> Keenan Architect
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic font-serif">{learn.insights.keenan}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black text-racing-green uppercase tracking-widest pb-2 border-b border-gray-50">
                      <Zap size={18} className="text-gold" /> Mordin Market
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed italic font-serif">{learn.insights.mordin}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
