import React from 'react';
import { ShieldCheck, Gem, Hammer, Sparkles } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const pillars = [
    {
      title: 'PRECISION',
      icon: ShieldCheck,
      subtitle: 'COSC Certified Chronometer',
      metric: '±2 SEC / DAY',
      description:
        'Every movement undergoes 15 consecutive days of rigorous chronometric trials across five physical positions and three temperature extremes.',
    },
    {
      title: 'CRAFTSMANSHIP',
      icon: Hammer,
      subtitle: 'Hand-Finished Haute Anglage',
      metric: '180 HOURS',
      description:
        'Master artisans hand-bevel every bridge plate, apply black-polish mirror treatments to screwheads, and execute traditional circular Côtes de Genève stripes.',
    },
    {
      title: 'MATERIALS',
      icon: Gem,
      subtitle: 'Aerospace Metallurgy',
      metric: '904L STEEL & 18K GOLD',
      description:
        'Milled from dense, corrosion-resistant 904L superalloy and pure grade 5 titanium, capped with 2,200 Vickers synthetic scratchproof corundum crystal.',
    },
  ];

  return (
    <section
      id="craftsmanship"
      className="relative min-h-screen flex items-center px-6 py-24 select-none pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Typography & Philosophy */}
        <div className="lg:col-span-6 space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[11px] font-mono tracking-[0.2em] text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HOROLOGICAL EXCELLENCE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-wide uppercase leading-tight">
            CRAFTED WITHOUT <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
              COMPROMISE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-lg">
            At our manufacture in the Vallée de Joux, time is not simply measured—it is sculpted.
            Every curve of the case, chamfered lug, and ceramic bezel reflects an unyielding devotion
            to Swiss mechanical mastery.
          </p>

          <div className="pt-2 flex items-center gap-8 border-t border-white/10 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-display text-white font-medium">38</div>
              <div className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Jewel Bearings</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-2xl sm:text-3xl font-display text-amber-300 font-medium">72 H</div>
              <div className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Power Reserve</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-2xl sm:text-3xl font-display text-white font-medium">150 M</div>
              <div className="text-[11px] font-mono tracking-wider text-zinc-400 uppercase">Immersion Rating</div>
            </div>
          </div>
        </div>

        {/* Right Side: Glass Information Panels */}
        <div className="lg:col-span-6 space-y-4 pointer-events-auto">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-500 transform hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:bg-amber-400/20 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-wider text-white">
                        {item.title}
                      </h3>
                      <div className="text-xs font-mono text-amber-400/80 tracking-wide">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-medium px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                    {item.metric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
