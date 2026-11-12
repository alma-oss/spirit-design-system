export const toParamCase = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

/**
 * Splits a Figma name ("Group/Sub group/name") into its non-empty, trimmed parts.
 *
 * @param name
 */
export const splitPath = (name: string): string[] =>
  name
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
