import { readFileSync } from 'node:fs';
import { defineConfig } from 'tsup';

const pluginHtml = JSON.stringify(readFileSync(new URL('./plugin/ui.html', import.meta.url), 'utf8'));

export default defineConfig({
  entry: { code: 'plugin/code.ts' },
  outDir: 'plugin',
  format: ['iife'],
  platform: 'browser',
  dts: false,
  // Never clean this directory: it also holds manifest.json, ui.html, and code.ts.
  clean: false,
  sourcemap: false,
  target: 'es2020',
  outExtension: () => ({ js: '.js' }),
  define: {
    __html__: pluginHtml,
  },
});
