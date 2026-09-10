import { resolve } from 'node:path';

import { defineConfig } from 'vite';

export default defineConfig({
  ssr: {
    noExternal: true,
    target: 'node',
  },
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: 'dist-ci',
    sourcemap: false,
    ssr: true,
    target: 'node22',
    rollupOptions: {
      input: resolve(import.meta.dirname, 'src/bin/spirit-assets-sync.js'),
      output: {
        entryFileNames: 'spirit-assets.mjs',
        format: 'es',
        inlineDynamicImports: true,
      },
    },
  },
});
