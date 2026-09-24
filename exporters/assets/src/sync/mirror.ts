import type { Dirent } from 'node:fs';
import { mkdir, readdir, readFile, rmdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CHANGE_TYPES, SVG_EXTENSION } from '../constants';
import { ConfigError } from '../errors';
import type { ExportedAsset, SyncChange, TargetSyncResult } from '../types';

const assertNoSymlinks = async (directory: string): Promise<void> => {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isSymbolicLink()) {
      throw new ConfigError(`Output directory contains a symlink: ${entryPath}`);
    }

    if (entry.isDirectory()) {
      await assertNoSymlinks(entryPath);
    }
  }
};

const removeUnexpectedEntry = async (entryPath: string, entry: Dirent, changes: SyncChange[]): Promise<void> => {
  if (entry.isDirectory()) {
    const children = await readdir(entryPath, { withFileTypes: true });

    for (const child of children) {
      await removeUnexpectedEntry(path.join(entryPath, child.name), child, changes);
    }

    await rmdir(entryPath);

    return;
  }

  if (!entry.isFile()) {
    throw new ConfigError(`Output directory contains an unsupported entry: ${entryPath}`);
  }

  await unlink(entryPath);
  changes.push({ file: entryPath, type: CHANGE_TYPES.DELETED });
};

export const mirrorAssets = async (brand: string, out: string, assets: ExportedAsset[]): Promise<TargetSyncResult> => {
  const expectedFiles = new Set(assets.map(({ name }) => `${name}${SVG_EXTENSION}`));
  const changes: SyncChange[] = [];

  await mkdir(out, { recursive: true });
  await assertNoSymlinks(out);

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

  const entries = await readdir(out, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && expectedFiles.has(entry.name)) {
      continue;
    }

    await removeUnexpectedEntry(path.join(out, entry.name), entry, changes);
  }

  return {
    brand,
    changes: changes.sort((first, second) => first.file.localeCompare(second.file)),
    exported: assets.length,
    out,
  };
};
