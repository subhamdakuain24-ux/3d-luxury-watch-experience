import React, { useState } from 'react';
import { Disc, Activity, Cpu, Zap, RotateCw } from 'lucide-react';
import { MOVEMENT_LABELS } from '../data/products';

export const MovementSection: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('balance');

  const activeInfo = MOVEMENT_LABELS.find((c) => c.id === selectedComponent) || MOVEMENT_LABELS[0];

  return (
    <section
      id="movement"
      className="relative min-h-screen flex flex-col justify-between px-6 py-24 select-none pointer-events-none"
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center space-y-3 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono tracking-[0.25em] text-amber-300">
          <Activity className="w-3.5 h-3.5 text-amber-400" />
          <span>IN-HOUSE MANUFACTURE CALIBRE 9001</span>
        </div>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-wider uppercase">
          THE MECHANICAL <br />
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-zinc-100 to-amber-300">
            HEARTBEAT.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 font-light">
          An exploded view revealing 294 hand-assembled horological components oscillating at 28,800
          vibrations per hour.
        </p>
      </div>

      {/* Interactive Micro-Selector & Exploded Calibre Specs */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end pointer-events-auto mt-auto pt-12">
        {/* Component Selector Tabs */}
        <div className="md:col-span-4 space-y-2.5">
          <div className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-1">
            Component Architecture
          </div>
          {MOVEMENT_LABELS.map((item) => {
            const isSelected = item.id === selectedComponent;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedComponent(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400/50 shadow-[0_0_20px_rgba(212,175,55,0.15)] translate-x-2'
                    : 'glass-panel-subtle border-white/10 hover:border-white/25 hover:bg-white/5'
                }`}
              >
                <div>
                  <div
                    className={`font-mono text-xs font-semibold tracking-wider ${
                      isSelected ? 'text-amber-300' : 'text-zinc-300'
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-sans">{item.subtitle}</div>
                </div>
                {item.frequency && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-amber-300">
                    {item.frequency}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Center: Instruction to inspect 3D */}
        <div className="md:col-span-4 text-center hidden md:flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-2">
            <RotateCw className="w-5 h-5 text-amber-400 animate-spin-slow" />
          </div>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            3D Calibre Exploded View
          </p>
          <p className="text-[11px] text-zinc-400 mt-1 max-w-[200px]">
            Hover or drag 3D pins to inspect escapement and gear trains in real time.
          </p>
        </div>

        {/* Right: Active Component Technical Card */}
        <div className="md:col-span-4">
          <div className="glass-panel p-6 rounded-2xl border border-amber-400/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-amber-400 tracking-widest uppercase">
                Calibre 9001 Specification
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h3 className="font-display text-xl font-medium text-white mb-1">
              {activeInfo.title}
            </h3>
            <div className="text-xs font-mono text-amber-300 mb-3">{activeInfo.subtitle}</div>

            <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4">
              {activeInfo.description}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 font-mono text-xs">
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[9px] text-zinc-400 block uppercase">Escapement Beat</span>
                <span className="text-zinc-200 font-semibold">28,800 VPH (4Hz)</span>
              </div>
              <div className="p-2 rounded bg-black/40 border border-white/5">
                <span className="text-[9px] text-zinc-400 block uppercase">Inertia Mass</span>
                <span className="text-zinc-200 font-semibold">11.5 mg • cm²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
