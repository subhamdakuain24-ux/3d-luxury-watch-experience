import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Menu, X, Compass, ShieldCheck } from 'lucide-react';
import { WatchFinish, SceneLightingMode } from '../types';
import { watchAudio } from '../utils/audio';

interface NavbarProps {
  finish: WatchFinish;
  onFinishChange: (f: WatchFinish) => void;
  lightingMode: SceneLightingMode;
  onLightingChange: (m: SceneLightingMode) => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  finish,
  onFinishChange,
  lightingMode,
  onLightingChange,
  onNavigate,
  onOpenInquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = watchAudio.toggle();
    setIsAudioActive(active);
  };

  const navItems = [
    { label: 'CRAFTSMANSHIP', id: 'craftsmanship' },
    { label: 'CALIBRE 9001', id: 'movement' },
    { label: 'PRECISION', id: 'precision' },
    { label: 'COLLECTION', id: 'collection' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-[#060608]/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
          : 'py-6 bg-gradient-to-b from-[#060608]/90 via-[#060608]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Horology Crest */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center bg-amber-400/5 group-hover:border-amber-400/80 transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <span className="font-display text-xs font-bold text-amber-300 tracking-tighter">
              CH
            </span>
          </div>
          <div>
            <span className="font-display text-lg sm:text-xl font-semibold tracking-[0.25em] text-white group-hover:text-amber-200 transition-colors">
              CHRONOVA
            </span>
            <span className="block font-mono text-[9px] tracking-[0.28em] text-zinc-400 -mt-1">
              GENÈVE • MANUFACTURE
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-xs font-medium tracking-[0.18em] text-zinc-300 hover:text-white transition-colors relative py-1 focus:outline-none group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right Tools & CTA */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Finish Selector */}
          <div className="flex items-center p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <button
              onClick={() => onFinishChange('steel')}
              title="904L Steel"
              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                finish === 'steel'
                  ? 'ring-2 ring-amber-400/80 scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-300 shadow-inner" />
            </button>
            <button
              onClick={() => onFinishChange('gold')}
              title="18K Rose Gold"
              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                finish === 'gold'
                  ? 'ring-2 ring-amber-400/80 scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-amber-400 shadow-inner" />
            </button>
            <button
              onClick={() => onFinishChange('noir')}
              title="DLC Stealth Titanium"
              className={`w-6 h-6 rounded-full transition-all flex items-center justify-center ${
                finish === 'noir'
                  ? 'ring-2 ring-amber-400/80 scale-110'
                  : 'opacity-60 hover:opacity-100'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-zinc-900 border border-zinc-700 shadow-inner" />
            </button>
          </div>

          {/* Sound Toggle (Escapement Beat) */}
          <button
            onClick={toggleSound}
            title={isAudioActive ? 'Mute Escapement Heartbeat' : 'Listen to 28,800 VPH Calibre Heartbeat'}
            className={`px-3 py-1.5 rounded-full text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all border ${
              isAudioActive
                ? 'bg-amber-500/15 border-amber-400/40 text-amber-300 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-[10px]">4Hz TICK</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px]">SOUND</span>
              </>
            )}
          </button>

          {/* Concierge Button */}
          <button
            onClick={onOpenInquiry}
            className="glass-button shine-sweep px-5 py-2 rounded-full text-xs font-medium tracking-[0.15em] text-white border border-white/20 hover:border-amber-400/50 transition-all"
          >
            CONCIERGE
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300"
          >
            {isAudioActive ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0a0a0e]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 mt-3 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm font-medium tracking-wider text-zinc-300 hover:text-amber-300 py-1"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">Case Finish</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onFinishChange('steel')}
                className={`w-6 h-6 rounded-full ${finish === 'steel' ? 'ring-2 ring-amber-400' : ''}`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-300 block" />
              </button>
              <button
                onClick={() => onFinishChange('gold')}
                className={`w-6 h-6 rounded-full ${finish === 'gold' ? 'ring-2 ring-amber-400' : ''}`}
              >
                <span className="w-5 h-5 rounded-full bg-amber-400 block" />
              </button>
              <button
                onClick={() => onFinishChange('noir')}
                className={`w-6 h-6 rounded-full ${finish === 'noir' ? 'ring-2 ring-amber-400' : ''}`}
              >
                <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-700 block" />
              </button>
            </div>
          </div>
          <button
            onClick={() => {
              onOpenInquiry();
              setMobileMenuOpen(false);
            }}
            className="w-full glass-button py-2.5 rounded-xl text-xs tracking-widest text-white mt-2"
          >
            INQUIRE WITH CONCIERGE
          </button>
        </div>
      )}
    </header>
  );
};
