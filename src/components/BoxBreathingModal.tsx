import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/audio';
import { X, Play, Pause, RefreshCw, Volume2, VolumeX, Wind } from 'lucide-react';

interface BoxBreathingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreatheState = 'inhale' | 'hold' | 'exhale' | 'holdEmpty';

export default function BoxBreathingModal({ isOpen, onClose }: BoxBreathingModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [breatheState, setBreatheState] = useState<BreatheState>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Restart cycle when opened
  useEffect(() => {
    if (isOpen) {
      setBreatheState('inhale');
      setSecondsLeft(4);
      setIsPlaying(true);
    }
  }, [isOpen]);

  // Main tick interval
  useEffect(() => {
    if (!isOpen) return;

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition to next state
            setBreatheState((currentState) => {
              let nextState: BreatheState = 'inhale';
              if (currentState === 'inhale') {
                nextState = 'hold';
              } else if (currentState === 'hold') {
                nextState = 'exhale';
              } else if (currentState === 'exhale') {
                nextState = 'holdEmpty';
              } else {
                nextState = 'inhale';
              }

              // Play gentle boundary sound cue
              if (soundEnabled) {
                if (nextState === 'inhale') playSound('beep');
                else if (nextState === 'hold') playSound('beep');
                else if (nextState === 'exhale') playSound('beep');
                else if (nextState === 'holdEmpty') playSound('beep');
              }

              return nextState;
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen, isPlaying, soundEnabled]);

  if (!isOpen) return null;

  // Render variables depending on state
  let actionTitle = '';
  let actionBangla = '';
  let actionDesc = '';
  let actionBanglaDesc = '';
  let colorTheme = '';
  let bubbleClasses = '';

  if (breatheState === 'inhale') {
    actionTitle = 'Inhale';
    actionBangla = 'শ্বাস ভিতরে নিন (৪ সেকেন্ড)';
    actionDesc = 'Breath in slowly and deep, feeling the cool air fill up your lungs.';
    actionBanglaDesc = 'ধীরে ধীরে নাক দিয়ে শান্ত বাতাস ফুসফুসে টেনে নিন।';
    colorTheme = 'text-cyan-400 border-cyan-500';
    // Slowly enlarges
    bubbleClasses = 'scale-125 bg-cyan-500/20 border-cyan-400/40 duration-[4000ms]';
  } else if (breatheState === 'hold') {
    actionTitle = 'Hold Breath';
    actionBangla = 'শ্বাস আটকে রাখুন (৪ সেকেন্ড)';
    actionDesc = 'Hold clean oxygen in your core, stabilizing your nervous system.';
    actionBanglaDesc = 'মুখ-নাক বন্ধ করে ৩ সেকেন্ড চোখের কোণে বা একটা বিন্দুতে ফোকাস করুন।';
    colorTheme = 'text-amber-400 border-amber-500';
    // Stays large and glows
    bubbleClasses = 'scale-125 bg-amber-500/25 border-amber-400/40 duration-1000 animate-pulse';
  } else if (breatheState === 'exhale') {
    actionTitle = 'Exhale';
    actionBangla = 'শ্বাস সম্পূর্ণরূপে ছাড়ুন (৪ সেকেন্ড)';
    actionDesc = 'Sigh out slowly through your mouth, letting go of any accumulated tension.';
    actionBanglaDesc = 'ধীরেসুস্থে ঠোঁট গোল করে ফুঁ দিয়ে সমস্ত স্ট্রেস বা চাপ বের করে দিন।';
    colorTheme = 'text-blue-400 border-blue-500';
    // Back to small
    bubbleClasses = 'scale-75 bg-blue-500/20 border-blue-400/40 duration-[4000ms]';
  } else {
    actionTitle = 'Hold Empty';
    actionBangla = 'শ্বাসহীন স্থির অবস্থা (৪ সেকেন্ড)';
    actionDesc = 'Stay fully empty and quiet, experiencing absolute calmness and stillness.';
    actionBanglaDesc = 'শ্বাসহীন অবস্থায় একদম শান্ত থাকুন, ব্রেইনের বিশ্রাম অনুভব করুন।';
    colorTheme = 'text-purple-400 border-purple-500';
    // Small and still
    bubbleClasses = 'scale-75 bg-purple-500/15 border-purple-400/30 duration-1000';
  }

  const resetCycle = () => {
    setBreatheState('inhale');
    setSecondsLeft(4);
    setIsPlaying(true);
    playSound('beep');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 transition-opacity duration-300">
      <div 
        id="box-breathing-modal"
        className="relative w-full max-w-xl overflow-hidden rounded-xl bg-slate-900 border border-white/10 p-6 sm:p-8 flex flex-col items-center justify-between animate-fade-in"
      >
        {/* Decorative Background grid lines */}

        {/* Modal Header */}
        <div className="w-full flex justify-between items-center z-10 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Wind className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100 tracking-tight font-sans">
                Box Breathing Technique
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">৪-৪-৪-৪ রিফ্লেক্স রিচার্জ</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-colors"
            title="Close Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Breathing Box Animation Area */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center my-6">
          
          {/* THE BOX BRACKETS (Clockwise perimeter lighting layout) */}
          <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none"></div>

          {/* Left Line: Inhale Segment */}
          <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 ${
            breatheState === 'inhale' ? 'bg-cyan-400 h-full opacity-100' : 'bg-transparent h-0 opacity-20'
          }`}></div>

          {/* Top Line: Hold Segment */}
          <div className={`absolute left-0 right-0 top-0 h-1 rounded-t-xl transition-all duration-300 ${
            breatheState === 'hold' ? 'bg-amber-400 w-full opacity-100' : 'bg-transparent w-0 opacity-20'
          }`}></div>

          {/* Right Line: Exhale Segment */}
          <div className={`absolute right-0 top-0 bottom-0 w-1 rounded-r-xl transition-all duration-300 ${
            breatheState === 'exhale' ? 'bg-blue-400 h-full opacity-100' : 'bg-transparent h-0 opacity-20'
          }`}></div>

          {/* Bottom Line: Hold Empty Segment */}
          <div className={`absolute left-0 right-0 bottom-0 h-1 rounded-b-xl transition-all duration-300 ${
            breatheState === 'holdEmpty' ? 'bg-purple-400 w-full opacity-100' : 'bg-transparent w-0 opacity-20'
          }`}></div>

          {/* Pulsing Breathing Bubble Inner Circle */}
          <div className={`w-36 h-36 rounded-full border border-dashed flex items-center justify-center transition-all ease-in-out pointer-events-none ${bubbleClasses}`}>
            {/* Center Circle Figure for the count */}
            <div className={`w-20 h-20 rounded-full bg-slate-950 flex flex-col items-center justify-center border border-white/10`}>
              <span className={`text-4xl font-extralight font-mono -mb-1 ${colorTheme.split(' ')[0]}`}>
                {secondsLeft}s
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500">
                {breatheState}
              </span>
            </div>
          </div>

          {/* 4 dots representing current vertex */}
          <div className={`absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-purple-400 transition-all ${breatheState === 'holdEmpty' ? 'scale-150 animate-ping' : 'scale-70 opacity-40'}`}></div>
          <div className={`absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-cyan-400 transition-all ${breatheState === 'inhale' ? 'scale-150 animate-ping' : 'scale-70 opacity-40'}`}></div>
          <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-400 transition-all ${breatheState === 'hold' ? 'scale-150 animate-ping' : 'scale-70 opacity-40'}`}></div>
          <div className={`absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-blue-400 transition-all ${breatheState === 'exhale' ? 'scale-150 animate-ping' : 'scale-70 opacity-40'}`}></div>
        </div>

        {/* Phase Instructions Panel */}
        <div className="w-full text-center px-4 max-w-sm mb-4">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/5 mb-2.5">
            <span className={`text-xs font-semibold uppercase tracking-widest font-mono text-center block ${colorTheme.split(' ')[0]}`}>
              {actionTitle} Phase
            </span>
          </div>
          
          <h4 className="text-md sm:text-lg font-semibold text-slate-100 tracking-tight font-sans">
            {actionBangla}
          </h4>
          <p className="text-xs text-cyan-400 font-semibold mb-1 font-sans italic mt-1 bg-cyan-500/5 py-1 px-3 rounded-lg border border-cyan-400/10">
            {actionBanglaDesc}
          </p>
          <p className="text-[11px] text-slate-400 font-sans leading-relaxed mt-2.5">
            {actionDesc}
          </p>
        </div>

        {/* Interactive Bar Indicator */}
        <div className="w-full max-w-xs grid grid-cols-4 gap-1.5 my-3 h-1.5 px-4">
          <div className={`h-full rounded-full transition-all duration-300 ${breatheState === 'inhale' ? 'bg-cyan-400' : 'bg-white/5'}`}></div>
          <div className={`h-full rounded-full transition-all duration-300 ${breatheState === 'hold' ? 'bg-amber-400' : 'bg-white/5'}`}></div>
          <div className={`h-full rounded-full transition-all duration-300 ${breatheState === 'exhale' ? 'bg-blue-400' : 'bg-white/5'}`}></div>
          <div className={`h-full rounded-full transition-all duration-300 ${breatheState === 'holdEmpty' ? 'bg-purple-400' : 'bg-white/5'}`}></div>
        </div>

        {/* Modal Action Footer Panel */}
        <div className="w-full border-t border-white/5 pt-4 flex justify-between items-center gap-3 z-10 font-sans">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5 text-xs font-medium"
              title={isPlaying ? 'Pause Cycle' : 'Resume Cycle'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" /> <span className="text-emerald-400 font-semibold">Resume</span>
                </>
              )}
            </button>

            <button
              onClick={resetCycle}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:text-white hover:border-white/20 text-slate-300 transition-all flex items-center justify-center font-medium"
              title="Restart Cycle"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-medium ${
              soundEnabled 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                : 'bg-white/5 border-white/10 text-slate-500'
            }`}
            title={soundEnabled ? 'Mute Chimes' : 'Unmute Chimes'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4" /> <span className="hidden sm:inline">Sound Cue</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" /> <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
