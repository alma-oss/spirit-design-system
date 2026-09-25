import fs from 'node:fs/promises';
import path from 'node:path';
import documentationSchema from './documentation.schema.json';
import { getRepoRoot } from './paths';

export interface RepoDocAlias {
  slug: string[];
  repoPath: string;
  title: string;
}

export interface AliasNavNode {
  title: string;
  href: string;
  children?: AliasNavNode[];
}

const MIGRATION_PACKAGE_URL: Record<string, string> = documentationSchema.migrationPackages;

const STATIC_ALIASES: RepoDocAlias[] = documentationSchema.aliases.map((alias) => ({
  slug: [...alias.slug],
  repoPath: alias.repoPath,
  title: alias.title,
}));

const listMigrationAliases = async (repoRoot: string): Promise<RepoDocAlias[]> => {
  const aliases: RepoDocAlias[] = [];

  await Promise.all(
    Object.entries(MIGRATION_PACKAGE_URL).map(async ([repoPkg, urlPkg]) => {
      const dir = path.join(repoRoot, 'docs/migrations', repoPkg);

      try {
        const files = await fs.readdir(dir);

        for (const file of files) {
          const match = file.match(/^migration-v(\d+)\.md$/u);

          if (match?.[1]) {
            aliases.push({
              slug: ['migrations', urlPkg, `migration-to-v${match[1]}`],
              repoPath: path.posix.join('docs/migrations', repoPkg, file),
              title: `Migration to v${match[1]}`,
            });
          }
        }
      } catch {
        // Package folder may not exist yet.
      }
    }),
  );

  return aliases;
};

export const listRepoDocAliases = async (repoRoot = getRepoRoot()): Promise<RepoDocAlias[]> => {
  const migrations = await listMigrationAliases(repoRoot);

  return [...STATIC_ALIASES, ...migrations];
};

export const findRepoDocAlias = async (slug: string[], repoRoot = getRepoRoot()): Promise<RepoDocAlias | undefined> => {
  const key = slug.join('/');
  const aliases = await listRepoDocAliases(repoRoot);

  return aliases.find((alias) => alias.slug.join('/') === key);
};

export const hasRepoDocAliasChildren = async (slug: string[], repoRoot = getRepoRoot()): Promise<boolean> => {
  const aliases = await listRepoDocAliases(repoRoot);

  return aliases.some(
    (alias) => alias.slug.length > slug.length && slug.every((part, index) => alias.slug[index] === part),
  );
};

const slugToDisplayName = (slug: string): string =>
  slug
    .split('-')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');

export const buildAliasNav = (aliases: RepoDocAlias[], prefix: string[]): AliasNavNode[] => {
  const matching = aliases.filter(
    (alias) => alias.slug.length > prefix.length && prefix.every((part, index) => alias.slug[index] === part),
  );
  const direct = matching.filter((alias) => alias.slug.length === prefix.length + 1);
  const nestedNames = new Set(
    matching.filter((alias) => alias.slug.length > prefix.length + 1).map((alias) => alias.slug[prefix.length] ?? ''),
  );

  const folderNodes = [...nestedNames]
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right))
    .map((name) => {
      const hrefParts = [...prefix, name];
      const children = buildAliasNav(aliases, hrefParts);
      const landing = direct.find((alias) => alias.slug[prefix.length] === name);

      return {
        title: landing?.title ?? slugToDisplayName(name),
        href: `/${hrefParts.join('/')}`,
        ...(children.length > 0 ? { children } : {}),
      };
    });

  const leafNodes = direct
    .filter((alias) => !nestedNames.has(alias.slug[prefix.length] ?? ''))
    .map((alias) => ({
      title: alias.title,
      href: `/${alias.slug.join('/')}`,
    }));

  return [...folderNodes, ...leafNodes].sort((left, right) => left.title.localeCompare(right.title));
};

export const collectAliasSlugs = (aliases: RepoDocAlias[]): string[][] => {
  const slugs = new Set<string>();

  for (const alias of aliases) {
    for (let index = 1; index <= alias.slug.length; index += 1) {
      slugs.add(alias.slug.slice(0, index).join('/'));
    }
  }

  return [...slugs].map((value) => value.split('/'));
};
