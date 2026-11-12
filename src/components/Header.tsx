import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { navLinks } from '../data/companyData';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const calculateActiveSection = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If reached bottom of document (within 120px), highlight last section (#contact)
      if (windowHeight + scrollY >= documentHeight - 120) {
        setActiveSection('#contact');
        return;
      }

      // 2. If at top of page (Hero section before #services), clear active highlight
      if (scrollY < 120) {
        setActiveSection('');
        return;
      }

      // 3. Scan sections in page order
      // Trigger offset accounts for fixed navbar (approx 80px) plus visual margin
      const triggerOffset = 220;
      let current = '';

      for (const link of navLinks) {
        const id = link.to.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollY >= top - triggerOffset) {
            current = link.to;
          }
        }
      }

      setActiveSection(current);
    };

    calculateActiveSection();

    window.addEventListener('scroll', calculateActiveSection, { passive: true });
    window.addEventListener('resize', calculateActiveSection, { passive: true });

    const handleHashChange = () => {
      if (window.location.hash) {
        setActiveSection(window.location.hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', calculateActiveSection);
      window.removeEventListener('resize', calculateActiveSection);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    setActiveSection(to);
    const targetId = to.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', to);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-700 md:px-6',
          scrolled ? 'glass border border-glass-border shadow-2xl' : 'border border-transparent'
        )}
      >
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-3 cursor-pointer"
          aria-label="Godavari Wave Technologies — home"
        >
          <img
            src="/images/gw-logo-mark.png"
            alt="Godavari Wave Technologies"
            width={40}
            height={40}
            className="h-10 w-10 transition-transform duration-700 group-hover:rotate-[24deg]"
          />
          <span className="leading-none">
            <span className="block font-display text-[1.05rem] font-semibold tracking-tight text-foreground">
              Godavari Wave
            </span>
            <span className="mt-1 block text-[0.62rem] tracking-[0.32em] text-muted-foreground uppercase">
              Technologies
            </span>
          </span>
        </a>

        {/* Desktop Navigation with Active Section Highlight */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((link) => {
            const isActive = activeSection === link.to;

            return (
              <a
                key={link.label}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                data-cursor="true"
                className={cn(
                  'relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300/80 hover:text-white hover:bg-white/5'
                )}
              >
                {/* Framer Motion Sliding Glass Pill Indicator */}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0066CC]/35 via-[#00D4FF]/20 to-[#004E9A]/40 border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.35)] backdrop-blur-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10 flex items-center gap-1.5">
                  {/* Subtle pulsing cyan beacon dot */}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF] animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </span>

                {link.label === 'Careers' && (
                  <span
                    className={cn(
                      'relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight uppercase border transition-all duration-300',
                      isActive
                        ? 'bg-[#00D4FF]/30 text-[#00D4FF] border-[#00D4FF]/60 shadow-[0_0_10px_rgba(0,212,255,0.4)]'
                        : 'bg-[#00D4FF]/20 text-[#38BDF8] border-[#00D4FF]/30'
                    )}
                  >
                    Hiring
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Message Symbol Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            data-cursor="true"
            aria-label="Send a message"
            title="Send a message"
            className={cn(
              'group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition-all duration-300 hover:scale-110',
              activeSection === '#contact'
                ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white ring-2 ring-[#00D4FF] shadow-[0_0_22px_rgba(0,212,255,0.7)]'
                : 'bg-flow text-primary-foreground shadow-glow-sea hover:shadow-glow-ember'
            )}
          >
            <MessageSquare className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="grid h-10 w-10 place-items-center rounded-full text-foreground hover:bg-glass lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer & Overlay */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Card */}
          <div className="glass fixed inset-x-4 top-24 z-50 max-h-[82dvh] overflow-y-auto rounded-3xl p-6 shadow-2xl lg:hidden">
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.to;

                return (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => {
                      handleNavClick(e, link.to);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      'relative flex items-center justify-between rounded-2xl px-5 py-3.5 text-base sm:text-lg font-medium transition-all duration-300',
                      isActive
                        ? 'bg-gradient-to-r from-[#0066CC]/35 via-[#004E9A]/45 to-[#00D4FF]/25 text-white font-semibold border border-[#00D4FF]/50 shadow-[0_0_20px_rgba(0,212,255,0.25)]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#00D4FF] shadow-[0_0_10px_#00D4FF] animate-pulse" />
                      )}
                      <span>{link.label}</span>
                    </span>

                    {link.label === 'Careers' && (
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-xs font-mono font-bold tracking-tight uppercase border transition-all duration-300',
                          isActive
                            ? 'bg-[#00D4FF]/30 text-[#00D4FF] border-[#00D4FF]/60 shadow-[0_0_10px_rgba(0,212,255,0.4)]'
                            : 'bg-[#00D4FF]/20 text-[#38BDF8] border-[#00D4FF]/30'
                        )}
                      >
                        We're Hiring
                      </span>
                    )}
                  </a>
                );
              })}

              <div className="mt-3 border-t border-glass-border pt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    handleNavClick(e, '#contact');
                    setMobileOpen(false);
                  }}
                  className={cn(
                    'flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-semibold transition-all duration-300 shadow-glow-sea',
                    activeSection === '#contact'
                      ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white ring-2 ring-[#00D4FF]'
                      : 'bg-flow text-primary-foreground'
                  )}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Send a Message</span>
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
