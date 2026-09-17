export const slugToDisplayName = (slug: string): string =>
  slug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

const normalizeTitle = (value: string): string =>
  value
    .toLowerCase()
    .replace(/&/gu, 'and')
    .replace(/[^a-z0-9]+/gu, '');

/**
 * Sibling pages under a folder often inherit the folder H1 in frontmatter
 * (every helper was titled "Helpers"). Nav and covers should use the file slug.
 *
 * @param fileSlug
 * @param parentSlug
 * @param frontmatterTitle
 */
export const titleForSiblingPage = (fileSlug: string, parentSlug: string, frontmatterTitle: string): string => {
  const fromSlug = slugToDisplayName(fileSlug);
  const parentTitle = slugToDisplayName(parentSlug);

  if (frontmatterTitle && normalizeTitle(frontmatterTitle) !== normalizeTitle(parentTitle)) {
    return frontmatterTitle;
  }

  return fromSlug;
};
