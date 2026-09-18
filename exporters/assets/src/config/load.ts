import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';

import { CONFIG_MODULE_NAME, ROOT_CONFIG_FILE, ROOT_CONFIG_FILES } from '../constants';
import { ConfigError } from '../errors';
import { loadRepositoryConfig } from '../repository/load';
import type { ResolvedAssetsConfig } from '../types';
import { resolveConfig } from './resolve';
import { parseSpiritConfigSource } from './source';

export interface LoadConfigOptions {
  repositoryRoot?: string;
}

export const loadConfig = async (
  configPath?: string,
  options: LoadConfigOptions = {},
): Promise<ResolvedAssetsConfig> => {
  if (options.repositoryRoot) {
    return loadRepositoryConfig(configPath, options.repositoryRoot);
  }

  const explorer = cosmiconfig(CONFIG_MODULE_NAME, {
    cache: false,
    loaders: {
      '.cjs': parseSpiritConfigSource,
      '.cts': parseSpiritConfigSource,
      '.js': parseSpiritConfigSource,
      '.mjs': parseSpiritConfigSource,
      '.mts': parseSpiritConfigSource,
      '.ts': parseSpiritConfigSource,
    },
    searchPlaces: [ROOT_CONFIG_FILE, 'package.json', `.${CONFIG_MODULE_NAME}rc`, ...ROOT_CONFIG_FILES.slice(1)],
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

    throw new ConfigError(`Unable to read assets config${configPath ? ` at ${configPath}` : ''}: ${String(error)}`, {
      cause: error,
    });
  }
};
