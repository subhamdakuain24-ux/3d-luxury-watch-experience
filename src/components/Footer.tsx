import React from 'react';
import { ShieldCheck, Award, MapPin, Globe, ChevronUp } from 'lucide-react';

interface FooterProps {
  onScrollToTop?: () => void;
  onOpenConcierge?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenConcierge }) => {
  const scrollToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#040406] border-t border-white/10 text-zinc-400 select-none z-20 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 space-y-12">
        {/* Top Tier: Brand & Back to Top */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-amber-400/50 flex items-center justify-center bg-amber-400/5">
                <span className="font-display text-xs font-bold text-amber-300">CH</span>
              </div>
              <span className="font-display text-2xl font-medium tracking-[0.25em] text-white">
                CHRONOVA
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400 mt-2 tracking-wider">
              HAUTE HORLOGERIE SUISSE • FONDÉE À GENÈVE
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel-subtle hover:bg-white/10 border border-white/10 text-xs font-mono tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ChevronUp className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Middle Tier: Boutiques & Heritage */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs font-semibold">
              Manufacture
            </h4>
            <p className="text-zinc-400 leading-relaxed font-light">
              Chemin des Horlogers 12<br />
              1348 Le Brassus, Vallée de Joux<br />
              Switzerland
            </p>
            <div className="flex items-center gap-2 text-amber-400/80 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>COSC Official Test Registry</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs font-semibold">
              Global Salons
            </h4>
            <ul className="space-y-1.5 text-zinc-400 font-light">
              <li>Geneva — 42 Rue du Rhône</li>
              <li>London — 14 New Bond Street</li>
              <li>New York — 680 Madison Avenue</li>
              <li>Tokyo — 6-10-1 Ginza Chuo-ku</li>
              <li>Dubai — Fashion Avenue, Dubai Mall</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs font-semibold">
              Client Privileges
            </h4>
            <ul className="space-y-1.5 text-zinc-400 font-light">
              <li>5-Year International Manufacture Warranty</li>
              <li>Bespoke Rotor Engraving & Enameling</li>
              <li>Complimentary Chronometric Overhaul</li>
              <li>Insured Secure Global Transport</li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Journal */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-widest text-white text-xs font-semibold">
              The Chronova Gazette
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Receive confidential private previews of upcoming complications and atelier releases.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="vip@collector.com"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 font-sans"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert('Thank you. You have been registered for private manufacture dispatches.');
                }}
                className="px-3 py-2 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 hover:bg-amber-400/30 text-xs font-mono uppercase"
              >
                JOIN
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-4">
          <div>
            © {new Date().getFullYear()} CHRONOVA HORLOGERIE S.A. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">CHRONOMETER CERTIFICATE</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">TERMS OF SALE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
