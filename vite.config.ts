import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    chunkSizeWarningLimit: 1000, // Increase size limit to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-scroll', 'framer-motion'],
          // Split large dependencies into separate chunks
          emailjs: ['@emailjs/browser'],
          particles: ['@tsparticles/react'],
        },
      },
    },
  },
});
