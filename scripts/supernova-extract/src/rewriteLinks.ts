import { cleanPathSegment } from './cleanSlug.js';

const LATEST = '/latest/';

const markdownLinkPattern = /\[([^\]]*)\]\((https?:\/\/spirit\.supernova-docs\.io)?(\/latest\/[^)\s]+)\)/gu;

function cleanedSegmentsFromLatestPath(pathname: string): string[] | null {
  if (!pathname.startsWith(LATEST)) {
    return null;
  }

  return pathname
    .slice(LATEST.length)
    .split('/')
    .filter(Boolean)
    .map((segment) => cleanPathSegment(segment));
}

/**
 * Map a Supernova `/latest/…` path to a docsite URL (no trailing slash).
 */
export function supernovaPathToDocsitePath(pathname: string): string | null {
  const cleaned = cleanedSegmentsFromLatestPath(pathname);

  if (!cleaned || cleaned.length === 0) {
    return null;
  }

  const [section, ...rest] = cleaned;

  if (section === 'components') {
    if (rest.length === 0 || rest[0] === 'all-components') {
      return '/components';
    }

    const slug = rest[0];
    const tab = rest[1];

    if (!tab || tab === 'overview') {
      return `/components/${slug}`;
    }

    if (tab === 'html' || tab === 'web') {
      return `/components/${slug}/web`;
    }

    if (tab === 'react') {
      return `/components/${slug}/react`;
    }

    return `/components/${slug}/${tab}`;
  }

  const last = cleaned.at(-1);
  const parent = cleaned.length >= 2 ? cleaned.at(-2) : undefined;
  const isLanding =
    last === 'overview' || last === 'intro' || last === 'spirit-design-system' || (parent !== undefined && last === parent);

  const parts = isLanding ? cleaned.slice(0, -1) : cleaned;

  if (parts.length === 0) {
    return '/';
  }

  return `/${parts.join('/')}`;
}

export function rewriteSupernovaLinks(markdown: string): string {
  return markdown.replace(markdownLinkPattern, (full, text: string, _origin: string | undefined, latestPath: string) => {
    const [pathOnly, hash] = latestPath.split('#');
    const docsitePath = supernovaPathToDocsitePath(pathOnly ?? latestPath);

    if (!docsitePath) {
      return full;
    }

    const href = hash ? `${docsitePath}#${hash}` : docsitePath;

    return `[${text}](${href})`;
  });
}

export function rewriteAbsoluteSupernovaUrls(markdown: string): string {
  return markdown.replace(
    /https:\/\/spirit\.supernova-docs\.io(\/latest\/[^\s)"']+)/gu,
    (full, latestPath: string) => {
      const [pathOnly, hash] = latestPath.split('#');
      const docsitePath = supernovaPathToDocsitePath(pathOnly ?? latestPath);

      if (!docsitePath) {
        return full;
      }

      return hash ? `${docsitePath}#${hash}` : docsitePath;
    },
  );
}
