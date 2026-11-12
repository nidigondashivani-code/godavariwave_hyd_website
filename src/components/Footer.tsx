import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Facebook, Instagram, Linkedin, Send, Sparkles } from 'lucide-react';
import { companyInfo, navLinks } from '../data/companyData';
import HyderabadSkyline from './HyderabadSkyline';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterSent(true);
    window.location.href = `mailto:${companyInfo.emails.info}?subject=Newsletter%20Subscription&body=Email:%20${encodeURIComponent(
      newsletterEmail
    )}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const replayIntro = () => {
    sessionStorage.removeItem('gw_seen_intro');
    window.location.reload();
  };

  return (
    <footer className="relative overflow-hidden border-t border-glass-border mt-16 sm:mt-24 pt-20 sm:pt-28 md:pt-36 bg-[#0B1F3A]">
      {/* Decorative Wave Headers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 overflow-hidden" aria-hidden="true">
        <svg viewBox="0 0 2880 200" preserveAspectRatio="none" className="absolute top-0 left-0 h-full w-[200%]" style={{ opacity: 0.35 }}>
          <path d="M0 100 C 360 40, 720 160, 1440 100 S 2520 40, 2880 100" fill="none" stroke="#0066CC" strokeWidth="1.5" />
        </svg>
        <svg viewBox="0 0 2880 200" preserveAspectRatio="none" className="absolute top-0 left-0 h-full w-[200%]" style={{ opacity: 0.28 }}>
          <path d="M0 118 C 360 50, 720 150, 1440 118 S 2520 50, 2880 118" fill="none" stroke="#00D4FF" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 pt-6 sm:pt-8">
        {/* Main Footer Grid with Bottom-to-Up Scroll Animation */}
        <motion.div
          className="grid gap-12 sm:gap-16 lg:grid-cols-[1.4fr_1fr]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-[#0066CC] animate-ping" />
              <p className="font-mono text-xs tracking-wider uppercase text-[#0066CC]">
                2026 Hyderabad · Technology for the World
              </p>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Let's engineer your{' '}
              <span className="bg-gradient-to-r from-[#0066CC] via-[#00D4FF] to-[#38BDF8] bg-clip-text text-transparent">
                intelligent future.
              </span>
            </h2>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                data-cursor="true"
                className="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-flow px-6 sm:px-8 text-sm sm:text-base font-medium text-primary-foreground shadow-glow-sea transition-all duration-500 hover:shadow-glow-ember hover:scale-[1.03]"
              >
                <span>Schedule a Consultation</span>
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href={`tel:${companyInfo.phones[0].replace(/\s+/g, '')}`}
                data-cursor="true"
                className="glass inline-flex h-12 sm:h-14 items-center justify-center rounded-full px-6 sm:px-8 text-sm sm:text-base font-medium text-foreground transition-all duration-500 hover:bg-glass-strong hover:scale-[1.03]"
              >
                <span>Call {companyInfo.phones[0]}</span>
              </a>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-12 sm:mt-16 max-w-md">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                Subscribe to intelligent digital engineering insights
              </p>
              <form onSubmit={handleNewsletter} className="mt-4 flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-full border border-glass-border bg-glass-soft px-5 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-[#0066CC] focus:outline-none"
                />
                <button
                  type="submit"
                  data-cursor="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-flow text-primary-foreground shadow-glow-sea transition-transform hover:scale-105"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              {newsletterSent && (
                <p className="mt-2 text-xs text-[#0066CC]">
                  Thank you! You are subscribed to our technology dispatches.
                </p>
              )}
            </div>
          </div>

          {/* Right Navigation & Legal Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <p className="font-mono text-xs text-[#0066CC] uppercase tracking-wider">Navigation</p>
              <ul className="mt-6 space-y-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.to}
                      data-cursor="true"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs text-[#00D4FF] uppercase tracking-wider">Hubs & Hiring</p>
              <ul className="mt-6 space-y-6 space-x-10 text-sm text-muted-foreground">
                <li className="text-[#38BDF8] font-semibold flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-ping" />
                  <span>Hyderabad Hub (Actively Hiring)</span>
                </li>
                <li className="text-xs text-slate-300">
                  Meenakshi Tech Park, Gachibowli
                </li>
                <li className="text-xs text-[#38BDF8]">
                  HR Renusri:+917799822121
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider">Connect</p>
              <div className="mt-6 flex flex-col space-y-3">
                <a
                  href={companyInfo.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Facebook className="h-4 w-4 text-[#0066CC]" />
                  <span>Facebook</span>
                </a>
                <a
                  href={companyInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="h-4 w-4 text-[#00D4FF]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={companyInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="true"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4 text-[#38BDF8]" />
                  <span>LinkedIn</span>
                </a>

                {/* Replay Cinematic Intro button */}
                <button
                  type="button"
                  onClick={replayIntro}
                  data-cursor="true"
                  className="mt-2 flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-[#0066CC] transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-[#00D4FF]" />
                  <span>Replay Intro</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* NIGHT VIEW: GLOWING HYDERABAD SKYLINE SILHOUETTE & GODAVARI RIVER REFLECTION */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <HyderabadSkyline />
      </motion.div>

      {/* Bottom Copyright Row */}
      <div className="border-t border-glass-border/40 bg-[#061224] py-8 sm:py-10 mt-12 sm:mt-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row md:px-10">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <img
              src="/images/gw-logo-mark.png"
              alt="Godavari Wave"
              className="h-6 w-6 object-contain"
            />
            <p>
              &copy; {new Date().getFullYear()} {companyInfo.legal}. All rights reserved.
            </p>
          </div>

          <p className="font-mono text-[0.68rem] text-[#00D4FF]">
            · Hyderabad Innovation Hub (2026) · Serving Global Clients
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            data-cursor="true"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
