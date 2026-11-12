import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    // Check if user has already seen intro this session
    const hasSeen = sessionStorage.getItem('gw_seen_intro');
    if (hasSeen === 'true') {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Progression timers
    const t1 = setTimeout(() => setPhase(2), 1200); // Charminar
    const t2 = setTimeout(() => setPhase(3), 2800); // Digital Wave
    const t3 = setTimeout(() => setPhase(4), 4200); // Godavari Wave Logo
    const t4 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('gw_seen_intro', 'true');
      onComplete?.();
    }, 5600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        dismissIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const dismissIntro = () => {
    setIsVisible(false);
    sessionStorage.setItem('gw_seen_intro', 'true');
    onComplete?.();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B1F3A] px-6 text-foreground overflow-hidden"
      >
        {/* Ambient background particle glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#0066CC]/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00D4FF]/15 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#004E9A]/10 blur-[100px]" />
        </div>

        {/* Skip button in top right */}
        <button
          type="button"
          onClick={dismissIntro}
          data-cursor="true"
          className="glass absolute top-6 right-6 z-30 flex items-center gap-2 rounded-full border border-glass-border px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-all hover:scale-105"
        >
          <span>Skip Intro</span>
          <ArrowRight className="h-3 w-3" />
        </button>

        {/* Phase 1: Particles & Concept Awakening */}
        {phase === 1 && (
          <motion.div
            key="p1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-glass border border-glass-border shadow-glow-sea">
              <Sparkles className="h-6 w-6 text-[#0066CC] animate-pulse" />
            </div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#0066CC]">
              Technology Meets Hyderabad
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Awakening Innovation Network
            </h2>
          </motion.div>
        )}

        {/* Phase 2: Charminar Geometric Outline */}
        {phase === 2 && (
          <motion.div
            key="p2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            {/* Abstract Charminar Wireframe Hologram */}
            <div className="relative mx-auto mb-8 h-44 w-44">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                {/* Four Minarets */}
                <rect x="18" y="15" width="6" height="70" fill="none" stroke="#00D4FF" strokeWidth="1.2" />
                <rect x="76" y="15" width="6" height="70" fill="none" stroke="#00D4FF" strokeWidth="1.2" />
                <circle cx="21" cy="14" r="4" fill="none" stroke="#0066CC" strokeWidth="1" />
                <circle cx="79" cy="14" r="4" fill="none" stroke="#0066CC" strokeWidth="1" />

                {/* Central Archway */}
                <path
                  d="M26 85 L26 50 Q50 32 74 50 L74 85"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  className="flow-dash"
                  style={{ strokeDasharray: '2 3' }}
                />
                <path
                  d="M34 85 L34 56 Q50 42 66 56 L66 85"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="1"
                />

                {/* Upper Clock Gallery */}
                <line x1="22" y1="45" x2="78" y2="45" stroke="#00D4FF" strokeWidth="1.2" />
                <line x1="22" y1="36" x2="78" y2="36" stroke="#00D4FF" strokeWidth="1" />
                <circle cx="50" cy="40.5" r="3.2" fill="none" stroke="#004E9A" strokeWidth="1.2" />
              </svg>

              {/* Glowing aura ring */}
              <div className="absolute inset-0 rounded-full border border-[#00D4FF]/30 animate-ping opacity-40" />
            </div>

            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#00D4FF]">
              Heritage of Architecture · Future of Intelligence
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Charminar Matrix Formed
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Synthesizing 50,000+ points into Hyderabad's signature monument
            </p>
          </motion.div>
        )}

        {/* Phase 3: Digital Wave Transformation */}
        {phase === 3 && (
          <motion.div
            key="p3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            {/* Flowing Wave SVG */}
            <div className="mx-auto mb-8 h-28 w-64 overflow-hidden">
              <svg viewBox="0 0 300 100" className="h-full w-full">
                <path
                  d="M0 50 C 75 10, 150 90, 225 30 S 300 70, 300 50"
                  fill="none"
                  stroke="#0066CC"
                  strokeWidth="2.5"
                  className="flow-dash"
                  style={{ strokeDasharray: '3 6' }}
                />
                <path
                  d="M0 65 C 75 25, 150 105, 225 45 S 300 85, 300 65"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="1.8"
                  className="flow-dash"
                  style={{ strokeDasharray: '4 8' }}
                />
              </svg>
            </div>

            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#0066CC]">
              Data In Motion
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              The Godavari Digital Wave
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Transitioning monument particles into flowing AI streams and enterprise solutions
            </p>
          </motion.div>
        )}

        {/* Phase 4: Brand Logo & Story Motto */}
        {phase === 4 && (
          <motion.div
            key="p4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center max-w-2xl"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-glass border border-glass-border shadow-glow-sea">
              <img
                src="/images/gw-logo-mark.png"
                alt="Godavari Wave Technologies"
                className="h-12 w-12 object-contain"
              />
            </div>

            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#00D4FF]">
              Rajahmundry HQ · 2026 Hyderabad Innovation Hub
            </p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Godavari Wave{' '}
              <span className="bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground md:text-lg">
              Born on the Godavari. Expanding through Hyderabad to the World.
            </p>
          </motion.div>
        )}

        {/* Bottom subtle progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                phase === i ? 'w-8 bg-[#0066CC]' : 'w-2 bg-glass-border'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

