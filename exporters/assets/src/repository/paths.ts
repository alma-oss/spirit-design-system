import { lstat } from 'node:fs/promises';
import path from 'node:path';

import { ROOT_CONFIG_FILE } from '../constants';
import { ConfigError } from '../errors';

export const isContainedInRoot = (targetPath: string, repositoryRoot: string): boolean => {
  const resolvedRoot = path.resolve(repositoryRoot);
  const resolvedTarget = path.resolve(targetPath);
  const relative = path.relative(resolvedRoot, resolvedTarget);

  return !relative.startsWith('..') && !path.isAbsolute(relative);
};

export const assertContainedInRoot = (targetPath: string, repositoryRoot: string, label: string): void => {
  if (!isContainedInRoot(targetPath, repositoryRoot)) {
    throw new ConfigError(`${label} resolves outside the repository: ${path.resolve(targetPath)}`);
  }
};

export const expectedRepositoryConfigPath = (repositoryRoot: string): string =>
  path.join(path.resolve(repositoryRoot), ROOT_CONFIG_FILE);

export const toTargetSlug = (out: string): string => {
  const slug = out.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  return slug || 'assets';
};

const assertNotSymlink = async (targetPath: string): Promise<void> => {
  const stats = await lstat(targetPath);

  if (stats.isSymbolicLink()) {
    throw new ConfigError(`Path contains a symlink: ${targetPath}`);
  }
};

export const assertNoSymlinkComponents = async (repositoryRoot: string, targetPath: string): Promise<void> => {
  const resolvedRoot = path.resolve(repositoryRoot);
  const resolvedTarget = path.resolve(targetPath);
  assertContainedInRoot(resolvedTarget, resolvedRoot, 'Path');

  const relative = path.relative(resolvedRoot, resolvedTarget);
  const segments = relative === '' ? [] : relative.split(path.sep).filter(Boolean);
  let current = resolvedRoot;

  await assertNotSymlink(current);

  for (const segment of segments) {
    current = path.join(current, segment);

    try {
      await assertNotSymlink(current);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return;
      }

      throw error;
    }
  }
};
