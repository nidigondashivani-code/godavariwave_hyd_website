import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '../utils/cn';
import SplitText from './SplitText';
import { testimonials } from '../data/companyData';

function RibbonWaves({ className, count = 5 }: { className?: string; count?: number }) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-x-0 w-full', className)}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wave-grad" x1="0" x2="1">
          <stop offset="0%" stopColor="var(--sea)" stopOpacity="0" />
          <stop offset="30%" stopColor="var(--sea)" stopOpacity="0.7" />
          <stop offset="65%" stopColor="var(--mint)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--ember)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: count }).map((_, idx) => {
        const amp = 30 + idx * 12;
        const y = 140 + idx * 18;
        const d1 = `M0 ${y} C 240 ${y - amp}, 480 ${y + amp}, 720 ${y} S 1200 ${y - amp}, 1440 ${y}`;
        const d2 = `M0 ${y} C 240 ${y + amp}, 480 ${y - amp}, 720 ${y} S 1200 ${y + amp}, 1440 ${y}`;
        return (
          <motion.path
            key={idx}
            d={d1}
            fill="none"
            stroke="url(#wave-grad)"
            strokeWidth={1.2}
            strokeOpacity={0.9 - idx * 0.12}
            animate={{ d: [d1, d2, d1] }}
            transition={{ duration: 9 + idx * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        );
      })}
    </svg>
  );
}

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-5 md:px-8 lg:px-10 xl:px-12 py-[80px] md:py-[100px] lg:py-[120px]">
      {/* Background Oscillating Ribbon Waves */}
      <RibbonWaves className="top-1/2 h-[420px] -translate-y-1/3 opacity-70" count={6} />

      <div className="relative mx-auto max-w-[1450px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 sm:mb-12"
        >
          <p className="eyebrow mb-3">In their words</p>
          <SplitText
            text="Voices from the current."
            className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]"
            highlight={[0]}
          />
          <p className="mt-[18px] max-w-[700px] text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed">
            Real feedback from enterprise leaders, startup founders, and public sector partners across India.
          </p>
        </motion.div>

        {/* Testimonials Grid - 32px desktop gap, 24px tablet, 20px mobile, 28px internal padding */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 lg:grid-cols-3">
          {testimonials.map((item, idx) => {
            const isCurrent = activeIdx === idx;

            return (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cn('w-full lg:animate-float', idx === 1 && 'lg:mt-8')}
                style={{ animationDelay: `${-idx * 2}s` }}
                data-cursor="true"
              >
                <div
                  className={cn(
                    'glass border-flow relative h-full rounded-2xl sm:rounded-3xl p-[22px] lg:p-[28px] flex flex-col justify-between transition-all duration-500',
                    isCurrent ? '-translate-y-1.5 [--flow-opacity:1] shadow-xl' : '[--flow-opacity:0.15]'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <Quote className="h-7 w-7 text-accent" />
                      {/* Audio Equalizer Speech Visualizer Bars */}
                      <div className="flex h-5 items-end gap-1" aria-hidden="true">
                        {[0, 1, 2, 3, 4].map((bar) => (
                          <span
                            key={bar}
                            className={cn('w-1 rounded-full bg-sea-gradient', isCurrent ? 'speech-bar' : '')}
                            style={{
                              height: isCurrent ? '100%' : '25%',
                              animationDelay: `${bar * 0.12}s`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Word-by-Word Animated Quote */}
                    <blockquote className="mt-6 font-display text-base sm:text-lg leading-relaxed text-foreground">
                      {item.quote.split(' ').map((word, wIdx) => (
                        <motion.span
                          key={wIdx}
                          className="inline-block"
                          animate={{ opacity: isCurrent ? 1 : 0.65 }}
                          transition={{ delay: isCurrent ? wIdx * 0.03 : 0, duration: 0.4 }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </blockquote>
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3.5 border-t border-glass-border pt-5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flow font-display text-sm font-semibold text-primary-foreground shadow-glow-sea">
                      {item.name[0]}
                    </span>
                    <div>
                      <span className="block text-sm font-semibold text-foreground">{item.name}</span>
                      <span className="block text-xs text-muted-foreground">{item.company}</span>
                    </div>
                  </figcaption>
                </div>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
