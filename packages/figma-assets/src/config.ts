import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { AssetType, FigmaAssetsConfig, ResolvedFigmaAssetsConfig, SyncTarget } from './types';

const SUPPORTED_ASSET_TYPES: AssetType[] = ['icons', 'benefit-icons', 'illustrations'];

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const validateTarget = (target: unknown, index: number): SyncTarget => {
  if (!target || typeof target !== 'object') {
    throw new Error(`Config target at index ${index} must be an object.`);
  }

  const candidate = target as Partial<SyncTarget>;

  if (!isNonEmptyString(candidate.brand)) {
    throw new Error(`Config target at index ${index} must have a non-empty "brand".`);
  }

  if (!isNonEmptyString(candidate.out)) {
    throw new Error(`Config target at index ${index} must have a non-empty "out".`);
  }

  if (!Array.isArray(candidate.assets) || candidate.assets.length === 0) {
    throw new Error(`Config target at index ${index} must have at least one asset type.`);
  }

  const unsupportedAsset = (candidate.assets as unknown[]).find(
    (asset) => typeof asset !== 'string' || !SUPPORTED_ASSET_TYPES.includes(asset as AssetType),
  );

  if (unsupportedAsset !== undefined) {
    throw new Error(`Config target at index ${index} contains unsupported asset type "${String(unsupportedAsset)}".`);
  }

  if (new Set(candidate.assets).size !== candidate.assets.length) {
    throw new Error(`Config target at index ${index} contains duplicate asset types.`);
  }

  return {
    brand: candidate.brand.trim(),
    out: candidate.out,
    assets: candidate.assets as AssetType[],
  };
};

export const resolveConfig = (config: FigmaAssetsConfig, configPath: string): ResolvedFigmaAssetsConfig => {
  if (!isNonEmptyString(config.fileKey)) {
    throw new Error('Config must have a non-empty "fileKey".');
  }

  if (!Array.isArray(config.targets) || config.targets.length === 0) {
    throw new Error('Config must have at least one sync target.');
  }

  const configDirectory = path.dirname(path.resolve(configPath));
  const targets = config.targets.map(validateTarget).map((target) => ({
    ...target,
    out: path.resolve(configDirectory, target.out),
  }));

  const duplicateOutput = targets.find(
    (target, index) => targets.findIndex((candidate) => candidate.out === target.out) !== index,
  );

  if (duplicateOutput) {
    throw new Error(`Multiple sync targets resolve to the same output directory: ${duplicateOutput.out}`);
  }

  return {
    fileKey: config.fileKey.trim(),
    targets,
  };
};

export const loadConfig = async (configPath: string): Promise<ResolvedFigmaAssetsConfig> => {
  let parsedConfig: unknown;

  try {
    parsedConfig = JSON.parse(await readFile(configPath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read Figma assets config at ${configPath}: ${String(error)}`, { cause: error });
  }

  if (!parsedConfig || typeof parsedConfig !== 'object') {
    throw new Error(`Figma assets config at ${configPath} must contain a JSON object.`);
  }

  return resolveConfig(parsedConfig as FigmaAssetsConfig, configPath);
};
