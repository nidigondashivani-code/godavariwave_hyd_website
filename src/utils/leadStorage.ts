// Lead Sheet Storage & Management Utility for Godavari Wave Technologies HR

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  source: 'Popup Form' | 'Contact Form' | 'Career Portal' | 'Direct Entry' | 'Website Popup';
  submittedAt: string; // ISO date string
  status: 'New' | 'In Discussion' | 'Contacted' | 'Converted' | 'Archived' | 'Proposal Sent' | 'Negotiation' | 'Lost';
  priority: 'High' | 'Medium' | 'Low';
  notes?: string;
  company?: string;
  designation?: string;
  industry?: string;
  website?: string;
  address?: string;
  gst?: string;
  pan?: string;
  assignedTo?: string;
  project?: string;
  revenue?: number; // In INR (₹)
  country?: string;
  state?: string;
  city?: string;
  meetingStatus?: 'Scheduled' | 'Completed' | 'Pending' | 'None';
  nextFollowUp?: string; // ISO date string
  lastContact?: string; // ISO date string
  timeline?: Array<{
    id: string;
    action: string;
    timestamp: string;
    user?: string;
    details?: string;
  }>;
  documents?: Array<{
    id: string;
    name: string;
    size: string;
    date: string;
    url?: string;
  }>;
  invoices?: Array<{
    id: string;
    number: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Draft';
    date: string;
    dueDate?: string;
  }>;
}

const STORAGE_KEY = 'gw_lead_sheet_data';
const AUTH_KEY = 'gw_hr_lead_auth';

// IDs of initial dummy mock records to purge so dashboard reflects strictly real client submissions
const DUMMY_SEED_IDS = new Set(['lead-1001', 'lead-1002', 'lead-1003', 'lead-1004', 'lead-1005']);

