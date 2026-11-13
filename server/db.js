import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Pool } = pg;

// Auto-load .env file into process.env if present
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
} catch (e) {
  // Ignore fallback
}

const CONNECTION_STRING = process.env.DATABASE_URL || 
  'postgresql://postgres.hcovyfufiloficbctdqs:godavari_Wavehyd@aws-0-ap-south-1.pooler.supabase.com:5432/postgres';

export const pool = new Pool({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[PostgreSQL Pool Error]:', err.message);
});

// Helper: map Lead from DB row to frontend object
function mapLeadFromRow(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email || '',
    phone: row.phone || '',
    service: row.service || 'Web & Mobile',
    message: row.message || '',
    source: row.source || 'Website Popup',
    status: row.status || 'New',
    priority: row.priority || 'High',
    company: row.company || '',
    designation: row.designation || '',
    industry: row.industry || '',
    website: row.website || '',
    address: row.address || '',
    gst: row.gst || '',
    pan: row.pan || '',
    assignedTo: row.assigned_to || 'Renusri',
    project: row.project || '',
    revenue: Number(row.revenue) || 1200000,
    country: row.country || 'India',
    state: row.state || 'Telangana',
    city: row.city || 'Hyderabad',
    meetingStatus: row.meeting_status || 'None',
    nextFollowUp: row.next_follow_up ? new Date(row.next_follow_up).toISOString() : undefined,
    lastContact: row.last_contact ? new Date(row.last_contact).toISOString() : undefined,
    notes: row.notes || '',
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
    documents: Array.isArray(row.documents) ? row.documents : [],
    invoices: Array.isArray(row.invoices) ? row.invoices : [],
    submittedAt: row.submitted_at ? new Date(row.submitted_at).toISOString() : new Date().toISOString(),
  };
}

// Helper: map Application from DB row to frontend object
function mapApplicationFromRow(row) {
  return {
    id: row.id,
    candidateId: row.candidate_id || row.id,
    name: row.name,
    email: row.email || '',
    phone: row.phone || '',
    position: row.position || '',
    positionId: row.position_id || '',
    resumeUrl: row.resume_url || '',
    resumeName: row.resume_name || '',
    appliedDate: row.applied_date ? new Date(row.applied_date).toISOString() : new Date().toISOString(),
    status: row.status || 'New',
    assignedRecruiter: row.assigned_recruiter || 'Renusri',
    experienceLevel: row.experience_level || 'Fresher',
    experienceYears: row.experience_years || '',
    currentLocation: row.current_location || '',
    qualification: row.qualification || '',
    currentCompany: row.current_company || '',
    currentCTC: row.current_ctc || '',
    expectedCTC: row.expected_ctc || '',
    noticePeriod: row.notice_period || '',
    portfolioLink: row.portfolio_link || '',
    portfolio: row.portfolio_link || '',
    linkedIn: row.linkedin || '',
    github: row.github || '',
    coverNote: row.cover_letter || '',
    coverLetter: row.cover_letter || '',
    skills: Array.isArray(row.skills) ? row.skills : [],
    rating: Number(row.rating) || 0,
    notes: row.notes || '',
    stage: row.stage || 'Screening',
    timeline: Array.isArray(row.timeline) ? row.timeline : [],
  };
}

// Helper: map Interview from DB row to frontend object
function mapInterviewFromRow(row) {
  return {
    id: row.id,
    applicationId: row.application_id || '',
    candidateName: row.candidate_name || '',
    candidateEmail: row.candidate_email || '',
    position: row.position || '',
    round: row.round || 'Technical Round',
    interviewer: row.interviewer || 'Renusri',
    dateTime: row.date_time ? new Date(row.date_time).toISOString() : new Date().toISOString(),
    durationMinutes: Number(row.duration_minutes) || 45,
    platform: row.platform || 'Google Meet',
    meetingLink: row.meeting_link || '',
    status: row.status || 'Scheduled',
    rating: row.rating ? Number(row.rating) : undefined,
    feedback: row.feedback || '',
  };
}

// ----------------- LEADS API -----------------

export async function getAllLeads() {
  const res = await pool.query(`SELECT * FROM public.leads ORDER BY submitted_at DESC`);
  return res.rows.map(mapLeadFromRow);
}

