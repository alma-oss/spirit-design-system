import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { spiritIconsPlugin } from '@alma-oss/vite-plugin-spirit-icons';
import { getEntryPoints } from './scripts/entrypoints';

export default defineConfig({
  plugins: [
    spiritIconsPlugin(),
    react(),
    externalizeDeps(),
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
      tsconfigPath: './config/tsconfig.prod.json',
      include: ['.icons-tmp/**/*'],
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: getEntryPoints(),
    },
    rollupOptions: {
      output: {
        format: 'es',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: '.icons-tmp',
        exports: 'named',
        entryFileNames: '[name].js',
      },
    },
    sourcemap: true,
  },
});
