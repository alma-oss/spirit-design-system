import fs from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';
import { buildConstants } from './steps/buildConstants';
import { buildSvg } from './steps/buildSvg';
import { generateReactIndex } from './steps/generateReactIndex';
import { generateRoot } from './steps/generateRoot';
import { prepareSvgReact } from './steps/prepareSvgReact';
import { Logger } from './steps/shared';

export interface GenerateIconSourcesOptions {
  /** Source SVG directory (absolute path). */
  svgDir: string;
  /** Staging directory for the generated TypeScript/TSX sources (absolute path). */
  stagingDir: string;
  logger: Logger;
}

export interface GenerateIconSourcesResult {
  /** Directory containing the normalized SVG files (including `sprite.svg`). */
  svgStagingDir: string;
}

/**
 * Runs the full icon codegen pipeline (SVG normalization → React components → constants → root
 * barrel export), turning `svgDir` into the TypeScript/TSX sources under `stagingDir`. This is the
 * single source of truth for the step order/logic: both `spiritIconsPlugin`'s `buildStart` hook
 * and standalone, build-free codegen scripts (e.g. feeding ESLint's `development` export
 * condition) call this directly, instead of duplicating the orchestration.
 */
export function generateIconSources({ svgDir, stagingDir, logger }: GenerateIconSourcesOptions): GenerateIconSourcesResult {
  const svgStagingDir = join(stagingDir, 'svg');
  const reactSvgStagingDir = join(stagingDir, '.react-svg');
  const reactStagingDir = join(stagingDir, 'react');

  // Clear any previously generated sources first, so icons that were deleted or renamed since
  // the last run don't linger in the staging directory (and keep being exported/lint-resolved).
  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });

  const svgOk = buildSvg(svgDir, svgStagingDir, logger);
  if (!svgOk) logger.error(`No SVG files found in ${svgDir}`);

  prepareSvgReact(svgStagingDir, reactSvgStagingDir);

  // svg2react-icon is a CLI tool from devDependencies
  try {
    execFileSync('svg2react-icon', ['--typescript', '--no-sub-dir', reactSvgStagingDir, reactStagingDir], {
      stdio: 'inherit',
    });
  } catch (error) {
    logger.error(`svg2react-icon command failed: ${error instanceof Error ? error.message : String(error)}`);
  }

  generateReactIndex(reactStagingDir);

  const constantsOk = buildConstants(svgStagingDir, join(stagingDir, 'icons.ts'), logger);
  if (!constantsOk) logger.error(`buildConstants failed — check SVG source dir ${svgStagingDir}`);

  generateRoot(stagingDir);

  return { svgStagingDir };
}
