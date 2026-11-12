// Recruitment & Career Management Storage Utility for Godavari Wave Technologies
import { careersPositions } from '../data/companyData';

export interface JobOpening {
  id: string;
  title: string;
  category: 'Software' | 'Marketing' | 'Social Media' | 'Sales' | 'HR' | 'Design';
  level: 'Fresher' | 'Experienced';
  location: string;
  type: string;
  openings: number;
  status: 'Published' | 'Draft' | 'Closed' | 'Archived';
  experience: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  perks: string[];
  createdAt: string;
  applicantsCount?: number;
}

export interface JobApplication {
  id: string;
  candidateId: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  positionId?: string;
  resumeUrl?: string;
  resumeName?: string;
  appliedDate: string; // ISO date
  status: 'New' | 'Reviewing' | 'Shortlisted' | 'Interview Scheduled' | 'Offered' | 'Hired' | 'Rejected';
  assignedRecruiter: string;
  experienceLevel: 'Fresher' | 'Experienced';
  experienceYears?: string;
  currentLocation?: string;
  qualification?: string;
  currentCompany?: string;
  currentCTC?: string;
  expectedCTC?: string;
  currentSalary?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  portfolioLink?: string;
  portfolio?: string;
  linkedIn?: string;
  github?: string;
  coverNote?: string;
  coverLetter?: string;
  preferredLocation?: string;
  photo?: string;
  skills?: string[];
  certificates?: string[];
  projects?: Array<{ title: string; desc: string; link?: string }>;
  rating?: number; // 1 to 5
  notes?: string;
  stage?: 'Screening' | 'Technical Round' | 'HR Round' | 'Manager Round' | 'Final Offer';
  timeline?: Array<{ id: string; action: string; timestamp: string; user?: string; details?: string }>;
  documents?: Array<{ id: string; name: string; size: string; date: string }>;
}

export interface Interview {
  id: string;
  applicationId: string;
  candidateName: string;
  candidateEmail: string;
  position: string;
  round: 'Technical Round' | 'HR Round' | 'Manager Round' | 'Final Round';
  interviewer: string;
  dateTime: string; // ISO datetime
  durationMinutes: number;
  platform: 'Google Meet' | 'Microsoft Teams' | 'Zoom' | 'In-Person';
  meetingLink: string;
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  rating?: number;
  feedback?: string;
}

export interface EmailApplication {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Shortlisted' | 'Rejected';
  resumeAttachment: string;
  positionApplied?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'Application Received' | 'Interview Invitation' | 'Rejected' | 'Selected' | 'Offer Letter' | 'Joining Letter';
}

export interface CareersCMSConfig {
  bannerHeading: string;
  bannerSubheading: string;
  bannerDescription: string;
  benefits: Array<{ title: string; desc: string; icon: string }>;
  hiringSteps: Array<{ step: string; title: string; desc: string }>;
  faqs: Array<{ q: string; a: string }>;
}

export interface RolePermission {
  roleId: string;
  title: string;
  description: string;
  color: string;
  permissions: {
    canViewClients: boolean;
    canEditClients: boolean;
    canDeleteClients: boolean;
    canViewRecruitment: boolean;
    canScheduleInterviews: boolean;
    canManageJobs: boolean;
    canAccessSettings: boolean;
    canViewFinancials: boolean;
  };
}

export interface CRMNotification {
  id: string;
  title: string;
  message: string;
  type: 'lead' | 'candidate' | 'meeting' | 'interview' | 'offer' | 'invoice';
  timestamp: string;
  read: boolean;
  linkTab?: string;
}

// Storage keys
const JOBS_KEY = 'gw_recruitment_jobs';
const APPS_KEY = 'gw_recruitment_apps';
const INTERVIEWS_KEY = 'gw_recruitment_interviews';
const EMAILS_KEY = 'gw_recruitment_emails';
const TEMPLATES_KEY = 'gw_recruitment_templates';
const CMS_KEY = 'gw_careers_cms_config';
const NOTIFS_KEY = 'gw_crm_notifications';
const ROLES_KEY = 'gw_user_roles_config';

// -----------------------------------------------------------------
// INITIAL SAMPLE SEED DATA
// -----------------------------------------------------------------

