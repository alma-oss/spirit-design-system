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
import { isDocSection, type DocSection } from './constants';
import { listDocSlugs, listSectionNav, type NavNode } from './contentNavigation';
import { fileExists, readAllowedMarkdown, resolveCanonicalFile } from './contentRepository';
import { firstProseSentence, renderMarkdownDocument } from './markdownProse';
import { slugToDisplayName, titleForSiblingPage } from './pageTitle';
import { parseCanonicalFrontmatter } from './parseFrontmatter';
import { getContentRoot, getRepoRoot } from './paths';

const MENU_SECTION_IDS = [
  'introduction',
  'design',
  'components',
  'icons',
  'helpers',
  'development',
  'migrations',
  'releases',
] as const;

export type DocumentedPageSection = (typeof MENU_SECTION_IDS)[number];

const COMPONENT_TAB_ORDER = ['design', 'accessibility', 'figma', 'web', 'react'] as const;

type ComponentMarkdownTab = (typeof COMPONENT_TAB_ORDER)[number];

const TAB_LABELS: Record<ComponentMarkdownTab, string> = {
  design: 'Design',
  accessibility: 'Accessibility',
  figma: 'Figma',
  web: 'Web',
  react: 'React',
};

export interface DocumentedPageOptions {
  contentRoot?: string;
  repoRoot?: string;
}

export interface DocumentedPage {
  path: string;
  title: string;
  section: DocumentedPageSection;
  description: string;
  body: string;
}

interface Roots {
  contentRoot: string;
  repoRoot: string;
}

const resolveRoots = (options?: DocumentedPageOptions): Roots => ({
  contentRoot: options?.contentRoot ?? getContentRoot(),
  repoRoot: options?.repoRoot ?? getRepoRoot(),
});

const pagePath = (slug: string[]): string => `/${slug.join('/')}`;

const isMenuSection = (value: string): value is DocumentedPageSection =>
  (MENU_SECTION_IDS as readonly string[]).includes(value);

const isComponentMarkdownTab = (value: string): value is ComponentMarkdownTab =>
  (COMPONENT_TAB_ORDER as readonly string[]).includes(value);

const readDirectoryNames = async (directory: string): Promise<string[]> => {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, 'en'));
  } catch {
    return [];
  }
};

const listComponentDirectories = (repoRoot: string): Promise<string[]> =>
  readDirectoryNames(path.join(repoRoot, componentDocsDirectory));

const listIconNames = async (repoRoot: string): Promise<string[]> => {
  try {
    const entries = await fs.readdir(path.join(repoRoot, 'packages/icons/src/svg'));

    return entries
      .filter((file) => file.endsWith('.svg'))
      .map((file) => file.slice(0, -'.svg'.length))
      .sort((left, right) => left.localeCompare(right, 'en'));
  } catch {
    return [];
  }
};

const listHelperTitles = async (repoRoot: string): Promise<string[]> => {
  const directory = path.join(repoRoot, 'packages/web/src/scss/helpers');
  const names = await readDirectoryNames(directory);
  const withPreview = await Promise.all(
    names.map(async (name) => ((await fileExists(path.join(directory, name, 'preview.html'))) ? name : null)),
  );

  return withPreview.filter((name): name is string => name !== null).map((name) => kebabToTitleCase(name));
};

const webReadmePath = (slug: string, repoRoot: string): string =>
  path.join(repoRoot, 'packages/web/src/scss/components', slugToComponentName(slug), 'README.md');

const reactReadmePath = (slug: string, repoRoot: string): string =>
  path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug), 'README.md');

const findNavNode = (nodes: NavNode[], href: string): NavNode | undefined => {
  let found: NavNode | undefined;

  nodes.some((node) => {
    if (node.href === href) {
      found = node;

      return true;
    }

    if (node.children) {
      found = findNavNode(node.children, href);

      return Boolean(found);
    }

    return false;
  });

  return found;
};

const bulletList = (items: string[]): string => (items.length > 0 ? `${items.join('\n')}\n` : '');

const renderInventory = (title: string, items: string[]): DocumentedPage => {
  const body = `# ${title}\n\n${bulletList(items.map((item) => `- ${item}`))}`;

  return {
    path: `/${title.toLowerCase()}`,
    title,
    section: title.toLowerCase() as DocumentedPageSection,
    description: title,
    body,
  };
};

const renderComponentCatalog = async (roots: Roots): Promise<DocumentedPage> => {
  const directories = await listComponentDirectories(roots.repoRoot);
  const items = await Promise.all(
    directories.map(async (directory) => {
      const slug = componentNameToSlug(directory);
      const description = await getComponentDescription(slug, roots.repoRoot);
      const label = slugToComponentName(slug);
      const link = `[${label}](/components/${slug})`;

      return description ? `- ${link}: ${description}` : `- ${link}`;
    }),
  );

  return {
    path: '/components',
    title: 'Components',
    section: 'components',
    description: 'Components',
    body: `# Components\n\n${bulletList(items)}`,
  };
};

const renderIcons = async (roots: Roots): Promise<DocumentedPage> => {
  const names = await listIconNames(roots.repoRoot);

  return {
    ...renderInventory('Icons', names),
    path: '/icons',
    section: 'icons',
  };
};

const renderHelpers = async (roots: Roots): Promise<DocumentedPage> => {
  const titles = await listHelperTitles(roots.repoRoot);

  return {
    ...renderInventory('Helpers', titles),
    path: '/helpers',
    section: 'helpers',
  };
};

