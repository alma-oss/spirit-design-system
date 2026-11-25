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
