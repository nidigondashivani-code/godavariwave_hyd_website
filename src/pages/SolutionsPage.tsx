import React from 'react';
import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import GovtShowcase from '../components/GovtShowcase';
import Contact from '../components/Contact';
import { solutions } from '../data/companyData';

export default function SolutionsPage() {
  return (
    <div className="relative">
      <PageHero
        eyebrow="Products & solutions"
        title="Platforms for every industry."
        highlight={[3]}
        intro="Industry-focused technology that boosts efficiency, increases reach and drives measurable results."
      />

      {/* Products Grid: Built to launch. Built to scale. */}
      <section className="relative px-6 py-20 sm:py-24 md:px-10 bg-[#0B1F3A]">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            label="OUR PRODUCTS"
            title="Built to launch. Built to scale."
            description="From high-speed e-commerce and ride-hailing to enterprise logistics, hospital management and digital door systems."
            align="center"
          />

          <div className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item, idx) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformPerspective: 1200 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl shadow-xl hover:border-[#00D4FF]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,102,204,0.35)]"
              >
                {/* 4:3 Aspect Ratio Image Banner */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block rounded-full bg-[#00D4FF]/15 border border-[#00D4FF]/30 px-3 py-1 font-mono text-[11px] font-semibold text-[#00D4FF] uppercase tracking-wider">
                      {item.tag}
                    </span>
                    <h3 className="mt-3 font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300 font-normal">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Government & State-wide Showcase */}
      <GovtShowcase />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

