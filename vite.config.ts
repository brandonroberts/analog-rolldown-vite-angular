/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'dist/client',
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog(),
    mode === 'test' && {
      name: 'vitest-rolldown',
      load(source) {
        // workaround for Vitest
        if (source === '/@vite/env') {
          return '';
        }

        return undefined;
      }
    }    
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
  experimental: {
    enableNativePlugin: true
  }
}));
