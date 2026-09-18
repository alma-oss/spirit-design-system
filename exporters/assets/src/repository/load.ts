import { lstat, readFile } from 'node:fs/promises';
import path from 'node:path';

import { parseSpiritConfigSource } from '../config/source';
import { resolveConfig } from '../config/resolve';
import { ConfigError } from '../errors';
import type { ResolvedAssetsConfig } from '../types';
import { assertContainedInRoot, assertNoSymlinkComponents, expectedRepositoryConfigPaths } from './paths';

export const confineConfig = (config: ResolvedAssetsConfig, repositoryRoot: string): ResolvedAssetsConfig => {
  const resolvedRoot = path.resolve(repositoryRoot);
  const resolvedConfigPath = path.resolve(config.configPath);

  assertContainedInRoot(resolvedConfigPath, resolvedRoot, 'Assets config');

  const allowedConfigPaths = expectedRepositoryConfigPaths(resolvedRoot);

  if (!allowedConfigPaths.includes(resolvedConfigPath)) {
    throw new ConfigError(`Repository assets config must be one of: ${allowedConfigPaths.join(', ')}.`);
  }

  config.targets.forEach((target) => {
    assertContainedInRoot(target.out, resolvedRoot, 'Config target "out"');
  });

  return {
    ...config,
    repositoryRoot: resolvedRoot,
  };
};

export const loadRepositoryConfig = async (
  configPath: string | undefined,
  repositoryRoot: string,
): Promise<ResolvedAssetsConfig> => {
  const expectedPaths = expectedRepositoryConfigPaths(repositoryRoot);
  const requestedPath = configPath ? path.resolve(configPath) : undefined;

  if (requestedPath && !expectedPaths.includes(requestedPath)) {
    throw new ConfigError(`Repository assets config must be one of: ${expectedPaths.join(', ')}.`);
  }

  let resolvedConfigPath: string | undefined;
  let stats: Awaited<ReturnType<typeof lstat>> | undefined;

  for (const candidatePath of requestedPath ? [requestedPath] : expectedPaths) {
    try {
      stats = await lstat(candidatePath);
      resolvedConfigPath = candidatePath;
      break;
    } catch (error) {
      if (!requestedPath && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue;
      }

      throw new ConfigError(`Unable to read assets config at ${candidatePath}: ${String(error)}`, { cause: error });
    }
  }

  if (!resolvedConfigPath || !stats) {
    throw new ConfigError(
      `Unable to read assets config: no supported Spirit configuration at ${path.resolve(repositoryRoot)}.`,
    );
  }

  if (stats.isSymbolicLink()) {
    throw new ConfigError(`Assets config at ${resolvedConfigPath} must not be a symlink.`);
  }

  let parsedConfig: unknown;

  try {
    parsedConfig = parseSpiritConfigSource(resolvedConfigPath, await readFile(resolvedConfigPath, 'utf8'));
  } catch (error) {
    throw new ConfigError(`Unable to read assets config at ${resolvedConfigPath}: ${String(error)}`, { cause: error });
  }

  const config = confineConfig(resolveConfig(parsedConfig, resolvedConfigPath), repositoryRoot);

  for (const target of config.targets) {
    await assertNoSymlinkComponents(repositoryRoot, target.out);
  }

  return config;
};
