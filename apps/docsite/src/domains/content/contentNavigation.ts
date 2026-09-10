import fs from 'node:fs/promises';
import path from 'node:path';
import { DOC_SECTIONS, isDocSection } from './constants';
import { dirExists, readTitle, resolveRepoRoot } from './contentRepository';
import { slugToDisplayName, titleForSiblingPage } from './pageTitle';
import { getContentRoot } from './paths';
import { buildAliasNav, collectAliasSlugs, listRepoDocAliases } from './repoAliases';

export interface NavNode {
  title: string;
  href: string;
  children?: NavNode[];
}

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
