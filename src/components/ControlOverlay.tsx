import React from 'react';
import { Sun, Moon, Sparkles, RotateCcw, Volume2, VolumeX, Eye } from 'lucide-react';
import { SceneLightingMode, WatchFinish } from '../types';
import { watchAudio } from '../utils/audio';

interface ControlOverlayProps {
  finish?: WatchFinish;
  onFinishChange?: (finish: WatchFinish) => void;
  lightingMode: SceneLightingMode;
  onLightingChange: (mode: SceneLightingMode) => void;
  scrollProgress: number;
  onResetView?: () => void;
  onJumpToSection?: (id: string) => void;
}

export const ControlOverlay: React.FC<ControlOverlayProps> = ({
  finish = 'steel',
  onFinishChange,
  lightingMode,
  onLightingChange,
  scrollProgress,
  onResetView = () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  onJumpToSection,
}) => {
  const getSectionName = (p: number) => {
    if (p < 0.20) return '01 / 06 • HERO TIMEPIECE';
    if (p < 0.40) return '02 / 06 • CRAFTSMANSHIP';
    if (p < 0.65) return '03 / 06 • EXPLODED CALIBRE';
    if (p < 0.82) return '04 / 06 • MICRON PRECISION';
    if (p < 0.94) return '05 / 06 • THE COLLECTION';
    return '06 / 06 • GENERATIONS';
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none select-none">
      {/* Left: Scroll Stage Pill & Progress Bar */}
      <div className="glass-panel px-4 py-2.5 rounded-full border border-white/10 hidden sm:flex items-center gap-3.5 pointer-events-auto shadow-2xl">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="font-mono text-xs text-zinc-300 tracking-wider">
          {getSectionName(scrollProgress)}
        </span>
        <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-150"
            style={{ width: `${Math.min(Math.max(scrollProgress * 100, 2), 100)}%` }}
          />
        </div>
      </div>

      {/* Right: Lighting Atmosphere Controls */}
      <div className="glass-panel p-1.5 rounded-full border border-white/10 flex items-center gap-1 pointer-events-auto ml-auto shadow-2xl">
        <button
          onClick={() => onLightingChange('studio')}
          title="Studio Dark Lighting"
          className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            lightingMode === 'studio'
              ? 'bg-white/15 text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Moon className="w-3 h-3" />
          <span className="hidden md:inline">STUDIO</span>
        </button>

        <button
          onClick={() => onLightingChange('gold')}
          title="Golden Hour Reflection"
          className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            lightingMode === 'gold'
              ? 'bg-amber-500/25 text-amber-300 border border-amber-400/30'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sun className="w-3 h-3 text-amber-400" />
          <span className="hidden md:inline">GOLDEN</span>
        </button>

        <button
          onClick={() => onLightingChange('noir')}
          title="Midnight Noir Aesthetic"
          className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            lightingMode === 'noir'
              ? 'bg-zinc-800 text-zinc-200 border border-zinc-600'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3 text-zinc-400" />
          <span className="hidden md:inline">NOIR</span>
        </button>

        <div className="w-px h-4 bg-white/15 mx-1" />

        <button
          onClick={onResetView}
          title="Reset View to Top"
          className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
