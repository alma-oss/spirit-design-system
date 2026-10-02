import { join } from 'path';
import { generateIconSources, Logger } from '@alma-oss/vite-plugin-spirit-icons';
import { ROOT, STAGING_DIR } from './entrypoints';

const { info: logInfo, warn: logWarn } = console;

const logger: Logger = {
  info: logInfo,
  warn: logWarn,
  error: (msg): never => {
    throw new Error(msg);
  },
};

/**
 * Regenerates the `.icons-tmp` staging directory straight from `src/svg` — the same
 * TypeScript/TSX sources `vite build` bundles into `dist` — without running Vite, `vite-plugin-dts`,
 * or `verifyBuild`. This is only meant to feed the `development` export condition (see
 * `package.json`) so ESLint can resolve `@alma-oss/spirit-icons` subpaths without a full build.
 * Unlike the production build (`vite.config.ts`'s `spiritIconsPlugin`), the staging directory
 * is intentionally left in place afterwards instead of being cleaned up on `closeBundle`.
 */
function generate(): void {
  generateIconSources({ svgDir: join(ROOT, 'src/svg'), stagingDir: STAGING_DIR, logger });

  logInfo(`✓ Generated development sources in ${STAGING_DIR}`);
}

generate();
