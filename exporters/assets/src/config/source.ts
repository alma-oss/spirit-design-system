import path from 'node:path';

import JSON5 from 'json5';

import { ROOT_CONFIG_FILES } from '../constants';
import { ConfigError } from '../errors';

const JSON_CONFIG_FILES = new Set(['spirit.config.json', '.spiritrc.json']);
const MODULE_CONFIG_FILES = new Set([
  'spirit.config.js',
  'spirit.config.mjs',
  'spirit.config.cjs',
  'spirit.config.ts',
  'spirit.config.cts',
  'spirit.config.mts',
]);

const extractStaticModuleObject = (configFile: string, source: string): string => {
  const modulePattern =
    configFile === 'spirit.config.cjs'
      ? /^\s*module\.exports\s*=\s*([\s\S]*?)\s*;?\s*$/u
      : /^\s*export\s+default\s+([\s\S]*?)\s*;?\s*$/u;
  const objectSource = modulePattern.exec(source)?.[1]?.trim();

  if (!objectSource?.startsWith('{') || !objectSource.endsWith('}')) {
    throw new ConfigError(
      `Assets config at ${configFile} must be a static ${configFile.endsWith('.cjs') ? 'module.exports' : 'export default'} object.`,
    );
  }

  return objectSource;
};

export const parseSpiritConfigSource = (configPath: string, source: string): unknown => {
  const configFile = path.basename(configPath);

  if (!(ROOT_CONFIG_FILES as readonly string[]).includes(configFile)) {
    throw new ConfigError(`Unsupported Spirit config file: ${configPath}`);
  }

  try {
    if (JSON_CONFIG_FILES.has(configFile)) {
      return JSON.parse(source) as unknown;
    }

    /* istanbul ignore else -- Every supported filename belongs to one parser group. */
    if (MODULE_CONFIG_FILES.has(configFile)) {
      return JSON5.parse(extractStaticModuleObject(configFile, source)) as unknown;
    }
  } catch (error) {
    if (error instanceof ConfigError) {
      throw error;
    }

    throw new ConfigError(`Unable to parse assets config at ${configPath}: ${String(error)}`, { cause: error });
  }

  /* istanbul ignore next -- ROOT_CONFIG_FILES and parser groups are kept exhaustive. */
  throw new ConfigError(`Unsupported Spirit config file: ${configPath}`);
};
