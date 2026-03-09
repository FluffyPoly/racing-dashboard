import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { BrainCircuit, Target, ArrowDownUp, ShieldCheck, Zap, LogOut } from 'lucide-react';

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
    <main className="min-h-screen pb-20 bg-racing-green relative overflow-hidden">
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
              <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">Improvement Lab</h1>
              <p className="text-gold font-bold flex items-center justify-center md:justify-start gap-2 tracking-widest text-xs uppercase">
                Autonomous Knowledge Base • Performance Calibration
              </p>
            </div>
            <nav className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
              <a href="/dashboard" className="text-white/70 hover:text-gold transition-colors">Dashboard</a>
              <a href="/learnings" className="border-b-2 border-gold pb-1 text-gold">Lab</a>
              
              <form action="/api/logout" method="POST">
                <button type="submit" className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer group">
                  <LogOut size={16} className="group-hover:translate-x-1 transition-transform" /> 
                  <span className="hidden md:inline text-[10px]">Exit</span>
                </button>
              </form>
            </nav>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-6 mt-12 space-y-12">
          {learnings.length === 0 ? (
            <div className="text-center py-24 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-racing-green/20 shadow-sm">
              <BrainCircuit className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold italic tracking-tight uppercase">Calibration data locked for subscribers</p>
            </div>
          ) : (
            learnings.map((learn: any) => (
              <div key={learn.id} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all">
                <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
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
