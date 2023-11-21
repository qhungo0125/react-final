import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

// Core package (vite.config.js)
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 3000, // Change this to your desired port
  },
  build: {
    outDir: 'dist',
  },
});