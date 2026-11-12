import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Code2, Smartphone, TrendingUp, Palette, Cloud, CreditCard, ArrowUpRight, LucideIcon, Waves } from 'lucide-react';
import { cn } from '../utils/cn';
import SplitText from './SplitText';
import { services } from '../data/companyData';

const iconMap: Record<string, LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  marketing: TrendingUp,
  design: Palette,
  cloud: Cloud,
  nfc: CreditCard
};

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 });

  const px = useTransform(mx, (v) => `${v * 100}%`);
  const py = useTransform(my, (v) => `${v * 100}%`);
  const spotlightBg = useMotionTemplate`radial-gradient(420px circle at ${px} ${py}, color-mix(in oklab, var(--sea) 22%, transparent), transparent 60%)`;

  const Icon = iconMap[s.id] || Code2;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      mx.set((e.clientX - rect.left) / rect.width);
      my.set((e.clientY - rect.top) / rect.height);
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, clipPath: 'inset(14% 0% 14% 0% round 2rem)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 2rem)' }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 1.2,
        delay: i * 0.14,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={cn('animate-float', i % 3 === 1 && 'lg:translate-y-16')}
      style={{
        animationDelay: `${-i * 1.3}s`,
        animationDuration: `${7 + (i % 3)}s`
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1200,
          ['--flow-opacity' as any]: hovered ? 1 : 0.25
        }}
        animate={{ y: hovered ? -14 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="glass border-flow group relative h-full min-h-[300px] sm:min-h-[340px] overflow-hidden rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 outline-none cursor-pointer"
        data-cursor="true"
      >
        {/* Wave Passing Shimmer Flare */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FFFFFF]/15 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

        {/* Mouse Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />

        {/* Card Header & Icon */}
        <div className="relative flex items-start justify-between">
          <motion.div
            className="grid h-16 w-16 place-items-center rounded-2xl bg-sea-gradient text-primary-foreground shadow-glow-sea"
            animate={hovered ? { rotate: [0, -12, 10, 0], scale: 1.08 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Icon className="h-7 w-7" strokeWidth={1.6} />
          </motion.div>
          <span className="font-display text-sm font-mono text-muted-foreground">0{i + 1}</span>
        </div>

        {/* Title & Short Summary */}
        <h3 className="relative mt-10 font-display text-2xl font-semibold text-foreground md:text-[1.7rem]">
          {s.title}
        </h3>
        <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.short}</p>

        {/* Expanding Points on Hover */}
        <motion.ul
          className="relative mt-6 space-y-2 overflow-hidden text-sm"
          initial={false}
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {s.points.map((pt) => (
            <li key={pt} className="flex items-center gap-3 text-foreground/85">
              <span className="h-1 w-4 rounded-full bg-flow" />
              <span>{pt}</span>
            </li>
          ))}
        </motion.ul>

        {/* Corner Indicator Arrow */}
        <ArrowUpRight className="absolute right-8 bottom-8 h-5 w-5 text-mint opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:text-[#00D4FF]" />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 px-4 sm:px-6 py-20 sm:py-32 md:px-10 md:py-44 overflow-hidden">
      {/* FLOWING DIGITAL WATER WAVE SWEEPING ACROSS SECTION */}
      <div className="pointer-events-none absolute inset-x-0 top-12 h-32 overflow-hidden opacity-40">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-full w-[200%] animate-pulse">
          <path
            d="M0 60 C 240 20, 480 100, 720 50 S 1200 20, 1440 60 S 1920 100, 2160 50 S 2640 20, 2880 60"
            fill="none"
            stroke="#0066CC"
            strokeWidth="2"
            className="flow-dash"
            style={{ strokeDasharray: '4 8' }}
          />
          <path
            d="M0 75 C 240 35, 480 115, 720 65 S 1200 35, 1440 75 S 1920 115, 2160 65 S 2640 35, 2880 75"
            fill="none"
            stroke="#00D4FF"
            strokeWidth="1.5"
            className="flow-dash"
            style={{ strokeDasharray: '6 12' }}
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Section Header with bottom-to-up scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Waves className="h-4 w-4 text-[#0066CC]" />
              <p className="eyebrow text-[#0066CC]">
                What We Do
              </p>
            </div>
            <SplitText
              text="Six currents. One flow."
              className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl"
              highlight={[3]}
            />
          </div>
          <p className="max-w-sm text-base text-muted-foreground leading-relaxed md:text-lg">
            From the first pixel to 24/7 cloud monitoring — every capability under one roof.
          </p>
        </motion.div>

        {/* 6 Services Grid (Each appears as the wave passes) */}
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:pb-16">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
