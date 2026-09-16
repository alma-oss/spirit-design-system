/**
 * Convert a kebab-case string to title case.
 *
 * @example
 * kebabToTitleCase('theme-light-default'); // "Theme Light Default"
 *
 * @param value Kebab-case string.
 * @returns {string} Title-cased representation of the string.
 */
export const kebabToTitleCase = (value: string): string =>
  value
    .split('-')
    .map((segment) => `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`)
    .join(' ');
