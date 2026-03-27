import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_CSS_SOURCE_ID, cssSourceEntries } from './cssSourceEntries';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = resolve(__dirname, '../..');
const nodeModules = join(root, 'node_modules');
const cyborgTokens = join(nodeModules, '@almacareer/cyborg-design-tokens');

/** Add a new token set in cssSourceEntries.ts; load paths are derived here. */
export const cssSources = cssSourceEntries.map(({ id, scssSubpath }) => ({
  id,
  loadPaths:
    id === DEFAULT_CSS_SOURCE_ID
      ? [nodeModules, join(nodeModules, '@alma-oss/spirit-design-tokens/src/scss')]
      : [nodeModules, join(cyborgTokens, scssSubpath)],
}));
