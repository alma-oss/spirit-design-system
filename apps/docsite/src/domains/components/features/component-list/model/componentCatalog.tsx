'use client';

import { COMPONENT_PREVIEWS } from '../previews';
import { COMPONENT_CATEGORIES } from './componentCategories';
import { getComponentDescription } from './componentDescriptions';
import type { ComponentCatalogEntry } from './types';

const categoryByComponent = new Map(
  Object.entries(COMPONENT_CATEGORIES).flatMap(([category, components]) =>
    components.map((component) => [component, category] as const),
  ),
);

export const getComponentCatalogEntry = (component: string): ComponentCatalogEntry => {
  const preview = COMPONENT_PREVIEWS[component];

  return {
    name: component,
    description: getComponentDescription(component),
    category: categoryByComponent.get(component) ?? 'Uncategorized',
    guides: preview?.guides,
    Preview: preview?.Preview,
  };
};