export async function saveLead(lead) {
  const id = lead.id || `lead-${Date.now()}`;
  const submittedAt = lead.submittedAt || new Date().toISOString();
  const query = `
    INSERT INTO public.leads (
      id, name, email, phone, service, message, source, status, priority,
      company, designation, industry, website, address, gst, pan,
      assigned_to, project, revenue, country, state, city,
      meeting_status, next_follow_up, last_contact, notes,
      timeline, documents, invoices, submitted_at, updated_at
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15, $16,
      $17, $18, $19, $20, $21, $22,
      $23, $24, $25, $26,
      $27, $28, $29, $30, CURRENT_TIMESTAMP
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      service = EXCLUDED.service,
      message = EXCLUDED.message,
      status = EXCLUDED.status,
      priority = EXCLUDED.priority,
      company = EXCLUDED.company,
      designation = EXCLUDED.designation,
      industry = EXCLUDED.industry,
      assigned_to = EXCLUDED.assigned_to,
      project = EXCLUDED.project,
      revenue = EXCLUDED.revenue,
      state = EXCLUDED.state,
      city = EXCLUDED.city,
      meeting_status = EXCLUDED.meeting_status,
      next_follow_up = EXCLUDED.next_follow_up,
      last_contact = EXCLUDED.last_contact,
      notes = EXCLUDED.notes,
      timeline = EXCLUDED.timeline,
      documents = EXCLUDED.documents,
      invoices = EXCLUDED.invoices,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
  `;
  const values = [
    id,
    lead.name || 'Unnamed Client',
    lead.email || '',
    lead.phone || '',
    lead.service || 'Web & Mobile',
    lead.message || '',
    lead.source || 'Website Popup',
    lead.status || 'New',
    lead.priority || 'High',
    lead.company || '',
    lead.designation || '',
    lead.industry || '',
    lead.website || '',
    lead.address || '',
    lead.gst || '',
    lead.pan || '',
    lead.assignedTo || 'Renusri',
    lead.project || '',
    lead.revenue || 1200000,
    lead.country || 'India',
    lead.state || 'Telangana',
    lead.city || 'Hyderabad',
    lead.meetingStatus || 'None',
    lead.nextFollowUp || null,
    lead.lastContact || null,
    lead.notes || '',
    JSON.stringify(lead.timeline || []),
    JSON.stringify(lead.documents || []),
    JSON.stringify(lead.invoices || []),
    submittedAt
  ];
  const res = await pool.query(query, values);
  return mapLeadFromRow(res.rows[0]);
}

export async function updateLead(id, updates) {
  // Fetch existing
  const existingRes = await pool.query('SELECT * FROM public.leads WHERE id = $1', [id]);
  if (existingRes.rows.length === 0) {
    throw new Error(`Lead ${id} not found`);
  }
  const current = mapLeadFromRow(existingRes.rows[0]);
  const merged = { ...current, ...updates, id };
  return await saveLead(merged);
}

export async function deleteLead(id) {
  await pool.query('DELETE FROM public.leads WHERE id = $1', [id]);
  return { success: true, id };
}

export async function bulkUpsertLeads(leads) {
  const results = [];
  for (const l of leads) {
    const saved = await saveLead(l);
    results.push(saved);
  }
  return results;
}

// ----------------- APPLICATIONS API -----------------

export async function getAllApplications() {
  const res = await pool.query(`SELECT * FROM public.applications ORDER BY applied_date DESC`);
  return res.rows.map(mapApplicationFromRow);
}

