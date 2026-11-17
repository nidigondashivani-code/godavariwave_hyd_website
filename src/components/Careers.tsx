import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  UserCheck,
  ChevronRight,
  X,
  Building2,
  TrendingUp,
  Award,
  Users,
  Share2,
  ExternalLink
} from 'lucide-react';
import { careersPositions, hrContact, CareerPosition } from '../data/companyData';
import { saveApplication } from '../utils/recruitmentStorage';

type CategoryFilter = 'All' | 'Software' | 'Marketing' | 'Social Media' | 'Sales' | 'HR';
type LevelFilter = 'All' | 'Fresher' | 'Experienced';

export default function Careers() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('All');
  const [activeModalJob, setActiveModalJob] = useState<CareerPosition | null>(null);

  // Online application form state
  const [applicantData, setApplicantData] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLocation: 'Hyderabad',
    qualification: 'B.Tech / B.E (Computer Science / IT)',
    experienceLevel: 'Fresher' as 'Fresher' | 'Experienced',
    experienceYears: '0 - 1 Years',
    currentCompany: '',
    currentSalary: '',
    expectedSalary: '₹4.5 LPA - ₹6.5 LPA',
    noticePeriod: 'Immediate Joiner',
    skills: 'React, TypeScript, Node.js, Tailwind CSS',
    linkedIn: '',
    portfolio: '',
    github: '',
    resumeLink: '',
    coverLetter: '',
    preferredLocation: 'Hyderabad (Meenakshi Tech Park)',
  });
  const [submittedAppId, setSubmittedAppId] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  // Filtered positions
  const filteredJobs = careersPositions.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || job.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'All', label: 'All Roles' },
    { key: 'Software', label: 'Software' },
    { key: 'Marketing', label: 'Digital Marketing' },
    { key: 'Social Media', label: 'Social Media' },
    { key: 'Sales', label: 'Sales & BD' },
    { key: 'HR', label: 'HR / Talent' },
  ];

  const levels: { key: LevelFilter; label: string }[] = [
    { key: 'All', label: 'All Levels' },
    { key: 'Fresher', label: 'Freshers (0-1 Yrs)' },
    { key: 'Experienced', label: 'Experienced (2+ Yrs)' },
  ];

  const handleOpenApplyModal = (job: CareerPosition) => {
    setActiveModalJob(job);
    setApplicantData((prev) => ({
      ...prev,
      experienceLevel: job.level,
      positionApplying: job.title,
    }));
    setSubmitted(false);
  };

  const handleCloseModal = () => {
    setActiveModalJob(null);
    setSubmitted(false);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();

    const jobTitle = activeModalJob ? `${activeModalJob.title} (${activeModalJob.level})` : 'Software Developer';

    // Record candidate application directly into the Recruitment Management System
    const newApp = saveApplication({
      name: applicantData.fullName,
      email: applicantData.email,
      phone: applicantData.phone,
      position: activeModalJob ? activeModalJob.title : 'Software Developer',
      positionId: activeModalJob ? activeModalJob.id : 'software-dev-fresher',
      resumeName: `${applicantData.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
      resumeUrl: applicantData.resumeLink || '#',
      status: 'New',
      assignedRecruiter: 'Renusri',
      experienceLevel: applicantData.experienceLevel,
      experienceYears: applicantData.experienceYears,
      currentLocation: applicantData.currentLocation,
      qualification: applicantData.qualification,
      currentCompany: applicantData.currentCompany,
      currentSalary: applicantData.currentSalary,
      expectedSalary: applicantData.expectedSalary,
      noticePeriod: applicantData.noticePeriod,
      skills: applicantData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      linkedIn: applicantData.linkedIn,
      portfolio: applicantData.portfolio,
      portfolioLink: applicantData.portfolio || applicantData.resumeLink,
      github: applicantData.github,
      coverNote: applicantData.coverLetter,
      coverLetter: applicantData.coverLetter,
      preferredLocation: applicantData.preferredLocation,
      stage: 'Screening',
      rating: 4.8,
      notes: 'Submitted via Online Careers Application Form',
    });

    setSubmittedAppId(newApp.id);
    setSubmitted(true);
  };

  return (
    <section id="careers" className="relative scroll-mt-20 px-4 sm:px-6 py-20 sm:py-28 md:py-36 bg-[#0B1F3A] overflow-hidden text-foreground">
      {/* Background Decorative Gradient Blobs */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[450px] w-[450px] rounded-full bg-[#0066CC]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[450px] w-[450px] rounded-full bg-[#00D4FF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#004E9A]/30 px-3.5 sm:px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#38BDF8] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D4FF] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D4FF]" />
            </span>
            <span>WE ARE HIRING · HYDERABAD INNOVATION HUB</span>
          </div>

          <h2 className="mt-5 sm:mt-6 font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Build the Next Wave of{' '}
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#00D4FF] to-[#FFFFFF] bg-clip-text text-transparent">
              Digital Intelligence.
            </span>
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-sky-100/80 leading-relaxed max-w-2xl mx-auto">
            Join Godavari Wave Technologies at Meenakshi Tech Park, Gachibowli. We have open roles for freshers and experienced professionals across software engineering, digital marketing, sales, social media, and HR.
          </p>
        </div>

        {/* Dedicated Direct HR Connect Showcase (Renusri) - Centered & Perfectly Symmetrical on Desktop */}
        <div className="mx-auto max-w-5xl mt-10 sm:mt-14 rounded-3xl border border-white/20 bg-gradient-to-b from-[#0e2a4a]/95 via-[#0B1F3A]/95 to-[#061426] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#0066CC]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#00D4FF]/20 blur-3xl" />

          {/* Central Profile Header */}
          <div className="text-center mx-auto max-w-2xl relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-1 text-xs font-mono font-semibold text-emerald-300 uppercase tracking-wider mb-4 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>DIRECT HR DESK · IMMEDIATE APPLICANT REVIEW</span>
            </div>

            {/* Glowing Avatar of Renusri */}
            <div className="relative mb-3.5">
              <div className="grid h-20 w-20 sm:h-24 sm:w-24 place-items-center rounded-3xl bg-gradient-to-tr from-[#0066CC] via-[#004E9A] to-[#00D4FF] text-white shadow-xl shadow-[#0066CC]/40 border-2 border-white/40">
                <UserCheck className="h-10 w-10 sm:h-12 sm:w-12 text-white stroke-[2.2]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#0B1F3A]" />
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-sm">
              Connect Directly with {hrContact.name}
            </h3>
            <p className="mt-1 text-sm sm:text-base font-semibold text-[#38BDF8]">
              {hrContact.role} · Godavari Wave Technologies
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-sky-200/80 max-w-lg leading-relaxed">
              Reach out directly to our hiring desk for instant resume screening, interview scheduling, and application tracking.
            </p>
          </div>

          {/* 3-Column Info Cards Grid: Email, Phone/WhatsApp, Campus */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 relative z-10">
            {/* Card 1: Official HR Email */}
            <a
              href={`mailto:${hrContact.email}?subject=Career%20Inquiry%20-%20Godavari%20Wave%20Technologies`}
              className="group relative rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 p-5 transition-all duration-300 hover:border-[#00D4FF]/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0066CC]/25 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#0066CC]/30 border border-[#0066CC]/50 text-[#00D4FF] mb-2.5 group-hover:scale-110 transition-transform">
                <Mail className="h-5 w-5 text-[#00D4FF]" />
              </div>
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-sky-300 font-bold">
                DIRECT HR EMAIL
              </span>
              <span className="mt-1 text-xs sm:text-sm font-semibold text-white break-all group-hover:text-[#38BDF8] transition-colors">
                {hrContact.email}
              </span>
              <span className="mt-2.5 text-[11px] text-sky-200/70 inline-flex items-center gap-1 group-hover:text-white">
                <span>Send direct email</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Card 2: Phone & WhatsApp */}
            <a
              href={`tel:${hrContact.phoneRaw}`}
              className="group relative rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 p-5 transition-all duration-300 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/25 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 mb-2.5 group-hover:scale-110 transition-transform">
                <Phone className="h-5 w-5 text-emerald-300" />
              </div>
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-emerald-300 font-bold">
                PHONE & WHATSAPP
              </span>
              <span className="mt-1 text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {hrContact.phone}
              </span>
              <span className="mt-2.5 text-[11px] text-sky-200/70 inline-flex items-center gap-1 group-hover:text-white">
                <span>Click to call or message</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Card 3: Hyderabad Campus */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex flex-col items-center text-center">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#004E9A]/40 border border-[#38BDF8]/40 text-[#38BDF8] mb-2.5">
                <MapPin className="h-5 w-5 text-[#38BDF8]" />
              </div>
              <span className="text-[10.5px] font-mono uppercase tracking-widest text-sky-300 font-bold">
                HYDERABAD CAMPUS
              </span>
              <span className="mt-1 text-xs sm:text-sm font-semibold text-white">
                Meenakshi Tech Park, Gachibowli
              </span>
              <span className="mt-2.5 text-[11px] text-sky-200/70">
                Mon – Fri · 9:30 AM – 6:30 PM
              </span>
            </div>
          </div>

          {/* Centered Direct Action Buttons */}
          <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-3 sm:gap-4 relative z-10">
            {/* Email HR Button */}
            <a
              href={`mailto:${hrContact.email}?subject=Career%20Application%20-%20Godavari%20Wave%20Technologies`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#004E9A] hover:to-[#0066CC] px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#0066CC]/35 hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px] w-full sm:w-auto"
            >
              <Mail className="h-4 w-4 text-white" />
              <span>Email HR Directly</span>
            </a>

            {/* WhatsApp HR Button */}
            <a
              href={`${hrContact.whatsappUrl}?text=${encodeURIComponent(
                `Hello ${hrContact.name}, I am interested in exploring job opportunities at Godavari Wave Technologies.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/15 hover:bg-emerald-500/25 px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold text-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px] w-full sm:w-auto"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>WhatsApp Renusri</span>
            </a>

            {/* Call HR Button */}
            <a
              href={`tel:${hrContact.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 px-6 sm:px-8 py-3 text-xs sm:text-sm font-semibold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px] w-full sm:w-auto"
            >
              <Phone className="h-4 w-4 text-[#38BDF8]" />
              <span>Call {hrContact.phoneRaw}</span>
            </a>
          </div>
        </div>

        {/* Filter Navigation Bar (Centered & Symmetrical on Desktop, Touch-Friendly on Mobile) */}
        <div className="mt-12 sm:mt-16 mx-auto max-w-5xl space-y-4">
          {/* Department Category Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-sky-200/70 shrink-0">
              Department:
            </span>
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none flex-nowrap sm:flex-wrap">
              {categories.map((cat) => {
                const count = cat.key === 'All'
                  ? careersPositions.length
                  : careersPositions.filter((p) => p.category === cat.key).length;
                const isSelected = selectedCategory === cat.key;

                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer border shrink-0 ${isSelected
                        ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white border-transparent shadow-md shadow-[#0066CC]/40 scale-105'
                        : 'bg-white/5 text-sky-100/80 border-white/10 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    <span>{cat.label}</span>
                    <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Switcher & Roles Count */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-200/70">
                Experience Level:
              </span>
              <div className="inline-flex rounded-full bg-black/40 p-1 border border-white/15 shadow-inner">
                {levels.map((lvl) => {
                  const isSelected = selectedLevel === lvl.key;
                  return (
                    <button
                      key={lvl.key}
                      type="button"
                      onClick={() => setSelectedLevel(lvl.key)}
                      className={`rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${isSelected
                          ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white shadow-sm font-semibold'
                          : 'text-sky-100/70 hover:text-white'
                        }`}
                    >
                      {lvl.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs text-sky-200 font-mono">
              Showing <span className="font-bold text-[#00D4FF]">{filteredJobs.length}</span> positions
            </div>
          </div>
        </div>

        {/* Job Listings Grid with Generous Outer & Inner Margins on All Sides */}
        <div className="mt-10 sm:mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job) => {
              const isFresher = job.level === 'Fresher';

              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/15 bg-gradient-to-b from-[#0B1F3A]/95 to-[#004E9A]/20 p-6 sm:p-9 md:p-10 backdrop-blur-xl shadow-xl hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_20px_45px_rgba(0,102,204,0.35)]"
                >
                  <div>
                    {/* Header: Level Badge & Openings */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider border ${isFresher
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                              : 'bg-[#0066CC]/30 text-[#38BDF8] border-[#38BDF8]/40'
                            }`}
                        >
                          {job.level}
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-mono text-sky-200/80">
                          {job.category}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00D4FF]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
                        {job.openings} Openings
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="font-display text-xl sm:text-2xl md:text-[1.65rem] font-bold text-white group-hover:text-[#38BDF8] transition-colors tracking-tight">
                      {job.title}
                    </h3>

                    {/* Metadata line: Experience, Location, Type */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-[13px] text-sky-100/70 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-[#38BDF8] shrink-0" />
                        <span>{job.experience}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-[#38BDF8] shrink-0" />
                        <span>Gachibowli, Hyderabad</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-[#38BDF8] shrink-0" />
                        <span>{job.type}</span>
                      </span>
                    </div>

                    {/* Highlight Banner */}
                    <div className="mt-4 sm:mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#00D4FF] flex items-center gap-2.5">
                      <Sparkles className="h-4 w-4 shrink-0 text-[#00D4FF]" />
                      <span className="truncate">{job.highlight}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-sky-100/80 leading-relaxed">
                      {job.description}
                    </p>

                    {/* Skills Chips */}
                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                      {job.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="rounded-xl bg-[#004E9A]/30 border border-white/10 px-3 py-1.5 text-xs font-mono text-sky-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Buttons with Increased Margins */}
                  <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={() => handleOpenApplyModal(job)}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#004E9A] hover:to-[#0066CC] px-6 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-[#0066CC]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px]"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4 text-white" />
                    </button>

                    <a
                      href={`${hrContact.whatsappUrl}?text=${encodeURIComponent(
                        `Hi ${hrContact.name}, I am applying for the position of "${job.title} (${job.level})" at Godavari Wave Technologies.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-emerald-300 hover:scale-105 active:scale-95 transition-all cursor-pointer min-h-[46px]"
                      title="Quick Inquiry on WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                      <span>WhatsApp HR</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Help Desk Bar */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-6 text-center backdrop-blur-md">
          <p className="text-xs sm:text-sm text-sky-100 font-medium">
            Don't see your specific role? Send your resume directly to{' '}
            <a
              href={`mailto:${hrContact.email}?subject=General%20Application%20-%20Godavari%20Wave%20Technologies`}
              className="font-bold text-[#00D4FF] hover:underline"
            >
              {hrContact.email}
            </a>{' '}
            or call Renusri at{' '}
            <a href={`tel:${hrContact.phoneRaw}`} className="font-bold text-[#38BDF8] hover:underline">
              {hrContact.phone}
            </a>
            . We are always hiring talented freshers and experienced minds!
          </p>
        </div>
      </div>

      {/* Quick Application Modal (Mobile-Optimized) */}
      <AnimatePresence>
        {activeModalJob && (
          <div className="fixed inset-0 z-[2147483600] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl border border-white/20 p-5 sm:p-8 my-auto max-h-[90dvh] overflow-y-auto text-white shadow-2xl z-10"
              style={{
                background: 'linear-gradient(145deg, #004E9A 0%, #0066CC 55%, #38BDF8 100%)',
                backgroundColor: '#07182c',
                boxShadow: '0 25px 70px rgba(11,31,58,0.95), 0 0 50px rgba(0,212,255,0.4)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="group absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 hover:bg-red-500 active:scale-90 border border-white/40 text-white transition-all cursor-pointer shadow-lg select-none"
                aria-label="Close application form"
              >
                <X className="h-5 w-5 stroke-[2.5]" />
              </button>

              {submitted ? (
                <div className="py-8 sm:py-10 text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                    <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[11px] font-bold tracking-wider uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      RECORDED IN RECRUITMENT DESK
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-bold text-white">
                      Application Submitted Successfully!
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-sky-100 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="font-semibold text-white">{applicantData.fullName}</span>. Your application for{' '}
                      <span className="font-semibold text-white">{activeModalJob.title}</span> has been logged directly into the Godavari Wave Lead & Recruitment Dashboard.
                    </p>
                  </div>

                  {/* Submission Summary Card */}
                  <div className="rounded-2xl border border-white/20 bg-black/30 p-4 text-left space-y-2 text-xs backdrop-blur-md max-w-md mx-auto">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-sky-300 font-mono text-[11px]">APPLICATION ID:</span>
                      <span className="font-mono font-bold text-[#00D4FF]">{submittedAppId || 'APP-RECORDED'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-sky-300 font-mono text-[11px]">POSITION:</span>
                      <span className="font-semibold text-white">{activeModalJob.title}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-sky-300 font-mono text-[11px]">CANDIDATE:</span>
                      <span className="font-medium text-white">{applicantData.fullName} ({applicantData.phone})</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-sky-300 font-mono text-[11px]">LOCATION:</span>
                      <span className="font-medium text-white">{applicantData.currentLocation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sky-300 font-mono text-[11px]">RECRUITER DESK:</span>
                      <span className="font-bold text-emerald-400">Renusri · Talent Operations</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] shadow-[0_0_20px_rgba(0,212,255,0.4)] hover:scale-105 transition-all cursor-pointer"
                    >
                      <span>Done & Explore More Roles</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 border border-white/30 text-white font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
                      ONLINE CAREERS APPLICATION
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-sm pr-10">
                    Apply for {activeModalJob.title}
                  </h3>
                  <p className="mt-1 text-xs text-sky-100 font-medium">
                    {activeModalJob.level} · {activeModalJob.location} · {activeModalJob.openings} Openings
                  </p>

                  <form onSubmit={handleSubmitApplication} className="mt-5 space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          FULL NAME *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your Full Name"
                          value={applicantData.fullName}
                          onChange={(e) => setApplicantData({ ...applicantData, fullName: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          PHONE / WHATSAPP *
                        </label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={applicantData.phone}
                          onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Email & Current Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="yourname@gmail.com"
                          value={applicantData.email}
                          onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          CURRENT LOCATION *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Hyderabad, Vizag, Bangalore..."
                          value={applicantData.currentLocation}
                          onChange={(e) => setApplicantData({ ...applicantData, currentLocation: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Qualification & Experience Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          QUALIFICATION *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="B.Tech, MCA, Degree..."
                          value={applicantData.qualification}
                          onChange={(e) => setApplicantData({ ...applicantData, qualification: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          EXPERIENCE LEVEL
                        </label>
                        <select
                          value={applicantData.experienceLevel}
                          onChange={(e) => setApplicantData({ ...applicantData, experienceLevel: e.target.value as any })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        >
                          <option value="Fresher">Fresher (0 - 1 Yrs)</option>
                          <option value="Experienced">Experienced (1+ Yrs)</option>
                        </select>
                      </div>
                    </div>

                    {/* Current Company, Current Salary, Expected Salary & Notice Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          CURRENT COMPANY
                        </label>
                        <input
                          type="text"
                          placeholder="Current Employer (or Fresher)"
                          value={applicantData.currentCompany}
                          onChange={(e) => setApplicantData({ ...applicantData, currentCompany: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          NOTICE PERIOD
                        </label>
                        <select
                          value={applicantData.noticePeriod}
                          onChange={(e) => setApplicantData({ ...applicantData, noticePeriod: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        >
                          <option value="Immediate Joiner">Immediate Joiner</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60+ Days">60+ Days</option>
                        </select>
                      </div>
                    </div>

                    {/* Current CTC & Expected CTC */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          CURRENT SALARY (CTC)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹4.5 LPA (or NA for fresher)"
                          value={applicantData.currentSalary}
                          onChange={(e) => setApplicantData({ ...applicantData, currentSalary: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                          EXPECTED SALARY (CTC) *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. ₹6.0 LPA"
                          value={applicantData.expectedSalary}
                          onChange={(e) => setApplicantData({ ...applicantData, expectedSalary: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Technical Skills */}
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                        KEY TECHNICAL SKILLS *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="React, TypeScript, Node.js, Python, Tailwind, AWS..."
                        value={applicantData.skills}
                        onChange={(e) => setApplicantData({ ...applicantData, skills: e.target.value })}
                        className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                      />
                    </div>

                    {/* Links: LinkedIn, GitHub & Portfolio */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider">
                          LINKEDIN PROFILE
                        </label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/in/..."
                          value={applicantData.linkedIn}
                          onChange={(e) => setApplicantData({ ...applicantData, linkedIn: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-2 text-xs border-2 border-transparent focus:border-[#00D4FF] focus:outline-none shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider">
                          GITHUB REPOSITORY
                        </label>
                        <input
                          type="url"
                          placeholder="https://github.com/..."
                          value={applicantData.github}
                          onChange={(e) => setApplicantData({ ...applicantData, github: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-2 text-xs border-2 border-transparent focus:border-[#00D4FF] focus:outline-none shadow-sm transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-white uppercase tracking-wider">
                          PORTFOLIO / LIVE APP
                        </label>
                        <input
                          type="url"
                          placeholder="https://myportfolio.com"
                          value={applicantData.portfolio}
                          onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                          className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3 py-2 text-xs border-2 border-transparent focus:border-[#00D4FF] focus:outline-none shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    {/* Resume Upload / Link */}
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                        RESUME UPLOAD / DRIVE LINK *
                      </label>
                      <input
                        required
                        type="url"
                        placeholder="Google Drive, Dropbox, or public resume URL..."
                        value={applicantData.resumeLink}
                        onChange={(e) => setApplicantData({ ...applicantData, resumeLink: e.target.value })}
                        className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2.5 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all"
                      />
                    </div>

                    {/* Cover Letter */}
                    <div className="space-y-1">
                      <label className="block text-[10.5px] font-bold text-white uppercase tracking-wider">
                        COVER LETTER / WHY GODAVARI WAVE?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Share your technical interests, notable achievements, or reasons for applying..."
                        value={applicantData.coverLetter}
                        onChange={(e) => setApplicantData({ ...applicantData, coverLetter: e.target.value })}
                        className="w-full rounded-xl bg-white text-slate-900 font-medium placeholder-slate-400 px-3.5 py-2 text-base sm:text-sm border-2 border-transparent focus:border-[#00D4FF] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 shadow-sm transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="submit"
                        className="relative group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#0066CC] to-[#00D4FF] hover:from-[#004E9A] hover:to-[#0066CC] shadow-[0_10px_25px_rgba(0,102,204,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex-1"
                      >
                        <span>Submit Online Application</span>
                        <Send className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="rounded-full px-5 py-3.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 border border-white/30 transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="mt-3 pt-2 border-t border-white/15 text-center text-[11px] text-sky-100 font-medium flex items-center justify-center gap-2">
                      <Phone className="h-3 w-3 text-white" />
                      <span>Direct HR Line: +91 7799 822 121 · Renusri (Meenakshi Tech Park, Gachibowli)</span>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
