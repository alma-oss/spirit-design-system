import { execFileSync } from 'child_process';
import { Plugin } from 'vite';
import { join, resolve } from 'path';
import { buildSvg } from './buildSvg';
import { buildConstants } from './buildConstants';
import { prepareSvgReact } from './prepareSvgReact';
import { generateReactIndex } from './generateReactIndex';
import { generateRoot } from './generateRoot';

export function iconGeneratorPlugin(): Plugin {
  const ROOT = resolve(__dirname, '..');
  const SVG_SRC = join(ROOT, 'src/svg');
  const TMP = join(ROOT, '.icons-tmp');
  const TMP_SVG = join(TMP, 'svg');
  const TMP_REACT_SVG = join(TMP, '.react-svg');
  const TMP_REACT = join(TMP, 'react');

  return {
    name: 'icon-generator',
    async buildStart() {
      // Ensure .icons-tmp structure exists
      const fs = await import('fs');
      if (!fs.existsSync(TMP)) {
        fs.mkdirSync(TMP, { recursive: true });
      }

      buildSvg(SVG_SRC, TMP_SVG);
      prepareSvgReact(TMP_SVG, TMP_REACT_SVG);

      // svg2react-icon is a CLI tool from devDependencies
      try {
        execFileSync('svg2react-icon', ['--typescript', '--no-sub-dir', TMP_REACT_SVG, TMP_REACT], {
          stdio: 'inherit',
        });
      } catch (error) {
        console.error('svg2react-icon command failed:', error);
        throw error;
      }

      generateReactIndex(TMP_REACT);
      buildConstants(TMP_SVG, join(TMP, 'icons.ts'));
      generateRoot(TMP);
    },
    async writeBundle() {
      // Copy SVG files to dist/svg after Vite writes the bundle
      const fs = await import('fs');
      const distDir = join(ROOT, 'dist');
      const distSvgDir = join(distDir, 'svg');

      if (!fs.existsSync(distSvgDir)) {
        fs.mkdirSync(distSvgDir, { recursive: true });
      }

      // Copy SVG files from .icons-tmp/svg to dist/svg
      if (fs.existsSync(TMP_SVG)) {
        const svgFiles = fs.readdirSync(TMP_SVG);
        svgFiles.forEach((file) => {
          if (file.endsWith('.svg')) {
            const src = join(TMP_SVG, file);
            const dest = join(distSvgDir, file);
            fs.copyFileSync(src, dest);
          }
        });
      }
    },
    async closeBundle() {
      const fs = await import('fs');
      if (fs.existsSync(TMP)) {
        fs.rmSync(TMP, { recursive: true, force: true });
      }
    },
  };
}
