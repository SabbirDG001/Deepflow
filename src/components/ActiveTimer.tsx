import React, { useState, useEffect, useRef } from 'react';
import { Protocol, Phase, CompletedSession } from '../types';
import { playSound, SOUND_PRESETS, SoundType } from '../utils/audio';
import { 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle2, 
  AlertTriangle,
  Flame, 
  Plus, 
  Trash2, 
  Sparkles, 
  Clock, 
  Brain, 
  Heart,
  Wind
} from 'lucide-react';

interface ActiveTimerProps {
  protocol: Protocol;
  target: string;
  onSetTarget: (target: string) => void;
  onSessionComplete: (completed: Omit<CompletedSession, 'id' | 'timestamp' | 'dateStr'>) => void;
  onAbort: () => void;
  activeSessionInProgress: boolean;
  setActiveSessionInProgress: (inProgress: boolean) => void;
  selectedSoundId: SoundType;
  onSelectSound: (soundId: SoundType) => void;
  onOpenBreathing: () => void;
}

export default function ActiveTimer({
  protocol,
  target,
  onSetTarget,
  onSessionComplete,
  onAbort,
  activeSessionInProgress,
  setActiveSessionInProgress,
  selectedSoundId,
  onSelectSound,
  onOpenBreathing
}: ActiveTimerProps) {
  // Config state (before entering flow)
  const [tempTarget, setTempTarget] = useState(target);
  const [prereqsChecked, setPrereqsChecked] = useState({
    bliss: false,
    resources: false,
    clarity: false,
  });

  // Current session tracking states
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const currentPhase = protocol.phases[currentPhaseIndex];
  const totalPhaseSeconds = currentPhase ? currentPhase.baseDurationMinutes * 60 : 60;
  const [timeLeft, setTimeLeft] = useState(totalPhaseSeconds);
  const [isPlaying, setIsPlaying] = useState(false);

  // Checklists inside the active phase
  const [checkedInstructions, setCheckedInstructions] = useState<{ [key: string]: boolean }>({});

  // Dynamic lists during session
  const [worries, setWorries] = useState<string[]>([]);
  const [worryInput, setWorryInput] = useState('');
  const [distractions, setDistractions] = useState<string[]>([]);
  const [distractionInput, setDistractionInput] = useState('');

  // Rating values for final Preservation preservation phase
  const [focusRating, setFocusRating] = useState(8);
  const [energyRating, setEnergyRating] = useState(8);
  const [satisfactionRating, setSatisfactionRating] = useState(8);
  const [sessionNotes, setSessionNotes] = useState('');

  // Box breathing micro-states (runs during recharge/breathing phase)
  const [breathingSecond, setBreathingSecond] = useState(0); // 0 to 15 cycle
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Screen Wake Lock API implementation
  const wakeLockRef = useRef<any | null>(null);

  useEffect(() => {
    async function requestWakeLock() {
      if ('wakeLock' in navigator && isPlaying) {
        try {
          if (!wakeLockRef.current) {
            wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
            console.log('Screen Wake Lock acquired successfully');
          }
        } catch (err) {
          console.error('Failed to acquire Screen Wake Lock:', err);
        }
      }
    }

    async function releaseWakeLock() {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
          console.log('Screen Wake Lock released successfully');
        } catch (err) {
          console.error('Failed to release Screen Wake Lock:', err);
        }
      }
    }

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isPlaying) {
        await requestWakeLock();
      }
    };

    if (isPlaying) {
      requestWakeLock();
      document.addEventListener('visibilitychange', handleVisibilityChange);
    } else {
      releaseWakeLock();
    }

    return () => {
      releaseWakeLock();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // Automatically reset timers whenever the protocol or active phase turns
  useEffect(() => {
    if (activeSessionInProgress && currentPhase) {
      setTimeLeft(currentPhase.baseDurationMinutes * 60);
      setIsPlaying(false);
      // Initialize instructions checklist
      const initialChecked: { [key: string]: boolean } = {};
      currentPhase.instructions.forEach((ins, idx) => {
        initialChecked[`${currentPhase.id}-${idx}`] = false;
      });
      setCheckedInstructions(initialChecked);
    }
  }, [currentPhaseIndex, protocol.type, activeSessionInProgress]);

  // Main countdown timer interval
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        
        // If in standard Box Breathing phase (category: perform, and contains "breathing" or "recharge")
        if (currentPhase && (currentPhase.id.includes('recharge') || currentPhase.name.toLowerCase().includes('breathing'))) {
          setBreathingSecond((prevSec) => (prevSec + 1) % 16);
        }
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      // Audio chime and transition
      handlePhaseEnd();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, timeLeft]);

  // Box breathing audio queues
  useEffect(() => {
    if (isPlaying && currentPhase && (currentPhase.id.includes('recharge') || currentPhase.name.toLowerCase().includes('breathing'))) {
      if (breathingSecond === 0) {
        playSound('beep'); // Inhale start
      } else if (breathingSecond === 4) {
        playSound('beep'); // Hold start
      } else if (breathingSecond === 8) {
        playSound('beep'); // Exhale start
      } else if (breathingSecond === 12) {
        playSound('beep'); // Hold empty start
      }
    }
  }, [breathingSecond, isPlaying]);

  const handlePhaseEnd = () => {
    setIsPlaying(false);
    playSound(selectedSoundId);
    if (currentPhaseIndex < protocol.phases.length - 1) {
      // Advance to next step
      setCurrentPhaseIndex((prev) => prev + 1);
    } else {
      // Last step finished (Preservation complete)
      // Automatically prompt to finalize below
      alert('Congratulations! You completed all phases of the protocol. Please fill out your Focus Rating to save your streak!');
    }
  };

  const handleSkipPhase = () => {
    playSound('beep');
    if (currentPhaseIndex < protocol.phases.length - 1) {
      setCurrentPhaseIndex((prev) => prev + 1);
    } else {
      alert('This is the final preservation / closing stage. Complete your ratings below to record the session!');
    }
  };

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempTarget.trim()) {
      alert('Please specify your exact focus target first!');
      return;
    }
    onSetTarget(tempTarget);
    setActiveSessionInProgress(true);
    setCurrentPhaseIndex(0);
    setTimeLeft(protocol.phases[0].baseDurationMinutes * 60);
    setIsPlaying(true);
    playSound('success');
  };

  const handleAddWorry = (e: React.FormEvent) => {
    e.preventDefault();
    if (worryInput.trim()) {
      setWorries((prev) => [...prev, worryInput.trim()]);
      setWorryInput('');
      playSound('beep');
    }
  };

  const handleAddDistraction = (e: React.FormEvent) => {
    e.preventDefault();
    if (distractionInput.trim()) {
      setDistractions((prev) => [...prev, distractionInput.trim()]);
      setDistractionInput('');
      playSound('beep');
    }
  };

  const handleFinalizeAndLog = () => {
    // Collect and fire
    onSessionComplete({
      protocolType: protocol.type,
      protocolTitle: protocol.title,
      durationMinutes: protocol.totalDurationMinutes,
      target: target,
      focusRating,
      energyRating,
      satisfactionRating,
      worries,
      distractions,
      notes: sessionNotes,
    });
    
    // Clear and abort
    setActiveSessionInProgress(false);
    setIsPlaying(false);
    setCurrentPhaseIndex(0);
    setWorries([]);
    setDistractions([]);
    setSessionNotes('');
    setPrereqsChecked({ bliss: false, resources: false, clarity: false });
    playSound('success');
  };

  // UI calculations
  const progressPercent = (timeLeft / totalPhaseSeconds) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Check if box breathing is currently happening
  const isBreathingActive = currentPhase && (currentPhase.id.includes('recharge') || currentPhase.name.toLowerCase().includes('breathing'));
  
  // Calculate Breathing label
  let breatheStateLabel = '';
  let breatheInstructions = '';
  let breatheStepColor = 'text-cyan-400';
  let breatheScaleClass = 'scale-100';

  if (isBreathingActive) {
    if (breathingSecond >= 0 && breathingSecond < 4) {
      breatheStateLabel = 'INHALE (৪ সেকেন্ড শ্বাস নিন)';
      breatheInstructions = 'ধীরে ধীরে ফুসফুস ভরে বিশুদ্ধ বাতাস টেনে নিন';
      breatheStepColor = 'text-cyan-400';
      breatheScaleClass = 'scale-125 bg-cyan-500/10 border-cyan-500/40';
    } else if (breathingSecond >= 4 && breathingSecond < 8) {
      breatheStateLabel = 'HOLD (৪ সেকেন্ড শ্বাস আটকে রাখুন)';
      breatheInstructions = 'ফুসফুসে শান্ত বাতাস আটকে মনোযোগ স্থির করুন';
      breatheStepColor = 'text-amber-400';
      breatheScaleClass = 'scale-[1.25] bg-amber-500/10 border-amber-500/40';
    } else if (breathingSecond >= 8 && breathingSecond < 12) {
      breatheStateLabel = 'EXHALE (৪ সেকেন্ড শ্বাস ছাড়ুন)';
      breatheInstructions = 'মুখ দিয়ে সমস্ত দুশ্চিন্তা ফুঁ দিয়ে বের করে দিন';
      breatheStepColor = 'text-blue-400';
      breatheScaleClass = 'scale-100 bg-blue-500/10 border-blue-500/40';
    } else {
      breatheStateLabel = 'HOLD EMPTY (৪ সেকেন্ড ফুসফুস খালি রাখুন)';
      breatheInstructions = 'শ্বাসহীন স্থির অবস্থায় নিজের মাইন্ড অবজার্ভ করুন';
      breatheStepColor = 'text-purple-400';
      breatheScaleClass = 'scale-100 bg-purple-500/10 border-purple-500/40';
    }
  }

  // Pre-requisites check list indicator
  const allPrereqsVerified = prereqsChecked.bliss && prereqsChecked.resources && prereqsChecked.clarity;

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Central Interactive Panel */}
      <section className="flex-1 relative flex flex-col items-center justify-start p-4 sm:p-8 overflow-y-auto">

        {!activeSessionInProgress ? (
          /* ================== SETUP CONFIGURATION PAGE ================== */
          <div className="w-full max-w-xl my-auto z-10 bg-slate-900/50 border border-white/5 rounded-xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.3em] mb-2">
                Flow Setup
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-100 tracking-tight">
                {protocol.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                {protocol.banglaDescription}
              </p>
            </div>

            <form onSubmit={handleStartSession} className="space-y-6">
              {/* Target Input */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5">
                <label className="block text-[11px] font-semibold text-cyan-400 uppercase tracking-widest mb-1.5">
                  Step 1: Define Target (এক্সাক্ট টার্গেট ঠিক করুন)
                </label>
                <input
                  type="text"
                  placeholder='যেমন: "ফিজিক্সের ২টা চ্যাপ্টার রিভিশন দেবো", "টাইপস্ক্রিপ্ট ইম্পোর্ট বাগ ফিক্স করবো"'
                  value={tempTarget}
                  onChange={(e) => setTempTarget(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 placeholder-slate-500 font-sans transition-all"
                  required
                />
              </div>

              {/* Pre-requisites Checklists */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-white/5">
                <label className="block text-[11px] font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
                  Step 2: Common Pre-requisite (সাধারণ প্রস্তুতি)
                </label>
                
                {/* Bliss Station */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={prereqsChecked.bliss}
                    onChange={(e) => setPrereqsChecked(prev => ({ ...prev, bliss: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-500 bg-white/10 border-white/20 focus:ring-0 mt-0.5 cursor-pointer accent-cyan-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">ব্লিস স্টেশন সেটআপ (Bliss Station)</span>
                    <span className="text-[11px] text-slate-400 leading-snug">কাজের ডেস্কে ফোন বা ক্ষতিকর স্ক্রিনের নোটিফিকেশন সম্পূর্ণ দূরে রাখুন।</span>
                  </div>
                </label>

                {/* Resource Collection */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={prereqsChecked.resources}
                    onChange={(e) => setPrereqsChecked(prev => ({ ...prev, resources: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-500 bg-white/10 border-white/20 focus:ring-0 mt-0.5 cursor-pointer accent-cyan-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">রিসোর্স কালেকশন (Resources)</span>
                    <span className="text-[11px] text-slate-400 leading-snug">পানির বোতল, কিছু বাদাম/খেজুর এবং কাজের প্রয়োজনীয় বই বা ফাইল আগেই ডেস্কে আনুন।</span>
                  </div>
                </label>

                {/* Verification */}
                <label className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 cursor-pointer border border-transparent hover:border-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={prereqsChecked.clarity}
                    onChange={(e) => setPrereqsChecked(prev => ({ ...prev, clarity: e.target.checked }))}
                    className="w-4 h-4 rounded text-cyan-500 bg-white/10 border-white/20 focus:ring-0 mt-0.5 cursor-pointer accent-cyan-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-200 block">লক্ষ্যের ক্ল্যারিটি (Clarity Check)</span>
                    <span className="text-[11px] text-slate-400 leading-snug">আমি নিশ্চিত যে কাজ শেষ না করে এই সেশন থেকে উঠে মোবাইল ফোনে হাত দেবো না।</span>
                  </div>
                </label>
              </div>

              {/* Chime Sound Selector */}
              <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-2.5 font-sans">
                <div className="flex justify-between items-center">
                  <label className="block text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">
                    Step 3: Finish Chime Sound (সমাপ্তি সুর নির্ধারণ)
                  </label>
                  <button
                    type="button"
                    onClick={() => playSound(selectedSoundId)}
                    className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Test Chime Sound"
                  >
                    🔊 Test Sound
                  </button>
                </div>
                <div className="relative">
                  <select
                    value={selectedSoundId}
                    onChange={(e) => onSelectSound(e.target.value as SoundType)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-sans transition-all appearance-none cursor-pointer"
                  >
                    {SOUND_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id} className="bg-slate-900 text-slate-100">
                        {preset.label} — {preset.banglaLabel}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                    <svg className="fill-current h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-snug">
                  প্রতিটি ধাপ বা ব্রেক শেষ হলে এই সুরটি বেজে উঠবে এবং পরবর্তী ধাপে মনোযোগ স্থানান্তর করার সংকেত দেবে।
                </p>
              </div>

              {/* Start Button */}
              <button
                type="submit"
                disabled={!allPrereqsVerified}
                className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-2 font-semibold tracking-wide transition-all uppercase text-xs sm:text-sm ${
                  allPrereqsVerified
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                DIVE INTO DEEP FLOW ({protocol.totalDurationMinutes} Min)
              </button>
            </form>
          </div>
        ) : (
          /* ================== FLIGHT / RUNNING SESSION TIMER PAGE ================== */
          <div className="w-full flex flex-col items-center justify-start z-10">
            {/* Top Navigation / Escape Route */}
            <div className="w-full flex justify-between items-center mb-6 px-2">
              <div className="text-left">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-purple-400 block">
                  Active Goal
                </span>
                <span className="text-sm font-semibold text-slate-200 font-sans tracking-tight block">
                  🎯 {target}
                </span>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to abort the current protocol? This will interrupt your active streak and reset your progress.')) {
                    setIsPlaying(false);
                    setActiveSessionInProgress(false);
                    onAbort();
                  }
                }}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 border border-rose-400/10 hover:border-rose-400/30 px-3.5 py-1.5 rounded-full transition-all bg-rose-500/5 hover:bg-rose-500/10"
              >
                Abort Flow
              </button>
            </div>

            {/* Current Phase Highlight Panel */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-3">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 text-xs font-semibold uppercase tracking-[0.25em]">
                  {currentPhaseIndex + 1} of {protocol.phases.length}: {currentPhase.name}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-slate-300 tracking-tight font-sans">
                {currentPhase.banglaName} — {currentPhase.baseDurationMinutes}মিনিট
              </h4>
            </div>

            {/* MAIN TIMER CARD */}
            <div className="flex flex-col items-center justify-center gap-8 w-full max-w-sm">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-2 border-white/5 flex items-center justify-center relative bg-slate-900/10">
                {/* SVG Timer Loop */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.03)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="47%"
                    fill="none"
                    stroke="url(#timerGrad)"
                    strokeWidth="5"
                    strokeDasharray="1000"
                    strokeDashoffset={1000 - (1000 * progressPercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                  <defs>
                    <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#f4f4f5', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#a1a1aa', stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Box Breathing Scale Visualizer Overlay */}
                {isBreathingActive && (
                  <div className={`absolute inset-8 rounded-full border border-dashed transition-all duration-1000 flex items-center justify-center ${breatheScaleClass}`}>
                    <Wind className={`w-8 h-8 ${breatheStepColor} opacity-50 animate-pulse`} />
                  </div>
                )}

                {/* Inner Counter Figures */}
                <div className="flex flex-col items-center z-10">
                  <span className={`text-5xl sm:text-6xl font-light font-mono tracking-tighter text-white select-none ${!isPlaying ? 'opacity-70 animate-pulse' : ''}`}>
                    {formattedTime}
                  </span>
                  <span className="text-slate-500 uppercase tracking-[0.15em] text-[10px] mt-2 block">
                    {isPlaying ? 'Seconds Remaining' : 'Session Paused'}
                  </span>
                  {'wakeLock' in navigator && isPlaying && (
                    <div className="mt-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-semibold text-emerald-400 uppercase tracking-widest animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span>Always-On Active</span>
                    </div>
                  )}
                </div>

                {/* Micro Action Controllers Hanging from bottom of circle */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      playSound('beep');
                    }}
                    title={isPlaying ? 'Pause' : 'Start'}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                      isPlaying
                        ? 'bg-slate-800 border border-white/20 text-white'
                        : 'bg-cyan-500 text-slate-950'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={handleSkipPhase}
                    title="Skip Current Phase (Fast Forward)"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-slate-300 hover:bg-white/10 transition-transform cursor-pointer"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Box Breathing Guide Widget (Shows only in Breathe Phase) */}
            {isBreathingActive && (
              <div className="w-full max-w-md mt-10 bg-slate-900 border border-cyan-500/20 rounded-xl p-4 text-center animate-fade-in z-10">
                <span className={`text-xs font-semibold tracking-widest block uppercase mb-1 ${breatheStepColor}`}>
                  {breatheStateLabel}
                </span>
                <p className="text-xs text-slate-400 mt-1 italic font-sans leading-relaxed">
                  &quot;{breatheInstructions}&quot;
                </p>
                
                {/* 4 Steps Indicator Bar */}
                <div className="grid grid-cols-4 gap-1.5 mt-3.5">
                  <div className={`h-1.5 rounded-full ${breathingSecond < 4 ? 'bg-cyan-400' : 'bg-white/10'}`}></div>
                  <div className={`h-1.5 rounded-full ${breathingSecond >= 4 && breathingSecond < 8 ? 'bg-amber-400' : 'bg-white/10'}`}></div>
                  <div className={`h-1.5 rounded-full ${breathingSecond >= 8 && breathingSecond < 12 ? 'bg-blue-400' : 'bg-white/10'}`}></div>
                  <div className={`h-1.5 rounded-full ${breathingSecond >= 12 ? 'bg-purple-400' : 'bg-white/10'}`}></div>
                </div>
              </div>
            )}

            {/* WORRY POSTPONEMENT INTERACTION (Only in WORK (Perform) phases) */}
            {currentPhase && currentPhase.category === 'perform' && !isBreathingActive && (
              <div className="w-full max-w-md mt-10 bg-slate-900/80 border border-white/5 rounded-xl p-5 z-10 font-sans">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Worry Postponement (চিন্তা স্থগিতকরণ)
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  কাজের সময় মাথায় হঠাৎ কোনো ভিন্ন চিন্তা, বিল দেওয়ার কথা বা র্যান্ডম কাজ মনে পড়লে নিচে লিখে স্থগিত করে দিন যাতে মাথা চাপমুক্ত থাকে।
                </p>
                <form onSubmit={handleAddWorry} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="মনে পড়া অন্য কাজটি দ্রুত খাতায় লিখুন..."
                    value={worryInput}
                    onChange={(e) => setWorryInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-amber-400 text-slate-100 placeholder-slate-500 transition-all font-sans"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 duration-100 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Postpone
                  </button>
                </form>

                {/* Worries list */}
                {worries.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/5 max-h-24 overflow-y-auto space-y-1.5">
                    {worries.map((w, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white/3 rounded-lg px-2.5 py-1.5 text-xs border border-white/5">
                        <span className="text-slate-300 font-sans line-clamp-1 italic">📌 {w}</span>
                        <button
                          type="button"
                          onClick={() => setWorries((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PRESERVE & RATING FORM PANEL (Appears anytime but crucial in final Preservation stage) */}
            {(currentPhase && currentPhase.category === 'preserve') && (
              <div className="w-full max-w-md mt-10 bg-slate-950 border border-white/10 rounded-xl p-5 sm:p-6 z-10 font-sans">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-semibold tracking-widest text-cyan-400 uppercase">
                    Preservation Phase: Log & Lock Streak
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  চমৎকার! সেশনের শেষ ধাপে ডিস্ট্রাকশন লক করুন এবং আপনার ফোকাস রেটিং ফিল-আপ করে স্ট্রিক সংরক্ষণ করুন।
                </p>

                <div className="space-y-4">
                  {/* Distractions input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                      Log Obstacles (আজকের ডিস্ট্রাকশনগুলো কী কী ছিল?)
                    </label>
                    <form onSubmit={handleAddDistraction} className="flex gap-2">
                      <input
                        type="text"
                        placeholder='যেমন: "ফেসবুক নোটিফিকেশন", "পাশের ঘরের আওয়াজ"'
                        value={distractionInput}
                        onChange={(e) => setDistractionInput(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-cyan-500 text-slate-100 placeholder-slate-500 transition-all font-sans"
                      />
                      <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Log
                      </button>
                    </form>

                    {distractions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                        {distractions.map((d, idx) => (
                          <span key={idx} className="bg-red-500/10 border border-red-500/20 text-red-300 text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 font-sans font-medium">
                            👻 {d}
                            <button
                              type="button"
                              onClick={() => setDistractions((prev) => prev.filter((_, i) => i !== idx))}
                              className="text-red-400 hover:text-red-200"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Focus Rating slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Focus Rating (মনোযোগ):</span>
                      <span className="text-cyan-400 font-mono font-semibold text-sm bg-cyan-400/10 px-2 py-0.5 rounded">
                        {focusRating}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={focusRating}
                      onChange={(e) => setFocusRating(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Energy Rating slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Energy & Motivation (শক্তি):</span>
                      <span className="text-cyan-400 font-mono font-semibold text-sm bg-cyan-400/10 px-2 py-0.5 rounded">
                        {energyRating}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energyRating}
                      onChange={(e) => setEnergyRating(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Satisfaction Rating slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-300 font-semibold">Satisfaction (সন্তুষ্টি):</span>
                      <span className="text-cyan-400 font-mono font-semibold text-sm bg-cyan-400/10 px-2 py-0.5 rounded">
                        {satisfactionRating}/10
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={satisfactionRating}
                      onChange={(e) => setSatisfactionRating(parseInt(e.target.value))}
                      className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Remarks Notes input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                      Session Notes & Insights (সংক্ষিপ্ত মন্তব্য)
                    </label>
                    <textarea
                      placeholder="সেশনটি শেষ করার পর কেমন লাগছে বা কী অর্জন হলো..."
                      rows={2}
                      value={sessionNotes}
                      onChange={(e) => setSessionNotes(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-650 focus:outline-none focus:border-cyan-500 font-sans resize-none transition-all"
                    />
                  </div>

                  {/* Confirm Complete button */}
                  <button
                    type="button"
                    onClick={handleFinalizeAndLog}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-3.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-widest duration-100 mt-2 flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-slate-950" />
                    Complete, Save & Lock Streak
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Phase Horizontal Nav Indicators wrapper */}
            <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-3xl mt-12 gap-3.5 px-2">
              {protocol.phases.map((ph, idx) => {
                const isActive = idx === currentPhaseIndex;
                const isPassed = idx < currentPhaseIndex;
                return (
                  <div
                    key={ph.id}
                    className={`p-3.5 rounded-xl border transition-all text-left ${
                      isActive
                        ? 'bg-cyan-500/10 border-cyan-500/50'
                        : isPassed
                        ? 'bg-emerald-500/5 border-emerald-500/10 opacity-70'
                        : 'bg-white/5 border-white/5 opacity-30'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[9px] uppercase font-semibold tracking-widest ${
                        isActive ? 'text-cyan-400' : isPassed ? 'text-emerald-400' : 'text-slate-500'
                      }`}>
                        Step 0{idx + 1}
                      </span>
                      {isPassed && <span className="text-[9px] text-emerald-400 font-semibold font-sans">COMPLETED</span>}
                      {isActive && <span className="text-[9px] text-cyan-400 font-semibold animate-pulse">ACTIVE</span>}
                    </div>
                    <span className={`text-xs font-semibold font-sans line-clamp-1 block ${
                      isActive ? 'text-slate-100 font-semibold' : isPassed ? 'text-slate-400 font-semibold' : 'text-slate-500'
                    }`}>
                      {ph.name}
                    </span>
                    
                    {/* Micro Progress Line inside segment */}
                    <div className="w-full h-1 bg-white/5 mt-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${
                          isActive ? 'bg-cyan-400 w-1/2' : isPassed ? 'bg-emerald-400 w-full' : 'bg-transparent'
                        }`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Right Instructions / Checklist Sidebar (only shows during live running session) */}
      <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 bg-slate-900/40 p-5 sm:p-6 flex flex-col h-full overflow-y-auto">
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-4 px-2">
          Step Instructions
        </h2>

        {activeSessionInProgress && currentPhase ? (
          <div className="flex flex-col gap-4 font-sans">
            {/* Quick Link to Breathing Modal */}
            <button
              type="button"
              onClick={onOpenBreathing}
              className="w-full h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer mb-2"
              title="Open full Box Breathing Modal Guide"
            >
              <Wind className="w-4 h-4" />
              Breathing Guide (বক্স ব্রিদিং গাইড)
            </button>
            {currentPhase.instructions.map((ins, idx) => {
              const key = `${currentPhase.id}-${idx}`;
              const isChecked = checkedInstructions[key] || false;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCheckedInstructions((prev) => ({
                      ...prev,
                      [key]: !isChecked,
                    }));
                  }}
                  className={`flex gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-400 line-through decoration-slate-500/40'
                      : 'bg-white/5 border-white/5 text-slate-200 hover:border-white/10'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isChecked ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400' : 'border-slate-500 text-transparent'
                  }`}>
                    {isChecked && <span className="text-[10px] font-semibold">✓</span>}
                  </div>
                  <p className="text-xs leading-relaxed font-medium">
                    {ins.text}
                  </p>
                </div>
              );
            })}

            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Phase Context & Wisdom
              </h4>
              <div className="space-y-4">
                {currentPhase.activeTips.map((tip, idx) => (
                  <div key={idx} className="text-[11px] text-slate-400 leading-relaxed bg-white/2 p-3 rounded-xl border border-white/5 font-sans italic">
                    &quot;{tip}&quot;
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center my-auto p-4 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
              Start one of the four protocols to inspect specific checklist instructions and expert mental state guidelines dynamically.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
