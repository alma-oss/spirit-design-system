import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import type { OutputChunk, OutputOptions } from 'rollup';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';
import { getEntryPoints } from './scripts/entrypoints';

const isUmdBuild = process.env.BUILD_MODE === 'umd';

const basePlugins = [
  react(),
  preserveDirectives(),
  externalizeDeps({
    except: [], // Externalize all dependencies from package.json
  }),
];

const dtsPlugin = dts({
  insertTypesEntry: true,
  rollupTypes: false,
  tsconfigPath: './config/tsconfig.prod.json',
  include: ['src/**/*'],
  exclude: ['**/__tests__/**', '**/stories/**', '**/demo/', '**/figma/'],
  compilerOptions: {
    preserveConstEnums: true,
  },
});

const umdBuildConfig = {
  outDir: 'dist/bundles',
  lib: {
    entry: './src/index.ts',
    name: 'webReact',
    formats: ['umd'] as const,
  },
  rollupOptions: {
    external: ['react', 'react-dom'],
    output: [
      // Unminified UMD bundle
      {
        format: 'umd' as const,
        entryFileNames: 'web-react.umd.js',
        name: 'webReact',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
      // Minified UMD bundle with terser plugin
      {
        format: 'umd' as const,
        entryFileNames: 'web-react.umd.min.js',
        name: 'webReact',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        plugins: [terser()],
      },
    ] as const,
  },
  sourcemap: true,
  minify: false,
};

const defaultBuildConfig = {
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
        entryFileNames: (chunkInfo: OutputChunk) => {
          // Extract entry point path from module ID.
          // Note: Root entry (src/index.ts) won't match the pattern and falls back to [name].js
          const filePath = chunkInfo.facadeModuleId?.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)?.[1];

          return filePath ? `${filePath}/index.js` : '[name].js';
        },
      } as OutputOptions,
      {
        format: 'cjs',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        entryFileNames: (chunkInfo: OutputChunk) => {
          // Extract entry point path from module ID.
          // Note: Root entry (src/index.ts) won't match the pattern and falls back to [name].cjs
          const filePath = chunkInfo.facadeModuleId?.replace(/\\/g, '/').match(/src\/(.+)\/index\.ts$/)?.[1];

          return filePath ? `${filePath}/index.cjs` : '[name].cjs';
        },
      } as OutputOptions,
    ],
  },
  sourcemap: true,
};

export default defineConfig({
  plugins: isUmdBuild ? basePlugins : [...basePlugins, dtsPlugin],
  build: isUmdBuild ? umdBuildConfig : defaultBuildConfig,
});
