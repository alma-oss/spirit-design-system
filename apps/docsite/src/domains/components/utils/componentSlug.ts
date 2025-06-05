const UNSTABLE_PREFIX = 'UNSTABLE_';
const UNSTABLE_SLUG_PREFIX = 'unstable-';

const pascalToKebab = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();

const kebabToPascal = (value: string): string =>
  value
    .split('-')
    .map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
    .join('');

const COMPONENT_SLUG_PATTERN = /^[a-z0-9-]+$/;

/**
 * Returns true when the slug contains only lowercase letters, digits, and hyphens.
 * Call this before using the slug in dynamic import specifiers to prevent path traversal.
 *
 * @param slug
 */
export const isValidComponentSlug = (slug: string): boolean => COMPONENT_SLUG_PATTERN.test(slug);

/**
 * PascalCase directory name → kebab-case URL slug
 *
 * @param name - Component directory name (e.g. "FileUploader", "UNSTABLE_FileUpload")
 */
export const componentNameToSlug = (name: string): string =>
  name.startsWith(UNSTABLE_PREFIX)
    ? `${UNSTABLE_SLUG_PREFIX}${pascalToKebab(name.slice(UNSTABLE_PREFIX.length))}`
    : pascalToKebab(name);

/**
 * kebab-case URL slug → PascalCase directory name
 *
 * @param slug - URL slug (e.g. "file-uploader", "unstable-file-upload")
 */
export const slugToComponentName = (slug: string): string =>
  slug.startsWith(UNSTABLE_SLUG_PREFIX)
    ? `${UNSTABLE_PREFIX}${kebabToPascal(slug.slice(UNSTABLE_SLUG_PREFIX.length))}`
    : kebabToPascal(slug);
