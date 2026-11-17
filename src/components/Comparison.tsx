import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Bot, Headphones, Rocket } from 'lucide-react';
import { cn } from '../utils/cn';
import { comparisonMetrics } from '../data/companyData';

const metricIcons: Record<string, React.ReactNode> = {
  Performance: <Zap className="h-5 w-5 text-secondary" />,
  Security: <ShieldCheck className="h-5 w-5 text-primary" />,
  Innovation: <Rocket className="h-5 w-5 text-accent" />,
  AI: <Bot className="h-5 w-5 text-secondary" />,
  Support: <Headphones className="h-5 w-5 text-primary" />,
  Delivery: <Check className="h-5 w-5 text-accent" />
};

export default function Comparison() {
  const [selectedTab, setSelectedTab] = useState<'gw' | 'trad'>('gw');

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-12 sm:gap-16 lg:gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="eyebrow mb-3">Why Godavari Wave</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]">
              Not another{' '}
              <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                IT vendor.
              </span>
            </h2>
            <p className="mt-[18px] max-w-[700px] text-[16px] sm:text-[18px] leading-relaxed text-muted-foreground">
              We replace fragmented freelancers and rigid legacy IT firms with an agile, high-velocity engineering partner that cares about your bottom line.
            </p>

            {/* Toggle Pill */}
            <div className="glass-soft mt-8 inline-flex rounded-full p-1 sm:p-1.5" role="tablist" aria-label="Comparison">
              <button
                role="tab"
                aria-selected={selectedTab === 'trad'}
                onClick={() => setSelectedTab('trad')}
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer',
                  selectedTab === 'trad' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {selectedTab === 'trad' && (
                  <motion.span
                    layoutId="cmp-pill"
                    className="absolute inset-0 rounded-full bg-muted-foreground"
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
                <span className="relative">Traditional</span>
              </button>

              <button
                role="tab"
                aria-selected={selectedTab === 'gw'}
                onClick={() => setSelectedTab('gw')}
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer',
                  selectedTab === 'gw' ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {selectedTab === 'gw' && (
                  <motion.span
                    layoutId="cmp-pill"
                    className="absolute inset-0 rounded-full bg-flow shadow-glow-sea"
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  />
                )}
                <span className="relative">Godavari Wave</span>
              </button>
            </div>
          </motion.div>

          {/* Comparison Progress Bars - 32px desktop, 24px tablet, 20px mobile gap */}
          <div className="grid gap-5 md:gap-6 lg:gap-8">
            {comparisonMetrics.map((item, idx) => {
              const score = selectedTab === 'gw' ? item.gw : item.trad;
              const text = selectedTab === 'gw' ? item.gwText : item.tradText;

              return (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                  className="glass rounded-2xl p-[22px] lg:p-[28px] transition-all duration-300 hover:border-sea/50 hover:-translate-y-0.5 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-glass-strong border border-glass-border">
                        {metricIcons[item.metric]}
                      </span>
                      <span className="font-display text-base sm:text-lg font-semibold text-foreground">
                        {item.metric}
                      </span>
                    </div>
                    <span className="font-mono text-sm sm:text-base font-bold text-secondary">
                      {score}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-ocean-deep/80">
                    <motion.div
                      className={cn(
                        'h-full rounded-full transition-all duration-700',
                        selectedTab === 'gw' ? 'bg-flow shadow-glow-sea' : 'bg-muted-foreground/60'
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
