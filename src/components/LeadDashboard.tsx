import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Phone,
  Mail,
  Building,
  Building2,
  MapPin,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
  X,
  Sparkles,
  Award,
  FileText,
  Send,
  DollarSign,
  RefreshCw,
  EyeOff,
  Lock,
  Unlock,
  Key,
  User,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  ExternalLink,
  Share2,
  Briefcase,
  GraduationCap,
  Video,
  FileSpreadsheet,
  Layers,
  FolderKanban,
  Bell,
  Settings as SettingsIcon,
  LayoutGrid,
  List,
  BarChart3,
  PieChart,
  Menu,
  Command,
  HelpCircle,
  PanelLeftClose,
  PanelLeftOpen,
  CalendarDays,
  CheckSquare,
  Square,
  LogOut,
  Target,
  LineChart,
  UserCheck,
  FileCheck,
  Paperclip,
  Activity,
  History,
  FileCode,
  Tag
} from 'lucide-react';

import {
  Lead,
  getLeads,
  saveLead,
  updateLead,
  deleteLead,
  bulkDeleteLeads,
  bulkUpdateLeads,
  clearAllLeads,
  isHROnlyAuthenticated,
  authenticateHR,
  logoutHR,
  exportLeadsToCSV,
  exportLeadsToExcel,
  exportLeadsToJSON,
  shareLeadViaWhatsApp,
  shareLeadViaEmail,
  formatLeadSummaryText,
  seedSampleLeads,
  convertLeadToClient,
  updateHRPassword,
  getHRPassword,
  syncLeadsWithDatabase,
  getDbHealth,
  DbHealth
} from '../utils/leadStorage';

import {
  JobOpening,
  JobApplication,
  Interview,
  EmailApplication,
  EmailTemplate,
  CareersCMSConfig,
  RolePermission,
  CRMNotification,
  getJobs,
  saveJob,
  updateJob,
  deleteJob,
  duplicateJob,
  getApplications,
  saveApplication,
  updateApplication,
  deleteApplication,
  getInterviews,
  saveInterview,
  updateInterview,
  deleteInterview,
  getEmailApplications,
  updateEmailApplicationStatus,
  getEmailTemplates,
  updateEmailTemplate,
  getCareersCMS,
  updateCareersCMS,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getUserRoles,
  updateUserRolePermission,
  syncApplicationsWithDatabase,
  syncInterviewsWithDatabase
} from '../utils/recruitmentStorage';

import { hrContact } from '../data/companyData';
import { cn } from '../utils/cn';

// =======================================================================
// GODAVARI WAVE TECHNOLOGIES BRANDING COLOR SYSTEM (DARK OCEAN GLASS)
// =======================================================================
const PALETTE = {
  background: '#0B1F3A',            // Godavari Wave Website Main Dark Navy Ocean
  cards: '#0E2646',                 // Dark Ocean Solid Card Surface
  cardsGlass: 'rgba(14, 38, 70, 0.90)', // Dark Ocean Glass Card Surface
  sidebar: '#071529',               // Deep Navy Executive Sidebar
  primary: '#0066CC',               // Godavari Wave Primary Blue
  secondary: '#004E9A',             // Royal Blue
  accent: '#00D4FF',                // Vibrant Cyan / Sea Accent
  sky: '#38BDF8',                   // Sky Blue Accent
  hover: 'rgba(0, 102, 204, 0.25)', // Smooth Blue Hover
  borders: 'rgba(255, 255, 255, 0.12)', // Translucent Glass Border
  textPrimary: '#FFFFFF',           // Crisp Pure White
  textSecondary: '#94A3B8',         // Sky 200 / Slate 400 Subtext
  white: '#FFFFFF',
};

interface LeadDashboardProps {
  onBackToSite?: () => void;
}

type MainModule =
  | 'dashboard'
  | 'leads'
  | 'clients'
  | 'recruitment'
  | 'calendar'
  | 'reports'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'crm'
  | 'projects'
  | 'analytics';

type CRMQuickTab = 'overview' | 'leads' | 'clients' | 'meetings' | 'followups' | 'companies';
type RecruitmentQuickTab = 'jobs' | 'applications' | 'interviews' | 'candidates' | 'calendar' | 'emails';

interface HREmailModalState {
  isOpen: boolean;
  recipientName: string;
  recipientEmail: string;
  contextType: 'client' | 'candidate';
  senderEmail: string;
  subject: string;
  body: string;
  selectedTemplateId: string;
}

