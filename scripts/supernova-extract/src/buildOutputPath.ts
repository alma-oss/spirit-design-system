import path from 'node:path';

import { cleanPathSegment } from './cleanSlug.js';

const LATEST = '/latest/';
const UNSTABLE_SLUG_PREFIX = 'unstable-';

const kebabToPascal = (value: string): string =>
  value
    .split('-')
    .map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
    .join('');

export const componentSlugToDirectoryName = (slug: string): string =>
  slug.startsWith(UNSTABLE_SLUG_PREFIX)
    ? `UNSTABLE_${kebabToPascal(slug.slice(UNSTABLE_SLUG_PREFIX.length))}`
    : kebabToPascal(slug);

/**
 * Map cleaned path segments (after `/latest/`, ids stripped) to a repo-relative
 * Canonical Page path.
 */
export function mapToCanonicalRelativePath(cleaned: string[]): string {
  if (cleaned.length === 0) {
    return 'docs/index.md';
  }

  const [section, ...rest] = cleaned;

  if (section === 'components') {
    const [componentSlug, tab] = rest;

    if (!componentSlug || !tab) {
      throw new Error(`Expected component and tab segments: ${cleaned.join('/')}`);
    }

    return path.posix.join(
      'packages/web-react/src/components',
      componentSlugToDirectoryName(componentSlug),
      'docs',
      `${tab}.md`,
    );
  }

  const last = cleaned.at(-1);
  const parent = cleaned.length >= 2 ? cleaned.at(-2) : undefined;
  const isLanding =
    last === 'overview' || last === 'intro' || last === 'spirit-design-system' || (parent !== undefined && last === parent);

  if (isLanding) {
    const dirs = cleaned.slice(0, -1);

    if (dirs.length === 0) {
      return 'docs/index.md';
    }

    return path.posix.join('docs', ...dirs, 'index.md');
  }

  return `${path.posix.join('docs', ...cleaned)}.md`;
}

/**
 * Map a Supernova page URL to a repo-relative `.md` path
 * (e.g. `docs/introduction/what-is-spirit.md`).
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
