import path from 'node:path';

import { cleanPathSegment } from './cleanSlug.js';

const LATEST = '/latest/';

/**
 * Map a Supernova page URL to a relative `.md` path under the output root
 * (e.g. `introduction/what-is-spirit.md`).
 */
export function urlToRelativeMarkdownPath(url: URL): { relativePath: string; sourceSection: string } {
  const { pathname, hostname } = url;

  if (!pathname.startsWith(LATEST)) {
    throw new Error(`Expected /latest/ prefix in path: ${hostname}${pathname}`);
  }

  const afterLatest = pathname.slice(LATEST.length);
  const segments = afterLatest.split('/').filter(Boolean);
  const cleaned = segments.map((s) => cleanPathSegment(s));

  if (cleaned.length === 0) {
    return { relativePath: 'index.md', sourceSection: 'root' };
  }

  const [first, ...rest] = cleaned;
  const last = rest.length > 0 ? rest[rest.length - 1] : first;
  const dirs = rest.length > 0 ? [first, ...rest.slice(0, -1)] : [];

  return {
    relativePath: path.join(...dirs, `${last}.md`),
    sourceSection: first ?? 'root',
  };
}
