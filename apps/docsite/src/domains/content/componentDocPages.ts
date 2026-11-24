import fs from 'node:fs/promises';
import path from 'node:path';
import { kebabToTitleCase } from '@alma-oss/spirit-common/utilities/kebabToTitleCase';
import { componentNameToSlug, isValidComponentSlug, slugToComponentName } from '../components/utils/componentSlug';
import { componentDocsDirectory } from '../routing/routes';
import {
  getComponentDescription,
  getComponentTabAvailability,
  isComponentTabHidden,
  resolveComponentTabFile,
} from './componentDocsRepository';
import { fileExists, readAllowedMarkdown } from './contentRepository';
import { bulletList, pageFromSource, type DocumentedPage, type Roots } from './documentedPage';

const COMPONENT_TAB_ORDER = ['design', 'accessibility', 'figma', 'web', 'react'] as const;

type ComponentMarkdownTab = (typeof COMPONENT_TAB_ORDER)[number];

const TAB_LABELS: Record<ComponentMarkdownTab, string> = {
  design: 'Design',
  accessibility: 'Accessibility',
  figma: 'Figma',
  web: 'Web',
  react: 'React',
};

const isEnoent = (error: unknown): boolean => error instanceof Error && 'code' in error && error.code === 'ENOENT';

const readDirectoryNames = async (directory: string): Promise<string[]> => {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, 'en'));
  } catch (error) {
    if (isEnoent(error)) {
      return [];
    }

    throw error;
  }
};

const listIconNames = async (repoRoot: string): Promise<string[]> => {
  try {
    const entries = await fs.readdir(path.join(repoRoot, 'packages/icons/src/svg'));

    return entries
      .filter((file) => file.endsWith('.svg'))
      .map((file) => file.slice(0, -'.svg'.length))
      .sort((left, right) => left.localeCompare(right, 'en'));
  } catch (error) {
    if (isEnoent(error)) {
      return [];
    }

    throw error;
  }
};

const listHelperTitles = async (repoRoot: string): Promise<string[]> => {
  const directory = path.join(repoRoot, 'packages/web/src/scss/helpers');
  const names = await readDirectoryNames(directory);

  return names.reduce<Promise<string[]>>(async (previous, name) => {
    const titles = await previous;

    if (await fileExists(path.join(directory, name, 'preview.html'))) {
      titles.push(kebabToTitleCase(name));
    }

    return titles;
  }, Promise.resolve([]));
};

const webReadmePath = (slug: string, repoRoot: string): string =>
  path.join(repoRoot, 'packages/web/src/scss/components', slugToComponentName(slug), 'README.md');

const reactReadmePath = (slug: string, repoRoot: string): string =>
  path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug), 'README.md');

const renderInventory = (title: string, items: string[], pathName: string): DocumentedPage => {
  const body = `# ${title}\n\n${bulletList(items.map((item) => `- ${item}`))}`;

  return {
    path: pathName,
    title,
    section: pathName.slice(1) as DocumentedPage['section'],
    description: title,
    body,
  };
};

const listComponentSlugs = async (roots: Roots): Promise<string[]> => {
  const directories = await readDirectoryNames(path.join(roots.repoRoot, componentDocsDirectory));

  return directories.map((directory) => componentNameToSlug(directory)).filter((slug) => isValidComponentSlug(slug));
};

const componentTabSource = async (
  slug: string,
  tab: ComponentMarkdownTab,
  roots: Roots,
): Promise<{ raw: string; fallbackTitle: string } | null> => {
  if (await isComponentTabHidden(slug, tab, roots.repoRoot)) {
    return null;
  }

  if (tab === 'web' || tab === 'react') {
    const filePath = tab === 'web' ? webReadmePath(slug, roots.repoRoot) : reactReadmePath(slug, roots.repoRoot);
    const raw = await readAllowedMarkdown(filePath, roots.contentRoot, roots.repoRoot);

    return raw ? { raw, fallbackTitle: slugToComponentName(slug) } : null;
  }

  const availability = await getComponentTabAvailability(slug, roots.repoRoot);

  if (!availability[tab]) {
    return null;
  }

  const filePath = resolveComponentTabFile(slug, tab, roots.repoRoot);

  if (!filePath) {
    return null;
  }

  const raw = await readAllowedMarkdown(filePath, roots.contentRoot, roots.repoRoot);

  return raw ? { raw, fallbackTitle: slugToComponentName(slug) } : null;
};

