import * as THREE from 'three';

// Cache generated textures so they are created only once
let cachedTextures: {
  rehautCanvas?: THREE.CanvasTexture;
  subdialChrono?: THREE.CanvasTexture;
  subdialSeconds?: THREE.CanvasTexture;
  dateWheel?: THREE.CanvasTexture;
  radialBrushedNormal?: THREE.CanvasTexture;
  radialBrushedRoughness?: THREE.CanvasTexture;
  linearBrushedNormal?: THREE.CanvasTexture;
  strapNormal?: THREE.CanvasTexture;
  genevaStripes?: THREE.CanvasTexture;
  perlage?: THREE.CanvasTexture;
} = {};

/**
 * Creates high-resolution radial brushed normal & roughness textures
 * for genuine realistic metal specular reflections (anisotropic sheen).
 */
export function getRadialBrushedTextures() {
  if (cachedTextures.radialBrushedNormal && cachedTextures.radialBrushedRoughness) {
    return {
      normalMap: cachedTextures.radialBrushedNormal,
      roughnessMap: cachedTextures.radialBrushedRoughness,
    };
  }

  const size = 1024;
  const canvasNorm = document.createElement('canvas');
  canvasNorm.width = size;
  canvasNorm.height = size;
  const ctxNorm = canvasNorm.getContext('2d')!;

  const canvasRough = document.createElement('canvas');
  canvasRough.width = size;
  canvasRough.height = size;
  const ctxRough = canvasRough.getContext('2d')!;

  // Default normal (flat purple-blue)
  ctxNorm.fillStyle = 'rgb(128, 128, 255)';
  ctxNorm.fillRect(0, 0, size, size);

  ctxRough.fillStyle = '#222222';
  ctxRough.fillRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;

  // Draw concentric micro-grooves
  for (let r = 10; r < size * 0.49; r += 1.5) {
    const jitter = (Math.random() - 0.5) * 0.8;
    const alphaNorm = 0.08 + Math.random() * 0.12;
    const roughVal = Math.floor(40 + Math.random() * 55);

    ctxNorm.beginPath();
    ctxNorm.arc(cx, cy, r + jitter, 0, Math.PI * 2);
    ctxNorm.strokeStyle = `rgba(${128 + (Math.random() - 0.5) * 40}, ${
      128 + (Math.random() - 0.5) * 40
    }, 255, ${alphaNorm})`;
    ctxNorm.lineWidth = 1.0 + Math.random() * 0.8;
    ctxNorm.stroke();

    ctxRough.beginPath();
    ctxRough.arc(cx, cy, r + jitter, 0, Math.PI * 2);
    ctxRough.strokeStyle = `rgb(${roughVal}, ${roughVal}, ${roughVal})`;
    ctxRough.lineWidth = 1.2;
    ctxRough.stroke();
  }

  const normTex = new THREE.CanvasTexture(canvasNorm);
  normTex.wrapS = THREE.RepeatWrapping;
  normTex.wrapT = THREE.RepeatWrapping;
  normTex.anisotropy = 16;

  const roughTex = new THREE.CanvasTexture(canvasRough);
  roughTex.wrapS = THREE.RepeatWrapping;
  roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.anisotropy = 16;

  cachedTextures.radialBrushedNormal = normTex;
  cachedTextures.radialBrushedRoughness = roughTex;

  return { normalMap: normTex, roughnessMap: roughTex };
}

/**
 * Creates linear brushed satin normal map for lugs and case sides.
 */
