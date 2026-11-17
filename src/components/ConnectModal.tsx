import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { saveLead } from '../utils/leadStorage';

export default function ConnectModal() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
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

  const handleUserInteraction = () => {
    setIsInteracting(true);
  };

  // Auto-close silently within 5 seconds if user has not interacted
  useEffect(() => {
    if (!isOpen || isInteracting || submitted) return;

    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, isInteracting, submitted]);

  useEffect(() => {
    setMounted(true);

    const handleOpenEvent = () => {
      setSubmitted(false);
      setIsInteracting(false);
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

      {/* Modal Dialog Card: Mobile Width 90-95%, Max 420px, Padding 20px, Border Radius 20px */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          zIndex: 10,
          borderRadius: '20px',
          padding: '20px',
          maxWidth: '420px',
          background: 'linear-gradient(145deg, #023b85ff 0%, #004E9A 55%, #0284C7 100%)',
          backgroundColor: '#0A2540',
          boxShadow: '0 20px 60px rgba(7,24,46,0.95), 0 0 35px rgba(0,212,255,0.3)',
        }}
        className="relative w-[92%] sm:w-full max-w-[420px] rounded-[20px] border border-white/25 p-5 my-auto max-h-[92vh] overflow-y-auto text-white shadow-2xl"
      >
        {/* Subtle Ambient Glows in Card Background */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#00D4FF]/20 blur-xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#07182E]/50 blur-xl" />

        {/* Close Button on Top Right Corner */}
        <button
          type="button"
          id="connect-modal-close-btn"
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 border border-white/30 cursor-pointer"
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>

        {submitted ? (
          <div className="py-4 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/20 border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              <CheckCircle2 className="h-7 w-7 text-white" />
            </div>

            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white font-mono text-[11px] font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                RECORDED IN LEAD SHEET
              </span>
              <h3 className="mt-2 font-display text-[18px] font-extrabold text-white">
                Lead Successfully Submitted!
              </h3>
              <p className="mt-1 text-[13px] text-sky-100 max-w-xs mx-auto">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Your details are captured in the Lead Dashboard.
              </p>
            </div>

            {/* Display exact details entered by user */}
            <div className="rounded-[12px] border border-white/20 bg-black/25 p-4 text-left space-y-2 text-[13px] backdrop-blur-md max-w-sm mx-auto">
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-sky-200 font-mono text-[11px]">NAME:</span>
                <span className="font-bold text-white">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-sky-200 font-mono text-[11px]">PHONE:</span>
                <span className="font-mono font-bold text-white">{formData.phone}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-sky-200 font-mono text-[11px]">EMAIL:</span>
                <span className="font-medium text-white truncate max-w-[200px]">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-white/10">
                <span className="text-sky-200 font-mono text-[11px]">SERVICE:</span>
                <span className="rounded bg-[#004E9A]/80 border border-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  {selectedService}
                </span>
              </div>
              {formData.message && (
                <div className="pt-1">
                  <span className="text-sky-200 font-mono text-[11px] block mb-1">PROJECT DETAILS:</span>
                  <p className="text-[12px] text-sky-100 bg-black/30 rounded-lg p-2.5 border border-white/10 leading-relaxed italic">
                    "{formData.message}"
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Button */}
            <div className="pt-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  window.history.pushState(null, '', '/lead');
                  window.dispatchEvent(new Event('gw_route_change'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full h-[50px] inline-flex items-center justify-center gap-2 rounded-[12px] px-4 text-[15px] font-bold text-[#004E9A] bg-white hover:bg-sky-50 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>View in Dashboard (/lead)</span>
                <ArrowRight className="h-4 w-4 text-[#004E9A]" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Title & Eyebrow */}
            <div className="pr-10">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CLIENT INQUIRY · GODAVARI WAVE
                </span>
              </div>
              <h3 className="font-display text-[18px] font-extrabold text-white tracking-tight leading-snug">
                Start your digital journey with us
              </h3>
            </div>

            {/* Form with 16px field gap */}
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
              {/* Service Pills */}
              <div>
                <label className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-2">
                  I'm interested in
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        handleUserInteraction();
                        setSelectedService(s);
                      }}
                      className={`rounded-[10px] px-3 py-1.5 text-[13px] font-semibold transition-all cursor-pointer border ${selectedService === s
                        ? 'bg-white text-[#004E9A] border-white shadow-sm font-bold'
                        : 'bg-[#0B1F3A]/60 text-sky-100 border-white/20 hover:bg-[#0B1F3A]/90'
                        }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Field */}
              <div>
                <label
                  htmlFor="connect-name"
                  className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-1.5"
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
                  className="w-full h-[48px] rounded-[12px] bg-white text-slate-900 font-medium placeholder-slate-400 placeholder:text-[13px] px-3.5 text-[14px] border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 shadow-sm transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="connect-email"
                  className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-1.5"
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
                  className="w-full h-[48px] rounded-[12px] bg-white text-slate-900 font-medium placeholder-slate-400 placeholder:text-[13px] px-3.5 text-[14px] border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 shadow-sm transition-all"
                />
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="connect-phone"
                    className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-1.5"
                  >
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    id="connect-phone"
                    required
                    type="tel"
                    placeholder="+91 77998 22121"
                    value={formData.phone}
                    onFocus={handleUserInteraction}
                    onChange={(e) => {
                      handleUserInteraction();
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    className="w-full h-[48px] rounded-[12px] bg-white text-slate-900 font-medium placeholder-slate-400 placeholder:text-[13px] px-3.5 text-[14px] border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="connect-company"
                    className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-1.5"
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
                    className="w-full h-[48px] rounded-[12px] bg-white text-slate-900 font-medium placeholder-slate-400 placeholder:text-[13px] px-3.5 text-[14px] border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label
                  htmlFor="connect-message"
                  className="block text-[14px] font-semibold text-white uppercase tracking-wider mb-1.5"
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
                  className="w-full rounded-[12px] bg-white text-slate-900 font-medium placeholder-slate-400 placeholder:text-[13px] p-3.5 text-[14px] border border-white/20 focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 shadow-sm transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Action Button: Full-width Submit button (Height 50px, Rounded 12px, 15px Font) */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[50px] relative group inline-flex items-center justify-center gap-2 rounded-[12px] px-5 text-[15px] font-bold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#0052A3] hover:to-[#0066CC] shadow-[0_5px_15px_rgba(0,102,204,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Submit to Lead Sheet</span>
                  <Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>

            {/* Contact Card: Separate white glass card with 12px corners, 16px padding, 14px item gap, stacked layout on mobile */}
            <div
              style={{
                borderRadius: '12px',
                padding: '16px',
              }}
              className="mt-5 rounded-[12px] p-4 bg-white/10 backdrop-blur-md border border-white/20 shadow-md flex flex-col gap-[14px]"
            >
              {/* Phone Item */}
              <a
                href="tel:+917799822121"
                className="flex items-center gap-3 group text-left transition-transform hover:translate-x-0.5"
              >
                {/* White icon inside blue circle */}
                <div className="h-10 w-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/20 group-hover:bg-[#00D4FF] group-hover:text-[#004E9A] transition-colors">
                  <Phone className="h-4 w-4 text-white group-hover:text-[#004E9A]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-sky-200 font-medium tracking-wide">
                    Call Us
                  </span>
                  <span className="font-mono font-bold text-[15px] text-white whitespace-nowrap leading-tight">
                    +91 77998 22121
                  </span>
                </div>
              </a>

              {/* Email Item */}
              <a
                href="mailto:hrhydgodavariwavetech@gmail.com"
                className="flex items-center gap-3 group text-left transition-transform hover:translate-x-0.5"
              >
                {/* White icon inside blue circle */}
                <div className="h-10 w-10 rounded-full bg-[#0066CC] text-white flex items-center justify-center shrink-0 shadow-sm border border-white/20 group-hover:bg-[#00D4FF] group-hover:text-[#004E9A] transition-colors">
                  <Mail className="h-4 w-4 text-white group-hover:text-[#004E9A]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs text-sky-200 font-medium tracking-wide">
                    Email Us
                  </span>
                  <span className="font-medium text-[14px] sm:text-[15px] text-white break-all sm:break-normal leading-tight">
                    hrhydgodavariwavetech@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
