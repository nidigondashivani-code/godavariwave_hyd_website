import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Layers, Brain, Database, Cloud, Palette, Wrench, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import { techStack } from '../data/companyData';

const techIcons: Record<string, React.ReactNode> = {
  web: <Layers className="h-4 w-4" />,
  ai: <Brain className="h-4 w-4" />,
  data: <Database className="h-4 w-4" />,
  cloud: <Cloud className="h-4 w-4" />,
  design: <Palette className="h-4 w-4" />,
  tools: <Wrench className="h-4 w-4" />
};

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string | null>('ai');

  return (
    <section id="technologies" className="relative px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="eyebrow mb-4">Technologies</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
            Capsules of{' '}
            <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
              capability.
            </span>
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-base text-muted-foreground md:text-lg">
            Click any capsule to explore our technical capabilities, frameworks, and production experience.
          </p>
        </motion.div>

        <LayoutGroup id="tech-stack-capsules">
          <div className="mt-12 sm:mt-20 flex flex-wrap items-start justify-center gap-3 sm:gap-5">
            {techStack.map((item, idx) => {
              const icon = techIcons[item.id] ?? <Layers className="h-4 w-4" />;
              const isActive = activeTab === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 60, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 16, delay: idx * 0.08 }}
                  className="animate-float"
                  style={{
                    animationDelay: `${-idx * 1.7}s`,
                    animationDuration: `${6 + (idx % 4)}s`
                  }}
                >
                  <motion.button
                    layout
                    type="button"
                    onClick={() => setActiveTab(isActive ? null : item.id)}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={isActive}
                    data-cursor="true"
                    transition={{ layout: { type: 'spring', stiffness: 200, damping: 24 } }}
                    className={cn(
                      'glass border-flow block overflow-hidden text-left cursor-pointer transition-all duration-300',
                      isActive
                        ? 'w-[min(94vw,30rem)] rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 shadow-2xl [--flow-opacity:1] ring-1 ring-[#00D4FF]/40'
                        : 'rounded-full px-4 sm:px-6 py-2.5 sm:py-4 text-sm sm:text-base hover:scale-[1.03] hover:border-[#0066CC]/50 [--flow-opacity:0.2]'
                    )}
                    style={{ '--flow-opacity': isActive ? 1 : 0.2 } as React.CSSProperties}
                  >
                    <motion.div layout="position" className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'grid h-9 w-9 place-items-center rounded-full transition-colors',
                            isActive ? 'bg-flow text-primary-foreground shadow-glow-sea' : 'bg-glass-strong text-mint'
                          )}
                        >
                          {icon}
                        </span>
                        <span className="font-display text-lg font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="rounded-full bg-glass-strong px-2 py-0.5 text-xs text-muted-foreground font-mono">
                          {item.skills.length}
                        </span>
                      </div>

                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-300 shrink-0 ml-2',
                          isActive ? 'rotate-180 text-secondary' : 'rotate-0'
                        )}
                      />
                    </motion.div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                          exit={{ opacity: 0, y: -5 }}
                          className="mt-6 border-t border-glass-border/60 pt-5"
                        >
                          <p className="eyebrow text-[0.65rem]">Skills & Stack</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {item.skills.map((skill, t) => (
                              <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.18 + t * 0.03 }}
                                className="rounded-full border border-glass-border bg-glass px-3 py-1 text-xs text-foreground font-medium"
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>

                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl bg-glass-soft p-3.5 border border-glass-border/50">
                              <p className="eyebrow text-[0.65rem] text-accent">Projects</p>
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.projects}</p>
                            </div>
                            <div className="rounded-2xl bg-glass-soft p-3.5 border border-glass-border/50">
                              <p className="eyebrow text-[0.65rem] text-secondary">Experience</p>
                              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.experience}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