export function getLinearBrushedTexture() {
  if (cachedTextures.linearBrushedNormal) {
    return cachedTextures.linearBrushedNormal;
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, size, size);

  for (let y = 0; y < size; y += 2) {
    const val = 128 + (Math.random() - 0.5) * 35;
    ctx.fillStyle = `rgba(${val}, ${val}, 255, 0.18)`;
    ctx.fillRect(0, y, size, 1 + Math.random() * 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 4);
  tex.anisotropy = 16;

  cachedTextures.linearBrushedNormal = tex;
  return tex;
}

/**
 * Creates high-precision rehaut (chapter ring) markings:
 * Crisp white and vivid red 5-minute indices (05, 10, 15... 60), 1/5th second hashes.
 */
export function getRehautTexture() {
  if (cachedTextures.rehautCanvas) {
    return cachedTextures.rehautCanvas;
  }

  const size = 2048;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.48;
  const innerR = size * 0.38;

  ctx.clearRect(0, 0, size, size);

  // Deep matte black rehaut background
  ctx.fillStyle = '#08080b';
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2, true);
  ctx.fill();

  // Subtle metallic outer bevel ring
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR - 2, 0, Math.PI * 2);
  ctx.stroke();

  // 1/5th of a second ticks (300 total ticks around circle)
  for (let i = 0; i < 300; i++) {
    const angle = (i / 300) * Math.PI * 2 - Math.PI / 2;
    const isFiveSec = i % 25 === 0;
    const isOneSec = i % 5 === 0;

    const r1 = outerR - 8;
    const r2 = isFiveSec ? outerR - 46 : isOneSec ? outerR - 32 : outerR - 18;

    const x1 = cx + Math.cos(angle) * r1;
    const y1 = cy + Math.sin(angle) * r1;
    const x2 = cx + Math.cos(angle) * r2;
    const y2 = cy + Math.sin(angle) * r2;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    if (isFiveSec) {
      // Red accent on 5-minute ticks like the reference Hublot Big Bang Unico
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
    } else if (isOneSec) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.5;
    } else {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.8;
    }
    ctx.stroke();
  }

  // Printed numerals 05, 10, 15, 20... 60
  ctx.font = 'bold 36px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';

  for (let m = 5; m <= 60; m += 5) {
    const angle = (m / 60) * Math.PI * 2 - Math.PI / 2;
    const numR = outerR - 76;
    const x = cx + Math.cos(angle) * numR;
    const y = cy + Math.sin(angle) * numR;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(m.toString().padStart(2, '0'), 0, 0);
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  cachedTextures.rehautCanvas = tex;
  return tex;
}

/**
 * Creates 60-minute Chronograph subdial texture (located at 3 o'clock):
 * Snailed concentric rings, red 15-minute arc, crisp typography.
 */
