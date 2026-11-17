import React from 'react';
import { motion } from 'framer-motion';
import { clientLogos } from '../data/companyData';

interface RowProps {
  items: typeof clientLogos;
  reverse?: boolean;
  duration?: number;
}

function RiverRow({ items, reverse, duration = 60 }: RowProps) {
  const doubled = [...items, ...items];

  return (
    <div className="river-row group/row relative py-3 sm:py-4">
      <div
        className="river-track flex gap-4 sm:gap-6 group-hover/row:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="group relative animate-float shrink-0 hover:z-30"
            style={{
              animationDelay: `${-(idx % 7) * 0.9}s`,
              animationDuration: `${5 + (idx % 3)}s`
            }}
          >
            {/* Restored & Upgraded Partner Card */}
            <div className="flex h-20 w-48 sm:h-24 sm:w-32 items-center justify-center rounded-2xl bg-white px-5 sm:px-6 shadow-md transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] group-hover:shadow-[0_16px_36px_rgba(0,102,204,0.35),0_0_24px_rgba(0,212,255,0.4)] border border-white/60">
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className="h-6 w-auto object-contain transition-all duration-500 group-hover:scale-105 select-none"
              />
            </div>

            {/* Restored & Upgraded Interactive Tooltip */}
            <div className="pointer-events-none absolute top-full left-1/2 z-20 mt-3 w-56 -translate-x-1/2 translate-y-2 scale-95 rounded-2xl bg-[#0B1F3A]/95 border border-white/20 p-4 opacity-0 shadow-[0_20px_45px_rgba(0,0,0,0.65),0_0_20px_rgba(0,212,255,0.3)] backdrop-blur-xl transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 text-center">
              <p className="font-display font-bold text-sm text-white truncate drop-shadow-sm">
                {item.name}
              </p>
              <div className="mt-1 flex items-center justify-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                <p className="text-xs font-medium text-sky-200 truncate">
                  {item.industry}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientsRiver() {
  const row1 = clientLogos.slice(0, 10);
  const row2 = clientLogos.slice(10, 20);
  const row3 = clientLogos.slice(20);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 md:py-44">
      {/* Background Ambient River Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-full max-w-7xl bg-gradient-to-r from-transparent via-[#0066CC]/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-mono tracking-widest text-[#00D4FF] uppercase mb-4 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          480+ TRUSTED CLIENTS
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
          A river of{' '}
          <span className="bg-gradient-to-r from-[#FFFFFF] via-[#38BDF8] to-[#00D4FF] bg-clip-text text-transparent">
            partners.
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-sky-100/80 md:text-lg leading-relaxed">
          Powering ambitious startups, regional businesses, and government initiatives across Andhra Pradesh, Telangana, and global markets.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 pb-20 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <RiverRow items={row1} duration={55} />
        <RiverRow items={row2} reverse duration={65} />
        <RiverRow items={row3} duration={60} />
      </motion.div>
    </section>
  );
}

