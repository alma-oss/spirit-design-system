import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { getEntryPoints } from './scripts/entrypoints';
import { iconGeneratorPlugin } from './scripts/vitePluginGenerateIcons';

export default defineConfig({
  plugins: [
    iconGeneratorPlugin(),
    react(),
    externalizeDeps({ except: [] }),
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
      output: [
        {
          format: 'es',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: '.icons-tmp',
          exports: 'named',
          entryFileNames: '[name].js',
        },
        {
          format: 'cjs',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: '.icons-tmp',
          exports: 'named',
          entryFileNames: '[name].cjs',
        },
      ],
    },
    sourcemap: true,
  },
});
