import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { portfolioProjects } from '../data/companyData';

const categories = ['All', 'E-commerce', 'Food', 'Mobility', 'Dashboards', 'Marketing'];

const projectTechTags: Record<string, string[]> = {
  'Yoloo': ['React', 'Next.js', 'Stripe'],
  'Fresho Zapcart': ['React Native', 'Node.js', 'Maps API'],
  'Abhi24': ['Mobile App', 'Node.js', 'Fleet GPS'],
  'Wedzing': ['Next.js', 'PostgreSQL', 'Tailwind'],
  'Intlo Kitchen': ['React Native', 'Express', 'Razorpay'],
  'Varadhi': ['React', 'Firebase', 'Live Track'],
  'MeLocal': ['React Native', 'Node.js', 'MongoDB'],
  'Quickee': ['Node.js', 'Socket.io', 'Dispatch'],
  'Cabrastey': ['React Native', 'Google Maps', 'Node.js'],
  'Zig Zag': ['Mobile App', 'GPS Engine', 'AWS'],
  'Manasavari': ['React Native', 'Routing API', 'Cloud'],
  'Nagzo': ['Next.js', 'Fleet Ops', 'PostgreSQL'],
  'Hospital Management': ['React', 'TypeScript', 'Analytics'],
  'Truedoit': ['Next.js', 'Telemetry', 'PostgreSQL'],
  'Complete Digital Marketing': ['SEO', 'Meta Ads', 'Analytics']
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered = activeCategory === 'All'
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.cat === activeCategory);

  return (
    <section ref={sectionRef} id="portfolio" className="relative scroll-mt-28 lg:scroll-mt-36 min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
      <div className="mx-auto max-w-[1450px]">
        {/* Header with consistent layout: Label -> 12px -> Heading (42px) -> 18px -> Description (18px) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <p className="eyebrow mb-3">Portfolio</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]">
              Engineered for{' '}
              <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                real impact.
              </span>
            </h2>
          </div>
          <p className="max-w-[700px] text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed mt-[18px] lg:mt-0">
            A glimpse into production-grade consumer apps, logistics dispatchers, and SaaS platforms delivered by Godavari Wave.
          </p>
        </motion.div>

        {/* Category Filter Pills (40px spacing to content) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mt-10 sm:mt-12 mb-12 sm:mb-16 flex flex-wrap items-center gap-2.5"
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
                  'relative rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer',
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

        {/* Projects Grid with 32px desktop gap, 24px tablet, 20px mobile, 4-col desktop, 3-col laptop, 2-col tablet, 1-col mobile */}
        <LayoutGroup id="portfolio-cards-layout">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 lg:gap-8 items-stretch">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => {
                const isLink = Boolean(item.link);
                const CardWrapper = isLink ? 'a' : 'div';
                const linkAttributes = isLink
                  ? { href: item.link, target: '_blank', rel: 'noreferrer' }
                  : {};
                const tags = projectTechTags[item.name] || ['Web App', 'Cloud', 'API'];

                return (
                  <motion.div
                    layout
                    key={item.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.6,
                      delay: (idx % 4) * 0.08,
                      ease: 'easeOut'
                    }}
                    className="h-full"
                  >
                    <CardWrapper
                      {...linkAttributes}
                      data-cursor="true"
                      className="group relative flex flex-col justify-between h-[530px] w-full rounded-2xl bg-[#0B1F3A]/90 border border-white/15 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#38BDF8]/50 hover:shadow-[0_20px_45px_rgba(0,102,204,0.3)] hover:-translate-y-1 block text-left cursor-pointer overflow-hidden"
                    >
                      {/* Ambient Accent Glow inside card */}
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-25 transition-opacity duration-700 group-hover:opacity-45',
                          item.accent || 'from-sea/20 via-mint/10 to-ocean-deep'
                        )}
                      />

                      {/* Top Content Block */}
                      <div className="relative z-10 flex flex-col">
                        {/* 1. Image Container (Fixed 16:9 Aspect Ratio) */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-ocean-deep/60">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-sea/20 via-ocean to-ocean-deep" />
                          )}

                          {/* Gradient Vignette */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />

                          {/* Brand Logo in center if available */}
                          {item.logo && (
                            <div className="absolute inset-0 flex items-center justify-center p-3">
                              <div className="glass-soft flex h-11 w-28 sm:h-12 sm:w-32 items-center justify-center rounded-lg border border-white/15 p-2 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                                <img
                                  src={item.logo}
                                  alt={`${item.name} logo`}
                                  loading="lazy"
                                  className="max-h-8 max-w-[85%] object-contain filter drop-shadow"
                                />
                              </div>
                            </div>
                          )}

                          {/* Shimmer Flare Swipe */}
                          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1.2s] ease-out group-hover:translate-x-full" />
                        </div>

                        {/* 2. Project Category (Image → Category: 16px) */}
                        <div className="mt-4 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                            {item.cat}
                          </span>
                          <span className="font-mono text-[11px] text-slate-400 truncate max-w-[140px]">
                            {item.type.split('·')[0].trim()}
                          </span>
                        </div>

                        {/* 3. Project Title (Category → Title: 12px, Max 2 lines with fixed height) */}
                        <h3 className="mt-3 font-display text-lg sm:text-xl font-bold text-white tracking-tight line-clamp-2 h-14 flex items-center leading-snug group-hover:text-[#38BDF8] transition-colors">
                          {item.name}
                        </h3>

                        {/* 4. Short Description (Title → Description: 16px, Max 3 lines with ellipsis) */}
                        <p className="mt-4 text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-3 h-[4.5rem] overflow-hidden">
                          {item.desc || 'Engineered scalable digital solution delivering high reliability and seamless user experience.'}
                        </p>

                        {/* 5. Technology Tags (Description → Tags: 20px, Equal height, padding and spacing) */}
                        <div className="mt-5 flex items-center gap-2 overflow-hidden h-7">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center justify-center h-6 rounded-md bg-white/5 border border-white/10 px-2.5 text-[11px] font-mono text-sky-200 shrink-0"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 6. Action Button (Tags → Button: 24px, Always positioned at the bottom) */}
                      <div className="relative z-10 mt-auto pt-6">
                        {isLink ? (
                          <div className="inline-flex w-full h-11 items-center justify-between rounded-xl bg-white/5 group-hover:bg-[#0066CC]/30 border border-white/10 group-hover:border-[#38BDF8]/50 px-4 text-xs sm:text-sm font-semibold text-white transition-all duration-300">
                            <span className="flex items-center gap-1.5 text-slate-200 group-hover:text-white">
                              Visit Platform
                            </span>
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-[#0066CC]/40 text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-slate-900 transition-colors">
                              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex w-full h-11 items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 text-xs sm:text-sm font-semibold text-slate-400">
                            <span className="text-slate-300">Enterprise Solution</span>
                            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-slate-300">
                              <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                            </span>
                          </div>
                        )}
                      </div>
                    </CardWrapper>
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