const renderComponentGuidelines = async (slug: string, roots: Roots): Promise<DocumentedPage | null> => {
  if (!isValidComponentSlug(slug) || (await isComponentTabHidden(slug, 'guidelines', roots.repoRoot))) {
    return null;
  }

  const availability = await getComponentTabAvailability(slug, roots.repoRoot);

  if (!availability.overview) {
    return null;
  }

  const filePath = resolveComponentTabFile(slug, 'overview', roots.repoRoot);

  if (!filePath) {
    return null;
  }

  const raw = await readAllowedMarkdown(filePath, roots.contentRoot, roots.repoRoot);

  if (!raw) {
    return null;
  }

  const title = slugToComponentName(slug);
  const readmeDescription = await getComponentDescription(slug, roots.repoRoot);

  return pageFromSource(`/components/${slug}`, 'components', title, raw, readmeDescription || title);
};

const renderComponentTab = async (
  slug: string,
  tab: ComponentMarkdownTab,
  roots: Roots,
): Promise<DocumentedPage | null> => {
  if (!isValidComponentSlug(slug)) {
    return null;
  }

  const source = await componentTabSource(slug, tab, roots);

  if (!source) {
    return null;
  }

  const componentName = slugToComponentName(slug);
  const title = `${componentName} — ${TAB_LABELS[tab]}`;
  const readmeDescription = await getComponentDescription(slug, roots.repoRoot);

  return pageFromSource(
    `/components/${slug}/${tab}`,
    'components',
    title,
    source.raw,
    readmeDescription || componentName,
    source.fallbackTitle,
  );
};

const renderComponentCatalog = (componentPages: DocumentedPage[]): DocumentedPage => {
  const seen = new Set<string>();
  const items: string[] = [];

  componentPages.forEach((page) => {
    const slug = page.path.split('/')[2];

    if (!slug || seen.has(slug)) {
      return;
    }

    seen.add(slug);

    const label = slugToComponentName(slug);
    const link = `[${label}](${page.path})`;

    items.push(page.description ? `- ${link}: ${page.description}` : `- ${link}`);
  });

  return {
    path: '/components',
    title: 'Components',
    section: 'components',
    description: 'Components',
    body: `# Components\n\n${bulletList(items)}`,
  };
};

const renderIcons = async (roots: Roots): Promise<DocumentedPage> =>
  renderInventory('Icons', await listIconNames(roots.repoRoot), '/icons');

const renderHelpers = async (roots: Roots): Promise<DocumentedPage> =>
  renderInventory('Helpers', await listHelperTitles(roots.repoRoot), '/helpers');

const tabsFor = (slug: string, roots: Roots): Promise<DocumentedPage[]> =>
  COMPONENT_TAB_ORDER.reduce<Promise<DocumentedPage[]>>(async (previous, tab) => {
    const pages = await previous;
    const page = await renderComponentTab(slug, tab, roots);

    if (page) {
      pages.push(page);
    }

    return pages;
  }, Promise.resolve([]));

/**
 * Component catalog plus every markdown tab, one component at a time.
 * The catalog links to the first page that actually exists for that component.
 *
 * @param roots Content and repository roots
 */
export const collectComponentPages = async (roots: Roots): Promise<DocumentedPage[]> => {
  const slugs = await listComponentSlugs(roots);
  const pages = await slugs.reduce<Promise<DocumentedPage[]>>(async (previous, slug) => {
    const collected = await previous;
    const guidelines = await renderComponentGuidelines(slug, roots);

    if (guidelines) {
      collected.push(guidelines);
    }

    collected.push(...(await tabsFor(slug, roots)));

    return collected;
  }, Promise.resolve([]));

  return [renderComponentCatalog(pages), ...pages];
};

export const collectInventoryPage = async (section: 'icons' | 'helpers', roots: Roots): Promise<DocumentedPage> =>
  section === 'icons' ? renderIcons(roots) : renderHelpers(roots);
