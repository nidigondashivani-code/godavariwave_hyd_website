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
    <section className="relative px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-4">Why Godavari Wave</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Not another{' '}
              <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                IT vendor.
              </span>
            </h2>
            <p className="mt-6 sm:mt-8 text-sm sm:text-base leading-relaxed text-muted-foreground md:text-lg">
              We replace fragmented freelancers and rigid legacy IT firms with an agile, high-velocity engineering partner that cares about your bottom line.
            </p>

            {/* Toggle Pill */}
            <div className="glass-soft mt-8 sm:mt-12 inline-flex rounded-full p-1 sm:p-1.5" role="tablist" aria-label="Comparison">
              <button
                role="tab"
                aria-selected={selectedTab === 'trad'}
                onClick={() => setSelectedTab('trad')}
                className={cn(
                  'relative rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors',
                  selectedTab === 'trad' ? 'text-primary-foreground' : 'text-muted-foreground'
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
                  'relative rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors',
                  selectedTab === 'gw' ? 'text-primary-foreground' : 'text-muted-foreground'
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

          {/* Comparison Progress Bars with Bottom-to-Up Staggered Animation */}
          <div className="grid gap-6">
            {comparisonMetrics.map((item, idx) => {
              const score = selectedTab === 'gw' ? item.gw : item.trad;
              const text = selectedTab === 'gw' ? item.gwText : item.tradText;

              return (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:border-sea/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-glass-strong border border-glass-border">
                        {metricIcons[item.metric]}
                      </span>
                      <span className="font-display text-lg font-semibold text-foreground">
                        {item.metric}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-secondary">
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

                  <p className="mt-3 text-xs text-muted-foreground">
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

