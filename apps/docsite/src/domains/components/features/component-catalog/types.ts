import type { ComponentType, FC } from 'react';
import type { PreviewGuides } from './constants/previewGuides';

export type { PreviewGuides };

export type PreviewComponent = FC & { guides?: PreviewGuides };

export interface PreviewModule {
  default: PreviewComponent;
}

export interface ComponentCategoryDefinition {
  description: string;
  components: string[];
}

export type ComponentCategories = Record<string, ComponentCategoryDefinition>;

export interface ComponentCatalogEntry {
  name: string;
  description: string;
  guides?: PreviewGuides;
  Preview?: ComponentType;
}
