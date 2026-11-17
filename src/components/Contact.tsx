import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Clock,
  Send,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { offices, companyInfo } from '../data/companyData';
import { saveLead } from '../utils/leadStorage';

export default function Contact() {
  // Default to Rajahmundry HQ (index 0) matching the reference screenshot
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const currentOffice = offices[selectedOffice];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Save lead into HR Lead Sheet storage
    try {
      saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: 'Direct Client Inquiry',
        message: formData.message,
        source: 'Contact Form',
        status: 'New',
        priority: 'High',
      });
    } catch (err) {
      console.error('Lead save error:', err);
    }

    window.location.href = `mailto:${companyInfo.emails.info}?subject=Project%20Inquiry%20from%20${encodeURIComponent(
      formData.name
    )}&body=Name:%20${encodeURIComponent(formData.name)}%0D%0AEmail:%20${encodeURIComponent(
      formData.email
    )}%0D%0APhone:%20${encodeURIComponent(formData.phone)}%0D%0A%0D%0AProject:%0D%0A${encodeURIComponent(
      formData.message
    )}`;
  };

  return (
    <section id="contact" className="relative scroll-mt-20 px-6 pt-16 pb-24 md:pt-20 md:pb-32 bg-[#0B1F3A]">
      <div className="mx-auto max-w-6xl">
        {/* Section Header: Left-aligned matching the screenshot */}
        <motion.div
          className="mb-8 sm:mb-10 text-left"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow: Single horizontal line + "LET'S START" with font size 18px, moved upwards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3.5 mb-3.5"
          >
            <span className="h-[2px] w-12 bg-[#38BDF8] rounded-full shrink-0" style={{ backgroundColor: '#38BDF8' }} />
            <span
              className="font-mono font-bold tracking-[0.25em] uppercase text-[18px] leading-none"
              style={{ color: '#38BDF8', fontSize: '18px' }}
            >
              LET'S START
            </span>
          </motion.div>

          {/* Main 2-Line Heading: Arial Black font, shifted upwards */}
          <h2
            className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] xl:text-[6rem] font-black tracking-tight text-white leading-[1.08] sm:leading-[1.02] break-words"
            style={{ fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Tell us where you want
            </motion.span>
            <motion.span
              className="block mt-0.5 sm:mt-1"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              to flow.
            </motion.span>
          </h2>
        </motion.div>

        {/* Main 2-Column Grid: Left (Map + Office Card) and Right (Send Us a Message Form Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ========================================================= */}
          {/* LEFT COLUMN: Map Card (Top) + Head Office Info Card (Bottom) */}
          {/* ========================================================= */}
          <div className="flex flex-col gap-6 justify-between">

            {/* 1. Vector Map Card */}
            <motion.div
              className="relative aspect-[4/3] min-h-[280px] sm:min-h-[340px] rounded-2xl sm:rounded-3xl bg-[#0F2442] border-white/10 border p-4 sm:p-6 overflow-hidden flex items-center justify-center shadow-2xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* SVG Vector Graphic of State Territory & Connected Routes */}
              <svg
                viewBox="0 0 100 85"
                className="absolute inset-0 h-full w-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  {/* Subtle matrix dots pattern */}
                  <pattern
                    id="lovable-map-dots"
                    width="2.6"
                    height="2.6"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.3" cy="1.3" r="0.22" fill="#38BDF8" fillOpacity="0.28" />
                  </pattern>

                  {/* Territory gradient */}
                  <linearGradient id="territory-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0B1F3A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#071527" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* State outline (Telangana & Andhra Pradesh territory) */}
                <path
                  d="M 12 20 C 24 10, 52 14, 76 18 L 92 28 C 84 42, 78 52, 72 64 C 60 74, 42 78, 28 72 C 16 62, 10 42, 12 20 Z"
                  fill="url(#territory-grad)"
                  stroke="#004E9A"
                  strokeWidth="0.45"
                />
                <path
                  d="M 12 20 C 24 10, 52 14, 76 18 L 92 28 C 84 42, 78 52, 72 64 C 60 74, 42 78, 28 72 C 16 62, 10 42, 12 20 Z"
                  fill="url(#lovable-map-dots)"
                />

                {/* Diagonal Teal Dashed Corridor/River Line */}
                <g>
                  <path
                    d="M 14 24 L 84 68"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="0.7"
                    strokeDasharray="1.8 2.5"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  <circle r="0.8" fill="#38BDF8" opacity="0.9">
                    <animateMotion path="M 14 24 L 84 68" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* ORANGE DOTTED ARCS FLOWING OUTWARD FROM RAJAHMUNDRY HQ TO ALL OTHER BRANCHES */}
                {/* 1. Rajahmundry (60, 44) -> Hyderabad (28, 28) */}
                <g>
                  <path
                    d="M 60 44 Q 44 26, 28 28"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="0.8"
                    strokeDasharray="1.8 2.2"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  <circle r="0.85" fill="#00D4FF" opacity="0.95">
                    <animateMotion path="M 60 44 Q 44 26, 28 28" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* 2. Rajahmundry (60, 44) -> Visakhapatnam (78, 26) */}
                <g>
                  <path
                    d="M 60 44 Q 70 32, 78 26"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="0.8"
                    strokeDasharray="1.8 2.2"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  <circle r="0.85" fill="#00D4FF" opacity="0.95">
                    <animateMotion path="M 60 44 Q 70 32, 78 26" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* 3. Rajahmundry (60, 44) -> Vijayawada (50, 56) */}
                <g>
                  <path
                    d="M 60 44 Q 56 50, 50 56"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="0.8"
                    strokeDasharray="1.8 2.2"
                    strokeOpacity="0.75"
                    strokeLinecap="round"
                  />
                  <circle r="0.85" fill="#00D4FF" opacity="0.95">
                    <animateMotion path="M 60 44 Q 56 50, 50 56" dur="2.2s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>

              {/* INTERACTIVE PINS ON MAP */}

              {/* 1. HYDERABAD PIN (Featured Office being highlighted) */}
              <button
                type="button"
                onClick={() => setSelectedOffice(0)}
                data-cursor="true"
                style={{ left: '28%', top: '28%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-30 focus:outline-none cursor-pointer flex flex-col items-center"
                aria-label="Select Hyderabad office"
              >
                {/* Radiant Pulse Rings Highlighting Hyderabad */}
                <span className="absolute -inset-3 rounded-full bg-[#38BDF8]/40 animate-ping pointer-events-none" />
                <span className="absolute -inset-1.5 rounded-full bg-[#38BDF8]/60 animate-pulse pointer-events-none" />

                {/* Glowing turquoise node */}
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#00D4FF] border-2 border-white shadow-[0_0_18px_#38BDF8] transition-transform group-hover:scale-125">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#081018]" />
                </span>

                {/* White Capsule Badge Highlighting Hyderabad */}
                <span className="mt-1.5 whitespace-nowrap rounded-full bg-white px-3 py-0.5 text-[11px] font-bold text-white shadow-xl border border-white">
                  Hyderabad
                </span>
              </button>

              {/* 2. RAJAHMUNDRY · HQ (Global Headquarters) */}
              <button
                type="button"
                onClick={() => setSelectedOffice(1)}
                data-cursor="true"
                style={{ left: '60%', top: '44%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none cursor-pointer flex flex-col items-center"
                aria-label="Select Rajahmundry Head Office"
              >
                {/* Amber node for HQ */}
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 border border-white shadow-[0_0_12px_#f97316] transition-transform group-hover:scale-125">
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>
                <span className="mt-1.5 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-amber-500/30 px-2.5 py-0.5 text-[10.5px] font-medium text-amber-200 shadow-md">
                  Rajahmundry · HQ
                </span>
              </button>

              {/* 3. VISAKHAPATNAM PIN (Top Right) */}
              <button
                type="button"
                onClick={() => setSelectedOffice(2)}
                data-cursor="true"
                style={{ left: '78%', top: '26%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none cursor-pointer flex flex-col items-center"
                aria-label="Select Visakhapatnam office"
              >
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#38BDF8] border border-white shadow-[0_0_10px_#38BDF8] transition-transform group-hover:scale-125">
                  <span className="h-1 w-1 rounded-full bg-[#081018]" />
                </span>
                <span className="mt-1.5 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-white/10 px-2.5 py-0.5 text-[10.5px] font-medium text-slate-200 shadow-md">
                  Visakhapatnam
                </span>
              </button>

              {/* 4. VIJAYAWADA PIN (Bottom) */}
              <button
                type="button"
                onClick={() => setSelectedOffice(3)}
                data-cursor="true"
                style={{ left: '50%', top: '56%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none cursor-pointer flex flex-col items-center"
                aria-label="Select Vijayawada office"
              >
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-[#38BDF8] border border-white shadow-[0_0_10px_#38BDF8] transition-transform group-hover:scale-125">
                  <span className="h-1 w-1 rounded-full bg-[#081018]" />
                </span>
                <span className="mt-1.5 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-white/10 px-2.5 py-0.5 text-[10.5px] font-medium text-slate-200 shadow-md">
                  Vijayawada
                </span>
              </button>
            </motion.div>

            {/* 2. Office Information Card (Matches Screenshot Bottom Card) */}
            <motion.div
              className="rounded-xl sm:rounded-2xl bg-[#0F2442] border-white/10 border p-5 sm:p-7 shadow-2xl flex flex-col justify-between m-40"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffice.city}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Eyebrow Label: Shows Hyderabad Office by default */}
                  <span className="text-[11px] font-mono tracking-widest text-[#38BDF8] uppercase font-semibold">
                    {currentOffice.city === 'Hyderabad'
                      ? 'HYDERABAD OFFICE'
                      : currentOffice.hq
                        ? 'GLOBAL HEADQUARTERS'
                        : 'REGIONAL BRANCH'}
                  </span>

                  {/* Office City Title */}
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    {currentOffice.city}
                  </h3>

                  {/* Location & Phone */}
                  <div className="mt-3.5 space-y-2 text-sm text-slate-400">
                    <div className="flex items-start gap-2.5 leading-relaxed">
                      <MapPin className="h-4 w-4 text-[#38BDF8] shrink-0 mt-0.5" />
                      <span>{currentOffice.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="h-4 w-4 text-[#38BDF8] shrink-0" />
                      <span>{currentOffice.phone}</span>
                    </div>
                  </div>

                  {/* Open in Maps Link */}
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={currentOffice.map}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="true"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#38BDF8] hover:text-[#00D4FF] transition-colors cursor-pointer"
                    >
                      <span>Open in Maps</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>

                    {/* Quick reset pill if another office is clicked */}
                    {selectedOffice !== 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedOffice(0)}
                        className="text-xs text-[#38BDF8] hover:text-white transition-colors cursor-pointer font-mono"
                      >
                        ← View Hyderabad Office
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: "Send us a message" Full Height Form Card */}
          {/* ========================================================= */}
          <motion.div
            className="rounded-2xl sm:rounded-3xl bg-[#0F2442] border-white/10 border p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              {/* Header Title & Subtitle */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Send us a message
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-400">
                We'll promptly discuss your project with you.
              </p>

              {submitted ? (
                <div className="py-12 sm:py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40">
                    <CheckCircle2 className="h-8 w-8 text-[#38BDF8]" />
                  </div>
                  <h4 className="mt-4 font-display text-xl font-bold text-white">
                    Message Sent!
                  </h4>
                  <p className="mt-1.5 text-sm text-slate-400 max-w-sm mx-auto">
                    Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] shadow-[0_0_20px_rgba(32,178,170,0.35)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Send another message</span>
                  </button>
                </div>
              ) : (
                /* Form with Minimal Clean Underline Inputs matching the screenshot */
                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-6 sm:space-y-7">
                  {/* Row 1: FULL NAME & EMAIL (2 Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
                      >
                        FULL NAME
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-slate-700/80 pb-2 text-base sm:text-sm text-white placeholder-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
                      >
                        EMAIL
                      </label>
                      <input
                        id="email"
                        name="email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-slate-700/80 pb-2 text-base sm:text-sm text-white placeholder-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: PHONE (Full Width) */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    >
                      PHONE
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-700/80 pb-2 text-base sm:text-sm text-white placeholder-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Row 3: YOUR PROJECT (Full Width Textarea) */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-slate-400 uppercase tracking-wider"
                    >
                      YOUR PROJECT
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-700/80 pb-2 text-base sm:text-sm text-white placeholder-slate-600 focus:border-[#38BDF8] focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      data-cursor="true"
                      className="w-full sm:w-auto relative group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] shadow-[0_0_24px_rgba(0,102,204,0.4)] hover:shadow-[0_0_32px_rgba(0,212,255,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Send request</span>
                      <Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Contact Details Grid (2x2 Layout matching screenshot) */}
            <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs text-slate-400">
              <a
                href={`tel:${companyInfo.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                <span>{companyInfo.phones[0]}</span>
              </a>

              <a
                href={`mailto:${companyInfo.emails.info}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                <span className="break-all sm:break-normal">{companyInfo.emails.info}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                <span>{companyInfo.hours}</span>
              </div>

              <a
                href={`mailto:${companyInfo.emails.hr}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#38BDF8] shrink-0" />
                <span className="break-all sm:break-normal"> {companyInfo.emails.hr}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