export async function saveApplication(app) {
  const id = app.id || `app-${Date.now()}`;
  const appliedDate = app.appliedDate || new Date().toISOString();
  const query = `
    INSERT INTO public.applications (
      id, candidate_id, name, email, phone, position, position_id,
      resume_url, resume_name, status, assigned_recruiter,
      experience_level, experience_years, current_location, qualification,
      current_company, current_ctc, expected_ctc, notice_period,
      portfolio_link, linkedin, github, cover_letter, skills,
      rating, notes, stage, timeline, applied_date
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11,
      $12, $13, $14, $15,
      $16, $17, $18, $19,
      $20, $21, $22, $23, $24,
      $25, $26, $27, $28, $29
    )
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      email = EXCLUDED.email,
      phone = EXCLUDED.phone,
      position = EXCLUDED.position,
      resume_url = EXCLUDED.resume_url,
      resume_name = EXCLUDED.resume_name,
      status = EXCLUDED.status,
      assigned_recruiter = EXCLUDED.assigned_recruiter,
      rating = EXCLUDED.rating,
      notes = EXCLUDED.notes,
      stage = EXCLUDED.stage,
      timeline = EXCLUDED.timeline
    RETURNING *;
  `;
  const values = [
    id,
    app.candidateId || id,
    app.name || 'Candidate',
    app.email || '',
    app.phone || '',
    app.position || 'Software Engineer',
    app.positionId || '',
    app.resumeUrl || '',
    app.resumeName || '',
    app.status || 'New',
    app.assignedRecruiter || 'Renusri',
    app.experienceLevel || 'Fresher',
    app.experienceYears || '',
    app.currentLocation || 'Hyderabad',
    app.qualification || '',
    app.currentCompany || '',
    app.currentCTC || '',
    app.expectedCTC || '',
    app.noticePeriod || '',
    app.portfolioLink || app.portfolio || '',
    app.linkedIn || '',
    app.github || '',
    app.coverLetter || app.coverNote || '',
    JSON.stringify(app.skills || []),
    app.rating || 0,
    app.notes || '',
    app.stage || 'Screening',
    JSON.stringify(app.timeline || []),
    appliedDate
  ];
  const res = await pool.query(query, values);
  return mapApplicationFromRow(res.rows[0]);
}

export async function deleteApplication(id) {
  await pool.query('DELETE FROM public.applications WHERE id = $1', [id]);
  return { success: true, id };
}

// ----------------- INTERVIEWS API -----------------

export async function getAllInterviews() {
  const res = await pool.query(`SELECT * FROM public.interviews ORDER BY date_time ASC`);
  return res.rows.map(mapInterviewFromRow);
}

export async function saveInterview(item) {
  const id = item.id || `int-${Date.now()}`;
  const query = `
    INSERT INTO public.interviews (
      id, application_id, candidate_name, candidate_email, position,
      round, interviewer, date_time, duration_minutes,
      platform, meeting_link, status, rating, feedback
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13, $14
    )
    ON CONFLICT (id) DO UPDATE SET
      round = EXCLUDED.round,
      interviewer = EXCLUDED.interviewer,
      date_time = EXCLUDED.date_time,
      duration_minutes = EXCLUDED.duration_minutes,
      platform = EXCLUDED.platform,
      meeting_link = EXCLUDED.meeting_link,
      status = EXCLUDED.status,
      rating = EXCLUDED.rating,
      feedback = EXCLUDED.feedback
    RETURNING *;
  `;
  const values = [
    id,
    item.applicationId || '',
    item.candidateName || '',
    item.candidateEmail || '',
    item.position || '',
    item.round || 'Technical Round',
    item.interviewer || 'Renusri',
    item.dateTime || new Date().toISOString(),
    item.durationMinutes || 45,
    item.platform || 'Google Meet',
    item.meetingLink || '',
    item.status || 'Scheduled',
    item.rating || null,
    item.feedback || ''
  ];
  const res = await pool.query(query, values);
  return mapInterviewFromRow(res.rows[0]);
}

export async function deleteInterview(id) {
  await pool.query('DELETE FROM public.interviews WHERE id = $1', [id]);
  return { success: true, id };
}

// ----------------- HEALTH CHECK -----------------
export async function checkDbHealth() {
  const start = Date.now();
  const res = await pool.query('SELECT current_database(), current_user, version()');
  const countLeads = await pool.query('SELECT COUNT(*)::int as count FROM public.leads');
  const countApps = await pool.query('SELECT COUNT(*)::int as count FROM public.applications');
  const countInts = await pool.query('SELECT COUNT(*)::int as count FROM public.interviews');
  const latency = Date.now() - start;
  return {
    status: 'connected',
    provider: 'Supabase PostgreSQL',
    database: res.rows[0].current_database,
    user: res.rows[0].current_user,
    host: 'aws-0-ap-south-1.pooler.supabase.com (db.hcovyfufiloficbctdqs.supabase.co)',
    latencyMs: latency,
    counts: {
      leads: countLeads.rows[0].count,
      applications: countApps.rows[0].count,
      interviews: countInts.rows[0].count,
    }
  };
}