export const getInitialJobs = (): JobOpening[] => {
  return careersPositions.map((p, idx) => ({
    id: p.id || `job-${idx + 1}`,
    title: p.title,
    category: (p.category as any) || 'Software',
    level: p.level,
    location: p.location,
    type: p.type,
    openings: p.openings,
    status: 'Published',
    experience: p.experience,
    description: p.description,
    responsibilities: p.responsibilities || [],
    skills: p.skills || [],
    perks: p.perks || [],
    createdAt: new Date(Date.now() - (idx + 1) * 3 * 24 * 60 * 60 * 1000).toISOString(),
    applicantsCount: idx === 0 ? 14 : idx === 1 ? 8 : 5,
  }));
};

export const getInitialApplications = (): JobApplication[] => [
  {
    id: 'app-101',
    candidateId: 'cand-101',
    name: 'Pooja Sundaram',
    email: 'pooja.sundaram@gmail.com',
    phone: '+91 98481 22334',
    position: 'Software Developer',
    positionId: 'software-dev-fresher',
    resumeName: 'Pooja_Sundaram_Resume.pdf',
    resumeUrl: '#',
    appliedDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'Interview Scheduled',
    assignedRecruiter: 'Renusri',
    experienceLevel: 'Fresher',
    experienceYears: '0.6 Yrs',
    portfolioLink: 'https://github.com/poojasundaram',
    coverNote: 'B.Tech CSE graduate with strong hands-on projects in React, Node.js, and TypeScript. Eager to contribute to enterprise cloud portals.',
    rating: 4.8,
    notes: 'Cleared technical screening round. Impressive fullstack portfolio.',
    stage: 'Technical Round'
  },
  {
    id: 'app-102',
    candidateId: 'cand-102',
    name: 'Sai Teja Varma',
    email: 'saiteja.varma@outlook.com',
    phone: '+91 99882 33445',
    position: 'Full-Stack Developer (MERN / Python)',
    positionId: 'fullstack-dev-exp',
    resumeName: 'SaiTeja_Varma_FullStack_3Yrs.pdf',
    resumeUrl: '#',
    appliedDate: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    status: 'Shortlisted',
    assignedRecruiter: 'Renusri',
    experienceLevel: 'Experienced',
    experienceYears: '3.2 Yrs',
    currentCompany: 'Infosys BPM',
    currentCTC: '₹6.5 LPA',
    expectedCTC: '₹9.0 LPA',
    noticePeriod: '30 Days',
    portfolioLink: 'https://saitejavarma.dev',
    coverNote: 'Full-stack developer with 3+ years building high-throughput microservices and React dashboards. Hands-on Docker and AWS.',
    rating: 4.6,
    notes: 'Shortlisted for Round 2 Manager interview.',
    stage: 'Manager Round'
  },
  {
    id: 'app-103',
    candidateId: 'cand-103',
    name: 'Kavitha Ramachandran',
    email: 'kavitha.r@gmail.com',
    phone: '+91 97003 44556',
    position: 'Digital Marketing Specialist',
    positionId: 'digital-marketing-fresher',
    resumeName: 'Kavitha_Marketing_Specialist.pdf',
    resumeUrl: '#',
    appliedDate: new Date(Date.now() - 32 * 60 * 60 * 1000).toISOString(),
    status: 'Reviewing',
    assignedRecruiter: 'Renusri',
    experienceLevel: 'Fresher',
    experienceYears: '0.8 Yrs',
    coverNote: 'Google Ads & Meta certified marketer with experience generating 350+ leads for healthcare and B2B SaaS campaigns.',
    rating: 4.2,
    notes: 'Resume under review by marketing head.',
    stage: 'Screening'
  },
  {
    id: 'app-104',
    candidateId: 'cand-104',
    name: 'Anand Kumar Jha',
    email: 'anand.jha@yahoo.in',
    phone: '+91 94411 55667',
    position: 'HR & Talent Acquisition Executive',
    positionId: 'hr-talent-exec',
    resumeName: 'Anand_Jha_Talent_Acquisition.pdf',
    resumeUrl: '#',
    appliedDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    status: 'Offered',
    assignedRecruiter: 'Renusri',
    experienceLevel: 'Experienced',
    experienceYears: '2.5 Yrs',
    currentCompany: 'Apex HR Solutions',
    currentCTC: '₹4.8 LPA',
    expectedCTC: '₹6.2 LPA',
    noticePeriod: 'Immediate',
    coverNote: 'Specialized in technical IT hiring, campus recruitment, and candidate onboarding workflows across Telangana and AP.',
    rating: 5.0,
    notes: 'Offer letter dispatched. Awaiting candidate formal signoff.',
    stage: 'Final Offer'
  },
  {
    id: 'app-105',
    candidateId: 'cand-105',
    name: 'Harika Dandu',
    email: 'harika.dandu@gmail.com',
    phone: '+91 96522 66778',
    position: 'Social Media & Brand Executive',
    positionId: 'social-media-exec',
    resumeName: 'Harika_Dandu_Portfolio.pdf',
    resumeUrl: '#',
    appliedDate: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    status: 'Hired',
    assignedRecruiter: 'Renusri',
    experienceLevel: 'Experienced',
    experienceYears: '1.5 Yrs',
    rating: 4.9,
    notes: 'Joined our Hyderabad campus team on Monday!',
    stage: 'Final Offer'
  }
];

