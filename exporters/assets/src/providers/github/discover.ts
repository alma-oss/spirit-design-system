import { DISCOVERY_CONCURRENCY, ROOT_CONFIG_FILE } from '../../constants';
import { ConfigError } from '../../errors';
import { tryParseOptInConfig } from '../../repository/optIn';
import { toTargetSlug } from '../../repository/paths';
import { createGitHubApp, listAppRepositories, type GitHubAppLike, type ListedRepository } from './app';
import { readRepositoryConfigFile, type ReadConfigFile } from './contents';
import type { DiscoverMatrix, DiscoverTarget } from './output';
import { mapPool } from './pool';
import { hasUniqueGitBranches, resolveGitTemplates } from './templates';

export interface DiscoverSyncTargetsOptions {
  appId?: string;
  concurrency?: number;
  createApp?: (appId: string, privateKey: string) => GitHubAppLike;
  fileKey?: string;
  listRepositories?: () => AsyncIterable<ListedRepository>;
  log?: (message: string) => void;
  privateKey?: string;
  readConfigFile?: ReadConfigFile;
}

const inspectRepository = async (
  repository: ListedRepository,
  {
    fileKey,
    log,
    readConfigFile,
  }: {
    fileKey?: string;
    log: (message: string) => void;
    readConfigFile: ReadConfigFile;
  },
): Promise<DiscoverTarget[]> => {
  if (repository.archived || repository.disabled) {
    log(`Skipping ${repository.owner}/${repository.name}: repository is archived or disabled.`);

    return [];
  }

  if (!repository.token) {
    log(`Skipping ${repository.owner}/${repository.name}: installation token was not available.`);

    return [];
  }

  try {
    const contents = await readConfigFile(repository);

    if (contents === null) {
      log(`Skipping ${repository.owner}/${repository.name}: no ${ROOT_CONFIG_FILE}.`);

      return [];
    }

    let parsedConfig: unknown;

    try {
      parsedConfig = JSON.parse(contents) as unknown;
    } catch (error) {
      log(`Skipping ${repository.owner}/${repository.name}: unable to read ${ROOT_CONFIG_FILE}: ${String(error)}`);

      return [];
    }

    const optIn = tryParseOptInConfig(parsedConfig);

    if ('error' in optIn) {
      log(`Skipping ${repository.owner}/${repository.name}: ${optIn.error}`);

      return [];
    }

    if (fileKey && optIn.config.fileKey !== fileKey) {
      log(`Skipping ${repository.owner}/${repository.name}: fileKey does not match the published Figma file.`);

      return [];
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

      return [];
    }

    return resolvedTargets;
  } catch (error) {
    log(`Skipping ${repository.owner}/${repository.name}: ${error instanceof Error ? error.message : String(error)}`);

    return [];
  }
};

export const discoverSyncTargets = async ({
  appId,
  concurrency = DISCOVERY_CONCURRENCY,
  createApp = createGitHubApp,
  fileKey,
  listRepositories,
  log = () => undefined,
  privateKey,
  readConfigFile = readRepositoryConfigFile,
}: DiscoverSyncTargetsOptions = {}): Promise<DiscoverMatrix> => {
  const repositories =
    listRepositories ??
    (() => {
      if (!appId?.trim() || !privateKey?.trim()) {
        throw new ConfigError('GH_APP_CLIENT_ID and GH_APP_PRIVATE_KEY are required.');
      }

      return listAppRepositories(createApp(appId, privateKey));
    });

  const inspected = await mapPool(repositories(), concurrency, (repository) =>
    inspectRepository(repository, { fileKey, log, readConfigFile }),
  );

  return { include: inspected.flat() };
};
