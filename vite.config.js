import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure the correct base path
  build: {
    outDir: 'dist', // Ensure the build output directory matches Netlify settings
  },
});