export const getInitialInterviews = (): Interview[] => [
  {
    id: 'int-201',
    applicationId: 'app-101',
    candidateName: 'Pooja Sundaram',
    candidateEmail: 'pooja.sundaram@gmail.com',
    position: 'Software Developer',
    round: 'Technical Round',
    interviewer: 'K. Rajesh (Tech Lead)',
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 45,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/gwt-tech-eval',
    status: 'Scheduled',
    rating: 4.5,
    feedback: 'Scheduled live system design & React coding challenge.'
  },
  {
    id: 'int-202',
    applicationId: 'app-102',
    candidateName: 'Sai Teja Varma',
    candidateEmail: 'saiteja.varma@outlook.com',
    position: 'Full-Stack Developer (MERN / Python)',
    round: 'Manager Round',
    interviewer: 'S. Varma (Engineering VP)',
    dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 60,
    platform: 'Microsoft Teams',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/gwt-lead-eval',
    status: 'Scheduled',
    rating: 4.7,
    feedback: 'Architectural evaluation and team culture fit.'
  },
  {
    id: 'int-203',
    applicationId: 'app-104',
    candidateName: 'Anand Kumar Jha',
    candidateEmail: 'anand.jha@yahoo.in',
    position: 'HR & Talent Acquisition Executive',
    round: 'Final Round',
    interviewer: 'Renusri (Talent & HR Lead)',
    dateTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 30,
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/gwt-hr-final',
    status: 'Completed',
    rating: 5.0,
    feedback: 'Exceptional communication, strong AP/Telangana talent network. Recommended for immediate hire.'
  }
];

export const getInitialEmailApplications = (): EmailApplication[] => [
  {
    id: 'em-301',
    senderName: 'Venkatesh Naidu',
    senderEmail: 'venkatesh.naidu@gmail.com',
    subject: 'Application for Python & Cloud Architect Role - Venkatesh Naidu',
    message: 'Respected HR Team, I am submitting my resume for the cloud architecture opening at Godavari Wave Technologies. I have 4 years of AWS, Docker, and FastAPI experience.',
    date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: 'Unread',
    resumeAttachment: 'Venkatesh_Naidu_Cloud_Architect.pdf',
    positionApplied: 'Cloud & AI Engineer'
  },
  {
    id: 'em-302',
    senderName: 'Divya Sri Manchikanti',
    senderEmail: 'divyasri.m@outlook.com',
    subject: 'Resume for Fresher Software Developer - 2025 B.Tech (Gachibowli Walk-in)',
    message: 'Hello Renusri maam, I visited the campus during the GWT open drive. Attaching my updated GitHub repository and resume for junior engineer consideration.',
    date: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
    status: 'Read',
    resumeAttachment: 'DivyaSri_Resume_2025.pdf',
    positionApplied: 'Software Developer (Fresher)'
  },
  {
    id: 'em-303',
    senderName: 'Rohit Kulkarni',
    senderEmail: 'rohit.kulkarni@gmail.com',
    subject: 'Application: Senior Enterprise Sales Director',
    message: 'Dear Hiring Manager, please find attached my dossier with 7 years track record scaling enterprise SaaS and ERP solutions across South India.',
    date: new Date(Date.now() - 42 * 60 * 60 * 1000).toISOString(),
    status: 'Shortlisted',
    resumeAttachment: 'Rohit_Kulkarni_Executive_CV.pdf',
    positionApplied: 'Enterprise Sales & BD'
  }
];

