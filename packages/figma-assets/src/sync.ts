import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { exportAssets } from './figma';
import type { AssetType, SyncChange, SyncOptions, SyncResult, TargetSyncResult } from './types';

const syncTarget = async (
  fileKey: string,
  brand: string,
  assets: AssetType[],
  out: string,
  token: string,
  fetchImplementation: typeof fetch,
): Promise<TargetSyncResult> => {
  const icons = await exportAssets(fileKey, brand, assets, token, fetchImplementation);
  const expectedFiles = new Set(icons.map(({ name }) => `${name}.svg`));
  const changes: SyncChange[] = [];

  await mkdir(out, { recursive: true });

  const currentFiles = (await readdir(out, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith('.svg'))
    .map((entry) => entry.name);

  for (const icon of icons) {
    const fileName = `${icon.name}.svg`;
    const filePath = path.join(out, fileName);
    let currentSvg: string | undefined;

    try {
      currentSvg = await readFile(filePath, 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error;
      }
    }

    if (currentSvg === icon.svg) {
      continue;
    }

    await writeFile(filePath, icon.svg);
    changes.push({
      file: filePath,
      type: currentSvg === undefined ? 'added' : 'updated',
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
      type: 'deleted',
    });
  }

  return {
    brand,
    out,
    exported: icons.length,
    changes: changes.sort((first, second) => first.file.localeCompare(second.file)),
  };
};

export const syncAssets = async ({ config, token, fetch: fetchImplementation = fetch }: SyncOptions): Promise<SyncResult> => {
  if (!token.trim()) {
    throw new Error('FIGMA_ACCESS_TOKEN is required.');
  }

  const targets: TargetSyncResult[] = [];

  for (const target of config.targets) {
    targets.push(await syncTarget(config.fileKey, target.brand, target.assets, target.out, token, fetchImplementation));
  }

  return { targets };
};
