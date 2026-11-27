import { isDocSection, type DocSection } from '../../../constants';
import { type NavNode, listSectionNav } from '../../../contentNavigation';
import { readAllowedMarkdown, resolveCanonicalFile } from '../../../contentRepository';
import { slugToDisplayName, titleForSiblingPage } from '../../../pageTitle';
import { parseCanonicalFrontmatter } from '../../../parseFrontmatter';
import { bulletList, pageFromSource, pagePath, type DocumentedPage, type Roots } from './page';

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

const frontMatterTitle = (raw: string): string => {
  try {
    return parseCanonicalFrontmatter(raw).data.title;
  } catch {
    return '';
  }
};

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

export const collectCanonicalPages = async (
  section: DocSection,
  docSlugs: string[][],
  roots: Roots,
): Promise<DocumentedPage[]> =>
  docSlugs
    .filter((slug) => slug[0] === section)
    .reduce<Promise<DocumentedPage[]>>(async (previous, slug) => {
      const pages = await previous;
      const page = await renderCanonicalPage(slug, roots);

      if (page) {
        pages.push(page);
      }

      return pages;
    }, Promise.resolve([]));
