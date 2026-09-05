import React, { useState } from 'react';
import { X, Check, Calendar, MapPin, ShieldCheck, Clock, Send } from 'lucide-react';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose }) => {
  const [salon, setSalon] = useState('Geneva • Rue du Rhône');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-18');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const salons = [
    'Geneva • Rue du Rhône',
    'Zurich • Bahnhofstrasse',
    'New York • Madison Avenue',
    'Tokyo • Ginza 6-Chome',
    'London • New Bond Street',
    'Dubai • DIFC Gate Village',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-white/20 shadow-2xl z-10 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
              Geneva Private Concierge
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          <div>
            <h3 className="text-2xl font-display font-medium text-white tracking-wide">
              Request Private Salon Consultation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
              Experience the CHRONOVA collection in person under the guidance of our Master
              Horologists.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Appointment Confirmed</span>
              </div>
              <p className="text-xs text-emerald-400/90 leading-relaxed">
                Thank you, {name}. An invitation dossier and salon credentials for {salon} on {date}{' '}
                have been prepared. Your private client liaison will contact you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-4 w-full glass-button py-2.5 rounded-xl text-xs font-mono tracking-wider text-white"
              >
                CLOSE DOSSIER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                  Select Flagship Salon
                </label>
                <select
                  value={salon}
                  onChange={(e) => setSalon(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400/80 cursor-pointer"
                >
                  {salons.map((s) => (
                    <option key={s} value={s} className="bg-[#0c0c12] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-amber-400/80"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400/80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@luxury.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-amber-400/80"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    Phone / Signal
                  </label>
                  <input
                    type="tel"
                    placeholder="+41 22 718 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-amber-400/80"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strict Swiss Client Secrecy Protocol</span>
                </div>
                <button
                  type="submit"
                  className="glass-button px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-white flex items-center gap-2 cursor-pointer"
                >
                  <span>CONFIRM RESERVATION</span>
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
