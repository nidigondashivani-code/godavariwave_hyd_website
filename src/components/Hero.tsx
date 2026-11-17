import React, { Suspense, lazy } from 'react';
import { ArrowUpRight, Play, Users, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { stats } from '../data/companyData';
import CountUp from './CountUp';

const HeroWaveCanvas = lazy(() => import('./HeroWaveCanvas'));

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-screen min-h-[100dvh] flex-col justify-between overflow-hidden">
      {/* 3D Wave & Monument Canvas - automatically applies particle morphing in background */}
      <div className="absolute inset-0 -z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <HeroWaveCanvas viewMode="auto" />
        </Suspense>
      </div>

      {/* Gradient Vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Hero Content - Centered text alignment, max 700px width on description, strict spacing */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1450px] flex-1 flex-col items-center justify-center text-center px-5 md:px-8 lg:px-10 xl:px-12 pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10">
        {/* Eyebrow Badge (12px spacing to heading) */}
        <motion.p
          className="eyebrow mb-3 inline-flex items-center justify-center gap-2 sm:gap-2.5 text-[#38BDF8] text-[11px] sm:text-xs font-mono tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D4FF] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D4FF]" />
          </span>
          <span>Godavari Wave Technologies · 2026 Hyderabad</span>
        </motion.p>

        {/* Display Heading: 60px on Desktop, 18px spacing to description */}
        <motion.h1
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[60px] font-bold leading-[1.1] max-w-4xl mx-auto text-foreground tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Building{' '}
          <span className="bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">
            Intelligent
          </span>{' '}
          Digital Experiences
        </motion.h1>

        {/* Subtitle - 18px typography scale, Maximum 700px width, 18px from heading */}
        <motion.p
          className="mt-[18px] max-w-[700px] mx-auto text-[16px] sm:text-[18px] text-white/85 leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          Transforming businesses through AI, software development, cloud solutions and enterprise innovation — born on the Godavari, now scaling from Hyderabad.
        </motion.p>

        {/* CTA Buttons - 40px spacing from description, 24px vertical margin, 16px gap, mobile full width, lift & shadow hover */}
        <motion.div
          className="pointer-events-auto mt-10 mb-6 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <a
            href="#solutions"
            data-cursor="true"
            className="group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#004E9A] hover:to-[#0066CC] px-8 text-sm sm:text-base font-semibold text-white shadow-md shadow-[#0066CC]/30 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <span>Explore Solutions</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#portfolio"
            data-cursor="true"
            className="glass group relative inline-flex h-12 sm:h-14 items-center justify-center overflow-hidden rounded-full border border-white/20 px-8 text-sm sm:text-base font-semibold text-white hover:bg-white/10 hover:border-[#00D4FF]/40 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <Play className="mr-2 h-4 w-4 text-[#00D4FF] transition-transform group-hover:scale-110" />
            <span>View Portfolio</span>
          </a>
        </motion.div>
      </div>

      {/* Metrics Floating Bar - Cards fade upward, count up animation, 32px desktop gap, 28px padding */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1450px] px-5 md:px-8 lg:px-10 xl:px-12 pb-8 sm:pb-12 lg:pb-14"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="grid grid-cols-2 gap-5 md:gap-6 lg:gap-8 md:grid-cols-4">
          {stats.map((s, idx) => {
            const statIcons = [Users, TrendingUp, Sparkles, Building2];
            const Icon = statIcons[idx % statIcons.length];
            const subtitles = ['Enterprise Clients', 'Campaign Scale', 'Tech Specialists', 'Statewide Network'];
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                style={{
                  borderRadius: '14px',
                  minHeight: '170px',
                }}
                className="glass rounded-[14px] p-[22px] lg:p-[28px] min-h-[170px] border border-glass-border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#00D4FF]/40 flex flex-col items-center justify-center text-center h-full group"
              >
                {/* Circular Icon */}
                <div className="h-10 w-10 rounded-full bg-white/10 text-[#00D4FF] border border-white/20 flex items-center justify-center shrink-0 mb-2.5 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Card Title (15px, medium weight, center aligned) */}
                <span className="text-[15px] font-medium text-slate-200 text-center leading-tight">
                  {s.label}
                </span>

                {/* Large Value (32-36px, bold, center aligned) */}
                <div className="text-[34px] font-bold text-white font-display text-center leading-none mt-2.5 mb-1.5">
                  <CountUp value={s.value} suffix={s.suffix} duration={1.6} />
                </div>

                {/* Subtitle (Smaller font, reduced opacity, center aligned) */}
                <span className="text-xs text-slate-300/75 text-center leading-tight">
                  {subtitles[idx % subtitles.length]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
