import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { getRepoRoot } from '../../content/paths';
import { buildComponentSectionIndex } from './componentsRepository';

// Loaded only by next.config.ts. Prettier is imported lazily because Jest cannot load it.
// JSON.stringify is not Prettier's JSON layout, and `yarn format:check` runs on the committed file.
export const formatComponentSectionIndex = async (index: object, filePath: string): Promise<string> => {
  const { format, resolveConfig } = await import('prettier');
  const options = await resolveConfig(filePath);

  return format(JSON.stringify(index), { ...options, parser: 'json', filepath: filePath });
};

export const writeComponentSectionIndex = async (filePath: string, repoRoot = getRepoRoot()) => {
  const content = await formatComponentSectionIndex(buildComponentSectionIndex(repoRoot), filePath);

  // Skip an identical write so a repeated config load does not touch the file the bundler watches.
  if (existsSync(filePath) && readFileSync(filePath, 'utf8') === content) {
    return;
  }

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);
};
