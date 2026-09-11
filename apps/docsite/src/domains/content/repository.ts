import fs from 'node:fs/promises';
import path from 'node:path';
import { DOC_SECTIONS, isDocSection, isSafeSlug } from './constants';
import { slugToDisplayName, titleForSiblingPage } from './pageTitle';
import { parseCanonicalFrontmatter } from './parseFrontmatter';
import { getContentRoot, getRepoRoot, isPathInside } from './paths';
import {
  buildAliasNav,
  collectAliasSlugs,
  findRepoDocAlias,
  hasRepoDocAliasChildren,
  listRepoDocAliases,
} from './repoAliases';

export type CanonicalFileKind = 'page' | 'generated-index';

export interface ResolvedCanonicalFile {
  kind: CanonicalFileKind;
  filePath: string;
  title?: string;
}

export interface NavNode {
  title: string;
  href: string;
  children?: NavNode[];
}

export interface ComponentTabAvailability {
  overview: boolean;
  design: boolean;
  accessibility: boolean;
  figma: boolean;
}

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(filePath);

    return stat.isFile();
  } catch {
    return false;
  }
};

const dirExists = async (dirPath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(dirPath);

    return stat.isDirectory();
  } catch {
    return false;
  }
};

const resolveRepoRoot = (contentRoot: string, repoRoot?: string): string | undefined => {
  if (repoRoot) {
    return repoRoot;
  }

  if (path.resolve(contentRoot) === path.resolve(getContentRoot())) {
    return getRepoRoot();
  }

  return undefined;
};

const readTitle = async (filePath: string, fallback: string): Promise<string> => {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = parseCanonicalFrontmatter(raw);

    return data.title || fallback;
  } catch {
    return fallback;
  }
};

export const resolveCanonicalFile = async (
  slug: string[],
  contentRoot = getContentRoot(),
  options?: { repoRoot?: string },
): Promise<ResolvedCanonicalFile | null> => {
  if (!isSafeSlug(slug) || !isDocSection(slug[0] ?? '')) {
    return null;
  }

  const asFile = `${path.join(contentRoot, ...slug)}.md`;
  const asIndex = path.join(contentRoot, ...slug, 'index.md');
  const asDir = path.join(contentRoot, ...slug);
  const repoRoot = resolveRepoRoot(contentRoot, options?.repoRoot);

  if (repoRoot) {
    const alias = await findRepoDocAlias(slug, repoRoot);

    if (alias) {
      return {
        kind: 'page',
        filePath: path.join(repoRoot, alias.repoPath),
        title: alias.title,
      };
    }
  }

  if (await fileExists(asFile)) {
    return { kind: 'page', filePath: asFile };
  }

  if (await fileExists(asIndex)) {
    return { kind: 'page', filePath: asIndex };
  }

  if (repoRoot && (await hasRepoDocAliasChildren(slug, repoRoot))) {
    return { kind: 'generated-index', filePath: asDir };
  }

  if (await dirExists(asDir)) {
    return { kind: 'generated-index', filePath: asDir };
  }

  return null;
};

export const readAllowedMarkdown = async (
  filePath: string,
  contentRoot = getContentRoot(),
  repoRoot = getRepoRoot(),
): Promise<string | null> => {
  const resolved = path.resolve(filePath);

  if (!isPathInside(resolved, contentRoot) && !isPathInside(resolved, repoRoot)) {
    return null;
  }

  if (!(await fileExists(resolved))) {
    return null;
  }

  return fs.readFile(resolved, 'utf8');
};

export const readCanonicalFile = async (
  relativePath: string,
  contentRoot = getContentRoot(),
): Promise<string | null> => {
  const resolved = path.resolve(contentRoot, relativePath);

  return readAllowedMarkdown(resolved, contentRoot);
};

