import React from 'react';
import { Html } from '@react-three/drei';
import { MOVEMENT_LABELS } from '../../data/products';

interface MovementLabelsProps {
  visible: boolean;
  opacity: number;
}

export const MovementLabels: React.FC<MovementLabelsProps> = ({ visible, opacity }) => {
  if (!visible || opacity <= 0.05) return null;

  return (
    <group>
      {MOVEMENT_LABELS.map((item) => (
        <group key={item.id} position={item.position}>
          {/* Subtle 3D Pulse Core */}
          <mesh>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#d4af37" transparent opacity={opacity} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.05, 0.07, 24]} />
            <meshBasicMaterial color="#d4af37" transparent opacity={opacity * 0.7} />
          </mesh>

          {/* HTML Overlay with thin connecting pointer line */}
          <Html
            position={[0, 0, 0]}
            center
            distanceFactor={8}
            zIndexRange={[100, 0]}
            style={{
              transition: 'opacity 0.4s ease-out',
              opacity: opacity,
              pointerEvents: opacity > 0.4 ? 'auto' : 'none',
            }}
          >
            <div className="relative flex items-center group cursor-pointer select-none">
              {/* Thin connecting pointer & stem */}
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full border border-amber-400/80 bg-amber-400/30 shadow-[0_0_10px_rgba(212,175,55,0.6)] animate-ping absolute -top-1 -left-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                <div className="w-px h-8 bg-gradient-to-b from-amber-400/80 to-transparent" />
              </div>

              {/* Glass Info Pill */}
              <div className="ml-3 px-3.5 py-2.5 rounded-lg bg-[#0c0c12]/90 backdrop-blur-md border border-white/15 shadow-2xl min-w-[180px] max-w-[240px] transform group-hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] tracking-wider text-amber-400 font-semibold uppercase">
                    {item.title}
                  </span>
                  {item.frequency && (
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300/90 border border-amber-400/20">
                      {item.frequency}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium text-zinc-300 mt-0.5 font-sans">
                  {item.subtitle}
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight mt-1 hidden sm:block">
                  {item.description}
                </p>
              </div>
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
};
