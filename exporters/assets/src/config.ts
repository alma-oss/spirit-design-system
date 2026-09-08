import { lstat, readFile } from 'node:fs/promises';
import path from 'node:path';

import { cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';

import { ASSET_TYPES, CONFIG_MODULE_NAME } from './constants';
import { ConfigError } from './errors';
import {
  assertContainedInRoot,
  assertNoSymlinkComponents,
  assertRelativeOutputPath,
  expectedRepositoryConfigPath,
} from './paths';
import type { AssetsConfig, ResolvedAssetsConfig } from './types';

export interface ResolveConfigOptions {
  repositoryRoot?: string;
}

export interface LoadConfigOptions {
  repositoryRoot?: string;
}

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
  fileKey: z
    .string()
    .trim()
    .min(1, 'must have a non-empty "fileKey"')
    .regex(/^[A-Za-z0-9_-]+$/, 'must have a valid Figma "fileKey"'),
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
        if (issue.message.includes('valid Figma')) {
          return 'Config must have a valid Figma "fileKey".';
        }

        return 'Config must have a non-empty "fileKey".';
      }

      return `Config ${issue.message}.`;
    })
    .join(' ');

export const resolveConfig = (
  config: unknown,
  configPath: string,
  options: ResolveConfigOptions = {},
): ResolvedAssetsConfig => {
  const parsedConfig = assetsConfigSchema.safeParse(config);

  if (!parsedConfig.success) {
    throw new ConfigError(describeIssues(parsedConfig.error, configPath));
  }

  const resolvedConfigPath = path.resolve(configPath);
  const repositoryRoot = options.repositoryRoot ? path.resolve(options.repositoryRoot) : undefined;

  if (repositoryRoot) {
    assertContainedInRoot(resolvedConfigPath, repositoryRoot, 'Assets config');

    if (resolvedConfigPath !== expectedRepositoryConfigPath(repositoryRoot)) {
      throw new ConfigError(`Repository assets config must be ${expectedRepositoryConfigPath(repositoryRoot)}.`);
    }
  }

  const { fileKey, targets } = parsedConfig.data;
  const configDirectory = path.dirname(resolvedConfigPath);
  const resolvedTargets = targets.map((target) => {
    assertRelativeOutputPath(target.out);

    const out = path.resolve(configDirectory, target.out);

    if (repositoryRoot) {
      assertContainedInRoot(out, repositoryRoot, 'Config target "out"');
    }

    return {
      ...target,
      out,
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
    repositoryRoot,
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

const loadRepositoryConfig = async (
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

  const config = resolveConfig(parsedConfig, resolvedConfigPath, { repositoryRoot });

  for (const target of config.targets) {
    await assertNoSymlinkComponents(repositoryRoot, target.out);
  }

  return config;
};

export const loadConfig = async (
  configPath?: string,
  options: LoadConfigOptions = {},
): Promise<ResolvedAssetsConfig> => {
  if (options.repositoryRoot) {
    return loadRepositoryConfig(configPath, options.repositoryRoot);
  }

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
