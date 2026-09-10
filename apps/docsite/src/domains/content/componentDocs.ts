import path from 'node:path';
import { isValidComponentSlug, slugToComponentName } from '../components/utils/componentSlug';
import { componentDocsDirectory, componentDocTabs, type ComponentDocTab } from '../routing/routes';
import { fileExists } from './contentRepository';
import { getRepoRoot } from './paths';

export interface ComponentTabAvailability {
  overview: boolean;
  design: boolean;
  accessibility: boolean;
  figma: boolean;
}

export type ComponentTab = ComponentDocTab;

const isComponentDocTab = (tab: string): tab is ComponentTab => (componentDocTabs as readonly string[]).includes(tab);

export const resolveComponentTabFile = (slug: string, tab: ComponentTab, repoRoot = getRepoRoot()): string | null => {
  if (!isValidComponentSlug(slug) || !isComponentDocTab(tab)) {
    return null;
  }

  return path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug), 'docs', `${tab}.md`);
};

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