export const getInitialEmailTemplates = (): EmailTemplate[] => [
  {
    id: 'tmpl-1',
    name: 'Application Received Confirmation',
    category: 'Application Received',
    subject: 'Application Received: {{job_title}} at Godavari Wave Technologies',
    body: 'Dear {{candidate_name}},\n\nThank you for applying for the position of {{job_title}} at Godavari Wave Technologies. We have successfully received your credentials.\n\nOur talent acquisition team (led by Renusri) is reviewing your profile and will update you regarding the next steps within 2 business days.\n\nWarm regards,\nTalent Operations Desk\nGodavari Wave Technologies\ncareers@godavariwave.com'
  },
  {
    id: 'tmpl-2',
    name: 'Interview Invitation',
    category: 'Interview Invitation',
    subject: 'Interview Invitation: {{round_name}} with Godavari Wave Technologies',
    body: 'Dear {{candidate_name}},\n\nCongratulations! Based on your credentials, we are pleased to invite you for the {{round_name}} for the {{job_title}} position.\n\nDetails of your session:\n• Date & Time: {{interview_time}}\n• Interviewer: {{interviewer_name}}\n• Platform: {{platform}}\n• Meeting Link: {{meeting_link}}\n\nPlease confirm your availability by replying to this email.\n\nBest regards,\nRenusri · Talent Operations Lead\nGodavari Wave Technologies'
  },
  {
    id: 'tmpl-3',
    name: 'Formal Offer Letter',
    category: 'Offer Letter',
    subject: 'Job Offer: {{job_title}} at Godavari Wave Technologies',
    body: 'Dear {{candidate_name}},\n\nWe are delighted to formally extend an offer of employment for the role of {{job_title}} at Godavari Wave Technologies, Hyderabad / Visakhapatnam.\n\nYour annual compensation package (CTC), role breakdown, and joining formalities are detailed in the attached offer letter. Please sign and return a copy within 3 days.\n\nWelcome to the Wave!\n\nSincerely,\nHR & Talent Operations\nGodavari Wave Technologies'
  },
  {
    id: 'tmpl-4',
    name: 'Application Regret Note',
    category: 'Rejected',
    subject: 'Update regarding your application for {{job_title}}',
    body: 'Dear {{candidate_name}},\n\nThank you for your interest in joining Godavari Wave Technologies and for taking the time to share your background with us.\n\nWhile your qualifications are commendable, we have decided to advance with candidates whose specific experience more closely aligns with our current project requirements. We will retain your profile in our talent repository for future openings.\n\nWe wish you every success in your professional endeavors.\n\nWarm regards,\nTalent Operations Desk\nGodavari Wave Technologies'
  }
];

export const getInitialCareersCMS = (): CareersCMSConfig => ({
  bannerHeading: 'Build the Future of Enterprise Tech with Godavari Wave',
  bannerSubheading: 'Join our world-class engineering, design, and growth teams across Hyderabad & Visakhapatnam campuses.',
  bannerDescription: 'We foster high-impact careers through real client exposure, continuous mentorship, modern tech stacks (React, TypeScript, AI agents, Cloud ERP), and competitive compensation.',
  benefits: [
    { title: 'Mentorship & Rapid Growth', desc: 'Work directly with seasoned enterprise software architects and engineering directors.', icon: 'GraduationCap' },
    { title: 'Competitive Compensation', desc: 'Performance bonuses, annual retainers, and fast-track appraisals.', icon: 'Award' },
    { title: 'Modern Tech Campuses', desc: 'Premium workspace at Meenakshi Tech Park, Gachibowli, Hyderabad with high-end hardware.', icon: 'Building2' },
    { title: 'Real Client Impact', desc: 'Deliver production code for government systems, healthcare, and enterprise fintech clients.', icon: 'TrendingUp' }
  ],
  hiringSteps: [
    { step: '01', title: 'Online Application', desc: 'Submit your resume and project portfolio through our live careers desk.' },
    { step: '02', title: 'Talent Screening', desc: 'Quick introductory discussion with Renusri regarding skills, goals, and role fit.' },
    { step: '03', title: 'Technical Challenge', desc: 'Hands-on problem solving or system design evaluation with our engineering team.' },
    { step: '04', title: 'Formal Offer & Joining', desc: 'Rollout of official offer letter, welcome kit, and structured onboarding.' }
  ],
  faqs: [
    { q: 'Can 2025/2026 batch freshers apply?', a: 'Yes! We actively hire fresh graduates with solid practical foundations in React, TypeScript, Python, and modern software engineering.' },
    { q: 'Where are the work locations?', a: 'Our primary engineering hub is at Meenakshi Tech Park, Gachibowli, Hyderabad, with our regional office in Visakhapatnam.' },
    { q: 'How long does the recruitment process take?', a: 'From initial application to offer rollout typically takes 5 to 7 business days.' }
  ]
});

