import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import SplitText from './SplitText';
import SectionHeader from './SectionHeader';
import { govtProjects } from '../data/companyData';

interface ShowcaseCardProps {
  title: string;
  tag: string;
  image: string;
  text: string;
  link?: string;
  className?: string;
  index: number;
}

function ShowcaseCard({ title, tag, image, text, link, className, index }: ShowcaseCardProps) {
  const Wrapper = link ? 'a' : 'div';
  const linkProps = link ? { href: link, target: '_blank', rel: 'noreferrer' } : {};

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.12 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: 'easeOut' }}
    >
      <Wrapper
        {...linkProps}
        className="border-flow group relative block h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl bg-ocean-raised [--flow-opacity:0] hover:[--flow-opacity:1]"
        data-cursor="true"
      >
        {/* Zooming Cover Image */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Shimmer Light Flare Swipe */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/20 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/40 to-transparent" />

        {/* Bottom Glass Card - 28px desktop, 22px mobile padding */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.1 + 0.15, ease: 'easeOut' }}
          className="glass absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-2xl p-[22px] lg:p-[28px] transition-transform duration-500 group-hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-[0.65rem] text-secondary">{tag}</p>
              <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-foreground md:text-3xl">
                {title}
              </h3>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-flow text-primary-foreground transition-transform duration-500 group-hover:rotate-45 shadow-glow-sea">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>

          {text && (
            <p className="mt-3 max-h-0 overflow-hidden text-xs sm:text-sm text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100 leading-relaxed">
              {text}
            </p>
          )}
        </motion.div>
      </Wrapper>
    </motion.div>
  );
}

export default function GovtShowcase() {
  return (
    <section id="solutions" className="relative scroll-mt-28 lg:scroll-mt-36 min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px]">
      <div className="mx-auto max-w-[1450px]">
        {/* Solutions Main H1 Display Heading (Bold, White and Blue Combination) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight leading-tight">
            <span className="text-white">SOLU</span>
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#38BDF8] to-[#0066CC] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,212,255,0.45)]">
              TIONS
            </span>
          </h1>
        </motion.div>

        {/* Section Header: Standardized 56px/46px/34px typography, uppercase 14px label, gradient accent line */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-10 sm:mb-12 lg:mb-14">
          <SectionHeader
            label="OUR SOLUTIONS"
            title={
              <>
                Platforms a state{' '}
                <span className="bg-gradient-to-r from-sea via-mint to-ember bg-clip-text text-transparent">
                  runs on.
                </span>
              </>
            }
            description="Mission-critical governance portals, disaster response apps, and public distribution pipelines engineered for millions of citizens."
            align="left"
            className="mb-0"
          />

          <motion.a
            href="#portfolio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="glass inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white/10 hover:border-[#00D4FF]/40 hover:-translate-y-0.5 hover:shadow-lg self-start md:self-auto shrink-0 mb-4 cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="h-4 w-4 text-[#00D4FF]" />
          </motion.a>
        </div>

        {/* Bento 12-Column Grid - 32px desktop, 24px tablet, 20px mobile gap */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 md:grid-cols-12">
          {govtProjects.map((item, idx) => (
            <ShowcaseCard
              key={item.title}
              index={idx}
              {...item}
              className={cn(
                [0, 3, 4].includes(idx) ? 'md:col-span-7' : 'md:col-span-5',
                idx === 0 && 'md:min-h-[580px] lg:min-h-[640px]'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
