import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralWatch } from './ProceduralWatch';
import { MovementLabels } from './MovementLabels';
import { WatchFinish, SceneLightingMode } from '../../types';

interface WatchCanvasProps {
  scrollProgress: number; // 0 to 1
  finish: WatchFinish;
  lightingMode: SceneLightingMode;
  isFreeOrbit: boolean;
}

// Internal 3D Scene Controller
const SceneController: React.FC<{
  scrollProgress: number;
  finish: WatchFinish;
  lightingMode: SceneLightingMode;
  isFreeOrbit: boolean;
}> = ({ scrollProgress, finish, lightingMode, isFreeOrbit }) => {
  const { camera } = useThree();
  const watchGroupRef = useRef<THREE.Group>(null);
  const dragRotation = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const mouseParallax = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Mouse / Touch drag handlers
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      // Don't drag if clicking buttons
      if ((e.target as HTMLElement)?.closest('button, a, input')) return;
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      // Mouse Parallax
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseParallax.current = { x: nx * 0.25, y: ny * 0.25 };

      if (!isDragging.current) return;
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      dragRotation.current.y += dx * 0.008;
      dragRotation.current.x += dy * 0.008;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement)?.closest('button, a, input')) return;
      if (e.touches.length === 1) {
        isDragging.current = true;
        lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastMousePos.current.x;
      const dy = e.touches[0].clientY - lastMousePos.current.y;
      dragRotation.current.y += dx * 0.008;
      dragRotation.current.x += dy * 0.008;
      lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Compute interpolated keyframes across scrollProgress
  const currentExplosion = useRef(0);
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 4.4));
  const targetCamLook = useRef(new THREE.Vector3(0, 0, 0));
  const targetWatchRot = useRef(new THREE.Euler(0, 0, 0));
  const labelsOpacity = useRef(0);

  useFrame((state, delta) => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    // Damping drag inertia when not dragging
    if (!isDragging.current) {
      dragRotation.current.x *= 0.95;
      dragRotation.current.y *= 0.95;
    }

    // Scroll Stage Choreography:
    // Stage 0: Hero (0 - 0.20)
    // Stage 1: Craftsmanship (0.20 - 0.40)
    // Stage 2: The Movement - Exploded (0.40 - 0.65)
    // Stage 3: Precision Details (0.65 - 0.82)
    // Stage 4: Collection (0.82 - 0.94)
    // Stage 5: Final CTA (0.94 - 1.0)
    let camX = 0;
    let camY = 0;
    let camZ = 4.4;
    let lookX = 0;
    let lookY = 0;
    let lookZ = 0;
    let rotX = 0.05;
    let rotY = 0.2;
    let rotZ = 0;
    let explosion = 0;
    let showLabels = 0;

    if (p < 0.20) {
      // HERO
      const t = p / 0.20;
      camX = THREE.MathUtils.lerp(0, 0.4, t);
      camY = THREE.MathUtils.lerp(0, -0.1, t);
      camZ = THREE.MathUtils.lerp(4.4, 3.8, t);
      rotX = THREE.MathUtils.lerp(0.08, 0.25, t);
      rotY = THREE.MathUtils.lerp(0.2, -0.4, t);
      explosion = 0;
      showLabels = 0;
    } else if (p < 0.40) {
      // CRAFTSMANSHIP
      const t = (p - 0.20) / 0.20;
      camX = THREE.MathUtils.lerp(0.4, 1.2, t);
      camY = THREE.MathUtils.lerp(-0.1, 0.2, t);
      camZ = THREE.MathUtils.lerp(3.8, 3.2, t);
      lookX = THREE.MathUtils.lerp(0, 0.2, t);
      rotX = THREE.MathUtils.lerp(0.25, 0.4, t);
      rotY = THREE.MathUtils.lerp(-0.4, -1.0, t);
      rotZ = THREE.MathUtils.lerp(0, 0.15, t);
      explosion = THREE.MathUtils.lerp(0, 0.15, t);
      showLabels = 0;
    } else if (p < 0.65) {
      // THE MOVEMENT (Exploded View + Floating Component Labels)
      const t = (p - 0.40) / 0.25;
      camX = THREE.MathUtils.lerp(1.2, 0.0, t);
      camY = THREE.MathUtils.lerp(0.2, 0.05, t);
      camZ = THREE.MathUtils.lerp(3.2, 2.45, t);
      lookX = 0;
      lookY = 0;
      rotX = THREE.MathUtils.lerp(0.4, 0.08, t);
      rotY = THREE.MathUtils.lerp(-1.0, 0.0, t);
      rotZ = THREE.MathUtils.lerp(0.15, 0.0, t);
      // Explode the components apart
      explosion = THREE.MathUtils.lerp(0.15, 1.0, Math.min(t * 1.3, 1));
      // Show labels in peak exploded state
      showLabels = t > 0.2 && t < 0.95 ? Math.sin((t - 0.2) / 0.75 * Math.PI) : 0;
    } else if (p < 0.82) {
      // PRECISION
      const t = (p - 0.65) / 0.17;
      camX = THREE.MathUtils.lerp(0.0, -0.7, t);
      camY = THREE.MathUtils.lerp(0.05, 0.35, t);
      camZ = THREE.MathUtils.lerp(2.45, 2.1, t);
      lookX = THREE.MathUtils.lerp(0, -0.4, t);
      lookY = THREE.MathUtils.lerp(0, 0.2, t);
      rotX = THREE.MathUtils.lerp(0.08, 0.3, t);
      rotY = THREE.MathUtils.lerp(0.0, 0.6, t);
      explosion = THREE.MathUtils.lerp(1.0, 0.2, t);
      showLabels = 0;
    } else if (p < 0.94) {
      // COLLECTION
      const t = (p - 0.82) / 0.12;
      camX = THREE.MathUtils.lerp(-0.7, 0.0, t);
      camY = THREE.MathUtils.lerp(0.35, 0.25, t);
      camZ = THREE.MathUtils.lerp(2.1, 4.6, t);
      lookX = 0;
      lookY = 0;
      rotX = THREE.MathUtils.lerp(0.3, 0.1, t);
      rotY = THREE.MathUtils.lerp(0.6, 0.2 + state.clock.getElapsedTime() * 0.15, t);
      explosion = THREE.MathUtils.lerp(0.2, 0.0, t);
      showLabels = 0;
    } else {
      // FINAL CTA
      const t = (p - 0.94) / 0.06;
      camX = 0;
      camY = 0;
      camZ = THREE.MathUtils.lerp(4.6, 3.8, t);
      rotX = 0.1;
      rotY = state.clock.getElapsedTime() * 0.2;
      explosion = 0;
      showLabels = 0;
    }

    // Set targets
    targetCamPos.current.set(
      camX + mouseParallax.current.x,
      camY + mouseParallax.current.y,
      camZ
    );
    targetCamLook.current.set(lookX, lookY, lookZ);

    targetWatchRot.current.set(
      rotX + dragRotation.current.x,
      rotY + dragRotation.current.y,
      rotZ
    );

    // Smoothly interpolate Camera and Watch
    const smoothFactor = Math.min(delta * 4.5, 1);
    camera.position.lerp(targetCamPos.current, smoothFactor);
    camera.lookAt(targetCamLook.current);

    if (watchGroupRef.current) {
      watchGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        watchGroupRef.current.rotation.x,
        targetWatchRot.current.x,
        smoothFactor
      );
      watchGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        watchGroupRef.current.rotation.y,
        targetWatchRot.current.y,
        smoothFactor
      );
      watchGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        watchGroupRef.current.rotation.z,
        targetWatchRot.current.z,
        smoothFactor
      );
    }

    currentExplosion.current = THREE.MathUtils.lerp(
      currentExplosion.current,
      explosion,
      smoothFactor
    );

    labelsOpacity.current = THREE.MathUtils.lerp(
      labelsOpacity.current,
      showLabels,
      smoothFactor
    );
  });

  return (
    <>
      {/* Dynamic Cinematic Luxury Lighting */}
      <ambientLight intensity={lightingMode === 'noir' ? 0.35 : lightingMode === 'gold' ? 0.65 : 0.5} />

      {/* Main Studio Key Light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={lightingMode === 'gold' ? 2.8 : lightingMode === 'noir' ? 1.8 : 2.4}
        color={lightingMode === 'gold' ? '#fff4e0' : lightingMode === 'noir' ? '#94a3b8' : '#ffffff'}
        castShadow
      />

      {/* Sharp Rim Light 1: grazing top-left chamfers and bezel */}
      <directionalLight
        position={[-6, 4, 3]}
        intensity={lightingMode === 'gold' ? 2.2 : 2.8}
        color={lightingMode === 'gold' ? '#fde68a' : '#38bdf8'}
      />

      {/* Sharp Rim Light 2: grazing bottom-right crown and pushers */}
      <directionalLight
        position={[5, -4, -3]}
        intensity={lightingMode === 'noir' ? 1.8 : 2.2}
        color={lightingMode === 'gold' ? '#f59e0b' : '#e0f2fe'}
      />

      {/* Dial Overhead Softbox Spot */}
      <spotLight
        position={[0, 4, 3.5]}
        angle={0.6}
        penumbra={0.9}
        intensity={lightingMode === 'gold' ? 3.2 : 2.5}
        color={lightingMode === 'gold' ? '#fef3c7' : '#f8fafc'}
      />

      {/* Studio Reflection Environment */}
      <Environment preset="city" />

      {/* Contact shadow on virtual ground below watch */}
      <ContactShadows
        position={[0, -2.2, -0.6]}
        opacity={lightingMode === 'noir' ? 0.85 : 0.65}
        scale={8}
        blur={2.4}
        far={5}
      />

      {/* Procedural 3D Watch with Float physics when floating */}
      <Float
        speed={1.5}
        rotationIntensity={0.12}
        floatIntensity={0.2}
        floatingRange={[-0.04, 0.04]}
      >
        <group ref={watchGroupRef}>
          <ProceduralWatch
            finish={finish}
            explodedProgress={currentExplosion.current}
          />
          <MovementLabels
            visible={labelsOpacity.current > 0.02}
            opacity={labelsOpacity.current}
          />
        </group>
      </Float>
    </>
  );
};

