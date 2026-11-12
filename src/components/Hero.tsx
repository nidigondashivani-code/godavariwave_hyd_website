import React, { Suspense, lazy } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats } from '../data/companyData';
import { cn } from '../utils/cn';

const HeroWaveCanvas = lazy(() => import('./HeroWaveCanvas'));

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D Wave & Monument Canvas - automatically applies particle morphing in background */}
      <div className="absolute inset-0 -z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <HeroWaveCanvas viewMode="auto" />
        </Suspense>
      </div>

      {/* Gradient Vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Hero Content */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-36 pb-16 md:px-10">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-3 text-[#38BDF8] text-[11px] sm:text-xs tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D4FF] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D4FF]" />
          </span>
          <span>Godavari Wave Technologies · 2026 Hyderabad</span>
        </motion.p>

        {/* Display Heading matching authentic website */}
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:display-xl font-bold leading-[1.08] sm:leading-[0.98] max-w-6xl text-foreground"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Building{' '}
          <span className="bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">
            Intelligent
          </span>{' '}
          Digital Experiences
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 sm:mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Transforming businesses through AI, software development, cloud solutions and enterprise innovation — born on the Godavari, now scaling from Hyderabad.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="pointer-events-auto mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#solutions"
            data-cursor="true"
            className="group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-full bg-flow px-6 sm:px-8 text-sm sm:text-base font-medium text-primary-foreground shadow-glow-sea transition-all duration-500 hover:scale-[1.03] hover:shadow-glow-ember"
          >
            <span>Explore Solutions</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#portfolio"
            data-cursor="true"
            className="glass group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-full px-6 sm:px-8 text-sm sm:text-base font-medium text-foreground transition-all duration-500 hover:bg-glass-strong hover:scale-[1.03]"
          >
            <Play className="mr-2 h-4 w-4 text-[#00D4FF] transition-transform group-hover:scale-110" />
            <span>View Portfolio</span>
          </a>
        </motion.div>
      </div>

      {/* Metrics Floating Bar (Bottom to Up Scroll / Mount) */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 pb-10 md:px-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:rounded-3xl md:grid-cols-4 border border-glass-border">
          {stats.map((s) => (
            <div key={s.label} className="p-4 sm:px-6 sm:py-5">
              <div className="font-display text-2xl sm:text-3xl font-semibold text-foreground md:text-4xl">
                <span>{s.value}</span>
                <span className="text-[#00D4FF]">{s.suffix}</span>
              </div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
