import * as previewModules from '../../component-card/previews';
import { getComponentDescription } from '../constants/componentDescriptions';
import type { ComponentCatalogEntry, PreviewModule } from '../types';

const previews: Record<string, PreviewModule | undefined> = previewModules;

const fetchComponentCatalogEntry = (component: string): ComponentCatalogEntry => {
  const Preview = previews[component]?.default;

  return {
    name: component,
    description: getComponentDescription(component),
    guides: Preview?.guides,
    Preview,
  };
};

export const fetchComponentsCatalog = (components: string[]): ComponentCatalogEntry[] =>
  components.map(fetchComponentCatalogEntry);
