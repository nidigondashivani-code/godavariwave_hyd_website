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
  UserPlus,
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
  Tag,
  Zap,
  ArrowUpRight,
  MessageCircle,
  Home,
  ArrowLeftRight,
  ClipboardList,
  FolderOpen,
  FileSignature,
  CreditCard,
  Save
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
  syncLeadsWithDatabase
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
  clearAllNotifications,
  deleteNotification,
  bulkDeleteApplications,
  clearAllApplications,
  clearAllJobs,
  clearAllInterviews,
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
  background: '#F4F8FC',                // Light Blue Corporate Enterprise Canvas
  backgroundSecondary: '#EEF6FF',       // Soft Light Blue Accent Background
  cards: '#FFFFFF',                     // Pure Crisp White Enterprise Cards
  cardsGlass: 'rgba(255, 255, 255, 0.96)', // Glassmorphism Surface
  sidebar: '#082F49',                   // Executive Dark Navy Sidebar
  sidebarBorder: '#0E3D60',             // Executive Sidebar Border
  primary: '#0066CC',                   // Godavari Wave Brand Primary Blue
  secondary: '#0052A3',                 // Royal Enterprise Blue
  accent: '#0EA5E9',                    // Modern Sky Cyan Accent
  sky: '#38BDF8',                       // Highlighting Sky Tone
  hover: '#EAF5FF',                     // Enterprise Hover Tint
  borders: '#D8E7F5',                   // Crisp Architectural Border
  divider: '#E5EDF5',                   // Soft Enterprise Divider
  textPrimary: '#1E293B',               // Slate 900 Deep Corporate Navy
  textSecondary: '#64748B',             // Slate 500 Modern Neutral Subtext
  white: '#FFFFFF',                     // Pure White
};

interface LeadDashboardProps {
  onBackToSite?: () => void;
}

export type AppSuite = 'home' | 'crm' | 'recruitment';

export type MainModule =
  | 'home'
  | 'dashboard'
  | 'leads'
  | 'clients'
  | 'connected-clients'
  | 'companies'
  | 'meetings'
  | 'followups'
  | 'requirements'
  | 'documents'
  | 'recruitment'
  | 'recruitment-dashboard'
  | 'calendar'
  | 'reports'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'crm'
  | 'projects'
  | 'analytics';

export interface ClientRequirement {
  id: string;
  requirementId: string;
  clientName: string;
  companyName: string;
  projectType: string;
  technologyStack: string[];
  priority: 'Critical' | 'High' | 'Medium' | 'Normal';
  budget: string;
  timeline: string;
  documentsCount: number;
  assignedTeam: string;
  status: 'Reviewing' | 'In Progress' | 'Approved' | 'Completed' | 'Pending Specs';
  createdAt: string;
  notes?: string;
}

export const DEFAULT_CLIENT_REQUIREMENTS: ClientRequirement[] = [
  {
    id: 'req-001',
    requirementId: 'REQ-2025-001',
    clientName: 'Nitin Kumar',
    companyName: 'Apex Logistics Global',
    projectType: 'AI SaaS Fleet Optimization Platform',
    technologyStack: ['React', 'Node.js', 'Python AI', 'PostgreSQL', 'Docker'],
    priority: 'Critical',
    budget: '₹14,50,000',
    timeline: '4 Months',
    documentsCount: 4,
    assignedTeam: 'Fullstack & AI Engineering Team',
    status: 'In Progress',
    createdAt: '2025-05-10',
    notes: 'Real-time GPS tracking with dynamic route optimization algorithms and ERP integration.',
  },
  {
    id: 'req-002',
    requirementId: 'REQ-2025-002',
    clientName: 'Suresh Varma',
    companyName: 'Zenith Health Solutions',
    projectType: 'Telemedicine Mobile App & HIPAA Cloud',
    technologyStack: ['Flutter', 'AWS HIPAA', 'WebRTC', 'FastAPI'],
    priority: 'High',
    budget: '₹18,00,000',
    timeline: '5 Months',
    documentsCount: 6,
    assignedTeam: 'Mobile App & Cloud Team',
    status: 'Reviewing',
    createdAt: '2025-05-12',
    notes: 'Encrypted patient video consultations and digital prescription module with doctor portal.',
  },
  {
    id: 'req-003',
    requirementId: 'REQ-2025-003',
    clientName: 'Pooja Reddy',
    companyName: 'BlueFin Tech Corp',
    projectType: 'Enterprise CRM & Customer Portal',
    technologyStack: ['React', 'TypeScript', 'TailwindCSS', 'Supabase'],
    priority: 'Medium',
    budget: '₹9,50,000',
    timeline: '3 Months',
    documentsCount: 3,
    assignedTeam: 'Frontend & UI/UX Guild',
    status: 'Approved',
    createdAt: '2025-05-14',
    notes: 'Customer self-service ticket desk with automated SLA notifications and multi-brand dashboards.',
  },
  {
    id: 'req-004',
    requirementId: 'REQ-2025-004',
    clientName: 'Vikram Mehta',
    companyName: 'Kaveri Industrial Systems',
    projectType: 'IoT Sensor Analytics & Predictive Maintenance',
    technologyStack: ['Go', 'MQTT', 'InfluxDB', 'Grafana', 'React'],
    priority: 'High',
    budget: '₹16,00,000',
    timeline: '4.5 Months',
    documentsCount: 5,
    assignedTeam: 'IoT & Backend Engineering',
    status: 'Pending Specs',
    createdAt: '2025-05-15',
    notes: 'Telemetry ingestion from factory PLC sensors with vibration anomaly detection and automated alert dispatch.',
  },
];

export const DEFAULT_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Apex Logistics Global',
    industry: 'Logistics & Supply Chain',
    location: 'Hyderabad, Telangana',
    contactPerson: 'Nitin Kumar (VP Technology)',
    email: 'nitin@apexlogistics.com',
    phone: '+91 98765 43210',
    activeProjects: 2,
    totalBilled: '₹28,50,000',
    status: 'Active Client',
  },
  {
    id: 'comp-2',
    name: 'Zenith Health Solutions',
    industry: 'Healthcare & MedTech',
    location: 'Bengaluru, Karnataka',
    contactPerson: 'Suresh Varma (CTO)',
    email: 'suresh@zenithhealth.io',
    phone: '+91 91234 56789',
    activeProjects: 1,
    totalBilled: '₹18,00,000',
    status: 'Active Client',
  },
  {
    id: 'comp-3',
    name: 'BlueFin Tech Corp',
    industry: 'FinTech & Banking Solutions',
    location: 'Mumbai, Maharashtra',
    contactPerson: 'Pooja Reddy (Head of Product)',
    email: 'pooja.r@bluefintech.com',
    phone: '+91 98112 23344',
    activeProjects: 1,
    totalBilled: '₹9,50,000',
    status: 'Onboarding',
  },
  {
    id: 'comp-4',
    name: 'Kaveri Industrial Systems',
    industry: 'Industrial IoT & Automation',
    location: 'Chennai, Tamil Nadu',
    contactPerson: 'Vikram Mehta (Director Engineering)',
    email: 'vikram.m@kaveri-ind.com',
    phone: '+91 97441 55667',
    activeProjects: 1,
    totalBilled: '₹16,00,000',
    status: 'Proposal Review',
  },
];

