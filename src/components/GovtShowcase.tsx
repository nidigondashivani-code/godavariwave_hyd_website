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
      initial={{ clipPath: 'inset(18% 18% 18% 18% round 2rem)', opacity: 0, y: 60 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1.1, delay: (index % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Wrapper
        {...linkProps}
        className="border-flow group relative block h-full min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-2xl sm:rounded-[2rem] bg-ocean-raised [--flow-opacity:0] hover:[--flow-opacity:1]"
        data-cursor="true"
      >
        {/* Zooming Cover Image */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[2.4s] ease-out group-hover:scale-[1.18] group-hover:translate-x-[-2%]"
        />

        {/* Shimmer Light Flare Swipe */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-ivory/20 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean via-ocean/30 to-transparent" />

        {/* Bottom Glass Card */}
        <div className="glass absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 rounded-xl sm:rounded-[1.5rem] p-4 sm:p-6 transition-transform duration-700 group-hover:-translate-y-2">
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            <div>
              <p className="eyebrow text-[0.65rem] text-secondary">{tag}</p>
              <h3 className="mt-1.5 sm:mt-2 font-display text-xl sm:text-2xl font-semibold text-foreground md:text-3xl">
                {title}
              </h3>
            </div>
            <span className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-full bg-flow text-primary-foreground transition-transform duration-500 group-hover:rotate-45 shadow-glow-sea">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
          </div>

          {text && (
            <p className="mt-2.5 sm:mt-3 max-h-0 overflow-hidden text-xs sm:text-sm text-muted-foreground opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100">
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
    <section id="solutions" className="relative scroll-mt-20 px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <SplitText
              text="Platforms a state runs on."
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              highlight={[0]}
            />
          </div>
          <a
            href="#portfolio"
            className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 hover:bg-glass-strong"
          >
            <span>All projects</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        {/* Bento 12-Column Grid */}
        <div className="mt-20 grid gap-6 md:grid-cols-12">
          {govtProjects.map((item, idx) => (
            <ShowcaseCard
              key={item.title}
              index={idx}
              {...item}
              className={cn(
                [0, 3, 4].includes(idx) ? 'md:col-span-7' : 'md:col-span-5',
                idx === 0 && 'md:min-h-[560px]'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