export const getInitialRoles = (): RolePermission[] => [
  {
    roleId: 'super-admin',
    title: 'Super Admin',
    description: 'Full administrative access across all client CRM, recruitment, financial, and settings portals.',
    color: '#0066CC',
    permissions: {
      canViewClients: true,
      canEditClients: true,
      canDeleteClients: true,
      canViewRecruitment: true,
      canScheduleInterviews: true,
      canManageJobs: true,
      canAccessSettings: true,
      canViewFinancials: true,
    }
  },
  {
    roleId: 'hr-manager',
    title: 'HR Manager / Talent Lead',
    description: 'Lead recruiter (Renusri) managing job openings, applications, interview schedules, and hiring.',
    color: '#0052A3',
    permissions: {
      canViewClients: true,
      canEditClients: true,
      canDeleteClients: false,
      canViewRecruitment: true,
      canScheduleInterviews: true,
      canManageJobs: true,
      canAccessSettings: true,
      canViewFinancials: false,
    }
  },
  {
    roleId: 'sales-manager',
    title: 'Sales & BD Manager',
    description: 'Enterprise business development managing client pipeline, proposals, and deal closures.',
    color: '#0A84FF',
    permissions: {
      canViewClients: true,
      canEditClients: true,
      canDeleteClients: false,
      canViewRecruitment: false,
      canScheduleInterviews: false,
      canManageJobs: false,
      canAccessSettings: false,
      canViewFinancials: true,
    }
  },
  {
    roleId: 'interviewer',
    title: 'Technical Interviewer',
    description: 'Engineering evaluators conducting technical and managerial rounds with feedback scoring.',
    color: '#38BDF8',
    permissions: {
      canViewClients: false,
      canEditClients: false,
      canDeleteClients: false,
      canViewRecruitment: true,
      canScheduleInterviews: true,
      canManageJobs: false,
      canAccessSettings: false,
      canViewFinancials: false,
    }
  }
];

export const getInitialNotifications = (): CRMNotification[] => [
  {
    id: 'notif-1',
    title: 'New Client Inquiry Recorded',
    message: 'Rajesh Varma (Varma Enterprises) submitted a Custom Cloud ERP proposal request.',
    type: 'lead',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    linkTab: 'clients'
  },
  {
    id: 'notif-2',
    title: 'New Job Application Received',
    message: 'Pooja Sundaram applied for Software Developer position via online portal.',
    type: 'candidate',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    linkTab: 'recruitment'
  },
  {
    id: 'notif-3',
    title: 'Client Demo Meeting Scheduled',
    message: 'Architecture demo scheduled with Sneha Reddy (Fintech Wave Co) for Friday 3:00 PM.',
    type: 'meeting',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    linkTab: 'clients'
  },
  {
    id: 'notif-4',
    title: 'Candidate Interview Scheduled',
    message: 'Technical Round 1 booked for Sai Teja Varma via Microsoft Teams.',
    type: 'interview',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    read: true,
    linkTab: 'recruitment'
  }
];

// -----------------------------------------------------------------
// STORAGE ACCESS & MUTATION FUNCTIONS
// -----------------------------------------------------------------

