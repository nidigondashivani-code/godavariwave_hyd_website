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

  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 160, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 160, damping: 20 });

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: (i % 3) * 0.1,
        ease: 'easeOut'
      }}
      className={cn('w-full lg:animate-float', i % 3 === 1 && 'lg:translate-y-8')}
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
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformPerspective: 1200,
          ['--flow-opacity' as any]: hovered ? 1 : 0.25
        }}
        animate={{ y: hovered ? -10 : 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        className="glass border-flow group relative h-full min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] overflow-hidden rounded-2xl sm:rounded-3xl p-7 sm:p-8 lg:p-9 outline-none cursor-pointer flex flex-col justify-between"
        data-cursor="true"
      >
        {/* Wave Passing Shimmer Flare */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#FFFFFF]/15 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

        {/* Mouse Spotlight */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />

        {/* Card Header & Icon */}
        <div>
          <div className="relative flex items-start justify-between">
            <motion.div
              className="grid h-14 w-14 sm:h-16 sm:w-16 place-items-center rounded-2xl bg-sea-gradient text-primary-foreground shadow-glow-sea"
              animate={hovered ? { rotate: [0, -10, 8, 0], scale: 1.05 } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
            </motion.div>
            <span className="font-display text-sm font-mono text-muted-foreground">0{i + 1}</span>
          </div>

          {/* Title & Short Summary */}
          <h3 className="relative mt-8 font-display text-xl sm:text-2xl font-semibold text-foreground md:text-[1.65rem] tracking-tight">
            {s.title}
          </h3>
          <p className="relative mt-3 text-muted-foreground leading-relaxed text-sm sm:text-base">
            {s.short}
          </p>

          {/* Expanding Points on Hover */}
          <motion.ul
            className="relative mt-5 space-y-2 overflow-hidden text-sm"
            initial={false}
            animate={{
              height: hovered ? 'auto' : 0,
              opacity: hovered ? 1 : 0
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {s.points.map((pt) => (
              <li key={pt} className="flex items-center gap-3 text-foreground/85">
                <span className="h-1 w-4 rounded-full bg-flow shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Corner Indicator Arrow */}
        <div className="relative mt-6 flex justify-end">
          <ArrowUpRight className="h-5 w-5 text-mint opacity-40 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100 group-hover:text-[#00D4FF]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 lg:scroll-mt-36 min-h-screen min-h-[100dvh] flex flex-col justify-center px-5 md:px-8 lg:px-10 xl:px-12 py-[100px] sm:py-[120px] md:py-[140px] lg:py-[160px] overflow-hidden">
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

      <div className="mx-auto max-w-[1450px]">
        {/* Section Header with consistent spacing: Label -> 12px -> Heading (42px) -> 18px -> Description (18px) -> 40px -> Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 sm:mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Waves className="h-4 w-4 text-[#0066CC]" />
              <p className="eyebrow text-[#0066CC]">
                Our Services
              </p>
            </div>
            <SplitText
              text="Six currents. One flow."
              className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-foreground leading-[1.15]"
              highlight={[3]}
            />
            <p className="mt-[18px] max-w-[700px] text-[16px] sm:text-[18px] text-muted-foreground leading-relaxed">
              Helping businesses build modern digital products — from responsive web apps and cloud architecture to AI solutions and enterprise platforms.
            </p>
          </div>
        </motion.div>

        {/* 6 Services Grid - 32px desktop gap, 24px tablet, 20px mobile gap */}
        <div className="grid gap-5 md:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
