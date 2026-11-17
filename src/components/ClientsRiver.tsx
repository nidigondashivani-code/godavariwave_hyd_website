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
        className="river-track flex gap-6 group-hover/row:[animation-play-state:paused]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal'
        }}
      >
        {doubled.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="group relative shrink-0 hover:z-30 transition-transform duration-300"
          >
            {/* Equal sized Partner Card with rounded corners and soft shadow */}
            <div className="flex h-20 w-44 sm:h-24 sm:w-48 items-center justify-center rounded-2xl bg-white px-5 sm:px-6 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,102,204,0.3)] border border-white/80">
              <img
                src={item.logo}
                alt={item.name}
                loading="lazy"
                className="h-8 w-auto max-w-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Interactive Tooltip */}
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
    <section className="relative overflow-hidden py-20 md:py-24 px-5 sm:px-6 md:px-8 lg:px-10">
      {/* Background Ambient River Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-full max-w-7xl bg-gradient-to-r from-transparent via-[#0066CC]/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="mx-auto max-w-7xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-mono tracking-widest text-[#00D4FF] uppercase mb-3 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
          480+ TRUSTED CLIENTS
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          A river of{' '}
          <span className="bg-gradient-to-r from-[#FFFFFF] via-[#38BDF8] to-[#00D4FF] bg-clip-text text-transparent">
            partners.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-base sm:text-lg text-sky-100/80 leading-relaxed">
          Powering ambitious startups, regional businesses, and government initiatives across Andhra Pradesh, Telangana, and global markets.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 sm:mt-12 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <RiverRow items={row1} duration={55} />
        <RiverRow items={row2} reverse duration={65} />
        <RiverRow items={row3} duration={60} />
      </motion.div>
    </section>
  );
}
