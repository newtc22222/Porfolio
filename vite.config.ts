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
        codeSplitting: {
          // Groups also pull in their dependencies, and higher priority wins.
          // `vendor` goes first so react/react-dom stay in it rather than being
          // pulled into a library group. Its regex is narrow, so it cannot
          // swallow the library-specific groups below.
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/](react|react-dom|react-scroll|framer-motion)[\\/]/,
              priority: 20,
            },
            // Split large dependencies into separate chunks
            {
              name: 'emailjs',
              test: /node_modules[\\/]@emailjs[\\/]/,
              priority: 10,
            },
            {
              name: 'particles',
              test: /node_modules[\\/]@tsparticles[\\/]/,
              priority: 10,
            },
            {
              name: 'confetti',
              test: /node_modules[\\/](react-confetti|tween-functions)[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
