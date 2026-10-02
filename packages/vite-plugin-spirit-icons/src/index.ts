import fs from 'fs';
import { join } from 'path';
import { Plugin, ResolvedConfig } from 'vite';
import { generateIconSources } from './generateIconSources';
import { Logger } from './steps/shared';

export { generateIconSources };
export type { GenerateIconSourcesOptions, GenerateIconSourcesResult } from './generateIconSources';
export type { Logger };

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

      const logger: Logger = {
        info: (msg) => this.info(msg),
        warn: (msg) => this.warn(msg),
        error: (msg) => this.error(msg),
      };

      const { svgStagingDir } = generateIconSources({ svgDir: SVG_SRC, stagingDir: TMP, logger });

      // Emit normalized SVG files (including sprite.svg) into the output bundle
      const distSvgSubDir = options?.distSvgDir ?? 'svg';
      for (const file of fs.readdirSync(svgStagingDir).filter((f) => f.endsWith('.svg'))) {
        this.emitFile({
          type: 'asset',
          fileName: `${distSvgSubDir}/${file}`,
          source: fs.readFileSync(join(svgStagingDir, file)),
        });
      }
    },
    closeBundle() {
      const TMP = join(root, options?.stagingDir ?? '.icons-tmp');
      if (fs.existsSync(TMP)) {
        fs.rmSync(TMP, { recursive: true, force: true });
      }
    },
  };
}
