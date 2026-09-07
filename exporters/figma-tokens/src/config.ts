import { readFile } from 'node:fs/promises';
import path from 'node:path';

export interface FigmaTokensConfig {
  fileKey: string;
  brand: string;
  out: string;
  snapshot: string;
  fontStacks: Record<string, string>;
}

export interface ResolvedFigmaTokensConfig extends FigmaTokensConfig {
  out: string;
  snapshot: string;
}

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const isFontStacks = (value: unknown): value is Record<string, string> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }

  return (
    Object.keys(value).length > 0 && Object.values(value).every((item) => typeof item === 'string' && item.trim().length > 0)
  );
};

export const resolveConfig = (config: FigmaTokensConfig, configPath: string): ResolvedFigmaTokensConfig => {
  if (!isNonEmptyString(config.fileKey)) {
    throw new Error('Config must have a non-empty "fileKey".');
  }

  if (!isNonEmptyString(config.brand)) {
    throw new Error('Config must have a non-empty "brand".');
  }

  if (!isNonEmptyString(config.out)) {
    throw new Error('Config must have a non-empty "out".');
  }

  if (!isNonEmptyString(config.snapshot)) {
    throw new Error('Config must have a non-empty "snapshot" path.');
  }

  if (!isFontStacks(config.fontStacks)) {
    throw new Error('Config must have a "fontStacks" object mapping Figma families to CSS stacks.');
  }

  const configDirectory = path.dirname(path.resolve(configPath));

  return {
    fileKey: config.fileKey.trim(),
    brand: config.brand.trim(),
    out: path.resolve(configDirectory, config.out),
    snapshot: path.resolve(configDirectory, config.snapshot),
    fontStacks: Object.fromEntries(
      Object.entries(config.fontStacks).map(([family, stack]) => [family, stack.trim()]),
    ),
  };
};

export const loadConfig = async (configPath: string): Promise<ResolvedFigmaTokensConfig> => {
  let parsedConfig: unknown;

  try {
    parsedConfig = JSON.parse(await readFile(configPath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read Figma tokens config at ${configPath}: ${String(error)}`, { cause: error });
  }

  if (!parsedConfig || typeof parsedConfig !== 'object') {
    throw new Error(`Figma tokens config at ${configPath} must contain a JSON object.`);
  }

  return resolveConfig(parsedConfig as FigmaTokensConfig, configPath);
};
