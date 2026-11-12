import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateHyderabadParticles } from './charminarGeometry';

interface HeroWaveCanvasProps {
  viewMode?: 'charminar' | 'wave' | 'skyline' | 'auto';
  hoverLandmark?: boolean;
}

const particleVertexShader = `
  attribute vec3 aCharminar;
  attribute vec3 aWave;
  attribute vec3 aSkyline;
  attribute vec3 aColor;
  attribute float aRand;

  uniform float uTime;
  uniform float uMorph; // 0.0: Charminar, 1.0: Wave, 2.0: Skyline
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uHoverLandmark;

  varying vec3 vColor;
  varying float vRand;
  varying float vDepth;
  varying float vMorph;

  float waveNoise(vec2 p) {
    float t = uTime * 0.55;
    float h = sin(p.x * 0.45 + t * 1.5) * 0.62;
    h += sin(p.x * 0.88 - p.y * 0.55 + t * 1.1) * 0.32;
    h += sin(p.y * 1.25 + t * 0.8) * 0.22;
    return h;
  }

  void main() {
    vec3 p = aCharminar;

    // Smooth multi-stage morphing: Charminar (0) <-> Wave (1) <-> Skyline (2)
    if (uMorph <= 1.0) {
      float t = smoothstep(0.0, 1.0, uMorph);
      vec3 waveDynamic = aWave;
      waveDynamic.y += waveNoise(waveDynamic.xz) * t;
      p = mix(aCharminar, waveDynamic, t);
    } else {
      float t = smoothstep(1.0, 2.0, uMorph);
      vec3 waveDynamic = aWave;
      waveDynamic.y += waveNoise(waveDynamic.xz);
      p = mix(waveDynamic, aSkyline, t);
    }

    // Gentle organic breathing
    p.y += sin(uTime * 1.4 + aRand * 6.28) * 0.045;
    p.x += cos(uTime * 0.9 + aRand * 6.28) * 0.035;

    // Interactive mouse repulsion & displacement
    vec3 mouseWorld = vec3(uMouse.x * 5.5, uMouse.y * 3.2, 0.0);
    float distToMouse = distance(p.xy, mouseWorld.xy);
    float repelForce = exp(-distToMouse * distToMouse * 0.32) * uMouseStrength * 1.35;
    vec3 repelDir = normalize(p - mouseWorld + vec3(0.001));
    p += repelDir * repelForce;

    // Landmark hover highlight expansion
    if (uHoverLandmark > 0.0) {
      p += normalize(p + vec3(0.0, 1.0, 0.0)) * (sin(uTime * 3.5 + aRand * 3.14) * 0.06 * uHoverLandmark);
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    vColor = aColor;
    vRand = aRand;
    vMorph = uMorph;

    // Point size with perspective depth attenuation
    float baseSize = 2.4 + aRand * 2.2;
    float landmarkBoost = uHoverLandmark * 1.8;
    gl_PointSize = (baseSize + landmarkBoost) * (11.5 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const particleFragmentShader = `
  uniform float uTime;
  uniform float uHoverLandmark;
  uniform vec3 uCyan;
  uniform vec3 uBrandBlue;
  uniform vec3 uSky;

  varying vec3 vColor;
  varying float vRand;
  varying float vDepth;
  varying float vMorph;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.04, d);

    // Base color from vertex
    vec3 col = vColor;

    // Subtle twinkling luminescence
    float twinkle = sin(uTime * 2.6 + vRand * 6.28) * 0.14;
    col += vec3(twinkle * 0.4, twinkle * 0.8, twinkle * 1.0);

    // Cyan-blue aura when landmark is hovered
    if (uHoverLandmark > 0.0) {
      col = mix(col, uCyan, uHoverLandmark * 0.7);
      col += uSky * (0.25 * sin(uTime * 4.2 + vRand * 3.14));
    }

    // Depth fog
    float fog = smoothstep(22.0, 3.5, vDepth);
    gl_FragColor = vec4(col, alpha * fog * (0.75 + vRand * 0.25 + uHoverLandmark * 0.25));
  }
