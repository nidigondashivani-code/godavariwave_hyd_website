import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import { processSteps } from '../data/companyData';

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="relative px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow mb-4">How we work</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
            Idea to impact,{' '}
            <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
              in one current.
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-muted-foreground md:text-lg">
            Our structured agile framework eliminates guesswork and turns complex ideas into market-ready realities.
          </p>
        </motion.div>

        {/* Desktop Wave Navigation */}
        <motion.div
          className="relative mt-20 hidden md:block"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Connecting Wave SVG */}
          <div className="relative mx-auto flex max-w-5xl items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-gradient-to-r from-sea via-mint to-ember opacity-30" />

            {processSteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => {
                    setIsAutoPlay(false);
                    setActiveStep(idx);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none"
                >
                  <motion.div
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-full text-sm font-semibold transition-all duration-500',
                      isActive
                        ? 'bg-flow text-primary-foreground shadow-glow-sea scale-125'
                        : 'glass text-muted-foreground hover:text-foreground hover:scale-110'
                    )}
                  >
                    0{idx + 1}
                  </motion.div>
                  <span
                    className={cn(
                      'mt-4 font-display text-sm font-medium transition-colors',
                      isActive ? 'text-secondary font-semibold' : 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Step Display Card */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass border-flow rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-12 text-center [--flow-opacity:1]"
            >
              <span className="eyebrow text-xs text-secondary">
                Step 0{activeStep + 1} of 0{processSteps.length}
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
                {processSteps[activeStep].title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {processSteps[activeStep].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Mobile Step Selectors */}
        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2 md:hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {processSteps.map((step, idx) => (
            <button
              key={step.title}
              onClick={() => {
                setIsAutoPlay(false);
                setActiveStep(idx);
              }}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-medium transition-all',
                activeStep === idx
                  ? 'bg-flow text-primary-foreground shadow-glow-sea'
                  : 'glass text-muted-foreground'
              )}
            >
              0{idx + 1}. {step.title}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

