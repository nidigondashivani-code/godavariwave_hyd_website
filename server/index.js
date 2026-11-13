import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './apiHandler.js';
import { checkDbHealth } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = process.env.PORT || 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer(async (req, res) => {
  // 1. API routes
  if (req.url && req.url.startsWith('/api')) {
    return handleApiRequest(req, res, () => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Endpoint not found' }));
    });
  }

  // 2. Static files
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let filePath = path.join(DIST_DIR, decodeURIComponent(parsedUrl.pathname));

  try {
    const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    if (stat && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // SPA fallback: serve index.html for client-side routing
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=UTF-8');
      fs.createReadStream(indexPath).pipe(res);
      return;
    }

    res.statusCode = 404;
    res.end('Not found. Please build the frontend first via "npm run build".');
  } catch (err) {
    res.statusCode = 500;
    res.end('Server error: ' + err.message);
  }
});

server.listen(PORT, async () => {
  console.log(`[Godavari Wave Server] Production server running on http://localhost:${PORT}`);
  try {
    const health = await checkDbHealth();
    console.log(`[Database Connected] Provider: ${health.provider} | Database: ${health.database} | Latency: ${health.latencyMs}ms`);
  } catch (err) {
    console.error(`[Database Warning] ${err.message}`);
  }
});

