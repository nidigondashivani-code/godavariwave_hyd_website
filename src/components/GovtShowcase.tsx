import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import SplitText from './SplitText';
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
      initial={{ opacity: 0, scale: 0.95, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: 'easeOut' }}
    >
      <Wrapper
        {...linkProps}
        className="border-flow group relative block h-full min-h-[320px] sm:min-h-[400px] overflow-hidden rounded-2xl sm:rounded-3xl bg-ocean-raised [--flow-opacity:0] hover:[--flow-opacity:1]"
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
        <div className="glass absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-2xl p-[22px] lg:p-[28px] transition-transform duration-500 group-hover:-translate-y-1">
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
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default function GovtShowcase() {
  return (
    <section id="solutions" className="relative scroll-mt-20 px-5 md:px-8 lg:px-10 xl:px-12 py-[80px] md:py-[100px] lg:py-[120px]">
      <div className="mx-auto max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-10 sm:mb-12"
        >
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <SplitText
              text="Platforms a state runs on."
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
              highlight={[0]}
            />
            <p className="mt-[18px] max-w-[700px] text-base sm:text-lg text-muted-foreground leading-relaxed">
              Mission-critical governance portals, disaster response apps, and public distribution pipelines engineered for millions of citizens.
            </p>
          </div>
          <a
            href="#portfolio"
            className="glass inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white/10 hover:border-[#00D4FF]/40 hover:-translate-y-0.5 hover:shadow-lg self-start md:self-auto shrink-0 mb-2"
          >
            <span>All projects</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Bento 12-Column Grid - 32px desktop, 24px tablet, 20px mobile gap */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 md:grid-cols-12">
          {govtProjects.map((item, idx) => (
            <ShowcaseCard
              key={item.title}
              index={idx}
              {...item}
              className={cn(
                [0, 3, 4].includes(idx) ? 'md:col-span-7' : 'md:col-span-5',
                idx === 0 && 'md:min-h-[520px]'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
