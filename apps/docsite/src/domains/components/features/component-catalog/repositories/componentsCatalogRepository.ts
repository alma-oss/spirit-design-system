import { getComponentDescription } from '../constants/componentDescriptions';
import type { ComponentCatalogEntry } from '../types';
import { getComponentIllustration, readIllustrationSlugs } from './componentIllustrationsRepository';

const fetchComponentCatalogEntry = (component: string, illustrationSlugs: Set<string>): ComponentCatalogEntry => ({
  name: component,
  description: getComponentDescription(component),
  illustration: getComponentIllustration(component, illustrationSlugs),
});

export const fetchComponentsCatalog = (components: string[]): ComponentCatalogEntry[] => {
  const illustrationSlugs = readIllustrationSlugs();

  return components.map((component) => fetchComponentCatalogEntry(component, illustrationSlugs));
};
