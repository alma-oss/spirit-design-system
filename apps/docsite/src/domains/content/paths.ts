import path from 'node:path';
import { getContentRoot } from '@local/config/paths';

export { getContentRoot, getRepoRoot } from '@local/config/paths';

export const isPathInside = (filePath: string, root: string): boolean => {
  const resolved = path.resolve(filePath);
  const resolvedRoot = path.resolve(root);

  return resolved === resolvedRoot || resolved.startsWith(`${resolvedRoot}${path.sep}`);
};

export const toContentRelativePath = (filePath: string, contentRoot = getContentRoot()): string =>
  path.relative(contentRoot, filePath).split(path.sep).join('/');
