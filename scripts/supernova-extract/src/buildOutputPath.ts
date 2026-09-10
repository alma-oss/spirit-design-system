import path from 'node:path';

import { cleanPathSegment } from './cleanSlug.js';

const LATEST = '/latest/';

/**
 * Map cleaned path segments (after `/latest/`, ids stripped) to a Canonical Page path
 * under `apps/docsite/content/`.
 */
export function mapToCanonicalRelativePath(cleaned: string[]): string {
  if (cleaned.length === 0) {
    return 'index.md';
  }

  const [section, ...rest] = cleaned;

  if (section === 'components') {
    if (rest.length === 0) {
      return 'components.md';
    }

    return path.join('components', ...rest.slice(0, -1), `${rest.at(-1)}.md`);
  }

  const last = cleaned.at(-1);
  const parent = cleaned.length >= 2 ? cleaned.at(-2) : undefined;
  const isLanding =
    last === 'overview' || last === 'intro' || last === 'spirit-design-system' || (parent !== undefined && last === parent);

  if (isLanding) {
    const dirs = cleaned.slice(0, -1);

    if (dirs.length === 0) {
      return 'index.md';
    }

    return path.join(...dirs, 'index.md');
  }

  return `${path.join(...cleaned)}.md`;
}

/**
 * Map a Supernova page URL to a relative `.md` path under the content root
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

  const [first] = cleaned;

  return {
    relativePath: mapToCanonicalRelativePath(cleaned),
    sourceSection: first ?? 'root',
  };
}
