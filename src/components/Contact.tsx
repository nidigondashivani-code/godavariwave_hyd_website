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
  Building2,
  User,
  MessageSquare,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import { offices, companyInfo } from '../data/companyData';
import { saveLead } from '../utils/leadStorage';

export default function Contact() {
  // Default to Hyderabad Innovation Hub (index 0)
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const currentOffice = offices[selectedOffice] || offices[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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

    // Micro-delay for smooth loading animation feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  // 4 Quick Contact Cards strictly populated with existing website data
  const contactCards = [
    {
      icon: MapPin,
      title: 'Office Location',
      label: 'Hyderabad Hub',
      value: 'Meenakshi Tech Park',
      detail: 'Gachibowli, Hyderabad, Telangana 500032',
      link: '#hyderabad-office',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      label: 'Direct Line',
      value: companyInfo.phones[0],
      detail: companyInfo.hours,
      link: `tel:${companyInfo.phones[0].replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Primary Inquiries',
      label: 'Email Support',
      value: companyInfo.emails.info,
      detail: `Careers: ${companyInfo.emails.hr}`,
      link: `mailto:${companyInfo.emails.info}`,
    },
    {
      icon: Clock,
      title: 'Business Hours',
      label: 'Operating Times',
      value: companyInfo.hours,
      detail: 'Engineering and client consultation team',
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 lg:scroll-mt-36 w-full max-w-full overflow-hidden bg-[#0A192F] pt-[60px] sm:pt-[80px] md:pt-[120px] pb-[60px] sm:pb-[80px] md:pb-[120px] mb-[120px]"
    >
      {/* Top Subtle Vignette for Seamless Section Transition */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-background to-transparent z-10" />

      {/* Subtle Background Blue Glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#0066CC]/20 via-[#00D4FF]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-0 h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-[#0066CC]/15 via-[#38BDF8]/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Maximum Width 1440px Container with 48px Padding */}
      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 md:px-[48px] w-full z-20">
        
        {/* ========================================================= */}
        {/* SECTION HEADING (Preserving existing website content)      */}
        {/* ========================================================= */}
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow: Small Label CONTACT US (12px space to heading) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3.5 mb-3"
          >
            <span className="h-[2px] w-12 bg-[#38BDF8] rounded-full shrink-0" />
            <span className="font-mono text-[14px] font-semibold tracking-[2px] uppercase text-[#38BDF8] leading-none">
              CONTACT US
            </span>
          </motion.div>

          {/* Large Heading: Existing Website Content (48–56px, 700–800 font weight) */}
          <h2
            className="text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] font-black tracking-tight text-white leading-[1.08] break-words mt-3"
            style={{ fontFamily: '"Arial Black", "Arial Bold", Gadget, sans-serif' }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Tell us where you want
            </motion.span>
            <motion.span
              className="block mt-0.5 sm:mt-1"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              to flow.
            </motion.span>
          </h2>

          {/* Decorative Accent Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="mt-4 sm:mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#38BDF8] to-[#0066CC] shadow-[0_0_12px_rgba(0,212,255,0.5)] origin-left"
          />

          {/* Description: Existing Website Content (max 700px, 18px text, 20px spacing from heading) */}
          <motion.p
            className="text-[16px] sm:text-[18px] text-slate-300 max-w-[700px] leading-relaxed mt-5"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Have a project in mind or want to explore digital transformation? Reach our engineering and consulting team directly.
          </motion.p>
        </motion.div>

        {/* ========================================================= */}
        {/* TWO-COLUMN LAYOUT: Left (45%) & Right (55%)               */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-stretch w-full">

          {/* ------------------------------------------------------- */}
          {/* LEFT SIDE (45%): Quick Contact Cards, Map & Office Card */}
          {/* ------------------------------------------------------- */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between space-y-5">
            
            {/* 1. Quick Contact Information Cards (2x2 Grid, 20px spacing) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {contactCards.map((card, idx) => {
                const IconComponent = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-[16px] p-6 shadow-md hover:shadow-xl border border-slate-100 hover:border-[#0066CC]/30 transition-all duration-300 flex flex-col justify-between group cursor-default"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        {/* Blue circular icon background, white icon, rotate & scale on hover */}
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00D4FF] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0066CC]/20 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          {card.label}
                        </span>
                      </div>
                      <h4 className="text-[18px] font-bold text-slate-900 group-hover:text-[#0066CC] transition-colors">
                        {card.title}
                      </h4>
                      {card.link ? (
                        <a
                          href={card.link}
                          className="mt-1 block text-[15px] sm:text-[16px] font-semibold text-slate-800 hover:text-[#0066CC] transition-colors truncate"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-[15px] sm:text-[16px] font-semibold text-slate-800">
                          {card.value}
                        </p>
                      )}
                    </div>
                    <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                      {card.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* 2. Interactive Route Vector Map (24px spacing above Office Card) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-[180px] sm:h-[200px] rounded-[16px] overflow-hidden bg-[#0F2442] border border-white/10 shadow-md flex items-center justify-center mb-1"
            >
              <svg
                viewBox="0 0 100 85"
                className="absolute inset-0 h-full w-full pointer-events-none"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="contact-map-dots-pattern"
                    width="2.6"
                    height="2.6"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.3" cy="1.3" r="0.22" fill="#38BDF8" fillOpacity="0.28" />
                  </pattern>
                  <radialGradient id="map-hub-glow-effect" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="100" height="85" fill="#0E223D" />
                <rect width="100" height="85" fill="url(#contact-map-dots-pattern)" />

                <path
                  d="M 18 18 Q 28 8, 48 10 Q 72 12, 86 24 Q 92 42, 78 58 Q 62 74, 46 76 Q 26 78, 14 62 Q 8 40, 18 18 Z"
                  fill="#0066CC"
                  fillOpacity="0.12"
                  stroke="#38BDF8"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />

                <circle cx="28" cy="28" r="14" fill="url(#map-hub-glow-effect)" />

                <path
                  d="M 28 28 Q 42 32, 60 44"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.75"
                  strokeDasharray="1.5,1.5"
                />
                <path
                  d="M 60 44 Q 68 34, 78 26"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.75"
                  strokeDasharray="1.5,1.5"
                />
                <path
                  d="M 60 44 Q 56 50, 50 56"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="0.75"
                  strokeDasharray="1.5,1.5"
                />
              </svg>

              {/* Pins with interactive selection */}
              {/* Hyderabad Pin (Featured Hub) */}
              <button
                type="button"
                onClick={() => setSelectedOffice(0)}
                data-cursor="true"
                style={{ left: '28%', top: '28%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center"
                aria-label="Select Hyderabad office"
              >
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-[#0066CC] to-[#00D4FF] border border-white shadow-[0_0_12px_#38BDF8] transition-transform group-hover:scale-125">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <span className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9.5px] font-bold text-[#0A2540] shadow-md border border-white/80">
                  Hyderabad · Hub
                </span>
              </button>

              {/* Rajahmundry HQ Pin */}
              <button
                type="button"
                onClick={() => setSelectedOffice(1)}
                data-cursor="true"
                style={{ left: '60%', top: '44%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center"
                aria-label="Select Rajahmundry head office"
              >
                <span className="relative flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 border border-white shadow-md transition-transform group-hover:scale-125">
                  <span className="h-1 w-1 rounded-full bg-white" />
                </span>
                <span className="mt-1 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-white/10 px-1.5 py-0.5 text-[9px] font-medium text-amber-200">
                  Rajahmundry HQ
                </span>
              </button>

              {/* Vizag Pin */}
              <button
                type="button"
                onClick={() => setSelectedOffice(2)}
                data-cursor="true"
                style={{ left: '78%', top: '26%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center"
                aria-label="Select Visakhapatnam office"
              >
                <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#38BDF8] border border-white shadow-sm transition-transform group-hover:scale-125" />
                <span className="mt-1 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-white/10 px-1.5 py-0.5 text-[9px] font-medium text-slate-200">
                  Visakhapatnam
                </span>
              </button>

              {/* Vijayawada Pin */}
              <button
                type="button"
                onClick={() => setSelectedOffice(3)}
                data-cursor="true"
                style={{ left: '50%', top: '56%' }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer flex flex-col items-center"
                aria-label="Select Vijayawada office"
              >
                <span className="relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#38BDF8] border border-white shadow-sm transition-transform group-hover:scale-125" />
                <span className="mt-1 whitespace-nowrap rounded-full bg-[#0E1722]/90 border border-white/10 px-1.5 py-0.5 text-[9px] font-medium text-slate-200">
                  Vijayawada
                </span>
              </button>
            </motion.div>

            {/* 3. Primary Card: Hyderabad Office Card (28px internal padding, centered alignment) */}
            <motion.div
              id="hyderabad-office"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[20px] p-7 md:p-[28px] shadow-lg hover:shadow-2xl border border-slate-100 hover:border-[#0066CC]/30 transition-all duration-300 group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentOffice.city}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Card Header: 📍 Office Title + Circular Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0066CC] to-[#00D4FF] text-white shrink-0 shadow-md shadow-[#0066CC]/20 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#0066CC] font-semibold block">
                          {currentOffice.city === 'Hyderabad'
                            ? 'STRATEGIC INNOVATION HUB'
                            : currentOffice.hq
                              ? 'GLOBAL HEADQUARTERS'
                              : 'REGIONAL BRANCH'}
                        </span>
                        <h3 className="text-[20px] sm:text-[22px] font-bold text-slate-900 leading-tight">
                          📍 {currentOffice.city} Office
                        </h3>
                      </div>
                    </div>
                    {selectedOffice !== 0 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedOffice(0)}
                        className="text-xs text-[#0066CC] hover:underline font-mono"
                      >
                        ← Back to Hyd
                      </button>
                    ) : (
                      <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#0066CC]/10 text-[#0066CC] border border-[#0066CC]/20">
                        Primary Office
                      </span>
                    )}
                  </div>

                  {/* Office Details: Moved comfortably inward, nothing touching edges */}
                  <div className="py-5 space-y-4 text-slate-700">
                    {/* Office Address */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066CC]/10 text-[#0066CC] shrink-0 mt-0.5">
                        <MapPin className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Office Address
                        </span>
                        <p className="text-[15px] sm:text-[16px] text-slate-800 leading-relaxed font-medium mt-0.5">
                          {currentOffice.address}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066CC]/10 text-[#0066CC] shrink-0 mt-0.5">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Phone
                        </span>
                        <a
                          href={`tel:${currentOffice.phone.split('·')[0].replace(/\s/g, '')}`}
                          className="text-[15px] sm:text-[16px] text-slate-900 font-semibold hover:text-[#0066CC] transition-colors mt-0.5"
                        >
                          {currentOffice.phone}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066CC]/10 text-[#0066CC] shrink-0 mt-0.5">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Email
                        </span>
                        <a
                          href={`mailto:${companyInfo.emails.info}`}
                          className="text-[15px] sm:text-[16px] text-slate-900 font-semibold hover:text-[#0066CC] transition-colors mt-0.5 break-all"
                        >
                          {companyInfo.emails.info}
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0066CC]/10 text-[#0066CC] shrink-0 mt-0.5">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                          Working Hours
                        </span>
                        <span className="text-[15px] sm:text-[16px] text-slate-800 font-medium mt-0.5">
                          {companyInfo.hours}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Google Maps Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={currentOffice.map}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="true"
                      className="inline-flex items-center justify-center gap-2 w-full h-[48px] rounded-xl bg-gradient-to-r from-[#0066CC]/10 to-[#00D4FF]/10 hover:from-[#0066CC] hover:to-[#00D4FF] text-[#0066CC] hover:text-white font-semibold text-sm transition-all duration-300 border border-[#0066CC]/20 hover:border-transparent shadow-sm hover:shadow-md cursor-pointer group/btn"
                    >
                      <span>Open in Maps</span>
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* RIGHT SIDE (55%): Contact Form (White Card, 32px pad)   */}
          {/* ------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[55%] bg-white rounded-[20px] p-6 sm:p-8 lg:p-[32px] shadow-xl border border-slate-100 flex flex-col justify-between"
          >
            <div>
              {/* Header inside Form (existing website content) */}
              <div className="pb-5 border-b border-slate-100">
                <span className="text-xs font-mono uppercase tracking-widest text-[#0066CC] font-semibold block mb-1">
                  GET IN TOUCH
                </span>
                <h3 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight">
                  Send us a message
                </h3>
                <p className="mt-1 text-sm sm:text-base text-slate-500">
                  We'll promptly discuss your project with you.
                </p>
              </div>

              {submitted ? (
                /* Submission Confirmation */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0066CC]/10 border border-[#0066CC]/30 text-[#0066CC]">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h4 className="mt-5 text-2xl font-bold text-slate-900">
                    Message Sent!
                  </h4>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Our team will review your inquiry and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        message: '',
                      });
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Send another message</span>
                  </button>
                </motion.div>
              ) : (
                /* The Contact Form with 54px inputs, left icons, 160px textarea, 20px gap */
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  {/* Row 1: Full Name & Email Address (20px gap) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[14px] font-semibold text-slate-700 mb-2"
                      >
                        FULL NAME
                      </label>
                      <div className="relative flex items-center group">
                        <User className="absolute left-4 text-slate-400 group-focus-within:text-[#0066CC] transition-colors h-5 w-5 pointer-events-none" />
                        <input
                          id="name"
                          name="name"
                          required
                          type="text"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="h-[54px] w-full rounded-[12px] bg-white border border-slate-200 pl-12 pr-4 text-[15px] sm:text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[14px] font-semibold text-slate-700 mb-2"
                      >
                        EMAIL
                      </label>
                      <div className="relative flex items-center group">
                        <Mail className="absolute left-4 text-slate-400 group-focus-within:text-[#0066CC] transition-colors h-5 w-5 pointer-events-none" />
                        <input
                          id="email"
                          name="email"
                          required
                          type="email"
                          placeholder="yourname@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="h-[54px] w-full rounded-[12px] bg-white border border-slate-200 pl-12 pr-4 text-[15px] sm:text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-none transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone Number (54px height, left icon, 20px gap) */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-[14px] font-semibold text-slate-700 mb-2"
                    >
                      PHONE
                    </label>
                    <div className="relative flex items-center group">
                      <Phone className="absolute left-4 text-slate-400 group-focus-within:text-[#0066CC] transition-colors h-5 w-5 pointer-events-none" />
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-[54px] w-full rounded-[12px] bg-white border border-slate-200 pl-12 pr-4 text-[15px] sm:text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: Your Project Requirements (160px height Textarea, left icon) */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[14px] font-semibold text-slate-700 mb-2"
                    >
                      YOUR PROJECT
                    </label>
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[#0066CC] transition-colors h-5 w-5 pointer-events-none" />
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="h-[160px] min-h-[160px] w-full rounded-[12px] bg-white border border-slate-200 pl-12 pr-4 pt-3.5 text-[15px] sm:text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-none transition-all resize-none leading-relaxed shadow-xs"
                        placeholder="Tell us about your project requirements..."
                      />
                    </div>
                  </div>

                  {/* Submit Button: Full Width, 54px, 14px rounded, Blue gradient, Lift 2px on hover, Loading state */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      data-cursor="true"
                      className="w-full h-[54px] min-h-[54px] rounded-[14px] bg-gradient-to-r from-[#0066CC] via-[#0080FF] to-[#00D4FF] text-white font-semibold text-[16px] shadow-[0_4px_20px_rgba(0,102,204,0.35)] hover:shadow-[0_8px_30px_rgba(0,212,255,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-75 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin text-white" />
                          <span>Sending request...</span>
                        </>
                      ) : (
                        <>
                          <span>Send request</span>
                          <Send className="h-4 w-4 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Note at Bottom of Form Card */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>🔒 100% Privacy. Confidential inquiry.</span>
              <span className="font-mono text-[#0066CC]">Godavari Wave Technologies</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
