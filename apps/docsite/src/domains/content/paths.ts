import path from 'node:path';

export const getRepoRoot = (cwd = process.cwd()): string => path.resolve(cwd, '../..');

export const getContentRoot = (cwd = process.cwd()): string => path.join(getRepoRoot(cwd), 'docs');

export const isPathInside = (filePath: string, root: string): boolean => {
  const resolved = path.resolve(filePath);
  const resolvedRoot = path.resolve(root);

  return resolved === resolvedRoot || resolved.startsWith(`${resolvedRoot}${path.sep}`);
};

export const toContentRelativePath = (filePath: string, contentRoot = getContentRoot()): string =>
  path.relative(contentRoot, filePath).split(path.sep).join('/');