`;

function HyderabadParticleScene({
  viewMode = 'charminar',
  hoverLandmark = false
}: {
  viewMode: 'charminar' | 'wave' | 'skyline' | 'auto';
  hoverLandmark: boolean;
}) {
  const mousePos = useRef(new THREE.Vector2(0, -10));
  const targetMouse = useRef(new THREE.Vector2(0, -10));
  const mouseStrength = useRef(0);
  const targetStrength = useRef(0);

  // Current morph progress
  const currentMorph = useRef(0.0);
  const hoverLandmarkVal = useRef(0.0);

  const particleData = useMemo(() => generateHyderabadParticles(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, -10) },
      uMouseStrength: { value: 0 },
      uHoverLandmark: { value: 0 },
      uCyan: { value: new THREE.Color('#00D4FF') },
      uBrandBlue: { value: new THREE.Color('#0066CC') },
      uSky: { value: new THREE.Color('#38BDF8') }
    }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particleData.positionsCharminar, 3));
    geo.setAttribute('aCharminar', new THREE.BufferAttribute(particleData.positionsCharminar, 3));
    geo.setAttribute('aWave', new THREE.BufferAttribute(particleData.positionsWave, 3));
    geo.setAttribute('aSkyline', new THREE.BufferAttribute(particleData.positionsSkyline, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(particleData.colors, 3));
    geo.setAttribute('aRand', new THREE.BufferAttribute(particleData.randoms, 1));
    return geo;
  }, [particleData]);

  // Pointer interactions
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetMouse.current.set(nx * 8, ny * 4);
      targetStrength.current = 1;
    };
    const handlePointerLeave = () => {
      targetStrength.current = 0;
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    uniforms.uTime.value += dt;

    // Calculate target morph value
    let targetMorph = 0.0; // default charminar
    if (viewMode === 'wave') {
      targetMorph = 1.0;
    } else if (viewMode === 'skyline') {
      targetMorph = 2.0;
    } else if (viewMode === 'auto') {
      // Auto cycle every 9 seconds: Charminar -> Wave -> Skyline -> Charminar
      const cycleTime = uniforms.uTime.value % 27;
      if (cycleTime < 9) {
        targetMorph = cycleTime < 7 ? 0.0 : (cycleTime - 7) / 2;
      } else if (cycleTime < 18) {
        const sub = cycleTime - 9;
        targetMorph = sub < 7 ? 1.0 : 1.0 + (sub - 7) / 2;
      } else {
        const sub = cycleTime - 18;
        targetMorph = sub < 7 ? 2.0 : 2.0 - (sub - 7);
      }
    }

    // Smooth interpolation to target morph
    currentMorph.current += (targetMorph - currentMorph.current) * 0.045;
    uniforms.uMorph.value = currentMorph.current;

    // Landmark hover transition
    const targetHover = hoverLandmark ? 1.0 : 0.0;
    hoverLandmarkVal.current += (targetHover - hoverLandmarkVal.current) * 0.08;
    uniforms.uHoverLandmark.value = hoverLandmarkVal.current;

    // Mouse lerp
    mousePos.current.lerp(targetMouse.current, 0.07);
    mouseStrength.current += (targetStrength.current - mouseStrength.current) * 0.05;
    uniforms.uMouse.value.copy(mousePos.current);
    uniforms.uMouseStrength.value = mouseStrength.current;

    // Subtle 3D camera drift & parallax orbit
    const px = state.pointer.x * 0.75;
    const py = state.pointer.y * 0.4;
    state.camera.position.x += (px - state.camera.position.x) * 0.025;
    state.camera.position.y += (1.8 + py - state.camera.position.y) * 0.025;
    state.camera.lookAt(0, 0.8, 0);
  });

  return (
    <group rotation={[0, 0.05, 0]}>
      <points geometry={geometry}>
        <shaderMaterial
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function HeroWaveCanvas({
  viewMode = 'auto',
  hoverLandmark = false
}: HeroWaveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!!entry?.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.8, 7.8], fov: 50, near: 0.1, far: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <HyderabadParticleScene viewMode={viewMode} hoverLandmark={hoverLandmark} />
      </Canvas>
    </div>
  );
}
