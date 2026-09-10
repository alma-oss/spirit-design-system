import { cleanPathSegment } from './cleanSlug.js';

/**
 * Skip pages that are already sourced from the repo:
 * - `web-*` and `html-*` (Spirit Web / HTML tab — package README + previews)
 * - `react-*` (Spirit Web React — package README)
 * - `all-components-*` (docsite `/components` index is generated from packages)
 * - Nested `migrations/*` pages and all `releases/*` (docs/migrations guides, CHANGELOGs)
 *   The migrations Folder Landing is unique Supernova copy and is still extracted.
 */
export function isExcludedComponentSubpage(url: URL): boolean {
  const { pathname } = url;

  return /\/components\/[^/]+\/(web|react|html)-/u.test(pathname);
}

export function isExcludedCatalogPage(url: URL): boolean {
  return /\/components\/all-components-/u.test(url.pathname);
}

/** Nested migration guides and all releases already live in the repo; Supernova embeds those files. */
export function isExcludedRepoBackedPage(url: URL): boolean {
  const { pathname } = url;

  if (/\/latest\/releases(\/|$)/u.test(pathname)) {
    return true;
  }

  const segments = pathname.split('/').filter(Boolean);
  const latestIndex = segments.indexOf('latest');
  const rest = latestIndex >= 0 ? segments.slice(latestIndex + 1) : segments;

  if (rest[0] !== 'migrations' || rest.length <= 1) {
    return false;
  }

  const landingName = cleanPathSegment(rest[1] ?? '');

  return !(rest.length === 2 && landingName === 'migrations');
}

export function isSkippedExtractUrl(url: URL): boolean {
  return isExcludedComponentSubpage(url) || isExcludedCatalogPage(url) || isExcludedRepoBackedPage(url);
}