export const getComponentTabAvailability = async (
  slug: string,
  contentRoot = getContentRoot(),
): Promise<ComponentTabAvailability> => {
  const dir = path.join(contentRoot, 'components', slug);

  const [overview, design, accessibility, figma] = await Promise.all([
    fileExists(path.join(dir, 'overview.md')),
    fileExists(path.join(dir, 'design.md')),
    fileExists(path.join(dir, 'accessibility.md')),
    fileExists(path.join(dir, 'figma.md')),
  ]);

  return { overview, design, accessibility, figma };
};

const listMarkdownAndDirs = async (dir: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  return entries.filter((entry) => !entry.name.startsWith('.')).sort((a, b) => a.name.localeCompare(b.name));
};

const listSectionNavFromDir = async (dir: string, href: string): Promise<NavNode[]> => {
  if (!(await dirExists(dir))) {
    return [];
  }

  const entries = await listMarkdownAndDirs(dir);
  const nodes = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        const childHref = `${href}/${entry.name}`;
        const indexPath = path.join(dir, entry.name, 'index.md');
        const [title, children] = await Promise.all([
          readTitle(indexPath, slugToDisplayName(entry.name)),
          listSectionNavFromDir(path.join(dir, entry.name), childHref),
        ]);

        return {
          title,
          href: childHref,
          ...(children.length > 0 ? { children } : {}),
        };
      }

      if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        const name = entry.name.slice(0, -3);
        const parentSlug = path.basename(dir);
        const frontmatterTitle = await readTitle(path.join(dir, entry.name), slugToDisplayName(name));

        return {
          title: titleForSiblingPage(name, parentSlug, frontmatterTitle),
          href: `${href}/${name}`,
        };
      }

      return null;
    }),
  );

  return nodes.filter((node): node is NavNode => node !== null);
};

export const listSectionNav = async (
  section: string,
  contentRoot = getContentRoot(),
  options?: { repoRoot?: string },
): Promise<NavNode[]> => {
  if (!isDocSection(section)) {
    return [];
  }

  const fromDisk = await listSectionNavFromDir(path.join(contentRoot, section), `/${section}`);
  const repoRoot = resolveRepoRoot(contentRoot, options?.repoRoot);

  if (!repoRoot) {
    return fromDisk;
  }

  const fromAliases = buildAliasNav(await listRepoDocAliases(repoRoot), [section]);

  if (fromAliases.length > 0) {
    return fromAliases;
  }

  return fromDisk;
};

const collectSlugs = async (dir: string, prefix: string[]): Promise<string[][]> => {
  if (!(await dirExists(dir))) {
    return [];
  }

  const entries = await listMarkdownAndDirs(dir);
  const hasIndex = entries.some((entry) => entry.isFile() && entry.name === 'index.md');
  const current =
    prefix.length > 0 && (hasIndex || entries.some((entry) => entry.isDirectory() || entry.name.endsWith('.md')))
      ? [prefix]
      : [];

  const nested = await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        return collectSlugs(path.join(dir, entry.name), [...prefix, entry.name]);
      }

      if (entry.name.endsWith('.md') && entry.name !== 'index.md') {
        return [[...prefix, entry.name.slice(0, -3)]];
      }

      return [];
    }),
  );

  return [...current, ...nested.flat()];
};

export const listDocSlugs = async (
  contentRoot = getContentRoot(),
  options?: { repoRoot?: string },
): Promise<string[][]> => {
  const nested = await Promise.all(
    DOC_SECTIONS.map((section) => collectSlugs(path.join(contentRoot, section), [section])),
  );
  const fromDisk = nested.flat();
  const repoRoot = resolveRepoRoot(contentRoot, options?.repoRoot);

  if (!repoRoot) {
    return fromDisk;
  }

  const aliases = await listRepoDocAliases(repoRoot);
  const aliasSections = new Set(aliases.map((alias) => alias.slug[0]));
  const diskWithoutAliasedPages = fromDisk.filter((slug) => slug.length === 1 || !aliasSections.has(slug[0]));
  const seen = new Set(diskWithoutAliasedPages.map((slug) => slug.join('/')));

  return [
    ...diskWithoutAliasedPages,
    ...collectAliasSlugs(aliases).filter((slug) => {
      const key = slug.join('/');

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    }),
  ];
};
