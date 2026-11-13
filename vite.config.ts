import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore - server api handler is a Node ESM module
import { handleApiRequest } from './server/apiHandler.js';

function apiServerPlugin(): Plugin {
  return {
    name: 'supabase-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApiRequest(req, res, next);
        } else {
          next();
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApiRequest(req, res, next);
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  server: {
    port: 5173,
    open: true
  }
});
