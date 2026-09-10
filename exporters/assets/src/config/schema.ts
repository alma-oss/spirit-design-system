import { z } from 'zod';

import { ASSET_TYPES, GIT_TEMPLATE_PLACEHOLDERS } from '../constants';
import { ConfigError } from '../errors';
import type { AssetsConfig } from '../types';

const assetTypeSchema = z.enum(ASSET_TYPES);

const GIT_TEMPLATE_FIELDS = ['branch', 'commitMessage', 'pullRequestTitle'] as const;

const gitTemplateStringSchema = (field: (typeof GIT_TEMPLATE_FIELDS)[number]) =>
  z
    .string()
    .trim()
    .min(1, `must have a non-empty "${field}"`)
    .refine((value) => {
      const tokens = [...value.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);

      return tokens.every((token) => (GIT_TEMPLATE_PLACEHOLDERS as readonly string[]).includes(token));
    }, 'contains an unknown placeholder');

const gitTemplateFieldsSchema = z.object({
  branch: gitTemplateStringSchema('branch').optional(),
  commitMessage: gitTemplateStringSchema('commitMessage').optional(),
  pullRequestTitle: gitTemplateStringSchema('pullRequestTitle').optional(),
});

const syncTargetSchema = gitTemplateFieldsSchema.extend({
  assets: z
    .array(assetTypeSchema, { message: 'must have at least one asset type' })
    .min(1, 'must have at least one asset type')
    .refine((assets) => new Set(assets).size === assets.length, 'contains duplicate asset types'),
  brand: z.string().trim().min(1, 'must have a non-empty "brand"'),
  out: z.string().trim().min(1, 'must have a non-empty "out"'),
});

export const assetsConfigSchema = gitTemplateFieldsSchema.extend({
  fileKey: z
    .string()
    .trim()
    .min(1, 'must have a non-empty "fileKey"')
    .regex(/^[A-Za-z0-9_-]+$/, 'must have a valid Figma "fileKey"'),
  targets: z.array(syncTargetSchema).min(1, 'must have at least one sync target'),
});

export const spiritConfigSchema = z
  .object({
    assets: z.unknown().optional(),
  })
  .passthrough();

export const describeConfigIssues = (error: z.ZodError, configPath: string): string =>
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

        if (GIT_TEMPLATE_FIELDS.includes(field as (typeof GIT_TEMPLATE_FIELDS)[number])) {
          if (issue.message.includes('unknown placeholder')) {
            return `${target} contains an unknown placeholder.`;
          }

          return `${target} must have a non-empty "${String(field)}".`;
        }

        return `${target} must have a non-empty "out".`;
      }

      if (GIT_TEMPLATE_FIELDS.includes(issue.path[0] as (typeof GIT_TEMPLATE_FIELDS)[number])) {
        if (issue.message.includes('unknown placeholder')) {
          return 'Config contains an unknown placeholder.';
        }

        return `Config must have a non-empty "${String(issue.path[0])}".`;
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

export const readAssetsSection = (config: unknown, configPath: string): { assets: unknown } | { error: string } => {
  const parsedConfig = spiritConfigSchema.safeParse(config);

  if (!parsedConfig.success) {
    return { error: `Spirit config at ${configPath} must contain a JSON object.` };
  }

  if (parsedConfig.data.assets === undefined) {
    return { error: `Spirit config at ${configPath} must contain an "assets" object.` };
  }

  return { assets: parsedConfig.data.assets };
};

export const parseAssetsConfig = (config: unknown, configPath: string): AssetsConfig => {
  const section = readAssetsSection(config, configPath);

  if ('error' in section) {
    throw new ConfigError(section.error);
  }

  const parsedConfig = assetsConfigSchema.safeParse(section.assets);

  if (!parsedConfig.success) {
    throw new ConfigError(describeConfigIssues(parsedConfig.error, configPath));
  }

  return parsedConfig.data;
};
