import type { ComponentType, FC } from 'react';
import type { PreviewGuides } from './constants/previewGuides';

export type { PreviewGuides };

export type PreviewComponent = FC & { guides?: PreviewGuides };

export interface PreviewModule {
  default: PreviewComponent;
}

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  category: string;
  guides?: PreviewGuides;
  Preview?: ComponentType;
}
