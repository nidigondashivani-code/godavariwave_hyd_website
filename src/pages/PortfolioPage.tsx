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
            className="mt-12 sm:mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const isLink = Boolean(project.link);
                const CardTag = isLink ? 'a' : 'div';
                const linkAttributes = isLink
                  ? { href: project.link, target: '_blank', rel: 'noreferrer' }
                  : {};

                return (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <CardTag
                      {...linkAttributes}
                      className="border-flow group relative flex flex-col justify-between min-h-[500px] sm:h-[520px] w-full rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0F2442]/95 via-[#0B1F3A]/95 to-[#061224]/95 border border-white/15 p-6 sm:p-7 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-[#00D4FF]/50 hover:shadow-[0_20px_50px_rgba(0,102,204,0.35)] hover:-translate-y-1.5 block text-left cursor-pointer overflow-hidden"
                      data-cursor="true"
                    >
                      {/* Ambient Accent Glow inside card */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 transition-opacity duration-700 group-hover:opacity-40 from-sky-500/20 via-blue-500/10 to-ocean-deep"
                      />

                      {/* Wave Passing Shimmer Flare on Hover */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[1.4s] ease-out group-hover:translate-x-full" />

                      {/* Upper Section */}
                      <div className="relative z-10 flex flex-col">
                        {/* 1. Visual Showcase Header: Plain White Background with Centered Sticker Badge */}
                        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center p-6 transition-all duration-500 group-hover:shadow-lg">
                          {/* Top-Left Category Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B1F3A] border border-white/10 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#38BDF8] shadow-md">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF]" />
                              {project.cat}
                            </span>
                          </div>

                          {/* Top-Right Quick Link Indicator */}
                          {isLink && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0B1F3A] border border-white/10 text-slate-300 shadow-md transition-all duration-300 group-hover:bg-[#00D4FF] group-hover:text-slate-950 group-hover:border-[#00D4FF]">
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45" />
                              </span>
                            </div>
                          )}

                          {/* Centered Client Sticker Logo */}
                          {project.logo ? (
                            <div className="relative flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
                              <img
                                src={project.logo}
                                alt={`${project.name} sticker logo`}
                                loading="lazy"
                                className="max-h-16 sm:max-h-20 max-w-[78%] object-contain filter drop-shadow-sm"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center font-display font-bold text-2xl text-slate-800 tracking-tight">
                              {project.name}
                            </div>
                          )}
                        </div>

                        {/* 2. Content below image: Shifted slightly to the right with increased margin/padding */}
                        <div className="mt-6 sm:mt-7 pl-3 sm:pl-4 flex flex-col">
                          {/* Subtype / Category Tag */}
                          <div className="flex items-center justify-between">
                            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                              {project.type}
                            </p>
                          </div>

                          {/* Project Title */}
                          <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#38BDF8] transition-colors truncate">
                            {project.name}
                          </h3>

                          {/* Short Description */}
                          <p className="mt-2 text-xs sm:text-sm text-slate-300/85 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                            {project.desc || 'Engineered scalable digital solution delivering high reliability and seamless user experience.'}
                          </p>
                        </div>
                      </div>

                      {/* 3. Action Button (Anchored at the bottom) */}
                      <div className="relative z-10 mt-auto pt-6 pl-3 sm:pl-4">
                        {isLink ? (
                          <div className="inline-flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#0066CC]/20 via-[#004E9A]/30 to-[#00D4FF]/20 border border-[#38BDF8]/30 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white group-hover:border-[#00D4FF] group-hover:from-[#0066CC] group-hover:to-[#00D4FF] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-[#00D4FF] animate-pulse" />
                              <span>Visit Live Platform</span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45 text-[#38BDF8] group-hover:text-white" />
                          </div>
                        ) : (
                          <div className="inline-flex w-full items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-400">
                            <span className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-slate-500" />
                              <span>Enterprise Platform</span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 opacity-40" />
                          </div>
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

