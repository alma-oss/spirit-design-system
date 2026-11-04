import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';

import { CONFIG_MODULE_NAME, ROOT_CONFIG_FILE } from '../constants';
import { ConfigError } from '../errors';
import type { ResolvedTokensConfig } from '../types';
import { parseTokensConfig } from './schema';

export const resolveConfig = (config: unknown, configPath: string): ResolvedTokensConfig => {
  const { sources } = parseTokensConfig(config, configPath);
  const resolvedConfigPath = path.resolve(configPath);
  const configDirectory = path.dirname(resolvedConfigPath);
  const resolvedSources = sources.map((source) => ({
    ...source,
    out: path.resolve(configDirectory, source.out),
  }));
  const duplicateOutput = resolvedSources.find(
    (source, index) => resolvedSources.findIndex((candidate) => candidate.out === source.out) !== index,
  );

  if (duplicateOutput) {
    throw new ConfigError(`Multiple token sources resolve to the same output directory: ${duplicateOutput.out}`);
  }

  return {
    configPath: resolvedConfigPath,
    sources: resolvedSources,
  };
};

export const filterSources = (config: ResolvedTokensConfig, brand?: string): ResolvedTokensConfig => {
  if (brand === undefined) {
    return config;
  }

  const sources = config.sources.filter((source) => source.brand === brand);

  if (sources.length === 0) {
    throw new ConfigError(`Unable to find a token source for brand=${brand}.`);
  }

  return {
    ...config,
    sources,
  };
};

export const loadConfig = async (configPath?: string): Promise<ResolvedTokensConfig> => {
  const explorer = cosmiconfig(CONFIG_MODULE_NAME, {
    cache: false,
    searchPlaces: [ROOT_CONFIG_FILE, `.${CONFIG_MODULE_NAME}rc.json`],
  });

  try {
    const result = configPath ? await explorer.load(path.resolve(configPath)) : await explorer.search();

    if (!result) {
      throw new ConfigError('Unable to find a Spirit configuration file.');
    }

    return resolveConfig(result.config, result.filepath);
  } catch (error) {
    if (error instanceof ConfigError) {
      throw error;
    }

    throw new ConfigError(`Unable to read tokens config${configPath ? ` at ${configPath}` : ''}: ${String(error)}`, {
      cause: error,
    });
  }
};
