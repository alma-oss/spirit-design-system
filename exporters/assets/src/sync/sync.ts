import { FigmaApiError } from '../errors';
import { assertContainedInRoot, assertNoSymlinkComponents } from '../repository/paths';
import type { SyncOptions, SyncResult, TargetSyncResult } from '../types';
import { exportAssets as exportFigmaAssets } from './adapters/figma';
import { mirrorAssets } from './mirror';

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
    if (config.repositoryRoot) {
      assertContainedInRoot(target.out, config.repositoryRoot, 'Config target "out"');
      await assertNoSymlinkComponents(config.repositoryRoot, target.out);
    }

    const exported = await exportAssets(config.fileKey, target.brand, target.assets, token, fetchImplementation);

    targets.push(await mirrorAssets(target.brand, target.out, exported));
  }

  return { targets };
};
