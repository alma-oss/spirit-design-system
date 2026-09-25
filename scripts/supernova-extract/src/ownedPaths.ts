import fs from 'node:fs/promises';
import path from 'node:path';

export interface OwnedPathsFile {
  generatedAt: string;
  paths: string[];
}

const COMPONENT_DOC_PATTERN =
  /^packages\/web-react\/src\/components\/(?:[A-Z][A-Za-z0-9]*|UNSTABLE_[A-Z][A-Za-z0-9]*)\/docs\/(?:overview|design|accessibility|figma)\.md$/u;
const GENERAL_DOC_PATTERN = /^docs\/(?:introduction|design|development)\/.+\.md$/u;

export const isAllowedOwnedPath = (relativePath: string): boolean => {
  const normalized = relativePath.split(path.sep).join('/');

  if (normalized !== path.posix.normalize(normalized) || normalized.startsWith('/') || normalized.includes('../')) {
    return false;
  }

  return (
    COMPONENT_DOC_PATTERN.test(normalized) ||
    GENERAL_DOC_PATTERN.test(normalized) ||
    normalized === 'docs/migrations/index.md'
  );
};

export const resolveOwnedPath = (repoRoot: string, relativePath: string): string => {
  if (!isAllowedOwnedPath(relativePath)) {
    throw new Error(`Refusing path outside Canonical Page destinations: ${relativePath}`);
  }

  const resolvedRoot = path.resolve(repoRoot);
  const resolved = path.resolve(resolvedRoot, relativePath);

  if (!resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing path outside repository root: ${relativePath}`);
  }

  return resolved;
};

export async function readOwnedPaths(filePath: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(raw) as OwnedPathsFile;

    return Array.isArray(parsed.paths) ? parsed.paths : [];
  } catch {
    return [];
  }
}

export async function writeOwnedPaths(filePath: string, paths: string[]): Promise<void> {
  const payload: OwnedPathsFile = {
    generatedAt: new Date().toISOString(),
    paths: [...paths].sort(),
  };

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
}

/**
 * Delete previously owned files that are no longer in the new extract.
 * Never deletes a path that was not in `previousOwned`.
 */
export async function deleteStaleOwnedPaths(
  repoRoot: string,
  previousOwned: string[],
  nextOwned: Set<string>,
): Promise<string[]> {
  const deleted: string[] = [];

  for (const relativePath of previousOwned) {
    if (nextOwned.has(relativePath)) {
      continue;
    }

    const abs = resolveOwnedPath(repoRoot, relativePath);

    await fs.rm(abs, { force: true });
    deleted.push(relativePath);
  }

  return deleted;
}

export async function removeStagingDump(repoRoot: string): Promise<void> {
  await fs.rm(path.join(repoRoot, 'apps/docsite/content/supernova'), { recursive: true, force: true });
}
