import { lstat, readFile } from 'node:fs/promises';
import path from 'node:path';

import { resolveConfig } from '../config/resolve';
import { ConfigError } from '../errors';
import type { ResolvedAssetsConfig } from '../types';
import { assertContainedInRoot, assertNoSymlinkComponents, expectedRepositoryConfigPath } from './paths';

export const confineConfig = (config: ResolvedAssetsConfig, repositoryRoot: string): ResolvedAssetsConfig => {
  const resolvedRoot = path.resolve(repositoryRoot);
  const resolvedConfigPath = config.configPath ? path.resolve(config.configPath) : '';

  if (!resolvedConfigPath) {
    throw new ConfigError('Unable to confine a config without a configuration path.');
  }

  assertContainedInRoot(resolvedConfigPath, resolvedRoot, 'Assets config');

  if (resolvedConfigPath !== expectedRepositoryConfigPath(resolvedRoot)) {
    throw new ConfigError(`Repository assets config must be ${expectedRepositoryConfigPath(resolvedRoot)}.`);
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
  const expectedPath = expectedRepositoryConfigPath(repositoryRoot);
  const resolvedConfigPath = path.resolve(configPath ?? expectedPath);

  if (resolvedConfigPath !== expectedPath) {
    throw new ConfigError(`Repository assets config must be ${expectedPath}.`);
  }

  let stats;

  try {
    stats = await lstat(resolvedConfigPath);
  } catch (error) {
    throw new ConfigError(`Unable to read assets config at ${resolvedConfigPath}: ${String(error)}`, { cause: error });
  }

  if (stats.isSymbolicLink()) {
    throw new ConfigError(`Assets config at ${resolvedConfigPath} must not be a symlink.`);
  }

  let parsedConfig: unknown;

  try {
    parsedConfig = JSON.parse(await readFile(resolvedConfigPath, 'utf8')) as unknown;
  } catch (error) {
    throw new ConfigError(`Unable to read assets config at ${resolvedConfigPath}: ${String(error)}`, { cause: error });
  }

  const config = confineConfig(resolveConfig(parsedConfig, resolvedConfigPath), repositoryRoot);

  for (const target of config.targets) {
    await assertNoSymlinkComponents(repositoryRoot, target.out);
  }

  return config;
};
