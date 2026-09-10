import { access, mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { ROOT_CONFIG_FILE } from '../../constants';
import { ConfigError } from '../../errors';
import { tryParseOptInConfig } from '../../repository/optIn';
import { toTargetSlug } from '../../repository/paths';
import { createGitHubApp, listAppRepositories, type GitHubAppLike, type ListedRepository } from './app';
import { sparseCheckoutRepository } from './checkout';
import type { DiscoverMatrix, DiscoverTarget } from './output';
import { hasUniqueGitBranches, resolveGitTemplates } from './templates';

export interface DiscoverSyncTargetsOptions {
  appId?: string;
  checkoutRepository?: (repository: ListedRepository, directory: string) => Promise<void>;
  createApp?: (appId: string, privateKey: string) => GitHubAppLike;
  fileKey?: string;
  listRepositories?: () => AsyncIterable<ListedRepository>;
  log?: (message: string) => void;
  privateKey?: string;
}

export const discoverSyncTargets = async ({
  appId,
  checkoutRepository = sparseCheckoutRepository,
  createApp = createGitHubApp,
  fileKey,
  listRepositories,
  log = () => undefined,
  privateKey,
}: DiscoverSyncTargetsOptions = {}): Promise<DiscoverMatrix> => {
  const repositories =
    listRepositories ??
    (() => {
      if (!appId?.trim() || !privateKey?.trim()) {
        throw new ConfigError('GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required.');
      }

      return listAppRepositories(createApp(appId, privateKey));
    });

  const include: DiscoverTarget[] = [];

  for await (const repository of repositories()) {
    if (repository.archived || repository.disabled) {
      log(`Skipping ${repository.owner}/${repository.name}: repository is archived or disabled.`);
      continue;
    }

    if (!repository.token) {
      log(`Skipping ${repository.owner}/${repository.name}: installation token was not available.`);
      continue;
    }

    const directory = await mkdtemp(path.join(os.tmpdir(), 'spirit-assets-discover-'));

    try {
      await checkoutRepository(repository, directory);
      const configPath = path.join(directory, ROOT_CONFIG_FILE);

      try {
        await access(configPath);
      } catch {
        log(`Skipping ${repository.owner}/${repository.name}: no ${ROOT_CONFIG_FILE}.`);
        continue;
      }

      let parsedConfig: unknown;

      try {
        parsedConfig = JSON.parse(await readFile(configPath, 'utf8')) as unknown;
      } catch (error) {
        log(`Skipping ${repository.owner}/${repository.name}: unable to read ${ROOT_CONFIG_FILE}: ${String(error)}`);
        continue;
      }

      const optIn = tryParseOptInConfig(parsedConfig);

      if ('error' in optIn) {
        log(`Skipping ${repository.owner}/${repository.name}: ${optIn.error}`);
        continue;
      }

      if (fileKey && optIn.config.fileKey !== fileKey) {
        log(`Skipping ${repository.owner}/${repository.name}: fileKey does not match the published Figma file.`);
        continue;
      }

      const resolvedTargets: DiscoverTarget[] = optIn.config.targets.map((target) => {
        const slug = toTargetSlug(`${repository.name}-${target.out}`);
        const templates = resolveGitTemplates(optIn.config, target, {
          brand: target.brand,
          out: target.out,
          owner: repository.owner,
          repo: repository.name,
          slug,
        });

        return {
          brand: target.brand,
          fileKey: optIn.config.fileKey,
          out: target.out,
          owner: repository.owner,
          repo: repository.name,
          slug,
          ...templates,
        };
      });

      if (!hasUniqueGitBranches(resolvedTargets)) {
        log(`Skipping ${repository.owner}/${repository.name}: resolved git branches are not unique.`);
        continue;
      }

      include.push(...resolvedTargets);
    } catch (error) {
      log(`Skipping ${repository.owner}/${repository.name}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }

  return { include };
};
