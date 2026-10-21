export const SORT_OPTIONS = {
  ALPHABETICAL: 'alphabetical',
  CATEGORICAL: 'categorical',
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];
