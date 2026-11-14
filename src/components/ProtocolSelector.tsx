import React, { useState } from 'react';
import { DEEP_WORK_PROTOCOLS } from '../data';
import { Protocol } from '../types';
import { AlertCircle, Trash2, Plus, Clock, Wind, Brain, Zap } from 'lucide-react';

interface ProtocolSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
  activeSessionInProgress: boolean;
  customProtocols: Protocol[];
  onCreateCustom: (minutes: number) => void;
  onDeleteCustom: (title: string) => void;
  onOpenBreathing: () => void;
}

export default function ProtocolSelector({
  selectedType,
  onSelect,
  activeSessionInProgress,
  customProtocols,
  onCreateCustom,
  onDeleteCustom,
  onOpenBreathing
}: ProtocolSelectorProps) {
  const [customMins, setCustomMins] = useState<number>(45);
  const [activeGroup, setActiveGroup] = useState<'standard' | 'adhd'>('standard');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMins < 10 || customMins > 300) {
      alert('সেশনের সময় অবশ্যই ১০ থেকে ৩০০ মিনিটের মধ্যে হতে হবে।');
      return;
    }
    onCreateCustom(customMins);
  };

  const handleSelectProtocol = (id: string) => {
    if (activeSessionInProgress) {
      if (confirm('A deep work session is currently running. Changing protocols will abort your current session. Do you want to proceed?')) {
        onSelect(id);
      }
    } else {
      onSelect(id);
    }
  };

  const standardPresets = DEEP_WORK_PROTOCOLS.filter(p => p.type !== 'adhd');
  const adhdPresets = DEEP_WORK_PROTOCOLS.filter(p => p.type === 'adhd');

  return (
    <aside className="w-full lg:w-80 border-r border-white/5 bg-slate-900/40 p-4 sm:p-6 flex flex-col gap-5 h-full overflow-y-auto">
      {/* Sidebar Header */}
      <div>
        <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-1 px-2">
          Available Protocols
        </h2>
        <p className="text-[11px] text-slate-400 px-2 leading-relaxed">
          Select a session based on your target and current attention capacity.
        </p>
      </div>

      {/* ================== CUSTOM TIME MODIFIER/CREATOR ================== */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 font-sans">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
            Set Custom Duration (কাস্টম সময়)
          </span>
        </div>
        
        <form onSubmit={handleCreateSubmit} className="space-y-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCustomMins(prev => Math.max(10, prev - 15))}
              className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-xs transition-colors"
              title="Minus 15 minutes"
            >
              -15m
            </button>
            
            <input
              type="number"
              min="10"
              max="300"
              value={customMins}
              onChange={(e) => setCustomMins(parseInt(e.target.value) || 0)}
              className="flex-1 bg-slate-950/80 border border-white/15 focus:border-cyan-500 text-center font-semibold font-mono py-1 rounded-lg text-sm text-white focus:outline-none focus:ring-0"
              required
            />

            <button
              type="button"
              onClick={() => setCustomMins(prev => Math.min(300, prev + 15))}
              className="px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-xs transition-colors"
              title="Plus 15 minutes"
            >
              +15m
            </button>
          </div>
          
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Generate protocol
          </button>
        </form>
      </div>

      {/* ================== CATEGORY SELECTION TABS ================== */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950/40 rounded-xl border border-white/5 font-sans">
        <button
          type="button"
          onClick={() => setActiveGroup('standard')}
          className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeGroup === 'standard'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
        >
          <Zap className="w-3 h-3" /> Standard (সাধারণ)
        </button>
        <button
          type="button"
          onClick={() => setActiveGroup('adhd')}
          className={`py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1 ${
            activeGroup === 'adhd'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
          }`}
        >
          <Brain className="w-3.5 h-3.5" /> ADHD (বিশেষ) ✨
        </button>
      </div>

      {/* Protocols Cards List */}
      <div className="flex flex-col gap-3.5">
        {activeGroup === 'standard' ? (
          <>
            {/* Preset standard ones */}
            {standardPresets.map((proto) => {
              const isSelected = selectedType === proto.type || selectedType === proto.title;
              
              return (
                <div
                  key={proto.type}
                  onClick={() => handleSelectProtocol(proto.type)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/60 text-white'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                  } duration-150`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-sm font-semibold tracking-tight">{proto.title}</span>
                    <span className="text-[10px] text-cyan-400 font-semibold bg-cyan-400/10 px-2 py-0.5 rounded-full">
                      {proto.totalDurationMinutes}m
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 mb-2 font-sans">
                    {proto.banglaTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                    {proto.banglaDescription}
                  </p>

                  {/* Steps overview */}
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex gap-1.5 flex-wrap">
                    {proto.phases.map((ph, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          ph.category === 'prepare'
                            ? 'bg-amber-500/10 text-amber-300'
                            : ph.category === 'perform'
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : 'bg-purple-500/10 text-purple-300'
                        }`}
                      >
                        {ph.baseDurationMinutes}m {ph.category}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* User-created Custom Protocols */}
            {customProtocols.length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/5 space-y-3.5">
                <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider block px-1">
                  Your Custom Protocols ({customProtocols.length})
                </span>
                
                {customProtocols.map((proto) => {
                  const isSelected = selectedType === proto.title;

                  return (
                    <div
                      key={proto.title}
                      onClick={() => handleSelectProtocol(proto.title)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border relative group ${
                        isSelected
                          ? 'bg-teal-500/10 border-teal-500/60 text-white'
                          : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                      } duration-150`}
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="text-sm font-semibold tracking-tight pr-6">{proto.title}</span>
                        <span className="text-[10px] text-teal-400 font-semibold bg-teal-400/10 px-2 py-0.5 rounded-full flex-shrink-0">
                          {proto.totalDurationMinutes}m
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-100 mb-2 font-sans">
                        {proto.banglaTitle}
                      </p>
                      
                      {/* Delete button positioned nicely */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this custom protocol?')) {
                            onDeleteCustom(proto.title);
                          }
                        }}
                        className="absolute top-4 right-12 w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-red-500/20"
                        title="Delete custom protocol"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Steps overview */}
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex gap-1.5 flex-wrap">
                        {proto.phases.map((ph, idx) => (
                          <span
                            key={idx}
                            className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                              ph.category === 'prepare'
                                ? 'bg-amber-500/10 text-amber-300'
                                : ph.category === 'perform'
                                ? 'bg-emerald-500/10 text-emerald-300'
                                : 'bg-purple-500/10 text-purple-300'
                            }`}
                          >
                            {ph.baseDurationMinutes}m {ph.category}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <>
            {/* ADHD Friendly Section Header Info */}
            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-2 font-sans text-[11px]">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>⚠️ ADHD-বান্ধব সাধারণ প্রস্তুতি</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 leading-relaxed list-disc list-inside">
                <li><strong>ভিজ্যুয়াল টাইমার:</strong> চোখের সামনে এনালগ বা বালুঘড়ি টাইমার রাখুন।</li>
                <li><strong>ফিজেট টুল:</strong> কাজ করতে করতে পা নাড়ানো বা স্ট্রেস বল চাপা কার্যকরী।</li>
                <li><strong>ডাম্প প্যাড:</strong> র্যান্ডম চিন্তা আসলেই খাতায় লিখে মনকে মুক্ত করুন।</li>
              </ul>
            </div>

            {/* Preset ADHD ones */}
            {adhdPresets.map((proto) => {
              const isSelected = selectedType === proto.title;
              
              return (
                <div
                  key={proto.title}
                  onClick={() => handleSelectProtocol(proto.title)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/60 text-white'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300'
                  } duration-150`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-sm font-semibold tracking-tight">{proto.title}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      {proto.totalDurationMinutes}m
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-100 mb-2 font-sans">
                    {proto.banglaTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {proto.banglaDescription}
                  </p>

                  {/* Steps overview */}
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex gap-1.5 flex-wrap">
                    {proto.phases.map((ph, idx) => (
                      <span
                        key={idx}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          ph.category === 'prepare'
                            ? 'bg-amber-500/10 text-amber-300'
                            : ph.category === 'perform'
                            ? 'bg-emerald-500/10 text-emerald-300'
                            : 'bg-purple-500/10 text-purple-300'
                        }`}
                      >
                        {ph.baseDurationMinutes}m {ph.category}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* PRO-TIP */}
            <div className="p-3.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 space-y-1 font-sans text-[11px]">
              <div className="text-cyan-400 font-semibold">💡 ADHD প্রো-টিপ:</div>
              <p className="text-slate-300 leading-relaxed">
                কখনোই পারফেকশনের পিছনে দৌড়াবেন না। ডিস্ট্রাক্টেড হলে নিজেকে বকা না দিয়ে জাস্ট <strong>"স্টপ টেকনিক"</strong> (বডি পজ, লম্বা গভীর শ্বাস) দিয়ে ফিরে আসুন। <strong>"শুরু করাটাই"</strong> সবচেয়ে বড় জয়!
              </p>
            </div>
          </>
        )}
      </div>

      {/* Preparation Advice */}
      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
        {/* Breathing Quick Guide Trigger */}
        <button
          onClick={onOpenBreathing}
          className="w-full h-11 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Wind className="w-4 h-4" />
          <span>🧘‍♂️ Practice Box Breathing</span>
        </button>

        <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
            <span className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest">
              Bliss Pre-requisite
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400 italic">
            &quot;কাজের টেবিলে কোনো অফ-টপিক বই, র্যান্ডম চিঠি বা ফোন রাখবেন না। মনের শান্ততা হলো গভীর চিন্তার প্রথম শর্ত।&quot;
          </p>
        </div>
      </div>
    </aside>
  );
}
