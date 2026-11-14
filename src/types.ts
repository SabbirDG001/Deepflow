export type ProtocolType = 'sprint' | 'standard' | 'advanced' | 'master' | 'custom' | 'adhd';

export interface Phase {
  id: string;
  name: string;
  banglaName: string;
  category: 'prepare' | 'perform' | 'preserve';
  baseDurationMinutes: number; // Duration of this sub-phase
  description: string;
  banglaDescription: string;
  instructions: { text: string; done: boolean }[];
  activeTips: string[];
}

export interface Protocol {
  type: ProtocolType;
  title: string;
  banglaTitle: string;
  totalDurationMinutes: number;
  description: string;
  banglaDescription: string;
  phases: Phase[];
  isAdhd?: boolean;
}

export interface CompletedSession {
  id: string;
  timestamp: number; // epoch
  dateStr: string; // YYYY-MM-DD
  protocolType: ProtocolType;
  protocolTitle: string;
  durationMinutes: number;
  target: string;
  focusRating: number; // 1-10
  energyRating: number; // 1-10
  satisfactionRating?: number; // 1-10
  worries: string[];
  distractions: string[];
  notes: string;
}

export interface WorryItem {
  id: string;
  text: string;
  timestamp: number;
}

export interface DistractionItem {
  id: string;
  text: string;
  timestamp: number;
}