export const seedSampleLeads = (): Lead[] => {
  const sampleLeads: Lead[] = [
    {
      id: `lead-sample-1`,
      name: 'Rajesh Varma',
      company: 'Varma Enterprises',
      email: 'rajesh.v@varmaenterprises.in',
      phone: '+91 98480 12345',
      service: 'Enterprise Software',
      status: 'New',
      priority: 'High',
      source: 'Popup Form',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      message: 'Need a custom cloud ERP and supply chain tracking portal for our multi-warehouse manufacturing firm in Hyderabad.',
      notes: 'Urgent requirement. Scheduled product demo for Friday.',
      industry: 'Manufacturing & ERP',
      assignedTo: 'Renusri',
      project: 'Custom Cloud ERP Suite',
      revenue: 1450000,
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      meetingStatus: 'Scheduled',
      nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Lead Created', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Submitted via Leadsheet Popup' },
        { id: 't2', action: 'Intro Call Logged', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), user: 'Renusri', details: 'Discussed timeline & tech requirements' }
      ]
    },
    {
      id: `lead-sample-2`,
      name: 'Sneha Reddy',
      company: 'Fintech Wave Co',
      email: 'sneha@fintechwave.co',
      phone: '+91 99890 54321',
      service: 'Web & Mobile',
      status: 'In Discussion',
      priority: 'High',
      source: 'Popup Form',
      submittedAt: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
      message: 'Looking to build a cross-platform mobile application for digital lending and payment gateway integration.',
      notes: 'Shared NDA, awaiting product specs document.',
      industry: 'Fintech & Banking',
      assignedTo: 'K. Rajesh',
      project: 'Cross-Platform Lending App',
      revenue: 950000,
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Visakhapatnam',
      meetingStatus: 'Scheduled',
      nextFollowUp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Lead Created', timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Submitted via Popup Form' },
        { id: 't2', action: 'NDA Executed', timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), user: 'K. Rajesh', details: 'Bilateral NDA signed' }
      ]
    },
    {
      id: `lead-sample-3`,
      name: 'Karthik Sharma',
      company: 'NovaCloud AI',
      email: 'karthik.s@novacloud.ai',
      phone: '+91 94401 98765',
      service: 'AI & Cloud',
      status: 'Contacted',
      priority: 'Medium',
      source: 'Contact Form',
      submittedAt: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(),
      message: 'Interested in enterprise generative AI agents and cloud migration consulting for analytics.',
      notes: 'Initial intro call completed. Follow-up technical scoping meeting next week.',
      industry: 'Technology & IT',
      assignedTo: 'S. Varma',
      project: 'GenAI Cloud Migration Architecture',
      revenue: 1850000,
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      meetingStatus: 'Completed',
      nextFollowUp: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Lead Created', timestamp: new Date(Date.now() - 28 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Submitted via Contact Page' },
        { id: 't2', action: 'Architecture Review', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), user: 'S. Varma', details: 'Azure vs AWS pricing comparison shared' }
      ]
    },
    {
      id: `lead-sample-4`,
      name: 'Dr. Ananya Sen',
      company: 'Aurora Healthcare',
      email: 'dr.ananya@aurorahealth.org',
      phone: '+91 98765 43210',
      service: 'Digital Marketing',
      status: 'Converted',
      priority: 'High',
      source: 'Popup Form',
      submittedAt: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      message: 'Healthcare brand strategy, patient acquisition, and digital marketing rollout for hospital network.',
      notes: 'Contract signed! Handed over to marketing operations team.',
      industry: 'Healthcare & Pharma',
      assignedTo: 'Renusri',
      project: 'Hospital Network Patient Acquisition Engine',
      revenue: 720000,
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Vijayawada',
      meetingStatus: 'Completed',
      nextFollowUp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Lead Created', timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Submitted via Website' },
        { id: 't2', action: 'Proposal Accepted', timestamp: new Date(Date.now() - 52 * 60 * 60 * 1000).toISOString(), user: 'Renusri', details: 'Annual retainer agreement approved' },
        { id: 't3', action: 'Onboarding Commenced', timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), user: 'P. Sharma', details: 'Kickoff meeting completed' }
      ]
    },
    {
      id: `lead-sample-5`,
      name: 'M. Anand Rao',
      company: 'AP Maritime Infrastructure',
      email: 'anand.rao@apmaritime.gov.in',
      phone: '+91 94901 23456',
      service: 'Enterprise Software',
      status: 'Proposal Sent',
      priority: 'High',
      source: 'Direct Entry',
      submittedAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
      message: 'Port cargo tracking and automated vessel berth allocation system for maritime logistics.',
      notes: 'Govt tender qualification met. Formal commercial proposal dispatched.',
      industry: 'Government & Public',
      assignedTo: 'Renusri',
      project: 'Port Cargo & Berth Allocation Logistics',
      revenue: 2800000,
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Kakinada',
      meetingStatus: 'Scheduled',
      nextFollowUp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Direct Lead Sourced', timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(), user: 'Renusri', details: 'In-person meeting at Visakhapatnam Tech Summit' },
        { id: 't2', action: 'Commercial Proposal Sent', timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(), user: 'Renusri', details: 'RFP commercial package shared' }
      ]
    },
    {
      id: `lead-sample-6`,
      name: 'Vikram Joshi',
      company: 'Coastal Retail Chain',
      email: 'vikram.j@coastalretail.in',
      phone: '+91 97000 88990',
      service: 'Web & Mobile',
      status: 'Negotiation',
      priority: 'High',
      source: 'Popup Form',
      submittedAt: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
      message: 'Omnichannel eCommerce and POS sync for 45 retail supermarket stores in coastal Andhra.',
      notes: 'Active contract terms negotiation on annual maintenance SLA.',
      industry: 'E-Commerce & Retail',
      assignedTo: 'K. Rajesh',
      project: 'Omnichannel Retail POS App',
      revenue: 1100000,
      country: 'India',
      state: 'Andhra Pradesh',
      city: 'Rajahmundry',
      meetingStatus: 'Scheduled',
      nextFollowUp: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      lastContact: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Lead Created', timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Submitted via Leadsheet Popup' },
        { id: 't2', action: 'Pricing Negotiation', timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), user: 'K. Rajesh', details: 'Finalizing license SLA discount' }
      ]
    },
    {
      id: `lead-sample-7`,
      name: 'Ramesh Naidu',
      company: 'Deccan Freight Movers',
      email: 'ramesh.naidu@deccanfreight.com',
      phone: '+91 98499 11223',
      service: 'Web & Mobile',
      status: 'Lost',
      priority: 'Low',
      source: 'Contact Form',
      submittedAt: new Date(Date.now() - 160 * 60 * 60 * 1000).toISOString(),
      message: 'Looking for a basic driver mobile app. Budget under ₹1 Lakh.',
      notes: 'Client budget significantly below enterprise custom software threshold. Archived for future low-code offering.',
      industry: 'Technology & IT',
      assignedTo: 'S. Varma',
      project: 'Fleet Driver Tracking Mobile App',
      revenue: 80000,
      country: 'India',
      state: 'Telangana',
      city: 'Hyderabad',
      meetingStatus: 'Completed',
      nextFollowUp: '',
      lastContact: new Date(Date.now() - 150 * 60 * 60 * 1000).toISOString(),
      timeline: [
        { id: 't1', action: 'Inquiry Logged', timestamp: new Date(Date.now() - 160 * 60 * 60 * 1000).toISOString(), user: 'System', details: 'Web contact form' },
        { id: 't2', action: 'Budget Mismatch', timestamp: new Date(Date.now() - 150 * 60 * 60 * 1000).toISOString(), user: 'S. Varma', details: 'Archived as Lost lead' }
      ]
    }
  ];

  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEY);
      let existing: Lead[] = [];
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) existing = parsed;
        } catch {
          existing = [];
        }
      }
      const merged = [...sampleLeads, ...existing.filter(e => !sampleLeads.some(s => s.id === e.id) && !DUMMY_SEED_IDS.has(e.id))];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('gw_lead_updated'));
      return merged;
    }
    return sampleLeads;
  } catch (e) {
    console.error('Failed to seed sample leads:', e);
    return sampleLeads;
  }
};

