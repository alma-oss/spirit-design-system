import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';

import { ASSET_TYPES, CONFIG_MODULE_NAME } from './constants';
import { ConfigError } from './errors';
import type { AssetsConfig, ResolvedAssetsConfig } from './types';

const assetTypeSchema = z.enum(ASSET_TYPES);

const syncTargetSchema = z.object({
  assets: z
    .array(assetTypeSchema, { message: 'must have at least one asset type' })
    .min(1, 'must have at least one asset type')
    .refine((assets) => new Set(assets).size === assets.length, 'contains duplicate asset types'),
  brand: z.string().trim().min(1, 'must have a non-empty "brand"'),
  out: z.string().trim().min(1, 'must have a non-empty "out"'),
});

const assetsConfigSchema = z.object({
  fileKey: z.string().trim().min(1, 'must have a non-empty "fileKey"'),
  targets: z.array(syncTargetSchema).min(1, 'must have at least one sync target'),
});

const describeIssues = (error: z.ZodError, configPath: string): string =>
  error.issues
    .map((issue) => {
      if (
        issue.path.length === 0 ||
        (issue.path[0] === 'targets' && issue.path.length === 1 && issue.code === 'invalid_type')
      ) {
        return `Assets config at ${configPath} must contain a JSON object.`;
      }

      if (issue.path[0] === 'targets' && typeof issue.path[1] === 'number') {
        const target = `Config target at index ${issue.path[1]}`;
        const field = issue.path[2];

        if (issue.path.length === 2) {
          return `${target} must be an object.`;
        }

        if (field === 'assets') {
          if (issue.path.length > 3) {
            return `${target} contains unsupported asset type.`;
          }

          return `${target} ${issue.message}.`;
        }

        if (field === 'brand') {
          return `${target} must have a non-empty "brand".`;
        }

        return `${target} must have a non-empty "out".`;
      }

      if (issue.path[0] === 'fileKey') {
        return 'Config must have a non-empty "fileKey".';
      }

      return `Config ${issue.message}.`;
    })
    .join(' ');

export const resolveConfig = (config: unknown, configPath: string): ResolvedAssetsConfig => {
  const parsedConfig = assetsConfigSchema.safeParse(config);

  if (!parsedConfig.success) {
    throw new ConfigError(describeIssues(parsedConfig.error, configPath));
  }

  const { fileKey, targets } = parsedConfig.data;
  const configDirectory = path.dirname(path.resolve(configPath));
  const resolvedTargets = targets.map((target) => ({
    ...target,
    out: path.resolve(configDirectory, target.out),
  }));

  const duplicateOutput = resolvedTargets.find(
    (target, index) => resolvedTargets.findIndex((candidate) => candidate.out === target.out) !== index,
  );

  if (duplicateOutput) {
    throw new ConfigError(`Multiple sync targets resolve to the same output directory: ${duplicateOutput.out}`);
  }

  return {
    fileKey,
    targets: resolvedTargets,
  };
};

export const loadConfig = async (configPath?: string): Promise<ResolvedAssetsConfig> => {
  const explorer = cosmiconfig(CONFIG_MODULE_NAME, {
    cache: false,
    searchPlaces: [
      'package.json',
      `.${CONFIG_MODULE_NAME}rc`,
      `.${CONFIG_MODULE_NAME}rc.json`,
      `${CONFIG_MODULE_NAME}.config.json`,
      `${CONFIG_MODULE_NAME}.config.js`,
      `${CONFIG_MODULE_NAME}.config.cjs`,
      `${CONFIG_MODULE_NAME}.config.mjs`,
      `${CONFIG_MODULE_NAME}.config.ts`,
    ],
  });

  try {
    const result = configPath ? await explorer.load(path.resolve(configPath)) : await explorer.search();

    if (!result) {
      throw new ConfigError('Unable to find a spirit-assets configuration file.');
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

export type { AssetsConfig };
