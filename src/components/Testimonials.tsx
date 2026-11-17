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
    <section className="relative overflow-hidden px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      {/* Background Oscillating Ribbon Waves */}
      <RibbonWaves className="top-1/2 h-[420px] -translate-y-1/3 opacity-70" count={6} />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-4">In their words</p>
          <SplitText
            text="Voices from the current."
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground"
            highlight={[0]}
          />
        </motion.div>

        <div className="mt-12 sm:mt-20 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, idx) => {
            const isCurrent = activeIdx === idx;

            return (
              <motion.figure
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.16, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActiveIdx(idx)}
                className={cn('animate-float', idx === 1 && 'lg:mt-16')}
                style={{ animationDelay: `${-idx * 2}s` }}
                data-cursor="true"
              >
                <div
                  className={cn(
                    'glass border-flow relative h-full rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 md:p-8 transition-all duration-700',
                    isCurrent ? '-translate-y-2 [--flow-opacity:1]' : '[--flow-opacity:0.15]'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                    {/* Audio Equalizer Speech Visualizer Bars */}
                    <div className="flex h-5 sm:h-6 items-end gap-1" aria-hidden="true">
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

                  {/* Word-by-Word Animated Quote - scaled according to card size */}
                  <blockquote className="mt-5 sm:mt-8 font-display text-base sm:text-lg md:text-xl leading-relaxed sm:leading-snug text-foreground">
                    {item.quote.split(' ').map((word, wIdx) => (
                      <motion.span
                        key={wIdx}
                        className="inline-block"
                        animate={{ opacity: isCurrent ? 1 : 0.55 }}
                        transition={{ delay: isCurrent ? wIdx * 0.03 : 0, duration: 0.4 }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </blockquote>

                  <figcaption className="mt-5 sm:mt-8 flex items-center gap-3 sm:gap-4 border-t border-glass-border pt-4 sm:pt-6">
                    <span className="grid h-9 w-9 sm:h-11 sm:w-11 place-items-center rounded-full bg-flow font-display text-xs sm:text-base font-semibold text-primary-foreground shadow-glow-sea">
                      {item.name[0]}
                    </span>
                    <span>
                      <span className="block text-sm sm:text-base font-medium text-foreground">{item.name}</span>
                      <span className="block text-xs sm:text-sm text-muted-foreground">{item.company}</span>
                    </span>
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