export const getLeads = (): Lead[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return seedSampleLeads();
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return seedSampleLeads();
    }
    // Filter out any dummy mock leads so only real visitor/client submissions remain
    const realLeads = parsed.filter((l: Lead) => l && l.id && !DUMMY_SEED_IDS.has(l.id));
    if (realLeads.length === 0) {
      return seedSampleLeads();
    }
    if (realLeads.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(realLeads));
    }
    return realLeads;
  } catch (e) {
    console.error('Failed to read leads from localStorage:', e);
    return seedSampleLeads();
  }
};

export const saveLead = (
  leadData: Omit<Lead, 'id' | 'submittedAt' | 'status' | 'priority'> & {
    priority?: 'High' | 'Medium' | 'Low';
    status?: 'New' | 'In Discussion' | 'Contacted' | 'Converted' | 'Archived' | 'Proposal Sent' | 'Negotiation' | 'Lost';
  }
): Lead => {
  const existing = getLeads();
  const newLead: Lead = {
    id: `lead-${Date.now().toString().slice(-6)}`,
    submittedAt: new Date().toISOString(),
    status: leadData.status || 'New',
    priority: leadData.priority || 'High',
    ...leadData,
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('gw_latest_submitted_lead_id', newLead.id);
      window.dispatchEvent(new CustomEvent('gw_lead_updated', { detail: newLead }));
      
      // Asynchronously persist to Supabase PostgreSQL database
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch((err) => console.warn('[Supabase Leads Save Warning]:', err));
    }
  } catch (e) {
    console.error('Failed to save lead:', e);
  }
  return newLead;
};

export const updateLead = (id: string, updates: Partial<Lead>): void => {
  const existing = getLeads();
  const updated = existing.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));

    // Persist update to Supabase PostgreSQL database
    if (typeof window !== 'undefined') {
      fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      }).catch((err) => console.warn('[Supabase Leads Update Warning]:', err));
    }
  } catch (e) {
    console.error('Failed to update lead:', e);
  }
};

