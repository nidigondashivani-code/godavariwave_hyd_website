import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import { milestones } from '../data/companyData';
import { Sparkles } from 'lucide-react';

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 60%']
  });

  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const wavePath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'M0 300 C 200 180, 400 420, 600 300 S 1000 180, 1200 300 L1200 600 L0 600 Z',
      'M0 260 C 260 420, 460 140, 640 280 S 980 420, 1200 240 L1200 600 L0 600 Z',
      'M0 320 C 180 260, 420 260, 620 330 S 1020 260, 1200 320 L1200 600 L0 600 Z'
    ]
  );
  const waveOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.35]);

  return (
    <section ref={containerRef} id="about" className="relative scroll-mt-20 overflow-hidden px-5 sm:px-6 md:px-8 lg:px-10 py-20 md:py-24">
      {/* Morphing Background Wave */}
      <svg
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[70%] w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="story-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0066CC" />
            <stop offset="50%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#004E9A" />
          </linearGradient>
        </defs>
        <motion.path d={wavePath} fill="url(#story-grad)" style={{ opacity: waveOpacity }} />
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-12 sm:gap-16 lg:grid-cols-[1fr_1.1fr]">
        {/* Sticky narrative column */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#0066CC] animate-ping" />
              <p className="eyebrow text-[#0066CC]">Our Story</p>
            </div>

            <SplitText
              text="From the banks of the Godavari to the world."
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              highlight={[5]}
            />
          </motion.div>

          <motion.p
            className="mt-4 max-w-[700px] text-base sm:text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            Founded in Rajahmundry to make digital transformation affordable, accessible and impactful — and expanding in 2026 with our dedicated innovation hub at Meenakshi Tech Park, Gachibowli, Hyderabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="glass-soft mt-8 inline-flex items-center gap-4 rounded-2xl border border-glass-border p-6 shadow-xl"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-flow text-primary-foreground shadow-glow-sea shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Four State-Wide Corridors
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Rajahmundry (Global HQ) · Hyderabad (2026 Innovation Hub) · Vizag · Vijayawada
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Timeline */}
        <div className="relative pl-8 sm:pl-10 md:pl-16">
          {/* Base border line */}
          <div className="absolute top-0 bottom-0 left-2.5 sm:left-3 w-px bg-glass-border md:left-5" />
          {/* Animated gradient progress line */}
          <motion.div
            className="absolute top-0 bottom-0 left-2.5 sm:left-3 w-px origin-top bg-gradient-to-b from-[#0066CC] via-[#00D4FF] to-[#004E9A] md:left-5"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-10 sm:space-y-12">
            {milestones.map((item, idx) => (
              <motion.div
                key={item.title}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
              >
                {/* Timeline node */}
                <motion.span
                  className="absolute top-2 -left-[1.85rem] sm:-left-[2.15rem] flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-ocean border border-glass-border shadow-glow-gold md:-left-[3.35rem]"
                  initial={{ scale: 0, y: 15 }}
                  whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
                >
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#00D4FF]" />
                </motion.span>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-[#0066CC] uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>

                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-foreground md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[700px]">
                  {item.text}
                </p>

                {idx === 0 && <div className="mt-6 h-px w-24 bg-flow shadow-glow-sea" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
