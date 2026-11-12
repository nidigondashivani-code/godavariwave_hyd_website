import * as THREE from 'three';

export interface HyderabadParticleData {
  positionsCharminar: Float32Array;
  positionsWave: Float32Array;
  positionsSkyline: Float32Array;
  colors: Float32Array;
  randoms: Float32Array;
  count: number;
}

export function generateHyderabadParticles(): HyderabadParticleData {
  const charminarPts: [number, number, number][] = [];
  const colorList: [number, number, number][] = [];

  // Color Constants (RGB normalized 0..1) - Logo Inspired Blues & Cyan Palette
  const COL_BRAND_BLUE: [number, number, number] = [0.0, 0.40, 0.80];   // #0066CC Primary Brand Blue
  const COL_CYAN: [number, number, number] = [0.0, 0.83, 1.0];           // #00D4FF Cyan Accent
  const COL_ROYAL: [number, number, number] = [0.0, 0.31, 0.60];         // #004E9A Deep Royal Blue
  const COL_SKY: [number, number, number] = [0.22, 0.74, 0.97];          // #38BDF8 Sky Blue
  const COL_WHITE: [number, number, number] = [1.0, 1.0, 1.0];           // #FFFFFF Pure White

  const w = 2.6; // Half-width between minarets
  const yOffset = -2.2; // Vertical centering

  // 1. FOUR CORNER MINARETS (Each with 3 balcony tiers, dome, and finial)
  const minaretOffsets: [number, number][] = [
    [-w, -w],
    [w, -w],
    [-w, w],
    [w, w]
  ];

  minaretOffsets.forEach(([mx, mz]) => {
    // Shaft points from base (y=0) to top gallery (y=7.2)
    const shaftSteps = 90;
    for (let i = 0; i < shaftSteps; i++) {
      const y = (i / shaftSteps) * 7.2;
      let r = 0.42;
      if (y > 2.8) r = 0.36;
      if (y > 5.2) r = 0.30;

      // Balcony extensions at 3 levels
      const isBalcony1 = Math.abs(y - 2.8) < 0.16;
      const isBalcony2 = Math.abs(y - 5.2) < 0.16;
      const isBalcony3 = Math.abs(y - 7.0) < 0.16;
      if (isBalcony1 || isBalcony2 || isBalcony3) {
        r *= 1.48;
      }

      const ringCount = isBalcony1 || isBalcony2 || isBalcony3 ? 32 : 20;
      for (let j = 0; j < ringCount; j++) {
        const angle = (j / ringCount) * Math.PI * 2;
        // Fluted column ridges
        const fluting = 1 + Math.sin(angle * 8) * 0.04;
        const px = mx + Math.cos(angle) * r * fluting;
        const pz = mz + Math.sin(angle) * r * fluting;
        const py = y + yOffset;

        charminarPts.push([px, py, pz]);
        if (isBalcony1 || isBalcony2 || isBalcony3) {
          colorList.push(COL_CYAN);
        } else if (y > 5.2) {
          colorList.push(COL_SKY);
        } else {
          colorList.push(COL_BRAND_BLUE);
        }
      }
    }

    // Minaret Bulbous Fluted Domes & Finials (y=7.2 to 9.2)
    const domeSteps = 30;
    for (let di = 0; di < domeSteps; di++) {
      const dy = 7.2 + (di / domeSteps) * 1.5;
      const t = (di / domeSteps);
      // Bulbous shape
      const domeR = Math.sin(t * Math.PI) * 0.46 * (1 - t * 0.3);
      const domeRings = 24;
      for (let dj = 0; dj < domeRings; dj++) {
        const angle = (dj / domeRings) * Math.PI * 2;
        const fluting = 1 + Math.sin(angle * 12) * 0.08;
        const px = mx + Math.cos(angle) * Math.max(domeR, 0.05) * fluting;
        const pz = mz + Math.sin(angle) * Math.max(domeR, 0.05) * fluting;
        const py = dy + yOffset;
        charminarPts.push([px, py, pz]);
        colorList.push(COL_CYAN);
      }
    }

    // Finials / Pointed Spire at top (y=8.7 to 9.6)
    for (let fi = 0; fi < 18; fi++) {
      const fy = 8.7 + (fi / 18) * 0.9;
      const fr = (1 - fi / 18) * 0.08;
      for (let fj = 0; fj < 8; fj++) {
        const angle = (fj / 8) * Math.PI * 2;
        charminarPts.push([mx + Math.cos(angle) * fr, fy + yOffset, mz + Math.sin(angle) * fr]);
        colorList.push(COL_CYAN);
      }
    }
  });

  // 2. FOUR GRAND POINTED ARCHWAYS (The iconic Qutb Shahi Arches facing 4 directions)
  const faceConfigs: { side: 'z' | 'x'; pos: number; spanMin: number; spanMax: number }[] = [
    { side: 'z', pos: w, spanMin: -w + 0.4, spanMax: w - 0.4 },  // South
    { side: 'z', pos: -w, spanMin: -w + 0.4, spanMax: w - 0.4 }, // North
    { side: 'x', pos: w, spanMin: -w + 0.4, spanMax: w - 0.4 },  // East
    { side: 'x', pos: -w, spanMin: -w + 0.4, spanMax: w - 0.4 }  // West
  ];

  faceConfigs.forEach(({ side, pos, spanMin, spanMax }) => {
    // Grand Pointed Arch curves (rising up to y=3.2)
    const archSteps = 90;
    const archWidth = (spanMax - spanMin) * 0.5;
    const archCenter = (spanMax + spanMin) * 0.5;

    for (let i = 0; i <= archSteps; i++) {
      const u = (i / archSteps) * 2 - 1; // -1 to +1
      const xSpan = archCenter + u * (archWidth * 0.88);
      // Pointed four-centered arch profile
      const rawY = Math.cos(Math.abs(u) * Math.PI * 0.5) * 3.1;
      const cusp = Math.pow(1 - Math.abs(u), 0.72) * 3.3;
      const archY = Math.min(rawY, cusp);

      // Multi-layered depth for arch intrados and extrados
      for (let layer = 0; layer < 4; layer++) {
        const depthOffset = (layer - 1.5) * 0.12;
        const profileY = archY + layer * 0.08;

        const px = side === 'x' ? pos + depthOffset : xSpan;
        const pz = side === 'z' ? pos + depthOffset : xSpan;
        const py = profileY + yOffset;

        charminarPts.push([px, py, pz]);
        colorList.push(layer === 0 ? COL_CYAN : COL_BRAND_BLUE);
      }

      // Vertical pillars supporting the arch
      if (Math.abs(u) > 0.82) {
        for (let pyi = 0; pyi < archY; pyi += 0.12) {
          const px = side === 'x' ? pos : xSpan;
          const pz = side === 'z' ? pos : xSpan;
          charminarPts.push([px, pyi + yOffset, pz]);
          colorList.push(COL_ROYAL);
        }
      }
    }

    // 3. UPPER GALLERIES & CLOCK PEDIMENT (y=3.4 to 6.2)
    // Double-storey arched windows
    for (let storey = 0; storey < 2; storey++) {
      const storeyY = 3.6 + storey * 1.2;
      const miniArchCount = 5;
      for (let a = 0; a < miniArchCount; a++) {
        const cx = spanMin + 0.35 + (a / (miniArchCount - 1)) * (spanMax - spanMin - 0.7);
        for (let step = 0; step < 16; step++) {
          const theta = (step / 15) * Math.PI;
          const r = 0.18;
          const px = side === 'x' ? pos : cx + Math.cos(theta) * r;
          const pz = side === 'z' ? pos : cx + Math.cos(theta) * r;
          const py = storeyY + Math.sin(theta) * 0.28 + yOffset;
          charminarPts.push([px, py, pz]);
          colorList.push(COL_SKY);
        }
      }
    }

    // Jali Screen Lattice pattern between arches
    for (let jy = 3.3; jy < 5.8; jy += 0.22) {
      for (let jx = spanMin + 0.2; jx < spanMax - 0.2; jx += 0.3) {
        const px = side === 'x' ? pos : jx;
        const pz = side === 'z' ? pos : jx;
        charminarPts.push([px, jy + yOffset, pz]);
        colorList.push(COL_BRAND_BLUE);
      }
    }

    // Iconic Clock Medallion on each facade pediment (y=5.8, centered)
    const clockY = 5.8;
    for (let cStep = 0; cStep < 36; cStep++) {
      const theta = (cStep / 36) * Math.PI * 2;
      const cr = 0.44;
      const px = side === 'x' ? pos + 0.05 : archCenter + Math.cos(theta) * cr;
      const pz = side === 'z' ? pos + 0.05 : archCenter + Math.cos(theta) * cr;
      charminarPts.push([px, clockY + Math.sin(theta) * cr + yOffset, pz]);
      colorList.push(COL_CYAN);
    }
    // Clock hands
    for (let hand = 0; hand < 8; hand++) {
      const len = (hand / 7) * 0.32;
      const px = side === 'x' ? pos + 0.06 : archCenter + len * 0.707;
      const pz = side === 'z' ? pos + 0.06 : archCenter + len * 0.707;
      charminarPts.push([px, clockY + len * 0.707 + yOffset, pz]);
      colorList.push(COL_SKY);
    }
  });

  // 4. UPPER ROOF TERRACE & CENTRAL DOME
  const roofY = 6.4;
  for (let rx = -w + 0.3; rx <= w - 0.3; rx += 0.18) {
    for (let rz = -w + 0.3; rz <= w - 0.3; rz += 0.18) {
      // Parapet border
      const isEdge =
        Math.abs(rx - (-w + 0.3)) < 0.2 ||
        Math.abs(rx - (w - 0.3)) < 0.2 ||
        Math.abs(rz - (-w + 0.3)) < 0.2 ||
        Math.abs(rz - (w - 0.3)) < 0.2;

      if (isEdge) {
        charminarPts.push([rx, roofY + yOffset, rz]);
        colorList.push(COL_CYAN);
        // Ornamental crenellations
        if (Math.sin(rx * 6) > 0 || Math.sin(rz * 6) > 0) {
          charminarPts.push([rx, roofY + 0.22 + yOffset, rz]);
          colorList.push(COL_SKY);
        }
      }
    }
  }

  // Small Central Dome on top terrace
  for (let cdi = 0; cdi < 24; cdi++) {
    const t = cdi / 24;
    const cdy = roofY + t * 0.9;
    const cdr = Math.sin(t * Math.PI) * 0.75;
    for (let cdj = 0; cdj < 28; cdj++) {
      const angle = (cdj / 28) * Math.PI * 2;
      charminarPts.push([
        Math.cos(angle) * cdr,
        cdy + yOffset,
        Math.sin(angle) * cdr
      ]);
      colorList.push(COL_CYAN);
    }
  }

  // 5. STEPPED BASE PLINTH
  for (let tier = 0; tier < 3; tier++) {
    const plinthY = tier * 0.14 + yOffset;
    const plinthW = w + 0.8 - tier * 0.2;
    for (let s = -plinthW; s <= plinthW; s += 0.2) {
      charminarPts.push([s, plinthY, plinthW]);
      charminarPts.push([s, plinthY, -plinthW]);
      charminarPts.push([plinthW, plinthY, s]);
      charminarPts.push([-plinthW, plinthY, s]);
      colorList.push(COL_ROYAL);
      colorList.push(COL_ROYAL);
      colorList.push(COL_ROYAL);
      colorList.push(COL_ROYAL);
    }
  }

  // Total count of points
  const count = charminarPts.length;

  // 6. GENERATE TARGET: FLOWING GODAVARI RIVER WAVE SURFACE
  const wavePts: [number, number, number][] = [];
  const waveCols = Math.round(Math.sqrt(count * 2.2));
  const waveRows = Math.round(count / waveCols);

  for (let i = 0; i < count; i++) {
    const col = i % waveCols;
    const row = Math.floor(i / waveCols);
    const wx = (col / (waveCols - 1)) * 28 - 14 + (Math.random() - 0.5) * 0.1;
    const wz = (row / Math.max(waveRows - 1, 1)) * 14 - 9;
    // Base wave profile
    const wy = Math.sin(wx * 0.38) * 0.65 + Math.sin(wz * 0.72) * 0.35 - 1.2;
    wavePts.push([wx, wy, wz]);
  }

  // 7. GENERATE TARGET: HYDERABAD DIGITAL TECH SKYLINE
  // Includes: Cyber Towers (circular tiered core), T-Hub (cantilevered triangle), Financial District towers
  const skylinePts: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const selector = i % 4;
    if (selector === 0) {
      // Cyber Towers (HITEC City iconic circular tower with radial blocks & central mast)
      const cx = -4.5;
      const cyBase = -2.2;
      const height = 6.2;
      const progress = (i % 800) / 800;
      const y = cyBase + progress * height;
      const r = progress > 0.85 ? 0.3 : 1.35; // Mast or main circular body
      const angle = ((i * 13) % 60) * (Math.PI / 30);
      skylinePts.push([cx + Math.cos(angle) * r, y, Math.sin(angle) * r - 1.5]);
    } else if (selector === 1) {
      // T-Hub Cantilevered futuristic angular building
      const tx = 0.0;
      const progress = (i % 600) / 600;
      const y = -2.2 + progress * 4.8;
      // Cantilever overhangs wider as y increases
      const width = 1.4 + progress * 1.8;
      const depth = (Math.sin(i * 0.5) * 0.5);
      const span = ((i % 50) / 50 - 0.5) * width;
      skylinePts.push([tx + span, y, depth - 2.0]);
    } else if (selector === 2) {
      // Financial District Glass Tower 1 (tall sleek skyscraper)
      const fx = 4.2;
      const progress = (i % 700) / 700;
      const y = -2.2 + progress * 7.5;
      const width = 0.9;
      const px = fx + (((i % 20) / 20) - 0.5) * width;
      const pz = (((Math.floor(i / 20) % 20) / 20) - 0.5) * width - 1.8;
      skylinePts.push([px, y, pz]);
    } else {
      // Financial District Glass Tower 2 (stepped crown tower)
      const fx = 7.5;
      const progress = (i % 500) / 500;
      const y = -2.2 + progress * 5.6;
      const taper = 1.0 - progress * 0.35;
      const px = fx + (((i % 16) / 16) - 0.5) * 1.1 * taper;
      const pz = (((Math.floor(i / 16) % 16) / 16) - 0.5) * 1.1 * taper - 2.2;
      skylinePts.push([px, y, pz]);
    }
  }

  // Flatten into Float32Arrays for Three.js
  const positionsCharminar = new Float32Array(count * 3);
  const positionsWave = new Float32Array(count * 3);
  const positionsSkyline = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positionsCharminar[i * 3] = charminarPts[i][0];
    positionsCharminar[i * 3 + 1] = charminarPts[i][1];
    positionsCharminar[i * 3 + 2] = charminarPts[i][2];

    positionsWave[i * 3] = wavePts[i][0];
    positionsWave[i * 3 + 1] = wavePts[i][1];
    positionsWave[i * 3 + 2] = wavePts[i][2];

    positionsSkyline[i * 3] = skylinePts[i][0];
    positionsSkyline[i * 3 + 1] = skylinePts[i][1];
    positionsSkyline[i * 3 + 2] = skylinePts[i][2];

    colors[i * 3] = colorList[i][0];
    colors[i * 3 + 1] = colorList[i][1];
    colors[i * 3 + 2] = colorList[i][2];

    randoms[i] = Math.random();
  }

  return {
    positionsCharminar,
    positionsWave,
    positionsSkyline,
    colors,
    randoms,
    count
  };
}