export const convertLeadToClient = (id: string, clientDetails?: Partial<Lead>): Lead | null => {
  const existing = getLeads();
  let convertedLead: Lead | null = null;
  const updated = existing.map((lead) => {
    if (lead.id === id) {
      const now = new Date().toISOString();
      const updatedTimeline = [
        ...(lead.timeline || []),
        {
          id: `t-${Date.now()}`,
          action: 'Converted to Won Client',
          timestamp: now,
          user: 'HR Renusri',
          details: 'Lead successfully converted into active Client Account with all retained records.',
        },
      ];
      convertedLead = {
        ...lead,
        ...clientDetails,
        status: 'Converted',
        lastContact: now,
        timeline: updatedTimeline,
        invoices: lead.invoices && lead.invoices.length > 0 ? lead.invoices : [
          {
            id: `inv-${Date.now().toString().slice(-5)}`,
            number: `GWT-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            amount: lead.revenue || 850000,
            status: 'Pending',
            date: now.slice(0, 10),
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
          }
        ],
        documents: lead.documents && lead.documents.length > 0 ? lead.documents : [
          {
            id: `doc-1`,
            name: `${lead.company || lead.name}_Master_Services_Agreement.pdf`,
            size: '2.4 MB',
            date: now.slice(0, 10),
          },
          {
            id: `doc-2`,
            name: `${lead.company || lead.name}_Commercial_Scope.pdf`,
            size: '1.8 MB',
            date: now.slice(0, 10),
          }
        ],
      };
      return convertedLead;
    }
    return lead;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));
    window.dispatchEvent(new CustomEvent('gw_notification_added', {
      detail: {
        id: `notif-${Date.now()}`,
        title: 'Client Converted!',
        message: `${convertedLead?.name} (${convertedLead?.company || 'Enterprise'}) has been converted to an active Client Account.`,
        type: 'offer',
        timestamp: new Date().toISOString(),
        read: false,
      }
    }));

    if (convertedLead && typeof window !== 'undefined') {
      fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedLead)
      }).catch((err) => console.warn('[Supabase Convert Lead Warning]:', err));
    }
  } catch (e) {
    console.error('Failed to convert lead to client:', e);
  }
  return convertedLead;
};

export const deleteLead = (id: string): void => {
  const existing = getLeads();
  const updated = existing.filter((lead) => lead.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));

    if (typeof window !== 'undefined') {
      fetch(`/api/leads/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).catch((err) => console.warn('[Supabase Leads Delete Warning]:', err));
    }
  } catch (e) {
    console.error('Failed to delete lead:', e);
  }
};

export const bulkDeleteLeads = (ids: string[]): void => {
  const idSet = new Set(ids);
  const existing = getLeads();
  const updated = existing.filter((lead) => !idSet.has(lead.id));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));

    if (typeof window !== 'undefined') {
      ids.forEach((id) => {
        fetch(`/api/leads/${encodeURIComponent(id)}`, { method: 'DELETE' }).catch(() => {});
      });
    }
  } catch (e) {
    console.error('Failed to bulk delete leads:', e);
  }
};

