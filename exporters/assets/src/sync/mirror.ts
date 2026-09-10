import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CHANGE_TYPES, SVG_EXTENSION } from '../constants';
import type { ExportedAsset, SyncChange, TargetSyncResult } from '../types';

export const mirrorAssets = async (brand: string, out: string, assets: ExportedAsset[]): Promise<TargetSyncResult> => {
  const expectedFiles = new Set(assets.map(({ name }) => `${name}${SVG_EXTENSION}`));
  const changes: SyncChange[] = [];

  await mkdir(out, { recursive: true });

  const currentFiles = (await readdir(out, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(SVG_EXTENSION))
    .map((entry) => entry.name);

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

  for (const fileName of currentFiles) {
    if (expectedFiles.has(fileName)) {
      continue;
    }

    const filePath = path.join(out, fileName);
    await unlink(filePath);
    changes.push({
      file: filePath,
      type: CHANGE_TYPES.DELETED,
    });
  }

  return {
    brand,
    changes: changes.sort((first, second) => first.file.localeCompare(second.file)),
    exported: assets.length,
    out,
  };
};
