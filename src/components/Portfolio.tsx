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

        {/* Projects Grid: 3 Columns on desktop, 2 on tablet, 1 on mobile */}
        <LayoutGroup id="portfolio-cards-layout">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
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
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{
                      duration: 0.6,
                      delay: (idx % 3) * 0.1,
                      ease: 'easeOut'
                    }}
                    className="h-full"
                  >
                    <CardWrapper
                      {...linkAttributes}
                      data-cursor="true"
                      className="border-flow group relative flex flex-col justify-between h-[520px] w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0F2442]/95 via-[#0B1F3A]/95 to-[#061224]/95 border border-white/15 p-6 sm:p-7 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-[#00D4FF]/50 hover:shadow-[0_20px_50px_rgba(0,102,204,0.35)] hover:-translate-y-1.5 block text-left cursor-pointer overflow-hidden"
                    >
                      {/* Ambient Accent Glow inside card */}
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-700 group-hover:opacity-40',
                          item.accent || 'from-sea/20 via-mint/10 to-ocean-deep'
                        )}
                      />

                      {/* Wave Passing Shimmer Flare on Hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

                      {/* Upper Section */}
                      <div className="relative z-10 flex flex-col">
                        {/* 1. Visual Showcase Header (Fixed 16:10 Ratio) */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#071527] shadow-inner">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            />
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-sea/20 via-ocean to-ocean-deep" />
                          )}

                          {/* Soft Vignette Overlay */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent" />

                          {/* Top-Left Category Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1F3A]/90 border border-white/15 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#38BDF8] shadow-md backdrop-blur-md">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
                              {item.cat}
                            </span>
                          </div>

                          {/* Top-Right Quick Link Indicator */}
                          {isLink && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B1F3A]/90 border border-white/15 text-slate-300 shadow-md backdrop-blur-md transition-all duration-300 group-hover:bg-[#00D4FF] group-hover:text-slate-950 group-hover:border-[#00D4FF]">
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                              </span>
                            </div>
                          )}

                          {/* Centered Client Logo Badge */}
                          {item.logo && (
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                              <div className="flex h-12 sm:h-14 w-32 sm:w-36 items-center justify-center rounded-xl bg-[#0B1F3A]/85 border border-white/20 p-2.5 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105">
                                <img
                                  src={item.logo}
                                  alt={`${item.name} logo`}
                                  loading="lazy"
                                  className="max-h-8 sm:max-h-9 max-w-[85%] object-contain filter drop-shadow"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 2. Subtype / Category Tag */}
                        <div className="mt-5 flex items-center justify-between">
                          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                            {item.type}
                          </p>
                        </div>

                        {/* 3. Project Title */}
                        <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors truncate">
                          {item.name}
                        </h3>

                        {/* 4. Short Description */}
                        <p className="mt-2 text-xs sm:text-sm text-slate-300/85 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                          {item.desc || 'Engineered scalable digital solution delivering high reliability and seamless user experience.'}
                        </p>

                        {/* 5. Technology Tags */}
                        <div className="mt-3.5 flex flex-wrap items-center gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-mono text-sky-200/90 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* 6. Action Button (Anchored at the bottom) */}
                      <div className="relative z-10 mt-auto pt-5">
                        {isLink ? (
                          <div className="inline-flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#0066CC]/20 via-[#004E9A]/30 to-[#00D4FF]/20 border border-[#38BDF8]/30 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white group-hover:border-[#00D4FF] group-hover:from-[#0066CC] group-hover:to-[#00D4FF] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse" />
                              <span>Visit Live Platform</span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 text-[#38BDF8] group-hover:text-white" />
                          </div>
                        ) : (
                          <div className="inline-flex w-full items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-400">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-slate-500" />
                              <span>Enterprise Platform</span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 opacity-40" />
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
