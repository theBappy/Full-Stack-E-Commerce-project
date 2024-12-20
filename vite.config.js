import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': 'http://localhost:5000', // Proxy backend
    },
    open: true,
    historyApiFallback: true,
  },
  optimizeDeps: {
    exclude: ['morgan', 'basic-auth', 'safe-buffer'] // Exclude backend modules
  },
  build: {
    rollupOptions: {
      external: ['morgan', 'basic-auth', 'safe-buffer'] // Mark these modules as "external"
    }
  }
});


