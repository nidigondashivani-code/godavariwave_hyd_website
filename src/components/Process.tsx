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
    }, 3600);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="relative min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
      <div className="mx-auto max-w-[1450px]">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-3">How we work</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]">
            Idea to impact,{' '}
            <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
              in one current.
            </span>
          </h2>
          <p className="mx-auto mt-[18px] max-w-[700px] text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed">
            Our structured agile framework eliminates guesswork and turns complex ideas into market-ready realities.
          </p>
        </motion.div>

        {/* Desktop Connected Steps Navigation with Animated Connecting Line */}
        <motion.div
          className="relative mt-12 sm:mt-16 lg:mt-20 hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {/* Connecting Animated Line */}
          <div className="relative mx-auto flex max-w-5xl items-center justify-between">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gradient-to-r from-sea via-mint to-ember opacity-30 rounded-full" />
            <motion.div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-[#0066CC] to-[#00D4FF] rounded-full shadow-glow-sea transition-all duration-500"
              style={{
                width: `${(activeStep / (processSteps.length - 1)) * 100}%`
              }}
            />

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
                  onMouseEnter={() => {
                    setIsAutoPlay(false);
                    setActiveStep(idx);
                  }}
                  className="group relative z-10 flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  <motion.div
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-full text-sm font-semibold transition-all duration-300',
                      isActive
                        ? 'bg-flow text-primary-foreground shadow-glow-sea scale-125'
                        : 'glass text-muted-foreground hover:text-foreground hover:scale-110 hover:border-[#00D4FF]/40'
                    )}
                  >
                    0{idx + 1}
                  </motion.div>
                  <span
                    className={cn(
                      'mt-4 font-display text-sm font-medium transition-colors',
                      isActive ? 'text-secondary font-semibold' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Step Display Card - 24px - 32px padding */}
        <motion.div
          className="mt-10 sm:mt-12 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="glass border-flow rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center [--flow-opacity:1] shadow-xl"
            >
              <span className="eyebrow text-xs text-secondary font-mono">
                Step 0{activeStep + 1} of 0{processSteps.length}
              </span>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-foreground md:text-4xl">
                {processSteps[activeStep].title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[700px] mx-auto">
                {processSteps[activeStep].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Mobile Step Selectors */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2 md:hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {processSteps.map((step, idx) => (
            <button
              key={step.title}
              onClick={() => {
                setIsAutoPlay(false);
                setActiveStep(idx);
              }}
              className={cn(
                'rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer',
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
