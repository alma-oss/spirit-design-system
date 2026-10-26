import { spawnSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
// Relative imports so next.config.ts can load this file. Its loader does not resolve `@local`.
import { getRepoRoot } from '../../content/paths';
import { componentDocTabs, componentDocsDirectory, type ComponentDocTab } from '../../routing/routes';
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

const isDocSection = (section: ComponentSection): section is ComponentDocTab =>
  (componentDocTabs as readonly string[]).includes(section);

const resolveDocFile = (slug: string, section: ComponentDocTab): string | null => {
  if (!isValidComponentSlug(slug)) {
    return null;
  }

  return join(getRepoRoot(), componentDocsDirectory, slugToComponentName(slug), 'docs', `${section}.md`);
};

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

export const hasComponentSection = (slug: string, section: ComponentSection): boolean => {
  if (isViewSection(section)) {
    return getComponentViewsAvailability(slug)[section];
  }

  if (!isDocSection(section)) {
    return false;
  }

  const filePath = resolveDocFile(slug, section);

  return Boolean(filePath && existsSync(filePath));
};

export const listComponentSlugsForSection = (section: ComponentSection): string[] =>
  fetchAllComponents()
    .map(componentNameToSlug)
    .filter((slug) => hasComponentSection(slug, section));

const componentSectionOrder: readonly ComponentSection[] = [
  'overview',
  'design',
  'accessibility',
  'figma',
  'web',
  'react',
  'webPreview',
  'reactPreview',
];

export const buildComponentSectionIndex = (): Record<string, ComponentSection[]> => {
  const index: Record<string, ComponentSection[]> = {};

  fetchAllComponents()
    .map(componentNameToSlug)
    .sort()
    .forEach((slug) => {
      const sections = componentSectionOrder.filter((section) => hasComponentSection(slug, section));

      if (sections.length > 0) {
        index[slug] = sections;
      }
    });

  return index;
};

export const writeComponentSectionIndex = (filePath: string) => {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(buildComponentSectionIndex(), null, 2)}\n`);

  // JSON.stringify is not Prettier's JSON layout. The next build rewrites this file, so format it here.
  const prettier = spawnSync('yarn', ['prettier', '--write', '--', filePath], {
    cwd: getRepoRoot(),
    stdio: 'inherit',
  });

  if (prettier.status !== 0) {
    throw new Error('Prettier failed while writing the component section index.');
  }
};
