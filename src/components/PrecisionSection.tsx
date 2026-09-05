import React from 'react';
import { Target } from 'lucide-react';

export const PrecisionSection: React.FC = () => {
  const precisionSpecs = [
    {
      title: '0.001 MM TOLERANCE',
      category: 'CNC Machining',
      desc: 'Every pinion and jewel setting is cut with electro-erosion tools to tolerances measured in microns.',
    },
    {
      title: 'SILICIUM HAIRSPRING',
      category: 'Anti-Magnetic',
      desc: 'Immune to magnetic fields exceeding 15,000 Gauss, maintaining isochronism in any environment.',
    },
    {
      title: 'PARACHROM ALLOY',
      category: 'Thermal Resistance',
      desc: 'Niobium-zirconium composite remains ten times more accurate than traditional springs during shock impacts.',
    },
    {
      title: 'BGW9 SUPER-LUMINOVA',
      category: 'Legibility',
      desc: 'Deep blue luminescence engineered for pristine underwater and low-light chronometric reading.',
    },
  ];

  return (
    <section
      id="precision"
      className="relative min-h-screen flex items-center px-6 py-24 select-none pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side Typography & Immersive Manifesto */}
        <div className="lg:col-span-6 space-y-6 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-mono tracking-[0.25em] text-amber-300">
            <Target className="w-3.5 h-3.5" />
            <span>MICRON-SCALE ENGINEERING</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-wide uppercase leading-tight">
            EVERY COMPONENT <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-white to-amber-200">
              HAS A PURPOSE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-lg">
            There are no decorative frivolities inside a CHRONOVA timepiece. Each bevel redirects
            reflected light, each jewel bearing eliminates friction, and each chamfer prevents
            micro-fracture propagation under centrifugal stress.
          </p>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 max-w-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-amber-400 tracking-wider uppercase">
                COSC & METAS DUAL CERTIFIED
              </span>
              <span className="font-mono text-xs text-zinc-400">GENEVA SEAL</span>
            </div>
            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Tested beyond the limits of earthly gravity. Regulated in six positions to ensure an
              unwavering daily variance between -2 and +2 seconds per day.
            </p>
          </div>
        </div>

        {/* Right Side: Grid of Precision Technical Badges */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pointer-events-auto">
          {precisionSpecs.map((spec) => (
            <div
              key={spec.title}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 mb-1">
                {spec.category}
              </div>
              <h3 className="font-display text-base font-semibold text-white mb-2 group-hover:text-amber-200 transition-colors">
                {spec.title}
              </h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
