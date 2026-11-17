import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
  glow?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  className,
  glow = true
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'relative mb-10 sm:mb-12 lg:mb-14',
        isCenter ? 'text-center flex flex-col items-center' : 'text-left flex flex-col items-start',
        className
      )}
    >
      {/* Subtle Ambient Radial Glow Behind Heading */}
      {glow && (
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-12 h-36 w-80 sm:w-96 rounded-full bg-[#00D4FF]/12 blur-3xl',
            isCenter ? 'left-1/2 -translate-x-1/2' : 'left-0'
          )}
        />
      )}

      {/* 1. Small Label (14px, SemiBold, Uppercase, 2px letter spacing, Blue accent) */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
        className="font-mono text-[14px] font-semibold tracking-[2px] uppercase text-[#38BDF8] mb-3"
      >
        {label}
      </motion.p>

      {/* 2. Main Heading (Desktop: 56px, Tablet: 46px, Mobile: 30-34px, Weight: 800, Max width: 900px) */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className={cn(
          'font-display text-[30px] sm:text-[34px] md:text-[46px] lg:text-[56px] font-extrabold tracking-tight text-foreground leading-[1.15] max-w-[900px] break-words',
          isCenter && 'mx-auto'
        )}
      >
        {title}
      </motion.h2>

      {/* 3. Decorative Accent: Gradient Line expanding with scaleX */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        className={cn(
          'mt-4 h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#38BDF8] to-[#0066CC] shadow-[0_0_12px_rgba(0,212,255,0.5)]',
          isCenter ? 'origin-center' : 'origin-left'
        )}
      />

      {/* 4. Description (Max width: 700px, 20px spacing below heading, comfortable line height) */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className={cn(
            'mt-5 max-w-[700px] text-[15px] sm:text-[16px] md:text-[18px] text-muted-foreground leading-relaxed break-words',
            isCenter && 'mx-auto'
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

