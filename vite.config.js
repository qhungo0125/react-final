import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Change this to your desired port
  },
  plugins: [react()],
  rollupOptions: {
    external: ['react', 'react-router', 'react-router-dom'],
    output: {
      globals: {
        react: 'React',
      },
    },
  },
});
