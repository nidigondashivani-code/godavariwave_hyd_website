import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { cn } from '../utils/cn';
import { portfolioProjects } from '../data/companyData';

const categories = ['All', 'E-commerce', 'Food', 'Mobility', 'Dashboards', 'Marketing'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>('down');
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll direction so cards come from bottom-to-top when scrolling down, and top-to-bottom when scrolling up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const diff = currentScrollY - lastScrollY;
          if (Math.abs(diff) > 4) {
            setScrollDir(diff > 0 ? 'down' : 'up');
            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax flow while user scrolls across the portfolio
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const parallaxUp = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const parallaxDown = useTransform(scrollYProgress, [0, 1], [-35, 35]);

  const filtered = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.cat === activeCategory);

  return (
    <section ref={sectionRef} id="portfolio" className="relative scroll-mt-20 px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        {/* Header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: scrollDir === 'down' ? 50 : -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow mb-4">Portfolio</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Engineered for{' '}
              <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                real impact.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-muted-foreground md:text-lg">
            A glimpse into production-grade consumer apps, logistics dispatchers, and SaaS platforms delivered by Godavari Wave.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: scrollDir === 'down' ? 40 : -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-12 flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => {
            const count = cat === 'All'
              ? portfolioProjects.length
              : portfolioProjects.filter((p) => p.cat === cat).length;
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-cursor="true"
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-xs font-medium transition-colors duration-300',
                  isSelected
                    ? 'text-primary-foreground shadow-glow-sea'
                    : 'glass text-muted-foreground hover:text-foreground hover:scale-105'
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="portfolio-filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-flow"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span>{cat}</span>
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[0.65rem] font-mono',
                      isSelected ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-glass-strong text-muted-foreground'
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid with Dynamic Top-to-Bottom and Bottom-to-Top Wave Motion */}
        <LayoutGroup id="portfolio-cards-layout">
          <motion.div layout className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => {
                const isLink = Boolean(item.link);
                const CardWrapper = isLink ? 'a' : 'div';
                const linkAttributes = isLink
                  ? { href: item.link, target: '_blank', rel: 'noreferrer' }
                  : {};

                return (
                  <motion.div
                    layout
                    key={item.name}
                    style={{ y: idx % 2 === 0 ? parallaxUp : parallaxDown }}
                    className="h-full"
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: scrollDir === 'down' ? 75 : -75,
                        scale: 0.94
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        scale: 1
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      viewport={{ once: false, amount: 0.12 }}
                      transition={{
                        duration: 0.75,
                        delay: (idx % 3) * 0.08,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="h-full"
                    >
                      <CardWrapper
                        {...linkAttributes}
                        data-cursor="true"
                        className="border-flow group relative flex h-[380px] sm:h-[440px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] bg-ocean-raised [--flow-opacity:0] transition-all duration-500 hover:[--flow-opacity:1] hover:shadow-2xl"
                      >
                        {/* Ambient Gradient Background */}
                        <div
                          className={cn(
                            'absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-700 group-hover:opacity-75',
                            item.accent || 'from-sea/20 via-mint/10 to-ocean-deep'
                          )}
                        />

                        {/* Top Visual: Photo or Brand Visual Showcase */}
                        <div className="relative flex flex-1 items-center justify-center overflow-hidden p-6">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                              className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[2.2s] ease-out group-hover:scale-110 group-hover:opacity-75"
                            />
                          )}

                          {/* Brand Logo Card overlay */}
                          {item.logo ? (
                            <div className="glass-soft relative z-10 flex h-14 w-32 sm:h-20 sm:w-44 md:h-24 md:w-52 items-center justify-center rounded-xl sm:rounded-2xl border border-glass-border/60 p-2.5 sm:p-4 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                              <img
                                src={item.logo}
                                alt={`${item.name} logo`}
                                loading="lazy"
                                className="max-h-7 sm:max-h-10 md:max-h-12 max-w-[85%] object-contain filter drop-shadow"
                              />
                            </div>
                          ) : (
                            <div className="glass-soft relative z-10 flex h-12 sm:h-18 items-center justify-center rounded-xl sm:rounded-2xl border border-glass-border/60 px-3.5 sm:px-6 py-1.5 sm:py-3 shadow-xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                              <span className="font-display text-sm sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                                {item.name}
                              </span>
                            </div>
                          )}

                          {/* Top Category Tag Badge */}
                          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20">
                            <span className="glass rounded-full border border-glass-border/70 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[0.62rem] sm:text-[0.68rem] tracking-wider text-secondary uppercase shadow-sm">
                              {item.cat}
                            </span>
                          </div>

                          {/* Link Indicator in Top Right if live link */}
                          {isLink && (
                            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20">
                              <span className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-glass text-muted-foreground backdrop-blur-md transition-all duration-300 group-hover:bg-flow group-hover:text-primary-foreground">
                                <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Flare Swipe Hover Effect */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/15 to-transparent transition-transform duration-[1.3s] ease-out group-hover:translate-x-full" />

                        {/* Vignette Shadow */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent" />

                        {/* Bottom Glass Card Sheet */}
                        <div className="glass relative z-10 m-3 sm:m-4 rounded-2xl sm:rounded-[1.5rem] p-3.5 sm:p-5 transition-transform duration-500 group-hover:-translate-y-1">
                          <div className="flex items-start justify-between gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <p className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-wider text-accent uppercase">
                                {item.type}
                              </p>
                              <h3 className="mt-0.5 sm:mt-1 truncate font-display text-lg sm:text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                                {item.name}
                              </h3>
                              {item.desc && (
                                <p className="mt-1.5 sm:mt-2 line-clamp-2 text-[11px] sm:text-xs leading-relaxed text-muted-foreground">
                                  {item.desc}
                                </p>
                              )}
                            </div>

                            {isLink ? (
                              <span
                                className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-full bg-flow text-primary-foreground shadow-glow-sea transition-transform duration-500 group-hover:rotate-45"
                                title="Visit live project"
                                aria-hidden="true"
                              >
                                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
                              </span>
                            ) : (
                              <span className="mt-1 shrink-0 rounded-full bg-glass-strong border border-glass-border px-2 sm:px-2.5 py-0.5 sm:py-1 text-[0.6rem] sm:text-[0.65rem] font-mono text-muted-foreground">
                                SaaS / ERP
                              </span>
                            )}
                          </div>
                        </div>
                      </CardWrapper>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
