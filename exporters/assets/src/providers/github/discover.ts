import { parseSpiritConfigSource } from '../../config';
import { DISCOVERY_CONCURRENCY, DISCOVERY_TARGET_LIMIT } from '../../constants';
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
  redact?: boolean;
}

const inspectRepository = async (
  repository: ListedRepository,
  {
    fileKey,
    log,
    readConfigFile,
    redact,
  }: {
    fileKey?: string;
    log: (message: string) => void;
    readConfigFile: ReadConfigFile;
    redact: boolean;
  },
): Promise<DiscoverTarget[]> => {
  const repositoryLabel = redact ? 'repository' : `${repository.owner}/${repository.name}`;

  if (repository.archived || repository.disabled) {
    log(`Skipping ${repositoryLabel}: repository is archived or disabled.`);

    return [];
  }

  if (!repository.token) {
    log(`Skipping ${repositoryLabel}: installation token was not available.`);

    return [];
  }

  let configFile;

  try {
    configFile = await readConfigFile(repository);
  } catch (error) {
    /* istanbul ignore if -- Config file reads reject with Error instances. */
    if (!(error instanceof Error)) {
      log(`Skipping ${repositoryLabel}: unable to read Spirit configuration.`);

      return [];
    }

    log(
      redact
        ? `Skipping ${repositoryLabel}: unable to read Spirit configuration.`
        : `Skipping ${repositoryLabel}: ${error.message}`,
    );

    return [];
  }

  if (configFile === null) {
    log(`Skipping ${repositoryLabel}: no supported Spirit configuration.`);

    return [];
  }

  let parsedConfig: unknown;

  try {
    parsedConfig = parseSpiritConfigSource(configFile.path, configFile.contents);
  } catch {
    log(`Skipping ${repositoryLabel}: ${configFile.path} contains invalid static configuration.`);

    return [];
  }

  const optIn = tryParseOptInConfig(parsedConfig, configFile.path);

  if ('error' in optIn) {
    log(`Skipping ${repositoryLabel}: ${optIn.error}`);

    return [];
  }

  if (fileKey && optIn.config.fileKey !== fileKey) {
    log(`Skipping ${repositoryLabel}: fileKey does not match the published Figma file.`);

    return [];
  }

  let resolvedTargets: DiscoverTarget[];

  try {
    resolvedTargets = optIn.config.targets.map((target) => {
      const slug = toTargetSlug(`${repository.name}-${target.out}`);
      const templates = resolveGitTemplates(optIn.config, target, {
        brand: target.brand,
        out: target.out,
        owner: repository.owner,
        repo: repository.name,
        slug,
      });

      return {
        base: repository.defaultBranch,
        brand: target.brand,
        configFile: configFile.path,
        ref: configFile.ref,
        out: target.out,
        owner: repository.owner,
        repo: repository.name,
        slug,
        ...templates,
      };
    });
  } catch (error) {
    /* istanbul ignore if -- Resolved schema values can only produce ConfigError here. */
    if (!(error instanceof ConfigError)) {
      throw error;
    }

    log(
      redact
        ? `Skipping ${repositoryLabel}: invalid Git template configuration.`
        : `Skipping ${repositoryLabel}: ${error.message}`,
    );

    return [];
  }

  if (!hasUniqueGitBranches(resolvedTargets)) {
    log(`Skipping ${repositoryLabel}: resolved git branches are not unique.`);

    return [];
  }

  return resolvedTargets;
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
  redact = false,
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
    inspectRepository(repository, { fileKey, log, readConfigFile, redact }),
  );
  const include = inspected.flat();

  if (include.length > DISCOVERY_TARGET_LIMIT) {
    throw new ConfigError(
      `Discovered ${include.length} sync targets, exceeding the limit of ${DISCOVERY_TARGET_LIMIT} per run.`,
    );
  }

  return { include };
};