export const getJobs = (): JobOpening[] => {
  if (typeof window === 'undefined') return getInitialJobs();
  try {
    const raw = localStorage.getItem(JOBS_KEY);
    if (!raw) {
      const init = getInitialJobs();
      localStorage.setItem(JOBS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialJobs();
  }
};

export const saveJob = (job: Omit<JobOpening, 'id' | 'createdAt'>): JobOpening => {
  const existing = getJobs();
  const newJob: JobOpening = {
    ...job,
    id: `job-${Date.now().toString().slice(-5)}`,
    createdAt: new Date().toISOString(),
    applicantsCount: 0,
  };
  const updated = [newJob, ...existing];
  try {
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
    addNotification({
      title: 'New Job Opening Published',
      message: `${newJob.title} (${newJob.openings} openings) is now live on the careers portal.`,
      type: 'candidate',
      linkTab: 'recruitment'
    });
  } catch (e) {
    console.error('Failed to save job:', e);
  }
  return newJob;
};

export const updateJob = (id: string, updates: Partial<JobOpening>): void => {
  const existing = getJobs();
  const updated = existing.map((j) => (j.id === id ? { ...j, ...updates } : j));
  try {
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to update job:', e);
  }
};

export const deleteJob = (id: string): void => {
  const existing = getJobs();
  const updated = existing.filter((j) => j.id !== id);
  try {
    localStorage.setItem(JOBS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to delete job:', e);
  }
};

export const duplicateJob = (id: string): void => {
  const existing = getJobs();
  const target = existing.find((j) => j.id === id);
  if (!target) return;
  saveJob({
    ...target,
    title: `${target.title} (Copy)`,
    status: 'Draft',
  });
};

// -----------------------------------------------------------------
// JOB APPLICATIONS
// -----------------------------------------------------------------

export const getApplications = (): JobApplication[] => {
  if (typeof window === 'undefined') return getInitialApplications();
  try {
    const raw = localStorage.getItem(APPS_KEY);
    if (!raw) {
      const init = getInitialApplications();
      localStorage.setItem(APPS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialApplications();
  }
};

export const saveApplication = (app: Omit<JobApplication, 'id' | 'appliedDate' | 'candidateId'>): JobApplication => {
  const existing = getApplications();
  const newApp: JobApplication = {
    ...app,
    id: `app-${Date.now().toString().slice(-4)}`,
    candidateId: `cand-${Date.now().toString().slice(-4)}`,
    appliedDate: new Date().toISOString(),
  };
  const updated = [newApp, ...existing];
  try {
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
    addNotification({
      title: 'New Career Application Received',
      message: `${newApp.name} applied for ${newApp.position}.`,
      type: 'candidate',
      linkTab: 'recruitment'
    });
  } catch (e) {
    console.error('Failed to save application:', e);
  }
  return newApp;
};

export const updateApplication = (id: string, updates: Partial<JobApplication>): void => {
  const existing = getApplications();
  const updated = existing.map((a) => (a.id === id ? { ...a, ...updates } : a));
  try {
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to update application:', e);
  }
};

export const deleteApplication = (id: string): void => {
  const existing = getApplications();
  const updated = existing.filter((a) => a.id !== id);
  try {
    localStorage.setItem(APPS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to delete application:', e);
  }
};

// -----------------------------------------------------------------
// INTERVIEWS
// -----------------------------------------------------------------

export const getInterviews = (): Interview[] => {
  if (typeof window === 'undefined') return getInitialInterviews();
  try {
    const raw = localStorage.getItem(INTERVIEWS_KEY);
    if (!raw) {
      const init = getInitialInterviews();
      localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialInterviews();
  }
};

export const saveInterview = (interview: Omit<Interview, 'id'>): Interview => {
  const existing = getInterviews();
  const newInt: Interview = {
    ...interview,
    id: `int-${Date.now().toString().slice(-4)}`,
  };
  const updated = [newInt, ...existing];
  try {
    localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
    addNotification({
      title: 'Interview Scheduled',
      message: `${newInt.round} scheduled for ${newInt.candidateName} on ${new Date(newInt.dateTime).toLocaleDateString('en-IN')}.`,
      type: 'interview',
      linkTab: 'recruitment'
    });
  } catch (e) {
    console.error('Failed to save interview:', e);
  }
  return newInt;
};

export const updateInterview = (id: string, updates: Partial<Interview>): void => {
  const existing = getInterviews();
  const updated = existing.map((i) => (i.id === id ? { ...i, ...updates } : i));
  try {
    localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to update interview:', e);
  }
};

export const deleteInterview = (id: string): void => {
  const existing = getInterviews();
  const updated = existing.filter((i) => i.id !== id);
  try {
    localStorage.setItem(INTERVIEWS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (e) {
    console.error('Failed to delete interview:', e);
  }
};

// -----------------------------------------------------------------
// EMAIL APPLICATIONS
// -----------------------------------------------------------------

export const getEmailApplications = (): EmailApplication[] => {
  if (typeof window === 'undefined') return getInitialEmailApplications();
  try {
    const raw = localStorage.getItem(EMAILS_KEY);
    if (!raw) {
      const init = getInitialEmailApplications();
      localStorage.setItem(EMAILS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialEmailApplications();
  }
};

export const updateEmailApplicationStatus = (id: string, status: EmailApplication['status']): void => {
  const existing = getEmailApplications();
  const updated = existing.map((e) => (e.id === id ? { ...e, status } : e));
  try {
    localStorage.setItem(EMAILS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_recruitment_updated'));
  } catch (err) {
    console.error('Failed to update email status:', err);
  }
};

// -----------------------------------------------------------------
// EMAIL TEMPLATES & CAREERS CMS
// -----------------------------------------------------------------

export const getEmailTemplates = (): EmailTemplate[] => {
  if (typeof window === 'undefined') return getInitialEmailTemplates();
  try {
    const raw = localStorage.getItem(TEMPLATES_KEY);
    if (!raw) {
      const init = getInitialEmailTemplates();
      localStorage.setItem(TEMPLATES_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialEmailTemplates();
  }
};

export const updateEmailTemplate = (id: string, updates: Partial<EmailTemplate>): void => {
  const existing = getEmailTemplates();
  const updated = existing.map((t) => (t.id === id ? { ...t, ...updates } : t));
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update email template:', e);
  }
};

export const getCareersCMS = (): CareersCMSConfig => {
  if (typeof window === 'undefined') return getInitialCareersCMS();
  try {
    const raw = localStorage.getItem(CMS_KEY);
    if (!raw) {
      const init = getInitialCareersCMS();
      localStorage.setItem(CMS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialCareersCMS();
  }
};

export const updateCareersCMS = (config: CareersCMSConfig): void => {
  try {
    localStorage.setItem(CMS_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('gw_careers_cms_updated'));
  } catch (e) {
    console.error('Failed to update careers CMS:', e);
  }
};

// -----------------------------------------------------------------
// NOTIFICATIONS
// -----------------------------------------------------------------

export const getNotifications = (): CRMNotification[] => {
  if (typeof window === 'undefined') return getInitialNotifications();
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    if (!raw) {
      const init = getInitialNotifications();
      localStorage.setItem(NOTIFS_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialNotifications();
  }
};

export const addNotification = (notif: Omit<CRMNotification, 'id' | 'timestamp' | 'read'>): CRMNotification => {
  const existing = getNotifications();
  const newNotif: CRMNotification = {
    ...notif,
    id: `notif-${Date.now().toString().slice(-5)}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  const updated = [newNotif, ...existing.slice(0, 49)];
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_notification_added', { detail: newNotif }));
  } catch (e) {
    console.error('Failed to save notification:', e);
  }
  return newNotif;
};

export const markNotificationRead = (id: string): void => {
  const existing = getNotifications();
  const updated = existing.map((n) => (n.id === id ? { ...n, read: true } : n));
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_notification_updated'));
  } catch (e) {
    console.error('Failed to mark notification read:', e);
  }
};

export const markAllNotificationsRead = (): void => {
  const existing = getNotifications();
  const updated = existing.map((n) => ({ ...n, read: true }));
  try {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_notification_updated'));
  } catch (e) {
    console.error('Failed to mark all read:', e);
  }
};

// -----------------------------------------------------------------
// ROLES & PERMISSIONS
// -----------------------------------------------------------------

export const getUserRoles = (): RolePermission[] => {
  if (typeof window === 'undefined') return getInitialRoles();
  try {
    const raw = localStorage.getItem(ROLES_KEY);
    if (!raw) {
      const init = getInitialRoles();
      localStorage.setItem(ROLES_KEY, JSON.stringify(init));
      return init;
    }
    return JSON.parse(raw);
  } catch (e) {
    return getInitialRoles();
  }
};

export const updateUserRolePermission = (
  roleId: string,
  permissionKey: keyof RolePermission['permissions'],
  val: boolean
): void => {
  const existing = getUserRoles();
  const updated = existing.map((r) => {
    if (r.roleId === roleId) {
      return {
        ...r,
        permissions: {
          ...r.permissions,
          [permissionKey]: val,
        },
      };
    }
    return r;
  });
  try {
    localStorage.setItem(ROLES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update role permission:', e);
  }
};

