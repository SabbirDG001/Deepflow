import React from 'react';
import { Flame, Clock, Calendar, Sparkles, Wind } from 'lucide-react';

interface HeaderProps {
  streak: number;
  totalHours: number;
  totalSessions: number;
  onOpenLogs: () => void;
  activeTab: 'timer' | 'logs';
  setActiveTab: (tab: 'timer' | 'logs') => void;
  onOpenBreathing?: () => void;
}

export default function Header({
  streak,
  totalHours,
  totalSessions,
  onOpenLogs,
  activeTab,
  setActiveTab,
  onOpenBreathing
}: HeaderProps) {
  return (
    <nav className="h-14 shrink-0 border-b border-white/5 px-4 sm:px-6 flex items-center justify-between bg-slate-950 sticky top-0 z-50">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('timer')}>
        <div className="w-7 h-7 border border-white/15 rounded-full flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-slate-200" />
        </div>
        <span className="text-base font-semibold tracking-tight text-white">
          Deep<span className="text-slate-500">Flow</span>
        </span>
      </div>

      {/* Navigation & Metrics */}
      <div className="flex items-center gap-4 sm:gap-8">
        {/* Navigation Tabs */}
        <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timer')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'timer'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Timer
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'logs'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Logs & Stats
          </button>
        </div>

        {onOpenBreathing && (
          <button
            onClick={onOpenBreathing}
            className="hidden sm:flex bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full px-3.5 py-1.5 items-center gap-1.5 text-[11px] font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Practice Box Breathing Technique"
          >
            <Wind className="w-3.5 h-3.5 text-slate-400" />
            <span>Breathing Room (বক্স ব্রিদিং)</span>
          </button>
        )}

        {/* Streak Flame Badge */}
        <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
          <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400 hidden sm:inline">
            Streak
          </span>
          <div className="flex items-center gap-1">
            <span className={`text-lg font-semibold ${streak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
              {streak}
            </span>
            <Flame
              className={`w-5 h-5 transition-transform ${
                streak > 0 ? 'text-orange-400 fill-orange-500' : 'text-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Stats Counter */}
        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6">
          <div className="text-left">
            <span className="block text-[9px] uppercase font-semibold tracking-widest text-slate-500">
              Total Deep Work
            </span>
            <span className="text-sm font-mono font-semibold text-slate-200">
              {totalHours.toFixed(1)}h
            </span>
          </div>
          <div className="text-left">
            <span className="block text-[9px] uppercase font-semibold tracking-widest text-slate-500">
              Completions
            </span>
            <span className="text-sm font-mono font-semibold text-slate-200">
              {totalSessions}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
