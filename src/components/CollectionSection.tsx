import React, { useState, useRef } from 'react';
import { ArrowUpRight, Sparkles, Shield, Compass, ChevronRight } from 'lucide-react';
import { WATCH_PRODUCTS } from '../data/products';
import { WatchProduct, WatchFinish } from '../types';

interface CollectionSectionProps {
  onSelectProduct: (product: WatchProduct) => void;
  onSelectFinish: (finish: WatchFinish) => void;
  currentFinish?: WatchFinish;
}

const ProductCard: React.FC<{
  product: WatchProduct;
  isActive: boolean;
  onSelect: () => void;
  onApplyFinish: () => void;
}> = ({ product, isActive, onSelect, onApplyFinish }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const finishColor =
    product.finish === 'gold'
      ? 'from-amber-500/20 via-yellow-600/10 to-transparent'
      : product.finish === 'noir'
      ? 'from-zinc-700/20 via-zinc-900/40 to-transparent'
      : 'from-blue-500/15 via-slate-600/10 to-transparent';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? 'scale3d(1.03, 1.03, 1.03)' : 'scale3d(1, 1, 1)'
        }`,
        transition: isHovered
          ? 'transform 0.1s ease-out, border-color 0.3s ease'
          : 'transform 0.5s ease-out, border-color 0.3s ease',
      }}
      className={`relative glass-panel rounded-3xl p-7 border flex flex-col justify-between cursor-pointer group select-none overflow-hidden ${
        isActive
          ? 'border-amber-400/60 shadow-[0_20px_60px_rgba(212,175,55,0.15)]'
          : 'border-white/10 hover:border-amber-400/40'
      }`}
    >
      {/* Glare Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%)`,
        }}
      />

      {/* Top Finish Badge & Status */}
      <div className="flex items-center justify-between mb-8 z-10">
        <span className="font-mono text-[11px] tracking-[0.2em] text-amber-400 uppercase">
          {product.caseMaterial.split('&')[0]}
        </span>
        <span
          className={`font-mono text-[10px] px-2.5 py-1 rounded-full border ${
            isActive
              ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
              : 'bg-white/5 text-zinc-400 border-white/10'
          }`}
        >
          {isActive ? 'ACTIVE IN 3D' : 'EXPLORE'}
        </span>
      </div>

      {/* Card Visual / Stylized Watch Preview Ring */}
      <div className="relative my-8 flex items-center justify-center h-48">
        {/* Background Glow */}
        <div
          className={`absolute w-40 h-40 rounded-full bg-gradient-to-tr ${finishColor} blur-xl group-hover:scale-125 transition-transform duration-500`}
        />

        {/* Outer Bezel Disc Representation */}
        <div
          className={`w-36 h-36 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${
            product.finish === 'gold'
              ? 'border-amber-400/70 shadow-[0_0_30px_rgba(212,175,55,0.25)] bg-[#181512]'
              : product.finish === 'noir'
              ? 'border-zinc-700 shadow-[0_0_30px_rgba(30,30,40,0.4)] bg-[#101014]'
              : 'border-slate-300/60 shadow-[0_0_30px_rgba(200,220,255,0.2)] bg-[#0d0e14]'
          } ${isHovered ? 'rotate-45 scale-110' : ''}`}
        >
          {/* Inner chapter ring */}
          <div className="w-28 h-28 rounded-full border border-white/20 flex flex-col items-center justify-center p-2 relative">
            <span className="font-display text-[9px] tracking-widest text-zinc-300 font-semibold">
              CHRONOVA
            </span>
            <span className="font-mono text-[7px] tracking-widest text-zinc-400">GENÈVE</span>
            {/* Watch Hands */}
            <div
              className={`absolute w-0.5 h-10 top-4 origin-bottom rounded-full ${
                product.finish === 'gold'
                  ? 'bg-amber-300'
                  : product.finish === 'noir'
                  ? 'bg-red-500'
                  : 'bg-sky-400'
              } transition-transform duration-700 ${isHovered ? 'rotate-90' : 'rotate-25'}`}
            />
            <div
              className="absolute w-1 h-7 top-7 origin-bottom bg-white/80 rounded-full transition-transform duration-700 -rotate-45"
            />
            <div className="w-2 h-2 rounded-full bg-white z-10 shadow" />
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="space-y-3 z-10">
        <div>
          <h3 className="font-display text-2xl font-semibold text-white tracking-wide group-hover:text-amber-200 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 font-light mt-0.5">{product.tagline}</p>
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
          <div>
            <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">
              Allocation Price
            </span>
            <span className="text-xl font-display font-medium text-amber-300">
              {product.price}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">
              Diameter
            </span>
            <span className="text-sm font-mono text-white">{product.diameter}</span>
          </div>
        </div>

        {/* Button Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApplyFinish();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] font-mono tracking-wider text-zinc-300 hover:text-white transition-all cursor-pointer"
          >
            VIEW IN 3D
          </button>
          <button
            onClick={onSelect}
            className="p-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 group-hover:scale-105 transition-all cursor-pointer"
            aria-label="Inspect specifications"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  onSelectProduct,
  onSelectFinish,
  currentFinish,
}) => {
  return (
    <section
      id="collection"
      className="relative min-h-screen flex flex-col justify-center px-6 py-28 select-none pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 pointer-events-auto max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-xs font-mono tracking-[0.25em] text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 2026 HOROLOGICAL REPERTORY</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-light text-white tracking-wide uppercase">
            THE CHRONOVA <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-zinc-300">
              COLLECTION.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 font-light">
            Three expressions of mechanical perfection. Select a timepiece to inspect its calibre or
            synchronize the central 3D scene.
          </p>
        </div>

        {/* 3D Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pointer-events-auto">
          {WATCH_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isActive={currentFinish === product.finish}
              onSelect={() => onSelectProduct(product)}
              onApplyFinish={() => onSelectFinish(product.finish)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
