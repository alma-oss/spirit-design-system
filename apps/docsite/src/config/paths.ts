import path from 'node:path';

export const getRepoRoot = (cwd = process.cwd()): string => path.resolve(cwd, '../..');

export const getContentRoot = (cwd = process.cwd()): string => path.join(getRepoRoot(cwd), 'docs');
