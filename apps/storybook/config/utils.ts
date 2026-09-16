import type { SelectEntry } from './types';

export { kebabToTitleCase as toTitleCase } from '@alma-oss/spirit-common/utilities/kebabToTitleCase';

/**
 * Convert an array of select entries to a map that Storybook controls can consume.
 *
 * @template T
 * @param entries Array of options `{ label, value }`.
 * @returns Record mapping labels to values for quick lookup.
 */
export const makeSelectMap = <T extends string | undefined>(entries: Array<SelectEntry<T>>): Record<string, T> =>
  Object.fromEntries(entries.map(({ label, value }) => [label, value])) as Record<string, T>;
