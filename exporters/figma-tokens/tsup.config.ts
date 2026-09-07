import { readFileSync } from 'node:fs';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts', 'src/bin/figma-tokens.js'],
  format: ['esm'],
  dts: true,
  clean: true,
});
