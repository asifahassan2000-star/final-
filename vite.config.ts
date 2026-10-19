import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true as const,
      hmr: false,
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      chunkSizeWarningLimit: 800,
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      sourcemap: false,
      reportCompressedSize: false,
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Priority 1: Lucide Icons (must precede generic react check)
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              // Priority 2: React runtime
              if (
                id.includes('/node_modules/react/') ||
                id.includes('/node_modules/react-dom/') ||
                id.includes('/node_modules/scheduler/')
              ) {
                return 'vendor-react';
              }
              // Priority 3: Framer Motion
              if (id.includes('framer-motion')) {
                return 'vendor-motion';
              }
              // Priority 4: GSAP & Lenis smooth scroll
              if (id.includes('gsap') || id.includes('lenis')) {
                return 'vendor-anim';
              }
              // Priority 5: AI SDK
              if (id.includes('@google/genai')) {
                return 'vendor-genai';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
