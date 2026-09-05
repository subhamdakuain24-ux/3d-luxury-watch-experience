import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WatchFinish } from '../../types';
import {
  getRadialBrushedTextures,
  getLinearBrushedTexture,
  getRehautTexture,
  getChronoSubdialTexture,
  getSecondsSubdialTexture,
  getDateWheelTexture,
  getStrapNormalMap,
  getGenevaStripesTexture,
} from './watchTextures';

interface ProceduralWatchProps {
  finish: WatchFinish;
  explodedProgress: number; // 0 (assembled) to 1 (fully exploded movement)
  rotationOffset?: [number, number, number];
}

export const ProceduralWatch: React.FC<ProceduralWatchProps> = ({
  finish,
  explodedProgress,
  rotationOffset = [0, 0, 0],
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Animated component refs
  const secondHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Group>(null);
  const chronoSubdialHandRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);
  const escapeWheelRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);
  const gear3Ref = useRef<THREE.Group>(null);
  const columnWheelRef = useRef<THREE.Group>(null);
  const rotorRef = useRef<THREE.Group>(null);

  // Textures
  const textures = useMemo(() => {
    const radial = getRadialBrushedTextures();
    const linear = getLinearBrushedTexture();
    const rehaut = getRehautTexture();
    const chrono = getChronoSubdialTexture();
    const seconds = getSecondsSubdialTexture();
    const date = getDateWheelTexture();
    const strapNorm = getStrapNormalMap();
    const geneva = getGenevaStripesTexture();

    return {
      radialNormal: radial.normalMap,
      radialRoughness: radial.roughnessMap,
      linearNormal: linear,
      rehaut,
      chrono,
      seconds,
      date,
      strapNorm,
      geneva,
    };
  }, []);

  // Physically Based Materials matching high-end luxury watch finishes
  const materials = useMemo(() => {
    const isGold = finish === 'gold';
    const isNoir = finish === 'noir';

    // Metal Base Tints
    // Noir: Black Ceramic & DLC Micro-blasted Titanium (Hublot All Black / Big Bang Unico style)
    // Gold: 18K Everose / King Gold with satin-brushed grain
    // Steel: 904L aerospace stainless steel & Grade 5 Titanium
    const metalColor = isNoir ? '#131317' : isGold ? '#d6a86c' : '#d8dbe2';
    const bezelColor = isNoir ? '#0d0d10' : isGold ? '#ca9b5d' : '#22252c';
    const screwColor = isNoir ? '#27272e' : isGold ? '#dfba7c' : '#f1f5f9';
    const bridgeColor = isNoir ? '#18181c' : '#333742';

    return {
      // Bezel: Circular brushed with anisotropic normal map
      bezel: new THREE.MeshStandardMaterial({
        color: bezelColor,
        metalness: isNoir ? 0.7 : 0.94,
        roughness: isNoir ? 0.35 : 0.22,
        normalMap: textures.radialNormal,
        normalScale: new THREE.Vector2(0.4, 0.4),
        roughnessMap: textures.radialRoughness,
        envMapIntensity: isNoir ? 1.4 : 2.2,
      }),

      // Screws: Polished titanium H-screws
      bezelScrew: new THREE.MeshStandardMaterial({
        color: screwColor,
        metalness: 0.98,
        roughness: 0.12,
        envMapIntensity: 2.5,
      }),

      // Bezel Gasket: Matte black composite/rubber sandwich layer
      gasket: new THREE.MeshStandardMaterial({
        color: '#08080a',
        metalness: 0.1,
        roughness: 0.85,
      }),

      // Case Main: Multi-piece architectural mid-case with linear brushed grain
      caseBrushed: new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: isNoir ? 0.75 : 0.95,
        roughness: isNoir ? 0.38 : 0.26,
        normalMap: textures.linearNormal,
        normalScale: new THREE.Vector2(0.25, 0.25),
        envMapIntensity: isNoir ? 1.3 : 2.0,
      }),

      // Case Polished Chamfers: Mirror-polished beveled edges
      casePolished: new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: 0.98,
        roughness: 0.08,
        envMapIntensity: 2.8,
      }),

      // Lateral Inserts: Composite protective side flanks
      caseInsert: new THREE.MeshStandardMaterial({
        color: isNoir ? '#0a0a0d' : '#1e2026',
        metalness: 0.3,
        roughness: 0.6,
      }),

      // Sapphire Crystal: Physically based double-domed synthetic sapphire with AR coating
      crystal: new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        metalness: 0.0,
        roughness: 0.015,
        transmission: 0.98,
        thickness: 0.35,
        ior: 1.77, // Real synthetic corundum sapphire index of refraction
        transparent: true,
        opacity: 0.25,
        reflectivity: 0.9,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        envMapIntensity: 2.4,
      }),

      // Rehaut Chapter Ring: Sloped printed minute track
      rehaut: new THREE.MeshStandardMaterial({
        map: textures.rehaut,
        metalness: 0.3,
        roughness: 0.45,
      }),

      // Applied 3D Faceted Numerals & Indices
      indices: new THREE.MeshStandardMaterial({
        color: isNoir ? '#3f3f46' : isGold ? '#fef3c7' : '#ffffff',
        metalness: 0.96,
        roughness: 0.12,
        envMapIntensity: 2.2,
      }),

      // Luminous Fill inside Hands & Indices
      lume: new THREE.MeshStandardMaterial({
        color: '#e2e8f0',
        emissive: '#38bdf8',
        emissiveIntensity: 0.15,
        roughness: 0.3,
      }),

      // Hands: Satin-brushed skeleton sword hands with polished chamfers
      hands: new THREE.MeshStandardMaterial({
        color: isNoir ? '#71717a' : isGold ? '#faebd0' : '#f8fafc',
        metalness: 0.98,
        roughness: 0.18,
        envMapIntensity: 2.4,
      }),

      // Chrono Seconds Needle: Vivid racing red with polished counterweight
      secondsNeedle: new THREE.MeshStandardMaterial({
        color: '#ef4444',
        metalness: 0.4,
        roughness: 0.2,
        envMapIntensity: 1.5,
      }),

      // Date Wheel Disc
      dateDisc: new THREE.MeshStandardMaterial({
        map: textures.date,
        transparent: true,
        metalness: 0.8,
        roughness: 0.3,
      }),

      // Chrono Subdial Disc (3 o'clock)
      chronoSubdial: new THREE.MeshStandardMaterial({
        map: textures.chrono,
        metalness: 0.8,
        roughness: 0.25,
      }),

      // Seconds Subdial Disc (9 o'clock)
      secondsSubdial: new THREE.MeshStandardMaterial({
        map: textures.seconds,
        metalness: 0.8,
        roughness: 0.25,
      }),

      // Movement Bridge Plates: Ruthenium anthracite with Geneva stripes
      movementBridge: new THREE.MeshStandardMaterial({
        color: bridgeColor,
        metalness: 0.92,
        roughness: 0.3,
        normalMap: textures.geneva,
        normalScale: new THREE.Vector2(0.2, 0.2),
        envMapIntensity: 1.6,
      }),

      // Brass / 18K Gold Horological Gears
      brassGear: new THREE.MeshStandardMaterial({
        color: isGold ? '#d4af37' : '#e5c158',
        metalness: 0.96,
        roughness: 0.2,
        envMapIntensity: 2.0,
      }),

      // Silicium Blue Escapement & Hairspring
      silicium: new THREE.MeshStandardMaterial({
        color: '#2563eb',
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 1.8,
      }),

      // Blued Steel Screws
      bluedScrew: new THREE.MeshStandardMaterial({
        color: '#1d4ed8',
        metalness: 0.92,
        roughness: 0.18,
        envMapIntensity: 2.0,
      }),

      // Synthetic Corundum Ruby Jewels (Bearing cups)
      rubyJewel: new THREE.MeshPhysicalMaterial({
        color: '#e11d48',
        emissive: '#be123c',
        emissiveIntensity: 0.25,
        roughness: 0.08,
        transmission: 0.75,
        thickness: 0.3,
        transparent: true,
      }),

      // Luxury Textured Rubber Strap
      rubberStrap: new THREE.MeshStandardMaterial({
        color: '#0a0a0c',
        metalness: 0.05,
        roughness: 0.78,
        normalMap: textures.strapNorm,
        normalScale: new THREE.Vector2(0.8, 0.8),
        envMapIntensity: 0.8,
      }),

      // Deployant Clasp & Hardware
      buckleMetal: new THREE.MeshStandardMaterial({
        color: metalColor,
        metalness: 0.95,
        roughness: 0.2,
        envMapIntensity: 2.0,
      }),
    };
  }, [finish, textures]);

  // 6 Industrial Bezel H-Screws (positioned at 12, 2, 4, 6, 8, 10 o'clock)
  const bezelScrews = useMemo(() => {
    const screws = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 1.42;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      screws.push({
        id: `bezel-screw-${i}`,
        pos: [x, y, 0.03] as [number, number, number],
        rotZ: angle + (i % 2 === 0 ? 0.3 : -0.2), // Controlled slight natural offset
      });
    }
    return screws;
  }, []);

  // 3D Stencil Numerals & Faceted Markers around the dial
  const dialIndices = useMemo(() => {
    // Numerals at 12, 2, 4, 6, 8, 10 + Batons at 1, 5, 7, 11
    return [
      { text: '12', angle: 0, isNumeral: true },
      { text: '1', angle: Math.PI / 6, isNumeral: false },
      { text: '2', angle: Math.PI / 3, isNumeral: true },
      { text: '4', angle: (2 * Math.PI) / 3, isNumeral: true },
      { text: '5', angle: (5 * Math.PI) / 6, isNumeral: false },
      { text: '6', angle: Math.PI, isNumeral: true },
      { text: '7', angle: (7 * Math.PI) / 6, isNumeral: false },
      { text: '8', angle: (4 * Math.PI) / 3, isNumeral: true },
      { text: '10', angle: (5 * Math.PI) / 3, isNumeral: true },
      { text: '11', angle: (11 * Math.PI) / 6, isNumeral: false },
    ];
  }, []);

  // Real-time horological animation loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. High-frequency balance wheel oscillation: 4 Hz (28,800 VPH / 8 beats per second)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(t * 26) * 1.25;
    }

    // 2. Escape wheel stepped rotation
    if (escapeWheelRef.current) {
      escapeWheelRef.current.rotation.z = -t * 8;
    }

    // 3. Interlocking mechanical gear train
    if (gear1Ref.current) gear1Ref.current.rotation.z = t * 1.2;
    if (gear2Ref.current) gear2Ref.current.rotation.z = -t * 1.8;
    if (gear3Ref.current) gear3Ref.current.rotation.z = t * 2.6;

    // 4. Column wheel ratchet indexing
    if (columnWheelRef.current) {
      columnWheelRef.current.rotation.z = Math.floor(t * 1.5) * (Math.PI / 4);
    }

    // 5. Automatic winding rotor (responsive weighted oscillation with damping)
    if (rotorRef.current) {
      rotorRef.current.rotation.z =
        Math.sin(t * 0.9) * 1.1 + Math.cos(t * 1.6) * 0.45;
    }

    // 6. Chronograph seconds hand: smooth sweeping chronograph needle (1 rev / min)
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -t * 1.2; // Accelerated for visual horological rhythm
    }

    // 7. Minute and Hour hands
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -t * (1.2 / 12);
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -t * (1.2 / 144);
    }

    // 8. 60-Minute Chrono Subdial needle (register at 3 o'clock)
    if (chronoSubdialHandRef.current) {
      chronoSubdialHandRef.current.rotation.z = -t * (1.2 / 10);
    }
  });

  // Layer explosion separation along Z axis (0 to 1)
  const ep = Math.min(Math.max(explodedProgress, 0), 1);

  // Precise exploded layers matching high-end CAD disassembly:
  const bezelScrewsZ = 0.38 + ep * 2.7;
  const crystalZ = 0.32 + ep * 2.2;
  const bezelZ = 0.24 + ep * 1.7;
  const gasketZ = 0.16 + ep * 1.35;
  const rehautZ = 0.12 + ep * 1.1;
  const handsZ = 0.1 + ep * 0.95;
  const skeletonDialZ = 0.04 + ep * 0.7;
  const subdialZ = 0.05 + ep * 0.75;
  const movementZ = 0; // Anchored mechanical calibre in center
  const caseZ = -0.06 - ep * 0.45;
  const casebackZ = -0.32 - ep * 1.2;
  const casebackScrewsZ = -0.36 - ep * 1.6;
  const rotorZ = -0.42 - ep * 1.9;

  return (
    <group ref={groupRef} rotation={rotationOffset}>
      {/* ============================================================ */}
      {/* LAYER 1: BEZEL INDUSTRIAL H-SCREWS                           */}
      {/* ============================================================ */}
      <group position={[0, 0, bezelScrewsZ]}>
        {bezelScrews.map((screw) => (
          <group key={screw.id} position={screw.pos} rotation={[0, 0, screw.rotZ]}>
            {/* Screw Head */}
            <mesh material={materials.bezelScrew}>
              <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
            </mesh>
            {/* Distinctive Hublot/Audemars style H-shaped slot cutout */}
            <mesh material={materials.caseInsert} position={[0, 0, 0.02]}>
              <boxGeometry args={[0.09, 0.02, 0.015]} />
            </mesh>
            <mesh material={materials.caseInsert} position={[-0.035, 0, 0.02]}>
              <boxGeometry args={[0.02, 0.06, 0.015]} />
            </mesh>
            <mesh material={materials.caseInsert} position={[0.035, 0, 0.02]}>
              <boxGeometry args={[0.02, 0.06, 0.015]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* LAYER 2: DOUBLE-DOMED SAPPHIRE CRYSTAL                        */}
      {/* ============================================================ */}
      <group position={[0, 0, crystalZ]}>
        <mesh material={materials.crystal}>
          <cylinderGeometry args={[1.34, 1.34, 0.06, 64]} />
        </mesh>
        {/* Anti-reflective edge glare ring */}
        <mesh material={materials.crystal} position={[0, 0, 0.03]}>
          <torusGeometry args={[1.33, 0.02, 16, 64]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 3: BRUSHED CERAMIC/TITANIUM BEZEL                      */}
      {/* ============================================================ */}
      <group position={[0, 0, bezelZ]}>
        {/* Main Bezel Ring with circular brushed anisotropic finish */}
        <mesh material={materials.bezel}>
          <cylinderGeometry args={[1.56, 1.58, 0.08, 64]} />
        </mesh>
        {/* Inner Polished Chamfer Step */}
        <mesh material={materials.casePolished} position={[0, 0, 0.042]}>
          <ringGeometry args={[1.34, 1.38, 64]} />
        </mesh>
        {/* Outer Polished Bevel Edge */}
        <mesh material={materials.casePolished} position={[0, 0, 0.042]}>
          <ringGeometry args={[1.54, 1.57, 64]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 4: COMPOSITE GASKET SANDWICH RING                      */}
      {/* ============================================================ */}
      <group position={[0, 0, gasketZ]}>
        <mesh material={materials.gasket}>
          <cylinderGeometry args={[1.58, 1.58, 0.05, 64]} />
        </mesh>
        {/* Lateral screw-retaining notches */}
        <mesh material={materials.caseInsert} position={[-1.56, 0, 0]}>
          <boxGeometry args={[0.12, 0.45, 0.06]} />
        </mesh>
        <mesh material={materials.caseInsert} position={[1.56, 0, 0]}>
          <boxGeometry args={[0.12, 0.45, 0.06]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 5: REHAUT (CHAPTER RING) WITH MINUTE MARKINGS          */}
      {/* ============================================================ */}
      <group position={[0, 0, rehautZ]}>
        <mesh material={materials.rehaut}>
          {/* Sloped conic rehaut ring */}
          <cylinderGeometry args={[1.33, 1.25, 0.09, 64, 1, true]} />
        </mesh>
        <mesh material={materials.casePolished} position={[0, 0, 0.045]}>
          <ringGeometry args={[1.325, 1.34, 64]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* LAYER 6: SKELETON HANDS                                      */}
      {/* ============================================================ */}
      <group position={[0, 0, handsZ]}>
        {/* Central Cannon Pinion Cap */}
        <mesh material={materials.hands} position={[0, 0, 0.05]}>
          <cylinderGeometry args={[0.07, 0.07, 0.04, 32]} />
        </mesh>
        <mesh material={materials.rubyJewel} position={[0, 0, 0.07]}>
          <cylinderGeometry args={[0.03, 0.03, 0.015, 16]} />
        </mesh>

        {/* 1. Hour Hand (Faceted openworked sword) */}
        <group ref={hourHandRef} position={[0, 0, 0.015]}>
          {/* Left blade */}
          <mesh material={materials.hands} position={[-0.03, 0.32, 0]}>
            <boxGeometry args={[0.035, 0.62, 0.02]} />
          </mesh>
          {/* Right blade */}
          <mesh material={materials.hands} position={[0.03, 0.32, 0]}>
            <boxGeometry args={[0.035, 0.62, 0.02]} />
          </mesh>
          {/* Luminous Pointer Tip */}
          <mesh material={materials.lume} position={[0, 0.66, 0]}>
            <boxGeometry args={[0.07, 0.16, 0.025]} />
          </mesh>
          {/* Counterbalance ring */}
          <mesh material={materials.hands} position={[0, -0.15, 0]}>
            <torusGeometry args={[0.08, 0.02, 16, 24]} />
          </mesh>
        </group>

        {/* 2. Minute Hand (Long faceted skeleton sword) */}
        <group ref={minuteHandRef} position={[0, 0, 0.03]}>
          {/* Left blade */}
          <mesh material={materials.hands} position={[-0.025, 0.46, 0]}>
            <boxGeometry args={[0.03, 0.92, 0.018]} />
          </mesh>
          {/* Right blade */}
          <mesh material={materials.hands} position={[0.025, 0.46, 0]}>
            <boxGeometry args={[0.03, 0.92, 0.018]} />
          </mesh>
          {/* Luminous Pointer Tip */}
          <mesh material={materials.lume} position={[0, 0.96, 0]}>
            <boxGeometry args={[0.06, 0.18, 0.022]} />
          </mesh>
          {/* Counterbalance ring */}
          <mesh material={materials.hands} position={[0, -0.18, 0]}>
            <torusGeometry args={[0.08, 0.02, 16, 24]} />
          </mesh>
        </group>

        {/* 3. Central Chronograph Seconds Needle (Fine red needle with skeleton counterweight) */}
        <group ref={secondHandRef} position={[0, 0, 0.045]}>
          {/* Needle Shaft */}
          <mesh material={materials.secondsNeedle} position={[0, 0.52, 0]}>
            <boxGeometry args={[0.018, 1.15, 0.012]} />
          </mesh>
          {/* Arrow Tip */}
          <mesh material={materials.secondsNeedle} position={[0, 1.12, 0]}>
            <coneGeometry args={[0.04, 0.12, 4]} />
          </mesh>
          {/* Architectural Skeleton Counterweight */}
          <group position={[0, -0.28, 0]}>
            <mesh material={materials.hands}>
              <boxGeometry args={[0.045, 0.38, 0.015]} />
            </mesh>
            <mesh material={materials.hands} position={[0, -0.15, 0]}>
              <torusGeometry args={[0.07, 0.018, 16, 24]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ============================================================ */}
      {/* LAYER 7: SKELETON DIAL, SUBDIALS & APPLIED NUMERALS          */}
      {/* ============================================================ */}
      <group position={[0, 0, skeletonDialZ]}>
        {/* Skeleton Baseplate Frame (Openwork multi-tier architecture) */}
        <mesh material={materials.movementBridge} position={[0, 0, 0]}>
          <ringGeometry args={[0.42, 1.25, 48]} />
        </mesh>

        {/* Applied 3D Faceted Numerals & Indices */}
        {dialIndices.map((idx, i) => {
          const r = 1.05;
          const x = Math.sin(idx.angle) * r;
          const y = Math.cos(idx.angle) * r;

          return (
            <group key={`index-${i}`} position={[x, y, 0.012]} rotation={[0, 0, -idx.angle]}>
              {idx.isNumeral ? (
                // 3D Stencil Faceted Numeral Block
                <group>
                  <mesh material={materials.indices}>
                    <boxGeometry args={[0.16, 0.22, 0.035]} />
                  </mesh>
                  {/* Dark stencil center cavity */}
                  <mesh material={materials.gasket} position={[0, 0, 0.018]}>
                    <boxGeometry args={[0.08, 0.14, 0.01]} />
                  </mesh>
                </group>
              ) : (
                // Faceted Baton Marker with Luminous Inset
                <group>
                  <mesh material={materials.indices}>
                    <boxGeometry args={[0.05, 0.18, 0.03]} />
                  </mesh>
                  <mesh material={materials.lume} position={[0, 0, 0.016]}>
                    <boxGeometry args={[0.025, 0.12, 0.01]} />
                  </mesh>
                </group>
              )}
            </group>
          );
        })}

        {/* Skeleton Date Ring (Circling the movement) */}
        <mesh material={materials.dateDisc} position={[0, 0, -0.01]}>
          <ringGeometry args={[0.82, 1.18, 48]} />
        </mesh>
      </group>

      {/* Subdials Group (3 o'clock Chrono & 9 o'clock Seconds) */}
      <group position={[0, 0, subdialZ]}>
        {/* Chronograph 60-Minute Subdial at 3 o'clock */}
        <group position={[0.54, 0, 0]}>
          <mesh material={materials.chronoSubdial}>
            <circleGeometry args={[0.38, 32]} />
          </mesh>
          {/* Polished Subdial Bezel Ring */}
          <mesh material={materials.indices} position={[0, 0, 0.005]}>
            <ringGeometry args={[0.36, 0.39, 32]} />
          </mesh>
          {/* Chrono Register Needle */}
          <group ref={chronoSubdialHandRef} position={[0, 0, 0.015]}>
            <mesh material={materials.secondsNeedle} position={[0, 0.12, 0]}>
              <boxGeometry args={[0.018, 0.22, 0.01]} />
            </mesh>
            <mesh material={materials.hands}>
              <cylinderGeometry args={[0.03, 0.03, 0.015, 16]} />
            </mesh>
          </group>
        </group>

        {/* Running Seconds Subdial at 9 o'clock */}
        <group position={[-0.54, 0, 0]}>
          <mesh material={materials.secondsSubdial}>
            <circleGeometry args={[0.34, 32]} />
          </mesh>
          <mesh material={materials.indices} position={[0, 0, 0.005]}>
            <ringGeometry args={[0.32, 0.35, 32]} />
          </mesh>
          {/* Seconds subdial hand */}
          <group position={[0, 0, 0.015]}>
            <mesh material={materials.hands} position={[0, 0.1, 0]}>
              <boxGeometry args={[0.016, 0.18, 0.01]} />
            </mesh>
            <mesh material={materials.hands}>
              <cylinderGeometry args={[0.025, 0.025, 0.012, 16]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ============================================================ */}
      {/* LAYER 8: IN-HOUSE CHRONOVA CALIBRE 9001 (VISIBLE MOVEMENT)   */}
      {/* ============================================================ */}
      <group position={[0, 0, movementZ]}>
        {/* Main Baseplate (Anthracite with perlage graining) */}
        <mesh material={materials.movementBridge} position={[0, 0, -0.04]}>
          <cylinderGeometry args={[1.3, 1.3, 0.06, 48]} />
        </mesh>

        {/* 1. COLUMN WHEEL MECHANISM (At 6 o'clock, hallmark of haute horlogerie) */}
        <group ref={columnWheelRef} position={[0, -0.58, 0.02]}>
          {/* Column Wheel Base Ring */}
          <mesh material={materials.bluedScrew}>
            <cylinderGeometry args={[0.16, 0.16, 0.03, 24]} />
          </mesh>
          {/* 8 Polished Vertical Pillars */}
          {Array.from({ length: 8 }).map((_, pi) => {
            const pa = (pi / 8) * Math.PI * 2;
            return (
              <mesh
                key={`pillar-${pi}`}
                material={materials.hands}
                position={[Math.cos(pa) * 0.11, Math.sin(pa) * 0.11, 0.025]}
              >
                <cylinderGeometry args={[0.018, 0.018, 0.04, 12]} />
              </mesh>
            );
          })}
          {/* Center blued screw */}
          <mesh material={materials.bluedScrew} position={[0, 0, 0.04]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          </mesh>
        </group>

        {/* 2. RAPIDLY OSCILLATING BALANCE WHEEL & SILICIUM HAIRSPRING (At 8 o'clock) */}
        <group ref={balanceWheelRef} position={[-0.45, -0.42, 0.03]}>
          {/* Variable-inertia gold balance wheel rim with perimeter weights */}
          <mesh material={materials.brassGear}>
            <torusGeometry args={[0.32, 0.026, 16, 32]} />
          </mesh>
          {/* 3 Openworked Spokes */}
          {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((spAngle, sIdx) => (
            <group key={`spoke-${sIdx}`} rotation={[0, 0, spAngle]}>
              <mesh material={materials.brassGear} position={[0, 0.15, 0]}>
                <boxGeometry args={[0.035, 0.28, 0.018]} />
              </mesh>
            </group>
          ))}
          {/* Blue Silicium Hairspring Coils */}
          <mesh material={materials.silicium} position={[0, 0, -0.012]}>
            <torusGeometry args={[0.16, 0.01, 12, 32]} />
          </mesh>
          <mesh material={materials.silicium} position={[0, 0, -0.012]}>
            <torusGeometry args={[0.22, 0.01, 12, 32]} />
          </mesh>
          {/* Synthetic Ruby Jewel Shock-Absorber Pivot (Incabloc) */}
          <mesh material={materials.rubyJewel} position={[0, 0, 0.02]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 16]} />
          </mesh>
          <mesh material={materials.casePolished} position={[0, 0, 0.02]}>
            <torusGeometry args={[0.075, 0.015, 12, 24]} />
          </mesh>
        </group>

        {/* 3. ESCAPEMENT WHEEL & PALLET FORK (Near balance wheel) */}
        <group ref={escapeWheelRef} position={[-0.2, -0.32, 0.02]}>
          <mesh material={materials.silicium}>
            <cylinderGeometry args={[0.18, 0.18, 0.02, 20]} />
          </mesh>
          {/* Synthetic Ruby Pallet Stones */}
          <mesh material={materials.rubyJewel} position={[0.08, 0.07, 0.01]}>
            <boxGeometry args={[0.035, 0.06, 0.025]} />
          </mesh>
          <mesh material={materials.rubyJewel} position={[-0.08, 0.07, 0.01]}>
            <boxGeometry args={[0.035, 0.06, 0.025]} />
          </mesh>
        </group>

        {/* 4. MAINSPRING POWER RESERVE BARREL (At 1 o'clock) */}
        <group position={[0.38, 0.44, 0.01]}>
          <mesh material={materials.movementBridge}>
            <cylinderGeometry args={[0.42, 0.42, 0.05, 36]} />
          </mesh>
          {/* Toothed perimeter rim */}
          <mesh material={materials.brassGear} position={[0, 0, 0.028]}>
            <torusGeometry args={[0.4, 0.018, 16, 36]} />
          </mesh>
          {/* Sunburst ratchet wheel with central blued screw */}
          <mesh material={materials.hands} position={[0, 0, 0.032]}>
            <cylinderGeometry args={[0.26, 0.26, 0.015, 24]} />
          </mesh>
          <mesh material={materials.bluedScrew} position={[0, 0, 0.045]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
          </mesh>
        </group>

        {/* 5. INTERLOCKING GEAR TRAIN PINIONS (Spoke Cutouts) */}
        {/* Center Wheel */}
        <group ref={gear1Ref} position={[-0.05, 0.08, 0.015]}>
          <mesh material={materials.brassGear}>
            <torusGeometry args={[0.32, 0.025, 12, 32]} />
          </mesh>
          {[0, Math.PI / 2].map((ga, gi) => (
            <mesh key={`g1-${gi}`} material={materials.brassGear} rotation={[0, 0, ga]}>
              <boxGeometry args={[0.62, 0.035, 0.015]} />
            </mesh>
          ))}
          <mesh material={materials.rubyJewel} position={[0, 0, 0.015]}>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
          </mesh>
        </group>

        {/* Third Wheel */}
        <group ref={gear2Ref} position={[-0.32, 0.18, 0.02]}>
          <mesh material={materials.brassGear}>
            <torusGeometry args={[0.24, 0.02, 12, 28]} />
          </mesh>
          <mesh material={materials.brassGear}>
            <boxGeometry args={[0.46, 0.03, 0.015]} />
          </mesh>
          <mesh material={materials.rubyJewel} position={[0, 0, 0.015]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          </mesh>
        </group>

        {/* Fourth Wheel */}
        <group ref={gear3Ref} position={[0.18, -0.15, 0.02]}>
          <mesh material={materials.brassGear}>
            <torusGeometry args={[0.28, 0.022, 12, 30]} />
          </mesh>
          <mesh material={materials.brassGear}>
            <boxGeometry args={[0.54, 0.03, 0.015]} />
          </mesh>
          <mesh material={materials.rubyJewel} position={[0, 0, 0.015]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          </mesh>
        </group>

        {/* 6. RUBY JEWEL BEARINGS IN GOLD CHATONS */}
        {[
          [-0.2, 0.35],
          [0.25, 0.22],
          [0.48, -0.15],
          [-0.52, -0.1],
          [0.15, -0.42],
        ].map(([jx, jy], idx) => (
          <group key={`chaton-${idx}`} position={[jx, jy, 0.02]}>
            {/* Gold Chaton Setting */}
            <mesh material={materials.brassGear}>
              <cylinderGeometry args={[0.07, 0.07, 0.015, 16]} />
            </mesh>
            {/* Ruby Jewel Cup */}
            <mesh material={materials.rubyJewel} position={[0, 0, 0.008]}>
              <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} />
            </mesh>
          </group>
        ))}

        {/* 7. BLUED STEEL ASSEMBLY SCREWS */}
        {[
          [-0.45, 0.42],
          [0.55, 0.2],
          [-0.58, 0.15],
          [-0.15, -0.52],
          [0.45, -0.38],
        ].map(([sx, sy], idx) => (
          <group key={`mscrew-${idx}`} position={[sx, sy, 0.025]}>
            <mesh material={materials.bluedScrew}>
              <cylinderGeometry args={[0.048, 0.048, 0.022, 16]} />
            </mesh>
            {/* Screw Slot */}
            <mesh
              material={materials.movementBridge}
              position={[0, 0, 0.012]}
              rotation={[0, 0, idx * 0.8]}
            >
              <boxGeometry args={[0.08, 0.012, 0.01]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* LAYER 9: MULTI-PIECE ARCHITECTURAL CASE, LUGS & STRAP        */}
      {/* ============================================================ */}
      <group position={[0, 0, caseZ]}>
        {/* Main Central Case Cylinder */}
        <mesh material={materials.caseBrushed} position={[0, 0, -0.1]}>
          <cylinderGeometry args={[1.56, 1.56, 0.36, 64]} />
        </mesh>

        {/* 4 Sculpted Architectural Lugs with 45-degree mirror-polished bevels */}
        {/* Top-Left Lug */}
        <group position={[-1.02, 1.52, -0.1]} rotation={[-0.2, 0, 0.22]}>
          <mesh material={materials.caseBrushed}>
            <boxGeometry args={[0.26, 0.72, 0.34]} />
          </mesh>
          {/* Polished outer chamfer */}
          <mesh material={materials.casePolished} position={[-0.13, 0, 0.05]}>
            <boxGeometry args={[0.04, 0.72, 0.28]} />
          </mesh>
        </group>

        {/* Top-Right Lug */}
        <group position={[1.02, 1.52, -0.1]} rotation={[-0.2, 0, -0.22]}>
          <mesh material={materials.caseBrushed}>
            <boxGeometry args={[0.26, 0.72, 0.34]} />
          </mesh>
          <mesh material={materials.casePolished} position={[0.13, 0, 0.05]}>
            <boxGeometry args={[0.04, 0.72, 0.28]} />
          </mesh>
        </group>

        {/* Bottom-Left Lug */}
        <group position={[-1.02, -1.52, -0.1]} rotation={[0.2, 0, -0.22]}>
          <mesh material={materials.caseBrushed}>
            <boxGeometry args={[0.26, 0.72, 0.34]} />
          </mesh>
          <mesh material={materials.casePolished} position={[-0.13, 0, 0.05]}>
            <boxGeometry args={[0.04, 0.72, 0.28]} />
          </mesh>
        </group>

        {/* Bottom-Right Lug */}
        <group position={[1.02, -1.52, -0.1]} rotation={[0.2, 0, 0.22]}>
          <mesh material={materials.caseBrushed}>
            <boxGeometry args={[0.26, 0.72, 0.34]} />
          </mesh>
          <mesh material={materials.casePolished} position={[0.13, 0, 0.05]}>
            <boxGeometry args={[0.04, 0.72, 0.28]} />
          </mesh>
        </group>

        {/* CROWN & CHRONOGRAPH PUSHERS AT 3 O'CLOCK */}
        {/* 1. Main Oversized Crown at 3 o'clock */}
        <group position={[1.68, 0, -0.08]} rotation={[0, 0, -Math.PI / 2]}>
          {/* Ribbed Rubber Grip Knurling Ring */}
          <mesh material={materials.gasket}>
            <cylinderGeometry args={[0.25, 0.25, 0.16, 24]} />
          </mesh>
          {/* Polished Crown Cap with embossed crest */}
          <mesh material={materials.casePolished} position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
          </mesh>
          <mesh material={materials.indices} position={[0, 0.13, 0]}>
            <torusGeometry args={[0.12, 0.02, 12, 24]} />
          </mesh>
        </group>

        {/* 2. Top Chronograph Start/Stop Pusher at 2 o'clock */}
        <group position={[1.48, 0.72, -0.08]} rotation={[0, 0, -Math.PI / 4]}>
          {/* Brushed Pusher Collar Sleeve */}
          <mesh material={materials.caseBrushed}>
            <cylinderGeometry args={[0.14, 0.14, 0.2, 24]} />
          </mesh>
          {/* Red Indicator Ring Accent */}
          <mesh material={materials.secondsNeedle} position={[0, 0.08, 0]}>
            <torusGeometry args={[0.13, 0.015, 12, 24]} />
          </mesh>
          {/* Polished Plunger Actuation Cap */}
          <mesh material={materials.casePolished} position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
          </mesh>
        </group>

        {/* 3. Bottom Chronograph Reset Pusher at 4 o'clock */}
        <group position={[1.48, -0.72, -0.08]} rotation={[0, 0, -Math.PI * 0.75]}>
          <mesh material={materials.caseBrushed}>
            <cylinderGeometry args={[0.14, 0.14, 0.2, 24]} />
          </mesh>
          <mesh material={materials.casePolished} position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 24]} />
          </mesh>
        </group>

        {/* HIGH-PERFORMANCE LUXURY RIBBED RUBBER STRAP */}
        {/* Top Strap with natural ergonomic wrist drape */}
        <group position={[0, 1.54, -0.14]}>
          {/* Integrated Titanium End-Link */}
          <mesh material={materials.buckleMetal} position={[0, 0.15, 0]}>
            <boxGeometry args={[1.18, 0.24, 0.22]} />
          </mesh>
          {/* Ribbed Molded Rubber Section with curved contour */}
          {Array.from({ length: 8 }).map((_, li) => {
            const yDist = 0.36 + li * 0.38;
            const curveZ = -Math.pow(li * 0.14, 2) * 1.5;
            const rotX = -li * 0.07;
            const strapW = Math.max(0.92, 1.22 - li * 0.04);

            return (
              <group key={`top-strap-${li}`} position={[0, yDist, curveZ]} rotation={[rotX, 0, 0]}>
                <mesh material={materials.rubberStrap}>
                  <boxGeometry args={[strapW, 0.36, 0.16]} />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* Bottom Strap */}
        <group position={[0, -1.54, -0.14]}>
          <mesh material={materials.buckleMetal} position={[0, -0.15, 0]}>
            <boxGeometry args={[1.18, 0.24, 0.22]} />
          </mesh>
          {Array.from({ length: 8 }).map((_, li) => {
            const yDist = -(0.36 + li * 0.38);
            const curveZ = -Math.pow(li * 0.14, 2) * 1.5;
            const rotX = li * 0.07;
            const strapW = Math.max(0.92, 1.22 - li * 0.04);

            return (
              <group key={`bot-strap-${li}`} position={[0, yDist, curveZ]} rotation={[rotX, 0, 0]}>
                <mesh material={materials.rubberStrap}>
                  <boxGeometry args={[strapW, 0.36, 0.16]} />
                </mesh>
              </group>
            );
          })}

          {/* Luxury Deployant Clasp Buckle Mechanism */}
          <group position={[0, -3.4, -0.9]} rotation={[0.5, 0, 0]}>
            <mesh material={materials.buckleMetal}>
              <boxGeometry args={[1.05, 0.45, 0.2]} />
            </mesh>
            <mesh material={materials.casePolished} position={[0, 0, 0.11]}>
              <boxGeometry args={[0.5, 0.08, 0.02]} />
            </mesh>
          </group>
        </group>
      </group>

      {/* ============================================================ */}
      {/* LAYER 10: EXHIBITION CASEBACK & CASEBACK SCREWS              */}
      {/* ============================================================ */}
      <group position={[0, 0, casebackZ]}>
        {/* Outer Titanium Caseback Ring */}
        <mesh material={materials.caseBrushed}>
          <ringGeometry args={[1.1, 1.54, 48]} />
        </mesh>
        {/* Exhibition Sapphire Crystal Back Window */}
        <mesh material={materials.crystal}>
          <cylinderGeometry args={[1.1, 1.1, 0.04, 48]} />
        </mesh>
      </group>

      {/* Caseback Screws */}
      <group position={[0, 0, casebackScrewsZ]}>
        {bezelScrews.map((s, si) => (
          <group key={`cbscrew-${si}`} position={[-s.pos[0], s.pos[1], 0]}>
            <mesh material={materials.bezelScrew}>
              <cylinderGeometry args={[0.065, 0.065, 0.03, 16]} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* LAYER 11: SKELETONIZED WINDING ROTOR (AUTOMATIC CALIBRE)     */}
      {/* ============================================================ */}
      <group ref={rotorRef} position={[0, 0, rotorZ]}>
        {/* Heavy Tungsten Outer Semi-Circular Rim */}
        <mesh material={materials.movementBridge} position={[0, 0.46, 0]}>
          <cylinderGeometry args={[1.18, 1.18, 0.035, 32, 1, false, 0, Math.PI]} />
        </mesh>
        {/* Openworked Spoke Arms */}
        <mesh material={materials.movementBridge} position={[0, 0.18, 0.005]}>
          <boxGeometry args={[0.16, 0.42, 0.025]} />
        </mesh>
        {/* Outer 22K Gold / Tungsten Inertia Weight Ring */}
        <mesh material={materials.brassGear} position={[0, 0.52, 0.01]}>
          <torusGeometry args={[1.05, 0.04, 16, 32, Math.PI]} />
        </mesh>
        {/* Central Ball-Bearing Assembly */}
        <mesh material={materials.casePolished} position={[0, 0, 0.02]}>
          <torusGeometry args={[0.22, 0.035, 16, 24]} />
        </mesh>
        <mesh material={materials.rubyJewel} position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.08, 0.08, 0.025, 16]} />
        </mesh>
      </group>
    </group>
  );
};
