import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import preserveDirectives from 'rollup-preserve-directives';
import { getEntryPoints } from './scripts/generateExports';

export default defineConfig({
  plugins: [
    react(),
    preserveDirectives(),
    externalizeDeps({
      except: [], // Externalize all dependencies from package.json
    }),
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
      tsconfigPath: './tsconfig.json',
      include: ['src/**/*'],
      exclude: ['**/__tests__', '**/*.test.*', '**/*.stories.*', '**/stories/**', '**/demo/', '**/figma/'],
      compilerOptions: {
        preserveConstEnums: true,
      },
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
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: (chunkInfo) => {
            const filePath = chunkInfo.facadeModuleId?.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)?.[1];

            return filePath ? `${filePath}/index.js` : '[name].js';
          },
        },
        {
          format: 'cjs',
          dir: 'dist',
          preserveModules: true,
          preserveModulesRoot: 'src',
          exports: 'named',
          entryFileNames: (chunkInfo) => {
            const filePath = chunkInfo.facadeModuleId?.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)?.[1];

            return filePath ? `${filePath}/index.cjs` : '[name].cjs';
          },
        },
      ],
    },
    sourcemap: true,
  },
});
