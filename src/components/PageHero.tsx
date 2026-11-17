import React from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  highlight?: number[];
}

export default function PageHero({ eyebrow, title, intro, highlight = [] }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[70svh] sm:min-h-[78svh] items-end overflow-hidden px-6 pt-36 pb-20 md:px-10 md:pb-24 bg-[#0B1F3A]">
      {/* Background Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-[#0066CC]/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-[#00D4FF]/15 blur-[140px]" />

      {/* Decorative Wave Lines Pattern in Background */}
      <div className="pointer-events-none absolute inset-0 opacity-25 overflow-hidden">
        <svg
          viewBox="0 0 1440 600"
          className="absolute bottom-0 w-full h-[65%] object-cover pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,320 C320,180 420,400 720,280 C1020,160 1120,380 1440,240 L1440,600 L0,600 Z"
            fill="url(#pagehero-wave-grad)"
            opacity="0.5"
          />
          <path
            d="M0,380 C360,260 540,460 900,340 C1180,240 1320,420 1440,320 L1440,600 L0,600 Z"
            fill="url(#pagehero-wave-grad-2)"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="pagehero-wave-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0066CC" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="pagehero-wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#004E9A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom Vignette for Smooth Transition into Content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B1F3A] to-transparent z-10" />

      {/* Content Container */}
      <div className="relative mx-auto w-full max-w-7xl z-20">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-6 sm:mb-8 text-xs font-mono font-semibold uppercase tracking-[0.28em] text-[#38BDF8] flex items-center gap-3"
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <span className="h-1.5 w-8 bg-[#38BDF8] rounded-full" />
          <span>{eyebrow}</span>
        </motion.p>

        {/* Title */}
        <SplitText
          as="h1"
          text={title}
          immediate={true}
          delay={0.2}
          className="display-xl max-w-5xl font-display font-extrabold text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight"
          highlight={highlight}
        />

        {/* Intro */}
        <motion.p
          className="mt-6 sm:mt-10 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-slate-300 font-normal"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: 'easeOut' }}
        >
          {intro}
        </motion.p>
      </div>
    </section>
  );
}

