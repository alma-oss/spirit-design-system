import { readdirSync } from 'fs';
import { resolve } from 'path';
import { getRepoRoot } from '@local/domains/content/paths';
import { componentDocsDirectory } from '@local/domains/routing/routes';

const getDirs = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

export const fetchAllComponents = (): string[] => {
  const components = getDirs(resolve(getRepoRoot(), componentDocsDirectory));

  return components;
};
