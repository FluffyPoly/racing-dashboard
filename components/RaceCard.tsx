'use client';

import React, { useState } from 'react';
import { Trophy, Zap, BarChart3, BrainCircuit, Clock, ChevronRight, ChevronDown, ShieldCheck, ArrowDownUp, AlertTriangle, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RaceCard({ race }: { race: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // SAFE ACCESSORS
  const rubyRankings = race?.analysis?.ruby?.rankings || [];
  const hasKeenan = !!(race?.analysis?.keenan?.most_probable_winner);
  const hasMordin = !!(race?.analysis?.mordin?.market_comparison);
  const pace = race?.analysis?.keenan?.pace_analysis;

  // Value Detection
  const topPick = rubyRankings[0];
  const hasValue = topPick?.win_probability > 0.35;

  return (
    <div className={`racing-card p-6 rounded-r-xl shadow-sm hover:shadow-md transition-all border border-gray-100 h-fit bg-white ${isExpanded ? 'ring-2 ring-gold/20' : ''}`}>
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
          {hasValue && (
            <div className="bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter animate-pulse mb-1">
              Value Alert
            </div>
          )}
          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded">
            {race?.meta?.class || 'N/A'}
          </span>
        </div>
      </div>

      {/* Pace Map Visual */}
      {pace && (
        <div className="mb-6 flex items-center gap-3 bg-racing-green/5 p-3 rounded-xl border border-racing-green/10">
          <Gauge size={14} className="text-gold" />
          <p className="text-[10px] font-bold text-racing-green uppercase tracking-tight">
            Shape: <span className="text-gold font-black">{pace.type}</span> • {pace.insight}
          </p>
        </div>
      )}

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
              {hasKeenan && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BrainCircuit size={14} className="text-gold" /> Probable Distributions
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Top Forecast</p>
                      <p className="text-[10px] font-bold text-racing-green italic">{race.analysis.keenan.forecast_top_3[0]?.combination}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Top Tricast</p>
                      <p className="text-[10px] font-bold text-racing-green italic">{race.analysis.keenan.tricast_top_3[0]?.combination}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mordin Market Divergence */}
              {hasMordin && (
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ArrowDownUp size={14} className="text-gold" /> Market Divergence
                  </p>
                  <div className="space-y-2">
                    {race.analysis.mordin.market_comparison.slice(0, 2).map((item: any) => (
                      <div key={item.horse} className="flex justify-between items-center bg-gray-50 p-2 px-3 rounded-lg border border-gray-100">
                        <span className="text-[10px] font-bold text-gray-700">{item.horse}</span>
                        <span className={`text-[10px] font-black italic ${item.divergence > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {item.divergence > 0 ? '+' : ''}{Math.round(item.divergence * 100)}% Edge
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ruby Risks/Factors */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} className="text-gold" /> Risk Assessment
                </p>
                <div className="bg-racing-green/5 p-4 rounded-2xl border border-racing-green/10">
                  <p className="text-[10px] font-medium text-racing-green italic leading-relaxed">
                    {topPick?.key_risks?.[0] || 'Market alignment observed. Minimal tail-risk detected.'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
