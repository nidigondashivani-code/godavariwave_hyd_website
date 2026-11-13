import pg from 'pg';
const { Client } = pg;

const CONNECTION_STRING = process.env.DATABASE_URL || 
  'postgresql://postgres.hcovyfufiloficbctdqs:godavari_Wavehyd@aws-0-ap-south-1.pooler.supabase.com:5432/postgres';

export async function initDatabase() {
  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('[DB Init] Connected to Supabase PostgreSQL successfully!');

    // 1. Create leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.leads (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        service VARCHAR(255),
        message TEXT,
        source VARCHAR(100) DEFAULT 'Website Popup',
        status VARCHAR(50) DEFAULT 'New',
        priority VARCHAR(50) DEFAULT 'High',
        company VARCHAR(255),
        designation VARCHAR(255),
        industry VARCHAR(255),
        website VARCHAR(255),
        address TEXT,
        gst VARCHAR(100),
        pan VARCHAR(100),
        assigned_to VARCHAR(255) DEFAULT 'Renusri',
        project VARCHAR(255),
        revenue NUMERIC DEFAULT 1200000,
        country VARCHAR(100) DEFAULT 'India',
        state VARCHAR(100) DEFAULT 'Telangana',
        city VARCHAR(100) DEFAULT 'Hyderabad',
        meeting_status VARCHAR(50) DEFAULT 'None',
        next_follow_up TIMESTAMPTZ,
        last_contact TIMESTAMPTZ,
        notes TEXT,
        timeline JSONB DEFAULT '[]'::jsonb,
        documents JSONB DEFAULT '[]'::jsonb,
        invoices JSONB DEFAULT '[]'::jsonb,
        submitted_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
      CREATE INDEX IF NOT EXISTS idx_leads_submitted_at ON public.leads(submitted_at DESC);
    `);
    console.log('[DB Init] Table "leads" created/verified.');

    // 2. Create applications table (Careers & Talent pool)
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.applications (
        id VARCHAR(100) PRIMARY KEY,
        candidate_id VARCHAR(100),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(100),
        position VARCHAR(255),
        position_id VARCHAR(100),
        resume_url TEXT,
        resume_name VARCHAR(255),
        status VARCHAR(50) DEFAULT 'New',
        assigned_recruiter VARCHAR(255) DEFAULT 'Renusri',
        experience_level VARCHAR(50) DEFAULT 'Fresher',
        experience_years VARCHAR(50),
        current_location VARCHAR(255),
        qualification VARCHAR(255),
        current_company VARCHAR(255),
        current_ctc VARCHAR(100),
        expected_ctc VARCHAR(100),
        notice_period VARCHAR(100),
        portfolio_link TEXT,
        linkedin TEXT,
        github TEXT,
        cover_letter TEXT,
        skills JSONB DEFAULT '[]'::jsonb,
        rating INT DEFAULT 0,
        notes TEXT,
        stage VARCHAR(100) DEFAULT 'Screening',
        timeline JSONB DEFAULT '[]'::jsonb,
        applied_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
      CREATE INDEX IF NOT EXISTS idx_applications_applied_date ON public.applications(applied_date DESC);
    `);
    console.log('[DB Init] Table "applications" created/verified.');

    // 3. Create interviews table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.interviews (
        id VARCHAR(100) PRIMARY KEY,
        application_id VARCHAR(100),
        candidate_name VARCHAR(255),
        candidate_email VARCHAR(255),
        position VARCHAR(255),
        round VARCHAR(100) DEFAULT 'Technical Round',
        interviewer VARCHAR(255) DEFAULT 'Renusri',
        date_time TIMESTAMPTZ,
        duration_minutes INT DEFAULT 45,
        platform VARCHAR(100) DEFAULT 'Google Meet',
        meeting_link TEXT,
        status VARCHAR(50) DEFAULT 'Scheduled',
        rating INT,
        feedback TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_interviews_date_time ON public.interviews(date_time DESC);
    `);
    console.log('[DB Init] Table "interviews" created/verified.');

    // 4. Verify tables in database
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);
    console.log('[DB Init] Public tables now in database:', tables.rows.map(r => r.table_name));

    await client.end();
    return true;
  } catch (err) {
    console.error('[DB Init Error]:', err);
    try { await client.end(); } catch (_) {}
    throw err;
  }
}

// Run directly if invoked via node
if (process.argv[1] && process.argv[1].endsWith('init-db.js')) {
  initDatabase().catch(() => process.exit(1));
}

