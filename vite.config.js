import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': 'http://localhost:5000', // Proxy backend
    },
    open: true, // Automatically open the browser
    historyApiFallback: true, // This will fallback to index.html for routes like /login /register
  }
});

