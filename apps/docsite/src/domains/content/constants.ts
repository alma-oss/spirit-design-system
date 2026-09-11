export const DOC_SECTIONS = ['introduction', 'design', 'development', 'migrations', 'releases'] as const;

export type DocSection = (typeof DOC_SECTIONS)[number];

export const isDocSection = (value: string): value is DocSection => (DOC_SECTIONS as readonly string[]).includes(value);

export const SLUG_SEGMENT_PATTERN = /^[a-z0-9-]+$/;

export const isSafeSlug = (slug: string[]): boolean =>
  slug.length > 0 && slug.every((segment) => SLUG_SEGMENT_PATTERN.test(segment));
