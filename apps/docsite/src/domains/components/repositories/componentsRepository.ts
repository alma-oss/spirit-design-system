import { existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { getRepoRoot } from '@local/domains/content/paths';
import { componentDocsDirectory } from '@local/domains/routing/routes';
import { isValidComponentSlug, slugToComponentName } from '../utils/componentSlug';

export interface ComponentViewsAvailability {
  web: boolean;
  react: boolean;
  webPreview: boolean;
  reactPreview: boolean;
}

const getDirs = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const fetchAllComponents = (): string[] => {
  const components = getDirs(resolve(getRepoRoot(), componentDocsDirectory));

  return components;
};

export const getComponentViewsAvailability = (slug: string): ComponentViewsAvailability => {
  if (!isValidComponentSlug(slug)) {
    return { web: false, react: false, webPreview: false, reactPreview: false };
  }

  const componentName = slugToComponentName(slug);
  const webComponentDir = join(getRepoRoot(), 'packages/web/src/scss/components', componentName);
  const reactComponentDir = join(getRepoRoot(), componentDocsDirectory, componentName);

  return {
    web: existsSync(join(webComponentDir, 'README.md')),
    react: existsSync(join(reactComponentDir, 'README.md')),
    webPreview: existsSync(join(webComponentDir, 'preview.html')),
    reactPreview: existsSync(join(reactComponentDir, 'preview', 'index.ts')),
  };
};
