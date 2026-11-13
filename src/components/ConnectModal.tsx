import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';

export default function ConnectModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Web & Mobile');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const services = ['Web & Mobile', 'AI & Cloud', 'Enterprise Software', 'Digital Marketing'];

  const handleClose = (e?: React.SyntheticEvent | Event) => {
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }
    setIsOpen(false);
    if (modalRef.current) {
      modalRef.current.style.display = 'none';
    }
  };

  const handleUserInteraction = () => { };

  // Auto-close silently within 5 seconds (no UI countdown)
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, submitted]);

  useEffect(() => {
    setMounted(true);

    const handleOpenEvent = () => {
      setSubmitted(false);
      setIsOpen(true);
      if (modalRef.current) {
        modalRef.current.style.display = 'flex';
      }
    };
    window.addEventListener('open-connect-modal', handleOpenEvent);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose(e);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-connect-modal', handleOpenEvent);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save lead into HR Lead Sheet storage immediately
    try {
      saveLead({
        name: formData.name,
        company: formData.company || `${formData.name}'s Enterprise`,
        email: formData.email,
        phone: formData.phone,
        service: selectedService,
        message: formData.message || 'Direct enquiry from website popup',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        revenue: 1000000,
        source: 'Website Popup',
        status: 'New',
        priority: 'High',
        assignedTo: 'Renusri',
      });
      window.dispatchEvent(
        new CustomEvent('gw_notification_added', {
          detail: {
            id: `notif-${Date.now()}`,
            title: 'New Website Lead Captured!',
            message: `${formData.name} submitted an inquiry for ${selectedService} via Website Popup.`,
            type: 'lead',
            timestamp: new Date().toISOString(),
            read: false,
          },
        })
      );
    } catch (err) {
      console.error('Lead save error:', err);
    }

    setSubmitted(true);
  };

  // Immediate, deterministic dismissal
  if (!isOpen || !mounted || typeof document === 'undefined') return null;

  return createPortal(
    <div
      ref={modalRef}
      id="connect-modal-overlay"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 2147483600,
        pointerEvents: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose(e);
        }
      }}
    >
      {/* Translucent Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 cursor-pointer transition-opacity"
        aria-label="Close modal overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(3, 15, 30, 0.72)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          zIndex: 1,
        }}
      />

      {/* Modal Dialog Card: Compact, Slim Height & Width, Ocean High-Contrast Palette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative  max-w-[260px] rounded-2xl border border-white/25 p-4 sm:p-5 my-auto max-h-[200vh] overflow-y-auto text-white shadow-2xl"
        style={{
          position: 'relative',
          zIndex: 10,
          background: 'linear-gradient(145deg, #023b85ff 0%, #004E9A 55%, #0284C7 100%)',
          backgroundColor: '#0A2540',
          boxShadow: '0 20px 60px rgba(7,24,46,0.95), 0 0 35px rgba(0,212,255,0.3)',
        }}
      >
        {/* Subtle Ambient Glows in Card Background */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#00D4FF]/20 blur-xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#07182E]/50 blur-xl" />

        {/* Close Button strictly on Top Right Corner */}
        <button
          type="button"
          id="connect-modal-close-btn"
          onClick={handleClose}
          className="absolute top-4 right-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-red-700"
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>

        {submitted ? (
          <div className="py-4 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white font-mono text-[10px] font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                RECORDED IN LEAD SHEET
              </span>
              <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                Lead Successfully Submitted!
              </h3>
              <p className="mt-0.5 text-xs text-sky-100 max-w-xs mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your details are captured in the Lead Dashboard.
              </p>
            </div>

            {/* Display exact details entered by user */}
            <div className="rounded-xl border border-white/20 bg-black/25 p-3 text-left space-y-1.5 text-xs backdrop-blur-md max-w-sm mx-auto">
              <div className="flex justify-between items-center pb-1 border-b border-white/10">
                <span className="text-sky-200/80 font-mono text-[10px]">NAME:</span>
                <span className="font-bold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-white/10">
                <span className="text-sky-200/80 font-mono text-[10px]">PHONE:</span>
                <span className="font-mono font-bold text-white">{formData.phone}</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-white/10">
                <span className="text-sky-200/80 font-mono text-[10px]">EMAIL:</span>
                <span className="font-medium text-white truncate max-w-[180px]">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center pb-1 border-b border-white/10">
                <span className="text-sky-200/80 font-mono text-[10px]">SERVICE:</span>
                <span className="rounded bg-[#004E9A]/70 border border-white/20 px-2 py-0.5 text-[10px] font-bold text-white">
                  {selectedService}
                </span>
              </div>
              {formData.message && (
                <div className="pt-1">
                  <span className="text-sky-200/80 font-mono text-[10px] block mb-0.5">PROJECT DETAILS:</span>
                  <p className="text-[11px] text-sky-100 bg-black/30 rounded-lg p-2 border border-white/10 leading-relaxed italic">
                    "{formData.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Button */}
            <div className="pt-1 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  window.history.pushState(null, '', '/lead');
                  window.dispatchEvent(new Event('gw_route_change'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold text-[#004E9A] bg-white hover:bg-sky-50 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>View in Dashboard (/lead)</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#004E9A]" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Title & Subtitle */}
            <div className="pr-10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/20 border border-white/30 text-white font-mono text-[9px] font-bold tracking-wider uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CLIENT INQUIRY · GODAVARI WAVE
                </span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
                Start your digital journey with us
              </h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-2.5 space-y-2.5">
              {/* Service Pills */}
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-sky-100 uppercase tracking-wider">
                  I'm interested in
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        handleUserInteraction();
                        setSelectedService(s);
                      }}
                      className={`rounded-md px-2.5 py-1 text-[10.5px] font-semibold transition-all cursor-pointer border ${selectedService === s
                        ? 'bg-white text-[#004E9A] border-white shadow-sm font-bold'
                        : 'bg-[#0B1F3A]/50 text-sky-100 border-white/20 hover:bg-[#0B1F3A]/80'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label
                    htmlFor="connect-name"
                    className="block text-[10px] font-bold text-white uppercase tracking-wider"
                  >
                    FULL NAME *
                  </label>
                  <input
                    id="connect-name"
                    required
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onFocus={handleUserInteraction}
                    onChange={(e) => {
                      handleUserInteraction();
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full rounded-md bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-1.5 text-xs border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#0066CC] shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="connect-email"
                    className="block text-[10px] font-bold text-white uppercase tracking-wider"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    id="connect-email"
                    required
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onFocus={handleUserInteraction}
                    onChange={(e) => {
                      handleUserInteraction();
                      setFormData({ ...formData, email: e.target.value });
                    }}
                    className="w-full rounded-md bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-1.5 text-xs border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#0066CC] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-0.5">
                  <label
                    htmlFor="connect-phone"
                    className="block text-[10px] font-bold text-white uppercase tracking-wider"
                  >
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    id="connect-phone"
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onFocus={handleUserInteraction}
                    onChange={(e) => {
                      handleUserInteraction();
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    className="w-full rounded-md bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-1.5 text-xs border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#0066CC] shadow-sm transition-all"
                  />
                </div>

                <div className="space-y-0.5">
                  <label
                    htmlFor="connect-company"
                    className="block text-[10px] font-bold text-white uppercase tracking-wider"
                  >
                    COMPANY NAME
                  </label>
                  <input
                    id="connect-company"
                    type="text"
                    placeholder="e.g. Enterprise Ltd"
                    value={formData.company}
                    onFocus={handleUserInteraction}
                    onChange={(e) => {
                      handleUserInteraction();
                      setFormData({ ...formData, company: e.target.value });
                    }}
                    className="w-full rounded-md bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-1.5 text-xs border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#0066CC] shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Message Row */}
              <div className="space-y-0.5">
                <label
                  htmlFor="connect-message"
                  className="block text-[10px] font-bold text-white uppercase tracking-wider"
                >
                  PROJECT DETAILS
                </label>
                <textarea
                  id="connect-message"
                  rows={2}
                  placeholder="Briefly describe your vision, timeline, or requirements..."
                  value={formData.message}
                  onFocus={handleUserInteraction}
                  onChange={(e) => {
                    handleUserInteraction();
                    setFormData({ ...formData, message: e.target.value });
                  }}
                  className="w-full rounded-md bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-1.5 text-xs border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-1 focus:ring-[#0066CC] shadow-sm transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Action Button: Full-width Submit button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  className="w-full relative group inline-flex items-center justify-center gap-1.5 rounded-lg py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#004E9A] hover:to-[#0066CC] shadow-[0_5px_15px_rgba(0,102,204,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Submit to Lead Sheet</span>
                  <Send className="h-3.5 w-3.5 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>

            {/* Quick Contact Footer */}
            <div className="mt-3 pt-2 border-t border-white/15 flex items-center justify-between text-[10.5px] text-sky-100 font-medium">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-white" />
                <span>+91 7799 822 121</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3 text-white" />
                <span>info@godavariwave.com</span>
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
