import { execFileSync } from 'child_process';
import { join } from 'path';
import { Plugin, ResolvedConfig } from 'vite';
import { buildConstants } from './steps/buildConstants';
import { buildSvg } from './steps/buildSvg';
import { generateReactIndex } from './steps/generateReactIndex';
import { generateRoot } from './steps/generateRoot';
import { prepareSvgReact } from './steps/prepareSvgReact';

export interface SpiritIconsPluginOptions {
  /** Source SVG directory, relative to Vite root. Default: 'src/svg' */
  svgDir?: string;
  /** Staging directory for generated TS files. Default: '.icons-tmp' */
  stagingDir?: string;
  /** SVG output subdirectory within dist. Default: 'svg' */
  distSvgDir?: string;
}

export function spiritIconsPlugin(options?: SpiritIconsPluginOptions): Plugin {
  let root: string;
  return {
    name: 'vite-plugin-spirit-icons',
    configResolved(config: ResolvedConfig) {
      root = config.root;
    },
    async buildStart() {
      const SVG_SRC = join(root, options?.svgDir ?? 'src/svg');
      const TMP = join(root, options?.stagingDir ?? '.icons-tmp');
      const TMP_SVG = join(TMP, 'svg');
      const TMP_REACT_SVG = join(TMP, '.react-svg');
      const TMP_REACT = join(TMP, 'react');

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
      // Copy SVG files to dist after Vite writes the bundle
      const fs = await import('fs');
      const TMP_SVG = join(root, options?.stagingDir ?? '.icons-tmp', 'svg');
      const distSvgDir = join(root, 'dist', options?.distSvgDir ?? 'svg');

      if (!fs.existsSync(distSvgDir)) {
        fs.mkdirSync(distSvgDir, { recursive: true });
      }

      // Copy SVG files from staging to dist
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
      const TMP = join(root, options?.stagingDir ?? '.icons-tmp');
      const fs = await import('fs');
      if (fs.existsSync(TMP)) {
        fs.rmSync(TMP, { recursive: true, force: true });
      }
    },
  };
}
