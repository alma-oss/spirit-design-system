import { join, resolve } from 'path';

export const ROOT = resolve(__dirname, '..');
export const STAGING_DIR = join(ROOT, '.icons-tmp');
export const PKG_PATH = join(ROOT, 'package.json');

export function getEntryPoints(): Record<string, string> {
  return {
    'index': join(STAGING_DIR, 'index.ts'),
    'icons': join(STAGING_DIR, 'icons.ts'),
    'react/index': join(STAGING_DIR, 'react', 'index.ts'),
  };
}
