import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, Send, Clock, Droplets, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WatchProduct, WatchFinish } from '../types';

interface ProductModalProps {
  product: WatchProduct | null;
  onClose: () => void;
  onSelectFinish?: (finish: WatchFinish) => void;
  onApplyFinishTo3D?: (finish: WatchFinish) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onSelectFinish,
  onApplyFinishTo3D,
}) => {
  const handleApplyFinish = onSelectFinish || onApplyFinishTo3D;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [clientName, setClientName] = useState('');
  const [city, setCity] = useState('Geneva');

  if (!product) return null;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setFormSubmitted(true);
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f59e0b', '#e2e8f0', '#ffffff'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl glass-panel bg-[#0c0c12]/95 border border-white/15 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 sm:px-8 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm sm:text-base font-semibold tracking-widest text-amber-300">
              CHRONOVA MANUFACTURE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span className="font-mono text-xs text-zinc-400 uppercase">
              SPECIFICATION SHEET
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Header & Pricing */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-1">
                Ref. CR-{product.id.replace('chronova-', '90')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white">
                {product.name}
              </h2>
              <p className="text-sm text-zinc-400 font-light mt-1">
                {product.tagline}
              </p>
            </div>

            <div className="sm:text-right">
              <div className="text-xs font-mono text-zinc-400 uppercase">Retail Price</div>
              <div className="text-2xl sm:text-3xl font-mono font-semibold text-amber-300">
                {product.price}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">Excl. Local Import Duties</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Core Technical Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Diameter</span>
              </div>
              <div className="font-mono text-sm font-semibold text-white">{product.diameter}</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Thickness</span>
              </div>
              <div className="font-mono text-sm font-semibold text-white">{product.thickness}</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Reserve</span>
              </div>
              <div className="font-mono text-sm font-semibold text-white">{product.powerReserve}</div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-amber-400" />
                <span>Immersion</span>
              </div>
              <div className="font-mono text-sm font-semibold text-white">{product.waterResistance}</div>
            </div>
          </div>

          {/* Detailed Horology Specifications */}
          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Manufacture Metallurgy & Components
            </h4>
            <div className="divide-y divide-white/5 text-xs font-mono">
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Case Alloy</span>
                <span className="text-zinc-200 text-right">{product.caseMaterial}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Bezel Architecture</span>
                <span className="text-zinc-200 text-right">{product.specs.bezel}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Sapphire Crystal</span>
                <span className="text-zinc-200 text-right">{product.specs.crystal}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Dial Handcrafting</span>
                <span className="text-zinc-200 text-right">{product.specs.dial}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Bracelet Construction</span>
                <span className="text-zinc-200 text-right">{product.specs.bracelet}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-zinc-400">Oscillating Frequency</span>
                <span className="text-zinc-200 text-right">{product.specs.frequency}</span>
              </div>
            </div>
          </div>

          {/* Quick Action: Apply finish to 3D Watch */}
          <div className="p-4 rounded-2xl bg-amber-400/5 border border-amber-400/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-semibold text-amber-300 uppercase">
                Synchronize with 3D View
              </div>
              <div className="text-xs text-zinc-400">
                View this exact metallurgy on the interactive 3D hero model.
              </div>
            </div>
            <button
              onClick={() => {
                onApplyFinishTo3D(product.finish);
                onClose();
                const el = document.getElementById('hero');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-button px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider text-white whitespace-nowrap"
            >
              LOAD IN 3D ENGINE
            </button>
          </div>

          {/* Private Concierge Acquisition Form */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h4 className="font-display text-sm font-semibold text-white tracking-wider">
                REQUEST BOUTIQUE ALLOCATION
              </h4>
            </div>

            {formSubmitted ? (
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                <div className="flex items-center gap-2 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Allocation Inquiry Confirmed</span>
                </div>
                <p className="text-zinc-300 font-light">
                  Our private client concierge in {city} has received your inquiry for the{' '}
                  <span className="text-white font-medium">{product.name}</span>. We will contact
                  you at <span className="text-white">{email}</span> within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Lord / Lady / Dr. Name"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@luxury.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                      Preferred Boutique
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400/60 font-mono"
                    >
                      <option value="Geneva">Geneva (Rue du Rhône)</option>
                      <option value="London">London (New Bond Street)</option>
                      <option value="New York">New York (Madison Avenue)</option>
                      <option value="Tokyo">Tokyo (Ginza)</option>
                      <option value="Dubai">Dubai (The Dubai Mall)</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full glass-button shine-sweep py-2.5 rounded-xl text-xs font-semibold tracking-widest text-white border border-amber-400/40 hover:border-amber-400 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>SUBMIT INQUIRY</span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
