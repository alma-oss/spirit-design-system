import { mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CHANGE_TYPES, SVG_EXTENSION } from '../constants';
import { ConfigError } from '../errors';
import type { ExportedAsset, SyncChange, TargetSyncResult } from '../types';

type OutputEntryKind = 'directory' | 'file';

interface OutputEntry {
  kind: OutputEntryKind;
  path: string;
}

const collectOutputEntries = async (directory: string): Promise<OutputEntry[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const collected: OutputEntry[] = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      throw new ConfigError(`Output directory contains a symlink: ${entryPath}`);
    }

    if (entry.isDirectory()) {
      collected.push({ kind: 'directory', path: entryPath }, ...(await collectOutputEntries(entryPath)));

      continue;
    }

    if (!entry.isFile()) {
      throw new ConfigError(`Output directory contains an unsupported entry: ${entryPath}`);
    }

    collected.push({ kind: 'file', path: entryPath });
  }

  return collected;
};

const directoryDepth = (directoryPath: string): number => directoryPath.split(path.sep).length;

const deleteUnexpectedEntries = async (
  out: string,
  entries: OutputEntry[],
  expectedFiles: Set<string>,
): Promise<SyncChange[]> => {
  const isExpectedFile = (filePath: string): boolean =>
    path.dirname(filePath) === out && expectedFiles.has(path.basename(filePath));
  const unexpected = entries.filter((entry) => entry.kind === 'directory' || !isExpectedFile(entry.path));
  const files = unexpected.filter((entry) => entry.kind === 'file');
  const directories = unexpected
    .filter((entry) => entry.kind === 'directory')
    .sort(
      (first, second) =>
        directoryDepth(second.path) - directoryDepth(first.path) || second.path.localeCompare(first.path),
    );
  const changes: SyncChange[] = [];

  for (const file of files) {
    await unlink(file.path);
    changes.push({ file: file.path, type: CHANGE_TYPES.DELETED });
  }

  for (const directory of directories) {
    await rmdir(directory.path);
    changes.push({ file: directory.path, type: CHANGE_TYPES.DELETED });
  }

  return changes;
};

export const mirrorAssets = async (brand: string, out: string, assets: ExportedAsset[]): Promise<TargetSyncResult> => {
  const expectedFiles = new Set(assets.map(({ name }) => `${name}${SVG_EXTENSION}`));
  const changes: SyncChange[] = [];

  await mkdir(out, { recursive: true });
  const existingEntries = await collectOutputEntries(out);

  for (const asset of assets) {
    const fileName = `${asset.name}${SVG_EXTENSION}`;
    const filePath = path.join(out, fileName);
    let currentSvg: string | undefined;

    try {
      currentSvg = await readFile(filePath, 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    if (currentSvg === asset.svg) {
      continue;
    }

    await writeFile(filePath, asset.svg);
    changes.push({
      file: filePath,
      type: currentSvg === undefined ? CHANGE_TYPES.ADDED : CHANGE_TYPES.UPDATED,
    });
  }

  changes.push(...(await deleteUnexpectedEntries(out, existingEntries, expectedFiles)));

  return {
    brand,
    changes: changes.sort((first, second) => first.file.localeCompare(second.file)),
    exported: assets.length,
    out,
  };
};
