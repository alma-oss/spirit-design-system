import path from 'node:path';

import { ConfigError } from '../errors';
import type { ResolvedAssetsConfig } from '../types';
import { assertRelativeOutputPath } from './paths';
import { parseAssetsConfig } from './schema';

export const resolveConfig = (config: unknown, configPath: string): ResolvedAssetsConfig => {
  const { fileKey, targets } = parseAssetsConfig(config, configPath);
  const resolvedConfigPath = path.resolve(configPath);
  const configDirectory = path.dirname(resolvedConfigPath);
  const resolvedTargets = targets.map((target) => {
    assertRelativeOutputPath(target.out);

    return {
      ...target,
      out: path.resolve(configDirectory, target.out),
    };
  });

  const duplicateOutput = resolvedTargets.find(
    (target, index) => resolvedTargets.findIndex((candidate) => candidate.out === target.out) !== index,
  );

  if (duplicateOutput) {
    throw new ConfigError(`Multiple sync targets resolve to the same output directory: ${duplicateOutput.out}`);
  }

  return {
    configPath: resolvedConfigPath,
    fileKey,
    targets: resolvedTargets,
  };
};

export const filterTargets = (config: ResolvedAssetsConfig, brand?: string, out?: string): ResolvedAssetsConfig => {
  if (brand === undefined && out === undefined) {
    return config;
  }

  if (!brand || !out) {
    throw new ConfigError('--brand and --out must be used together.');
  }

  if (!config.configPath) {
    throw new ConfigError('Unable to match a sync target without a configuration path.');
  }

  const resolvedOut = path.resolve(path.dirname(config.configPath), out);
  const matched = config.targets.filter((target) => target.brand === brand && target.out === resolvedOut);

  if (matched.length !== 1) {
    throw new ConfigError(`Unable to find a sync target for brand=${brand} out=${out}.`);
  }

  return {
    ...config,
    targets: matched,
  };
};
