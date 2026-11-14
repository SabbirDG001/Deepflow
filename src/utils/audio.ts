export type SoundType = 
  | 'beep' 
  | 'success' 
  | 'alert' 
  | 'inhale' 
  | 'exhale' 
  | 'hold'
  | 'zen-bell'
  | 'digital-harp'
  | 'dream-flute'
  | 'low-beep';

export interface SoundPreset {
  id: SoundType;
  label: string;
  banglaLabel: string;
}

export const SOUND_PRESETS: SoundPreset[] = [
  { id: 'zen-bell', label: 'Tibetan Singing Bowl', banglaLabel: 'তিব্বতি ঘণ্টা (ধ্যানমগ্ন)' },
  { id: 'digital-harp', label: 'Sparkling Digital Harp', banglaLabel: 'ডিজিটাল হার্প (মিষ্টি সুর)' },
  { id: 'dream-flute', label: 'Gentle Dream Flute', banglaLabel: 'সৌম্য বাঁশি (স্বস্তির টোন)' },
  { id: 'success', label: 'Choral Arpeggio', banglaLabel: 'কোরাল সুর (সফল সমাপ্তি)' },
  { id: 'alert', label: 'Attention Gong', banglaLabel: 'মনোযোগ ঘণ্টা (কড়া অ্যালার্ম)' },
  { id: 'low-beep', label: 'Humble Beep', banglaLabel: 'সাধারণ মৃদু বিপ সঙ্কেত' },
];

export function playSound(type: SoundType) {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const now = audioCtx.currentTime;

    if (type === 'beep' || type === 'low-beep') {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      const pitch = type === 'beep' ? 880 : 330;
      osc.frequency.setValueAtTime(pitch, now); 
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start();
      osc.stop(now + 0.18);
    } 
    else if (type === 'success') {
      // Harmonic arpeggio (C Major chord cascade)
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.08 + 0.45);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } 
    else if (type === 'alert') {
      // Alert chime (double gong)
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc1.frequency.setValueAtTime(440, now); // A4
      osc2.frequency.setValueAtTime(554.37, now + 0.05); // C#5
      
      gainNode.gain.setValueAtTime(0.18, now);
      gainNode.gain.exponentialRampToValueAtTime(0.005, now + 0.6);
      
      osc1.start(now);
      osc1.stop(now + 0.6);
      osc2.start(now);
      osc2.stop(now + 0.6);
    }
    else if (type === 'zen-bell') {
      // Beautiful deep Tibetan singing bowl
      // Creates multi-harmonic feedback to sound rich and organic
      const baseFreq = 220; // A3, deep and warm
      const harmonics = [1.0, 2.02, 3.01, 4.05, 5.5]; // non-octave decimals for complex warm metallic rattle
      const duration = 2.5;

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.15, now);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      masterGain.connect(audioCtx.destination);

      harmonics.forEach((multiple, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * multiple, now);
        
        // Add random slight detune for microtonal choral beatings
        osc.detune.setValueAtTime(idx * 4 - 8, now);
        
        // Higher harmonics are quieter
        const peakGain = 0.5 / (idx + 1);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(peakGain, now + 0.05 + idx * 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.2);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration);
      });
    }
    else if (type === 'digital-harp') {
      // Sparkling digital arpeggio running C-Major 9
      const freqs = [196.00, 293.66, 392.00, 493.88, 587.33, 783.99]; // G3, D4, G4, B4, D5, G5
      const totalLen = freqs.length;

      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const startTime = now + idx * 0.08;
        const decayTime = 1.0;

        osc.frequency.setValueAtTime(freq, startTime);
        
        // Add a gentle pitch bend up on each harp string vibration
        osc.frequency.exponentialRampToValueAtTime(freq * 1.01, startTime + 0.15);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + decayTime);

        osc.start(startTime);
        osc.stop(startTime + decayTime + 0.1);
      });
    }
    else if (type === 'dream-flute') {
      // Triad pentatonic drone sound
      const notes = [329.63, 440.00, 523.25, 659.25, 880.00]; // E4, A4, C5, E5, A5 (Am pentatonic beauty)
      
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        // Triangle wave for a flute-like warm woodwind sound
        osc.type = 'triangle';
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        const str = now + idx * 0.12;

        osc.frequency.setValueAtTime(freq, str);
        
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.06, str + 0.04);
        gainNode.gain.exponentialRampToValueAtTime(0.001, str + 1.2);

        osc.start(str);
        osc.stop(str + 1.5);
      });
    }
  } catch (err) {
    console.warn('Web Audio API is blocked or not supported on this browser context:', err);
  }
}

