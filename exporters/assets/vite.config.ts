import { resolve } from 'node:path';

import { build, defineConfig, type UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const buildConfigs: UserConfig[] = [
  {
    plugins: [
      externalizeDeps(),
      dts({
        exclude: ['**/__tests__/**', '**/__fixtures__/**', '**/bin/**'],
        insertTypesEntry: true,
        rollupTypes: false,
      }),
    ],
    build: {
      emptyOutDir: true,
      target: 'node22',
      sourcemap: true,
      lib: {
        entry: {
          cli: resolve(import.meta.dirname, 'src/cli.ts'),
          index: resolve(import.meta.dirname, 'src/index.ts'),
        },
        fileName: (_format, name) => `${name}.js`,
        formats: ['es'],
      },
    },
  },
  {
    ssr: {
      noExternal: true,
      target: 'node',
    },
    build: {
      emptyOutDir: false,
      minify: false,
      outDir: 'dist',
      sourcemap: false,
      ssr: true,
      target: 'node22',
      rollupOptions: {
        input: resolve(import.meta.dirname, 'src/bin/spirit-assets-sync.js'),
        output: {
          entryFileNames: 'standalone.mjs',
          format: 'es',
          inlineDynamicImports: true,
        },
      },
    },
  },
];

export default defineConfig({
  ...buildConfigs[0],
  builder: {
    buildApp: async (builder) => {
      await builder.build(builder.environments.client);

      for (const config of buildConfigs.slice(1)) {
        await build({ ...config, configFile: false });
      }
    },
  },
});
