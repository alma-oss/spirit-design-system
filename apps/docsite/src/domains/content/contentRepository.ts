import fs from 'node:fs/promises';
import path from 'node:path';
import { isDocSection, isSafeSlug } from './constants';
import { parseCanonicalFrontmatter } from './parseFrontmatter';
import { getContentRoot, getRepoRoot, isPathInside } from './paths';
import { findRepoDocAlias, hasRepoDocAliasChildren } from './repoAliases';

export const CANONICAL_FILE_KIND = {
  page: 'page',
  generatedIndex: 'generated-index',
} as const;

export type CanonicalFileKind = (typeof CANONICAL_FILE_KIND)[keyof typeof CANONICAL_FILE_KIND];

export interface ResolvedCanonicalFile {
  kind: CanonicalFileKind;
  filePath: string;
  isCanonical: boolean;
  title?: string;
}

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(filePath);

    return stat.isFile();
  } catch {
    return false;
  }
};

export const dirExists = async (dirPath: string): Promise<boolean> => {
  try {
    const stat = await fs.stat(dirPath);

    return stat.isDirectory();
  } catch {
    return false;
  }
};

export const resolveRepoRoot = (contentRoot: string, repoRoot?: string): string | undefined => {
  if (repoRoot) {
    return repoRoot;
  }

  if (path.resolve(contentRoot) === path.resolve(getContentRoot())) {
    return getRepoRoot();
  }

  return undefined;
};

export const readTitle = async (filePath: string, fallback: string): Promise<string> => {
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
        kind: CANONICAL_FILE_KIND.page,
        filePath: path.join(repoRoot, alias.repoPath),
        isCanonical: false,
        title: alias.title,
      };
    }
  }

  if (await fileExists(asFile)) {
    return { kind: CANONICAL_FILE_KIND.page, filePath: asFile, isCanonical: true };
  }

  if (await fileExists(asIndex)) {
    return { kind: CANONICAL_FILE_KIND.page, filePath: asIndex, isCanonical: true };
  }

  if (repoRoot && (await hasRepoDocAliasChildren(slug, repoRoot))) {
    return { kind: CANONICAL_FILE_KIND.generatedIndex, filePath: asDir, isCanonical: false };
  }

  if (await dirExists(asDir)) {
    return { kind: CANONICAL_FILE_KIND.generatedIndex, filePath: asDir, isCanonical: true };
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
