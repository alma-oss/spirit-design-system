import fs from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';
import { Plugin, ResolvedConfig } from 'vite';
import { buildConstants } from './steps/buildConstants';
import { buildSvg } from './steps/buildSvg';
import { generateReactIndex } from './steps/generateReactIndex';
import { generateRoot } from './steps/generateRoot';
import { prepareSvgReact } from './steps/prepareSvgReact';
import { Logger } from './steps/shared';

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
    apply: 'build',
    configResolved(config: ResolvedConfig) {
      root = config.root;
    },
    buildStart() {
      const SVG_SRC = join(root, options?.svgDir ?? 'src/svg');
      const TMP = join(root, options?.stagingDir ?? '.icons-tmp');
      const TMP_SVG = join(TMP, 'svg');
      const TMP_REACT_SVG = join(TMP, '.react-svg');
      const TMP_REACT = join(TMP, 'react');

      if (!fs.existsSync(TMP)) {
        fs.mkdirSync(TMP, { recursive: true });
      }

      const logger: Logger = {
        info: (msg) => this.info(msg),
        warn: (msg) => this.warn(msg),
        error: (msg) => this.error(msg),
      };

      const svgOk = buildSvg(SVG_SRC, TMP_SVG, logger);
      if (!svgOk) this.error(`No SVG files found in ${SVG_SRC}`);

      // Emit normalized SVG files (including sprite.svg) into the output bundle
      const distSvgSubDir = options?.distSvgDir ?? 'svg';
      for (const file of fs.readdirSync(TMP_SVG).filter((f) => f.endsWith('.svg'))) {
        this.emitFile({
          type: 'asset',
          fileName: `${distSvgSubDir}/${file}`,
          source: fs.readFileSync(join(TMP_SVG, file)),
        });
      }

      prepareSvgReact(TMP_SVG, TMP_REACT_SVG);

      // svg2react-icon is a CLI tool from devDependencies
      try {
        execFileSync('svg2react-icon', ['--typescript', '--no-sub-dir', TMP_REACT_SVG, TMP_REACT], {
          stdio: 'inherit',
        });
      } catch (error) {
        this.error(`svg2react-icon command failed: ${error instanceof Error ? error.message : String(error)}`);
      }

      generateReactIndex(TMP_REACT);

      const constantsOk = buildConstants(TMP_SVG, join(TMP, 'icons.ts'), logger);
      if (!constantsOk) this.error(`buildConstants failed — check SVG source dir ${TMP_SVG}`);

      generateRoot(TMP);
    },
    closeBundle() {
      const TMP = join(root, options?.stagingDir ?? '.icons-tmp');
      if (fs.existsSync(TMP)) {
        fs.rmSync(TMP, { recursive: true, force: true });
      }
    },
  };
}
