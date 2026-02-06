import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-markdown',
      'remark-gfm'
    ],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Ensure these packages are treated as part of the bundle
      external: [],
    },
  },
  // Ensure ESM-only modules are handled correctly during the bundling phase
  ssr: {
    noExternal: ['react-markdown', 'remark-gfm'],
  },
});