export const DEFAULT_DOCUMENTS = [
  {
    id: 'DOC-001',
    title: 'Apex Logistics - Master Services Agreement (MSA)',
    client: 'Apex Logistics Global',
    category: 'Legal Contract',
    format: 'PDF',
    size: '2.4 MB',
    date: '2025-05-02',
    status: 'Signed & Executed',
  },
  {
    id: 'DOC-002',
    title: 'Zenith Health - Non-Disclosure Agreement (NDA)',
    client: 'Zenith Health Solutions',
    category: 'NDA',
    format: 'PDF',
    size: '1.1 MB',
    date: '2025-05-06',
    status: 'Countersigned',
  },
  {
    id: 'DOC-003',
    title: 'BlueFin Tech - Scope of Work (SOW) & SLA Annexure',
    client: 'BlueFin Tech Corp',
    category: 'Scope Document',
    format: 'DOCX',
    size: '3.8 MB',
    date: '2025-05-12',
    status: 'Approved',
  },
  {
    id: 'DOC-004',
    title: 'Godavari Wave Technologies - Corporate Pitch Deck 2025',
    client: 'Internal Enterprise Asset',
    category: 'Presentation',
    format: 'PDF',
    size: '14.2 MB',
    date: '2025-04-15',
    status: 'Active',
  },
  {
    id: 'DOC-005',
    title: 'Senior Full Stack React Engineer - Offer Letter Template',
    client: 'HR Talent Asset',
    category: 'HR Document',
    format: 'PDF',
    size: '640 KB',
    date: '2025-05-01',
    status: 'Standardized',
  },
];

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
  // -------------------------------------------------------------
  // Navigation Suite Selection: Home | CRM | Recruitment
  // -------------------------------------------------------------
  const [selectedSuite, setSelectedSuite] = useState<AppSuite>(() => {
    const saved = localStorage.getItem('gw_crm_selected_suite') as AppSuite;
    if (saved === 'crm' || saved === 'recruitment' || saved === 'home') return saved;
    return 'home';
  });

  const [activeModule, setActiveModule] = useState<MainModule>(() => {
    const saved = localStorage.getItem('gw_crm_active_module') as MainModule;
    if (saved && (saved as string) !== 'invoices') return saved;
    return 'home';
  });

  // Client Requirements Store & Modal States
  const [clientRequirements, setClientRequirements] = useState<ClientRequirement[]>(() => {
    try {
      const saved = localStorage.getItem('gw_crm_client_requirements');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_CLIENT_REQUIREMENTS;
  });

  const [isAddRequirementModalOpen, setIsAddRequirementModalOpen] = useState<boolean>(false);
  const [editingRequirement, setEditingRequirement] = useState<ClientRequirement | null>(null);
  const [requirementSearch, setRequirementSearch] = useState<string>('');
  const [requirementPriorityFilter, setRequirementPriorityFilter] = useState<string>('All');
  const [requirementStatusFilter, setRequirementStatusFilter] = useState<string>('All');

  useEffect(() => {
    try {
      localStorage.setItem('gw_crm_selected_suite', selectedSuite);
    } catch (e) {
      console.error(e);
    }
  }, [selectedSuite]);

  useEffect(() => {
    try {
      localStorage.setItem('gw_crm_active_module', activeModule);
    } catch (e) {
      console.error(e);
    }
  }, [activeModule]);

  useEffect(() => {
    try {
      localStorage.setItem('gw_crm_client_requirements', JSON.stringify(clientRequirements));
    } catch (e) {
      console.error(e);
    }
  }, [clientRequirements]);

  const handleSaveRequirement = (req: ClientRequirement) => {
    setClientRequirements((prev) => {
      const idx = prev.findIndex((r) => r.id === req.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = req;
        return updated;
      }
      return [req, ...prev];
    });
    setIsAddRequirementModalOpen(false);
    setEditingRequirement(null);
    showToast(`Requirement ${req.requirementId} saved successfully`);
  };

  const handleDeleteRequirement = (id: string) => {
    if (window.confirm('Are you sure you want to delete this requirement specification?')) {
      setClientRequirements((prev) => prev.filter((r) => r.id !== id));
      showToast('Requirement removed successfully');
    }
  };

  const handleDownloadRequirementBrief = (req: ClientRequirement) => {
    const brief = `=====================================================
GODAVARI WAVE TECHNOLOGIES - CLIENT REQUIREMENT SPECIFICATION
=====================================================
Requirement ID: ${req.requirementId}
Client Name:    ${req.clientName}
Company:        ${req.companyName}
Project Type:   ${req.projectType}
Priority:       ${req.priority}
Status:         ${req.status}
Budget:         ${req.budget}
Timeline:       ${req.timeline}
Assigned Team:  ${req.assignedTeam}
Created Date:   ${req.createdAt}
Tech Stack:     ${req.technologyStack.join(', ')}

Notes & Specifications:
${req.notes || 'No special notes logged.'}
=====================================================`;
    const blob = new Blob([brief], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${req.requirementId}-${req.companyName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloaded specification brief for ${req.requirementId}`);
  };
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

  // Initial Background Database Synchronization
  useEffect(() => {
    Promise.allSettled([
      syncLeadsWithDatabase(),
      syncApplicationsWithDatabase(),
      syncInterviewsWithDatabase()
    ]);
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
  const [editingClient, setEditingClient] = useState<Lead | null>(null);
  const [clientCurrentPage, setClientCurrentPage] = useState<number>(1);
  const [clientPageSize, setClientPageSize] = useState<number>(10);
  const [isClientAdvancedFiltersOpen, setIsClientAdvancedFiltersOpen] = useState<boolean>(false);

  // Modals & Drawers: Client
  const [drawerClient, setDrawerClient] = useState<Lead | null>(null);
  const [drawerClientTab, setDrawerClientTab] = useState<'company' | 'contact' | 'meeting' | 'projects' | 'notes' | 'timeline'>('company');
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
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = useState<boolean>(false);
  const [newCandidateData, setNewCandidateData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Software Developer',
    experienceLevel: 'Fresher' as 'Fresher' | 'Experienced',
    experienceYears: '0 – 1 Years',
    currentLocation: 'Hyderabad',
    qualification: 'B.Tech / MCA',
    skills: 'React, TypeScript, Node.js',
    notes: 'Direct entry via HR dashboard',
  });

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

  const isAllAppsSelected = filteredApplications.length > 0 && filteredApplications.every((a) => selectedAppIds.includes(a.id));
  const toggleSelectAllApps = () => {
    if (isAllAppsSelected) setSelectedAppIds([]);
    else setSelectedAppIds(filteredApplications.map((a) => a.id));
  };
  const toggleSelectAppRow = (id: string) => {
    setSelectedAppIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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
      setSelectedSuite('home');
      setActiveModule('home');
      localStorage.setItem('gw_crm_selected_suite', 'home');
      localStorage.setItem('gw_crm_active_module', 'home');
      setAuthError('');
      showToast('Welcome to Godavari Wave Technologies Management Portal');
    } else {
      setAuthError('Invalid username or password. Please verify your administrator credentials.');
    }
  };

  const handleLogout = () => {
    logoutHR();
    setIsAuthenticated(false);
    setSelectedSuite('home');
    setActiveModule('home');
    localStorage.removeItem('gw_crm_selected_suite');
    localStorage.removeItem('gw_crm_active_module');
    showToast('Signed out of Enterprise Management Portal');
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
      <div
        style={{
          backgroundColor: '#F4F8FC',
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.8) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(219, 234, 254, 0.7) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(240, 249, 255, 0.9) 0px, transparent 50%)
          `,
        }}
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans"
      >
        {/* Subtle Ambient Shapes */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-300/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-sky-300/20 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (onBackToSite) onBackToSite();
                else window.location.href = '/';
              }}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0066CC] hover:text-[#0052A3] transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Main Website</span>
            </button>
            <span className="text-[11px] font-mono text-[#64748B] font-bold">Enterprise Suite v3.2</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#D8E7F5',
              boxShadow: '0 25px 60px rgba(0, 102, 204, 0.12)',
            }}
            className="p-8 sm:p-10 text-center rounded-[20px] border text-[#1E293B]"
          >
            <div className="mx-auto h-20 w-20 rounded-2xl bg-white border border-[#D8E7F5] flex items-center justify-center p-2.5 shadow-md">
              <img src="/images/gw-logo-mark.png" alt="Godavari Wave Technologies" className="h-full w-full object-contain" />
            </div>

            <div className="mt-4 space-y-1">
              <h2
                style={{ color: '#082F49', fontSize: '16px' }}
                className="font-display text-[16px] font-bold text-[#082F49] tracking-wider uppercase"
              >
                GODAVARI WAVE TECHNOLOGIES
              </h2>
              <p className="text-xs font-mono font-bold text-[#0066CC] uppercase tracking-wider">
                Enterprise Management Portal
              </p>
              <p className="text-xs text-[#64748B] pt-1">
                Enter your authorized HR credentials to access CRM and Recruitment workspaces.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="mt-6 space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">
                  Portal Username
                </label>
                <div className="relative">
                  <User className="h-4 w-4 absolute left-3.5 top-3.5 text-[#0066CC]" />
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Username (e.g. godavarihrdashboard)"
                    required
                    style={{
                      height: '46px',
                      borderRadius: '12px',
                      borderColor: '#D8E7F5',
                      backgroundColor: '#F8FAFC',
                      color: '#1E293B',
                    }}
                    className="w-full pl-10 pr-4 text-xs sm:text-sm border focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 font-mono font-semibold placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold text-[#0066CC] uppercase mb-1">
                  Access Password
                </label>
                <div className="relative">
                  <Key className="h-4 w-4 absolute left-3.5 top-3.5 text-[#0066CC]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter administrator password"
                    required
                    style={{
                      height: '46px',
                      borderRadius: '12px',
                      borderColor: '#D8E7F5',
                      backgroundColor: '#F8FAFC',
                      color: '#1E293B',
                    }}
                    className="w-full pl-10 pr-10 text-xs sm:text-sm border focus:bg-white focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 font-mono font-semibold placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#64748B] hover:text-[#0066CC] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs flex items-center gap-2 font-medium">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                style={{
                  height: '48px',
                  background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                  borderRadius: '12px',
                }}
                className="w-full font-bold text-sm text-white shadow-lg shadow-[#0066CC]/25 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="h-4 w-4 text-white" />
                <span>Sign In to Portal</span>
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[#E5EDF5] text-center">
              <p className="text-[11px] font-mono text-[#64748B] flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0066CC]" />
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
        return 'bg-blue-50 text-[#0066CC] border border-blue-200';
      case 'In Discussion':
      case 'Qualified':
        return 'bg-[#EEF6FF] text-[#0052A3] border border-[#B9DCFE]';
      case 'Proposal Sent':
      case 'Meeting':
        return 'bg-sky-50 text-sky-800 border border-sky-200';
      case 'Negotiation':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'Converted':
      case 'Completed':
      case 'Selected':
        return 'bg-blue-600 text-white border border-blue-700 shadow-xs';
      case 'Lost':
      case 'Rejected':
        return 'bg-slate-100 text-[#64748B] border border-slate-200';
      default:
        return 'bg-slate-100 text-[#64748B] border border-slate-200';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
      case 'High':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Low':
      case 'Normal':
        return 'bg-slate-100 text-[#64748B] border border-slate-200';
      default:
        return 'bg-slate-100 text-[#64748B] border border-slate-200';
    }
  };

  // -------------------------------------------------------------
  // AUTHENTICATED ENTERPRISE CRM DASHBOARD
  // -------------------------------------------------------------
  return (
    <div
      style={{
        backgroundColor: '#F4F8FC',
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(224, 242, 254, 0.7) 0px, transparent 40%),
          radial-gradient(at 100% 0%, rgba(219, 234, 254, 0.6) 0px, transparent 40%),
          radial-gradient(at 50% 100%, rgba(240, 247, 255, 0.9) 0px, transparent 50%)
        `,
        color: '#1E293B',
      }}
      className="min-h-screen flex flex-col md:flex-row relative font-sans text-[#1E293B]"
    >
      {/* Ambient Enterprise Background Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-sky-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
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
      {/* SIDEBAR: GODAVARI WAVE ENTERPRISE SIDEBAR (280PX)         */}
      {/* ========================================================= */}
      <aside
        style={{
          backgroundColor: '#082F49',
          borderColor: '#0E3D60',
          boxShadow: '4px 0 28px rgba(8, 47, 73, 0.35)',
        }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r transition-all duration-300 md:static md:rounded-r-[24px]',
          isSidebarCollapsed ? 'w-20' : 'w-[280px]',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center p-5 border-b border-[#0E3D60] space-y-3">
          <div className="flex items-center justify-between w-full">
            <div
              onClick={() => {
                setSelectedSuite('home');
                setActiveModule('home');
              }}
              className="flex items-center gap-3 overflow-hidden cursor-pointer group"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/10 p-2 border border-white/20 shadow-md flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform backdrop-blur-md">
                <img src="/images/gw-logo-mark.png" alt="Godavari Wave Technologies" className="h-full w-full object-contain" />
              </div>
              {!isSidebarCollapsed && (
                <div className="truncate">
                  <span className="font-display font-extrabold text-sm text-white tracking-tight block">
                    Godavari Wave
                  </span>
                  <span className="text-[10px] font-mono text-[#0EA5E9] uppercase tracking-wider block font-bold">
                    Technologies
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-xl text-slate-400 hover:bg-[#0E3859] hover:text-white transition-colors cursor-pointer"
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

          {!isSidebarCollapsed && (
            <div className="w-full flex items-center justify-between pt-1 text-[11px] font-mono">
              <span className="text-sky-200/70 font-semibold tracking-tight">Enterprise Portal</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync Online
              </span>
            </div>
          )}
        </div>

        {/* Sidebar Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-2">
          {/* Top Home Button - Always Present in Every Suite */}
          <button
            type="button"
            onClick={() => {
              setSelectedSuite('home');
              setActiveModule('home');
              setIsMobileSidebarOpen(false);
            }}
            style={{
              height: '52px',
              borderRadius: '14px',
              background: (selectedSuite === 'home' || activeModule === 'home') ? 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)' : 'transparent',
              color: (selectedSuite === 'home' || activeModule === 'home') ? '#FFFFFF' : '#CBD5E1',
              boxShadow: (selectedSuite === 'home' || activeModule === 'home') ? '0 4px 16px rgba(0, 102, 204, 0.40)' : 'none',
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
              !(selectedSuite === 'home' || activeModule === 'home') && 'hover:bg-[#0E3859] hover:text-white hover:translate-x-1'
            )}
            title="Module Selection Home"
          >
            {(selectedSuite === 'home' || activeModule === 'home') && (
              <span className="absolute left-1.5 top-3.5 bottom-3.5 w-1.5 rounded-full bg-[#0EA5E9]" />
            )}
            <div className={cn(
              'h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
              (selectedSuite === 'home' || activeModule === 'home') ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:bg-[#0066CC] group-hover:text-white'
            )}>
              <Home className="h-4 w-4" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <span className="truncate block font-bold text-xs sm:text-sm">Home</span>
              </div>
            )}
          </button>

          {/* ======================================================= */}
          {/* 1. CRM WORKSPACE SIDEBAR (SHOWS ONLY WHEN CRM SELECTED) */}
          {/* ======================================================= */}
          {selectedSuite === 'crm' && (
            <>
              {!isSidebarCollapsed && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase text-sky-300/70 tracking-wider font-bold">
                  CRM Modules
                </div>
              )}

              {[
                { id: 'dashboard', label: 'Dashboard', icon: Layers, count: undefined },
                { id: 'leads', label: 'Website Leads', icon: Target, count: leads.length },
                { id: 'clients', label: 'Clients', icon: Building2, count: leads.filter((l) => l.status === 'Converted').length },
                { id: 'connected-clients', label: 'Connected Clients', icon: Users, count: leads.filter((l) => l.status === 'Converted' || l.meetingStatus === 'Scheduled').length },
                { id: 'companies', label: 'Companies', icon: Building, count: DEFAULT_COMPANIES.length },
                { id: 'meetings', label: 'Meetings', icon: Calendar, count: leads.filter((l) => l.meetingStatus === 'Scheduled').length },
                { id: 'followups', label: 'Follow Ups', icon: Clock, count: leads.filter((l) => l.nextFollowUp).length },
                { id: 'projects', label: 'Projects', icon: FolderKanban, count: leads.length },
                { id: 'requirements', label: 'Requirements', icon: ClipboardList, count: clientRequirements.length },
                { id: 'documents', label: 'Documents', icon: FolderOpen, count: DEFAULT_DOCUMENTS.length },
                { id: 'reports', label: 'Reports', icon: BarChart3, count: undefined },
                { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined },
                { id: 'profile', label: 'Profile', icon: User, count: undefined },
                { id: 'settings', label: 'Settings', icon: SettingsIcon, count: undefined },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeModule === item.id || (item.id === 'leads' && activeModule === 'crm' && crmQuickTab === 'leads') || (item.id === 'clients' && activeModule === 'crm' && crmQuickTab === 'clients');
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveModule(item.id as MainModule);
                      if (item.id === 'leads') setCrmQuickTab('leads');
                      if (item.id === 'clients') setCrmQuickTab('clients');
                      setIsMobileSidebarOpen(false);
                    }}
                    style={{
                      height: '52px',
                      borderRadius: '14px',
                      background: isActive ? 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#CBD5E1',
                      boxShadow: isActive ? '0 4px 16px rgba(0, 102, 204, 0.40)' : 'none',
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
                      !isActive && 'hover:bg-[#0E3859] hover:text-white hover:translate-x-1'
                    )}
                    title={item.label}
                  >
                    {isActive && (
                      <span className="absolute left-1.5 top-3.5 bottom-3.5 w-1.5 rounded-full bg-[#0EA5E9]" />
                    )}
                    <div className={cn(
                      'h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:bg-[#0066CC] group-hover:text-white'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isSidebarCollapsed && (
                      <div className="flex-1 text-left min-w-0">
                        <span className="truncate block font-bold text-xs sm:text-sm">{item.label}</span>
                      </div>
                    )}
                    {!isSidebarCollapsed && item.count !== undefined && (
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold',
                        item.id === 'notifications' ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#0E3859] text-[#38BDF8]'
                      )}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {/* ======================================================= */}
          {/* 2. RECRUITMENT WORKSPACE (SHOWS ONLY WHEN RECRUITMENT)  */}
          {/* ======================================================= */}
          {selectedSuite === 'recruitment' && (
            <>
              {!isSidebarCollapsed && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase text-sky-300/70 tracking-wider font-bold">
                  Recruitment Modules
                </div>
              )}

              {[
                { id: 'recruitment-dashboard', label: 'Dashboard', icon: Layers, count: undefined },
                { id: 'jobs', label: 'Job Openings', icon: Sparkles, count: jobs.length },
                { id: 'applications', label: 'Applications', icon: UserCheck, count: applications.length },
                { id: 'candidates', label: 'Candidates', icon: Users, count: applications.length },
                { id: 'interviews', label: 'Interviews', icon: Video, count: interviews.length },
                { id: 'emails', label: 'Email Applications', icon: Mail, count: unreadEmailsCount > 0 ? unreadEmailsCount : undefined },
                { id: 'calendar', label: 'Calendar', icon: CalendarDays, count: interviews.filter((i) => i.status === 'Scheduled').length },
                { id: 'reports', label: 'Recruitment Reports', icon: BarChart3, count: undefined },
                { id: 'notifications', label: 'Notifications', icon: Bell, count: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined },
                { id: 'profile', label: 'Profile', icon: User, count: undefined },
                { id: 'settings', label: 'Settings', icon: SettingsIcon, count: undefined },
              ].map((item) => {
                const Icon = item.icon;
                const isRecSub = ['jobs', 'applications', 'candidates', 'interviews', 'emails'].includes(item.id);
                const isActive = isRecSub ? (activeModule === 'recruitment' && recruitmentQuickTab === item.id) : activeModule === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (isRecSub) {
                        setActiveModule('recruitment');
                        setRecruitmentQuickTab(item.id as RecruitmentQuickTab);
                      } else {
                        setActiveModule(item.id as MainModule);
                      }
                      setIsMobileSidebarOpen(false);
                    }}
                    style={{
                      height: '52px',
                      borderRadius: '14px',
                      background: isActive ? 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)' : 'transparent',
                      color: isActive ? '#FFFFFF' : '#CBD5E1',
                      boxShadow: isActive ? '0 4px 16px rgba(0, 102, 204, 0.40)' : 'none',
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer group relative',
                      !isActive && 'hover:bg-[#0E3859] hover:text-white hover:translate-x-1'
                    )}
                    title={item.label}
                  >
                    {isActive && (
                      <span className="absolute left-1.5 top-3.5 bottom-3.5 w-1.5 rounded-full bg-[#0EA5E9]" />
                    )}
                    <div className={cn(
                      'h-8 w-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                      isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:bg-[#0066CC] group-hover:text-white'
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    {!isSidebarCollapsed && (
                      <div className="flex-1 text-left min-w-0">
                        <span className="truncate block font-bold text-xs sm:text-sm">{item.label}</span>
                      </div>
                    )}
                    {!isSidebarCollapsed && item.count !== undefined && (
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold',
                        item.id === 'notifications' ? 'bg-rose-500 text-white animate-pulse' : 'bg-[#0E3859] text-[#38BDF8]'
                      )}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {/* ======================================================= */}
          {/* 3. HOME WORKSPACE (WHEN ON LANDING PAGE)                */}
          {/* ======================================================= */}
          {selectedSuite === 'home' && (
            <>
              {!isSidebarCollapsed && (
                <div className="px-3 pt-3 pb-1 text-[10px] font-mono uppercase text-sky-300/70 tracking-wider font-bold">
                  Workspace Portals
                </div>
              )}

              {/* Enter CRM Portal button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedSuite('crm');
                  setActiveModule('dashboard');
                  setIsMobileSidebarOpen(false);
                }}
                style={{ height: '52px', borderRadius: '14px' }}
                className="w-full flex items-center justify-between px-3 text-xs sm:text-sm font-bold text-white bg-[#0E3859] hover:bg-[#15466F] border border-blue-400/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[#0EA5E9] group-hover:scale-105 transition-transform">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <span className="truncate">Enter CRM</span>
                </div>
                {!isSidebarCollapsed && (
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>

              {/* Enter Recruitment Portal button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedSuite('recruitment');
                  setActiveModule('recruitment-dashboard');
                  setIsMobileSidebarOpen(false);
                }}
                style={{ height: '52px', borderRadius: '14px' }}
                className="w-full flex items-center justify-between px-3 text-xs sm:text-sm font-bold text-white bg-[#0E3859] hover:bg-[#15466F] border border-blue-400/20 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="h-8 w-8 rounded-xl bg-white/10 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <span className="truncate">Enter Recruitment</span>
                </div>
                {!isSidebarCollapsed && (
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>

              <div className="pt-2 border-t border-[#0E3D60] my-2" />

              {/* Notifications */}
              <button
                type="button"
                onClick={() => {
                  setActiveModule('notifications');
                  setIsMobileSidebarOpen(false);
                }}
                style={{ height: '52px', borderRadius: '14px' }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold text-slate-300 hover:bg-[#0E3859] hover:text-white transition-colors cursor-pointer',
                  activeModule === 'notifications' && 'bg-[#0E3859] text-white font-bold'
                )}
              >
                <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                  <Bell className="h-4 w-4" />
                </div>
                {!isSidebarCollapsed && <span>Notifications</span>}
              </button>

              {/* Profile */}
              <button
                type="button"
                onClick={() => {
                  setActiveModule('profile');
                  setIsMobileSidebarOpen(false);
                }}
                style={{ height: '52px', borderRadius: '14px' }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold text-slate-300 hover:bg-[#0E3859] hover:text-white transition-colors cursor-pointer',
                  activeModule === 'profile' && 'bg-[#0E3859] text-white font-bold'
                )}
              >
                <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                {!isSidebarCollapsed && <span>Profile Desk</span>}
              </button>

              {/* Settings */}
              <button
                type="button"
                onClick={() => {
                  setActiveModule('settings');
                  setIsMobileSidebarOpen(false);
                }}
                style={{ height: '52px', borderRadius: '14px' }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 text-xs sm:text-sm font-semibold text-slate-300 hover:bg-[#0E3859] hover:text-white transition-colors cursor-pointer',
                  activeModule === 'settings' && 'bg-[#0E3859] text-white font-bold'
                )}
              >
                <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                  <SettingsIcon className="h-4 w-4" />
                </div>
                {!isSidebarCollapsed && <span>Portal Settings</span>}
              </button>
            </>
          )}
        </div>

        {/* Sidebar Footer Switch Module & User Card */}
        <div className="p-4 border-t border-[#0E3D60] space-y-2.5">
          {/* Quick Cross-Suite Switch Pill */}
          {selectedSuite === 'crm' && (
            <button
              type="button"
              onClick={() => {
                setSelectedSuite('recruitment');
                setActiveModule('recruitment-dashboard');
                showToast('Switched to Recruitment Workspace');
              }}
              className={cn(
                'w-full h-11 flex items-center gap-2 px-3 rounded-xl text-xs font-bold text-sky-300 bg-[#0E3859] hover:bg-[#15466F] transition-all cursor-pointer shadow-xs',
                isSidebarCollapsed ? 'justify-center' : 'justify-between'
              )}
              title="Switch to Recruitment Workspace"
            >
              <div className="flex items-center gap-2 truncate">
                <ArrowLeftRight className="h-4 w-4 text-[#38BDF8] shrink-0" />
                {!isSidebarCollapsed && <span className="truncate">Switch to Recruitment</span>}
              </div>
              {!isSidebarCollapsed && <ChevronRight className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
            </button>
          )}

          {selectedSuite === 'recruitment' && (
            <button
              type="button"
              onClick={() => {
                setSelectedSuite('crm');
                setActiveModule('dashboard');
                showToast('Switched to CRM Workspace');
              }}
              className={cn(
                'w-full h-11 flex items-center gap-2 px-3 rounded-xl text-xs font-bold text-sky-300 bg-[#0E3859] hover:bg-[#15466F] transition-all cursor-pointer shadow-xs',
                isSidebarCollapsed ? 'justify-center' : 'justify-between'
              )}
              title="Switch to CRM Workspace"
            >
              <div className="flex items-center gap-2 truncate">
                <ArrowLeftRight className="h-4 w-4 text-[#38BDF8] shrink-0" />
                {!isSidebarCollapsed && <span className="truncate">Switch to CRM</span>}
              </div>
              {!isSidebarCollapsed && <ChevronRight className="h-3.5 w-3.5 text-sky-400 shrink-0" />}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (onBackToSite) onBackToSite();
              else window.location.href = '/';
            }}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#0EA5E9] hover:bg-[#0E3859] hover:text-white transition-colors cursor-pointer',
              isSidebarCollapsed ? 'justify-center' : ''
            )}
            title="Return to Main Website"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            {!isSidebarCollapsed && <span>Return to Main Website</span>}
          </button>

          <div
            style={{ backgroundColor: '#0E3859' }}
            className={cn('rounded-xl p-2.5 flex items-center gap-2.5', isSidebarCollapsed ? 'justify-center' : 'justify-between')}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{ background: 'linear-gradient(135deg, #0066CC 0%, #0EA5E9 100%)' }}
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
        {/* ======================================================= */}
        {/* STICKY TOP NAVIGATION (HEIGHT: 76PX, WHITE ENTERPRISE)   */}
        {/* ======================================================= */}
        <header
          style={{
            height: '76px',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            borderColor: PALETTE.borders,
            boxShadow: '0 4px 20px rgba(0, 102, 204, 0.05)',
          }}
          className="sticky top-0 z-30 backdrop-blur-md border-b px-5 sm:px-8 flex items-center justify-between gap-4 rounded-b-[20px]"
        >
          {/* Left: Sidebar Toggle + Title + Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              style={{ backgroundColor: '#EEF6FF', borderColor: PALETTE.borders, color: PALETTE.primary }}
              className="md:hidden p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>

            <div>
              {/* Dynamic Breadcrumbs Hierarchy */}
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B]">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSuite('home');
                    setActiveModule('home');
                  }}
                  className="font-bold text-[#1E293B] hover:text-[#0066CC] cursor-pointer"
                >
                  Dashboard
                </button>

                {selectedSuite === 'home' || activeModule === 'home' ? (
                  <>
                    <span className="text-slate-400">&gt;</span>
                    <span className="font-semibold text-[#0066CC]">Module Selection Portal</span>
                  </>
                ) : (
                  <>
                    <span className="text-slate-400">&gt;</span>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedSuite === 'crm') setActiveModule('dashboard');
                        else setActiveModule('recruitment-dashboard');
                      }}
                      className="font-bold text-[#0066CC] hover:underline cursor-pointer uppercase text-[10px]"
                    >
                      {selectedSuite === 'crm' ? 'CRM' : 'Recruitment'}
                    </button>
                    <span className="text-slate-400">&gt;</span>
                    <span className="font-semibold text-[#0052A3] capitalize">
                      {activeModule === 'dashboard'
                        ? 'Cockpit'
                        : activeModule === 'leads'
                          ? 'Website Leads'
                          : activeModule === 'clients'
                            ? 'Clients'
                            : activeModule === 'connected-clients'
                              ? 'Connected Clients'
                              : activeModule === 'companies'
                                ? 'Companies'
                                : activeModule === 'meetings'
                                  ? 'Meetings'
                                  : activeModule === 'followups'
                                    ? 'Follow Ups'
                                    : activeModule === 'requirements'
                                      ? 'Requirements'
                                      : activeModule === 'documents'
                                        ? 'Documents'
                                        : activeModule === 'recruitment-dashboard'
                                            ? 'Cockpit'
                                            : activeModule === 'recruitment'
                                              ? recruitmentQuickTab === 'jobs'
                                                ? 'Job Openings'
                                                : recruitmentQuickTab === 'applications'
                                                  ? 'Applications'
                                                  : recruitmentQuickTab === 'candidates'
                                                    ? 'Candidates'
                                                    : recruitmentQuickTab === 'interviews'
                                                      ? 'Interviews'
                                                      : 'Email Applications'
                                              : activeModule}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2.5 mt-0.5">
                <h1 className="font-display text-lg sm:text-xl font-extrabold text-[#1E293B] tracking-tight capitalize leading-none">
                  {selectedSuite === 'home' || activeModule === 'home'
                    ? 'Godavari Wave Management Portal'
                    : activeModule === 'dashboard'
                      ? 'Enterprise Performance Cockpit'
                      : activeModule === 'leads'
                        ? 'Website Enquiry & Lead Management'
                        : activeModule === 'clients'
                          ? 'Client Accounts & Contract Portfolio'
                          : activeModule === 'connected-clients'
                            ? 'Connected Clients Under Active Engagement'
                            : activeModule === 'companies'
                              ? 'Corporate Accounts & Client Directory'
                              : activeModule === 'meetings'
                                ? 'Client Discovery & Demo Schedules'
                                : activeModule === 'followups'
                                  ? 'Lead & Candidate Follow-up Desk'
                                  : activeModule === 'requirements'
                                    ? 'Client Requirements & Project Scope Store'
                                    : activeModule === 'documents'
                                      ? 'Enterprise Documents & Contract Vault'
                                      : activeModule === 'recruitment-dashboard'
                                          ? 'Recruitment Performance Cockpit'
                                          : activeModule === 'recruitment'
                                            ? `Recruitment · ${recruitmentQuickTab === 'jobs' ? 'Job Openings' : recruitmentQuickTab === 'applications' ? 'Candidate Applications' : recruitmentQuickTab === 'candidates' ? 'Candidate Talent Pool' : recruitmentQuickTab === 'interviews' ? 'Interview Schedules' : 'Email Applications'}`
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

                {/* Module Badge Indicator */}
                <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] font-mono text-[10px] font-bold">
                  {selectedSuite === 'crm' ? (
                    <>
                      <Building2 className="h-3 w-3" />
                      <span>CRM Workspace</span>
                    </>
                  ) : selectedSuite === 'recruitment' ? (
                    <>
                      <Briefcase className="h-3 w-3" />
                      <span>Recruitment Workspace</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3" />
                      <span>Portal Hub</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Center: Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              type="button"
              onClick={() => setIsCommandPaletteOpen(true)}
              style={{
                height: '44px',
                backgroundColor: '#F4F8FC',
                borderColor: PALETTE.borders,
                borderRadius: '12px',
              }}
              className="w-full flex items-center justify-between px-4 border text-xs text-[#64748B] hover:bg-[#EEF6FF] hover:border-[#0066CC] transition-all cursor-pointer shadow-xs group"
            >
              <div className="flex items-center gap-2.5 text-[#64748B]">
                <Search className="h-4 w-4 text-[#0066CC]" />
                <span className="group-hover:text-[#1E293B]">Search clients, candidates, jobs, requirements...</span>
              </div>
              <kbd className="px-2 py-0.5 rounded bg-white border border-[#D8E7F5] text-[10px] font-mono text-[#0066CC] font-bold shadow-2xs">
                Ctrl + K
              </kbd>
            </button>
          </div>

          {/* Right: Switch Module + Quick Actions, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dedicated Switch Module Button - Returns to Selection Page Without Logout */}
            <button
              type="button"
              onClick={() => {
                setSelectedSuite('home');
                setActiveModule('home');
                showToast('Switched to Module Selection Home');
              }}
              style={{
                height: '42px',
                backgroundColor: '#EEF6FF',
                borderColor: PALETTE.borders,
                color: PALETTE.primary,
              }}
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 rounded-xl border text-xs font-bold hover:bg-[#EAF5FF] hover:border-[#0066CC] transition-all cursor-pointer shadow-xs"
              title="Return to Module Selection Portal"
            >
              <ArrowLeftRight className="h-4 w-4 text-[#0066CC]" />
              <span className="hidden sm:inline">Switch Module</span>
            </button>

            {/* Quick Actions Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsQuickActionsOpen(!isQuickActionsOpen)}
                style={{
                  height: '42px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.secondary} 100%)`,
                  color: PALETTE.white,
                  boxShadow: '0 4px 14px rgba(0, 102, 204, 0.25)',
                }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 font-bold text-xs hover:brightness-105 active:scale-95 transition-all cursor-pointer text-white"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden md:inline">+ Action</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {isQuickActionsOpen && (
                <div
                  style={{
                    backgroundColor: PALETTE.cards,
                    border: `1px solid ${PALETTE.borders}`,
                    borderRadius: '16px',
                    boxShadow: '0 15px 35px rgba(0, 102, 204, 0.12)',
                  }}
                  className="absolute right-0 mt-2 w-56 p-2 z-50 animate-in fade-in space-y-1 text-xs bg-white border border-[#D8E7F5] rounded-2xl shadow-xl"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddClientModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Users className="h-4 w-4 text-[#0066CC]" />
                    <span>+ Add Client Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddRequirementModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <ClipboardList className="h-4 w-4 text-[#0066CC]" />
                    <span>+ Add Client Requirement</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateJobModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-[#0EA5E9]" />
                    <span>+ Post Job Opening</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsScheduleInterviewModalOpen(true);
                      setIsQuickActionsOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <Video className="h-4 w-4 text-[#0052A3]" />
                    <span>+ Schedule Interview</span>
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsPopoverOpen(!isNotificationsPopoverOpen)}
                style={{
                  height: '42px',
                  width: '42px',
                  backgroundColor: '#F4F8FC',
                  borderColor: PALETTE.borders,
                  borderRadius: '12px',
                }}
                className="flex items-center justify-center border text-[#64748B] hover:text-[#0066CC] hover:bg-[#EEF6FF] hover:border-[#0066CC] transition-all cursor-pointer relative shadow-xs"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-pulse" />
                )}
              </button>

              {isNotificationsPopoverOpen && (
                <div
                  style={{
                    backgroundColor: PALETTE.cards,
                    border: `1px solid ${PALETTE.borders}`,
                    borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0, 102, 204, 0.12)',
                  }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 p-4 z-50 animate-in fade-in space-y-3 bg-white border border-[#D8E7F5] rounded-2xl shadow-xl"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5EDF5]">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-[#0066CC]" />
                      <h4 className="font-display font-bold text-sm text-[#1E293B]">Live Activity Feed</h4>
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          markAllNotificationsRead();
                          refreshAllData();
                          showToast('All notifications marked as read');
                        }}
                        className="text-[11px] font-bold text-[#0066CC] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-2 text-xs divide-y divide-[#E5EDF5]">
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className="pt-2 first:pt-0 flex items-start gap-3">
                        <div className={cn('h-2 w-2 rounded-full mt-1.5 shrink-0', n.read ? 'bg-slate-300' : 'bg-[#0066CC]')} />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[#1E293B] truncate">{n.title}</p>
                          <p className="text-[11px] text-[#64748B] line-clamp-2">{n.message}</p>
                          <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('notifications');
                      setIsNotificationsPopoverOpen(false);
                    }}
                    className="w-full py-2 text-center text-xs font-bold text-[#0066CC] hover:bg-[#EEF6FF] rounded-xl transition-colors cursor-pointer"
                  >
                    View All Notifications →
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserProfileOpen(!isUserProfileOpen)}
                style={{
                  height: '42px',
                  backgroundColor: '#F4F8FC',
                  borderColor: PALETTE.borders,
                  borderRadius: '12px',
                }}
                className="flex items-center gap-2 px-2.5 sm:px-3 border hover:border-[#0066CC] hover:bg-[#EEF6FF] transition-all cursor-pointer shadow-xs"
              >
                <div
                  style={{ background: `linear-gradient(135deg, ${PALETTE.primary} 0%, ${PALETTE.accent} 100%)` }}
                  className="h-7 w-7 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-sm"
                >
                  R
                </div>
                <div className="hidden sm:block text-left leading-none">
                  <span className="font-bold text-xs text-[#1E293B] block">Renusri</span>
                  <span className="text-[10px] text-[#0066CC] font-medium block">Talent Desk</span>
                </div>
                <ChevronDown className="h-3 w-3 text-[#64748B]" />
              </button>

              {isUserProfileOpen && (
                <div
                  style={{
                    backgroundColor: PALETTE.cards,
                    border: `1px solid ${PALETTE.borders}`,
                    borderRadius: '16px',
                    boxShadow: '0 15px 35px rgba(0, 102, 204, 0.12)',
                  }}
                  className="absolute right-0 mt-2 w-56 p-2 z-50 animate-in fade-in space-y-1 text-xs bg-white border border-[#D8E7F5] rounded-2xl shadow-xl"
                >
                  <div className="p-2 border-b border-[#E5EDF5]">
                    <p className="font-bold text-[#1E293B]">Renusri</p>
                    <p className="text-[11px] text-[#64748B] truncate">renusri@godavariwave.com</p>
                    <p className="text-[10px] font-mono text-[#0066CC] font-bold mt-1">HR & Talent Operations</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('profile');
                      setIsUserProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <User className="h-4 w-4 text-[#0066CC]" />
                    <span>My Profile Desk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('settings');
                      setIsUserProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#EEF6FF] text-[#1E293B] font-semibold text-left cursor-pointer transition-colors"
                  >
                    <SettingsIcon className="h-4 w-4 text-[#0066CC]" />
                    <span>Portal Settings</span>
                  </button>

                  <div className="pt-1 border-t border-[#E5EDF5]">
                    <button
                      type="button"
                      onClick={() => {
                        handleLogout();
                        setIsUserProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-rose-50 text-rose-600 font-semibold text-left cursor-pointer transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
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
          {/* MODULE: MODULE SELECTION HOME LANDING PAGE            */}
          {/* ===================================================== */}
          {(selectedSuite === 'home' || activeModule === 'home') && (
            <div className="space-y-10 max-w-6xl mx-auto py-4 sm:py-8 font-sans">
              {/* 1. Welcome Back Hero Banner with Live Clock & Status */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D8E7F5',
                  boxShadow: '0 8px 30px rgba(0, 102, 204, 0.06)',
                }}
                className="p-6 sm:p-8 rounded-[20px] border flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] text-[11px] font-mono font-extrabold uppercase flex items-center gap-1.5 shadow-2xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#0066CC]" />
                      Management Portal
                    </span>
                    <span className="text-[#64748B] hidden sm:inline">·</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-mono font-bold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync Online
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-[#EEF6FF] border border-blue-200 p-2 flex items-center justify-center shrink-0 shadow-xs">
                      <img src="/images/gw-logo-mark.png" alt="Godavari Wave" className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#1E293B] tracking-tight font-display leading-tight">
                        Welcome Back, Renusri
                      </h1>
                      <p className="text-xs sm:text-sm text-[#64748B] font-medium mt-0.5">
                        Godavari Wave Technologies · Talent & Commercial Operations Console
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-2.5 relative z-10 shrink-0">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-mono font-bold text-[#0066CC] block uppercase tracking-wider">
                      {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span className="text-sm font-mono font-extrabold text-[#1E293B] block">
                      {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#64748B] font-mono bg-[#F8FAFC] border border-[#D8E7F5] px-2.5 py-1 rounded-lg">
                      Suite v3.2 Enterprise
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Quick Statistics Strip (5 Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  {
                    title: 'Total Leads',
                    val: leads.length,
                    sub: 'Website Connects',
                    icon: Target,
                    change: '+14% this wk',
                    action: () => {
                      setSelectedSuite('crm');
                      setActiveModule('leads');
                    },
                  },
                  {
                    title: 'Won Clients',
                    val: leads.filter((l) => l.status === 'Converted').length,
                    sub: 'Active Accounts',
                    icon: Building2,
                    change: '100% Retained',
                    action: () => {
                      setSelectedSuite('crm');
                      setActiveModule('clients');
                    },
                  },
                  {
                    title: 'Engagements',
                    val: leads.filter((l) => l.status === 'Converted' || l.meetingStatus === 'Scheduled').length,
                    sub: 'In Active Delivery',
                    icon: Users,
                    change: 'All Milestones On Track',
                    action: () => {
                      setSelectedSuite('crm');
                      setActiveModule('connected-clients');
                    },
                  },
                  {
                    title: 'Job Openings',
                    val: jobs.length,
                    sub: 'Active Postings',
                    icon: Sparkles,
                    change: '4 Priority Roles',
                    action: () => {
                      setSelectedSuite('recruitment');
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('jobs');
                    },
                  },
                  {
                    title: 'Interviews',
                    val: interviews.length,
                    sub: 'Scheduled Rounds',
                    icon: Video,
                    change: 'Google Meet Ready',
                    action: () => {
                      setSelectedSuite('recruitment');
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('interviews');
                    },
                  },
                ].map((st, idx) => {
                  const Icon = st.icon;
                  return (
                    <div
                      key={idx}
                      onClick={st.action}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D8E7F5',
                      }}
                      className="p-4 rounded-[14px] border shadow-xs hover:border-[#0066CC] hover:shadow-[0_8px_20px_rgba(0,102,204,0.10)] hover:-translate-y-0.5 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between pb-2">
                        <span className="text-[11px] font-mono font-bold text-[#64748B] uppercase">{st.title}</span>
                        <div className="h-7 w-7 rounded-lg bg-[#EEF6FF] text-[#0066CC] flex items-center justify-center group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                      </div>
                      <div>
                        <span className="text-2xl font-extrabold text-[#1E293B] font-display">{st.val}</span>
                        <span className="text-[10px] text-[#64748B] block truncate mt-0.5">{st.sub}</span>
                      </div>
                      <div className="pt-2 mt-2 border-t border-[#E5EDF5]">
                        <span className="text-[10px] font-mono font-semibold text-[#0066CC] block truncate">{st.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3. Quick Actions Standardized Bar (4 Buttons, Height 42px) */}
              <div className="p-4 rounded-[16px] bg-[#EEF6FF] border border-blue-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-[#0066CC]" />
                  <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Quick Action Launcher</span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="h-10 px-4 rounded-[12px] bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Add Client Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateJobModalOpen(true)}
                    className="h-10 px-4 rounded-[12px] bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                    <span>+ Post Job</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScheduleInterviewModalOpen(true)}
                    className="h-10 px-4 rounded-[12px] bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Video className="h-3.5 w-3.5 text-white" />
                    <span>+ Schedule Interview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddRequirementModalOpen(true)}
                    className="h-10 px-4 rounded-[12px] bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <ClipboardList className="h-3.5 w-3.5 text-white" />
                    <span>+ Log Requirement</span>
                  </button>
                </div>
              </div>

              {/* 4. Two Large Responsive Interactive Selection Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* ------------------------------------------------- */}
                {/* CARD 1: CRM & CLIENTS ACQUISITION                 */}
                {/* ------------------------------------------------- */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#D8E7F5',
                    boxShadow: '0 8px 30px rgba(0, 102, 204, 0.08)',
                  }}
                  className="rounded-[20px] border p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#0066CC] hover:shadow-[0_20px_45px_rgba(0,102,204,0.18)] hover:-translate-y-1.5 group cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedSuite('crm');
                    setActiveModule('dashboard');
                    showToast('Welcome to CRM Workspace');
                  }}
                >
                  <div className="space-y-6">
                    {/* Header + Icon */}
                    <div className="flex items-center justify-between">
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                          boxShadow: '0 8px 20px rgba(0, 102, 204, 0.28)',
                        }}
                        className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform"
                      >
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] text-xs font-mono font-bold">
                        Client Operations
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display group-hover:text-[#0066CC] transition-colors">
                        CRM
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        Manage website enquiries, leads, clients, meetings, follow-ups, and active engineering projects.
                      </p>
                    </div>

                    {/* Live Metric Pills */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Leads</span>
                        <span className="text-xl font-extrabold text-[#0066CC] font-mono block">{leads.length}</span>
                      </div>
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Clients</span>
                        <span className="text-xl font-extrabold text-emerald-600 font-mono block">
                          {leads.filter((l) => l.status === 'Converted').length}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Projects</span>
                        <span className="text-xl font-extrabold text-[#0052A3] font-mono block">{leads.length}</span>
                      </div>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-2.5 pt-2 text-xs text-[#1E293B]">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Website Leads (Popup & Contact Us forms)</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Connected Clients & Active Engagements</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Client Project Requirements Store</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Enterprise Documents & Project Scopes</span>
                      </li>
                    </ul>
                  </div>

                  {/* Primary Enter CRM Button */}
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSuite('crm');
                        setActiveModule('dashboard');
                        showToast('Welcome to CRM Workspace');
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
                        boxShadow: '0 8px 24px rgba(0, 102, 204, 0.28)',
                        height: '52px',
                        borderRadius: '14px',
                      }}
                      className="w-full text-white font-bold text-sm flex items-center justify-center gap-2.5 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>Enter CRM</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* ------------------------------------------------- */}
                {/* CARD 2: RECRUITMENT & TALENT ACQUISITION          */}
                {/* ------------------------------------------------- */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#D8E7F5',
                    boxShadow: '0 8px 30px rgba(0, 102, 204, 0.08)',
                  }}
                  className="rounded-[20px] border p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#0066CC] hover:shadow-[0_20px_45px_rgba(0,102,204,0.18)] hover:-translate-y-1.5 group cursor-pointer relative overflow-hidden"
                  onClick={() => {
                    setSelectedSuite('recruitment');
                    setActiveModule('recruitment-dashboard');
                    showToast('Welcome to Recruitment Workspace');
                  }}
                >
                  <div className="space-y-6">
                    {/* Header + Icon */}
                    <div className="flex items-center justify-between">
                      <div
                        style={{
                          background: 'linear-gradient(135deg, #0EA5E9 0%, #0066CC 100%)',
                          boxShadow: '0 8px 20px rgba(14, 165, 233, 0.28)',
                        }}
                        className="h-16 w-16 rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform"
                      >
                        <Briefcase className="h-8 w-8 text-white" />
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] text-xs font-mono font-bold">
                        Talent Acquisition
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display group-hover:text-[#0066CC] transition-colors">
                        Recruitment
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                        Manage job openings, candidates, interviews, applications and hiring.
                      </p>
                    </div>

                    {/* Live Metric Pills */}
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Openings</span>
                        <span className="text-xl font-extrabold text-[#0066CC] font-mono block">{jobs.length}</span>
                      </div>
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Applicants</span>
                        <span className="text-xl font-extrabold text-sky-600 font-mono block">{applications.length}</span>
                      </div>
                      <div className="p-3.5 rounded-[14px] bg-[#F8FAFC] border border-[#D8E7F5] text-center space-y-0.5">
                        <span className="text-[11px] font-mono text-[#64748B] block font-medium">Interviews</span>
                        <span className="text-xl font-extrabold text-[#0052A3] font-mono block">{interviews.length}</span>
                      </div>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-2.5 pt-2 text-xs text-[#1E293B]">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Active Job Openings & Careers CMS</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Candidate Tracking & Email Applications</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Interview Calendar & Google Meet Calls</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#0066CC] shrink-0" />
                        <span>Hiring Pipeline & Recruitment Reports</span>
                      </li>
                    </ul>
                  </div>

                  {/* Primary Enter Recruitment Button */}
                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSuite('recruitment');
                        setActiveModule('recruitment-dashboard');
                        showToast('Welcome to Recruitment Workspace');
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #0EA5E9 0%, #0066CC 100%)',
                        boxShadow: '0 8px 24px rgba(14, 165, 233, 0.28)',
                        height: '52px',
                        borderRadius: '14px',
                      }}
                      className="w-full text-white font-bold text-sm flex items-center justify-center gap-2.5 hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <span>Enter Recruitment</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 5. Pinned Shortcuts & Recently Opened Modules */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-[#0066CC]" />
                    <h3 className="font-display font-bold text-base text-[#1E293B]">Pinned Shortcuts & Fast Navigation</h3>
                  </div>
                  <span className="text-xs text-[#64748B] font-mono">1-Click Direct Access</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {[
                    { label: 'Website Leads', icon: Target, suite: 'crm', mod: 'leads', tab: 'leads' },
                    { label: 'Requirements Store', icon: ClipboardList, suite: 'crm', mod: 'requirements' },
                    { label: 'Job Openings', icon: Sparkles, suite: 'recruitment', mod: 'recruitment', tab: 'jobs' },
                    { label: 'Applications', icon: UserCheck, suite: 'recruitment', mod: 'recruitment', tab: 'applications' },
                    { label: 'Meetings Calendar', icon: CalendarDays, suite: 'recruitment', mod: 'calendar' },
                    { label: 'Documents Vault', icon: FolderOpen, suite: 'crm', mod: 'documents' },
                  ].map((sc, i) => {
                    const Icon = sc.icon;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedSuite(sc.suite as AppSuite);
                          setActiveModule(sc.mod as MainModule);
                          if (sc.tab) {
                            if (sc.suite === 'crm') setCrmQuickTab(sc.tab as CRMQuickTab);
                            if (sc.suite === 'recruitment') setRecruitmentQuickTab(sc.tab as RecruitmentQuickTab);
                          }
                        }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderColor: '#D8E7F5',
                        }}
                        className="p-3.5 rounded-[14px] border shadow-2xs hover:border-[#0066CC] hover:bg-[#EEF6FF] hover:-translate-y-0.5 transition-all cursor-pointer text-left flex items-center gap-3 group"
                      >
                        <div className="h-8 w-8 rounded-xl bg-[#EEF6FF] text-[#0066CC] group-hover:bg-[#0066CC] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-bold text-[#1E293B] group-hover:text-[#0066CC] truncate block">
                          {sc.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Recent Activity Feed Timeline */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#D8E7F5',
                  boxShadow: '0 4px 20px rgba(0, 102, 204, 0.05)',
                }}
                className="p-6 rounded-[20px] border space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#0066CC]" />
                    <h3 className="font-display font-bold text-base text-[#1E293B]">Live Activity Stream & Recent Inbounds</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('notifications');
                    }}
                    className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
                  >
                    View All Notifications ({notifications.length}) →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {leads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="p-4 rounded-[14px] border border-[#D8E7F5] bg-[#F8FAFC] hover:bg-[#EEF6FF] transition-colors space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#0066CC] border border-blue-200">
                          {lead.source}
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B]">{lead.submittedAt?.split('T')[0] || 'Recent'}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#1E293B] truncate">{lead.name}</h4>
                        <p className="text-[11px] text-[#64748B] truncate">{lead.company || 'Enterprise Lead'} · {lead.service}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: EXECUTIVE DASHBOARD                           */}
          {/* ===================================================== */}
          {activeModule === 'dashboard' && (
            <div className="space-y-8">
              {/* Page Title & Navigation Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5EDF5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                      Executive Overview
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Godavari Wave CRM & Talent System</span>
                  </div>
                  <h1 className="text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                    Enterprise Performance Cockpit
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModule('crm')}
                    className="h-11 px-5 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-white font-bold text-xs hover:bg-[#EEF6FF] transition-all cursor-pointer shadow-sm"
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
                  { key: 'projects', title: 'Active Projects', value: leads.filter((l) => Boolean(l.project)).length, growth: 'Client Projects', icon: FolderKanban, spark: [2, 3, 4, 5, 6, 7] },
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
                        'p-6 border rounded-2xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer group bg-white text-center flex flex-col items-center justify-center',
                        isSelected
                          ? 'border-[#00D4FF] shadow-lg shadow-cyan-500/20'
                          : 'border-[#D8E7F5] shadow-sm'
                      )}
                    >
                      {/* Cyan/Blue Top Highlight */}
                      <div
                        className={cn(
                          'absolute top-0 inset-x-0 h-[3px] transition-all',
                          isSelected
                            ? 'bg-gradient-to-r from-[#0066CC] to-[#00D4FF]'
                            : 'bg-[#EEF6FF] group-hover:bg-[#00D4FF]'
                        )}
                      />

                      <div className="h-11 w-11 rounded-xl bg-[#0066CC]/20 text-[#38BDF8] flex items-center justify-center border border-[#0066CC]/30 mb-2">
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="text-[14px] font-semibold text-[#64748B] text-center">{kpi.title}</span>

                      <p className="mt-2 text-[34px] font-extrabold text-[#1E293B] font-display leading-none text-center">
                        {kpi.value}
                      </p>

                      <div className="mt-4 pt-3 border-t border-[#E5EDF5] w-full flex items-center justify-center gap-2.5">
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-4 mt-20px gap-20px">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5EDF5]">
                    <div className="flex items-center gap-2.5">
                      <Users className="h-5 w-5 text-[#38BDF8]" />
                      <h3 className="font-display font-bold text-base text-[#1E293B]">Client Relationship Stream</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModule('crm')}
                      className="text-xs font-mono font-bold text-[#38BDF8] hover:text-[#00D4FF] hover:underline"
                    >
                      View CRM Desk →
                    </button>
                  </div>

                  <div className="divide-y divide-[#E5EDF5] text-xs">
                    {leads.slice(0, 5).map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          setActiveModule('crm');
                          setDrawerClient(l);
                        }}
                        className="py-3.5 flex items-center justify-between hover:bg-[#F0F7FF] px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="font-bold text-[#1E293B] truncate text-sm">{l.name}</p>
                          <p className="text-[12px] text-[#64748B] truncate">{l.company || 'Enterprise Client'} · {l.service}</p>
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
                            className="p-2 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white"
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5EDF5]">
                    <div className="flex items-center gap-2.5">
                      <GraduationCap className="h-5 w-5 text-[#38BDF8]" />
                      <h3 className="font-display font-bold text-base text-[#1E293B]">Talent Acquisition Pipeline</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModule('recruitment')}
                      className="text-xs font-mono font-bold text-[#38BDF8] hover:text-[#00D4FF] hover:underline"
                    >
                      View Applications →
                    </button>
                  </div>

                  <div className="divide-y divide-[#E5EDF5] text-xs">
                    {applications.slice(0, 5).map((app) => (
                      <div
                        key={app.id}
                        onClick={() => {
                          setActiveModule('recruitment');
                          setDrawerCandidate(app);
                        }}
                        className="py-3.5 flex items-center justify-between hover:bg-[#F0F7FF] px-3 rounded-xl transition-all cursor-pointer"
                      >
                        <div className="min-w-0 pr-3">
                          <p className="font-bold text-[#1E293B] truncate text-sm">{app.name}</p>
                          <p className="text-[12px] text-[#64748B] truncate">{app.position} · {app.experienceLevel}</p>
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
                            className="p-2 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white"
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
                className="p-6 sm:p-8 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-6"
              >
                {/* Header & Quick Action Buttons */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-6 border-b border-[#E5EDF5]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Live Leadsheet Sync Active
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-mono">Real-time Website Connects</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#1E293B] font-display mt-2 tracking-tight">
                      Leadsheet Client Connects & Deal Inflow
                    </h2>
                    <p className="text-sm text-[#64748B] mt-1">
                      Direct stream of incoming client inquiries captured via the website Leadsheet Popup, Contact Page, and corporate inbound channels.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleAddTestLeadsheetConnect}
                      className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      title="Simulate incoming website popup leadsheet connect"
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                      <span>+ Test Leadsheet Connect</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRestoreLeadsheetData}
                      className="h-10 px-3.5 rounded-xl border border-[#0066CC] bg-white text-[#0066CC] hover:bg-[#EEF6FF] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      title="Restore default enterprise sample leadsheet entries"
                    >
                      <RefreshCw className="h-3.5 w-3.5 text-[#0066CC]" />
                      <span>Reset / Seed</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        exportLeadsToCSV(filteredClients);
                        showToast(`Exported ${filteredClients.length} leadsheet records to CSV`);
                      }}
                      className="h-10 px-3.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5 text-white" />
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

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to permanently clear all leads and client records from CRM? This cannot be undone.')) {
                          clearAllLeads();
                          refreshAllData();
                          setSelectedClientIds([]);
                          showToast('All CRM records cleared successfully');
                        }
                      }}
                      className="h-10 px-3.5 rounded-xl border border-rose-200 bg-white text-rose-600 font-bold text-xs hover:bg-rose-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                      title="Clear All Leads & Client Records"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Clear All CRM</span>
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
                              : 'bg-[#F8FAFC] border-[#D8E7F5] text-slate-300 hover:bg-[#EEF6FF] hover:text-white'
                          )}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={cn(
                              'px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold',
                              isActive ? 'bg-white/20 text-white' : 'bg-[#EEF6FF] text-slate-300'
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
                      className="w-full h-11 pl-10 pr-4 text-xs rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30 font-medium"
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
                      className="w-full h-11 px-3 text-xs rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] font-medium focus:outline-none focus:border-[#0066CC]"
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
                      className="w-full h-11 px-3 text-xs rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] font-medium focus:outline-none focus:border-[#0066CC]"
                    >
                      <option value="newest">Newest Inbound First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="highest_revenue">Highest Deal Value</option>
                      <option value="lowest_revenue">Lowest Deal Value</option>
                      <option value="priority">Priority Score</option>
                    </select>
                  </div>
                </div>

                {/* Bulk Actions Bar for Clients */}
                {selectedClientIds.length > 0 && (
                  <div className="p-3.5 rounded-xl border border-[#00D4FF]/30 bg-[#0066CC]/20 flex items-center justify-between gap-4 animate-in fade-in flex-wrap">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF]">
                      <CheckSquare className="h-4 w-4" />
                      <span>{selectedClientIds.length} Clients Selected</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          const target = leads.find((l) => selectedClientIds.includes(l.id));
                          if (target) setDrawerClient(target);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const target = leads.find((l) => selectedClientIds.includes(l.id));
                          if (target) setEditingClient(target);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

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
                        Convert Won
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          bulkUpdateLeads(selectedClientIds, { status: 'In Discussion' });
                          refreshAllData();
                          showToast(`Marked ${selectedClientIds.length} as In Discussion`);
                          setSelectedClientIds([]);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer transition-colors"
                      >
                        Mark Active
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${selectedClientIds.length} selected client records?`)) {
                            bulkDeleteLeads(selectedClientIds);
                            refreshAllData();
                            showToast('Deleted selected records');
                            setSelectedClientIds([]);
                          }
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Selected</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedClientIds([])}
                        className="px-2.5 py-1.5 rounded-lg bg-[#EEF6FF] hover:bg-[#E0F2FE] text-slate-300 font-bold cursor-pointer transition-colors"
                      >
                        ✕ Clear Selection
                      </button>
                    </div>
                  </div>
                )}

                {/* The Leadsheet Connects Table */}
                <div className="border border-[#D8E7F5] rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] text-[11px] font-mono font-bold uppercase tracking-wider sticky top-0">
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
                      <tbody className="divide-y divide-[#E5EDF5] font-medium text-white">
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
                                  'hover:bg-[#F0F7FF] cursor-pointer transition-colors',
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
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-[#E5EDF5] font-mono text-[10px] font-bold">
                                      Direct Inbound
                                    </span>
                                  )}
                                  {!['Popup Form', 'Contact Form', 'Direct Entry'].includes(client.source) && (
                                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-700/40 text-slate-300 border border-[#E5EDF5] font-mono text-[10px] font-bold">
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
                                    className="px-2.5 py-1 rounded-full border border-[#D8E7F5] bg-[#F8FAFC] text-[10px] font-mono font-bold text-[#38BDF8] cursor-pointer focus:outline-none"
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
                                      className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white"
                                      title="Send Email from HR"
                                    >
                                      <Mail className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setDrawerClient(client)}
                                      className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-slate-300 hover:bg-[#E0F2FE] hover:text-white"
                                      title="View Full Profile"
                                    >
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingClient(client)}
                                      className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-amber-300 hover:bg-amber-500/20 hover:text-white"
                                      title="Edit Client Details"
                                    >
                                      <Edit3 className="h-3.5 w-3.5" />
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
                  <div className="p-4 border-t border-[#E5EDF5] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="text-slate-400 font-mono">
                      Showing {paginatedClients.length} of {filteredClients.length} client connects
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={clientCurrentPage <= 1}
                        onClick={() => setClientCurrentPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-[#EEF6FF]"
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
                        className="px-3 py-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-white font-bold disabled:opacity-40 cursor-pointer hover:bg-[#EEF6FF]"
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5EDF5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] text-[11px] font-mono font-bold uppercase">
                      Website Inbound Stream
                    </span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-mono">Real-time Homepage Popup & Inquiries</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                    Website Enquiry & Lead Management
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
                    Every enquiry from the website popup lead form and contact page appears here instantly for HR qualification and client conversion.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleAddTestLeadsheetConnect}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                    title="Simulate a real-time website popup inquiry"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                    <span>+ Test Popup Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      exportLeadsToCSV(filteredClients);
                      showToast(`Exported ${filteredClients.length} leads to CSV`);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="h-4 w-4 text-white" />
                    <span>Export CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Plus className="h-4 w-4 text-white" />
                    <span>+ Add Lead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to permanently clear all leads from CRM? This cannot be undone.')) {
                        clearAllLeads();
                        refreshAllData();
                        setSelectedClientIds([]);
                        showToast('All CRM leads cleared');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
                    title="Clear All Leads"
                  >
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>Clear All Leads</span>
                  </button>
                </div>
              </div>

              {/* 7 Redesigned KPI Cards (Blue Gradient, White Icons, White Numbers, White Titles, White 80% Subtitles) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
                {[
                  {
                    title: 'Total Leads',
                    count: leads.length,
                    subtitle: 'All inbound entries',
                    icon: Users,
                    gradient: 'from-[#0066CC] to-[#0052A3]',
                  },
                  {
                    title: 'New Leads',
                    count: leads.filter((l) => l.status === 'New').length,
                    subtitle: 'Needs HR outreach',
                    icon: Sparkles,
                    gradient: 'from-[#0284C7] to-[#0052A3]',
                  },
                  {
                    title: 'Contacted',
                    count: leads.filter((l) => l.status === 'Contacted' || l.status === 'In Discussion').length,
                    subtitle: 'HR first touch made',
                    icon: Phone,
                    gradient: 'from-[#0066CC] to-[#004E9A]',
                  },
                  {
                    title: 'Qualified',
                    count: leads.filter((l) => l.status === 'In Discussion' || l.status === 'Proposal Sent' || l.status === 'Negotiation').length,
                    subtitle: 'High intent prospects',
                    icon: Target,
                    gradient: 'from-[#0369A1] to-[#0052A3]',
                  },
                  {
                    title: 'Converted',
                    count: leads.filter((l) => l.status === 'Converted').length,
                    subtitle: 'Won client accounts',
                    icon: Award,
                    gradient: 'from-[#0052A3] to-[#082F49]',
                  },
                  {
                    title: 'Pending',
                    count: leads.filter((l) => l.status === 'New' || l.status === 'In Discussion' || l.status === 'Contacted').length,
                    subtitle: 'Awaiting follow-up',
                    icon: Clock,
                    gradient: 'from-[#0284C7] to-[#004E9A]',
                  },
                  {
                    title: "Today's Leads",
                    count: leads.filter((l) => {
                      if (!l.submittedAt) return false;
                      try {
                        return new Date(l.submittedAt).toDateString() === new Date().toDateString();
                      } catch {
                        return false;
                      }
                    }).length,
                    subtitle: 'Logged today',
                    icon: Zap,
                    gradient: 'from-[#0066CC] to-[#0052A3]',
                  },
                ].map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        'relative overflow-hidden rounded-[14px] p-4 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-default',
                        `bg-gradient-to-br ${card.gradient}`
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white shadow-2xs group-hover:scale-110 transition-transform">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-white/90 bg-white/15 px-2 py-0.5 rounded-full">
                          Live
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-none">
                          {card.count}
                        </p>
                        <h4 className="text-xs font-medium text-white tracking-wide mt-1.5 truncate">
                          {card.title}
                        </h4>
                        <p className="text-[11px] text-white/80 mt-0.5 truncate">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Filter Tabs Bar (All, New, In Discussion, Proposal Sent, Negotiation, Converted, Lost) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#E5EDF5]">
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
                          ? 'bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white shadow-xs'
                          : 'bg-white text-[#64748B] hover:bg-[#EEF6FF] hover:text-[#0066CC] border border-[#D8E7F5]'
                      )}
                    >
                      <span>{tab.label}</span>
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-mono font-bold', isActive ? 'bg-white/20 text-white' : 'bg-[#EEF6FF] text-[#0066CC]')}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Filter Controls (White Card, Blue Search Icon, Rounded Controls, Blue Focus Border) */}
              <div className="p-5 rounded-2xl border border-[#D8E7F5] bg-white shadow-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="relative sm:col-span-2">
                    <Search className="h-4 w-4 text-[#0066CC] absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      placeholder="Search lead ID, client name, company, email, phone, city..."
                      value={clientSearchQuery}
                      onChange={(e) => {
                        setClientSearchQuery(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 shadow-xs transition-all"
                    />
                    {clientSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setClientSearchQuery('')}
                        className="absolute right-3.5 top-3 text-[#64748B] hover:text-[#0066CC] text-xs cursor-pointer font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <select
                      value={clientSourceFilter}
                      onChange={(e) => {
                        setClientSourceFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 cursor-pointer shadow-xs transition-all"
                    >
                      <option value="All">All Inbound Sources</option>
                      <option value="Website Popup">Website Popup Form</option>
                      <option value="Contact Form">Contact Page Form</option>
                      <option value="Direct Entry">Direct Entry / Referral</option>
                    </select>
                  </div>

                  <div className="relative">
                    <select
                      value={clientPriorityFilter}
                      onChange={(e) => {
                        setClientPriorityFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 cursor-pointer shadow-xs transition-all"
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
                <div className="p-3.5 rounded-xl border border-blue-200 bg-[#EEF6FF] flex items-center justify-between gap-4 animate-in fade-in shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0066CC]">
                    <CheckSquare className="h-4 w-4 text-[#0066CC]" />
                    <span>{selectedClientIds.length} Leads Selected</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        const target = leads.find((l) => selectedClientIds.includes(l.id));
                        if (target) setDrawerClient(target);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0066CC] hover:bg-[#0052A3] text-white font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-white" />
                      <span>View</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const target = leads.find((l) => selectedClientIds.includes(l.id));
                        if (target) setEditingClient(target);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0052A3] hover:bg-[#082F49] text-white font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Edit3 className="h-3.5 w-3.5 text-white" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        selectedClientIds.forEach(id => convertLeadToClient(id));
                        refreshAllData();
                        showToast(`Converted ${selectedClientIds.length} leads to Won Clients!`);
                        setSelectedClientIds([]);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold cursor-pointer transition-all shadow-xs"
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
                      className="px-3.5 py-1.5 rounded-xl border border-[#0066CC] bg-white text-[#0066CC] hover:bg-[#EEF6FF] font-bold cursor-pointer transition-all shadow-2xs"
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
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-rose-600" />
                      <span>Delete Selected</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedClientIds([])}
                      className="px-2.5 py-1.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:bg-[#F8FAFC] font-bold cursor-pointer transition-all shadow-2xs"
                    >
                      ✕ Clear Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Website Leads Table (Sticky Dark Blue Gradient Header, White Text/Icons, White Rows with Blue Left Hover) */}
              <div className="border border-[#D8E7F5] bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="sticky top-0 z-10 shadow-xs">
                      <tr className="bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white text-[11px] font-semibold tracking-wider">
                        <th className="py-3.5 px-4 w-10">
                          <input
                            type="checkbox"
                            checked={isAllClientsSelected}
                            onChange={toggleSelectAllClients}
                            className="rounded text-white accent-white cursor-pointer h-4 w-4"
                            title="Select all leads"
                          />
                        </th>
                        <th className="py-3.5 px-4 font-mono whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Tag className="h-3.5 w-3.5 text-white" />
                            <span>Lead ID</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <User className="h-3.5 w-3.5 text-white" />
                            <span>Client Name</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Building2 className="h-3.5 w-3.5 text-white" />
                            <span>Company</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Mail className="h-3.5 w-3.5 text-white" />
                            <span>Email</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Phone className="h-3.5 w-3.5 text-white" />
                            <span>Phone</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <MapPin className="h-3.5 w-3.5 text-white" />
                            <span>Country</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Building className="h-3.5 w-3.5 text-white" />
                            <span>State</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Layers className="h-3.5 w-3.5 text-white" />
                            <span>Service</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 text-center whitespace-nowrap">
                          <div className="flex items-center justify-center gap-1.5 text-white font-semibold">
                            <Activity className="h-3.5 w-3.5 text-white" />
                            <span>Status</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <UserCheck className="h-3.5 w-3.5 text-white" />
                            <span>Assigned To</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white font-semibold">
                            <Calendar className="h-3.5 w-3.5 text-white" />
                            <span>Created Date</span>
                          </div>
                        </th>
                        <th className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5 text-white font-semibold">
                            <Zap className="h-3.5 w-3.5 text-white" />
                            <span>Actions</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EDF5] text-xs">
                      {paginatedClients.length === 0 ? (
                        <tr>
                          <td colSpan={13} className="py-16 text-center bg-white">
                            <div className="max-w-md mx-auto space-y-3">
                              <div className="h-14 w-14 rounded-2xl bg-[#EEF6FF] text-[#0066CC] flex items-center justify-center mx-auto shadow-2xs">
                                <Users className="h-7 w-7 text-[#0066CC]" />
                              </div>
                              <h4 className="font-bold text-[#1E293B] text-base">No Matching Website Leads</h4>
                              <p className="text-xs text-[#64748B]">
                                No lead records match your search or filter criteria. Try clearing filters or submit a test popup lead.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setClientSearchQuery('');
                                  setClientSourceFilter('All');
                                  setClientPriorityFilter('All');
                                  setLeadFilterTab('All');
                                }}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs shadow-xs hover:brightness-105 transition-all cursor-pointer"
                              >
                                Clear All Filters
                              </button>
                            </div>
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
                                'bg-white border-b border-[#E5EDF5] hover:bg-[#F0F7FF] hover:border-l-4 hover:border-l-[#0066CC] cursor-pointer transition-all duration-150',
                                isSelected ? 'bg-[#EEF6FF] border-l-4 border-l-[#0066CC]' : ''
                              )}
                            >
                              {/* Checkbox */}
                              <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => toggleSelectClientRow(client.id)}
                                  className="rounded text-[#0066CC] accent-[#0066CC] cursor-pointer h-4 w-4"
                                />
                              </td>

                              {/* Lead ID */}
                              <td className="py-3.5 px-4 font-mono font-bold text-[#0066CC] whitespace-nowrap">
                                {client.id}
                              </td>

                              {/* Client Name */}
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="h-7 w-7 rounded-full bg-[#EEF6FF] border border-[#D8E7F5] text-[#0066CC] font-bold text-xs flex items-center justify-center shrink-0">
                                    {(client.name || 'C').charAt(0)}
                                  </div>
                                  <span className="font-bold text-[#1E293B] truncate max-w-[140px] block" title={client.name}>
                                    {client.name}
                                  </span>
                                </div>
                              </td>

                              {/* Company */}
                              <td className="py-3.5 px-4">
                                <span className="font-medium text-[#1E293B] truncate max-w-[130px] block" title={client.company || '—'}>
                                  {client.company || '—'}
                                </span>
                              </td>

                              {/* Email */}
                              <td className="py-3.5 px-4 font-mono text-xs">
                                <a
                                  href={`mailto:${client.email}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[#0066CC] hover:underline truncate max-w-[150px] block"
                                  title={client.email}
                                >
                                  {client.email}
                                </a>
                              </td>

                              {/* Phone */}
                              <td className="py-3.5 px-4 font-mono text-xs text-[#1E293B] whitespace-nowrap">
                                <a
                                  href={`tel:${client.phone}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="hover:text-[#0066CC] transition-colors"
                                >
                                  {client.phone}
                                </a>
                              </td>

                              {/* Country */}
                              <td className="py-3.5 px-4 text-[#64748B] text-xs whitespace-nowrap">
                                {client.country || 'India'}
                              </td>

                              {/* State */}
                              <td className="py-3.5 px-4 text-[#64748B] text-xs whitespace-nowrap">
                                {client.state || 'Telangana'}
                              </td>

                              {/* Service */}
                              <td className="py-3.5 px-4">
                                <span
                                  className="inline-block px-2.5 py-1 rounded-lg bg-[#EEF6FF] text-[#0052A3] font-medium text-xs border border-[#D8E7F5] truncate max-w-[140px]"
                                  title={client.service}
                                >
                                  {client.service}
                                </span>
                              </td>

                              {/* Status */}
                              <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={client.status}
                                  onChange={(e) => {
                                    updateLead(client.id, { status: e.target.value as any });
                                    refreshAllData();
                                    showToast(`Updated status of ${client.name} to ${e.target.value}`);
                                  }}
                                  className={cn(
                                    'px-3 py-1 rounded-full text-[11px] font-mono font-bold cursor-pointer focus:outline-none shadow-2xs transition-all',
                                    client.status === 'New'
                                      ? 'bg-[#0EA5E9] text-white border border-[#0284C7]'
                                      : client.status === 'Converted'
                                        ? 'bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white border border-blue-400'
                                        : client.status === 'Lost' || client.status === 'Archived'
                                          ? 'bg-slate-500 text-white border border-slate-600'
                                          : 'bg-[#0066CC] text-white border border-[#0052A3]'
                                  )}
                                >
                                  <option value="New" className="text-[#1E293B] bg-white">New</option>
                                  <option value="Contacted" className="text-[#1E293B] bg-white">Contacted</option>
                                  <option value="In Discussion" className="text-[#1E293B] bg-white">In Discussion</option>
                                  <option value="Proposal Sent" className="text-[#1E293B] bg-white">Proposal Sent</option>
                                  <option value="Negotiation" className="text-[#1E293B] bg-white">Negotiation</option>
                                  <option value="Converted" className="text-[#1E293B] bg-white">Converted</option>
                                  <option value="Lost" className="text-[#1E293B] bg-white">Lost</option>
                                </select>
                              </td>

                              {/* Assigned To */}
                              <td className="py-3.5 px-4 text-[#1E293B] text-xs font-medium whitespace-nowrap">
                                <div className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                                  <span>{client.assignedTo || 'Renusri'}</span>
                                </div>
                              </td>

                              {/* Created Date */}
                              <td className="py-3.5 px-4 font-mono text-xs whitespace-nowrap">
                                <p className="font-semibold text-[#1E293B]">{date}</p>
                                <p className="text-[10px] text-[#64748B]">{time}</p>
                              </td>

                              {/* Action Buttons (All White Icons, Blue Circular Background / Red for Delete, Hover Animation, Soft Shadow, Tooltip) */}
                              <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1.5">
                                  {/* 1. View */}
                                  <button
                                    type="button"
                                    onClick={() => setDrawerClient(client)}
                                    className="h-8 w-8 rounded-full bg-[#0066CC] hover:bg-[#0052A3] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="View Full Lead Details"
                                  >
                                    <Eye className="h-4 w-4 text-white" />
                                  </button>

                                  {/* 2. Edit */}
                                  <button
                                    type="button"
                                    onClick={() => setEditingClient(client)}
                                    className="h-8 w-8 rounded-full bg-[#0066CC] hover:bg-[#0052A3] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="Edit Lead Details"
                                  >
                                    <Edit3 className="h-4 w-4 text-white" />
                                  </button>

                                  {/* 3. Convert */}
                                  {client.status !== 'Converted' && (
                                    <button
                                      type="button"
                                      onClick={() => handleConvertToClient(client)}
                                      className="h-8 w-8 rounded-full bg-[#0052A3] hover:bg-[#003E7E] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                      title="Convert to Won Client"
                                    >
                                      <Award className="h-4 w-4 text-white" />
                                    </button>
                                  )}

                                  {/* 4. Email */}
                                  <button
                                    type="button"
                                    onClick={() => openHREmailForClient(client)}
                                    className="h-8 w-8 rounded-full bg-[#0066CC] hover:bg-[#0052A3] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="Send Official Email from HR"
                                  >
                                    <Mail className="h-4 w-4 text-white" />
                                  </button>

                                  {/* 5. Schedule */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveModule('calendar');
                                      showToast(`Opening calendar to schedule meeting with ${client.name}`);
                                    }}
                                    className="h-8 w-8 rounded-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="Schedule Client Meeting / Demo"
                                  >
                                    <Calendar className="h-4 w-4 text-white" />
                                  </button>

                                  {/* 6. Assign */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newAssign = prompt('Assign lead to:', client.assignedTo || 'Renusri');
                                      if (newAssign && newAssign.trim()) {
                                        updateLead(client.id, { assignedTo: newAssign.trim() });
                                        refreshAllData();
                                        showToast(`Assigned lead to ${newAssign.trim()}`);
                                      }
                                    }}
                                    className="h-8 w-8 rounded-full bg-[#0284C7] hover:bg-[#0369A1] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="Assign Lead to Team Member"
                                  >
                                    <UserCheck className="h-4 w-4 text-white" />
                                  </button>

                                  {/* 7. Delete */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Delete lead record for ${client.name}?`)) {
                                        deleteLead(client.id);
                                        refreshAllData();
                                        showToast('Lead deleted');
                                      }
                                    }}
                                    className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
                                    title="Delete Lead Record"
                                  >
                                    <Trash2 className="h-4 w-4 text-white" />
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

                {/* Pagination Footer (Blue Active Page, White Text, Rounded Buttons, Hover Animation) */}
                <div className="p-4 border-t border-[#D8E7F5] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="text-[#64748B] font-mono font-medium">
                    Showing <span className="font-bold text-[#1E293B]">{paginatedClients.length}</span> of <span className="font-bold text-[#1E293B]">{filteredClients.length}</span> leads
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={clientCurrentPage <= 1}
                      onClick={() => setClientCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-4 py-1.5 rounded-xl border border-[#D8E7F5] bg-white text-[#0066CC] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EEF6FF] hover:border-[#0066CC] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xs"
                    >
                      Previous
                    </button>
                    <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-mono font-bold shadow-xs">
                      Page {clientCurrentPage} of {clientTotalPages || 1}
                    </div>
                    <button
                      type="button"
                      disabled={clientCurrentPage >= clientTotalPages}
                      onClick={() => setClientCurrentPage((p) => Math.min(clientTotalPages, p + 1))}
                      className="px-4 py-1.5 rounded-xl border border-[#D8E7F5] bg-white text-[#0066CC] font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EEF6FF] hover:border-[#0066CC] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-2xs"
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5EDF5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-mono font-bold uppercase">
                      Enterprise Client Accounts
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Active Commercial Contracts & Billing</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                    Won Clients & Commercial Contracts
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
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
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Download className="h-4 w-4 text-white" />
                    <span>Export Clients CSV</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Plus className="h-4 w-4 text-white" />
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
                  { label: 'Contract Revenue', val: formatINR(leads.filter(l => l.status === 'Converted').reduce((s, l) => s + (l.revenue || 0), 0) * 0.85), sub: 'Commercial contracts', icon: FileText, color: '#818CF8' },
                ].map((k, i) => {
                  const Icon = k.icon;
                  return (
                    <div
                      key={i}
                      style={{ backgroundColor: '#0E2646', borderColor: 'rgba(255, 255, 255, 0.12)' }}
                      className="p-5 rounded-2xl border shadow-lg relative overflow-hidden group hover:border-[#00D4FF]/40 transition-all text-center flex flex-col items-center justify-center"
                    >
                      <div className="h-10 w-10 rounded-xl bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-center text-[#00D4FF] mb-2.5">
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF]"
                    />
                  </div>

                  <div>
                    <select
                      value={clientIndustryFilter}
                      onChange={(e) => {
                        setClientIndustryFilter(e.target.value);
                        setClientCurrentPage(1);
                      }}
                      className="w-full p-2.5 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-xs text-white font-medium focus:outline-none focus:border-[#00D4FF] cursor-pointer"
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
                      <tr className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] text-[11px] font-mono font-bold uppercase tracking-wider sticky top-0">
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
                    <tbody className="divide-y divide-[#E5EDF5] font-medium text-white">
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
                                  className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#00D4FF] hover:bg-[#E0F2FE]"
                                  title="Send Email from HR"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDrawerClient(cl)}
                                  className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-white hover:bg-[#E0F2FE]"
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
              <div className="space-y-4 pb-6 border-b border-[#E5EDF5]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#00D4FF] uppercase">Enterprise CRM</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-semibold">Deal Pipeline & Visual Board</span>
                    </div>
                    <h2 className="text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
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
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to permanently clear all leads from CRM? This cannot be undone.')) {
                          clearAllLeads();
                          refreshAllData();
                          setSelectedClientIds([]);
                          showToast('All CRM leads cleared');
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                      title="Clear All CRM Records"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Clear All CRM</span>
                    </button>
                  </div>
                </div>

                {/* CRM Quick Switch Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 border-t border-[#E5EDF5] pt-3">
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
                    <div className="flex items-center justify-between pb-2 border-b border-[#E5EDF5]">
                      <span className="font-display font-bold text-sm text-[#1E293B]">{st}</span>
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
                          <div className="pt-2 border-t border-[#E5EDF5] flex items-center justify-between">
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
              <div className="space-y-4 pb-6 border-b border-[#E5EDF5]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#38BDF8] uppercase">Talent Management</span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-400 font-semibold">Recruitment Desk & Interview Schedules</span>
                    </div>
                    <h2 className="text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                      Candidate Pipeline & Open Positions
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddCandidateModalOpen(true)}
                      className="h-11 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                    >
                      <UserPlus className="h-4 w-4 text-white" />
                      <span>+ Add Candidate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsScheduleInterviewModalOpen(true)}
                      className="h-11 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                    >
                      <Video className="h-4 w-4 text-white" />
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
                    <button
                      type="button"
                      onClick={() => {
                        if (recruitmentQuickTab === 'jobs') {
                          if (window.confirm('Are you sure you want to clear all job openings?')) {
                            clearAllJobs();
                            refreshAllData();
                            showToast('All job openings cleared');
                          }
                        } else if (recruitmentQuickTab === 'interviews') {
                          if (window.confirm('Are you sure you want to clear all interview schedules?')) {
                            clearAllInterviews();
                            refreshAllData();
                            showToast('All interviews cleared');
                          }
                        } else {
                          if (window.confirm('Are you sure you want to permanently clear all candidate applications? This action cannot be undone.')) {
                            clearAllApplications();
                            refreshAllData();
                            setSelectedAppIds([]);
                            showToast('All candidate applications cleared');
                          }
                        }
                      }}
                      className="h-11 px-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-white font-bold text-xs transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                      title="Clear All in Recruitment"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>
                        {recruitmentQuickTab === 'jobs'
                          ? 'Clear All Jobs'
                          : recruitmentQuickTab === 'interviews'
                          ? 'Clear All Interviews'
                          : 'Clear All Applications'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Recruitment Quick Switch Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-[#E5EDF5] pt-3">
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
                            : 'bg-[#F8FAFC] text-slate-300 hover:bg-[#EEF6FF] hover:text-white border-[#E5EDF5]'
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
                    <div key={idx} className="p-4 border border-[#D8E7F5] rounded-2xl bg-white shadow-lg space-y-1 text-center flex flex-col items-center justify-center">
                      <div className="h-8 w-8 rounded-lg bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 flex items-center justify-center mb-1">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400 uppercase text-center">{k.label}</span>
                      <p className="mt-1 text-2xl font-extrabold text-[#1E293B] font-display text-center leading-none">{k.val}</p>
                    </div>
                  );
                })}
              </div>

              {/* Tab 1: Applications */}
              {(recruitmentQuickTab === 'applications' || recruitmentQuickTab === 'candidates') && (
                <div className="space-y-4">
                  {/* Bulk Actions Bar for Applications */}
                  {selectedAppIds.length > 0 && (
                    <div className="p-3.5 rounded-xl border border-[#00D4FF]/30 bg-[#0066CC]/20 flex items-center justify-between gap-4 animate-in fade-in flex-wrap">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#00D4FF]">
                        <CheckSquare className="h-4 w-4" />
                        <span>{selectedAppIds.length} Candidates Selected</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            const target = applications.find((a) => selectedAppIds.includes(a.id));
                            if (target) setDrawerCandidate(target);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const target = applications.find((a) => selectedAppIds.includes(a.id));
                            if (target) setEditingApplication(target);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${selectedAppIds.length} selected candidate applications?`)) {
                              bulkDeleteApplications(selectedAppIds);
                              refreshAllData();
                              showToast('Deleted selected applications');
                              setSelectedAppIds([]);
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer transition-colors flex items-center gap-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete Selected</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedAppIds([])}
                          className="px-2.5 py-1.5 rounded-lg bg-[#EEF6FF] hover:bg-[#E0F2FE] text-slate-300 font-bold cursor-pointer transition-colors"
                        >
                          ✕ Clear Selection
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="border border-[#D8E7F5] rounded-2xl bg-white shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] text-[11px] font-mono font-bold uppercase tracking-wider sticky top-0">
                            <th className="py-3.5 px-4 w-10">
                              <input
                                type="checkbox"
                                checked={isAllAppsSelected}
                                onChange={toggleSelectAllApps}
                                className="rounded text-[#0066CC] cursor-pointer"
                              />
                            </th>
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
                        <tbody className="divide-y divide-[#E5EDF5] font-medium text-white">
                          {filteredApplications.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="py-12 text-center text-slate-400">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                  <GraduationCap className="h-8 w-8 text-slate-500 opacity-40" />
                                  <p className="font-semibold text-sm text-slate-300">No candidate applications found</p>
                                  <p className="text-xs text-slate-500 mt-1">New applications submitted through the Careers portal will appear here automatically.</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredApplications.map((app) => (
                              <tr
                                key={app.id}
                                onClick={() => setDrawerCandidate(app)}
                                className={cn('hover:bg-[#F0F7FF] cursor-pointer transition-colors', selectedAppIds.includes(app.id) && 'bg-[#0066CC]/20')}
                              >
                              <td className="py-3.5 px-4 w-10" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="checkbox"
                                  checked={selectedAppIds.includes(app.id)}
                                  onChange={() => toggleSelectAppRow(app.id)}
                                  className="rounded text-[#0066CC] cursor-pointer"
                                />
                              </td>
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
                                  className="px-2.5 py-1 rounded-full border border-[#D8E7F5] bg-[#F8FAFC] text-[10px] font-mono font-bold text-[#38BDF8] cursor-pointer focus:outline-none"
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
                                    className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white"
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
                                    className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-slate-300 hover:bg-[#E0F2FE] hover:text-white"
                                    title="View Candidate Profile"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditingApplication(app)}
                                    className="p-1.5 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-amber-300 hover:bg-amber-500/20 hover:text-white"
                                    title="Edit Candidate Details"
                                  >
                                    <Edit3 className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`Delete candidate application for ${app.name}?`)) {
                                        deleteApplication(app.id);
                                        refreshAllData();
                                        showToast(`Application for ${app.name} deleted`);
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                                    title="Delete Application"
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

              {/* Tab 2: Job Openings */}
              {recruitmentQuickTab === 'jobs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 text-[10px] font-mono font-bold">
                          {job.category} · {job.level}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-slate-300 font-mono text-[10px] font-bold">
                          {job.status}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-[#1E293B]">{job.title}</h3>
                      <p className="text-xs text-[#64748B] line-clamp-2">{job.description}</p>
                      <div className="pt-3 border-t border-[#E5EDF5] flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono">{job.openings} Openings</span>
                        <span className="font-mono font-bold text-[#38BDF8]">{job.applicantsCount || 0} Candidates</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Interviews Pipeline */}
              {recruitmentQuickTab === 'interviews' && (
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                    <h3 className="font-display font-bold text-base text-[#1E293B]">Scheduled Technical & HR Evaluations</h3>
                    <button
                      type="button"
                      onClick={() => setIsScheduleInterviewModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white text-xs font-bold hover:brightness-110 shadow-md"
                    >
                      + Book Interview
                    </button>
                  </div>

                  <div className="divide-y divide-[#E5EDF5] text-xs">
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                    <div>
                      <h3 className="font-display font-bold text-base text-[#1E293B]">Inbound Talent Inbox (hrhydgodavariwavetech)</h3>
                      <p className="text-xs text-[#64748B]">Incoming resumes submitted directly to our official talent mailbox.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/25 text-[#38BDF8] border border-[#0066CC]/40 font-mono text-xs font-bold">
                      {emailApps.length} Inbound Messages
                    </span>
                  </div>

                  <div className="divide-y divide-[#E5EDF5] text-xs">
                    {emailApps.map((em) => (
                      <div key={em.id} className="py-4 space-y-2 hover:bg-[#F0F7FF] p-3 rounded-xl transition-colors">
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
                        <div className="flex items-center justify-between pt-2 border-t border-[#E5EDF5]">
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
                            className="px-3 py-1 rounded-lg border border-cyan-400/40 bg-[#F8FAFC] text-[#38BDF8] hover:bg-[#EEF6FF] hover:text-white font-bold"
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
          {/* MODULE: ACTIVE PROJECTS & DELIVERABLES                           */}
          {/* ===================================================== */}
          {activeModule === 'projects' && (
            <div className="p-6 sm:p-8 border border-[#D8E7F5] rounded-2xl bg-white space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5EDF5]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1E293B]">Active Projects & Deliverables</h2>
                  <p className="text-xs text-[#64748B]">Milestone contracts, engineering deliverables, and project scopes.</p>
                </div>
                <span className="font-mono font-extrabold text-[#38BDF8] text-base">
                  Total Contract Volume: {formatINR(clientKPIs.revenue)}
                </span>
              </div>

              <div className="divide-y divide-[#E5EDF5] text-xs">
                {leads.map((client) => (
                  <div key={client.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F0F7FF] px-2 rounded-xl transition-colors">
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
                          const proposalText = `GODAVARI WAVE TECHNOLOGIES PROJECT SCOPE\nProject: ${client.project || client.service}\nClient: ${client.name}\nContract Value: ${formatINR(client.revenue)}\nStatus: Active`;
                          const blob = new Blob([proposalText], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Project_Scope_${client.id}.txt`;
                          a.click();
                          URL.revokeObjectURL(url);
                          showToast('Project scope downloaded');
                        }}
                        className="px-4 py-2 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] font-bold text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white transition-all cursor-pointer shadow-sm"
                      >
                        Download Project Scope
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: CONNECTED CLIENTS                             */}
          {/* ===================================================== */}
          {activeModule === 'connected-clients' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise CRM</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Active Client Engagements</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Connected Clients Under Active Engagement
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Active commercial client partnerships currently in delivery, sprint progress, and recurring retainer management.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(true)}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Connect Client</span>
                  </button>
                </div>
              </div>

              {/* Table of Connected Clients */}
              <div className="border border-[#D8E7F5] rounded-2xl bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] font-mono uppercase text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Company</th>
                        <th className="py-3.5 px-4 font-bold">Contact Person</th>
                        <th className="py-3.5 px-4 font-bold">Project Deliverable</th>
                        <th className="py-3.5 px-4 font-bold">Assigned Employee</th>
                        <th className="py-3.5 px-4 font-bold">Current Status</th>
                        <th className="py-3.5 px-4 font-bold">Last Communication</th>
                        <th className="py-3.5 px-4 font-bold">Next Follow-up</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EDF5]">
                      {leads
                        .filter((l) => l.status === 'Converted' || l.meetingStatus === 'Scheduled' || l.status === 'Proposal Sent')
                        .map((client) => (
                          <tr key={client.id} className="hover:bg-[#EEF6FF]/60 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#1E293B] text-sm">{client.company || 'Enterprise Account'}</div>
                              <div className="text-[11px] text-[#64748B]">{client.service}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-[#1E293B]">{client.name}</div>
                              <div className="text-[11px] text-[#64748B]">{client.email}</div>
                              <div className="text-[11px] font-mono text-[#0066CC]">{client.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-lg bg-[#EEF6FF] text-[#0066CC] border border-blue-200 font-medium">
                                {client.project || client.service}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-1.5 font-medium text-[#1E293B]">
                                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0066CC] font-bold flex items-center justify-center text-[10px]">
                                  {(client.assignedTo || 'Renusri').charAt(0)}
                                </div>
                                <span>{client.assignedTo || 'Renusri'}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-blue-50 text-[#0066CC] border border-blue-200">
                                {client.status === 'Converted' ? 'Active Engagement' : client.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-[#64748B] font-mono text-[11px]">
                              {client.lastContact || client.submittedAt}
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-[#0052A3] font-semibold">
                              {client.nextFollowUp || 'Tomorrow, 3:00 PM'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => openHREmailForClient(client)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-[#0066CC] hover:bg-[#EEF6FF] cursor-pointer"
                                  title="Send Email"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => shareLeadViaWhatsApp(client)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-emerald-600 hover:bg-emerald-50 cursor-pointer"
                                  title="WhatsApp"
                                >
                                  <MessageSquare className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDrawerClient(client)}
                                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-[#1E293B] hover:bg-[#EEF6FF] font-semibold text-[11px] cursor-pointer"
                                >
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: REQUIREMENTS STORE                            */}
          {/* ===================================================== */}
          {activeModule === 'requirements' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise CRM</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Client Project Specifications</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Client Requirements & Project Scope Store
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Store, track, and manage technical requirements submitted by prospective and active clients.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingRequirement(null);
                      setIsAddRequirementModalOpen(true);
                    }}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Add Requirement</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#D8E7F5] shadow-xs">
                <div className="relative flex-1 w-full sm:max-w-xs">
                  <Search className="h-4 w-4 text-[#0066CC] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={requirementSearch}
                    onChange={(e) => setRequirementSearch(e.target.value)}
                    placeholder="Search by client, project, or tech stack..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] focus:bg-white focus:border-[#0066CC] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={requirementPriorityFilter}
                    onChange={(e) => setRequirementPriorityFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-medium"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>

                  <select
                    value={requirementStatusFilter}
                    onChange={(e) => setRequirementStatusFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-medium"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending Specs">Pending Specs</option>
                  </select>
                </div>
              </div>

              {/* Requirements Table */}
              <div className="border border-[#D8E7F5] rounded-2xl bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] font-mono uppercase text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Req ID</th>
                        <th className="py-3.5 px-4 font-bold">Client / Company</th>
                        <th className="py-3.5 px-4 font-bold">Project Type</th>
                        <th className="py-3.5 px-4 font-bold">Tech Stack</th>
                        <th className="py-3.5 px-4 font-bold">Priority</th>
                        <th className="py-3.5 px-4 font-bold">Budget & Timeline</th>
                        <th className="py-3.5 px-4 font-bold">Assigned Team</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EDF5]">
                      {clientRequirements
                        .filter((r) => {
                          const matchesSearch =
                            r.clientName.toLowerCase().includes(requirementSearch.toLowerCase()) ||
                            r.companyName.toLowerCase().includes(requirementSearch.toLowerCase()) ||
                            r.projectType.toLowerCase().includes(requirementSearch.toLowerCase()) ||
                            r.technologyStack.some((t) => t.toLowerCase().includes(requirementSearch.toLowerCase()));
                          const matchesPriority = requirementPriorityFilter === 'All' || r.priority === requirementPriorityFilter;
                          const matchesStatus = requirementStatusFilter === 'All' || r.status === requirementStatusFilter;
                          return matchesSearch && matchesPriority && matchesStatus;
                        })
                        .map((req) => (
                          <tr key={req.id} className="hover:bg-[#EEF6FF]/60 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#0066CC]">
                              {req.requirementId}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#1E293B]">{req.clientName}</div>
                              <div className="text-[11px] text-[#64748B]">{req.companyName}</div>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-[#1E293B]">
                              {req.projectType}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {req.technologyStack.map((tech) => (
                                  <span key={tech} className="px-1.5 py-0.5 rounded bg-blue-50 text-[#0066CC] border border-blue-200 text-[10px] font-mono font-semibold">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={cn(
                                  'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold',
                                  req.priority === 'Critical'
                                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                                    : req.priority === 'High'
                                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                      : 'bg-blue-50 text-[#0066CC] border border-blue-200'
                                )}
                              >
                                {req.priority}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-[#1E293B]">{req.budget}</div>
                              <div className="text-[11px] text-[#64748B] font-mono">{req.timeline}</div>
                            </td>
                            <td className="py-3.5 px-4 text-[#64748B]">
                              {req.assignedTeam}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-[#EEF6FF] text-[#0066CC] border border-blue-200">
                                {req.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleDownloadRequirementBrief(req)}
                                  className="p-1.5 rounded-lg border border-slate-200 text-[#0066CC] hover:bg-[#EEF6FF] cursor-pointer"
                                  title="Download Specification Brief"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingRequirement(req);
                                    setIsAddRequirementModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-[#EEF6FF] cursor-pointer"
                                  title="Edit Requirement"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteRequirement(req.id)}
                                  className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                                  title="Delete Requirement"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: COMPANIES DIRECTORY                           */}
          {/* ===================================================== */}
          {activeModule === 'companies' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise CRM</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Corporate Accounts Directory</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Corporate Accounts & Client Directory
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Institutional client profiles, industries, active accounts, and contract values.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DEFAULT_COMPANIES.map((comp) => (
                  <div key={comp.id} className="p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xs hover:border-[#0066CC] transition-all space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">{comp.industry}</span>
                        <h3 className="text-xl font-bold text-[#1E293B]">{comp.name}</h3>
                        <p className="text-xs text-[#64748B] flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          <span>{comp.location}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#EEF6FF] text-[#0066CC] border border-blue-200">
                        {comp.status}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#E5EDF5] grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-[#64748B] block">Primary Contact</span>
                        <strong className="text-[#1E293B]">{comp.contactPerson}</strong>
                        <p className="text-[#0066CC] text-[11px] font-mono">{comp.email}</p>
                      </div>
                      <div>
                        <span className="text-[11px] text-[#64748B] block">Active Contracts</span>
                        <strong className="text-[#1E293B] font-mono text-sm">{comp.activeProjects} Projects</strong>
                        <p className="text-emerald-600 text-[11px] font-mono font-bold">{comp.totalBilled}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: MEETINGS & CLIENT DEMOS                       */}
          {/* ===================================================== */}
          {activeModule === 'meetings' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise CRM</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Discovery Sessions & Client Demos</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Client Discovery & Demo Schedules
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Upcoming client presentations, scope alignment calls, and technical discovery meetings.
                  </p>
                </div>
              </div>

              <div className="border border-[#D8E7F5] rounded-2xl bg-white overflow-hidden shadow-xs divide-y divide-[#E5EDF5]">
                {leads
                  .filter((l) => l.meetingStatus === 'Scheduled' || l.nextFollowUp)
                  .map((meet) => (
                    <div key={meet.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#EEF6FF]/50 transition-colors">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#EEF6FF] text-[#0066CC] border border-blue-200 text-[11px] font-mono font-bold">
                            {meet.nextFollowUp || 'Tomorrow, 11:00 AM IST'}
                          </span>
                          <h4 className="font-bold text-sm text-[#1E293B]">{meet.name} ({meet.company || 'Direct Client'})</h4>
                        </div>
                        <p className="text-xs text-[#64748B]">Agenda: Enterprise Discovery for {meet.service} · Assigned: {meet.assignedTo || 'Renusri'}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href="https://meet.google.com/new"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-105 transition-all flex items-center gap-2 shadow-xs"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>Join Google Meet</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => openHREmailForClient(meet)}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 text-[#1E293B] hover:bg-[#EEF6FF] text-xs font-semibold cursor-pointer"
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: FOLLOW UPS TRACKER                            */}
          {/* ===================================================== */}
          {activeModule === 'followups' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise CRM</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Touchpoints & Outreach</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Lead & Candidate Follow-up Desk
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Keep lead conversions warm by managing upcoming, overdue, and scheduled communications.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leads.filter((l) => l.nextFollowUp || l.status === 'In Discussion').slice(0, 6).map((lead) => (
                  <div key={lead.id} className="p-5 rounded-2xl bg-white border border-[#D8E7F5] shadow-xs space-y-3 hover:border-[#0066CC] transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-bold">
                        Follow-up Due
                      </span>
                      <span className="text-[11px] font-mono text-[#64748B]">{lead.nextFollowUp || 'Today'}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm text-[#1E293B]">{lead.name}</h4>
                      <p className="text-xs text-[#64748B]">{lead.company || 'Client'} · {lead.service}</p>
                    </div>

                    <div className="pt-2 border-t border-[#E5EDF5] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => shareLeadViaWhatsApp(lead)}
                        className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>WhatsApp Touchpoint</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openHREmailForClient(lead)}
                        className="text-xs font-bold text-[#0066CC] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Mail className="h-3.5 w-3.5" />
                        <span>Email</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: DOCUMENTS VAULT                               */}
          {/* ===================================================== */}
          {activeModule === 'documents' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8E7F5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0066CC] uppercase">Enterprise Assets</span>
                    <span className="text-xs text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Document Repository</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] tracking-tight font-display mt-1">
                    Enterprise Documents & Contract Vault
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B]">
                    Centralized storage for Master Service Agreements (MSA), NDAs, Statements of Work (SOW), and Offer Letters.
                  </p>
                </div>
              </div>

              <div className="border border-[#D8E7F5] rounded-2xl bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FAFC] border-b border-[#D8E7F5] text-[#64748B] font-mono uppercase text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Document Title</th>
                        <th className="py-3.5 px-4 font-bold">Client / Entity</th>
                        <th className="py-3.5 px-4 font-bold">Category</th>
                        <th className="py-3.5 px-4 font-bold">Format & Size</th>
                        <th className="py-3.5 px-4 font-bold">Date Executed</th>
                        <th className="py-3.5 px-4 font-bold">Status</th>
                        <th className="py-3.5 px-4 font-bold text-right">Download</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EDF5]">
                      {DEFAULT_DOCUMENTS.map((doc) => (
                        <tr key={doc.id} className="hover:bg-[#EEF6FF]/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <FileText className="h-4 w-4 text-[#0066CC] shrink-0" />
                              <span className="font-bold text-[#1E293B]">{doc.title}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#64748B]">{doc.client}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0066CC] border border-blue-200 font-mono text-[10px]">
                              {doc.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#64748B]">
                            {doc.format} · {doc.size}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#64748B]">{doc.date}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                const dummyContent = `GODAVARI WAVE TECHNOLOGIES\nOfficial Document: ${doc.title}\nClient: ${doc.client}\nCategory: ${doc.category}\nDate: ${doc.date}\nStatus: ${doc.status}`;
                                const blob = new Blob([dummyContent], { type: 'text/plain' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `${doc.id}_${doc.category}.txt`;
                                a.click();
                                URL.revokeObjectURL(url);
                                showToast(`Downloaded ${doc.title}`);
                              }}
                              className="px-3 py-1.5 rounded-xl border border-blue-200 bg-[#EEF6FF] text-[#0066CC] hover:bg-[#EAF5FF] font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                            >
                              <Download className="h-3 w-3" />
                              <span>Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: RECRUITMENT PERFORMANCE DASHBOARD COCKPIT    */}
          {/* ===================================================== */}
          {activeModule === 'recruitment-dashboard' && (
            <div className="space-y-8 font-sans">
              {/* Header Banner */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-[#D8E7F5]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3.5 py-1 rounded-full bg-[#EEF6FF] border border-blue-200 text-[#0066CC] text-[11px] font-mono font-extrabold uppercase flex items-center gap-1.5 shadow-xs">
                      <Sparkles className="h-3.5 w-3.5 text-[#0066CC]" />
                      Recruitment Cockpit
                    </span>
                    <span className="text-[#64748B]">·</span>
                    <span className="text-xs text-[#64748B] font-semibold">Active Hiring Velocity & Candidate Pipeline</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1E293B] tracking-tight font-display">
                    Recruitment & Talent Cockpit
                  </h1>
                  <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
                    Overview of active engineering and operations hiring pipelines, candidate interview schedules, and application velocity.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateJobModalOpen(true)}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-105 transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Plus className="h-4 w-4" />
                    <span>+ Post Job Opening</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScheduleInterviewModalOpen(true)}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                  >
                    <Video className="h-4 w-4 text-white" />
                    <span>+ Schedule Interview</span>
                  </button>
                </div>
              </div>

              {/* 6 Recruitment KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  {
                    title: 'Total Applications',
                    value: applications.length,
                    sub: 'Active applicant pool',
                    change: '+18% vs last month',
                    icon: UserCheck,
                    spark: [12, 19, 15, 25, 22, 30, applications.length],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('applications');
                    },
                  },
                  {
                    title: 'Active Job Openings',
                    value: jobs.length,
                    sub: 'Published careers postings',
                    change: '4 priority roles',
                    icon: Sparkles,
                    spark: [3, 4, 5, 4, 6, 5, jobs.length],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('jobs');
                    },
                  },
                  {
                    title: 'Scheduled Interviews',
                    value: interviews.length,
                    sub: 'Live video evaluation rounds',
                    change: `${interviews.filter((i) => i.status === 'Scheduled').length} pending`,
                    icon: Video,
                    spark: [4, 6, 8, 5, 9, 11, interviews.length],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('interviews');
                    },
                  },
                  {
                    title: 'Candidate Pool',
                    value: applications.length + emailApps.length,
                    sub: 'Total qualified candidates',
                    change: '+12 new this week',
                    icon: Users,
                    spark: [20, 24, 28, 35, 38, 42, applications.length + emailApps.length],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('candidates');
                    },
                  },
                  {
                    title: 'Inbound Email Apps',
                    value: emailApps.length,
                    sub: 'Direct CV mailbox inbounds',
                    change: `${unreadEmailsCount} unread submissions`,
                    icon: Mail,
                    spark: [5, 8, 7, 12, 10, 14, emailApps.length],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('emails');
                    },
                  },
                  {
                    title: 'Offers Extended',
                    value: applications.filter((a) => a.status === 'Hired' || a.status === 'Offered').length,
                    sub: 'Accepted career contracts',
                    change: '94% offer acceptance',
                    icon: Award,
                    spark: [1, 2, 2, 3, 4, 4, 5],
                    action: () => {
                      setActiveModule('recruitment');
                      setRecruitmentQuickTab('applications');
                    },
                  },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={idx}
                      onClick={kpi.action}
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#D8E7F5',
                      }}
                      className="p-5 sm:p-6 rounded-2xl border shadow-xs hover:border-[#0066CC] hover:shadow-[0_12px_28px_rgba(0,102,204,0.12)] hover:-translate-y-0.5 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between pb-3">
                        <span className="text-xs font-mono font-bold text-[#64748B] uppercase">{kpi.title}</span>
                        <div className="h-9 w-9 rounded-xl bg-[#EEF6FF] text-[#0066CC] flex items-center justify-center group-hover:bg-[#0066CC] group-hover:text-white transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-extrabold text-[#1E293B] font-display">{kpi.value}</span>
                        <div className="h-6 w-20 flex items-center justify-end">
                          {renderMiniSparkline(kpi.spark, '#0066CC')}
                        </div>
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#E5EDF5] flex items-center justify-between text-xs">
                        <span className="text-[#64748B] truncate">{kpi.sub}</span>
                        <span className="font-mono font-bold text-[#0066CC] text-[11px] shrink-0">{kpi.change}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Two Column Grid: Upcoming Interviews & Recent Candidates */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Upcoming Interviews */}
                <div className="p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-[#0066CC]" />
                      <h3 className="font-display font-bold text-base text-[#1E293B]">Scheduled Technical Interviews</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModule('recruitment');
                        setRecruitmentQuickTab('interviews');
                      }}
                      className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
                    >
                      View All ({interviews.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {interviews.slice(0, 4).map((interview) => (
                      <div key={interview.id} className="p-3.5 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] hover:bg-[#EEF6FF]/60 transition-colors flex items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#1E293B] truncate">{interview.candidateName}</span>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0066CC] border border-blue-200 text-[10px] font-mono">
                              {interview.round}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">
                            {interview.position} · {interview.dateTime}
                          </p>
                        </div>

                        <a
                          href={interview.meetingLink || 'https://meet.google.com/new'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-bold text-xs hover:brightness-105 transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
                        >
                          <Video className="h-3 w-3" />
                          <span>Join</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Candidate Applicants */}
                <div className="p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-[#0066CC]" />
                      <h3 className="font-display font-bold text-base text-[#1E293B]">Recent Applications</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveModule('recruitment');
                        setRecruitmentQuickTab('applications');
                      }}
                      className="text-xs font-bold text-[#0066CC] hover:underline cursor-pointer"
                    >
                      View All ({applications.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {applications.slice(0, 4).map((app) => (
                      <div key={app.id} className="p-3.5 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] hover:bg-[#EEF6FF]/60 transition-colors flex items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#1E293B] truncate">{app.name}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#EEF6FF] text-[#0066CC] border border-blue-200 text-[10px] font-mono">
                              {app.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#64748B] truncate">
                            {app.position} · {app.experienceYears || '2'} Yrs Exp · {app.appliedDate}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => setDrawerCandidate(app)}
                          className="px-3 py-1.5 rounded-xl border border-blue-200 bg-[#EEF6FF] text-[#0066CC] hover:bg-[#EAF5FF] font-bold text-xs transition-all cursor-pointer shrink-0"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: REPORTS (EXECUTIVE METRICS)                  */}
          {/* ===================================================== */}
          {activeModule === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5EDF5]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1E293B]">Executive Reports & Conversion Analytics</h2>
                  <p className="text-xs text-[#64748B]">Comprehensive deal velocity, lead source ROI, and recruitment ratios.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-sm text-[#1E293B]">Pipeline Funnel Conversion</h3>
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
                        <div className="h-2 w-full bg-[#EEF6FF] rounded-full overflow-hidden">
                          <div style={{ width: `${st.pct}%`, backgroundColor: st.color }} className="h-full rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-sm text-[#1E293B]">Recruitment Efficiency</h3>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-center space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 uppercase block">Average Time to Hire</span>
                      <span className="text-3xl font-extrabold text-[#38BDF8] font-display">6.2 Days</span>
                      <span className="text-[10px] text-slate-400 font-bold block">Industry benchmark: 18 days</span>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E5EDF5] text-center space-y-1">
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
              <div className="pb-4 border-b border-[#E5EDF5]">
                <h2 className="font-display text-2xl font-bold text-[#1E293B]">Visual Analytics & Growth Trajectory</h2>
                <p className="text-xs text-[#64748B]">Real-time forecasting across enterprise sales and talent hiring velocity.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Projected Annual Run Rate</span>
                  <p className="text-3xl font-extrabold text-[#38BDF8] font-display text-center leading-none">₹4.2 Cr</p>
                  <p className="text-xs text-[#64748B] text-center">Calculated across active accounts and pipeline value.</p>
                </div>

                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Average Deal Size</span>
                  <p className="text-3xl font-extrabold text-white font-display text-center leading-none">₹16.5 Lakhs</p>
                  <p className="text-xs text-[#64748B] text-center">Enterprise cloud and software delivery contracts.</p>
                </div>

                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white shadow-xl space-y-2 text-center flex flex-col items-center justify-center">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase text-center">Sales Velocity Ratio</span>
                  <p className="text-3xl font-extrabold text-cyan-300 font-display text-center leading-none">12.4 Days</p>
                  <p className="text-xs text-[#64748B] text-center">Inquiry to formal contract signature time.</p>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: NOTIFICATIONS CENTER                        */}
          {/* ===================================================== */}
          {activeModule === 'notifications' && (
            <div className="p-6 sm:p-8 border border-[#D8E7F5] rounded-2xl bg-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1E293B]">Live Activity & Notifications</h2>
                  <p className="text-xs text-[#64748B]">Audit logs for client inquiries, candidate resumes, and meetings.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      markAllNotificationsRead();
                      refreshAllData();
                      showToast('All notifications marked as read');
                    }}
                    className="px-4 py-2 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-xs font-bold text-[#38BDF8] hover:bg-[#E0F2FE] hover:text-white transition-all cursor-pointer"
                  >
                    Mark All Read
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear all notifications?')) {
                        clearAllNotifications();
                        refreshAllData();
                        showToast('All notifications cleared');
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-rose-200 bg-white text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                    title="Clear All Notifications"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#E5EDF5] text-xs">
                {notifications.map((n) => (
                  <div key={n.id} className={cn('py-4 flex items-start gap-3 p-3 rounded-xl transition-colors', !n.read ? 'bg-[#0066CC]/20 border border-[#0066CC]/30' : 'hover:bg-[#F0F7FF]')}>
                    <div className="h-8 w-8 rounded-full bg-[#0066CC]/30 text-[#38BDF8] border border-[#0066CC]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{n.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono text-slate-400">
                            {new Date(n.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(n.id);
                              refreshAllData();
                            }}
                            className="text-slate-400 hover:text-rose-400 p-1 rounded-md hover:bg-[#EEF6FF] transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-300 mt-0.5">{n.message}</p>
                    </div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <Bell className="h-8 w-8 mx-auto text-slate-500 opacity-40" />
                    <p className="font-semibold text-sm text-slate-300">No active notifications</p>
                    <p className="text-xs text-slate-500">Your notifications feed is completely clear.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* MODULE: SETTINGS & ROLES                             */}
          {/* ===================================================== */}
          {activeModule === 'settings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EDF5]">
                <div>
                  <h2 className="font-display text-2xl font-bold text-[#1E293B]">Enterprise System Configuration</h2>
                  <p className="text-xs text-[#64748B] mt-1">Manage staff roles, edit Careers CMS content, and configure email templates.</p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-xl border border-[#D8E7F5] text-xs">
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white space-y-6 shadow-xl">
                  <h3 className="font-display font-bold text-base text-[#1E293B]">Role-Based Access Control (RBAC)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userRoles.map((role) => (
                      <div key={role.roleId} className="p-5 rounded-2xl border border-[#E5EDF5] bg-[#F8FAFC] space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 style={{ color: role.color }} className="font-bold text-sm">{role.title}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-[#EEF6FF] border border-[#D8E7F5] text-[10px] font-mono font-bold text-slate-300">
                            {role.roleId}
                          </span>
                        </div>
                        <p className="text-xs text-[#64748B]">{role.description}</p>
                        <div className="pt-2 border-t border-[#E5EDF5] grid grid-cols-2 gap-2 text-xs">
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white space-y-4 shadow-xl">
                  <h3 className="font-display font-bold text-base text-[#1E293B]">Careers Portal Content Management</h3>
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase mb-1">Banner Heading</label>
                      <input
                        type="text"
                        defaultValue={careersCMS.bannerHeading}
                        id="cms-banner-heading"
                        className="w-full p-3 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-xs font-semibold text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-[#38BDF8] uppercase mb-1">Banner Subheading</label>
                      <input
                        type="text"
                        defaultValue={careersCMS.bannerSubheading}
                        id="cms-banner-subheading"
                        className="w-full p-3 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-xs font-medium text-white focus:outline-none focus:border-cyan-400"
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
                <div className="p-6 border border-[#D8E7F5] rounded-2xl bg-white space-y-6 shadow-xl">
                  <h3 className="font-display font-bold text-base text-[#1E293B]">Official HR & CRM Email Templates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {emailTemplates.map((tmpl) => (
                      <div key={tmpl.id} className="p-5 rounded-xl border border-[#E5EDF5] bg-[#F8FAFC] space-y-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#0066CC]/20 text-[#38BDF8] border border-[#0066CC]/30 font-mono text-[10px] font-bold">
                          {tmpl.category}
                        </span>
                        <h4 className="font-bold text-xs text-white">{tmpl.name}</h4>
                        <textarea
                          rows={4}
                          defaultValue={tmpl.body}
                          id={`template-body-${tmpl.id}`}
                          className="w-full p-3 rounded-lg border border-[#D8E7F5] bg-[#0B1F3A] text-[11px] text-white focus:outline-none focus:border-cyan-400"
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5EDF5]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                      Executive Schedule Desk
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-400 font-mono">Demos, Discovery & Interviews</span>
                  </div>
                  <h2 className="text-[30px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                    Schedule & Meetings Calendar
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
                    Integrated view of upcoming client demonstrations, technical discovery sessions, and talent interview evaluations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-[#D8E7F5] text-xs">
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#082F49] text-white hover:brightness-105 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    <Plus className="h-4 w-4 text-white" />
                    <span>+ Book Meeting / Interview</span>
                  </button>
                </div>
              </div>

              {/* Month Controls & Event Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#D8E7F5]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const m = new Date(calendarMonth);
                      m.setMonth(m.getMonth() - 1);
                      setCalendarMonth(m);
                    }}
                    className="p-2 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-white hover:bg-[#EEF6FF] cursor-pointer"
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
                    className="p-2 rounded-xl border border-[#D8E7F5] bg-[#F8FAFC] text-white hover:bg-[#EEF6FF] cursor-pointer"
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
                <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xl space-y-3">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono font-bold text-slate-400 pb-2 border-b border-[#E5EDF5]">
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
                            'min-h-[90px] sm:min-h-[110px] p-2 rounded-xl border border-[#E5EDF5] bg-[#F8FAFC] flex flex-col justify-between transition-colors hover:border-[#00D4FF]/40',
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
                  <div className="p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-[#38BDF8]" />
                        <h3 className="font-display font-bold text-base text-[#1E293B]">Client Discovery Demos</h3>
                      </div>
                      <span className="font-mono text-xs text-sky-300 font-bold">
                        {leads.filter(l => l.meetingStatus === 'Scheduled').length} Booked
                      </span>
                    </div>

                    <div className="divide-y divide-[#E5EDF5] space-y-3">
                      {leads.filter(l => l.meetingStatus === 'Scheduled').map((cl) => (
                        <div key={cl.id} className="pt-3 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-sm">{cl.name}</p>
                            <p className="text-xs text-[#64748B]">{cl.company || 'Enterprise Client'} · {cl.service}</p>
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
                  <div className="p-6 rounded-2xl bg-white border border-[#D8E7F5] shadow-xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5EDF5]">
                      <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-[#00D4FF]" />
                        <h3 className="font-display font-bold text-base text-[#1E293B]">Candidate Technical Evaluations</h3>
                      </div>
                      <span className="font-mono text-xs text-cyan-300 font-bold">
                        {interviews.length} Scheduled
                      </span>
                    </div>

                    <div className="divide-y divide-[#E5EDF5] space-y-3">
                      {interviews.map((it) => (
                        <div key={it.id} className="pt-3 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-white text-sm">{it.candidateName}</p>
                            <p className="text-xs text-[#64748B]">{it.position} · <span className="text-[#00D4FF] font-semibold">{it.round}</span></p>
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
              <div className="pb-6 border-b border-[#E5EDF5]">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#0066CC]/20 border border-[#0066CC]/40 text-[#38BDF8] text-[11px] font-mono font-bold uppercase">
                    Official HR Administrator Desk
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400 font-mono">Godavari Wave Technologies</span>
                </div>
                <h2 className="text-[30px] sm:text-[34px] font-extrabold text-[#1E293B] tracking-tight mt-1 leading-tight font-display">
                  HR Management Desk & Profile
                </h2>
                <p className="text-sm text-[#64748B] mt-1">
                  Administrator credentials, official HR email dispatch desk, and security password configuration for Renusri.
                </p>
              </div>

              {/* Profile Card */}
              <div className="m-3 sm:m-4 md:m-5 p-6 sm:p-8 rounded-lg bg-gradient-to-br from-white to-[#F0F7FF] border border-[#D8E7F5] shadow-2xl relative overflow-hidden">
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
                    <div className="m-1 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E5EDF5] space-y-1 shadow-sm">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Official HR Email</span>
                      <a href="mailto:hrhydgodavariwavetech@gmail.com" className="text-xs font-mono font-bold text-[#00D4FF] hover:underline block">
                        hrhydgodavariwavetech@gmail.com
                      </a>
                    </div>
                    <div className="m-1 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E5EDF5] space-y-1 shadow-sm">
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
                      className="p-6 rounded-lg bg-white border border-[#D8E7F5] shadow-xl flex flex-col items-center justify-center text-center transition-all duration-200 hover:border-[#00D4FF]/40 hover:shadow-2xl hover:-translate-y-0.5"
                    >
                      <div className="h-10 w-10 rounded-lg bg-[#F8FAFC] border border-[#E5EDF5] flex items-center justify-center text-[#00D4FF] mb-3">
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
                <div className="p-6 rounded-lg bg-white border border-[#D8E7F5] shadow-xl space-y-4">
                  <div className="pb-3 border-b border-[#E5EDF5]">
                    <h3 className="font-display font-bold text-base text-[#1E293B]">Security & Password Management</h3>
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
                        className="w-full p-3 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] font-mono placeholder-[#94A3B8] focus:outline-none focus:border-[#0066CC]"
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
                        className="w-full p-3 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] font-mono placeholder-[#94A3B8] focus:outline-none focus:border-[#0066CC]"
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
                        className="w-full p-3 rounded-lg border border-[#D8E7F5] bg-[#F8FAFC] text-[#1E293B] font-mono placeholder-[#94A3B8] focus:outline-none focus:border-[#0066CC]"
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
                <div className="p-6 rounded-lg bg-white border border-[#D8E7F5] shadow-xl space-y-4">
                  <div className="pb-3 border-b border-[#E5EDF5]">
                    <h3 className="font-display font-bold text-base text-[#1E293B]">Outbound Communications & Alerts</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Default settings for candidate correspondence and client proposals.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3.5 text-xs">
                    <div className="m-3 sm:m-4 p-4 rounded-sm bg-[#F8FAFC] border border-[#E5EDF5] space-y-1.5 shadow-md">
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

                    <div className="m-3 sm:m-4 p-4 rounded-sm bg-[#F8FAFC] border border-[#E5EDF5] space-y-1.5 shadow-md">
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
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-xl border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Send Official Email from HR
                    </h3>
                    <p className="text-xs text-white/80">
                      Official HR Mailer · Godavari Wave Technologies
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHrEmailModal(null)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]">
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Send From (Official HR Mailbox)
                  </label>
                  <select
                    value={hrEmailModal.senderEmail}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, senderEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs font-bold text-[#0066CC] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                  >
                    <option value="hrhydgodavariwavetech@gmail.com">hrhydgodavariwavetech@gmail.com (Official HR Mailbox - Renusri)</option>
                    <option value="careers@godavariwave.com">careers@godavariwave.com (Talent & Recruitment Desk)</option>
                    <option value="hr@godavariwave.com">hr@godavariwave.com (Corporate HR Desk)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={hrEmailModal.recipientName}
                      onChange={(e) => setHrEmailModal({ ...hrEmailModal, recipientName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] font-semibold focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      value={hrEmailModal.recipientEmail}
                      onChange={(e) => setHrEmailModal({ ...hrEmailModal, recipientEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs font-mono text-[#0066CC] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={hrEmailModal.subject}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs font-bold text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Email Body Content
                  </label>
                  <textarea
                    rows={6}
                    value={hrEmailModal.body}
                    onChange={(e) => setHrEmailModal({ ...hrEmailModal, body: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] leading-relaxed focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setHrEmailModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSendHREmail}
                    className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
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
              className="w-full max-w-xl overflow-hidden p-4 space-y-3 border border-[#D8E7F5] rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center gap-2.5 px-3 py-2 border-b border-[#E5EDF5]">
                <Search className="h-5 w-5 text-[#38BDF8]" />
                <input
                  type="text"
                  placeholder="Type to search clients, candidates, and job postings..."
                  value={commandSearch}
                  onChange={(e) => setCommandSearch(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-[#1E293B] placeholder-[#94A3B8] focus:outline-none"
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
                      className="w-full p-3 rounded-xl hover:bg-[#EEF6FF] flex items-center justify-between text-left cursor-pointer transition-colors"
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
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Create New Client Account
                    </h3>
                    <p className="text-xs text-white/80">
                      Client onboarding, service category and deal value
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddClientModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
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
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Varma"
                      value={newClientData.name}
                      onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Varma Agro Tech"
                      value={newClientData.company}
                      onChange={(e) => setNewClientData({ ...newClientData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ramesh@varma.com"
                      value={newClientData.email}
                      onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={newClientData.phone}
                      onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Technology Service
                    </label>
                    <select
                      value={newClientData.service}
                      onChange={(e) => setNewClientData({ ...newClientData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                    >
                      <option value="Enterprise Software">Enterprise Software</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Cloud Migration & DevOps">Cloud Migration & DevOps</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Cybersecurity Solutions">Cybersecurity Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Estimated Value (₹)
                    </label>
                    <input
                      type="number"
                      value={newClientData.revenue}
                      onChange={(e) => setNewClientData({ ...newClientData, revenue: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Requirement Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter project specifications or scope..."
                    value={newClientData.message}
                    onChange={(e) => setNewClientData({ ...newClientData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden leading-relaxed transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setIsAddClientModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4 text-white" />
                    <span>Save Client Account</span>
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
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Briefcase className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    Publish New Job Opening
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreateJobModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
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
                className="p-6 space-y-5 bg-white text-xs max-h-[calc(92vh-130px)] overflow-y-auto"
              >
                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Full Stack Engineer"
                    value={newJobData.title}
                    onChange={(e) => setNewJobData({ ...newJobData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 shadow-2xs transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Track Category
                    </label>
                    <select
                      value={newJobData.category}
                      onChange={(e) => setNewJobData({ ...newJobData, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 cursor-pointer shadow-2xs transition-all"
                    >
                      <option value="Software">Software Engineering</option>
                      <option value="AI">AI & Machine Learning</option>
                      <option value="Cloud">Cloud & DevOps</option>
                      <option value="Design">Product Design / UI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hyderabad, India (Hybrid)"
                      value={newJobData.location}
                      onChange={(e) => setNewJobData({ ...newJobData, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 shadow-2xs transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Key Skills (Comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, TypeScript, Node.js, Python"
                    value={newJobData.skills}
                    onChange={(e) => setNewJobData({ ...newJobData, skills: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-xs text-[#1E293B] placeholder-[#94A3B8] font-medium focus:outline-none focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 shadow-2xs transition-all"
                  />
                </div>

                {/* Footer: White Background, Primary Blue, Secondary Blue Border, Cancel Gray Border */}
                <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-end gap-3 bg-white">
                  <button
                    type="button"
                    onClick={() => setIsCreateJobModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setNewJobData({
                        title: '',
                        category: 'Software',
                        level: 'Fresher',
                        location: 'Hyderabad (Meenakshi Tech Park)',
                        type: 'Full-Time · On-site',
                        openings: 2,
                        status: 'Published',
                        experience: '0 – 1 Years',
                        description: 'We are seeking passionate engineers to build cloud-native applications and AI systems.',
                        responsibilities: 'Build responsive web apps, contribute to microservices, collaborate in agile sprints',
                        skills: 'React, TypeScript, Node.js, Tailwind CSS',
                        perks: 'Health insurance, Performance appraisals, Mentorship',
                      })
                    }
                    className="px-4 py-2.5 rounded-xl border border-[#0066CC] bg-white text-[#0066CC] hover:bg-[#EEF6FF] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                    <span>Publish Opening</span>
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
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Schedule Interview {interviewApplication ? `for ${interviewApplication.name}` : ''}
                    </h3>
                    <p className="text-xs text-white/80">
                      Technical rounds, interviewer assignment and video link
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsScheduleInterviewModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
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
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Interview Round
                  </label>
                  <select
                    value={newInterviewData.round}
                    onChange={(e) => setNewInterviewData({ ...newInterviewData, round: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                  >
                    <option value="Initial Screening">Initial HR Screening</option>
                    <option value="Technical Round">Technical Round 1 (Coding & Architecture)</option>
                    <option value="System Design">Technical Round 2 (System Design)</option>
                    <option value="Managerial Round">Managerial Discussion</option>
                    <option value="HR Discussion">HR Offer Discussion</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Interviewer Name
                    </label>
                    <input
                      type="text"
                      value={newInterviewData.interviewer}
                      onChange={(e) => setNewInterviewData({ ...newInterviewData, interviewer: e.target.value })}
                      placeholder="e.g. Renusri (Talent Lead)"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={newInterviewData.dateTime}
                      onChange={(e) => setNewInterviewData({ ...newInterviewData, dateTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Meeting Link (Google Meet / Teams)
                  </label>
                  <input
                    type="url"
                    value={newInterviewData.meetingLink}
                    onChange={(e) => setNewInterviewData({ ...newInterviewData, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/new"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs font-mono text-[#0066CC] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setIsScheduleInterviewModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4 text-white" />
                    <span>Confirm Schedule</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: EDIT CLIENT / LEAD                                 */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingClient && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Edit3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Edit Client / Lead Details
                    </h3>
                    <p className="text-xs text-white/80">
                      Update contact, status, deal valuation and notes
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateLead(editingClient.id, editingClient);
                  refreshAllData();
                  showToast(`Updated details for ${editingClient.name}`);
                  setEditingClient(null);
                }}
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingClient.name}
                    onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={editingClient.company || ''}
                      onChange={(e) => setEditingClient({ ...editingClient, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Service / Requirement
                    </label>
                    <input
                      type="text"
                      value={editingClient.service || ''}
                      onChange={(e) => setEditingClient({ ...editingClient, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={editingClient.email}
                      onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingClient.phone}
                      onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Pipeline Status
                    </label>
                    <select
                      value={editingClient.status}
                      onChange={(e) => setEditingClient({ ...editingClient, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="In Discussion">In Discussion</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Negotiation">Negotiation</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Priority
                    </label>
                    <select
                      value={editingClient.priority}
                      onChange={(e) => setEditingClient({ ...editingClient, priority: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Deal Value (₹)
                    </label>
                    <input
                      type="number"
                      value={editingClient.revenue || 0}
                      onChange={(e) => setEditingClient({ ...editingClient, revenue: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Notes / Internal Summary
                  </label>
                  <textarea
                    rows={3}
                    value={editingClient.notes || ''}
                    onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setEditingClient(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Save className="h-4 w-4 text-white" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: EDIT CANDIDATE APPLICATION                        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {editingApplication && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Edit3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Edit Candidate Application
                    </h3>
                    <p className="text-xs text-white/80">
                      Update candidate details, position and hiring stage
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingApplication(null)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateApplication(editingApplication.id, editingApplication);
                  refreshAllData();
                  showToast(`Updated candidate: ${editingApplication.name}`);
                  setEditingApplication(null);
                }}
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApplication.name}
                    onChange={(e) => setEditingApplication({ ...editingApplication, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={editingApplication.email}
                      onChange={(e) => setEditingApplication({ ...editingApplication, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingApplication.phone}
                      onChange={(e) => setEditingApplication({ ...editingApplication, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Applied Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingApplication.position}
                    onChange={(e) => setEditingApplication({ ...editingApplication, position: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Application Status
                    </label>
                    <select
                      value={editingApplication.status}
                      onChange={(e) => setEditingApplication({ ...editingApplication, status: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Reviewing">Reviewing</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Experience Years
                    </label>
                    <input
                      type="text"
                      value={editingApplication.experienceYears || ''}
                      onChange={(e) => setEditingApplication({ ...editingApplication, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingApplication.skills) ? editingApplication.skills.join(', ') : (editingApplication.skills || '')}
                    onChange={(e) => setEditingApplication({ ...editingApplication, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Recruiter Notes / Review Feedback
                  </label>
                  <textarea
                    rows={3}
                    value={editingApplication.notes || ''}
                    onChange={(e) => setEditingApplication({ ...editingApplication, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setEditingApplication(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Save className="h-4 w-4 text-white" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* MODAL: ADD CANDIDATE                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddCandidateModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-lg border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <UserPlus className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Add Candidate to Pipeline
                    </h3>
                    <p className="text-xs text-white/80">
                      Candidate profile, skill summary and initial stage
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAddCandidateModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5), White Inputs with Blue Focus */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  saveApplication({
                    name: newCandidateData.name,
                    email: newCandidateData.email,
                    phone: newCandidateData.phone,
                    position: newCandidateData.position,
                    assignedRecruiter: 'Renusri',
                    experienceLevel: newCandidateData.experienceLevel,
                    experienceYears: newCandidateData.experienceYears,
                    currentLocation: newCandidateData.currentLocation,
                    skills: typeof newCandidateData.skills === 'string' ? newCandidateData.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : newCandidateData.skills,
                    status: 'New',
                    notes: newCandidateData.notes,
                    rating: 4,
                  });
                  refreshAllData();
                  showToast(`Candidate ${newCandidateData.name} added to pipeline`);
                  setIsAddCandidateModalOpen(false);
                }}
                className="p-6 space-y-5 max-h-[80vh] overflow-y-auto bg-white text-[#1E293B]"
              >
                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar"
                    value={newCandidateData.name}
                    onChange={(e) => setNewCandidateData({ ...newCandidateData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. suresh@example.com"
                      value={newCandidateData.email}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={newCandidateData.phone}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Position *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Software Developer"
                      value={newCandidateData.position}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, position: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Experience Level
                    </label>
                    <select
                      value={newCandidateData.experienceLevel}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, experienceLevel: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all cursor-pointer"
                    >
                      <option value="Fresher">Fresher</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Experience Years
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1.5 Yrs"
                      value={newCandidateData.experienceYears}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, experienceYears: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] placeholder-[#64748B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                      Current Location
                    </label>
                    <input
                      type="text"
                      value={newCandidateData.currentLocation}
                      onChange={(e) => setNewCandidateData({ ...newCandidateData, currentLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newCandidateData.skills}
                    onChange={(e) => setNewCandidateData({ ...newCandidateData, skills: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#1E293B] mb-1.5 uppercase tracking-wider">
                    Recruiter Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newCandidateData.notes}
                    onChange={(e) => setNewCandidateData({ ...newCandidateData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D8E7F5] rounded-xl text-xs text-[#1E293B] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 outline-hidden transition-all"
                  />
                </div>

                {/* Footer: White Background, Dark Blue Gradient Primary Button, Gray Border Cancel */}
                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D8E7F5]">
                  <button
                    type="button"
                    onClick={() => setIsAddCandidateModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:text-[#1E293B] hover:bg-[#F4F8FC] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4 text-white" />
                    <span>Add Candidate</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
{/* ========================================================= */}
      {/* ADD / EDIT CLIENT REQUIREMENT MODAL DIALOG                */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAddRequirementModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ backgroundColor: '#FFFFFF' }}
              className="w-full max-w-2xl border border-[#D8E7F5] rounded-[16px] bg-white shadow-2xl overflow-hidden text-[#1E293B] relative"
            >
              {/* Header: Solid #0066CC Background, White Title, Rounded Top Corners, Circular Red Close Button */}
              <div
                style={{ backgroundColor: '#0066CC' }}
                className="px-6 py-4 rounded-t-[16px] flex items-center justify-between text-white shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                    <ClipboardList className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {editingRequirement ? 'Edit Client Requirement' : 'Log Client Requirement Specification'}
                    </h3>
                    <p className="text-xs text-white/80">
                      Technical scope, engineering stack, timeline and budget
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddRequirementModalOpen(false);
                    setEditingRequirement(null);
                  }}
                  className="h-8 w-8 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all cursor-pointer shrink-0"
                  title="Close"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Body: Solid White Background, 24px Padding (p-6), 20px Field Spacing (space-y-5) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);

                  const reqId = (formData.get('requirementId') as string) || `REQ-2025-${Math.floor(100 + Math.random() * 900)}`;
                  const clientName = formData.get('clientName') as string;
                  const companyName = formData.get('companyName') as string;
                  const projectType = formData.get('projectType') as string;
                  const techStackStr = (formData.get('techStack') as string) || 'React, Node.js, Cloud';
                  const priority = formData.get('priority') as any;
                  const budget = (formData.get('budget') as string) || '₹10,00,000';
                  const timeline = (formData.get('timeline') as string) || '3 Months';
                  const assignedTeam = (formData.get('assignedTeam') as string) || 'Fullstack Engineering Lead';
                  const status = formData.get('status') as any;
                  const notes = formData.get('notes') as string;

                  const newReq: ClientRequirement = {
                    id: editingRequirement ? editingRequirement.id : `req-${Date.now()}`,
                    requirementId: reqId,
                    clientName,
                    companyName,
                    projectType,
                    technologyStack: techStackStr.split(',').map((t) => t.trim()).filter(Boolean),
                    priority,
                    budget,
                    timeline,
                    documentsCount: editingRequirement ? editingRequirement.documentsCount : 1,
                    assignedTeam,
                    status,
                    createdAt: editingRequirement ? editingRequirement.createdAt : new Date().toISOString().split('T')[0],
                    notes,
                  };

                  handleSaveRequirement(newReq);
                }}
                className="p-6 space-y-5 bg-white text-xs max-h-[calc(92vh-130px)] overflow-y-auto"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Requirement ID
                    </label>
                    <input
                      type="text"
                      name="requirementId"
                      defaultValue={editingRequirement?.requirementId || `REQ-2025-${Math.floor(100 + Math.random() * 900)}`}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-mono font-bold focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      defaultValue={editingRequirement?.priority || 'High'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-semibold focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden cursor-pointer shadow-2xs transition-all"
                    >
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Client Contact Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      defaultValue={editingRequirement?.clientName || ''}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      defaultValue={editingRequirement?.companyName || ''}
                      placeholder="e.g. CloudTech Global Pvt Ltd"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Project Deliverable Type *
                  </label>
                  <input
                    type="text"
                    name="projectType"
                    defaultValue={editingRequirement?.projectType || ''}
                    placeholder="e.g. AI-Powered SaaS Analytics Platform"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Technology Stack (Comma separated) *
                  </label>
                  <input
                    type="text"
                    name="techStack"
                    defaultValue={editingRequirement?.technologyStack.join(', ') || 'React, TypeScript, Python FastAPI, PostgreSQL, AWS'}
                    placeholder="e.g. React, Node.js, Python AI, PostgreSQL, Docker"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-mono placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      name="budget"
                      defaultValue={editingRequirement?.budget || '₹12,50,000'}
                      placeholder="e.g. ₹15,00,000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-mono focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Delivery Timeline
                    </label>
                    <input
                      type="text"
                      name="timeline"
                      defaultValue={editingRequirement?.timeline || '3.5 Months'}
                      placeholder="e.g. 4 Months"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-mono focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      defaultValue={editingRequirement?.status || 'Reviewing'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] font-semibold focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden cursor-pointer shadow-2xs transition-all"
                    >
                      <option value="Reviewing">Reviewing</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending Specs">Pending Specs</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Assigned Engineering Team
                  </label>
                  <input
                    type="text"
                    name="assignedTeam"
                    defaultValue={editingRequirement?.assignedTeam || 'Fullstack & Cloud Engineering Guild'}
                    placeholder="e.g. AI & Fullstack Team"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#1E293B] uppercase mb-1.5">
                    Scope Notes & Specifications
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    defaultValue={editingRequirement?.notes || ''}
                    placeholder="Provide details about architecture requirements, integrations, compliance, SLA expectations..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 focus:outline-hidden shadow-2xs transition-all"
                  />
                </div>

                {/* Footer: Solid White, Cancel (Gray border) & Primary Blue CTA */}
                <div className="pt-4 border-t border-[#E5EDF5] flex items-center justify-end gap-3 bg-white">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddRequirementModalOpen(false);
                      setEditingRequirement(null);
                    }}
                    className="px-4 py-2.5 rounded-xl border border-[#D8E7F5] bg-white text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:brightness-105 text-white text-xs cursor-pointer shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                    <span>{editingRequirement ? 'Update Scope' : 'Save Requirement'}</span>
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
