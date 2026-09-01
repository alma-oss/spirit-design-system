import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';

import { ASSET_TYPES, CONFIG_MODULE_NAME } from './constants';
import { ConfigError } from './errors';
import type { AssetType, AssetsConfig, ResolvedAssetsConfig, SyncTarget } from './types';

const assetTypeSchema = z.enum(ASSET_TYPES);

const syncTargetSchema = z.object({
  assets: z.unknown().optional(),
  brand: z.unknown().optional(),
  out: z.unknown().optional(),
});

const assetsConfigSchema = z.object({
  fileKey: z.string(),
  targets: z.array(z.unknown()),
});

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const validateTarget = (target: unknown, index: number): SyncTarget => {
  const parsedTarget = syncTargetSchema.safeParse(target);

  if (!parsedTarget.success) {
    throw new ConfigError(`Config target at index ${index} must be an object.`);
  }

  const { brand, out, assets } = parsedTarget.data;

  if (!isNonEmptyString(brand)) {
    throw new ConfigError(`Config target at index ${index} must have a non-empty "brand".`);
  }

  if (!isNonEmptyString(out)) {
    throw new ConfigError(`Config target at index ${index} must have a non-empty "out".`);
  }

  if (!Array.isArray(assets) || assets.length === 0) {
    throw new ConfigError(`Config target at index ${index} must have at least one asset type.`);
  }

  const unsupportedAsset = assets.find((asset) => assetTypeSchema.safeParse(asset).success === false);

  if (unsupportedAsset !== undefined) {
    throw new ConfigError(
      `Config target at index ${index} contains unsupported asset type "${String(unsupportedAsset)}".`,
    );
  }

  const typedAssets = assets as AssetType[];

  if (new Set(typedAssets).size !== typedAssets.length) {
    throw new ConfigError(`Config target at index ${index} contains duplicate asset types.`);
  }

  return {
    assets: typedAssets,
    brand: brand.trim(),
    out,
  };
};

export const resolveConfig = (config: unknown, configPath: string): ResolvedAssetsConfig => {
  const parsedConfig = assetsConfigSchema.safeParse(config);

  if (!parsedConfig.success) {
    throw new ConfigError(`Assets config at ${configPath} must contain a JSON object.`);
  }

  const { fileKey, targets } = parsedConfig.data;

  if (!isNonEmptyString(fileKey)) {
    throw new ConfigError('Config must have a non-empty "fileKey".');
  }

  if (targets.length === 0) {
    throw new ConfigError('Config must have at least one sync target.');
  }

  const configDirectory = path.dirname(path.resolve(configPath));
  const resolvedTargets = targets.map(validateTarget).map((target) => ({
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
    fileKey: fileKey.trim(),
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
