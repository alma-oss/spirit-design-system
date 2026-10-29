import { COMPONENT_CATEGORIES } from '../constants/componentCategories';
import { getComponentDescription } from '../constants/componentDescriptions';
import { getComponentIllustration } from '../constants/componentIllustrations';
import type { ComponentCatalogEntry } from '../types';

const categoryByComponent = new Map(
  Object.entries(COMPONENT_CATEGORIES).flatMap(([category, components]) =>
    components.map((component) => [component, category] as const),
  ),
);

const fetchComponentCatalogEntry = (component: string): ComponentCatalogEntry => ({
  name: component,
  description: getComponentDescription(component),
  category: categoryByComponent.get(component) ?? 'Uncategorized',
  illustration: getComponentIllustration(component),
});

export const fetchComponentsCatalog = (components: string[]): ComponentCatalogEntry[] =>
  components.map(fetchComponentCatalogEntry);
