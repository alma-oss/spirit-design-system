const COMPONENT_TABS = new Set(['overview', 'design', 'accessibility', 'figma']);

export function slugToDisplayName(slug: string): string {
  return slug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

const normalizeTitle = (value: string): string =>
  value.toLowerCase().replace(/&/gu, 'and').replace(/[^a-z0-9]+/gu, '');

/**
 * Supernova tab pages reuse the folder H1 (e.g. every helper is titled "Helpers").
 * Sibling Canonical Pages should use the file slug instead.
 */
export function titleForCanonicalPage(relativePath: string, extractedTitle: string): string {
  const posix = relativePath.replace(/\\/gu, '/');
  const parts = posix.replace(/\.md$/u, '').split('/').filter(Boolean);
  const last = parts.at(-1) ?? '';
  const isIndex = last === 'index';
  const leaf = isIndex ? (parts.at(-2) ?? last) : last;
  const parent = isIndex ? parts.at(-3) : parts.at(-2);

  if (parts[0] === 'components' && COMPONENT_TABS.has(last)) {
    return extractedTitle;
  }

  if (isIndex || !parent) {
    return extractedTitle;
  }

  const fromSlug = slugToDisplayName(leaf);
  const parentTitle = slugToDisplayName(parent);

  if (extractedTitle && normalizeTitle(extractedTitle) !== normalizeTitle(parentTitle)) {
    return extractedTitle;
  }

  return fromSlug;
}
