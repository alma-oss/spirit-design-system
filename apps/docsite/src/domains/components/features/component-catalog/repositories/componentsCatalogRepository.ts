import { COMPONENT_PREVIEWS } from '../../component-card/previews';
import { COMPONENT_CATEGORIES } from '../constants/componentCategories';
import { getComponentDescription } from '../constants/componentDescriptions';
import type { ComponentCatalogEntry } from '../types';

const categoryByComponent = new Map(
  Object.entries(COMPONENT_CATEGORIES).flatMap(([category, components]) =>
    components.map((component) => [component, category] as const),
  ),
);

const fetchComponentCatalogEntry = (component: string): ComponentCatalogEntry => {
  const preview = COMPONENT_PREVIEWS[component];

  return {
    name: component,
    description: getComponentDescription(component),
    category: categoryByComponent.get(component) ?? 'Uncategorized',
    guides: preview?.guides,
    Preview: preview?.Preview,
  };
};

export const fetchComponentsCatalog = (components: string[]): ComponentCatalogEntry[] =>
  components.map(fetchComponentCatalogEntry);
