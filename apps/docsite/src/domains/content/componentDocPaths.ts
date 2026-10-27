import path from 'node:path';
import { isValidComponentSlug, slugToComponentName } from '../components/utils/componentSlug';
import { componentDocsDirectory, componentDocTabs, type ComponentDocTab } from '../routing/routes';
import { getRepoRoot } from './paths';

// Relative imports and no content repository, so `next.config.ts` can load this file through the repository.
export type ComponentTab = ComponentDocTab;

export const isComponentDocTab = (tab: string): tab is ComponentTab =>
  (componentDocTabs as readonly string[]).includes(tab);

export const resolveComponentTabFile = (slug: string, tab: ComponentTab, repoRoot = getRepoRoot()): string | null => {
  if (!isValidComponentSlug(slug) || !isComponentDocTab(tab)) {
    return null;
  }

  return path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug), 'docs', `${tab}.md`);
};
