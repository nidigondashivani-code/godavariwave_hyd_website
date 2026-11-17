import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import GovtShowcase from '../components/GovtShowcase';
import ClientsRiver from '../components/ClientsRiver';
import Contact from '../components/Contact';
import { portfolioProjects } from '../data/companyData';

const categories = ['All', 'E-commerce', 'Food', 'Mobility', 'Dashboards', 'Marketing'];

export default function PortfolioPage() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filteredProjects = portfolioProjects.filter(
    (p) => selectedCat === 'All' || p.cat === selectedCat
  );

  return (
    <div className="relative">
      <PageHero
        eyebrow="Portfolio"
        title="Work that keeps moving."
        highlight={[3]}
        intro="Recent projects that show our expertise in delivering tailored solutions for unique goals."
      />

      {/* Featured State-wide Showcase */}
      <GovtShowcase />

      {/* Filterable Portfolio Grid Section */}
      <section className="relative px-6 py-20 sm:py-24 md:px-10 bg-[#0B1F3A]">
        <div className="mx-auto max-w-7xl">
          {/* Filter Pills Tabs */}
          <div className="flex justify-center">
            <div
              className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full p-1.5 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg"
              role="tablist"
              aria-label="Filter projects"
            >
              {categories.map((cat) => {
                const isSelected = selectedCat === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCat(cat)}
                    className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="pf-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0066CC] to-[#00D4FF] shadow-[0_0_20px_rgba(0,102,204,0.4)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filterable Projects Grid */}
          <motion.div
            layout
            className="mt-12 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const CardTag = project.link ? 'a' : 'div';
                return (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CardTag
                      {...(project.link
                        ? { href: project.link, target: '_blank', rel: 'noreferrer' }
                        : {})}
                      className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#0F2442] to-[#0A192F] backdrop-blur-xl shadow-xl hover:border-[#00D4FF]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,102,204,0.35)] cursor-pointer h-full flex flex-col justify-between"
                      data-cursor="true"
                    >
                      {/* Image Preview with 4:3 fixed aspect ratio & shimmer shine on hover */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                        <img
                          src={project.image}
                          alt={`${project.name} — ${project.type}`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2442]/90 via-transparent to-transparent" />
                      </div>

                      {/* Card Details */}
                      <div className="flex items-center justify-between p-6">
                        <div>
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#38BDF8]">
                            {project.cat}
                          </span>
                          <h3 className="mt-1 font-display text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
                            {project.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-400">
                            {project.type}
                          </p>
                        </div>

                        {project.link && (
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-[#38BDF8] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#00D4FF] group-hover:text-slate-950 shadow-md">
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        )}
                      </div>
                    </CardTag>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* River of Clients */}
      <ClientsRiver />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}

