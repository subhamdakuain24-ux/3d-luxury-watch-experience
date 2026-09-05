import React from 'react';
import { ChevronDown, ArrowRight, Sparkles, Disc } from 'lucide-react';

interface HeroSectionProps {
  onExploreWatch: () => void;
  onDiscoverMovement: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWatch,
  onDiscoverMovement,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-6 pt-32 pb-12 pointer-events-none select-none"
    >
      {/* Top subtle tag */}
      <div className="pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono tracking-[0.25em] text-zinc-300 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <span>HAUTE HORLOGERIE • GENEVA SWISS MADE</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div className="max-w-4xl mx-auto space-y-6 pointer-events-auto z-10">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-light tracking-[0.08em] text-white leading-tight uppercase">
          TIME, <br className="hidden sm:inline" />
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-amber-200">
            ENGINEERED.
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 font-light tracking-wide leading-relaxed">
          Precision crafted for those who value every second.
        </p>

        {/* Premium Glass Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
          <button
            onClick={onExploreWatch}
            className="glass-button shine-sweep w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] text-white uppercase flex items-center justify-center gap-3 border border-white/20 hover:border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <span>EXPLORE THE WATCH</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onDiscoverMovement}
            className="glass-button shine-sweep w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] text-zinc-200 uppercase flex items-center justify-center gap-3 border border-white/10 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <Disc className="w-4 h-4 text-amber-300" />
            <span>DISCOVER THE MOVEMENT</span>
          </button>
        </div>
      </div>

      {/* Bottom Floating Scroll & Interaction Cue */}
      <div className="pointer-events-auto flex flex-col items-center gap-3 z-10">
        <span className="font-mono text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
          DRAG TO ROTATE 360° • SCROLL TO DECONSTRUCT
        </span>
        <button
          onClick={onExploreWatch}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-300 cursor-pointer animate-bounce"
          aria-label="Scroll to explore"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
