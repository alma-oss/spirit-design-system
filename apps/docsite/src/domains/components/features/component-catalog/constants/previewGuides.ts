export const PREVIEW_GUIDES = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
} as const;

export type PreviewGuides = (typeof PREVIEW_GUIDES)[keyof typeof PREVIEW_GUIDES];
