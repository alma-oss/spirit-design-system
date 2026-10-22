export const COMPONENTS_BAND_VARIANTS = {
  HEADER: 'header',
  HEADING: 'heading',
  GRID: 'grid',
  DETAIL_HEADER: 'detailHeader',
  TABS: 'tabs',
  CONTENT: 'content',
} as const;

export type ComponentsBandVariant = (typeof COMPONENTS_BAND_VARIANTS)[keyof typeof COMPONENTS_BAND_VARIANTS];
