import type { ComponentType } from 'react';

export type PreviewGuides = 'vertical' | 'horizontal';

export interface ComponentPreviewRegistration {
  Preview: ComponentType;
  guides?: PreviewGuides;
}

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  category: string;
  guides?: PreviewGuides;
  Preview?: ComponentType;
}
