import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface CtaSectionProps {
  onExploreCollection: () => void;
  onOpenConcierge: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onExploreCollection,
  onOpenConcierge,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 py-32 select-none pointer-events-none">
      <div className="max-w-4xl mx-auto space-y-8 pointer-events-auto z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono tracking-[0.25em] text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>TIMELESS HOROLOGICAL HERITAGE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light text-white tracking-wide uppercase leading-tight">
          ENGINEERED FOR <br />
          <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
            GENERATIONS.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
          A CHRONOVA timepiece is never merely possessed. It is preserved through time, uniting
          pioneering metallurgy with perpetual mechanical art.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onExploreCollection}
            className="glass-button shine-sweep w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] text-white uppercase flex items-center justify-center gap-3 border border-amber-400/40 hover:border-amber-400 shadow-[0_12px_40px_rgba(212,175,55,0.2)] cursor-pointer"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>

          <button
            onClick={onOpenConcierge}
            className="glass-button shine-sweep w-full sm:w-auto px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] text-zinc-200 uppercase flex items-center justify-center gap-3 border border-white/10 hover:border-white/30 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>BOOK PRIVATE CONSULTATION</span>
          </button>
        </div>

        <div className="pt-12 text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          MANUFACTURE D'HORLOGERIE CHRONOVA S.A. • CANTON DE GENÈVE
        </div>
      </div>
    </section>
  );
};