const frontMatterTitle = (raw: string): string => {
  try {
    return parseCanonicalFrontmatter(raw).data.title;
  } catch {
    return '';
  }
};

const pageFromSource = (
  pathName: string,
  section: DocumentedPageSection,
  title: string,
  raw: string,
  fallbackDescription: string,
  documentTitle = title,
): DocumentedPage => ({
  path: pathName,
  title,
  section,
  description: firstProseSentence(raw) || fallbackDescription || title,
  body: renderMarkdownDocument(raw, documentTitle),
});

const renderGeneratedIndex = async (slug: string[], section: DocSection, roots: Roots): Promise<DocumentedPage> => {
  const nav = await listSectionNav(section, roots.contentRoot, { repoRoot: roots.repoRoot });
  const href = pagePath(slug);
  const node = slug.length === 1 ? undefined : findNavNode(nav, href);
  const children = slug.length === 1 ? nav : (node?.children ?? []);
  const title = node?.title ?? slugToDisplayName(slug[slug.length - 1] ?? section);
  const items = children.map((child) => `- [${child.title}](${child.href})`);

  return {
    path: href,
    title,
    section,
    description: title,
    body: `# ${title}\n\n${bulletList(items)}`,
  };
};

const renderCanonicalPage = async (slug: string[], roots: Roots): Promise<DocumentedPage | null> => {
  const section = slug[0];

  if (!section || !isDocSection(section)) {
    return null;
  }

  const resolved = await resolveCanonicalFile(slug, roots.contentRoot, { repoRoot: roots.repoRoot });

  if (!resolved) {
    return null;
  }

  if (resolved.kind === 'generated-index') {
    return renderGeneratedIndex(slug, section, roots);
  }

  const raw = await readAllowedMarkdown(resolved.filePath, roots.contentRoot, roots.repoRoot);

  if (!raw) {
    return null;
  }

  const last = slug[slug.length - 1] ?? section;
  const parent = slug[slug.length - 2] ?? '';
  const title =
    !resolved.isCanonical && resolved.title
      ? resolved.title
      : titleForSiblingPage(last, parent, frontMatterTitle(raw) || resolved.title || '');

  return pageFromSource(pagePath(slug), section, title, raw, frontMatterTitle(raw) || title);
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

const renderDocumentedSlug = async (slug: string[], roots: Roots): Promise<DocumentedPage | null> => {
  const [section, name, tab] = slug;

  if (!section || !isMenuSection(section)) {
    return null;
  }

  if (isDocSection(section)) {
    return renderCanonicalPage(slug, roots);
  }

  if (section === 'components' && slug.length === 1) {
    return renderComponentCatalog(roots);
  }

  if (section === 'components' && name && slug.length === 2) {
    return renderComponentGuidelines(name, roots);
  }

  if (section === 'components' && name && tab && slug.length === 3 && isComponentMarkdownTab(tab)) {
    return renderComponentTab(name, tab, roots);
  }

  if (section === 'icons' && slug.length === 1) {
    return renderIcons(roots);
  }

  if (section === 'helpers' && slug.length === 1) {
    return renderHelpers(roots);
  }

  return null;
};

const componentSlugs = async (roots: Roots): Promise<string[]> => {
  const directories = await listComponentDirectories(roots.repoRoot);

  return directories.map((directory) => componentNameToSlug(directory)).filter((slug) => isValidComponentSlug(slug));
};

/**
 * Every page `llms.txt` indexes, in menu order.
 * Component tabs that have no file, preview routes, and hidden tabs are absent.
 *
 * @param options Content and repository roots. Defaults to the docsite checkout.
 */
export const listDocumentedPages = async (options?: DocumentedPageOptions): Promise<DocumentedPage[]> => {
  const roots = resolveRoots(options);
  const [docSlugs, slugs] = await Promise.all([
    listDocSlugs(roots.contentRoot, { repoRoot: roots.repoRoot }),
    componentSlugs(roots),
  ]);
  const pages: DocumentedPage[] = [];

  await MENU_SECTION_IDS.reduce(async (previous, section) => {
    await previous;

    if (isDocSection(section)) {
      const sectionPages = await Promise.all(
        docSlugs.filter((slug) => slug[0] === section).map((slug) => renderDocumentedSlug(slug, roots)),
      );

      pages.push(...sectionPages.filter((page): page is DocumentedPage => page !== null));

      return;
    }

    if (section === 'components') {
      const catalog = await renderDocumentedSlug(['components'], roots);

      if (catalog) {
        pages.push(catalog);
      }

      const componentPages = await Promise.all(
        slugs.map(async (slug) => {
          const guidelines = await renderDocumentedSlug(['components', slug], roots);
          const tabs = await Promise.all(
            COMPONENT_TAB_ORDER.map((tab) => renderDocumentedSlug(['components', slug, tab], roots)),
          );

          return [guidelines, ...tabs].filter((page): page is DocumentedPage => page !== null);
        }),
      );

      pages.push(...componentPages.flat());

      return;
    }

    const landing = await renderDocumentedSlug([section], roots);

    if (landing) {
      pages.push(landing);
    }
  }, Promise.resolve());

  return pages;
};

/**
 * Markdown projection of one documented path.
 * Returns null for the homepage, preview tabs, helper previews, and unknown slugs.
 *
 * @param slug Path segments after the origin. An empty list is the homepage.
 * @param options Content and repository roots. Defaults to the docsite checkout.
 */
export const composePageMarkdown = async (slug: string[], options?: DocumentedPageOptions): Promise<string | null> => {
  const page = await renderDocumentedSlug(slug, resolveRoots(options));

  return page?.body ?? null;
};
