import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  immediate?: boolean;
  highlight?: number[];
}

export default function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  as = 'h2',
  immediate = false,
  highlight = []
}: SplitTextProps) {
  const words = text.split(' ');
  const Component = (motion as any)[as] || motion.h2;

  return (
    <Component
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: { once: false, amount: 0.4 } })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          aria-hidden="true"
        >
          <motion.span
            className={cn('inline-block', wordClassName, highlight.includes(idx) && 'text-flow')}
            variants={{
              hidden: { y: '110%', rotate: 4, opacity: 0 },
              show: { y: '0%', rotate: 0, opacity: 1 }
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {idx < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}

