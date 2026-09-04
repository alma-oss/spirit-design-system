import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  plugins: [
    externalizeDeps(),
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
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
});
