import { collectCanonicalPages } from './canonicalDocPages';
import { collectComponentPages, collectInventoryPage } from './componentDocPages';
import { isDocSection } from './constants';
import { listDocSlugs } from './contentNavigation';
import { DOCUMENTATION_MENU } from './documentationMenu';
import { resolveRoots, type DocumentedPage, type DocumentedPageOptions, type Roots } from './documentedPage';

export type { DocumentedPage, DocumentedPageOptions, DocumentedPageSection } from './documentedPage';

const pageListCache = new Map<string, Promise<DocumentedPage[]>>();

const loadDocumentedPages = async (roots: Roots): Promise<DocumentedPage[]> => {
  const docSlugs = await listDocSlugs(roots.contentRoot, { repoRoot: roots.repoRoot });

  return DOCUMENTATION_MENU.reduce<Promise<DocumentedPage[]>>(async (previous, section) => {
    const pages = await previous;

    if (isDocSection(section.id)) {
      pages.push(...(await collectCanonicalPages(section.id, docSlugs, roots)));
    } else if (section.id === 'components') {
      pages.push(...(await collectComponentPages(roots)));
    } else if (section.id === 'icons' || section.id === 'helpers') {
      pages.push(await collectInventoryPage(section.id, roots));
    }

    return pages;
  }, Promise.resolve([]));
};

/**
 * Every page `llms.txt` indexes, in menu order.
 * Component tabs that have no file, preview routes, and hidden tabs are absent.
 * The result is cached for the content and repository roots.
 *
 * @param options Content and repository roots. Defaults to the docsite checkout.
 */
export const listDocumentedPages = (options?: DocumentedPageOptions): Promise<DocumentedPage[]> => {
  const roots = resolveRoots(options);

  if (process.env.NODE_ENV === 'development') {
    return loadDocumentedPages(roots);
  }

  const key = `${roots.contentRoot}\0${roots.repoRoot}`;
  const cached = pageListCache.get(key);

  if (cached) {
    return cached;
  }

  const pending = loadDocumentedPages(roots).catch((error: unknown) => {
    pageListCache.delete(key);

    throw error;
  });

  pageListCache.set(key, pending);

  return pending;
};

/**
 * Markdown projection of one documented path.
 * Returns null for the homepage, preview tabs, helper previews, and unknown slugs.
 *
 * @param slug Path segments after the origin. An empty list is the homepage.
 * @param options Content and repository roots. Defaults to the docsite checkout.
 */
export const composePageMarkdown = async (slug: string[], options?: DocumentedPageOptions): Promise<string | null> => {
  const pages = await listDocumentedPages(options);
  const page = pages.find((item) => item.path === `/${slug.join('/')}`);

  return page?.body ?? null;
};
