import React, { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Layers, Brain, Database, Cloud, Palette, Wrench, ChevronDown } from 'lucide-react';
import { cn } from '../utils/cn';
import SectionHeader from './SectionHeader';
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
    <section id="technologies" className="relative scroll-mt-28 lg:scroll-mt-36 min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
      <div className="mx-auto max-w-[1450px]">
        {/* Section Header: Standardized 56px/46px/34px typography, uppercase 14px label, gradient accent line */}
        <SectionHeader
          label="OUR TECHNOLOGIES"
          title={
            <>
              Architected with{' '}
              <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                battle-tested technologies.
              </span>
            </>
          }
          description="A transparent look at the modern frameworks, databases, and infrastructure tools we trust to ship resilient products."
          align="center"
        />

        {/* Capsules Container with Staggered Entrance & Blue Glow Hover */}
        <LayoutGroup id="tech-stack-capsules">
          <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10">
            {techStack.map((item, idx) => {
              const icon = techIcons[item.id] ?? <Layers className="h-4 w-4" />;
              const isActive = activeTab === item.id;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.65, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
                  className="w-full sm:w-auto"
                >
                  <motion.button
                    layout
                    type="button"
                    onClick={() => setActiveTab(isActive ? null : item.id)}
                    whileTap={{ scale: 0.98 }}
                    aria-expanded={isActive}
                    data-cursor="true"
                    transition={{ layout: { type: 'spring', stiffness: 220, damping: 24 } }}
                    className={cn(
                      'glass border-flow block overflow-hidden text-left cursor-pointer transition-all duration-300 w-full sm:w-auto hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(0,102,204,0.45)] hover:border-[#00D4FF]/60',
                      isActive
                        ? 'sm:w-[min(94vw,30rem)] rounded-2xl sm:rounded-3xl p-[22px] lg:p-[28px] shadow-2xl [--flow-opacity:1] ring-1 ring-[#00D4FF]/50 border-[#00D4FF]/60'
                        : 'rounded-full px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base [--flow-opacity:0.2]'
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
                        <span className="font-display text-base sm:text-lg font-semibold text-foreground">
                          {item.name}
                        </span>
                        <span className="rounded-full bg-glass-strong px-2 py-0.5 text-xs text-muted-foreground font-mono">
                          {item.skills.length}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-300',
                          isActive && 'rotate-180 text-secondary'
                        )}
                      />
                    </motion.div>

                    {/* Expanded Skills Panel (24px padding inside) */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          layout="position"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 border-t border-glass-border pt-4">
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="rounded-lg bg-glass-strong border border-glass-border px-2.5 py-1 text-xs font-mono text-foreground/90 transition-colors hover:border-secondary"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-xl bg-glass-soft p-3 border border-glass-border/50">
                                <p className="eyebrow text-[0.65rem] text-accent">Projects</p>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.projects}</p>
                              </div>
                              <div className="rounded-xl bg-glass-soft p-3 border border-glass-border/50">
                                <p className="eyebrow text-[0.65rem] text-secondary">Experience</p>
                                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.experience}</p>
                              </div>
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
