import * as previewModules from '../../component-card/previews';
import { COMPONENT_CATEGORIES } from '../constants/componentCategories';
import { getComponentDescription } from '../constants/componentDescriptions';
import type { ComponentCatalogEntry, PreviewModule } from '../types';

const previews: Record<string, PreviewModule | undefined> = previewModules;

const categoryByComponent = new Map(
  Object.entries(COMPONENT_CATEGORIES).flatMap(([category, components]) =>
    components.map((component) => [component, category] as const),
  ),
);

const fetchComponentCatalogEntry = (component: string): ComponentCatalogEntry => {
  const Preview = previews[component]?.default;

  return {
    name: component,
    description: getComponentDescription(component),
    category: categoryByComponent.get(component) ?? 'Uncategorized',
    guides: Preview?.guides,
    Preview,
  };
};

export const fetchComponentsCatalog = (components: string[]): ComponentCatalogEntry[] =>
  components.map(fetchComponentCatalogEntry);
