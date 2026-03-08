'use client';

import React, { useState } from 'react';
import { Trophy, Zap, BarChart3, BrainCircuit, Clock, ChevronRight, ChevronDown, ShieldCheck, ArrowDownUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RaceCard({ race }: { race: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // SAFE ACCESSORS
  const rubyRankings = race?.analysis?.ruby?.rankings || [];
  const hasKeenan = !!(race?.analysis?.keenan?.most_probable_winner);
  const hasMordin = !!(race?.analysis?.mordin?.market_comparison);

  return (
    <div className="racing-card p-6 rounded-r-xl shadow-sm hover:shadow-md transition-all border border-gray-100 h-fit bg-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-black text-racing-green italic leading-tight uppercase">
            {race?.meta?.track || 'Unknown Track'}
          </h3>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">
            {race?.meta?.time || '--:--'} • {race?.meta?.race_name || 'Loading Race Details...'}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">
            {race?.meta?.class || 'N/A'}
          </span>
          <span className="text-[9px] text-gray-300 font-mono italic">#{race?.race_id || 'ID-PENDING'}</span>
        </div>
      </div>

      <div className="space-y-4">
        {rubyRankings.length === 0 ? (
          <div className="py-4 text-center border border-dashed border-gray-100 rounded-lg">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic animate-pulse">
              Ruby analyzing runners...
            </p>
          </div>
        ) : (
          rubyRankings.slice(0, 3).map((horse: any, idx: number) => (
            <div key={horse.name} className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                idx === 0 ? 'bg-gold text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-sm text-gray-800">{horse.name}</span>
                  <span className="text-xs font-black text-racing-green italic">
                    {Math.round((horse.win_probability || 0) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-gray-100 mt-1 overflow-hidden rounded-full">
                  <div 
                    className={`h-full ${idx === 0 ? 'bg-gold' : 'bg-racing-green/40'}`} 
                    style={{ width: `${(horse.win_probability || 0) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex items-center gap-1 group relative">
            <BarChart3 size={16} className={hasKeenan ? "text-gold" : "text-gray-200"} />
            <span className="absolute -top-8 left-0 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {hasKeenan ? 'Distribution Ready' : 'Keenan Processing'}
            </span>
          </div>
          <div className="flex items-center gap-1 group relative">
            <Zap size={16} className={hasMordin ? "text-gold" : "text-gray-200"} />
            <span className="absolute -top-8 left-0 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {hasMordin ? 'Market Calibrated' : 'Mordin Processing'}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[10px] font-black uppercase text-gold tracking-widest hover:translate-x-1 transition-transform cursor-pointer"
        >
          {isExpanded ? 'Hide Intel' : 'Full Intel'} {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-dashed border-gray-100 space-y-6">
              {/* Keenan Distributions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[10px] font-black text-racing-green/40 uppercase tracking-widest mb-3">
                  <ArrowDownUp size={14} /> Keenan Distributions
                </div>
                {!hasKeenan ? (
                  <p className="text-[10px] text-gray-400 italic">Calculating complex combinations...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Top Forecasts</p>
                      {race?.analysis?.keenan?.forecast_top_3?.slice(0, 2).map((f: any) => (
                        <p key={f.combination} className="text-xs font-bold text-gray-700 leading-tight mb-1">
                          {f.combination.replace('>', '→')} <span className="text-gold italic">{Math.round((f.probability||0)*100)}%</span>
                        </p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Top Tricast</p>
                      {race?.analysis?.keenan?.tricast_top_3?.slice(0, 1).map((t: any) => (
                        <p key={t.combination} className="text-xs font-bold text-gray-700 leading-tight italic">
                          {t.combination.replace(/>/g, '→')}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mordin Calibration */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-[10px] font-black text-racing-green/40 uppercase tracking-widest mb-3">
                  <Zap size={14} /> Mordin Calibration
                </div>
                {!hasMordin ? (
                  <p className="text-[10px] text-gray-400 italic">Aligning model with bookmaker odds...</p>
                ) : (
                  <div className="space-y-2">
                    {race?.analysis?.mordin?.market_comparison?.map((m: any) => (
                      <div key={m.horse} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-600">{m.horse}</span>
                        <span className={`font-black italic ${
                          (m.divergence||0) > 0.05 ? 'text-green-600' : (m.divergence||0) < -0.05 ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {(m.divergence||0) > 0 ? '+' : ''}{Math.round((m.divergence||0) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Rule Flags */}
              <div className="flex flex-wrap gap-2">
                {race?.analysis?.ruby?.race_volatility && (
                  <span className="text-[9px] font-bold uppercase px-2 py-1 bg-racing-green/5 text-racing-green rounded">
                    Volatility: {race.analysis.ruby.race_volatility}
                  </span>
                )}
                <span className="text-[9px] font-bold uppercase px-2 py-1 bg-gold/10 text-gold rounded italic">
                  Confidence: {race?.analysis?.keenan?.certainty_level || 'Medium'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
