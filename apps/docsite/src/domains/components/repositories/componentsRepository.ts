import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
// Relative imports so next.config.ts can load this file. Its loader does not resolve `@local`.
import { isComponentDocTab, resolveComponentTabFile } from '../../content/componentDocPaths';
import { getRepoRoot } from '../../content/paths';
import { componentDocsDirectory, componentSectionBySegment, type ComponentDocTab } from '../../routing/routes';
import { componentNameToSlug, isValidComponentSlug, slugToComponentName } from '../utils/componentSlug';

export interface ComponentViewsAvailability {
  web: boolean;
  react: boolean;
  webPreview: boolean;
  reactPreview: boolean;
}

export type ComponentView = keyof ComponentViewsAvailability;

export type ComponentSection = ComponentDocTab | ComponentView;

const viewSections: readonly ComponentView[] = ['web', 'react', 'webPreview', 'reactPreview'];

const isViewSection = (section: ComponentSection): section is ComponentView =>
  (viewSections as readonly string[]).includes(section);

const getDirs = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const fetchAllComponents = (repoRoot = getRepoRoot()): string[] => {
  const components = getDirs(resolve(repoRoot, componentDocsDirectory));

  return components;
};

export const getComponentViewsAvailability = (slug: string, repoRoot = getRepoRoot()): ComponentViewsAvailability => {
  if (!isValidComponentSlug(slug)) {
    return { web: false, react: false, webPreview: false, reactPreview: false };
  }

  const componentName = slugToComponentName(slug);
  const webComponentDir = join(repoRoot, 'packages/web/src/scss/components', componentName);
  const reactComponentDir = join(repoRoot, componentDocsDirectory, componentName);

  return {
    web: existsSync(join(webComponentDir, 'README.md')),
    react: existsSync(join(reactComponentDir, 'README.md')),
    webPreview: existsSync(join(webComponentDir, 'preview.html')),
    reactPreview: existsSync(join(reactComponentDir, 'preview', 'index.ts')),
  };
};

export const hasComponentSection = (slug: string, section: ComponentSection, repoRoot = getRepoRoot()): boolean => {
  if (isViewSection(section)) {
    return getComponentViewsAvailability(slug, repoRoot)[section];
  }

  if (!isComponentDocTab(section)) {
    return false;
  }

  const filePath = resolveComponentTabFile(slug, section, repoRoot);

  return Boolean(filePath && existsSync(filePath));
};

// Guidelines (`overview`) first, then the sections in the order of the URL segments.
const componentSectionOrder = ['overview', ...Object.values(componentSectionBySegment)] as ComponentSection[];

export const buildComponentSectionIndex = (repoRoot = getRepoRoot()): Record<string, ComponentSection[]> => {
  const index: Record<string, ComponentSection[]> = {};

  fetchAllComponents(repoRoot)
    .map(componentNameToSlug)
    .sort()
    .forEach((slug) => {
      const sections = componentSectionOrder.filter((section) => hasComponentSection(slug, section, repoRoot));

      if (sections.length > 0) {
        index[slug] = sections;
      }
    });

  return index;
};
