import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { exportAssets as exportFigmaAssets } from './adapters/figma';
import { CHANGE_TYPES } from './constants';
import { FigmaApiError } from './errors';
import type { ExportedAsset, SyncChange, SyncOptions, SyncResult, TargetSyncResult } from './types';

export const mirrorAssets = async (brand: string, out: string, assets: ExportedAsset[]): Promise<TargetSyncResult> => {
  const expectedFiles = new Set(assets.map(({ name }) => `${name}.svg`));
  const changes: SyncChange[] = [];

  await mkdir(out, { recursive: true });

  const currentFiles = (await readdir(out, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => entry.name);

  for (const asset of assets) {
    const fileName = `${asset.name}.svg`;
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

export const syncAssets = async ({
  config,
  exportAssets = exportFigmaAssets,
  fetch: fetchImplementation = fetch,
  token,
}: SyncOptions): Promise<SyncResult> => {
  if (!token.trim()) {
    throw new FigmaApiError('FIGMA_ACCESS_TOKEN is required.');
  }

  const targets: TargetSyncResult[] = [];

  for (const target of config.targets) {
    const exported = await exportAssets(config.fileKey, target.brand, target.assets, token, fetchImplementation);

    targets.push(await mirrorAssets(target.brand, target.out, exported));
  }

  return { targets };
};
