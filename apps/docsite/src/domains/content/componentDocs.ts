import { componentDocTabs } from '../routing/routes';
import { resolveComponentTabFile, type ComponentTab } from './componentDocPaths';
import { fileExists } from './contentRepository';
import { getRepoRoot } from './paths';

export { resolveComponentTabFile };

export interface ComponentTabAvailability {
  overview: boolean;
  design: boolean;
  accessibility: boolean;
  figma: boolean;
}

export type { ComponentTab };

export const getComponentTabAvailability = async (
  slug: string,
  repoRoot = getRepoRoot(),
): Promise<ComponentTabAvailability> => {
  const availability = await Promise.all(
    componentDocTabs.map(async (tab) => {
      const filePath = resolveComponentTabFile(slug, tab, repoRoot);

      return filePath ? fileExists(filePath) : false;
    }),
  );

  const [overview = false, design = false, accessibility = false, figma = false] = availability;

  return { overview, design, accessibility, figma };
};