export function getChronoSubdialTexture() {
  if (cachedTextures.subdialChrono) {
    return cachedTextures.subdialChrono;
  }

  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.46;

  ctx.clearRect(0, 0, size, size);

  // Dark circular base with concentric snailed grooves
  ctx.fillStyle = '#0a0a0e';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Concentric snailed micro-grooves
  for (let cr = 20; cr < r; cr += 3) {
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Outer border ring
  ctx.strokeStyle = '#383842';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
  ctx.stroke();

  // Vibrant red arc on outer edge from 0 to 15 mins (top-right quadrant)
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 12, -Math.PI / 2, 0);
  ctx.stroke();

  // Subdial ticks (60 ticks)
  for (let i = 0; i < 60; i++) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % 15 === 0;
    const isFive = i % 5 === 0;

    const r1 = r - 22;
    const r2 = isMajor ? r - 48 : isFive ? r - 38 : r - 30;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
    ctx.strokeStyle = isMajor ? '#ffffff' : isFive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = isMajor ? 5 : isFive ? 3 : 2;
    ctx.stroke();
  }

  // Subdial numerals: 60, 15, 30, 45
  ctx.font = 'bold 42px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';

  const numbers = [
    { text: '60', angle: -Math.PI / 2 },
    { text: '15', angle: 0 },
    { text: '30', angle: Math.PI / 2 },
    { text: '45', angle: Math.PI },
  ];

  numbers.forEach((num) => {
    const numR = r - 80;
    const x = cx + Math.cos(num.angle) * numR;
    const y = cy + Math.sin(num.angle) * numR;
    ctx.fillText(num.text, x, y);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  cachedTextures.subdialChrono = tex;
  return tex;
}

/**
 * Creates running seconds subdial texture (located at 9 o'clock)
 */
export function getSecondsSubdialTexture() {
  if (cachedTextures.subdialSeconds) {
    return cachedTextures.subdialSeconds;
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.46;

  ctx.clearRect(0, 0, size, size);

  // Outer border ring
  ctx.strokeStyle = '#3f3f46';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.stroke();

  // Ticks every 5 seconds
  for (let i = 0; i < 60; i += 5) {
    const angle = (i / 60) * Math.PI * 2 - Math.PI / 2;
    const isMajor = i % 15 === 0;

    const r1 = r - 6;
    const r2 = isMajor ? r - 26 : r - 16;

    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
    ctx.strokeStyle = isMajor ? '#ffffff' : 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = isMajor ? 3 : 1.8;
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  cachedTextures.subdialSeconds = tex;
  return tex;
}

/**
 * Creates skeletonized date ring texture (with stencil numbers 1-31)
 */
export function getDateWheelTexture() {
  if (cachedTextures.dateWheel) {
    return cachedTextures.dateWheel;
  }

  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;

  ctx.clearRect(0, 0, size, size);

  ctx.font = 'bold 28px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#a1a1aa';

  for (let d = 1; d <= 31; d++) {
    const angle = ((d - 1) / 31) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI / 2);
    ctx.fillText(d.toString(), 0, 0);
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 16;
  cachedTextures.dateWheel = tex;
  return tex;
}

/**
 * Creates striated luxury rubber strap normal map with deep longitudinal grooves
 * and fine micro-texture.
 */
export function getStrapNormalMap() {
  if (cachedTextures.strapNormal) {
    return cachedTextures.strapNormal;
  }

  const width = 512;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgb(128, 128, 255)';
  ctx.fillRect(0, 0, width, height);

  // Longitudinal channel grooves (running along strap length)
  const numChannels = 6;
  const channelWidth = width / numChannels;

  for (let i = 0; i < numChannels; i++) {
    const x = i * channelWidth;

    // Center depression
    const grad = ctx.createLinearGradient(x, 0, x + channelWidth, 0);
    grad.addColorStop(0, 'rgb(100, 128, 255)');
    grad.addColorStop(0.5, 'rgb(128, 128, 200)');
    grad.addColorStop(1, 'rgb(156, 128, 255)');

    ctx.fillStyle = grad;
    ctx.fillRect(x + 6, 0, channelWidth - 12, height);
  }

  // Micro matte pebble grain noise
  for (let n = 0; n < 8000; n++) {
    const px = Math.random() * width;
    const py = Math.random() * height;
    const val = 128 + (Math.random() - 0.5) * 20;
    ctx.fillStyle = `rgba(${val}, ${val}, 255, 0.15)`;
    ctx.fillRect(px, py, 1.5, 1.5);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 3);
  tex.anisotropy = 16;

  cachedTextures.strapNormal = tex;
  return tex;
}

/**
 * Creates authentic Côtes de Genève (Geneva Stripes) pattern for mechanical bridges
 */
export function getGenevaStripesTexture() {
  if (cachedTextures.genevaStripes) {
    return cachedTextures.genevaStripes;
  }

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const stripeWidth = 36;
  const numStripes = Math.ceil(size / stripeWidth);

  for (let i = 0; i < numStripes; i++) {
    const x = i * stripeWidth;
    const grad = ctx.createLinearGradient(x, 0, x + stripeWidth, 0);
    grad.addColorStop(0, '#52525b');
    grad.addColorStop(0.5, '#71717a');
    grad.addColorStop(1, '#3f3f46');

    ctx.fillStyle = grad;
    ctx.fillRect(x, 0, stripeWidth, size);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 2);
  tex.anisotropy = 16;

  cachedTextures.genevaStripes = tex;
  return tex;
}