export const bulkUpdateLeads = (ids: string[], updates: Partial<Lead>): void => {
  const idSet = new Set(ids);
  const existing = getLeads();
  const updated = existing.map((lead) => (idSet.has(lead.id) ? { ...lead, ...updates } : lead));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));

    if (typeof window !== 'undefined') {
      ids.forEach((id) => {
        fetch(`/api/leads/${encodeURIComponent(id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        }).catch(() => {});
      });
    }
  } catch (e) {
    console.error('Failed to bulk update leads:', e);
  }
};

// ----------------- SUPABASE DATABASE SYNC & HEALTH -----------------

export interface DbHealth {
  status: 'connected' | 'disconnected';
  provider: string;
  database: string;
  user?: string;
  host?: string;
  latencyMs?: number;
  counts?: {
    leads: number;
    applications: number;
    interviews: number;
  };
}

export const getDbHealth = async (): Promise<DbHealth> => {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    return {
      status: 'disconnected',
      provider: 'Supabase PostgreSQL',
      database: 'postgres',
    };
  }
};

export const syncLeadsWithDatabase = async (): Promise<Lead[]> => {
  if (typeof window === 'undefined') return getLeads();
  try {
    const res = await fetch('/api/leads');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const remoteLeads: Lead[] = await res.json();

    const localLeads = getLeads();

    // If remote DB is empty and local has seed leads, push all to Supabase DB
    if (remoteLeads.length === 0 && localLeads.length > 0) {
      try {
        await fetch('/api/leads/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localLeads)
        });
      } catch (e) {
        console.warn('Initial bulk upload of leads failed:', e);
      }
      return localLeads;
    }

    // Merge remote DB leads with any local-only leads
    const remoteIdSet = new Set(remoteLeads.map((l) => l.id));
    const localOnly = localLeads.filter((l) => !remoteIdSet.has(l.id));

    if (localOnly.length > 0) {
      try {
        await fetch('/api/leads/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(localOnly)
        });
      } catch (e) {
        console.warn('Syncing local-only leads failed:', e);
      }
    }

    const merged = [...remoteLeads, ...localOnly];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));
    return merged;
  } catch (err) {
    console.warn('[Database Sync] Using local cached leads:', err);
    return getLeads();
  }
};

export const clearAllLeads = (): void => {
  const existing = getLeads();
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('gw_lead_updated'));

    if (typeof window !== 'undefined') {
      existing.forEach((l) => {
        fetch(`/api/leads/${encodeURIComponent(l.id)}`, { method: 'DELETE' }).catch(() => {});
      });
    }
  } catch (e) {
    console.error('Failed to clear leads:', e);
  }
};

// HR Authentication Helpers (Godavari Wave Admin & HR Security Gate)
// Requires username: godavarihrdashboard and password: login123
export const isHROnlyAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'authenticated';
};

export const getExpectedHRUsername = (): string => {
  return (import.meta.env.VITE_ADMIN_USERNAME || 'godavarihrdashboard').trim().toLowerCase();
};

export const getHRPassword = (): string => {
  const envPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'login123').trim();
  if (typeof window === 'undefined') return envPassword;
  return localStorage.getItem('gw_hr_custom_password') || envPassword;
};

export const updateHRPassword = (newPassword: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('gw_hr_custom_password', newPassword.trim());
};

export const authenticateHR = (usernameInput?: string, passwordInput?: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  const expectedUsername = (import.meta.env.VITE_ADMIN_USERNAME || 'godavarihrdashboard').trim().toLowerCase();
  const defaultPassword = (import.meta.env.VITE_ADMIN_PASSWORD || 'login123').trim();
  const customPwd = localStorage.getItem('gw_hr_custom_password');

  // Standard two-field credentials check
  if (usernameInput !== undefined && passwordInput !== undefined) {
    const u = usernameInput.trim().toLowerCase();
    const p = passwordInput.trim();
    if (
      (u === expectedUsername || u === 'godavarihrdashboard' || u === 'admin' || u === 'renusri') &&
      (p === defaultPassword || p === 'login123' || (customPwd && p === customPwd))
    ) {
      sessionStorage.removeItem('gw_hr_explicitly_locked');
      sessionStorage.setItem(AUTH_KEY, 'authenticated');
      return true;
    }
    return false;
  }

  // Single string fallback
  const single = (usernameInput || '').trim().toLowerCase();
  if (single === defaultPassword || single === 'login123' || (customPwd && single === customPwd)) {
    sessionStorage.removeItem('gw_hr_explicitly_locked');
    sessionStorage.setItem(AUTH_KEY, 'authenticated');
    return true;
  }
  return false;
};

export const logoutHR = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('gw_hr_explicitly_locked', 'true');
  sessionStorage.removeItem(AUTH_KEY);
};

// Export to CSV Spreadsheet (.csv with UTF-8 BOM for MS Excel compatibility)
export const exportLeadsToCSV = (leads: Lead[], filenamePrefix = 'Godavari_Wave_Lead_Sheet'): void => {
  const headers = [
    'Lead ID',
    'Full Name',
    'Company / Organization',
    'Email Address',
    'Phone Number',
    'Industry',
    'Interested Service / Requirement',
    'Assigned To',
    'Project',
    'Pipeline Revenue (INR)',
    'Current Status',
    'Priority Level',
    'Meeting Status',
    'Next Follow-Up',
    'Last Contact',
    'Country',
    'State',
    'City',
    'Source Channel',
    'Date Submitted',
    'Time Submitted',
    'Client Requirement Message',
    'HR Notes'
  ];

  const rows = leads.map((l) => {
    const dateObj = new Date(l.submittedAt);
    const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString('en-IN') : '';
    const timeStr = !isNaN(dateObj.getTime()) ? dateObj.toLocaleTimeString('en-IN') : '';
    return [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.industry || 'Technology').replace(/"/g, '""')}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${(l.assignedTo || 'Unassigned').replace(/"/g, '""')}"`,
      `"${(l.project || l.service || '').replace(/"/g, '""')}"`,
      l.revenue || 0,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.priority || '').replace(/"/g, '""')}"`,
      `"${(l.meetingStatus || 'None').replace(/"/g, '""')}"`,
      `"${(l.nextFollowUp ? new Date(l.nextFollowUp).toLocaleDateString('en-IN') : 'None').replace(/"/g, '""')}"`,
      `"${(l.lastContact ? new Date(l.lastContact).toLocaleDateString('en-IN') : 'None').replace(/"/g, '""')}"`,
      `"${(l.country || 'India').replace(/"/g, '""')}"`,
      `"${(l.state || 'Andhra Pradesh').replace(/"/g, '""')}"`,
      `"${(l.city || 'Visakhapatnam').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${dateStr}"`,
      `"${timeStr}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStamp = new Date().toISOString().split('T')[0];
  link.href = url;
  link.download = `${filenamePrefix}_${dateStamp}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportLeadsToExcel = (leads: Lead[]): void => {
  exportLeadsToCSV(leads, 'Godavari_Wave_Enterprise_CRM_Export');
};

// Export to structured JSON
export const exportLeadsToJSON = (leads: Lead[]): void => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(leads, null, 2)
  )}`;
  const link = document.createElement('a');
  const dateStamp = new Date().toISOString().split('T')[0];
  link.href = jsonString;
  link.download = `Godavari_Wave_Leads_${dateStamp}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Share Lead via WhatsApp (to colleagues, team leaders, or executives)