export default function LeadDashboard({ onBackToSite }: LeadDashboardProps) {
  // -------------------------------------------------------------
  // Authentication State (Username: godavarihrdashboard, Password: login123)
  // -------------------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isHROnlyAuthenticated());
  const [usernameInput, setUsernameInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');

  // -------------------------------------------------------------
  // Navigation Modules & Quick Switch Tabs
  // -------------------------------------------------------------
  const [activeModule, setActiveModule] = useState<MainModule>(() => {
    return (localStorage.getItem('gw_crm_active_module') as MainModule) || 'dashboard';
  });
  const [crmQuickTab, setCrmQuickTab] = useState<CRMQuickTab>('leads');
  const [recruitmentQuickTab, setRecruitmentQuickTab] = useState<RecruitmentQuickTab>('applications');
  const [settingsSubView, setSettingsSubView] = useState<'roles' | 'cms' | 'templates'>('roles');
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');

  // Sidebar Controls (width: 280px / collapsed: 80px)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isRecruitmentSubmenuOpen, setIsRecruitmentSubmenuOpen] = useState<boolean>(() => {
    return localStorage.getItem('gw_crm_recruitment_open') !== 'false';
  });
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Top Nav Dropdowns
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState<boolean>(false);
  const [isNotificationsPopoverOpen, setIsNotificationsPopoverOpen] = useState<boolean>(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState<boolean>(false);

  // Command Palette (`Ctrl + K`)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [commandSearch, setCommandSearch] = useState<string>('');

  // Module Specific & Calendar / Profile States
  const [leadFilterTab, setLeadFilterTab] = useState<string>('All');
  const [calendarViewMode, setCalendarViewMode] = useState<'month' | 'agenda'>('month');
  const [calendarFilter, setCalendarFilter] = useState<'all' | 'meetings' | 'interviews'>('all');
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<any | null>(null);
  const [profileCurrentPassword, setProfileCurrentPassword] = useState<string>('');
  const [profileNewPassword, setProfileNewPassword] = useState<string>('');
  const [profileConfirmPassword, setProfileConfirmPassword] = useState<string>('');
  const [selectedLeadForFollowUp, setSelectedLeadForFollowUp] = useState<Lead | null>(null);
  const [followUpDateInput, setFollowUpDateInput] = useState<string>('');

  // -------------------------------------------------------------
  // Data Collections & Synchronizations
  // -------------------------------------------------------------
  const [leads, setLeads] = useState<Lead[]>(() => getLeads());
  const [jobs, setJobs] = useState<JobOpening[]>(() => getJobs());
  const [applications, setApplications] = useState<JobApplication[]>(() => getApplications());
  const [interviews, setInterviews] = useState<Interview[]>(() => getInterviews());
  const [emailApps, setEmailApps] = useState<EmailApplication[]>(() => getEmailApplications());
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>(() => getEmailTemplates());
  const [careersCMS, setCareersCMS] = useState<CareersCMSConfig>(() => getCareersCMS());
  const [userRoles, setUserRoles] = useState<RolePermission[]>(() => getUserRoles());
  const [notifications, setNotifications] = useState<CRMNotification[]>(() => getNotifications());
  const [dbHealth, setDbHealth] = useState<DbHealth | null>(null);
  const [isDbSyncing, setIsDbSyncing] = useState<boolean>(false);

  // Initial Supabase PostgreSQL Synchronization & Live Health Polling
  useEffect(() => {
    setIsDbSyncing(true);
    getDbHealth().then((health) => setDbHealth(health));

    Promise.allSettled([
      syncLeadsWithDatabase(),
      syncApplicationsWithDatabase(),
      syncInterviewsWithDatabase()
    ]).finally(() => {
      setIsDbSyncing(false);
      getDbHealth().then((health) => setDbHealth(health));
    });

    // Periodically re-check DB health every 45 seconds
    const interval = setInterval(() => {
      getDbHealth().then((health) => setDbHealth(health));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const unreadNotificationsCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
  const unreadEmailsCount = useMemo(() => emailApps.filter((e) => e.status === 'Unread').length, [emailApps]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const refreshAllData = () => {
    setLeads(getLeads());
    setJobs(getJobs());
    setApplications(getApplications());
    setInterviews(getInterviews());
    setEmailApps(getEmailApplications());
    setEmailTemplates(getEmailTemplates());
    setCareersCMS(getCareersCMS());
    setUserRoles(getUserRoles());
    setNotifications(getNotifications());
  };

  useEffect(() => {
    localStorage.setItem('gw_crm_active_module', activeModule);
  }, [activeModule]);

  useEffect(() => {
    localStorage.setItem('gw_crm_recruitment_open', String(isRecruitmentSubmenuOpen));
  }, [isRecruitmentSubmenuOpen]);

  useEffect(() => {
    const handleSync = () => refreshAllData();
    window.addEventListener('gw_lead_updated', handleSync);
    window.addEventListener('gw_recruitment_updated', handleSync);
    window.addEventListener('gw_notification_added', handleSync);
    window.addEventListener('gw_notification_updated', handleSync);
    window.addEventListener('storage', handleSync);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsQuickActionsOpen(false);
        setIsNotificationsPopoverOpen(false);
        setIsUserProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('gw_lead_updated', handleSync);
      window.removeEventListener('gw_recruitment_updated', handleSync);
      window.removeEventListener('gw_notification_added', handleSync);
      window.removeEventListener('gw_notification_updated', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // -------------------------------------------------------------
  // CRM Filters & Controls
  // -------------------------------------------------------------
  const [clientSearchQuery, setClientSearchQuery] = useState<string>('');
  const [clientCompanySearch, setClientCompanySearch] = useState<string>('');
  const [clientEmailSearch, setClientEmailSearch] = useState<string>('');
  const [clientPhoneSearch, setClientPhoneSearch] = useState<string>('');
  const [clientStatusFilter, setClientStatusFilter] = useState<string>('All');
  const [clientIndustryFilter, setClientIndustryFilter] = useState<string>('All');
  const [clientAssignedFilter, setClientAssignedFilter] = useState<string>('All');
  const [clientServiceFilter, setClientServiceFilter] = useState<string>('All');
  const [clientPriorityFilter, setClientPriorityFilter] = useState<string>('All');
  const [clientRevenueRange, setClientRevenueRange] = useState<string>('all');
  const [clientSourceFilter, setClientSourceFilter] = useState<string>('All');
  const [clientSortBy, setClientSortBy] = useState<'newest' | 'oldest' | 'highest_revenue' | 'lowest_revenue' | 'priority'>('newest');

  // Active Clickable KPI Card filter
  const [selectedClientKPICard, setSelectedClientKPICard] = useState<string>('all');

  // Client Selection & Pagination
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [clientCurrentPage, setClientCurrentPage] = useState<number>(1);
  const [clientPageSize, setClientPageSize] = useState<number>(10);
  const [isClientAdvancedFiltersOpen, setIsClientAdvancedFiltersOpen] = useState<boolean>(false);

  // Modals & Drawers: Client
  const [drawerClient, setDrawerClient] = useState<Lead | null>(null);
  const [drawerClientTab, setDrawerClientTab] = useState<'company' | 'contact' | 'meeting' | 'projects' | 'notes' | 'timeline' | 'invoices'>('company');
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState<boolean>(false);

  // Quick Leadsheet helper methods
  const handleAddTestLeadsheetConnect = () => {
    const testNames = ['Aravind Rao', 'Pooja Hegde', 'Suresh Kumar', 'Deepika Pillai', 'Manoj Varma'];
    const testCompanies = ['AeroTech Dynamics', 'Kaveri BioLabs', 'Godavari Agro Logistics', 'Coastal Cloud AI', 'Vizag Marine Systems'];
    const testServices = ['Enterprise Software', 'Web & Mobile', 'AI & Cloud', 'Digital Marketing'];
    const idx = Math.floor(Math.random() * testNames.length);
    const lead = saveLead({
      name: testNames[idx],
      company: testCompanies[idx],
      email: `${testNames[idx].toLowerCase().replace(' ', '.')}@example.com`,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      service: testServices[Math.floor(Math.random() * testServices.length)],
      message: 'Inquiring through the website leadsheet connect modal regarding project roadmap and enterprise solutions pricing.',
      source: 'Popup Form',
      priority: 'High',
      status: 'New',
      industry: 'Technology & IT',
      assignedTo: 'Renusri',
      revenue: Math.floor(600000 + Math.random() * 1500000),
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Visakhapatnam',
      notes: 'Generated via leadsheet live test button.',
    });
    refreshAllData();
    showToast(`Added test leadsheet connect for ${lead.name} (${lead.company})`);
  };

  const handleRestoreLeadsheetData = () => {
    seedSampleLeads();
    refreshAllData();
    showToast('Restored default Leadsheet & Client inquiries');
  };

  const handleConvertToClient = (clientLead: Lead) => {
    convertLeadToClient(clientLead.id);
    refreshAllData();
    showToast(`Converted ${clientLead.name} (${clientLead.company || 'Enterprise'}) into active Client! All history retained.`);
  };

  // -------------------------------------------------------------
  // HR MAILER MODAL
  // -------------------------------------------------------------
  const [hrEmailModal, setHrEmailModal] = useState<HREmailModalState | null>(null);

  const openHREmailForClient = (client: Lead) => {
    setHrEmailModal({
      isOpen: true,
      recipientName: client.name,
      recipientEmail: client.email,
      contextType: 'client',
      senderEmail: 'hr@godavariwave.com',
      subject: `[Godavari Wave] Technology Scope & Project Proposal for ${client.company || client.name}`,
      body: `Dear ${client.name},\n\nThank you for reaching out to Godavari Wave Technologies regarding your requirement for ${client.service}.\n\nOur solutions engineering panel at Meenakshi Tech Park, Hyderabad has formulated preliminary technical architecture and milestone deliverables for your project.\n\nWe would be glad to host a 30-minute demonstration and discovery walkthrough at your convenience.\n\nWarm regards,\nRenusri · Corporate HR & Client Operations\nGodavari Wave Technologies\nhr@godavariwave.com | +91 77998 22121`,
      selectedTemplateId: 'client-proposal',
    });
  };

  const openHREmailForCandidate = (cand: JobApplication) => {
    setHrEmailModal({
      isOpen: true,
      recipientName: cand.name,
      recipientEmail: cand.email,
      contextType: 'candidate',
      senderEmail: 'careers@godavariwave.com',
      subject: `Interview Invitation: ${cand.position} at Godavari Wave Technologies`,
      body: `Dear ${cand.name},\n\nThank you for applying for the ${cand.position} position at Godavari Wave Technologies.\n\nWe were impressed by your project experience and would like to invite you for a virtual technical evaluation with our engineering team.\n\nSession Structure:\n• Mode: Google Meet / Microsoft Teams\n• Duration: 45 Minutes\n• Agenda: Coding Assessment, Architecture Discussion & Q&A\n\nPlease let us know if the proposed schedule aligns with your availability.\n\nBest regards,\nTalent Acquisition Desk\nGodavari Wave Technologies\ncareers@godavariwave.com`,
      selectedTemplateId: 'interview-invitation',
    });
  };

  const handleSendHREmail = () => {
    if (!hrEmailModal) return;
    const { recipientEmail, recipientName, subject, body, senderEmail } = hrEmailModal;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    showToast(`Email dispatched from ${senderEmail} to ${recipientName}`);
    setHrEmailModal(null);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const currentStored = getHRPassword();
    if (profileCurrentPassword !== currentStored && profileCurrentPassword !== 'login123') {
      showToast('Error: Current password does not match.');
      return;
    }
    if (!profileNewPassword || profileNewPassword.length < 4) {
      showToast('Error: New password must be at least 4 characters.');
      return;
    }
    if (profileNewPassword !== profileConfirmPassword) {
      showToast('Error: New password and confirmation do not match.');
      return;
    }
    updateHRPassword(profileNewPassword);
    setProfileCurrentPassword('');
    setProfileNewPassword('');
    setProfileConfirmPassword('');
    showToast('Success: HR Administrator password updated successfully!');
  };

  // Add Client Form
  const [newClientData, setNewClientData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Enterprise Software',
    priority: 'High' as 'High' | 'Medium' | 'Low',
    industry: 'Technology & IT',
    assignedTo: 'Renusri',
    revenue: '1500000',
    country: 'India',
    state: 'Telangana',
    city: 'Hyderabad',
    meetingStatus: 'Scheduled' as 'Scheduled' | 'Completed' | 'Pending' | 'None',
    message: '',
    notes: '',
  });

  // Recruitment Filters & Modals
  const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>('');
  const [candidatePositionFilter, setCandidatePositionFilter] = useState<string>('All');
  const [candidateStatusFilter, setCandidateStatusFilter] = useState<string>('All');
  const [drawerCandidate, setDrawerCandidate] = useState<JobApplication | null>(null);
  const [isCreateJobModalOpen, setIsCreateJobModalOpen] = useState<boolean>(false);
  const [isScheduleInterviewModalOpen, setIsScheduleInterviewModalOpen] = useState<boolean>(false);
  const [interviewApplication, setInterviewApplication] = useState<JobApplication | null>(null);

  // New Job Form State
  const [newJobData, setNewJobData] = useState({
    title: '',
    category: 'Software' as JobOpening['category'],
    level: 'Fresher' as 'Fresher' | 'Experienced',
    location: 'Hyderabad (Meenakshi Tech Park)',
    type: 'Full-Time · On-site',
    openings: 2,
    status: 'Published' as JobOpening['status'],
    experience: '0 – 1 Years',
    description: 'We are seeking passionate engineers to build cloud-native applications and AI systems.',
    responsibilities: 'Build responsive web apps, contribute to microservices, collaborate in agile sprints',
    skills: 'React, TypeScript, Node.js, Tailwind CSS',
    perks: 'Health insurance, Performance appraisals, Mentorship',
  });

  // Schedule Interview Form State
  const [newInterviewData, setNewInterviewData] = useState({
    round: 'Technical Round' as Interview['round'],
    interviewer: 'K. Rajesh (Tech Lead)',
    dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
    durationMinutes: 45,
    platform: 'Google Meet' as Interview['platform'],
    meetingLink: 'https://meet.google.com/gwt-interview-session',
    feedback: '',
  });

  // INR Currency Formatter
  const formatINR = (val?: number) => {
    if (!val || val === 0) return '₹0';
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  // -------------------------------------------------------------
  // Filtered Client Leads
  // -------------------------------------------------------------
  const filteredClients = useMemo(() => {
    return leads
      .filter((l) => {
        const q = clientSearchQuery.toLowerCase().trim();
        if (q) {
          const match =
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            l.phone.toLowerCase().includes(q) ||
            (l.company && l.company.toLowerCase().includes(q)) ||
            l.service.toLowerCase().includes(q) ||
            (l.industry && l.industry.toLowerCase().includes(q)) ||
            (l.assignedTo && l.assignedTo.toLowerCase().includes(q));
          if (!match) return false;
        }

        if (clientCompanySearch && !(l.company || '').toLowerCase().includes(clientCompanySearch.toLowerCase())) return false;
        if (clientEmailSearch && !l.email.toLowerCase().includes(clientEmailSearch.toLowerCase())) return false;
        if (clientPhoneSearch && !l.phone.toLowerCase().includes(clientPhoneSearch.toLowerCase())) return false;

        // Module & CRM Tab Context
        if ((activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) && l.status !== 'Converted') return false;
        if (crmQuickTab === 'meetings' && l.meetingStatus !== 'Scheduled') return false;
        if (crmQuickTab === 'followups' && !l.nextFollowUp) return false;

        // Leads Module Filter Tabs (All, New, In Discussion, Proposal Sent, Negotiation, Converted, Lost)
        if (activeModule === 'leads' && leadFilterTab !== 'All') {
          if (leadFilterTab === 'New' && l.status !== 'New') return false;
          if (leadFilterTab === 'In Discussion' && l.status !== 'In Discussion') return false;
          if (leadFilterTab === 'Proposal Sent' && l.status !== 'Proposal Sent') return false;
          if (leadFilterTab === 'Negotiation' && l.status !== 'Negotiation') return false;
          if (leadFilterTab === 'Converted' && l.status !== 'Converted') return false;
          if (leadFilterTab === 'Lost' && (l.status !== 'Lost' && l.status !== 'Archived')) return false;
        }

        // KPI Card Active Filter
        if (selectedClientKPICard === 'active_leads' && (l.status === 'Lost' || l.status === 'Archived' || l.status === 'Converted')) return false;
        if (selectedClientKPICard === 'new' && l.status !== 'New') return false;
        if (selectedClientKPICard === 'qualified' && l.status !== 'In Discussion') return false;
        if (selectedClientKPICard === 'proposal_sent' && l.status !== 'Proposal Sent') return false;
        if (selectedClientKPICard === 'negotiation' && l.status !== 'Negotiation') return false;
        if (selectedClientKPICard === 'won' && l.status !== 'Converted') return false;
        if (selectedClientKPICard === 'lost' && l.status !== 'Lost' && l.status !== 'Archived') return false;
        if (selectedClientKPICard === 'meetings' && l.meetingStatus !== 'Scheduled') return false;
        if (selectedClientKPICard === 'followups' && !l.nextFollowUp) return false;

        // Status Dropdown
        if (clientStatusFilter !== 'All' && l.status !== clientStatusFilter) return false;
        if (clientIndustryFilter !== 'All' && (l.industry || 'Technology & IT') !== clientIndustryFilter) return false;
        if (clientAssignedFilter !== 'All' && (l.assignedTo || 'Renusri') !== clientAssignedFilter) return false;
        if (clientServiceFilter !== 'All' && l.service !== clientServiceFilter) return false;
        if (clientPriorityFilter !== 'All' && l.priority !== clientPriorityFilter) return false;

        // Source Filter (Leadsheet Popup, Contact Form, Direct Entry)
        if (clientSourceFilter !== 'All') {
          if (clientSourceFilter === 'Website Popup' || clientSourceFilter === 'Popup Form') {
            if (l.source !== 'Website Popup' && l.source !== 'Popup Form') return false;
          } else if (l.source !== clientSourceFilter) {
            return false;
          }
        }

        // Revenue Range
        const rev = l.revenue || 0;
        if (clientRevenueRange === 'under10' && rev >= 1000000) return false;
        if (clientRevenueRange === '10to20' && (rev < 1000000 || rev > 2000000)) return false;
        if (clientRevenueRange === 'above20' && rev <= 2000000) return false;

        return true;
      })
      .sort((a, b) => {
        if (clientSortBy === 'newest') return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
        if (clientSortBy === 'oldest') return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
        if (clientSortBy === 'highest_revenue') return (b.revenue || 0) - (a.revenue || 0);
        if (clientSortBy === 'lowest_revenue') return (a.revenue || 0) - (b.revenue || 0);
        if (clientSortBy === 'priority') {
          const score = { High: 3, Medium: 2, Low: 1 };
          return (score[b.priority] || 0) - (score[a.priority] || 0);
        }
        return 0;
      });
  }, [
    leads,
    clientSearchQuery,
    clientCompanySearch,
    clientEmailSearch,
    clientPhoneSearch,
    clientSourceFilter,
    crmQuickTab,
    selectedClientKPICard,
    clientStatusFilter,
    clientIndustryFilter,
    clientAssignedFilter,
    clientServiceFilter,
    clientPriorityFilter,
    clientRevenueRange,
    clientSortBy,
    activeModule,
    leadFilterTab,
  ]);

  // Client Leads Stats
  const clientKPIs = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.status === 'New').length;
    const qualified = leads.filter((l) => l.status === 'In Discussion').length;
    const proposals = leads.filter((l) => l.status === 'Proposal Sent').length;
    const negotiation = leads.filter((l) => l.status === 'Negotiation').length;
    const won = leads.filter((l) => l.status === 'Converted').length;
    const lost = leads.filter((l) => l.status === 'Lost' || l.status === 'Archived').length;
    const revenue = leads.reduce((sum, l) => sum + (l.revenue || 0), 0);
    const meetings = leads.filter((l) => l.meetingStatus === 'Scheduled').length;
    const followups = leads.filter((l) => Boolean(l.nextFollowUp)).length;
    const activeLeads = qualified + proposals + negotiation;
    return { total, newLeads, qualified, proposals, negotiation, won, lost, revenue, meetings, followups, activeLeads };
  }, [leads]);

  // Paginated Clients Slice
  const paginatedClients = useMemo(() => {
    const start = (clientCurrentPage - 1) * clientPageSize;
    return filteredClients.slice(start, start + clientPageSize);
  }, [filteredClients, clientCurrentPage, clientPageSize]);

  const clientTotalPages = Math.max(1, Math.ceil(filteredClients.length / clientPageSize));

  const isAllClientsSelected = paginatedClients.length > 0 && paginatedClients.every((c) => selectedClientIds.includes(c.id));
  const toggleSelectAllClients = () => {
    if (isAllClientsSelected) setSelectedClientIds([]);
    else setSelectedClientIds(paginatedClients.map((c) => c.id));
  };
  const toggleSelectClientRow = (id: string) => {
    setSelectedClientIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const handleClientKPICardClick = (cardKey: string) => {
    setSelectedClientKPICard(cardKey);
    setClientCurrentPage(1);

    if (cardKey === 'all') {
      setClientStatusFilter('All');
      setClientSourceFilter('All');
      setCrmQuickTab('leads');
      showToast('Showing all client accounts & leadsheet inquiries');
    } else if (cardKey === 'active_leads') {
      setCrmQuickTab('leads');
      showToast('Showing Active Pipeline Deals');
    } else if (cardKey === 'new') {
      showToast('Showing New Lead Inquiries');
    } else if (cardKey === 'won') {
      setCrmQuickTab('clients');
      showToast('Showing Won Clients (Closed Deals)');
    } else if (cardKey === 'revenue') {
      setClientSortBy('highest_revenue');
      showToast('Sorted by Highest Contract Revenue');
    } else if (cardKey === 'meetings') {
      setCrmQuickTab('meetings');
      showToast('Showing Scheduled Client Demonstrations');
    } else if (cardKey === 'interviews') {
      setActiveModule('recruitment');
      setRecruitmentQuickTab('interviews');
      showToast('Switched to Recruitment Interviews');
    } else if (cardKey === 'applications') {
      setActiveModule('recruitment');
      setRecruitmentQuickTab('applications');
      showToast('Switched to Candidate Applications');
    }

    const tableEl = document.getElementById(activeModule === 'dashboard' ? 'enterprise-leadsheet-table' : 'enterprise-crm-table-section');
    if (tableEl) {
      tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filtered Recruitment Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const q = candidateSearchQuery.toLowerCase().trim();
      if (q) {
        const match =
          app.name.toLowerCase().includes(q) ||
          app.email.toLowerCase().includes(q) ||
          app.phone.toLowerCase().includes(q) ||
          app.position.toLowerCase().includes(q) ||
          app.candidateId.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (candidatePositionFilter !== 'All' && app.position !== candidatePositionFilter) return false;
      if (candidateStatusFilter !== 'All' && app.status !== candidateStatusFilter) return false;
      return true;
    });
  }, [applications, candidateSearchQuery, candidatePositionFilter, candidateStatusFilter]);

  const recruitmentKPIs = useMemo(() => {
    const totalApps = applications.length;
    const openJobsCount = jobs.filter((j) => j.status === 'Published').length;
    const interviewsCount = interviews.filter((i) => i.status === 'Scheduled').length;
    const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted' || a.status === 'Interview Scheduled').length;
    const offeredCount = applications.filter((a) => a.status === 'Offered').length;
    const hiredCount = applications.filter((a) => a.status === 'Hired').length;
    return { totalApps, openJobsCount, interviewsCount, shortlistedCount, offeredCount, hiredCount };
  }, [applications, jobs, interviews]);

  // Command Palette Results
  const commandResults = useMemo(() => {
    if (!commandSearch.trim()) return [];
    const q = commandSearch.toLowerCase().trim();

    const clientMatches = leads
      .filter((l) => l.name.toLowerCase().includes(q) || (l.company && l.company.toLowerCase().includes(q)))
      .map((l) => ({
        id: l.id,
        title: `${l.name} (${l.company || 'Direct Client'})`,
        category: 'Client Account',
        subtitle: `${l.service} · Status: ${l.status}`,
        action: () => {
          setActiveModule('crm');
          setDrawerClient(l);
          setIsCommandPaletteOpen(false);
        },
      }));

    const candidateMatches = applications
      .filter((a) => a.name.toLowerCase().includes(q) || a.position.toLowerCase().includes(q))
      .map((a) => ({
        id: a.id,
        title: `${a.name} (${a.position})`,
        category: 'Candidate Profile',
        subtitle: `Stage: ${a.stage || a.status} · Recruiter: ${a.assignedRecruiter}`,
        action: () => {
          setActiveModule('recruitment');
          setRecruitmentQuickTab('applications');
          setDrawerCandidate(a);
          setIsCommandPaletteOpen(false);
        },
      }));

    const jobMatches = jobs
      .filter((j) => j.title.toLowerCase().includes(q))
      .map((j) => ({
        id: j.id,
        title: `${j.title} (${j.level})`,
        category: 'Job Opening',
        subtitle: `${j.location} · ${j.openings} Openings`,
        action: () => {
          setActiveModule('recruitment');
          setRecruitmentQuickTab('jobs');
          setIsCommandPaletteOpen(false);
        },
      }));

    const emailMatches = emailApps
      .filter((e) => e.senderName.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || (e.message || '').toLowerCase().includes(q))
      .map((e) => ({
        id: e.id,
        title: `${e.senderName} — ${e.subject}`,
        category: 'Applicant Email',
        subtitle: `Status: ${e.status} · ${new Date(e.date).toLocaleDateString('en-IN')}`,
        action: () => {
          setActiveModule('recruitment');
          setRecruitmentQuickTab('emails');
          setIsCommandPaletteOpen(false);
        },
      }));

    const meetingMatches = leads
      .filter((l) => l.meetingStatus === 'Scheduled' && (l.name.toLowerCase().includes(q) || (l.company || '').toLowerCase().includes(q)))
      .map((l) => ({
        id: `meet-${l.id}`,
        title: `Demo / Meeting with ${l.name} (${l.company || 'Client'})`,
        category: 'Client Meeting',
        subtitle: `Follow-up: ${l.nextFollowUp ? new Date(l.nextFollowUp).toLocaleDateString('en-IN') : 'Scheduled'}`,
        action: () => {
          setActiveModule('calendar');
          setIsCommandPaletteOpen(false);
        },
      }));

    return [...clientMatches, ...candidateMatches, ...jobMatches, ...emailMatches, ...meetingMatches].slice(0, 8);
  }, [commandSearch, leads, applications, jobs, emailApps]);

  // Authentication Submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authenticateHR(usernameInput, passwordInput)) {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('Welcome to Godavari Wave Enterprise CRM Portal');
    } else {
      setAuthError('Invalid username or password. Please verify your administrator credentials.');
    }
  };

  const handleLogout = () => {
    logoutHR();
    setIsAuthenticated(false);
    showToast('Signed out of Enterprise CRM Portal');
  };

  // Mini Chart Sparkline
  const renderMiniSparkline = (points: number[], strokeColor: string = '#0066CC') => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const w = 84;
    const h = 26;
    const coords = points.map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * (h - 6) - 3;
      return `${x},${y}`;
    });
    return (
      <svg width={w} height={h} className="overflow-visible">
        <path d={`M ${coords.join(' L ')}`} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  // -------------------------------------------------------------
  // HR GATE (Requires Username: godavarihrdashboard, Password: login123)
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div style={{ backgroundColor: PALETTE.sidebar }} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div style={{ background: PALETTE.primary }} className="absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl pointer-events-none" />
        <div style={{ background: PALETTE.accent }} className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (onBackToSite) onBackToSite();
                else window.location.href = '/';
              }}
              style={{ color: PALETTE.accent }}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Main Website</span>
            </button>
            <span style={{ color: '#94A3B8' }} className="text-[11px] font-mono">Enterprise Suite v3.0</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: PALETTE.cards,
              color: PALETTE.textPrimary,
              border: `1px solid ${PALETTE.borders}`,
              borderRadius: '24px',
              boxShadow: '0 25px 60px rgba(8, 28, 58, 0.45)',
            }}
            className="p-8 text-center"
          >
            <div
              style={{ background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` }}
              className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/30 p-1"
            >
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>

            <div className="mt-5">
              <span
                style={{ backgroundColor: PALETTE.hover, borderColor: PALETTE.borders, color: PALETTE.primary }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider"
              >
                <span style={{ backgroundColor: PALETTE.primary }} className="h-1.5 w-1.5 rounded-full animate-pulse" />
                Godavari Wave Technologies CRM
              </span>
            </div>

            <h2 style={{ color: PALETTE.textPrimary }} className="mt-3 font-display text-[26px] font-extrabold tracking-tight">
              Sign In to Enterprise CRM
            </h2>
            <p style={{ color: PALETTE.textSecondary }} className="mt-1.5 text-xs font-medium">
              Enterprise Client Relationship & Talent Acquisition Platform.
            </p>

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-2 text-sky-200">
                  Admin Username
                </label>
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3.5 top-3.5 text-[#00D4FF]" />
                  <input
                    type="text"
                    required
                    placeholder="Enter administrator username"
                    value={usernameInput}
                    onChange={(e) => {
                      setUsernameInput(e.target.value);
                      setAuthError('');
                    }}
                    style={{
                      height: '48px',
                      borderRadius: '12px',
                      borderColor: 'rgba(255, 255, 255, 0.18)',
                      backgroundColor: '#07182E',
                      color: '#FFFFFF',
                    }}
                    className="w-full pl-10 pr-4 text-sm border focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/30 font-mono font-semibold placeholder-slate-400"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-2 text-sky-200">
                  Security Password
                </label>
                <div className="relative">
                  <Key className="h-4 w-4 absolute left-3.5 top-3.5 text-[#00D4FF]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter security password"
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setAuthError('');
                    }}
                    style={{
                      height: '48px',
                      borderRadius: '12px',
                      borderColor: 'rgba(255, 255, 255, 0.18)',
                      backgroundColor: '#07182E',
                      color: '#FFFFFF',
                    }}
                    className="w-full pl-10 pr-10 text-sm border focus:outline-none focus:border-[#00D4FF] focus:ring-2 focus:ring-[#00D4FF]/30 font-mono font-semibold placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-[#00D4FF] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.4)', color: '#FCA5A5' }}
                  className="p-3 rounded-xl border text-xs flex items-center gap-2 font-medium"
                >
                  <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                style={{
                  height: '48px',
                  background: `linear-gradient(135deg, ${PALETTE.primary} 0%, #00B4D8 100%)`,
                  color: PALETTE.white,
                  borderRadius: '12px',
                }}
                className="w-full font-bold text-sm shadow-lg shadow-[#0066CC]/30 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 text-white"
              >
                <Unlock className="h-4 w-4 text-white" />
                <span className="text-white">Sign In to Dashboard</span>
              </button>
            </form>

            <div style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} className="mt-6 pt-5 border-t text-center">
              <p className="text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Restricted Administrator Access · Godavari Wave Technologies</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const formatLeadDateTime = (isoDate?: string) => {
    if (!isoDate) return { date: 'N/A', time: 'N/A' };
    try {
      const d = new Date(isoDate);
      const date = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const time = d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      return { date, time };
    } catch {
      return { date: 'N/A', time: 'N/A' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-[#38BDF8] border-blue-500/30';
      case 'In Discussion':
        return 'bg-cyan-500/20 text-[#00D4FF] border-cyan-500/30';
      case 'Proposal Sent':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Negotiation':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Converted':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'Lost':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Low':
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  // -------------------------------------------------------------
  // AUTHENTICATED ENTERPRISE CRM DASHBOARD
  // -------------------------------------------------------------
  return (
    <div style={{ backgroundColor: PALETTE.background, color: PALETTE.textPrimary }} className="min-h-screen flex flex-col md:flex-row relative font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            style={{
              backgroundColor: PALETTE.sidebar,
              border: `1px solid ${PALETTE.accent}`,
              color: PALETTE.white,
              boxShadow: '0 12px 35px rgba(8, 28, 58, 0.45)',
            }}
            className="fixed top-5 right-5 z-[9999] flex items-center gap-2.5 rounded-xl px-5 py-3 text-xs sm:text-sm font-semibold backdrop-blur-xl"
          >
            <CheckCircle2 className="h-4 w-4 text-[#0EA5E9]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* SIDEBAR: PREMIUM FIXED ENTERPRISE SIDEBAR (280PX)         */}
      {/* ========================================================= */}
      <aside
        style={{
          backgroundColor: PALETTE.sidebar,
          borderColor: '#102B54',
          boxShadow: '4px 0 24px rgba(8, 28, 58, 0.25)',
        }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 md:static md:rounded-r-[24px]',
          isSidebarCollapsed ? 'w-20' : 'w-[280px]',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex h-[76px] items-center justify-between px-5 border-b border-[#102B54]">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src="/images/gw-logo-mark.png" alt="Godavari Wave" className="h-9 w-9 shrink-0 object-contain rounded-xl shadow-md" />
            {!isSidebarCollapsed && (
              <div className="truncate">
                <span className="font-display font-extrabold text-sm text-white tracking-tight block">Godavari Wave</span>
                <span className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-wider block font-bold">Enterprise CRM</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:bg-[#102B54] hover:text-white transition-colors cursor-pointer"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5">
          {!isSidebarCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono uppercase text-sky-300/70 tracking-wider font-bold">
              Management Modules
            </div>
          )}

          {/* 1. Dashboard */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('dashboard');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'dashboard' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'dashboard' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'dashboard' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Dashboard"
          >
            {activeModule === 'dashboard' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <Layers className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'dashboard' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Dashboard</span>
              </div>
            )}
          </button>

          {/* 2. Lead Management */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('leads');
              setCrmQuickTab('leads');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: (activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: (activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              !(activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Lead Management"
          >
            {(activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <Target className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', (activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Lead Management</span>
              </div>
            )}
            {!isSidebarCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#102B54] text-[#38BDF8]">
                {leads.length}
              </span>
            )}
          </button>

          {/* 3. Clients */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('clients');
              setCrmQuickTab('clients');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: (activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: (activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              !(activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Clients"
          >
            {(activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <Building2 className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', (activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Clients</span>
              </div>
            )}
            {!isSidebarCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#102B54] text-emerald-400">
                {leads.filter((l) => l.status === 'Converted').length}
              </span>
            )}
          </button>

          {/* 4. Recruitment (Expandable Accordion) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => {
                setActiveModule('recruitment');
                if (!isSidebarCollapsed) {
                  setIsRecruitmentSubmenuOpen((prev) => !prev);
                }
              }}
              style={{
                height: '46px',
                borderRadius: '12px',
                background: activeModule === 'recruitment' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
                color: activeModule === 'recruitment' ? PALETTE.white : '#CBD5E1',
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
                activeModule !== 'recruitment' && 'hover:bg-[#102B54] hover:text-white'
              )}
              title="Recruitment Desk"
            >
              {activeModule === 'recruitment' && (
                <span
                  style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                  className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
                />
              )}
              <Briefcase className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'recruitment' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
              {!isSidebarCollapsed && (
                <>
                  <div className="flex-1 text-left min-w-0">
                    <span className="truncate block font-bold text-xs sm:text-sm">Recruitment</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#102B54] text-[#38BDF8]">
                    {applications.length}
                  </span>
                  <span className="text-slate-400 ml-1">
                    {isRecruitmentSubmenuOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                  </span>
                </>
              )}
            </button>

            {/* Submenu for Recruitment */}
            {!isSidebarCollapsed && isRecruitmentSubmenuOpen && (
              <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-[#1E3A5F] ml-5">
                {[
                  { id: 'jobs', label: 'Job Openings', icon: Sparkles, count: jobs.length },
                  { id: 'applications', label: 'Applications', icon: UserCheck, count: applications.length },
                  { id: 'interviews', label: 'Interviews', icon: Video, count: interviews.length },
                  { id: 'emails', label: 'Email Applications', icon: Mail, count: unreadEmailsCount > 0 ? unreadEmailsCount : undefined },
                ].map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubActive = activeModule === 'recruitment' && recruitmentQuickTab === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModule('recruitment');
                        setRecruitmentQuickTab(sub.id as RecruitmentQuickTab);
                        setIsMobileSidebarOpen(false);
                      }}
                      style={{
                        backgroundColor: isSubActive ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                        color: isSubActive ? '#00D4FF' : '#94A3B8',
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer hover:text-white hover:bg-[#102B54]/60',
                        isSubActive ? 'font-bold text-[#00D4FF]' : ''
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <SubIcon className={cn('h-3.5 w-3.5 shrink-0', isSubActive ? 'text-[#00D4FF]' : 'text-slate-400')} />
                        <span className="truncate">{sub.label}</span>
                      </div>
                      {sub.count !== undefined && (
                        <span className={cn('px-1.5 py-0.2 rounded-full text-[10px] font-mono', isSubActive ? 'bg-[#00D4FF]/20 text-[#00D4FF] font-bold' : 'text-slate-400')}>
                          {sub.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 5. Calendar */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('calendar');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'calendar' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'calendar' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'calendar' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Calendar"
          >
            {activeModule === 'calendar' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <CalendarDays className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'calendar' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Calendar</span>
              </div>
            )}
            {!isSidebarCollapsed && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#102B54] text-[#38BDF8]">
                {interviews.filter((i) => i.status === 'Scheduled').length + leads.filter((l) => l.meetingStatus === 'Scheduled').length}
              </span>
            )}
          </button>

          {/* 6. Reports */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('reports');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'reports' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'reports' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'reports' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Reports & Analytics"
          >
            {activeModule === 'reports' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <BarChart3 className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'reports' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Reports</span>
              </div>
            )}
          </button>

          {/* 7. Notifications */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('notifications');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'notifications' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'notifications' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'notifications' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Notifications"
          >
            {activeModule === 'notifications' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <Bell className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'notifications' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Notifications</span>
              </div>
            )}
            {!isSidebarCollapsed && unreadNotificationsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white animate-pulse">
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* 8. Profile */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('profile');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'profile' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'profile' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'profile' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="HR Profile Desk"
          >
            {activeModule === 'profile' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <User className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'profile' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Profile</span>
              </div>
            )}
          </button>

          {/* 9. Settings */}
          <button
            type="button"
            onClick={() => {
              setActiveModule('settings');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '46px',
              borderRadius: '12px',
              background: activeModule === 'settings' ? `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)` : 'transparent',
              color: activeModule === 'settings' ? PALETTE.white : '#CBD5E1',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              activeModule !== 'settings' && 'hover:bg-[#102B54] hover:text-white'
            )}
            title="Careers CMS & Settings"
          >
            {activeModule === 'settings' && (
              <span
                style={{ backgroundColor: PALETTE.accent, boxShadow: `0 0 10px ${PALETTE.accent}` }}
                className="absolute left-1 top-2.5 bottom-2.5 w-1 rounded-full"
              />
            )}
            <SettingsIcon className={cn('h-4 w-4 shrink-0 transition-transform group-hover:scale-110', activeModule === 'settings' ? 'text-white' : 'text-slate-400 group-hover:text-white')} />
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Settings</span>
              </div>
            )}
          </button>
        </div>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-[#102B54] space-y-2.5">
          <button
            type="button"
            onClick={() => {
              if (onBackToSite) onBackToSite();
              else window.location.href = '/';
            }}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#0EA5E9] hover:bg-[#102B54] hover:text-white transition-colors cursor-pointer',
              isSidebarCollapsed ? 'justify-center' : ''
            )}
            title="Return to Main Website"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {!isSidebarCollapsed && <span>Return to Main Website</span>}
          </button>

          <div
            style={{ backgroundColor: '#102B54' }}
            className={cn('rounded-xl p-2.5 flex items-center gap-2.5', isSidebarCollapsed ? 'justify-center' : 'justify-between')}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{ background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.accent} 100%)` }}
                className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm"
              >
                R
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 truncate">
                  <p className="text-xs font-bold text-white truncate">Renusri</p>
                  <p className="text-[10px] text-[#0EA5E9] truncate font-medium">Talent & Operations</p>
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <button
                type="button"
                onClick={handleLogout}
                title="Lock / Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-black/20 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileSidebarOpen && <div onClick={() => setIsMobileSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/60 md:hidden" />}

      {/* ========================================================= */}
      {/* MAIN VIEWPORT CONTAINER                                   */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ======================================================= */}
        {/* STICKY TOP NAVIGATION (HEIGHT: 76PX, GLASSMORPHISM)      */}
        {/* ======================================================= */}
        <header
          style={{
            height: '76px',
            backgroundColor: 'rgba(11, 31, 58, 0.90)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45)',
          }}
          className="sticky top-0 z-30 backdrop-blur-xl border-b px-5 sm:px-8 flex items-center justify-between gap-4 rounded-b-[20px]"
        >
          {/* Left: Sidebar Toggle + Title + Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              style={{ backgroundColor: 'rgba(0, 102, 204, 0.25)', borderColor: 'rgba(0, 212, 255, 0.3)', color: '#00D4FF' }}
              className="md:hidden p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <div>
              {/* Clean Breadcrumb Hierarchy: Dashboard > Recruitment > Applications */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-200/80">
                <button
                  type="button"
                  onClick={() => setActiveModule('dashboard')}
                  className="font-bold text-white hover:text-[#00D4FF] cursor-pointer"
                >
                  Dashboard
                </button>
                {activeModule !== 'dashboard' && (
                  <>
                    <span className="text-slate-400">&gt;</span>
                    <span className="font-semibold text-white capitalize">
                      {activeModule === 'leads' ? 'Lead Management' : activeModule === 'clients' ? 'Clients' : activeModule === 'recruitment' ? 'Recruitment' : activeModule}
                    </span>
                  </>
                )}
                {activeModule === 'recruitment' && (
                  <>
                    <span className="text-slate-400">&gt;</span>
                    <span className="text-[#00D4FF] font-bold capitalize">
                      {recruitmentQuickTab === 'jobs' ? 'Job Openings' : recruitmentQuickTab === 'applications' ? 'Applications' : recruitmentQuickTab === 'interviews' ? 'Interviews' : 'Email Applications'}
                    </span>
                  </>
                )}
              </div>

              <h1 className="font-display text-lg sm:text-xl font-extrabold text-white tracking-tight capitalize leading-none mt-0.5">
                {activeModule === 'dashboard'
                  ? 'Enterprise Performance Cockpit'
                  : activeModule === 'leads'
                    ? 'Website Enquiry & Lead Management'
                    : activeModule === 'clients'
                      ? 'Client Accounts & Contract Portfolio'
                      : activeModule === 'recruitment'
                        ? `Recruitment · ${recruitmentQuickTab === 'jobs' ? 'Job Openings' : recruitmentQuickTab === 'applications' ? 'Candidate Applications' : recruitmentQuickTab === 'interviews' ? 'Interview Schedules' : 'Email Applications'}`
                        : activeModule === 'calendar'
                          ? 'Schedule & Meetings Calendar'
                          : activeModule === 'reports'
                            ? 'Executive Reports & Analytics'
                            : activeModule === 'notifications'
                              ? 'System Activity & Notifications'
                              : activeModule === 'profile'
                                ? 'HR Desk Management (Renusri)'
                                : activeModule === 'settings'
                                  ? 'Careers CMS & System Settings'
                                  : `${activeModule} Cockpit`}
              </h1>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              style={{
                height: '44px',
                backgroundColor: 'rgba(14, 38, 70, 0.75)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
              }}
              className="w-full flex items-center justify-between px-4 border text-xs text-sky-100 hover:bg-[#102B54] hover:border-[#00D4FF] transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center gap-2.5 text-sky-200/80">
                <Search className="h-4 w-4 text-[#00D4FF]" />
                <span className="group-hover:text-white">Search clients, candidates, jobs, meetings...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-[#0B1F3A] border border-white/20 text-[10px] font-mono text-[#00D4FF] font-bold shadow-2xs">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* Right: DB Badge, Quick Actions, Notifications, Messages, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Supabase PostgreSQL Live Database Status Badge */}
            <div
              style={{
                height: '40px',
                backgroundColor: dbHealth?.status === 'connected' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                borderColor: dbHealth?.status === 'connected' ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)',
              }}
              onClick={() => {
                setIsDbSyncing(true);
                Promise.allSettled([
                  syncLeadsWithDatabase(),
                  syncApplicationsWithDatabase(),
                  syncInterviewsWithDatabase()
                ]).finally(() => {
                  setIsDbSyncing(false);
                  getDbHealth().then(setDbHealth);
                  showToast('Database synced with Supabase PostgreSQL!');
                });
              }}
              className="hidden lg:flex items-center gap-2 px-3 rounded-xl border text-[11px] font-mono cursor-pointer hover:bg-white/5 transition-all select-none shadow-xs group"
              title={`Supabase PostgreSQL | Host: ${dbHealth?.host || 'aws-0-ap-south-1.pooler.supabase.com'} | Database: ${dbHealth?.database || 'postgres'} | Click to manually re-sync`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dbHealth?.status === 'connected' ? 'bg-emerald-400 opacity-75' : 'bg-rose-400 opacity-75'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${dbHealth?.status === 'connected' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
              </span>
              <span className={`font-semibold ${dbHealth?.status === 'connected' ? 'text-emerald-300' : 'text-rose-300'}`}>
                {dbHealth?.status === 'connected' ? 'Supabase Live' : 'Supabase Offline'}
              </span>
              {dbHealth?.status === 'connected' && dbHealth.latencyMs !== undefined && (
                <span className="text-[10px] text-emerald-400/80">
                  {dbHealth.latencyMs}ms
                </span>
              )}
              {isDbSyncing ? (
                <span className="text-[11px] text-[#00D4FF] animate-spin">⟳</span>
              ) : (
                <span className="text-[10px] text-slate-400 group-hover:text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity">⟳</span>
              )}
            </div>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                style={{
                  height: '44px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)`,
                  color: PALETTE.white,
                  boxShadow: '0 4px 14px rgba(0, 102, 204, 0.28)',
                }}
                className="inline-flex items-center gap-2 px-4 font-bold text-xs hover:scale-105 active:scale-95 transition-all cursor-pointer text-white"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">+ Quick Action</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isQuickActionsOpen && (
                <div
                  style={{
                    backgroundColor: PALETTE.cards,
                    border: `1px solid ${PALETTE.borders}`,
                    borderRadius: '16px',
                    boxShadow: '0 15px 35px rgba(0, 102, 204, 0.15)',
                  }}
                  className="absolute right-0 mt-2 w-56 p-2 z-50 animate-in fade-in space-y-1 text-xs bg-[#0E2646] border border-white/15 rounded-2xl shadow-2xl backdrop-blur-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddClientModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Users className="h-4 w-4 text-[#00D4FF]" />
                    <span>+ Add Client Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateJobModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Briefcase className="h-4 w-4 text-[#00D4FF]" />
                    <span>+ Add Job Opening</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsScheduleInterviewModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <CalendarDays className="h-4 w-4 text-[#00D4FF]" />
                    <span>+ Schedule Meeting / Interview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (leads.length > 0) openHREmailForClient(leads[0]);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#00D4FF]" />
                    <span>Send HR Mail (Official)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Careers Inbound Email Shortcut */}
            <button
              type="button"
              onClick={() => {
                setActiveModule('recruitment');
                setRecruitmentQuickTab('emails');
              }}
              style={{
                height: '44px',
                width: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 102, 204, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
              className="border flex items-center justify-center hover:bg-[#0066CC]/30 text-[#00D4FF] transition-all cursor-pointer relative shadow-2xs"
              title="Careers Inbound Mail (hrhydgodavariwavetech@gmail.com)"
            >
              <Mail className="h-4 w-4 text-[#00D4FF]" />
              {unreadEmailsCount > 0 && (
                <span
                  style={{ backgroundColor: PALETTE.accent }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[9px] font-mono font-bold text-slate-900 flex items-center justify-center"
                >
                  {unreadEmailsCount}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => setActiveModule('notifications')}
              style={{
                height: '44px',
                width: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 102, 204, 0.2)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
              }}
              className="border flex items-center justify-center hover:bg-[#0066CC]/30 text-[#00D4FF] transition-all cursor-pointer relative shadow-2xs"
              title="System Notifications"
            >
              <Bell className="h-4 w-4 text-[#00D4FF]" />
              {unreadNotificationsCount > 0 && (
                <span
                  style={{ backgroundColor: '#EF4444' }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-[9px] font-mono font-bold text-white flex items-center justify-center animate-pulse"
                >
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Profile Section */}
            <div className="relative pl-1 sm:pl-2 border-l border-white/15">
              <button
                type="button"
                onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div
                  style={{ background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.accent} 100%)` }}
                  className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-xs shadow-sm"
                >
                  R
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-bold text-white">Renusri</p>
                  <p className="text-[10px] text-sky-300">HR Lead</p>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-300 hidden lg:block" />
              </button>

              {isUserProfileOpen && (
                <div
                  style={{
                    backgroundColor: '#0E2646',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.45)',
                  }}
                  className="absolute right-0 mt-2 w-64 p-3 z-50 animate-in fade-in space-y-2 text-xs backdrop-blur-xl"
                >
                  <div className="p-2 border-b border-white/10">
                    <p className="font-bold text-sm text-white">Renusri</p>
                    <p className="text-[11px] text-[#00D4FF] font-mono">hrhydgodavariwavetech@gmail.com</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#0066CC]/30 text-sky-200 font-mono text-[9px] font-bold border border-[#0066CC]/50">
                      Corporate Administrator
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('profile');
                      setIsUserProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <User className="h-4 w-4 text-[#00D4FF]" />
                    <span>My HR Profile Desk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('settings');
                      setIsUserProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-white font-semibold text-left cursor-pointer transition-colors"
                  >
                    <SettingsIcon className="h-4 w-4 text-[#00D4FF]" />
                    <span>Role Permissions & Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-rose-500/20 text-rose-300 font-semibold text-left cursor-pointer transition-colors"
                  >
                    <LogOut className="h-4 w-4 text-rose-400" />
                    <span>Sign Out & Lock Screen</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ======================================================= */}
        {/* CENTERED CONTENT VIEWPORT (MAX WIDTH: 1700PX)           */}
        {/* ======================================================= */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 space-y-8 max-w-[1700px] mx-auto w-full">
          {/* ===================================================== */}
          {/* MODULE: EXECUTIVE DASHBOARD                           */}
          {/* ===================================================== */}
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              {/* Page Title & Navigation Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                      Executive Overview
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Godavari Wave CRM & Talent System</span>
                  </div>
                  <h1 className="text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                    Enterprise Performance Cockpit
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModule('crm')}
                    className="h-11 px-5 rounded-xl border border-white/15 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-all cursor-pointer shadow-sm"
                  >
                    Open CRM Accounts →
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveModule('recruitment')}
                    className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    Open Recruitment Desk →
                  </button>
                </div>
              </div>

              {/* 8 Core Enterprise KPI Cards (34px Numbers, Sparklines, Hover Lift) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10px">
                {[
                  { key: 'all', title: 'Total Clients', value: clientKPIs.total, growth: '+18.4% MoM', icon: Users, spark: [12, 14, 18, 22, 26, 32] },
                  { key: 'active_leads', title: 'Active Leads', value: clientKPIs.activeLeads, growth: '+24.1% MoM', icon: Target, spark: [8, 12, 15, 17, 21, 25] },
                  { key: 'new', title: 'New Leads', value: clientKPIs.newLeads, growth: '+12.5% vs Q3', icon: Sparkles, spark: [5, 8, 9, 12, 14, 18] },
                  { key: 'revenue', title: 'Pipeline Revenue', value: formatINR(clientKPIs.revenue), growth: '+42.8% YoY', icon: TrendingUp, spark: [20, 35, 45, 60, 75, 95] },
                  { key: 'projects', title: 'Active Projects', value: leads.filter((l) => Boolean(l.project)).length || 8, growth: '99.4% on track', icon: FolderKanban, spark: [4, 5, 5, 6, 7, 8] },
                  { key: 'meetings', title: 'Meetings Booked', value: clientKPIs.meetings, growth: 'High Conversion', icon: CalendarDays, spark: [3, 4, 6, 7, 8, 10] },
                  { key: 'interviews', title: 'Interviews Scheduled', value: recruitmentKPIs.interviewsCount, growth: '4 Rounds / Day', icon: Video, spark: [2, 3, 5, 4, 6, 7] },
                  { key: 'applications', title: 'Talent Applications', value: recruitmentKPIs.totalApps, growth: '+31.2% this week', icon: GraduationCap, spark: [10, 16, 22, 28, 34, 42] },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  const isSelected = selectedClientKPICard === kpi.key;
                  return (
                    <div
                      key={kpi.key}
                      onClick={() => handleClientKPICardClick(kpi.key)}
                      className={cn(
                        'p-6 border rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group bg-[#0E2646] text-center flex flex-col items-center justify-center',
                        isSelected
                          ? 'border-[#00D4FF] shadow-lg shadow-cyan-500/20'
                          : 'border-white/12 shadow-sm'
                      )}
                    >
                      {/* Cyan/Blue Top Highlight */}
                      <div
                        className={cn(
                          'absolute top-0 inset-x-0 h-[3px] transition-all',
                          isSelected
                            ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF]'
                            : 'bg-white/10 group-hover:bg-[#00D4FF]'
                        )}
                      />

                      <div className="h-11 w-11 rounded-xl bg-[#0066CC]/20 text-[#38BDF8] flex items-center justify-center border border-[#0066CC]/30 mb-2">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-[14px] font-semibold text-slate-300 text-center">{kpi.title}</span>

                      <p className="mt-2 text-[34px] font-extrabold text-white font-display leading-none text-center">
                        {kpi.value}
                      </p>

                      <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center gap-2.5">
                        <span className="text-[12px] font-mono font-bold text-[#38BDF8] bg-[#0066CC]/20 border border-[#0066CC]/30 px-2 py-0.5 rounded-md text-center">
                          {kpi.growth}
                        </span>
                        {renderMiniSparkline(kpi.spark, isSelected ? '#00D4FF' : '#38BDF8')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Two-Column Enterprise Performance Widgets */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Client Pipeline & Recent Deals */}
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-4 mt-20px gap-20px">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Users className="h-5 w-5 text-[#38BDF8]" />
                      <h3 className="font-display font-bold text-base text-white">Client Relationship Stream</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModule('crm')}
                      className="text-xs font-mono font-bold text-[#38BDF8] hover:text-[#00D4FF] hover:underline"
                    >
                      View CRM Desk →
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 text-xs">
                    {leads.slice(0, 5).map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          setActiveModule('crm');
                          setDrawerClient(l);
                        }}
                        className="py-3.5 flex items-center justify-between hover:bg-white/5 px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="font-bold text-white truncate text-sm">{l.name}</p>
                          <p className="text-[12px] text-slate-300 truncate">{l.company || 'Enterprise Client'} · {l.service}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="font-mono font-extrabold text-[#38BDF8] text-sm">{formatINR(l.revenue)}</span>
                            <span className="block text-[10px] font-mono text-slate-400">{l.status}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openHREmailForClient(l);
                            }}
                            className="p-2 rounded-lg border border-white/15 bg-white/5 text-[#38BDF8] hover:bg-white/15 hover:text-white"
                            title="Send Email from HR"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Candidate Hiring Velocity */}
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="h-5 w-5 text-[#38BDF8]" />
                      <h3 className="font-display font-bold text-base text-white">Talent Acquisition Pipeline</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModule('recruitment')}
                      className="text-xs font-mono font-bold text-[#38BDF8] hover:text-[#00D4FF] hover:underline"
                    >
                      View Applications →
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 text-xs">
                    {applications.slice(0, 5).map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setActiveModule('recruitment');
                          setDrawerCandidate(app);
                        }}
                        className="py-3.5 flex items-center justify-between hover:bg-white/5 px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="font-bold text-white truncate text-sm">{app.name}</p>
                          <p className="text-[12px] text-slate-300 truncate">{app.position} · {app.experienceLevel}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="px-2.5 py-1 rounded-full bg-[#0066CC]/25 text-[#38BDF8] border border-[#0066CC]/40 text-[10px] font-mono font-bold">
                              {app.status}
                            </span>
                            <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                              {new Date(app.appliedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openHREmailForCandidate(app);
                            }}
                            className="p-2 rounded-lg border border-white/15 bg-white/5 text-[#38BDF8] hover:bg-white/15 hover:text-white"
                            title="Send Email from HR"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===================================================== */}
              {/* LIVE LEADSHEET CLIENT CONNECTS TABLE (MAIN DASHBOARD) */}
              {/* ===================================================== */}
              <div
                id="enterprise-leadsheet-table"
                className="p-6 sm:p-8 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-6"
              >
                {/* Header & Quick Action Buttons */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Leadsheet Sync Active
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-mono">Real-time Website Connects</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-white font-display mt-2 tracking-tight">
                      Leadsheet Client Connects & Deal Inflow
                    </h2>
                    <p className="text-sm text-slate-300 mt-1">
                      Direct stream of incoming client inquiries captured via the website Leadsheet Popup, Contact Page, and corporate inbound channels.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleAddTestLeadsheetConnect}
                      className="h-10 px-4 rounded-xl border border-white/20 bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      title="Simulate incoming website popup leadsheet connect"
                    >
                      <Sparkles className="h-4 w-4 text-[#38BDF8]" />
                      <span>+ Test Leadsheet Connect</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRestoreLeadsheetData}
                      className="h-10 px-3.5 rounded-xl border border-white/15 bg-white/5 text-slate-300 font-semibold text-xs hover:bg-white/10 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      title="Restore default enterprise sample leadsheet entries"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Reset / Seed</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        exportLeadsToCSV(filteredClients);
                        showToast(`Exported ${filteredClients.length} leadsheet records to CSV`);
                      }}
                      className="h-10 px-3.5 rounded-xl border border-white/15 bg-white/5 text-slate-300 font-bold text-xs hover:bg-white/10 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export CSV</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAddClientModalOpen(true)}
                      className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-110 transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    >
                      <Plus className="h-4 w-4" />
                      <span>+ New Client</span>
                    </button>
                  </div>
                </div>

                {/* Source Filter Tabs & Quick Category Selection */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {[
                      { id: 'All', label: 'All Inquiries', count: leads.length },
                      { id: 'Popup Form', label: 'Leadsheet Popup', count: leads.filter((l) => l.source === 'Popup Form').length },
                      { id: 'Contact Form', label: 'Contact Page', count: leads.filter((l) => l.source === 'Contact Form').length },
                      { id: 'Direct Entry', label: 'Direct Entry', count: leads.filter((l) => l.source === 'Direct Entry').length },
                    ].map((tab) => {
                      const isActive = clientSourceFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setClientSourceFilter(tab.id);
                            setClientCurrentPage(1);
                          }}
                          className={cn(
                            'px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap',
                            isActive
                              ? 'bg-[#0066CC] border-cyan-400/40 text-white shadow-md'
                              : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={cn(
                              'px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold',
                              isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300'
                            )}
                          >
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedClientKPICard !== 'all' && (
                      <span className="text-xs font-mono font-bold text-[#38BDF8] bg-[#0066CC]/25 px-3 py-1 rounded-lg border border-[#0066CC]/40 flex items-center gap-1.5">
                        Filter: {selectedClientKPICard.replace('_', ' ').toUpperCase()}
                        <button
                          type="button"
                          onClick={() => handleClientKPICardClick('all')}
                          className="hover:text-red-400 font-bold ml-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    )}
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Search Bar */}
                  <div className="relative sm:col-span-2">
                    <Search className="h-4 w-4 text-[#38BDF8] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search company, client, email, phone, or service requirement..."
                      value={clientSearchQuery}
                      onChange={(e) => {
                        setClientSearchQuery(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full h-11 pl-10 pr-4 text-xs rounded-xl border border-white/15 bg-[#07182E] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 font-medium"
                    />
                    {clientSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setClientSearchQuery('')}
                        className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Status Filter */}
                  <div>
                    <select
                      value={clientStatusFilter}
                      onChange={(e) => {
                        setClientStatusFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full h-11 px-3 text-xs rounded-xl border border-white/15 bg-[#07182E] text-white font-medium focus:outline-none focus:border-cyan-400"
                    >
                      <option value="All">All Pipeline Statuses</option>
                      <option value="New">New Inquiries</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Negotiation">In Negotiation</option>
                      <option value="Converted">Converted (Won Clients)</option>
                      <option value="Lost">Lost / Archived</option>
                    </select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <select
                      value={clientSortBy}
                      onChange={(e) => {
                        setClientSortBy(e.target.value as any);
                        setClientCurrentPage(1);
                      }}
                      className="w-full h-11 px-3 text-xs rounded-xl border border-white/15 bg-[#07182E] text-white font-medium focus:outline-none focus:border-cyan-400"
                    >
                      <option value="newest">Newest Inbound First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest_revenue">Highest Deal Value</option>
                      <option value="lowest_revenue">Lowest Deal Value</option>
                      <option value="priority">Priority Score</option>
                    </select>
                  </div>
                </div>

                {/* The Leadsheet Connects Table */}
                <div className="border border-white/15 rounded-2xl overflow-hidden shadow-2xl bg-[#07182E]/60">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#07182E] border-b border-white/10 text-slate-300 font-bold">
                          <th className="py-3 px-4 w-10">
                            <input
                              type="checkbox"
                              checked={isAllClientsSelected}
                              onChange={toggleSelectAllClients}
                              className="rounded text-[#0066CC] cursor-pointer"
                            />
                          </th>
                          <th className="py-3 px-4">Lead ID</th>
                          <th className="py-3 px-4">Company & Client</th>
                          <th className="py-3 px-4">Contact Details</th>
                          <th className="py-3 px-4">Service Scope</th>
                          <th className="py-3 px-4">Lead Source</th>
                          <th className="py-3 px-4">Deal Value</th>
                          <th className="py-3 px-4 text-center">Pipeline Status</th>
                          <th className="py-3 px-4">Follow-up</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 font-medium text-white">
                        {paginatedClients.length === 0 ? (
                          <tr>
                            <td colSpan={10} className="py-12 text-center text-slate-400">
                              <p className="font-semibold text-sm">No client leadsheet records found matching criteria.</p>
                              <p className="text-xs text-slate-500 mt-1">Try resetting the filter tabs or click "+ Test Leadsheet Connect" above.</p>
                            </td>
                          </tr>
                        ) : (
                          paginatedClients.map((client) => {
                            const isSelected = selectedClientIds.includes(client.id);
                            return (
                              <tr
                                key={client.id}
                                onClick={() => setDrawerClient(client)}
                                className={cn(
                                  'hover:bg-white/5 cursor-pointer transition-colors',
                                  isSelected ? 'bg-[#0066CC]/20' : ''
                                )}
                              >
                                <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelectClientRow(client.id)}
                                    className="rounded text-[#0066CC] cursor-pointer"
                                  />
                                </td>
                                <td className="py-3.5 px-4 font-mono font-bold text-[#38BDF8]">
                                  {client.id}
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-lg bg-[#0066CC]/30 text-[#38BDF8] border border-[#0066CC]/40 font-bold flex items-center justify-center shrink-0">
                                      {(client.company || client.name).charAt(0)}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="font-bold text-white truncate">{client.company || client.name}</p>
                                      <p className="text-[11px] text-slate-300 truncate">{client.name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-[11px]">
                                  <p className="text-white truncate">{client.email}</p>
                                  <p className="text-slate-400">{client.phone}</p>
                                </td>
                                <td className="py-3.5 px-4">
                                  <p className="font-semibold text-[#38BDF8]">{client.service}</p>
                                  <p className="text-[11px] text-slate-400">{client.industry || 'Technology & IT'}</p>
                                </td>
                                <td className="py-3.5 px-4">
                                  {client.source === 'Popup Form' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono text-[10px] font-bold">
                                      <Sparkles className="h-2.5 w-2.5" />
                                      Leadsheet Popup
                                    </span>
                                  )}
                                  {client.source === 'Contact Form' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono text-[10px] font-bold">
                                      <FileSpreadsheet className="h-2.5 w-2.5" />
                                      Contact Page
                                    </span>
                                  )}
                                  {client.source === 'Direct Entry' && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-white/10 font-mono text-[10px] font-bold">
                                      Direct Inbound
                                    </span>
                                  )}
                                  {!['Popup Form', 'Contact Form', 'Direct Entry'].includes(client.source) && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-white/10 font-mono text-[10px] font-bold">
                                      {client.source}
                                    </span>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 font-mono font-extrabold text-white">
                                  {formatINR(client.revenue)}
                                </td>
                                <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                  <select
                                    value={client.status}
                                    onChange={(e) => {
                                      updateLead(client.id, { status: e.target.value as any });
                                      refreshAllData();
                                      showToast(`Updated status of ${client.name} to ${e.target.value}`);
                                    }}
                                    className="px-2.5 py-1 rounded-full border border-white/20 bg-[#07182E] text-[10px] font-mono font-bold text-[#38BDF8] cursor-pointer focus:outline-none"
                                  >
                                    <option value="New">New</option>
                                    <option value="In Discussion">In Discussion</option>
                                    <option value="Proposal Sent">Proposal Sent</option>
                                    <option value="Negotiation">Negotiation</option>
                                    <option value="Converted">Converted (Won)</option>
                                    <option value="Lost">Lost</option>
                                    <option value="Archived">Archived</option>
                                  </select>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                                  {client.nextFollowUp ? new Date(client.nextFollowUp).toLocaleDateString('en-IN') : 'No follow-up'}
                                </td>
                                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      type="button"
                                      onClick={() => openHREmailForClient(client)}
                                      className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-[#38BDF8] hover:bg-white/15 hover:text-white"
                                      title="Send Email from HR"
                                    >
                                      <Mail className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDrawerClient(client)}
                                      className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
                                      title="View Full Profile"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (window.confirm(`Delete client record for ${client.name}?`)) {
                                          deleteLead(client.id);
                                          refreshAllData();
                                          showToast('Lead deleted');
                                        }
                                      }}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                                      title="Delete"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Footer */}
                  <div className="p-4 border-t border-white/10 bg-[#07182E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400 font-mono">
                      Showing {paginatedClients.length} of {filteredClients.length} client connects
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={clientCurrentPage <= 1}
                        onClick={() => setClientCurrentPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-white/10"
                      >
                        Previous
                      </button>
                      <span className="font-mono text-[#38BDF8] font-bold">
                        Page {clientCurrentPage} of {clientTotalPages}
                      </span>
                      <button
                        type="button"
                        disabled={clientCurrentPage >= clientTotalPages}
                        onClick={() => setClientCurrentPage((p) => Math.min(clientTotalPages, p + 1))}
                        className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-white/10"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: WEBSITE ENQUIRY & LEAD MANAGEMENT             */}
          {/* ===================================================== */}
          {(activeModule === 'leads' || (activeModule === 'crm' && crmQuickTab === 'leads')) && (
            <div id="enterprise-lead-management-section" className="space-y-6">
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                      Website Inbound Stream
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Real-time Homepage Popup & Inquiries</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                    Website Enquiry & Lead Management
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Every enquiry from the website popup lead form and contact page appears here instantly for HR qualification and client conversion.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddTestLeadsheetConnect}
                    className="px-4 py-2.5 rounded-xl border border-[#00D4FF]/40 bg-[#0066CC]/25 text-[#00D4FF] hover:bg-[#0066CC]/40 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    title="Simulate a real-time website popup inquiry"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>+ Test Popup Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      exportLeadsToCSV(filteredClients);
                      showToast(`Exported ${filteredClients.length} leads to CSV`);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white hover:opacity-95 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0066CC]/25"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Lead</span>
                  </button>
                </div>
              </div>

              {/* 4 KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Total Enquiries', val: clientKPIs.total, sub: 'All inquiries logged', icon: Users, color: '#38BDF8' },
                  { label: 'New Website Leads', val: clientKPIs.newLeads, sub: 'Needs HR outreach', icon: Sparkles, color: '#00D4FF' },
                  { label: 'In Discussion', val: clientKPIs.qualified, sub: 'Qualified prospects', icon: Target, color: '#60A5FA' },
                  { label: 'Converted to Clients', val: clientKPIs.won, sub: 'Closed corporate deals', icon: CheckCircle2, color: '#34D399' },
                ].map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div
                      key={i}
                      style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                      className="p-5 rounded-2xl border shadow-lg relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all text-center flex flex-col items-center justify-center"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] mb-2.5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase text-center">{k.label}</span>
                      <p className="mt-2 text-3xl font-extrabold text-white font-display text-center leading-none">{k.val}</p>
                      <p className="text-[11px] text-slate-400 mt-1.5 text-center">{k.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Filter Tabs Bar (All, New, In Discussion, Proposal Sent, Negotiation, Converted, Lost) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10">
                {[
                  { id: 'All', label: 'All Leads', count: leads.length },
                  { id: 'New', label: 'New', count: leads.filter(l => l.status === 'New').length },
                  { id: 'In Discussion', label: 'In Discussion', count: leads.filter(l => l.status === 'In Discussion').length },
                  { id: 'Proposal Sent', label: 'Proposal Sent', count: leads.filter(l => l.status === 'Proposal Sent').length },
                  { id: 'Negotiation', label: 'Negotiation', count: leads.filter(l => l.status === 'Negotiation').length },
                  { id: 'Converted', label: 'Converted (Won)', count: leads.filter(l => l.status === 'Converted').length },
                  { id: 'Lost', label: 'Lost / Archived', count: leads.filter(l => l.status === 'Lost' || l.status === 'Archived').length },
                ].map((tab) => {
                  const isActive = leadFilterTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setLeadFilterTab(tab.id);
                        setClientCurrentPage(1);
                      }}
                      className={cn(
                        'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer',
                        isActive
                          ? 'bg-[#0066CC] text-white shadow-md'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                      )}
                    >
                      <span>{tab.label}</span>
                      <span className={cn('px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold', isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-300')}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Filter Controls */}
              <div
                style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                className="p-5 rounded-2xl border shadow-lg space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="relative sm:col-span-2">
                    <Search className="h-4 w-4 text-[#00D4FF] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search lead ID, client name, company, email, phone, city..."
                      value={clientSearchQuery}
                      onChange={(e) => {
                        setClientSearchQuery(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#08182D] text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                    />
                    {clientSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setClientSearchQuery('')}
                        className="absolute right-3 top-3 text-slate-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div>
                    <select
                      value={clientSourceFilter}
                      onChange={(e) => {
                        setClientSourceFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-white/15 bg-[#08182D] text-xs text-white font-medium focus:outline-none focus:border-[#00D4FF] cursor-pointer"
                    >
                      <option value="All">All Inbound Sources</option>
                      <option value="Website Popup">Website Popup Form</option>
                      <option value="Contact Form">Contact Page Form</option>
                      <option value="Direct Entry">Direct Entry / Referral</option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={clientPriorityFilter}
                      onChange={(e) => {
                        setClientPriorityFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-white/15 bg-[#08182D] text-xs text-white font-medium focus:outline-none focus:border-[#00D4FF] cursor-pointer"
                    >
                      <option value="All">All Priorities</option>
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bulk Actions Bar */}
              {selectedClientIds.length > 0 && (
                <div className="p-3.5 rounded-xl border border-[#00D4FF]/30 bg-[#0066CC]/20 flex items-center justify-between gap-4 animate-in fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF]">
                    <CheckSquare className="h-4 w-4" />
                    <span>{selectedClientIds.length} Leads Selected</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        selectedClientIds.forEach(id => convertLeadToClient(id));
                        refreshAllData();
                        showToast(`Converted ${selectedClientIds.length} leads to Won Clients!`);
                        setSelectedClientIds([]);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-colors"
                    >
                      Convert to Clients
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        bulkUpdateLeads(selectedClientIds, { status: 'In Discussion' });
                        refreshAllData();
                        showToast(`Marked ${selectedClientIds.length} leads as Contacted`);
                        setSelectedClientIds([]);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer transition-colors"
                    >
                      Mark Contacted
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete ${selectedClientIds.length} selected leads?`)) {
                          bulkDeleteLeads(selectedClientIds);
                          refreshAllData();
                          showToast('Deleted selected leads');
                          setSelectedClientIds([]);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer transition-colors"
                    >
                      Delete Selected
                    </button>
                  </div>
                </div>
              )}

              {/* Data Table */}
              <div
                style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                className="border rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#07172E] border-b border-white/15 text-white font-bold">
                        <th className="py-3.5 px-4 w-10">
                          <input
                            type="checkbox"
                            checked={isAllClientsSelected}
                            onChange={toggleSelectAllClients}
                            className="rounded text-[#0066CC] cursor-pointer"
                          />
                        </th>
                        <th className="py-3.5 px-4 font-mono">Lead ID</th>
                        <th className="py-3.5 px-4">Company & Client</th>
                        <th className="py-3.5 px-4">Contact (Email & Phone)</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Service Interested</th>
                        <th className="py-3.5 px-4 font-mono">Budget</th>
                        <th className="py-3.5 px-4">Message</th>
                        <th className="py-3.5 px-4">Date & Time</th>
                        <th className="py-3.5 px-4 text-center">Source</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-center">Priority</th>
                        <th className="py-3.5 px-4">Assigned</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium text-white">
                      {paginatedClients.length === 0 ? (
                        <tr>
                          <td colSpan={14} className="py-12 text-center text-slate-400">
                            No lead records matching the current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        paginatedClients.map((client) => {
                          const isSelected = selectedClientIds.includes(client.id);
                          const { date, time } = formatLeadDateTime(client.submittedAt);
                          return (
                            <tr
                              key={client.id}
                              onClick={() => setDrawerClient(client)}
                              className={cn(
                                'hover:bg-[#123157]/60 cursor-pointer transition-colors',
                                isSelected ? 'bg-[#0066CC]/25' : ''
                              )}
                            >
                              <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleSelectClientRow(client.id)}
                                  className="rounded text-[#0066CC] cursor-pointer"
                                />
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-[#00D4FF]">
                                {client.id}
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="h-8 w-8 rounded-lg bg-[#0066CC]/30 border border-[#0066CC]/40 text-[#00D4FF] font-bold flex items-center justify-center shrink-0">
                                    {(client.company || client.name).charAt(0)}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="font-bold text-white truncate max-w-[140px]">{client.company || client.name}</p>
                                    <p className="text-[11px] text-slate-300 truncate max-w-[140px]">{client.name}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px]">
                                <p className="text-white truncate max-w-[150px]">{client.email}</p>
                                <p className="text-slate-300">{client.phone}</p>
                              </td>
                              <td className="py-3.5 px-4 text-slate-300">
                                <p className="truncate max-w-[110px]">{client.city || 'Hyderabad'}</p>
                                <p className="text-[10px] text-slate-400 font-mono">{client.state || 'Telangana'}, {client.country || 'India'}</p>
                              </td>
                              <td className="py-3.5 px-4">
                                <span className="font-semibold text-sky-200 block truncate max-w-[130px]">{client.service}</span>
                              </td>
                              <td className="py-3.5 px-4 font-mono font-extrabold text-[#00D4FF]">
                                {formatINR(client.revenue)}
                              </td>
                              <td className="py-3.5 px-4 max-w-[160px]">
                                <p className="text-slate-300 text-[11px] truncate" title={client.message}>
                                  {client.message || 'Website inquiry received.'}
                                </p>
                              </td>
                              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                                <p className="text-white font-semibold">{date}</p>
                                <p className="text-slate-400 text-[10px]">{time}</p>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/40 whitespace-nowrap">
                                  {client.source || 'Website Popup'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={client.status}
                                  onChange={(e) => {
                                    updateLead(client.id, { status: e.target.value as any });
                                    refreshAllData();
                                    showToast(`Updated status of ${client.name} to ${e.target.value}`);
                                  }}
                                  className={cn('px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold cursor-pointer focus:outline-none bg-[#07182E]', getStatusBadge(client.status))}
                                >
                                  <option value="New">New</option>
                                  <option value="In Discussion">In Discussion</option>
                                  <option value="Proposal Sent">Proposal Sent</option>
                                  <option value="Negotiation">Negotiation</option>
                                  <option value="Converted">Converted</option>
                                  <option value="Lost">Lost</option>
                                </select>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border', getPriorityBadge(client.priority))}>
                                  {client.priority}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-slate-300 font-medium">
                                {client.assignedTo || 'Renusri'}
                              </td>
                              <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1.5">
                                  {client.status !== 'Converted' && (
                                    <button
                                      type="button"
                                      onClick={() => handleConvertToClient(client)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition-colors whitespace-nowrap shadow-xs"
                                      title="Convert to Won Client"
                                    >
                                      Convert
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => openHREmailForClient(client)}
                                    className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-[#00D4FF] hover:bg-white/15 transition-colors"
                                    title="Send Official Email from HR (hrhydgodavariwavetech@gmail.com)"
                                  >
                                    <Mail className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setDrawerClient(client)}
                                    className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/15 transition-colors"
                                    title="View Full Inquiry"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Delete lead record for ${client.name}?`)) {
                                        deleteLead(client.id);
                                        refreshAllData();
                                        showToast('Lead deleted');
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Footer */}
                <div className="p-4 border-t border-white/10 bg-[#07172E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 font-mono">
                    Showing {paginatedClients.length} of {filteredClients.length} leads
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={clientCurrentPage <= 1}
                      onClick={() => setClientCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-white/10"
                    >
                      Previous
                    </button>
                    <span className="font-mono text-[#00D4FF] font-bold">
                      Page {clientCurrentPage} of {clientTotalPages}
                    </span>
                    <button
                      type="button"
                      disabled={clientCurrentPage >= clientTotalPages}
                      onClick={() => setClientCurrentPage((p) => Math.min(clientTotalPages, p + 1))}
                      className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-white/10"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: CLIENT ACCOUNTS & COMMERCIAL CONTRACTS        */}
          {/* ===================================================== */}
          {(activeModule === 'clients' || (activeModule === 'crm' && crmQuickTab === 'clients')) && (
            <div id="enterprise-clients-directory-section" className="space-y-6">
              {/* Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold uppercase">
                      Enterprise Client Accounts
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Active Commercial Contracts & Billing</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                    Won Clients & Commercial Contracts
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Directory of corporate clients converted from leads, contract deliverables, GST/PAN compliance, and commercial billing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      exportLeadsToCSV(leads.filter(l => l.status === 'Converted'), 'Godavari_Wave_Won_Clients');
                      showToast('Exported won clients to CSV');
                    }}
                    className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export Clients CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white hover:opacity-95 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0066CC]/25"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Client Account</span>
                  </button>
                </div>
              </div>

              {/* 4 Summary KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Won Corporate Clients', val: leads.filter(l => l.status === 'Converted').length, sub: 'Active accounts', icon: Award, color: '#34D399' },
                  { label: 'Active Projects', val: leads.filter(l => l.status === 'Converted' && l.project).length || 6, sub: 'Milestone deliverables', icon: FolderKanban, color: '#38BDF8' },
                  { label: 'Total Contract Value', val: formatINR(leads.filter(l => l.status === 'Converted').reduce((s, l) => s + (l.revenue || 0), 0)), sub: 'Signed deal volume', icon: TrendingUp, color: '#00D4FF' },
                  { label: 'Invoiced Billing', val: formatINR(leads.filter(l => l.status === 'Converted').reduce((s, l) => s + (l.revenue || 0), 0) * 0.85), sub: 'Commercial billings', icon: FileText, color: '#818CF8' },
                ].map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div
                      key={i}
                      style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                      className="p-5 rounded-2xl border shadow-lg relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all text-center flex flex-col items-center justify-center"
                    >
                      <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] mb-2.5">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase text-center">{k.label}</span>
                      <p className="mt-2 text-3xl font-extrabold text-white font-display text-center leading-none">{k.val}</p>
                      <p className="text-[11px] text-slate-400 mt-1.5 text-center">{k.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Search & Industry Filter */}
              <div
                style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                className="p-5 rounded-2xl border shadow-lg space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="relative sm:col-span-2">
                    <Search className="h-4 w-4 text-[#00D4FF] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search company, contact person, designation, GST, PAN, or website..."
                      value={clientSearchQuery}
                      onChange={(e) => {
                        setClientSearchQuery(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#08182D] text-xs text-white placeholder-slate-400 font-medium focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                    />
                  </div>

                  <div>
                    <select
                      value={clientIndustryFilter}
                      onChange={(e) => {
                        setClientIndustryFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-white/15 bg-[#08182D] text-xs text-white font-medium focus:outline-none focus:border-[#00D4FF] cursor-pointer"
                    >
                      <option value="All">All Industries</option>
                      <option value="Technology & IT">Technology & IT</option>
                      <option value="Finance & Banking">Finance & Banking</option>
                      <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                      <option value="Education & EdTech">Education & EdTech</option>
                      <option value="Retail & E-Commerce">Retail & E-Commerce</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Clients Table */}
              <div
                style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                className="border rounded-2xl shadow-xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#07172E] border-b border-white/15 text-white font-bold">
                        <th className="py-3.5 px-4">Company</th>
                        <th className="py-3.5 px-4">Contact Person</th>
                        <th className="py-3.5 px-4">Email & Phone</th>
                        <th className="py-3.5 px-4">Industry & Website</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4 font-mono">GST & PAN</th>
                        <th className="py-3.5 px-4">Active Project</th>
                        <th className="py-3.5 px-4 font-mono">Contract Value</th>
                        <th className="py-3.5 px-4 text-center">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium text-white">
                      {leads.filter(l => l.status === 'Converted').length === 0 ? (
                        <tr>
                          <td colSpan={10} className="py-12 text-center text-slate-400">
                            No converted clients yet. Convert a lead from the Lead Management tab to see it here!
                          </td>
                        </tr>
                      ) : (
                        leads.filter(l => l.status === 'Converted').map((cl) => (
                          <tr
                            key={cl.id}
                            onClick={() => setDrawerClient(cl)}
                            className="hover:bg-[#123157]/60 cursor-pointer transition-colors"
                          >
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0066CC] to-[#00D4FF] text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                                  {(cl.company || cl.name).charAt(0)}
                                </div>
                                <div>
                                  <p className="font-bold text-white text-sm">{cl.company || cl.name}</p>
                                  <p className="text-[10px] font-mono text-[#00D4FF]">ID: {cl.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="font-semibold text-white">{cl.name}</p>
                              <p className="text-[11px] text-slate-300">{cl.designation || 'Director / Owner'}</p>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              <p className="text-white truncate max-w-[150px]">{cl.email}</p>
                              <p className="text-slate-300">{cl.phone}</p>
                            </td>
                            <td className="py-3.5 px-4">
                              <p className="text-sky-200 font-semibold">{cl.industry || 'Technology'}</p>
                              <a
                                href={cl.website || '#'}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-[10px] text-[#00D4FF] hover:underline flex items-center gap-1 font-mono"
                              >
                                <span>{cl.website ? cl.website.replace(/^https?:\/\//, '') : 'godavariwave.com'}</span>
                                <ExternalLink className="h-2.5 w-2.5" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              <p>{cl.city || 'Hyderabad'}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{cl.state || 'Telangana'}, {cl.country || 'India'}</p>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">
                              <p><span className="text-slate-400">GST:</span> {cl.gst || '36AAACG1234F1Z5'}</p>
                              <p><span className="text-slate-400">PAN:</span> {cl.pan || 'AAACG1234F'}</p>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-white block">{cl.project || cl.service}</span>
                              <span className="text-[10px] text-emerald-300 font-mono">Stage: Active Delivery</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono font-extrabold text-[#00D4FF] text-sm">
                              {formatINR(cl.revenue)}
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                                Active Client
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openHREmailForClient(cl)}
                                  className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-[#00D4FF] hover:bg-white/15"
                                  title="Send Email from HR"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDrawerClient(cl)}
                                  className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-white hover:bg-white/15"
                                  title="View Full Profile Drawer"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm(`Delete client record for ${cl.name}?`)) {
                                      deleteLead(cl.id);
                                      refreshAllData();
                                      showToast('Client deleted');
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                                  title="Delete"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: CRM OVERVIEW & PIPELINE KANBAN                */}
          {/* ===================================================== */}
          {(activeModule === 'crm' && crmQuickTab !== 'leads' && crmQuickTab !== 'clients') && (
            <div id="enterprise-crm-table-section" className="space-y-8">
              {/* Module Header & Quick Switch Tabs */}
              <div className="space-y-4 pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase">Enterprise CRM</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-semibold">Deal Pipeline & Visual Board</span>
                    </div>
                    <h2 className="text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                      CRM Pipeline & Opportunity Flow
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddClientModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white hover:opacity-95 text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>+ Add Deal Lead</span>
                    </button>
                  </div>
                </div>

                {/* CRM Quick Switch Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 border-t border-white/10 pt-3">
                  {[
                    { id: 'overview', label: 'CRM Overview & Kanban' },
                    { id: 'leads', label: 'All Leads Sheet' },
                    { id: 'clients', label: 'Won Clients Directory' },
                    { id: 'meetings', label: 'Scheduled Demos' },
                    { id: 'followups', label: 'Pending Follow-ups' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setCrmQuickTab(tab.id as CRMQuickTab);
                        setSelectedClientKPICard('all');
                      }}
                      className={cn(
                        'px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap rounded-t-lg',
                        crmQuickTab === tab.id
                          ? 'bg-[#0066CC]/30 text-[#00D4FF] border-b-2 border-[#00D4FF]'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pipeline Kanban View */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['New', 'In Discussion', 'Proposal Sent', 'Converted'].map((st) => (
                  <div key={st} style={{ backgroundColor: '#07182E', borderColor: 'rgba(255, 255, 255, 0.12)' }} className="p-4 rounded-2xl border space-y-3 shadow-lg">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="font-display font-bold text-sm text-white">{st}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[10px] font-mono font-bold text-[#00D4FF]">
                        {leads.filter((l) => l.status === st).length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {leads.filter((l) => l.status === st).map((cl) => (
                        <div
                          key={cl.id}
                          onClick={() => setDrawerClient(cl)}
                          style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                          className="p-4 border shadow-md hover:border-[#00D4FF]/40 transition-all cursor-pointer space-y-2 rounded-xl"
                        >
                          <p className="font-bold text-xs text-white">{cl.name}</p>
                          <p className="text-[11px] text-slate-300">{cl.company || 'Direct Client'} · {cl.service}</p>
                          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono font-bold text-[11px] text-[#00D4FF]">{formatINR(cl.revenue)}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openHREmailForClient(cl);
                              }}
                              className="text-[10px] font-bold text-[#38BDF8] hover:underline cursor-pointer"
                            >
                              Email →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ===================================================== */}
          {/* MODULE: RECRUITMENT & TALENT ACQUISITION              */}
          {/* ===================================================== */}
          {activeModule === 'recruitment' && (
            <div className="space-y-8">
              {/* Header & Quick Switch Tabs */}
              <div className="space-y-4 pb-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase">Talent Management</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-semibold">Recruitment Desk & Interview Schedules</span>
                    </div>
                    <h2 className="text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                      Candidate Pipeline & Open Positions
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsScheduleInterviewModalOpen(true)}
                      className="h-11 px-4 rounded-xl border border-white/15 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      <Video className="h-4 w-4 text-[#38BDF8]" />
                      <span>Book Interview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreateJobModalOpen(true)}
                      className="h-11 px-5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-blue-500/20 flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>+ Create Job Opening</span>
                    </button>
                  </div>
                </div>

                {/* Recruitment Quick Switch Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-white/10 pt-3">
                  {[
                    { id: 'jobs', label: 'Job Openings' },
                    { id: 'applications', label: 'Candidate Applications' },
                    { id: 'interviews', label: 'Interview Pipeline' },
                    { id: 'candidates', label: 'Shortlisted Pool' },
                    { id: 'calendar', label: 'Interview Calendar' },
                    { id: 'emails', label: 'Careers Inbox (careers@)' },
                  ].map((tab) => {
                    const isActive = recruitmentQuickTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setRecruitmentQuickTab(tab.id as RecruitmentQuickTab)}
                        className={cn(
                          'px-4 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap rounded-xl border',
                          isActive
                            ? 'bg-[#0066CC] text-white border-cyan-400/40 shadow-md'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border-white/10'
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recruitment KPI Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Published Jobs', val: recruitmentKPIs.openJobsCount, icon: Briefcase },
                  { label: 'Total Applicants', val: recruitmentKPIs.totalApps, icon: GraduationCap },
                  { label: 'Shortlisted', val: recruitmentKPIs.shortlistedCount, icon: UserCheck },
                  { label: 'Interviews Booked', val: recruitmentKPIs.interviewsCount, icon: Video },
                  { label: 'Offers Released', val: recruitmentKPIs.offeredCount, icon: Award },
                  { label: 'Hired & Onboarded', val: recruitmentKPIs.hiredCount, icon: CheckCircle2 },
                ].map((k, idx) => {
                  const Icon = k.icon;
                  return (
                    <div key={idx} className="p-4 border border-white/15 rounded-2xl bg-[#0E2646] shadow-lg space-y-1 text-center flex flex-col items-center justify-center">
                      <div className="h-8 w-8 rounded-lg bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 flex items-center justify-center mb-1">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase text-center">{k.label}</span>
                      <p className="mt-1 text-2xl font-extrabold text-white font-display text-center leading-none">{k.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Tab 1: Applications */}
              {(recruitmentQuickTab === 'applications' || recruitmentQuickTab === 'candidates') && (
                <div className="border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#07182E] border-b border-white/10 text-slate-300 font-bold">
                          <th className="py-3.5 px-4">Candidate ID</th>
                          <th className="py-3.5 px-4">Candidate Name</th>
                          <th className="py-3.5 px-4">Applied Position</th>
                          <th className="py-3.5 px-4">Experience</th>
                          <th className="py-3.5 px-4 text-center">Status / Stage</th>
                          <th className="py-3.5 px-4">Recruiter</th>
                          <th className="py-3.5 px-4">Applied Date</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 font-medium text-white">
                        {filteredApplications.map((app) => (
                          <tr
                            key={app.id}
                            onClick={() => setDrawerCandidate(app)}
                            className="hover:bg-white/5 cursor-pointer transition-colors"
                          >
                            <td className="py-3.5 px-4 font-mono font-bold text-[#38BDF8]">{app.candidateId}</td>
                            <td className="py-3.5 px-4">
                              <p className="font-bold text-white">{app.name}</p>
                              <p className="text-[11px] text-slate-300 font-mono">{app.email} · {app.phone}</p>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#38BDF8]">{app.position}</td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">{app.experienceLevel} {app.experienceYears ? `(${app.experienceYears})` : ''}</td>
                            <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={app.status}
                                onChange={(e) => {
                                  updateApplication(app.id, { status: e.target.value as any });
                                  refreshAllData();
                                  showToast(`Candidate status updated to ${e.target.value}`);
                                }}
                                className="px-2.5 py-1 rounded-full border border-white/20 bg-[#07182E] text-[10px] font-mono font-bold text-[#38BDF8] cursor-pointer focus:outline-none"
                              >
                                <option value="New">New</option>
                                <option value="Reviewing">Reviewing</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Offered">Offered</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-slate-200 font-semibold">{app.assignedRecruiter}</td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                              {new Date(app.appliedDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                            </td>
                            <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openHREmailForCandidate(app)}
                                  className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-[#38BDF8] hover:bg-white/15 hover:text-white"
                                  title="Send Email from HR (hrhydgodavariwavetech@gmail.com)"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setInterviewApplication(app);
                                    setIsScheduleInterviewModalOpen(true);
                                  }}
                                  className="px-2.5 py-1 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white text-[10px] font-bold"
                                >
                                  Interview
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDrawerCandidate(app)}
                                  className="p-1.5 rounded-lg border border-white/15 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 2: Job Openings */}
              {recruitmentQuickTab === 'jobs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl hover:shadow-2xl transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 text-[10px] font-mono font-bold">
                          {job.category} · {job.level}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono text-[10px] font-bold">
                          {job.status}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white">{job.title}</h3>
                      <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono">{job.openings} Openings</span>
                        <span className="font-mono font-bold text-[#38BDF8]">{job.applicantsCount || 0} Candidates</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Interviews Pipeline */}
              {recruitmentQuickTab === 'interviews' && (
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="font-display font-bold text-base text-white">Scheduled Technical & HR Evaluations</h3>
                    <button
                      type="button"
                      onClick={() => setIsScheduleInterviewModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white text-xs font-bold hover:brightness-110 shadow-md"
                    >
                      + Book Interview
                    </button>
                  </div>

                  <div className="divide-y divide-white/10 text-xs">
                    {interviews.map((int) => (
                      <div key={int.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{int.candidateName}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#0066CC]/25 text-[#38BDF8] border border-[#0066CC]/40 font-mono text-[10px] font-bold">
                              {int.round}
                            </span>
                          </div>
                          <p className="text-slate-300">{int.position} · Evaluator: <span className="font-semibold text-[#38BDF8]">{int.interviewer}</span></p>
                          <p className="font-mono text-[11px] text-slate-400">{new Date(int.dateTime).toLocaleString('en-IN')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={int.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold flex items-center gap-2 hover:brightness-110 shadow-md cursor-pointer"
                          >
                            <Video className="h-4 w-4" />
                            <span>Join ({int.platform})</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete scheduled interview for ${int.candidateName}?`)) {
                                deleteInterview(int.id);
                                refreshAllData();
                                showToast(`Interview for ${int.candidateName} deleted`);
                              }
                            }}
                            className="px-3 py-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs shadow-xs"
                            title="Delete Interview"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                    {interviews.length === 0 && (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <Video className="h-10 w-10 mx-auto text-slate-500 opacity-40" />
                        <p className="font-bold text-sm text-slate-300">No scheduled interviews found</p>
                        <p className="text-xs text-slate-400">Click &ldquo;+ Book Interview&rdquo; above to schedule technical or HR evaluations.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Careers Inbound Email Center */}
              {recruitmentQuickTab === 'emails' && (
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <h3 className="font-display font-bold text-base text-white">Inbound Talent Inbox (hrhydgodavariwavetech)</h3>
                      <p className="text-xs text-slate-300">Incoming resumes submitted directly to our official talent mailbox.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/25 text-[#38BDF8] border border-[#0066CC]/40 font-mono text-xs font-bold">
                      {emailApps.length} Inbound Messages
                    </span>
                  </div>

                  <div className="divide-y divide-white/10 text-xs">
                    {emailApps.map((em) => (
                      <div key={em.id} className="py-4 space-y-2 hover:bg-white/5 p-3 rounded-xl transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{em.senderName}</span>
                            <span className="text-[11px] font-mono text-slate-400">&lt;{em.senderEmail}&gt;</span>
                            {em.status === 'Unread' && (
                              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-[#38BDF8] border border-cyan-500/30 font-mono text-[9px] font-bold">
                                UNREAD
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {new Date(em.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="font-semibold text-white">{em.subject}</p>
                        <p className="text-slate-300 leading-relaxed">{em.message}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="text-[11px] font-mono text-[#38BDF8]">Attachment: {em.resumeAttachment}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setHrEmailModal({
                                isOpen: true,
                                recipientName: em.senderName,
                                recipientEmail: em.senderEmail,
                                contextType: 'candidate',
                                senderEmail: 'hrhydgodavariwavetech@gmail.com',
                                subject: `Re: Your application for Godavari Wave Technologies`,
                                body: `Dear ${em.senderName},\n\nThank you for reaching out. We have reviewed your background and would like to connect.\n\nBest regards,\nTalent Acquisition Team\nGodavari Wave Technologies`,
                                selectedTemplateId: 'inbox-reply',
                              });
                            }}
                            className="px-3 py-1 rounded-lg border border-cyan-400/40 bg-white/5 text-[#38BDF8] hover:bg-white/10 hover:text-white font-bold"
                          >
                            Reply via HR Mail
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: PROJECTS & INVOICES                           */}
          {/* ===================================================== */}
          {activeModule === 'projects' && (
            <div className="p-6 sm:p-8 border border-white/15 rounded-2xl bg-[#0E2646] space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Active Projects & Deliverables</h2>
                  <p className="text-xs text-slate-300">Milestone contracts, engineering deliverables, and commercial invoices.</p>
                </div>
                <span className="font-mono font-extrabold text-[#38BDF8] text-base">
                  Total Contract Volume: {formatINR(clientKPIs.revenue)}
                </span>
              </div>

              <div className="divide-y divide-white/10 text-xs">
                {leads.map((client) => (
                  <div key={client.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 px-2 rounded-xl transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{client.project || client.service}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 font-mono text-[10px] font-bold">
                          {client.company || client.name}
                        </span>
                      </div>
                      <p className="text-slate-300">Account Manager: {client.assignedTo || 'Renusri'} · Stage: <span className="text-[#38BDF8] font-semibold">{client.status}</span></p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-extrabold text-white text-base">{formatINR(client.revenue)}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const proposalText = `GODAVARI WAVE TECHNOLOGIES INVOICE BILLING\nProject: ${client.project || client.service}\nClient: ${client.name}\nContract Value: ${formatINR(client.revenue)}\nStatus: Active`;
                          const blob = new Blob([proposalText], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Invoice_${client.id}.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                          showToast('Invoice downloaded');
                        }}
                        className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 font-bold text-[#38BDF8] hover:bg-white/15 hover:text-white transition-all cursor-pointer shadow-sm"
                      >
                        Download Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: REPORTS (EXECUTIVE METRICS)                  */}
          {/* ===================================================== */}
          {activeModule === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Executive Reports & Conversion Analytics</h2>
                  <p className="text-xs text-slate-300">Comprehensive deal velocity, lead source ROI, and recruitment ratios.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-sm text-white">Pipeline Funnel Conversion</h3>
                  <div className="space-y-3 pt-2">
                    {[
                      { label: 'Initial Inquiries', count: clientKPIs.total, pct: 100, color: '#0066CC' },
                      { label: 'Qualified Opportunities', count: clientKPIs.qualified, pct: 75, color: '#0052A3' },
                      { label: 'Proposals Dispatched', count: clientKPIs.proposals, pct: 50, color: '#0EA5E9' },
                      { label: 'Negotiation Deals', count: clientKPIs.negotiation, pct: 35, color: '#0284C7' },
                      { label: 'Closed Won Clients', count: clientKPIs.won, pct: 25, color: '#00D4FF' },
                    ].map((st, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono font-bold text-white">
                          <span className="text-slate-300">{st.label}</span>
                          <span className="text-[#38BDF8]">{st.count}</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <div style={{ width: `${st.pct}%`, backgroundColor: st.color }} className="h-full rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-sm text-white">Recruitment Efficiency</h3>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[#07182E] border border-white/10 text-center space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Average Time to Hire</span>
                      <span className="text-3xl font-extrabold text-[#38BDF8] font-display">6.2 Days</span>
                      <span className="text-[10px] text-slate-400 font-bold block">Industry benchmark: 18 days</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#07182E] border border-white/10 text-center space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Offer Acceptance</span>
                      <span className="text-3xl font-extrabold text-emerald-400 font-display">91.4%</span>
                      <span className="text-[10px] text-emerald-300 font-bold block">+5.2% vs previous quarter</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: ANALYTICS (REVENUE & VELOCITY)                */}
          {/* ===================================================== */}
          {activeModule === 'analytics' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-white/10">
                <h2 className="font-display text-2xl font-bold text-white">Visual Analytics & Growth Trajectory</h2>
                <p className="text-xs text-slate-300">Real-time forecasting across enterprise sales and talent hiring velocity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Projected Annual Run Rate</span>
                  <p className="text-3xl font-extrabold text-[#38BDF8] font-display text-center leading-none">₹4.2 Cr</p>
                  <p className="text-xs text-slate-300 text-center">Calculated across active accounts and pipeline value.</p>
                </div>

                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Average Deal Size</span>
                  <p className="text-3xl font-extrabold text-white font-display text-center leading-none">₹16.5 Lakhs</p>
                  <p className="text-xs text-slate-300 text-center">Enterprise cloud and software delivery contracts.</p>
                </div>

                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Sales Velocity Ratio</span>
                  <p className="text-3xl font-extrabold text-cyan-300 font-display text-center leading-none">12.4 Days</p>
                  <p className="text-xs text-slate-300 text-center">Inquiry to formal contract signature time.</p>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: NOTIFICATIONS CENTER                        */}
          {/* ===================================================== */}
          {activeModule === 'notifications' && (
            <div className="p-6 sm:p-8 border border-white/15 rounded-2xl bg-[#0E2646] space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Live Activity & Notifications</h2>
                  <p className="text-xs text-slate-300">Audit logs for client inquiries, candidate resumes, and meetings.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    markAllNotificationsRead();
                    refreshAllData();
                    showToast('All notifications marked as read');
                  }}
                  className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-xs font-bold text-[#38BDF8] hover:bg-white/15 hover:text-white transition-all cursor-pointer"
                >
                  Mark All Read
                </button>
              </div>

              <div className="divide-y divide-white/10 text-xs">
                {notifications.map((n) => (
                  <div key={n.id} className={cn('py-4 flex items-start gap-3 p-3 rounded-xl transition-colors', !n.read ? 'bg-[#0066CC]/20 border border-[#0066CC]/30' : 'hover:bg-white/5')}>
                    <div className="h-8 w-8 rounded-full bg-[#0066CC]/30 text-[#38BDF8] border border-[#0066CC]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{n.title}</span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {new Date(n.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-300 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: SETTINGS & ROLES                             */}
          {/* ===================================================== */}
          {activeModule === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Enterprise System Configuration</h2>
                  <p className="text-xs text-slate-300 mt-1">Manage staff roles, edit Careers CMS content, and configure email templates.</p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#07182E] p-1 rounded-xl border border-white/15 text-xs">
                  {[
                    { id: 'roles', label: 'Role Permissions' },
                    { id: 'cms', label: 'Careers CMS' },
                    { id: 'templates', label: 'Email Templates' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSettingsSubView(st.id as any)}
                      className={cn(
                        'px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer',
                        settingsSubView === st.id
                          ? 'bg-[#0066CC] text-white shadow-md'
                          : 'text-slate-400 hover:text-white'
                      )}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roles Matrix */}
              {settingsSubView === 'roles' && (
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] space-y-6 shadow-xl">
                  <h3 className="font-display font-bold text-base text-white">Role-Based Access Control (RBAC)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userRoles.map((role) => (
                      <div key={role.roleId} className="p-5 rounded-2xl border border-white/10 bg-[#07182E] space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 style={{ color: role.color }} className="font-bold text-sm">{role.title}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono font-bold text-slate-300">
                            {role.roleId}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{role.description}</p>
                        <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                          {Object.keys(role.permissions).map((permKey) => (
                            <label key={permKey} className="flex items-center gap-2 cursor-pointer text-slate-200 hover:text-white">
                              <input
                                type="checkbox"
                                checked={(role.permissions as any)[permKey]}
                                onChange={(e) => {
                                  updateUserRolePermission(role.roleId, permKey as any, e.target.checked);
                                  refreshAllData();
                                  showToast(`Permission updated for ${role.title}`);
                                }}
                                className="rounded text-[#0066CC]"
                              />
                              <span className="text-[11px] capitalize">
                                {permKey.replace(/^can/, '').replace(/([A-Z])/g, ' $1')}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Careers CMS Tab */}
              {settingsSubView === 'cms' && (
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-base text-white">Careers Portal Content Management</h3>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase mb-1">Banner Heading</label>
                      <input
                        type="text"
                        defaultValue={careersCMS.bannerHeading}
                        id="cms-banner-heading"
                        className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase mb-1">Banner Subheading</label>
                      <input
                        type="text"
                        defaultValue={careersCMS.bannerSubheading}
                        id="cms-banner-subheading"
                        className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-xs font-medium text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const h = (document.getElementById('cms-banner-heading') as HTMLInputElement)?.value;
                        const s = (document.getElementById('cms-banner-subheading') as HTMLInputElement)?.value;
                        updateCareersCMS({ ...careersCMS, bannerHeading: h, bannerSubheading: s });
                        refreshAllData();
                        showToast('Careers CMS updated');
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white hover:brightness-110 shadow-lg cursor-pointer"
                    >
                      Save CMS Configuration
                    </button>
                  </div>
                </div>
              )}

              {/* Templates Tab */}
              {settingsSubView === 'templates' && (
                <div className="p-6 border border-white/15 rounded-2xl bg-[#0E2646] space-y-6 shadow-xl">
                  <h3 className="font-display font-bold text-base text-white">Official HR & CRM Email Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emailTemplates.map((tmpl) => (
                      <div key={tmpl.id} className="p-5 rounded-xl border border-white/10 bg-[#07182E] space-y-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 font-mono text-[10px] font-bold">
                          {tmpl.category}
                        </span>
                        <h4 className="font-bold text-xs text-white">{tmpl.name}</h4>
                        <textarea
                          rows={4}
                          defaultValue={tmpl.body}
                          id={`template-body-${tmpl.id}`}
                          className="w-full p-3 rounded-lg border border-white/15 bg-[#0B1F3A] text-[11px] text-white focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const val = (document.getElementById(`template-body-${tmpl.id}`) as HTMLTextAreaElement)?.value;
                            updateEmailTemplate(tmpl.id, { body: val });
                            refreshAllData();
                            showToast(`Template saved: ${tmpl.name}`);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-[11px] cursor-pointer"
                        >
                          Save Template
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: CALENDAR & MEETING SCHEDULES                  */}
          {/* ===================================================== */}
          {activeModule === 'calendar' && (
            <div id="enterprise-calendar-section" className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                      Executive Schedule Desk
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Demos, Discovery & Interviews</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                    Schedule & Meetings Calendar
                  </h2>
                  <p className="text-sm text-slate-300 mt-1">
                    Integrated view of upcoming client demonstrations, technical discovery sessions, and talent interview evaluations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-[#07182E] p-1 rounded-xl border border-white/15 text-xs">
                    <button
                      type="button"
                      onClick={() => setCalendarViewMode('month')}
                      className={cn('px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer', calendarViewMode === 'month' ? 'bg-[#0066CC] text-white shadow-xs' : 'text-slate-400 hover:text-white')}
                    >
                      Month View
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalendarViewMode('agenda')}
                      className={cn('px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer', calendarViewMode === 'agenda' ? 'bg-[#0066CC] text-white shadow-xs' : 'text-slate-400 hover:text-white')}
                    >
                      Agenda List
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsScheduleInterviewModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white hover:opacity-95 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#0066CC]/25"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Book Meeting / Interview</span>
                  </button>
                </div>
              </div>

              {/* Month Controls & Event Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E2646] border border-white/12">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const m = new Date(calendarMonth);
                      m.setMonth(m.getMonth() - 1);
                      setCalendarMonth(m);
                    }}
                    className="p-2 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="font-display font-extrabold text-lg text-white">
                    {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const m = new Date(calendarMonth);
                      m.setMonth(m.getMonth() + 1);
                      setCalendarMonth(m);
                    }}
                    className="p-2 rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarMonth(new Date())}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-bold text-[#00D4FF] border border-[#00D4FF]/30 hover:bg-[#00D4FF]/10 cursor-pointer"
                  >
                    Today
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] font-mono font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#0066CC]" />
                    Client Meetings ({leads.filter(l => l.meetingStatus === 'Scheduled').length})
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00D4FF]/20 border border-[#00D4FF]/40 text-[#00D4FF] font-mono font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#00D4FF]" />
                    Candidate Interviews ({interviews.length})
                  </span>
                </div>
              </div>

              {/* Month Calendar Grid */}
              {calendarViewMode === 'month' ? (
                <div className="p-4 sm:p-6 rounded-2xl bg-[#0E2646] border border-white/12 shadow-xl space-y-3">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-slate-400 pb-2 border-b border-white/10">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const dayNum = ((i + 1) % 31) + 1;
                      const isToday = dayNum === new Date().getDate();
                      const dayLeads = leads.filter((l, idx) => l.meetingStatus === 'Scheduled' && (idx % 28 === dayNum % 28));
                      const dayInterviews = interviews.filter((it, idx) => (idx % 28 === dayNum % 28));

                      return (
                        <div
                          key={i}
                          className={cn(
                            'min-h-[90px] sm:min-h-[110px] p-2 rounded-xl border border-white/10 bg-[#07182E]/80 flex flex-col justify-between transition-colors hover:border-[#00D4FF]/40',
                            isToday ? 'ring-2 ring-[#00D4FF]' : ''
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className={cn('text-xs font-mono font-bold', isToday ? 'px-2 py-0.5 rounded-full bg-[#00D4FF] text-slate-900' : 'text-slate-300')}>
                              {dayNum}
                            </span>
                            {isToday && <span className="text-[9px] font-mono uppercase text-[#00D4FF] font-bold">Today</span>}
                          </div>

                          <div className="space-y-1 mt-1 overflow-hidden">
                            {dayLeads.slice(0, 1).map((dl) => (
                              <div
                                key={dl.id}
                                onClick={() => setDrawerClient(dl)}
                                className="px-1.5 py-1 rounded bg-[#0066CC]/30 border border-[#0066CC]/60 text-[#38BDF8] text-[10px] font-semibold truncate cursor-pointer hover:bg-[#0066CC]/50"
                                title={`Client Demo: ${dl.name} (${dl.company || 'Enterprise'})`}
                              >
                                🎥 Demo: {dl.name.split(' ')[0]}
                              </div>
                            ))}
                            {dayInterviews.slice(0, 1).map((di) => (
                              <div
                                key={di.id}
                                onClick={() => {
                                  window.open(di.meetingLink, '_blank');
                                }}
                                className="px-1.5 py-1 rounded bg-[#00D4FF]/20 border border-[#00D4FF]/50 text-[#00D4FF] text-[10px] font-semibold truncate cursor-pointer hover:bg-[#00D4FF]/30"
                                title={`Interview: ${di.candidateName} · ${di.round}`}
                              >
                                💼 {di.candidateName.split(' ')[0]} ({di.round.split(' ')[0]})
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Agenda List View */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Demos */}
                  <div className="p-6 rounded-2xl bg-[#0E2646] border border-white/12 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-[#38BDF8]" />
                        <h3 className="font-display font-bold text-base text-white">Client Discovery Demos</h3>
                      </div>
                      <span className="font-mono text-xs text-sky-300 font-bold">
                        {leads.filter(l => l.meetingStatus === 'Scheduled').length} Booked
                      </span>
                    </div>

                    <div className="divide-y divide-white/5 space-y-3">
                      {leads.filter(l => l.meetingStatus === 'Scheduled').map((cl) => (
                        <div key={cl.id} className="pt-3 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-sm">{cl.name}</p>
                            <p className="text-xs text-slate-300">{cl.company || 'Enterprise Client'} · {cl.service}</p>
                            <p className="text-[11px] text-[#00D4FF] font-mono mt-0.5">Host: {cl.assignedTo || 'Renusri'}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href="https://meet.google.com/new"
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white text-xs font-bold flex items-center gap-1.5"
                            >
                              <Video className="h-3.5 w-3.5" />
                              <span>Join Meet</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Candidate Interviews */}
                  <div className="p-6 rounded-2xl bg-[#0E2646] border border-white/12 shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-[#00D4FF]" />
                        <h3 className="font-display font-bold text-base text-white">Candidate Technical Evaluations</h3>
                      </div>
                      <span className="font-mono text-xs text-cyan-300 font-bold">
                        {interviews.length} Scheduled
                      </span>
                    </div>

                    <div className="divide-y divide-white/5 space-y-3">
                      {interviews.map((it) => (
                        <div key={it.id} className="pt-3 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-sm">{it.candidateName}</p>
                            <p className="text-xs text-slate-300">{it.position} · <span className="text-[#00D4FF] font-semibold">{it.round}</span></p>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {new Date(it.dateTime).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} · Evaluator: {it.interviewer}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={it.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white text-xs font-bold flex items-center gap-1.5 hover:brightness-110 shadow-sm"
                            >
                              <Video className="h-3.5 w-3.5" />
                              <span>Join</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete scheduled interview for ${it.candidateName}?`)) {
                                  deleteInterview(it.id);
                                  refreshAllData();
                                  showToast(`Interview for ${it.candidateName} deleted`);
                                }
                              }}
                              className="p-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all cursor-pointer"
                              title="Delete Interview"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: HR RENUSRI PROFILE & SYSTEM SETTINGS          */}
          {/* ===================================================== */}
          {activeModule === 'profile' && (
            <div id="enterprise-profile-section" className="space-y-6">
              {/* Header */}
              <div className="pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                    Official HR Administrator Desk
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400 font-mono">Godavari Wave Technologies</span>
                </div>
                <h2 className="text-[30px] sm:text-[34px] font-extrabold text-white tracking-tight mt-1 leading-tight font-display">
                  HR Management Desk & Profile
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Administrator credentials, official HR email dispatch desk, and security password configuration for Renusri.
                </p>
              </div>

              {/* Profile Card */}
              <div className="m-3 sm:m-4 md:m-5 p-6 sm:p-8 rounded-lg bg-gradient-to-br from-[#0E2646] to-[#07182E] border border-white/15 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="h-20 w-20 rounded-lg bg-gradient-to-tr from-[#0066CC] to-[#00D4FF] text-white text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-[#0066CC]/30 font-display">
                        R
                      </div>
                      <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#0B1F3A]" title="Active Administrator" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-display font-extrabold text-2xl text-white">Renusri</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0066CC]/30 text-[#00D4FF] border border-[#0066CC]/50 text-[10px] font-mono font-bold">
                          Official HR Lead
                        </span>
                      </div>
                      <p className="text-sm text-sky-200 font-semibold">
                        Senior HR Manager & Corporate Client Operations Lead
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        Godavari Wave Technologies Private Limited · Hyderabad, India
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="m-1 p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1 shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Official HR Email</span>
                      <a href="mailto:hrhydgodavariwavetech@gmail.com" className="text-xs font-mono font-bold text-[#00D4FF] hover:underline block">
                        hrhydgodavariwavetech@gmail.com
                      </a>
                    </div>
                    <div className="m-1 p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-1 shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Direct Contact Phone</span>
                      <a href="tel:+917799822121" className="text-xs font-mono font-bold text-white hover:underline block">
                        +91 7799 822 121
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 my-8">
                {[
                  { label: 'Leads Managed', val: leads.length, icon: Users, color: '#38BDF8' },
                  { label: 'Clients Converted', val: leads.filter(l => l.status === 'Converted').length, icon: Award, color: '#34D399' },
                  { label: 'Talent Resumes', val: applications.length, icon: GraduationCap, color: '#00D4FF' },
                  { label: 'Interviews Booked', val: interviews.length, icon: Video, color: '#818CF8' },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 rounded-lg bg-[#0E2646] border border-white/12 shadow-xl flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-[#00D4FF]/40 hover:shadow-2xl hover:-translate-y-0.5"
                    >
                      <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#00D4FF] mb-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-center">
                        {s.val}
                      </p>
                      <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider text-center mt-2">
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* 2 Column Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Password Management */}
                <div className="p-6 rounded-lg bg-[#0E2646] border border-white/12 shadow-xl space-y-4">
                  <div className="pb-3 border-b border-white/10">
                    <h3 className="font-display font-bold text-base text-white">Security & Password Management</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Update dashboard administrator access credentials
                    </p>
                  </div>

                  <form onSubmit={handlePasswordChange} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-sky-200 uppercase mb-1">Current Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="Enter current password"
                        value={profileCurrentPassword}
                        onChange={(e) => setProfileCurrentPassword(e.target.value)}
                        className="w-full p-3 rounded-lg border border-white/15 bg-[#08182D] text-white font-mono placeholder-slate-400 focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-sky-200 uppercase mb-1">New Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="At least 4 characters"
                        value={profileNewPassword}
                        onChange={(e) => setProfileNewPassword(e.target.value)}
                        className="w-full p-3 rounded-lg border border-white/15 bg-[#08182D] text-white font-mono placeholder-slate-400 focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-sky-200 uppercase mb-1">Confirm New Password *</label>
                      <input
                        type="password"
                        required
                        placeholder="Re-enter new password"
                        value={profileConfirmPassword}
                        onChange={(e) => setProfileConfirmPassword(e.target.value)}
                        className="w-full p-3 rounded-lg border border-white/15 bg-[#08182D] text-white font-mono placeholder-slate-400 focus:outline-none focus:border-[#00D4FF]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-[#0066CC] to-[#00D4FF] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md cursor-pointer"
                    >
                      Update HR Password
                    </button>
                  </form>
                </div>

                {/* Communication Settings & Digital Signature */}
                <div className="p-6 rounded-lg bg-[#0E2646] border border-white/12 shadow-xl space-y-4">
                  <div className="pb-3 border-b border-white/10">
                    <h3 className="font-display font-bold text-base text-white">Outbound Communications & Alerts</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Default settings for candidate correspondence and client proposals.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3.5 text-xs">
                    <div className="m-3 sm:m-4 p-4 rounded-sm bg-[#07182E] border border-white/10 space-y-1.5 shadow-md">
                      <span className="text-[10px] font-mono uppercase text-[#00D4FF] font-bold block">Official Dispatch Mailbox</span>
                      <p className="text-white font-mono font-semibold">hrhydgodavariwavetech@gmail.com</p>
                      <p className="text-slate-400 text-[11px]">Authorized for HR offers, interview invites, and client discovery links.</p>
                    </div>

                    <div className="mx-3 sm:mx-4 space-y-2 py-1">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-[#0066CC]" />
                        <span className="text-slate-200">Instant desktop notification on Website Popup enquiry</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-[#0066CC]" />
                        <span className="text-slate-200">Instant notification on Online Career Application submission</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-[#0066CC]" />
                        <span className="text-slate-200">Email alert 15 minutes before scheduled Google Meet</span>
                      </label>
                    </div>

                    <div className="m-3 sm:m-4 p-4 rounded-sm bg-[#07182E] border border-white/10 space-y-1.5 shadow-md">
                      <span className="text-[10px] font-mono uppercase text-[#00D4FF] font-bold block">Digital Signature Preview</span>
                      <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                        Warm regards,<br />
                        <strong className="text-white">Renusri</strong><br />
                        Senior HR Manager & Client Operations<br />
                        Godavari Wave Technologies<br />
                        hrhydgodavariwavetech@gmail.com | +91 7799 822 121
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* HR MAILER MODAL                                           */}
      {/* ========================================================= */}
      <AnimatePresence>
        {hrEmailModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
              className="w-full max-w-xl p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto border border-slate-200 rounded-2xl shadow-2xl text-slate-900"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setHrEmailModal(null)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer flex items-center gap-1 font-bold text-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <div className="h-4 w-px bg-slate-200" />
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#0066CC]" />
                    <h3 className="font-display font-bold text-base text-slate-900">Send Official Email from HR</h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHrEmailModal(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">
                    Send From (Official HR Mailbox)
                  </label>
                  <select
                    value={hrEmailModal.senderEmail}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, senderEmail: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white font-bold text-[#0066CC] focus:outline-none focus:border-[#0066CC] cursor-pointer"
                  >
                    <option value="hrhydgodavariwavetech@gmail.com">hrhydgodavariwavetech@gmail.com (Official HR Mailbox - Renusri)</option>
                    <option value="careers@godavariwave.com">careers@godavariwave.com (Talent & Recruitment Desk)</option>
                    <option value="hr@godavariwave.com">hr@godavariwave.com (Corporate HR Desk)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={hrEmailModal.recipientName}
                      onChange={(e) => setHrEmailModal({ ...hrEmailModal, recipientName: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white font-semibold text-slate-900 focus:outline-none focus:border-[#0066CC]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Recipient Email</label>
                    <input
                      type="email"
                      value={hrEmailModal.recipientEmail}
                      onChange={(e) => setHrEmailModal({ ...hrEmailModal, recipientEmail: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white font-mono text-[#0066CC] focus:outline-none focus:border-[#0066CC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={hrEmailModal.subject}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, subject: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white font-bold text-slate-900 focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Email Body Content</label>
                  <textarea
                    rows={6}
                    value={hrEmailModal.body}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, body: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-[#0066CC]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setHrEmailModal(null)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSendHREmail}
                    className="px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 bg-[#0066CC] hover:bg-[#0052A3] shadow-md cursor-pointer text-white"
                  >
                    <Send className="h-4 w-4 text-white" />
                    <span>Send via HR Mailer ({hrEmailModal.senderEmail})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* COMMAND PALETTE (CTRL + K SPOTLIGHT SEARCH)               */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isCommandPaletteOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="w-full max-w-xl overflow-hidden p-4 space-y-3 border border-white/20 rounded-2xl bg-[#0E2646] shadow-2xl"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 border-b border-white/10">
                <Search className="h-5 w-5 text-[#38BDF8]" />
                <input
                  type="text"
                  placeholder="Type to search clients, candidates, and job postings..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-400 focus:outline-none"
                  autoFocus
                />
                <button type="button" onClick={() => setIsCommandPaletteOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1 text-xs">
                {commandResults.length === 0 ? (
                  <p className="p-4 text-center text-slate-400">
                    {commandSearch ? 'No matches found.' : 'Search across all CRM clients, candidates, and job postings.'}
                  </p>
                ) : (
                  commandResults.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={item.action}
                      className="w-full p-3 rounded-xl hover:bg-white/10 flex items-center justify-between text-left cursor-pointer transition-colors"
                    >
                      <div>
                        <p className="font-bold text-white">{item.title}</p>
                        <p className="text-[11px] text-slate-300">{item.subtitle}</p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/30 text-[10px] font-mono font-bold text-[#38BDF8]">
                        {item.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* CLIENT SLIDING DRAWER (14-TAB PROFILE VIEW)               */}
      {/* ========================================================= */}
      <AnimatePresence>
        {drawerClient && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerClient(null)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
              className="relative z-50 w-full max-w-xl h-full border-l border-slate-200 bg-white text-slate-900 flex flex-col overflow-hidden shadow-2xl"
            >
              <div
                style={{ backgroundColor: '#F0F7FF', borderBottom: '1px solid #D9E8F5' }}
                className="p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setDrawerClient(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#0052A3] border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerClient(null)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 cursor-pointer shadow-xs"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900">{drawerClient.name}</h2>
                  <p className="text-xs font-semibold text-[#0066CC] mt-0.5">{drawerClient.company || 'Direct Client'} · ID: <span className="font-mono">{drawerClient.id}</span></p>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openHREmailForClient(drawerClient)}
                    className="w-full py-2.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Mail className="h-4 w-4 text-white" />
                    <span>Send Official Email from HR (hrhydgodavariwavetech@gmail.com)</span>
                  </button>

                  {drawerClient.status !== 'Converted' && (
                    <button
                      type="button"
                      onClick={() => {
                        convertLeadToClient(drawerClient.id, {
                          industry: drawerClient.industry,
                          revenue: drawerClient.revenue,
                        });
                        refreshAllData();
                        showToast(`Lead ${drawerClient.name} converted to Won Client!`);
                        setDrawerClient({ ...drawerClient, status: 'Converted' });
                      }}
                      className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-white" />
                      <span>Convert to Won Client & Commercial Contract</span>
                    </button>
                  )}
                </div>
              </div>

              <div
                style={{ backgroundColor: '#F8FAFC' }}
                className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-800"
              >
                <div
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                  className="p-5 rounded-lg border shadow-xs space-y-2 text-center flex flex-col items-center justify-center"
                >
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider text-center">Deal Specifications</span>
                  <p className="text-3xl font-extrabold text-slate-900 font-display text-center leading-none my-1">{formatINR(drawerClient.revenue)}</p>
                  <p className="text-slate-600 text-center mt-1">Industry: <span className="font-semibold text-slate-900">{drawerClient.industry || 'Technology & IT'}</span></p>
                  <p className="text-slate-600 text-center">Assigned Owner: <span className="font-semibold text-[#0066CC]">{drawerClient.assignedTo || 'Renusri'}</span></p>
                  <p className="text-slate-600 text-center">Source: <span className="font-mono text-xs text-slate-900">{drawerClient.source || 'Website'}</span></p>
                </div>

                <div
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                  className="p-5 rounded-lg border shadow-xs space-y-2.5"
                >
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Contact & Location</span>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <p className="text-slate-500">Email: <span className="text-slate-900 block font-mono text-[11px] font-semibold truncate mt-0.5">{drawerClient.email}</span></p>
                    <p className="text-slate-500">Phone: <span className="text-slate-900 block font-mono text-[11px] font-semibold mt-0.5">{drawerClient.phone}</span></p>
                    <p className="text-slate-500">City / State: <span className="text-slate-900 block font-semibold mt-0.5">{drawerClient.city || 'Hyderabad'}, {drawerClient.state || 'Telangana'}</span></p>
                    <p className="text-slate-500">Country: <span className="text-slate-900 block font-semibold mt-0.5">{drawerClient.country || 'India'}</span></p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Client Inquired Scope</span>
                  <p
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                    className="p-4 rounded-lg border shadow-xs text-slate-800 leading-relaxed font-normal"
                  >
                    {drawerClient.message || 'No specific requirement message supplied.'}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider block ">
                    Executive Notes & Follow-up Log
                  </span>
                  <textarea
                    rows={4}
                    defaultValue={drawerClient.notes || ''}
                    id="drawer-client-notes-textarea"
                    placeholder="Enter notes, meeting updates, or client requirements..."
                    style={{ backgroundColor: '#FFFFFF', color: '#0F172A', borderColor: '#CBD5E1' }}
                    className="w-full p-3.5 rounded-lg border placeholder-slate-400 placeholder:text-center text-center focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 shadow-xs leading-relaxed"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('drawer-client-notes-textarea') as HTMLTextAreaElement;
                      if (el) {
                        updateLead(drawerClient.id, { notes: el.value });
                        refreshAllData();
                        showToast('Notes saved');
                      }
                    }}
                    className="w-full py-2.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer shadow-md transition-all"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              <div
                style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}
                className="p-4 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDrawerClient(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer shadow-xs"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete record for ${drawerClient.name}?`)) {
                        deleteLead(drawerClient.id);
                        refreshAllData();
                        setDrawerClient(null);
                        showToast(`Record for ${drawerClient.name} deleted`);
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg border border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                    title="Delete Record"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => openHREmailForClient(drawerClient)}
                  className="px-5 py-2 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer shadow-md transition-all"
                >
                  Dispatch Email
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* CANDIDATE SLIDING DRAWER                                  */}
      {/* ========================================================= */}
      <AnimatePresence>
        {drawerCandidate && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawerCandidate(null)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
              className="relative z-50 w-full max-w-xl h-full border-l border-slate-200 bg-white text-slate-900 flex flex-col overflow-hidden shadow-2xl"
            >
              <div
                style={{ backgroundColor: '#F0F7FF', borderBottom: '1px solid #D9E8F5' }}
                className="p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setDrawerCandidate(null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-[#0052A3] border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete candidate application for ${drawerCandidate.name}?`)) {
                          deleteApplication(drawerCandidate.id);
                          refreshAllData();
                          setDrawerCandidate(null);
                          showToast(`Candidate application for ${drawerCandidate.name} deleted`);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer shadow-xs transition-colors"
                      title="Delete Candidate Application"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDrawerCandidate(null)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 cursor-pointer shadow-xs"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900">{drawerCandidate.name}</h2>
                  <p className="text-xs font-semibold text-[#0066CC] mt-0.5">{drawerCandidate.position} · Candidate ID: <span className="font-mono">{drawerCandidate.candidateId}</span></p>
                </div>

                <button
                  type="button"
                  onClick={() => openHREmailForCandidate(drawerCandidate)}
                  className="w-full py-2.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Mail className="h-4 w-4 text-white" />
                  <span>Send Interview / Offer Letter (hrhydgodavariwavetech@gmail.com)</span>
                </button>
              </div>

              <div
                style={{ backgroundColor: '#F8FAFC' }}
                className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-800"
              >
                {/* 18-Field Comprehensive Profile */}
                <div
                  style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                  className="p-5 rounded-lg border shadow-xs space-y-3"
                >
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Candidate Profile & Compensation</span>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <p className="text-slate-500">Phone: <span className="font-bold text-slate-900 block font-mono text-[11px] mt-0.5">{drawerCandidate.phone}</span></p>
                    <p className="text-slate-500">Email: <span className="font-bold text-slate-900 block font-mono text-[11px] truncate mt-0.5">{drawerCandidate.email}</span></p>
                    <p className="text-slate-500">Current Location: <span className="font-bold text-slate-900 block mt-0.5">{drawerCandidate.currentLocation || 'Hyderabad'}</span></p>
                    <p className="text-slate-500">Preferred Location: <span className="font-bold text-slate-900 block mt-0.5">{drawerCandidate.preferredLocation || 'Hyderabad / Hybrid'}</span></p>
                    <p className="text-slate-500">Qualification: <span className="font-bold text-slate-900 block mt-0.5">{drawerCandidate.qualification || 'B.Tech / MCA'}</span></p>
                    <p className="text-slate-500">Experience: <span className="font-bold text-slate-900 block mt-0.5">{drawerCandidate.experienceLevel} {drawerCandidate.experienceYears || ''}</span></p>
                    <p className="text-slate-500">Current Salary (CTC): <span className="font-bold text-slate-900 block font-mono mt-0.5">{drawerCandidate.currentSalary || drawerCandidate.currentCTC || 'N/A'}</span></p>
                    <p className="text-slate-500">Expected Salary (CTC): <span className="font-bold text-[#0066CC] block font-mono mt-0.5">{drawerCandidate.expectedSalary || 'Negotiable'}</span></p>
                    <p className="text-slate-500">Notice Period: <span className="font-bold text-slate-900 block mt-0.5">{drawerCandidate.noticePeriod || 'Immediate / 15 days'}</span></p>
                    <p className="text-slate-500">Current Stage: <span className="font-bold text-[#0066CC] block mt-0.5">{drawerCandidate.status}</span></p>
                  </div>
                </div>

                {/* Candidate Links */}
                {(drawerCandidate.linkedIn || drawerCandidate.github || drawerCandidate.portfolio || drawerCandidate.resumeUrl) && (
                  <div
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                    className="p-5 rounded-lg border shadow-xs space-y-2"
                  >
                    <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Profiles & Portfolios</span>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {drawerCandidate.linkedIn && (
                        <a
                          href={drawerCandidate.linkedIn.startsWith('http') ? drawerCandidate.linkedIn : `https://${drawerCandidate.linkedIn}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0066CC] hover:bg-[#0066CC] hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {drawerCandidate.github && (
                        <a
                          href={drawerCandidate.github.startsWith('http') ? drawerCandidate.github : `https://${drawerCandidate.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {drawerCandidate.portfolio && (
                        <a
                          href={drawerCandidate.portfolio.startsWith('http') ? drawerCandidate.portfolio : `https://${drawerCandidate.portfolio}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0066CC] hover:bg-[#0066CC] hover:text-white flex items-center gap-1.5 text-xs font-semibold transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          <span>Portfolio</span>
                        </a>
                      )}
                      {drawerCandidate.resumeUrl && (
                        <a
                          href={drawerCandidate.resumeUrl.startsWith('http') ? drawerCandidate.resumeUrl : `https://${drawerCandidate.resumeUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#0066CC] text-white hover:bg-[#0052A3] flex items-center gap-1.5 text-xs font-bold shadow-xs transition-colors"
                        >
                          <FileText className="h-3 w-3" />
                          <span>Resume Document</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Skills tags */}
                {drawerCandidate.skills && drawerCandidate.skills.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Technical & Core Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {drawerCandidate.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#0052A3] border border-blue-200 font-mono text-[11px] font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#0066CC] uppercase tracking-wider">Cover Note & Career Pitch</span>
                  <p
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0' }}
                    className="p-4 rounded-lg border shadow-xs text-slate-800 leading-relaxed font-normal"
                  >
                    {drawerCandidate.coverLetter || drawerCandidate.coverNote || 'No cover note provided.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setInterviewApplication(drawerCandidate);
                      setIsScheduleInterviewModalOpen(true);
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold hover:brightness-110 shadow-md cursor-pointer transition-all"
                  >
                    Schedule Interview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateApplication(drawerCandidate.id, { status: 'Offered' });
                      refreshAllData();
                      setDrawerCandidate({ ...drawerCandidate, status: 'Offered' });
                      showToast(`Offer issued to ${drawerCandidate.name}`);
                    }}
                    className="flex-1 py-2.5 rounded-lg border-2 border-[#0066CC] bg-white text-[#0066CC] hover:bg-blue-50 font-bold cursor-pointer shadow-xs transition-all"
                  >
                    Issue Job Offer
                  </button>
                </div>
              </div>

              <div
                style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}
                className="p-4 flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDrawerCandidate(null)}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer shadow-xs"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete candidate application for ${drawerCandidate.name}?`)) {
                        deleteApplication(drawerCandidate.id);
                        refreshAllData();
                        setDrawerCandidate(null);
                        showToast(`Candidate application for ${drawerCandidate.name} deleted`);
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg border border-rose-300 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                    title="Delete Candidate Application"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => openHREmailForCandidate(drawerCandidate)}
                  className="px-5 py-2 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer shadow-md transition-all"
                >
                  Email Candidate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD CLIENT FORM                                    */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddClientModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
              className="w-full max-w-lg p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto border border-slate-200 rounded-2xl shadow-2xl text-slate-900"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-display font-bold text-lg text-slate-900">Create New Client Account</h3>
                <button type="button" onClick={() => setIsAddClientModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveLead({
                    name: newClientData.name,
                    company: newClientData.company,
                    email: newClientData.email,
                    phone: newClientData.phone,
                    service: newClientData.service,
                    priority: newClientData.priority,
                    industry: newClientData.industry,
                    assignedTo: newClientData.assignedTo,
                    revenue: Number(newClientData.revenue) || 1000000,
                    country: newClientData.country,
                    state: newClientData.state,
                    city: newClientData.city,
                    meetingStatus: newClientData.meetingStatus,
                    status: 'New',
                    source: 'Direct Entry',
                    message: newClientData.message,
                    notes: newClientData.notes,
                  });
                  refreshAllData();
                  showToast(`Client account created for ${newClientData.name}!`);
                  setIsAddClientModalOpen(false);
                }}
                className="space-y-4 text-xs"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Client Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={newClientData.name}
                      onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Varma Agro Tech"
                      value={newClientData.company}
                      onChange={(e) => setNewClientData({ ...newClientData, company: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@varma.com"
                      value={newClientData.email}
                      onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={newClientData.phone}
                      onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Technology Service</label>
                    <select
                      value={newClientData.service}
                      onChange={(e) => setNewClientData({ ...newClientData, service: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 cursor-pointer"
                    >
                      <option value="Enterprise Software">Enterprise Software</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cloud Migration & DevOps">Cloud Migration & DevOps</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Cybersecurity Solutions">Cybersecurity Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Estimated Value (₹)</label>
                    <input
                      type="number"
                      value={newClientData.revenue}
                      onChange={(e) => setNewClientData({ ...newClientData, revenue: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Requirement Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Enter project specifications or scope..."
                    value={newClientData.message}
                    onChange={(e) => setNewClientData({ ...newClientData, message: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-bold bg-[#0066CC] hover:bg-[#0052A3] text-white cursor-pointer shadow-md transition-all"
                  >
                    Save Client Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: CREATE JOB OPENING                                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isCreateJobModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto border border-white/15 rounded-3xl bg-[#0E2646] text-white shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-display font-bold text-lg text-white">Publish New Job Opening</h3>
                <button type="button" onClick={() => setIsCreateJobModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveJob({
                    title: newJobData.title,
                    category: newJobData.category,
                    level: newJobData.level,
                    location: newJobData.location,
                    type: newJobData.type,
                    openings: Number(newJobData.openings) || 2,
                    status: newJobData.status,
                    experience: newJobData.experience,
                    description: newJobData.description,
                    responsibilities: newJobData.responsibilities.split(','),
                    skills: newJobData.skills.split(','),
                    perks: newJobData.perks.split(','),
                  });
                  refreshAllData();
                  showToast(`Job opening published: ${newJobData.title}`);
                  setIsCreateJobModalOpen(false);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#38BDF8] uppercase mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={newJobData.title}
                    onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#38BDF8] uppercase mb-1">Track Category</label>
                    <select
                      value={newJobData.category}
                      onChange={(e) => setNewJobData({ ...newJobData, category: e.target.value as any })}
                      className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Software">Software Engineering</option>
                      <option value="AI">AI & Machine Learning</option>
                      <option value="Cloud">Cloud & DevOps</option>
                      <option value="Design">Product Design / UI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#38BDF8] uppercase mb-1">Location</label>
                    <input
                      type="text"
                      value={newJobData.location}
                      onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#38BDF8] uppercase mb-1">Key Skills (Comma separated)</label>
                  <input
                    type="text"
                    value={newJobData.skills}
                    onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/15 bg-[#07182E] text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateJobModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-slate-300 font-semibold hover:bg-white/10 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-110 text-white cursor-pointer shadow-lg shadow-blue-500/20"
                  >
                    Publish Opening
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: SCHEDULE INTERVIEW                                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isScheduleInterviewModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{ backgroundColor: '#FFFFFF', color: '#0F172A' }}
              className="w-full max-w-lg p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto border border-slate-200 rounded-2xl shadow-2xl text-slate-900"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-display font-bold text-lg text-slate-900">
                  Schedule Interview {interviewApplication ? `for ${interviewApplication.name}` : ''}
                </h3>
                <button type="button" onClick={() => setIsScheduleInterviewModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveInterview({
                    applicationId: interviewApplication ? interviewApplication.id : 'app_manual',
                    candidateName: interviewApplication ? interviewApplication.name : 'Candidate',
                    candidateEmail: interviewApplication ? interviewApplication.email : 'hrhydgodavariwavetech@gmail.com',
                    position: interviewApplication ? interviewApplication.position : 'Software Engineer',
                    round: newInterviewData.round,
                    interviewer: newInterviewData.interviewer || 'Renusri',
                    dateTime: newInterviewData.dateTime,
                    durationMinutes: Number(newInterviewData.durationMinutes) || 45,
                    platform: newInterviewData.platform || 'Google Meet',
                    meetingLink: newInterviewData.meetingLink || 'https://meet.google.com/new',
                    status: 'Scheduled',
                    feedback: newInterviewData.feedback,
                  });
                  refreshAllData();
                  showToast('Interview session scheduled successfully');
                  setIsScheduleInterviewModalOpen(false);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Interview Round</label>
                  <select
                    value={newInterviewData.round}
                    onChange={(e) => setNewInterviewData({ ...newInterviewData, round: e.target.value as any })}
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 cursor-pointer"
                  >
                    <option value="Initial Screening">Initial HR Screening</option>
                    <option value="Technical Round">Technical Round 1 (Coding & Architecture)</option>
                    <option value="System Design">Technical Round 2 (System Design)</option>
                    <option value="Managerial Round">Managerial Discussion</option>
                    <option value="HR Discussion">HR Offer Discussion</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Interviewer Name</label>
                    <input
                      type="text"
                      value={newInterviewData.interviewer}
                      onChange={(e) => setNewInterviewData({ ...newInterviewData, interviewer: e.target.value })}
                      placeholder="e.g. Renusri (Talent Lead)"
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newInterviewData.dateTime}
                      onChange={(e) => setNewInterviewData({ ...newInterviewData, dateTime: e.target.value })}
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">Meeting Link (Google Meet / Teams)</label>
                  <input
                    type="url"
                    value={newInterviewData.meetingLink}
                    onChange={(e) => setNewInterviewData({ ...newInterviewData, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/new"
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-slate-900 font-mono focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsScheduleInterviewModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-bold bg-[#0066CC] hover:bg-[#0052A3] text-white cursor-pointer shadow-md transition-all"
                  >
                    Confirm Schedule
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
