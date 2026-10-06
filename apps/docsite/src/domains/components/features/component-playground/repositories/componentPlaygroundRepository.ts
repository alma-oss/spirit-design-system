import fs from 'node:fs/promises';
import path from 'node:path';
import { getRepoRoot } from '@local/domains/content/paths';
import { componentDocsDirectory } from '@local/domains/routing/routes';
import { isValidComponentSlug, slugToComponentName } from '../../../utils/componentSlug';
import { parsePlaygroundFile, type PlaygroundFile } from '../playgroundConfig';

const componentDirectory = (slug: string, repoRoot: string) =>
  path.join(repoRoot, componentDocsDirectory, slugToComponentName(slug));

/**
 * Interactive playground definition (`docs/playground.json`), present only for components that have one.
 * An unknown component or a control that does not match the schema is treated as no playground.
 *
 * @param slug
 * @param repoRoot
 */
export const getComponentPlayground = async (
  slug: string,
  repoRoot = getRepoRoot(),
): Promise<PlaygroundFile | null> => {
  if (!isValidComponentSlug(slug)) {
    return null;
  }

  try {
    const raw = await fs.readFile(path.join(componentDirectory(slug, repoRoot), 'docs', 'playground.json'), 'utf8');

    return parsePlaygroundFile(JSON.parse(raw));
  } catch {
    return null;
  }
};