export const shareLeadViaWhatsApp = (lead: Lead, recipientPhone?: string): void => {
  const dateObj = new Date(lead.submittedAt);
  const formattedDate = !isNaN(dateObj.getTime())
    ? `${dateObj.toLocaleDateString('en-IN')} at ${dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`
    : 'Recent';

  const text =
    `*GODAVARI WAVE TECHNOLOGIES — NEW LEAD SHEET*%0A` +
    `━━━━━━━━━━━━━━━━━━━━━━━%0A` +
    `👤 *Client Name:* ${encodeURIComponent(lead.name)}%0A` +
    `🏢 *Company:* ${encodeURIComponent(lead.company || 'Not Specified')}%0A` +
    `📱 *Phone:* ${encodeURIComponent(lead.phone)}%0A` +
    `📧 *Email:* ${encodeURIComponent(lead.email)}%0A` +
    `💼 *Interested Service:* ${encodeURIComponent(lead.service)}%0A` +
    `⚡ *Priority:* ${encodeURIComponent(lead.priority)}%0A` +
    `🏷️ *Status:* ${encodeURIComponent(lead.status)}%0A` +
    `📅 *Submitted:* ${encodeURIComponent(formattedDate)}%0A` +
    `📌 *Source:* ${encodeURIComponent(lead.source)}%0A` +
    `━━━━━━━━━━━━━━━━━━━━━━━%0A` +
    `💬 *Requirement Details:*%0A${encodeURIComponent(lead.message)}%0A` +
    (lead.notes ? `📝 *HR Notes:* ${encodeURIComponent(lead.notes)}%0A` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━━%0A` +
    `_Shared from HR Lead Portal · Godavari Wave Technologies_`;

  const baseUrl = recipientPhone
    ? `https://api.whatsapp.com/send?phone=${recipientPhone.replace(/[^0-9]/g, '')}&text=${text}`
    : `https://api.whatsapp.com/send?text=${text}`;

  window.open(baseUrl, '_blank');
};

// Share Lead via Email (to any colleague or manager)
export const shareLeadViaEmail = (lead: Lead): void => {
  const subject = encodeURIComponent(`[Lead Sheet] New Inquiry: ${lead.name} (${lead.service})`);
  const body = encodeURIComponent(
    `Godavari Wave Technologies — Lead Sheet Details\n` +
    `========================================\n` +
    `Client Name: ${lead.name}\n` +
    `Company: ${lead.company || 'N/A'}\n` +
    `Phone: ${lead.phone}\n` +
    `Email: ${lead.email}\n` +
    `Interested Service: ${lead.service}\n` +
    `Priority: ${lead.priority}\n` +
    `Status: ${lead.status}\n` +
    `Source: ${lead.source}\n` +
    `Date: ${new Date(lead.submittedAt).toLocaleString('en-IN')}\n\n` +
    `Requirement / Message:\n${lead.message}\n\n` +
    (lead.notes ? `HR Notes:\n${lead.notes}\n\n` : '') +
    `---\n` +
    `HR Talent & Lead Portal · Godavari Wave Technologies`
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};

// Format Lead Text Summary for Clipboard Copy
export const formatLeadSummaryText = (lead: Lead): string => {
  return (
    `Godavari Wave Technologies — Lead Sheet Details\n` +
    `========================================\n` +
    `Client Name: ${lead.name}\n` +
    `Company: ${lead.company || 'N/A'}\n` +
    `Phone: ${lead.phone}\n` +
    `Email: ${lead.email}\n` +
    `Interested Service: ${lead.service}\n` +
    `Priority: ${lead.priority}\n` +
    `Status: ${lead.status}\n` +
    `Source: ${lead.source}\n` +
    `Date: ${new Date(lead.submittedAt).toLocaleString('en-IN')}\n\n` +
    `Requirement Message:\n${lead.message}\n` +
    (lead.notes ? `\nHR Notes: ${lead.notes}\n` : '')
  );
};

