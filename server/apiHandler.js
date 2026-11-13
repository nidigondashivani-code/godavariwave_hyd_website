import { 
  getAllLeads, 
  saveLead, 
  updateLead, 
  deleteLead, 
  clearAllLeadsDb,
  bulkUpsertLeads,
  getAllApplications, 
  saveApplication, 
  deleteApplication, 
  clearAllApplicationsDb,
  getAllInterviews, 
  saveInterview, 
  deleteInterview, 
  clearAllInterviewsDb,
  checkDbHealth 
} from './db.js';

// Helper to parse JSON body from incoming Node.js request stream
async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) { // 10MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data));
}

// Master API Handler for Vite Middleware & Express
export async function handleApiRequest(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.end();
  }

  // Only handle routes starting with /api
  if (!pathname.startsWith('/api')) {
    if (next) return next();
    return sendJson(res, 404, { error: 'Not found' });
  }

  try {
    // 1. Health check
    if (pathname === '/api/health' && method === 'GET') {
      const health = await checkDbHealth();
      return sendJson(res, 200, health);
    }

    // 2. Leads endpoints
    if (pathname === '/api/leads' && method === 'GET') {
      const leads = await getAllLeads();
      return sendJson(res, 200, leads);
    }

    if (pathname === '/api/leads' && method === 'POST') {
      const body = await parseJsonBody(req);
      const saved = await saveLead(body);
      return sendJson(res, 201, saved);
    }

    if (pathname === '/api/leads' && method === 'DELETE') {
      const result = await clearAllLeadsDb();
      return sendJson(res, 200, result);
    }

    if (pathname === '/api/leads/bulk' && method === 'POST') {
      const body = await parseJsonBody(req);
      const list = Array.isArray(body) ? body : (body.leads || []);
      const saved = await bulkUpsertLeads(list);
      return sendJson(res, 200, { success: true, count: saved.length, leads: saved });
    }

    // PUT /api/leads/:id
    const leadMatch = pathname.match(/^\/api\/leads\/([^/]+)$/);
    if (leadMatch) {
      const id = decodeURIComponent(leadMatch[1]);
      if (method === 'PUT') {
        const body = await parseJsonBody(req);
        const updated = await updateLead(id, body);
        return sendJson(res, 200, updated);
      }
      if (method === 'DELETE') {
        const result = await deleteLead(id);
        return sendJson(res, 200, result);
      }
    }

    // 3. Applications endpoints
    if (pathname === '/api/applications' && method === 'GET') {
      const apps = await getAllApplications();
      return sendJson(res, 200, apps);
    }

    if (pathname === '/api/applications' && method === 'POST') {
      const body = await parseJsonBody(req);
      const saved = await saveApplication(body);
      return sendJson(res, 201, saved);
    }

    if (pathname === '/api/applications' && method === 'DELETE') {
      const result = await clearAllApplicationsDb();
      return sendJson(res, 200, result);
    }

    const appMatch = pathname.match(/^\/api\/applications\/([^/]+)$/);
    if (appMatch) {
      const id = decodeURIComponent(appMatch[1]);
      if (method === 'PUT') {
        const body = await parseJsonBody(req);
        const saved = await saveApplication({ ...body, id });
        return sendJson(res, 200, saved);
      }
      if (method === 'DELETE') {
        const result = await deleteApplication(id);
        return sendJson(res, 200, result);
      }
    }

    // 4. Interviews endpoints
    if (pathname === '/api/interviews' && method === 'GET') {
      const ints = await getAllInterviews();
      return sendJson(res, 200, ints);
    }

    if (pathname === '/api/interviews' && method === 'POST') {
      const body = await parseJsonBody(req);
      const saved = await saveInterview(body);
      return sendJson(res, 201, saved);
    }

    if (pathname === '/api/interviews' && method === 'DELETE') {
      const result = await clearAllInterviewsDb();
      return sendJson(res, 200, result);
    }

    const intMatch = pathname.match(/^\/api\/interviews\/([^/]+)$/);
    if (intMatch && method === 'DELETE') {
      const id = decodeURIComponent(intMatch[1]);
      const result = await deleteInterview(id);
      return sendJson(res, 200, result);
    }

    // If API route not recognized
    return sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found` });
  } catch (err) {
    console.error(`[API Error] ${method} ${pathname}:`, err);
    return sendJson(res, 500, { error: err.message || 'Internal Server Error' });
  }
}

