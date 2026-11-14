import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProtocolSelector from './components/ProtocolSelector';
import ActiveTimer from './components/ActiveTimer';
import SessionLogs from './components/SessionLogs';
import { DEEP_WORK_PROTOCOLS } from './data';
import { ProtocolType, CompletedSession, Protocol } from './types';
import { Clock, Info, ExternalLink, Wind } from 'lucide-react';
import { generateCustomProtocol } from './utils/protocolGenerator';
import BoxBreathingModal from './components/BoxBreathingModal';
import { SoundType } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'timer' | 'logs'>('timer');
  const [selectedProtocolType, setSelectedProtocolType] = useState<string>('standard');
  const [target, setTarget] = useState('');
  const [activeSessionInProgress, setActiveSessionInProgress] = useState(false);
  const [logs, setLogs] = useState<CompletedSession[]>([]);
  const [streak, setStreak] = useState(0);

  // Custom protocols state & selected sound setting
  const [customProtocols, setCustomProtocols] = useState<Protocol[]>([]);
  const [selectedSoundId, setSelectedSoundId] = useState<SoundType>(() => {
    try {
      return (localStorage.getItem('deepflow_selected_sound') as SoundType) || 'zen-bell';
    } catch {
      return 'zen-bell';
    }
  });

  const [isBreathingModalOpen, setIsBreathingModalOpen] = useState(false);

  // Combine standard and custom protocols
  const allProtocols = [...DEEP_WORK_PROTOCOLS, ...customProtocols];

  // Selected protocol object
  const currentProtocol = allProtocols.find(
    (p) => p.title === selectedProtocolType || p.type === selectedProtocolType
  ) || DEEP_WORK_PROTOCOLS[1];

  // Load custom protocols from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('deepflow_custom_protocols');
      if (stored) {
        setCustomProtocols(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load custom protocols from storage', e);
    }
  }, []);

  // Sync / Save selected sound setting
  const handleSelectSound = (soundId: SoundType) => {
    setSelectedSoundId(soundId);
    try {
      localStorage.setItem('deepflow_selected_sound', soundId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateCustomProtocol = (minutes: number) => {
    const newProto = generateCustomProtocol(minutes);
    // If we already have one with this exact duration, just select it
    if (customProtocols.some((p) => p.totalDurationMinutes === minutes)) {
      const existing = customProtocols.find((p) => p.totalDurationMinutes === minutes);
      if (existing) {
        setSelectedProtocolType(existing.title);
      }
      return;
    }
    const updated = [...customProtocols, newProto];
    setCustomProtocols(updated);
    try {
      localStorage.setItem('deepflow_custom_protocols', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setSelectedProtocolType(newProto.title); // Auto-select on creation
  };

  const handleDeleteCustomProtocol = (title: string) => {
    const updated = customProtocols.filter((p) => p.title !== title);
    setCustomProtocols(updated);
    try {
      localStorage.setItem('deepflow_custom_protocols', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    if (selectedProtocolType === title) {
      setSelectedProtocolType('standard');
    }
  };

  // Load logs on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('deepflow_completed_sessions');
      if (stored) {
        const parsed = JSON.parse(stored) as CompletedSession[];
        setLogs(parsed);
      }
    } catch (e) {
      console.error('Failed to load sessions from local storage', e);
    }
  }, []);

  // Sync / Calculate streak anytime logs change
  useEffect(() => {
    const calculateStreak = (sessions: CompletedSession[]): number => {
      if (sessions.length === 0) return 0;
      
      // Unique sorted dates list
      const dates = Array.from(new Set(sessions.map((s) => s.dateStr))).sort();
      
      // Current date info in local format
      const todayStr = new Date().toISOString().split('T')[0];
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const lastCompletedDate = dates[dates.length - 1];

      // Reset streak if last completion wasn't today or yesterday
      if (lastCompletedDate !== todayStr && lastCompletedDate !== yesterdayStr) {
        return 0;
      }

      let count = 0;
      // Start back-walking anchor from whichever date was completed last (today or yesterday)
      const currentAnchor = lastCompletedDate === todayStr ? new Date() : yesterday;

      while (true) {
        const checkStr = currentAnchor.toISOString().split('T')[0];
        if (dates.includes(checkStr)) {
          count++;
          // Step 1 day back
          currentAnchor.setDate(currentAnchor.getDate() - 1);
        } else {
          break;
        }
      }
      return count;
    };

    const calculatedStreak = calculateStreak(logs);
    setStreak(calculatedStreak);

    // Save to local storage
    try {
      localStorage.setItem('deepflow_completed_sessions', JSON.stringify(logs));
    } catch (e) {
      console.error('Failed to save sessions to local storage', e);
    }
  }, [logs]);

  // Complete session handler
  const handleSessionComplete = (
    completed: Omit<CompletedSession, 'id' | 'timestamp' | 'dateStr'>
  ) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newSession: CompletedSession = {
      ...completed,
      id: `session-${Date.now()}`,
      timestamp: Date.now(),
      dateStr: todayStr,
    };

    setLogs((prev) => [newSession, ...prev]);
    setActiveTab('logs');
  };

  const handleAbortSession = () => {
    setTarget('');
  };

  const handleClearLogs = () => {
    setLogs([]);
    setStreak(0);
  };

  // Safe developer sandbox mock completion
  const handleAddMockSession = (daysAgo: number) => {
    const mockDate = new Date();
    mockDate.setDate(mockDate.getDate() - daysAgo);
    const mockDateStr = mockDate.toISOString().split('T')[0];

    // Pick dynamic protocol properties
    const testProtocol = DEEP_WORK_PROTOCOLS[Math.floor(Math.random() * DEEP_WORK_PROTOCOLS.length)];

    const mockSession: CompletedSession = {
      id: `mock-${Date.now()}-${daysAgo}`,
      timestamp: mockDate.getTime(),
      dateStr: mockDateStr,
      protocolType: testProtocol.type,
      protocolTitle: testProtocol.title,
      durationMinutes: testProtocol.totalDurationMinutes,
      target: `Mock Task - ${testProtocol.title} (${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago)`,
      focusRating: Math.floor(Math.random() * 3) + 8, // 8-10 rating
      energyRating: Math.floor(Math.random() * 3) + 7, // 7-9 rating
      satisfactionRating: Math.floor(Math.random() * 3) + 8, // 8-10
      worries: daysAgo % 2 === 0 ? ['Mock worry postponed during deep flow'] : [],
      distractions: daysAgo % 3 === 0 ? ['Mock distraction logged successfully'] : [],
      notes: `Simulated sandbox log created to test the ${daysAgo} days ago streak calculation.`,
    };

    setLogs((prev) => {
      // Avoid inserting multiple mocks for exact same date to prevent confusion
      const filters = prev.filter((s) => s.dateStr !== mockDateStr);
      return [mockSession, ...filters].sort((a, b) => b.timestamp - a.timestamp);
    });
  };

  // Stats summation for header display
  const totalMinutes = logs.reduce((acc, curr) => acc + curr.durationMinutes, 0);
  const totalHours = totalMinutes / 60;
  const totalCompleted = logs.length;

  return (
    <div className="min-h-screen lg:h-screen bg-slate-950 text-slate-100 flex flex-col font-sans lg:overflow-hidden">
      {/* Main Core Header bar */}
      <Header
        streak={streak}
        totalHours={totalHours}
        totalSessions={totalCompleted}
        onOpenLogs={() => setActiveTab('logs')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBreathing={() => setIsBreathingModalOpen(true)}
      />

      {/* Grid Layout Space */}
      <main className="flex-1 lg:min-h-0 flex flex-col lg:flex-row overflow-hidden relative z-10">
        {activeTab === 'timer' ? (
          <>
            {/* Sidebar Protocol selection */}
            <ProtocolSelector
              selectedType={selectedProtocolType}
              onSelect={setSelectedProtocolType}
              activeSessionInProgress={activeSessionInProgress}
              customProtocols={customProtocols}
              onCreateCustom={handleCreateCustomProtocol}
              onDeleteCustom={handleDeleteCustomProtocol}
              onOpenBreathing={() => setIsBreathingModalOpen(true)}
            />

            {/* Core Interactive Countdown Clock */}
            <ActiveTimer
              protocol={currentProtocol}
              target={target}
              onSetTarget={setTarget}
              onSessionComplete={handleSessionComplete}
              onAbort={handleAbortSession}
              activeSessionInProgress={activeSessionInProgress}
              setActiveSessionInProgress={setActiveSessionInProgress}
              selectedSoundId={selectedSoundId}
              onSelectSound={handleSelectSound}
              onOpenBreathing={() => setIsBreathingModalOpen(true)}
            />
          </>
        ) : (
          /* Persistent Log Vault */
          <SessionLogs
            logs={logs}
            streak={streak}
            onClearLogs={handleClearLogs}
            onAddMockSession={handleAddMockSession}
          />
        )}
      </main>

      {/* Floating Auxiliary Breathing trigger for easy reach */}
      <button
        onClick={() => setIsBreathingModalOpen(true)}
        className="fixed bottom-14 right-4 sm:right-6 h-11 z-40 bg-slate-900 border border-white/10 hover:border-white/25 hover:text-white transition-colors duration-150 text-slate-300 px-4 rounded-full flex items-center justify-center gap-2 group text-xs font-semibold"
        title="Interactive Box Breathing"
      >
        <Wind className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
        <span>Breathing Guide</span>
      </button>

      <BoxBreathingModal
        isOpen={isBreathingModalOpen}
        onClose={() => setIsBreathingModalOpen(false)}
      />

      {/* Minimal Footer Signature (Architectural integrity, humble and human) */}
      <footer className="h-9 shrink-0 border-t border-white/5 bg-slate-950 flex items-center justify-between px-4 sm:px-8 text-[10px] text-slate-600 font-mono tracking-wide">
        <span>DeepFlow Protocol Framework</span>
        <span className="flex items-center gap-1">
          Designed based on science-backed attention limits
        </span>
      </footer>
    </div>
  );
}