export const WatchCanvas: React.FC<WatchCanvasProps> = ({
  scrollProgress,
  finish,
  lightingMode,
  isFreeOrbit,
}) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#060608] text-zinc-400 p-6 z-0">
        <div className="text-center max-w-md p-8 rounded-2xl glass-panel">
          <p className="text-amber-400 font-mono text-sm uppercase tracking-widest mb-2">Notice</p>
          <h3 className="text-xl font-display font-medium text-white mb-3">Hardware Acceleration Required</h3>
          <p className="text-sm text-zinc-400">Please enable WebGL to experience the full 3D interactive timepiece presentation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 select-none">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        style={{
          background:
            lightingMode === 'gold'
              ? 'radial-gradient(circle at 50% 45%, rgba(212, 175, 55, 0.08) 0%, rgba(6, 6, 8, 0.98) 75%)'
              : lightingMode === 'noir'
              ? 'radial-gradient(circle at 50% 45%, rgba(30, 41, 59, 0.12) 0%, rgba(6, 6, 8, 0.99) 75%)'
              : 'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.06) 0%, rgba(6, 6, 8, 0.98) 75%)',
        }}
      />

      <Canvas
        shadows
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          <SceneController
            scrollProgress={scrollProgress}
            finish={finish}
            lightingMode={lightingMode}
            isFreeOrbit={isFreeOrbit}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
