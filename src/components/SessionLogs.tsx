import React, { useState } from 'react';
import { CompletedSession } from '../types';
import { 
  Trophy, 
  Trash2, 
  HelpCircle, 
  Flame, 
  Sparkles, 
  Calendar, 
  Clock, 
  AlertTriangle,
  Brain,
  ThumbsUp,
  RotateCcw,
  Zap
} from 'lucide-react';

interface SessionLogsProps {
  logs: CompletedSession[];
  streak: number;
  onClearLogs: () => void;
  onAddMockSession: (daysAgo: number) => void;
}

export default function SessionLogs({
  logs,
  streak,
  onClearLogs,
  onAddMockSession
}: SessionLogsProps) {
  const [selectedNotesSession, setSelectedNotesSession] = useState<string | null>(null);

  // Math for stats
  const totalCompleted = logs.length;
  const totalMinutes = logs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalHours = totalMinutes / 60;
  
  const averageFocus = totalCompleted > 0 
    ? (logs.reduce((acc, curr) => acc + curr.focusRating, 0) / totalCompleted).toFixed(1)
    : 'N/A';
  
  const averageEnergy = totalCompleted > 0 
    ? (logs.reduce((acc, curr) => acc + curr.energyRating, 0) / totalCompleted).toFixed(1)
    : 'N/A';

  // Weekly layout overview calculator
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  // Map standard javascript getDay() (0 is Sun, 1 is Mon) to daysOfWeek indices (Mon:0 ... Sun:6)
  const getDayIndex = (date: Date) => {
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };

  // Group log durations by day of current week to render the bar chart
  const weekDurations = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();
  
  // Find start of current week (Monday)
  const currentDay = now.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  const mondayDate = new Date(now);
  mondayDate.setDate(now.getDate() + diffToMonday);
  mondayDate.setHours(0, 0, 0, 0);

  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);
  sundayDate.setHours(23, 59, 59, 999);

  logs.forEach(log => {
    const logDate = new Date(log.timestamp);
    if (logDate >= mondayDate && logDate <= sundayDate) {
      const idx = getDayIndex(logDate);
      if (idx >= 0 && idx < 7) {
        weekDurations[idx] += log.durationMinutes;
      }
    }
  });

  const maxDuration = Math.max(...weekDurations, 30); // scale relatively but keep at least 30m as ceiling

  // Aggregate all worry postponements and distraction logs
  const allWorries = Array.from(new Set(logs.flatMap(log => log.worries || [])));
  const allDistractions = Array.from(new Set(logs.flatMap(log => log.distractions || [])));

  return (
    <div className="flex-1 w-full overflow-y-auto">
    <div className="w-full p-4 sm:p-8 max-w-5xl mx-auto space-y-6 font-sans">

      {/* Stats Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative z-10">
        <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1">
            Current Daily Streak
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-orange-400 font-mono">
              {streak}
            </span>
            <span className="text-xs text-slate-400">day{streak !== 1 ? 's' : ''}</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
            Must complete 1 session daily to keep streak alive!
          </p>
        </div>

        <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1">
            Total Deep Work
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-cyan-400 font-mono">
              {totalHours.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">hours</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            ({totalMinutes} minutes mapped in flow)
          </p>
        </div>

        <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1">
            Weekly Sessions
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-emerald-400 font-mono">
              {totalCompleted}
            </span>
            <span className="text-xs text-slate-400">sessions</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Successfully closed & rated
          </p>
        </div>

        <div className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col justify-between">
          <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1">
            Avg Focus Rating
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold text-purple-400 font-mono">
              {averageFocus}
            </span>
            <span className="text-purple-400 text-[10px] font-semibold">/10</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">
            Energy avg is {averageEnergy}/10
          </p>
        </div>
      </div>

      {/* Main Stats Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Left Column: Weekly Overview Bar Chart (Matches layout requirement) */}
        <div className="lg:col-span-5 bg-slate-900/50 border border-white/5 p-6 rounded-xl flex flex-col">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-200">Weekly Overview</h4>
            <p className="text-xs text-slate-500">Duration in minutes completed this week</p>
          </div>

          <div className="flex justify-between items-end h-44 gap-3 px-1 mt-6">
            {weekDurations.map((duration, idx) => {
              const heightPct = Math.max((duration / maxDuration) * 100, 4); // minimum 4% as indicator
              const isToday = idx === getDayIndex(now);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group h-full justify-end">
                  {duration > 0 && (
                    <div className="bg-cyan-500 text-slate-950 font-mono text-[9px] font-semibold rounded px-1 py-0.5 mb-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute translate-y-[-140%]">
                      {duration}m
                    </div>
                  )}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t transition-all duration-500 ${
                      isToday
                        ? 'bg-cyan-500'
                        : duration > 0
                        ? 'bg-cyan-500/30 hover:bg-cyan-500/50 border-t border-cyan-500/50'
                        : 'bg-white/5'
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between mt-3 text-[10px] text-slate-500 font-semibold px-1">
            {daysOfWeek.map((day, idx) => {
              const isToday = idx === getDayIndex(now);
              return (
                <span key={idx} className={isToday ? 'text-cyan-400 font-semibold' : ''}>
                  {day}
                </span>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center text-xs text-slate-400">
            <span>Today&apos;s Yield</span>
            <span className="font-mono text-cyan-400 font-semibold">
              {weekDurations[getDayIndex(now)]} min
            </span>
          </div>
        </div>

        {/* Right Column: Distractions and Worry postponement reviews */}
        <div className="lg:col-span-7 bg-slate-900/50 border border-white/5 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-200 mb-1">Obstacles & Distractions Board</h4>
            <p className="text-xs text-slate-500 mb-4">Historical worries postponed and logged distractions to optimize</p>

            <div className="space-y-4">
              {/* Worries list */}
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-amber-400 block mb-2">
                  📌 Postponed Concerns ({allWorries.length})
                </span>
                {allWorries.length === 0 ? (
                  <p className="text-[11px] text-slate-500 italic">No worries documented yet. Excellent mindset!</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {allWorries.map((w, i) => (
                      <span key={i} className="bg-amber-500/5 border border-amber-500/10 text-amber-300/80 text-[10px] px-2.5 py-1 rounded-lg">
                        {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Distractions array */}
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-rose-400 block mb-2">
                  👻 External Distractions ({allDistractions.length})
                </span>
                {allDistractions.length === 0 ? (
                  <p className="text-[11px] text-slate-500 italic">Zero stray distractions filed. Pristine environment!</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {allDistractions.map((d, i) => (
                      <span key={i} className="bg-rose-500/5 border border-rose-500/15 text-rose-400/80 text-[10px] px-2.5 py-1 rounded-lg">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-[10px] text-slate-400 leading-relaxed italic">
            💡 &quot;ডিস্ট্রাকশন লিখে সচেতনভাবে মনের সামনে আনলে পরবর্তী সেশনে মনোযোগ প্রায় দ্বিগুণ বৃদ্ধি পায়। এটি ট্র্যাকিং করুন নিয়মিত।&quot;
          </div>
        </div>
      </div>

      {/* Completed History List */}
      <div className="bg-slate-900/50 border border-white/5 p-6 rounded-xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-200">Completed Sessions History</h4>
            <p className="text-xs text-slate-500">Chronological archive of deep work flow states</p>
          </div>
          {logs.length > 0 && (
            <button
              onClick={() => {
                if (confirm('Are you absolutely sure you want to clear your entire history and reset your streak to zero? This action is irreversible.')) {
                  onClearLogs();
                }
              }}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 border border-rose-500/10 hover:border-rose-500/30 px-3 py-1.5 rounded-full transition-all bg-rose-500/5 hover:bg-rose-500/10 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset All Progress
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/5 rounded-xl">
            <Calendar className="w-8 h-8 text-slate-600 block mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-semibold">No successful sessions saved yet.</p>
            <p className="text-slate-500 text-xs mt-1">Pick a protocol, enter flow state, and fill ratings to write history!</p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
            {logs.map((log) => {
              const dateObj = new Date(log.timestamp);
              const formattedDate = dateObj.toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              const isNotesExpanded = selectedNotesSession === log.id;

              return (
                <div key={log.id} className="bg-slate-950 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all font-sans text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    {/* Protocol & Target */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">
                          {log.protocolTitle}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded">
                          {log.durationMinutes}m
                        </span>
                      </div>
                      <h5 className="text-sm font-semibold text-slate-200 mt-1 font-sans">
                        🎯 {log.target}
                      </h5>
                    </div>

                    {/* Timestamp */}
                    <span className="text-[10px] text-slate-500 font-mono">
                      {formattedDate}
                    </span>
                  </div>

                  {/* Ratings Row */}
                  <div className="flex items-center gap-3.5 flex-wrap text-[10.5px] mt-3">
                    <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Brain className="w-3 h-3" /> Focus: {log.focusRating}/10
                    </span>
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Energy: {log.energyRating}/10
                    </span>
                    {log.satisfactionRating && (
                      <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> Satisf: {log.satisfactionRating}/10
                      </span>
                    )}
                  </div>

                  {/* Remarks Notes expander toggle */}
                  {log.notes && (
                    <div className="mt-3">
                      <button
                        onClick={() => setSelectedNotesSession(isNotesExpanded ? null : log.id)}
                        className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-semibold"
                      >
                        {isNotesExpanded ? 'Collapse notes' : 'View session notes & reflections'}
                      </button>
                      {isNotesExpanded && (
                        <p className="text-xs text-slate-400 leading-relaxed bg-white/3 border border-white/5 rounded-xl p-3 mt-1.5 font-sans italic">
                          &quot;{log.notes}&quot;
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DEVELOPER TESTING PANEL (REQUIRED FOR ROBUST SPEC TESTING OVER TIME) */}
      <div className="bg-slate-900/50 border border-white/5 p-5 rounded-xl relative z-10 text-left font-sans">
        <div className="flex items-center gap-2 mb-2">
          <RotateCcw className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            Mock Console & Streak Sandbox
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          Use these triggers to instantly mock completed deep work on previous consecutive or skipped days. Excellent for testing the **&quot;Daily Streak Increments&quot;** index, and verifying how the **&quot;Streak resets to zero on missed days&quot;** constraint behaves!
        </p>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onAddMockSession(0)}
            className="bg-slate-900 border border-white/10 hover:border-cyan-500 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer duration-150"
          >
            ➕ Mock Today
          </button>
          <button
            onClick={() => onAddMockSession(1)}
            className="bg-slate-900 border border-white/10 hover:border-cyan-500 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer duration-150"
          >
            ➕ Mock Yesterday
          </button>
          <button
            onClick={() => onAddMockSession(2)}
            className="bg-slate-900 border border-white/10 hover:border-cyan-500 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer duration-150"
          >
            ➕ Mock 2 Days Ago
          </button>
          <button
            onClick={() => onAddMockSession(5)}
            className="bg-slate-900 border border-white/10 hover:border-cyan-500 text-slate-300 hover:text-white px-3 py-2 rounded-xl text-[11px] font-sans font-semibold flex items-center gap-1 cursor-pointer duration-150"
          >
            ➕ Mock 5 Days Ago (Break Streak!)
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
