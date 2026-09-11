import fs from 'node:fs/promises';
import path from 'node:path';

export interface OwnedPathsFile {
  generatedAt: string;
  paths: string[];
}

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
  contentRoot: string,
  previousOwned: string[],
  nextOwned: Set<string>,
): Promise<string[]> {
  const deleted: string[] = [];

  for (const relativePath of previousOwned) {
    if (nextOwned.has(relativePath)) {
      continue;
    }

    const abs = path.join(contentRoot, relativePath);

    await fs.rm(abs, { force: true });
    deleted.push(relativePath);
  }

  return deleted;
}

export async function removeStagingDump(contentRoot: string): Promise<void> {
  await fs.rm(path.join(contentRoot, 'supernova'), { recursive: true, force: true });
}
