import { z } from 'zod';

import { ConfigError } from '../errors';
import type { TokensConfig } from '../types';
import { assertRelativeOutputPath } from './paths';

const SAFE_BRAND_PATTERN = /^[^\p{Cc}\p{Cf}]+$/u;
const SAFE_OUTPUT_PATH_PATTERN = /^[\p{L}\p{N} ._/-]+$/u;

const fontStacksSchema = z
  .record(z.string(), z.string().trim().min(1, 'must map every font family to a non-empty stack'))
  .refine((stacks) => Object.keys(stacks).length > 0, 'must have a non-empty "fontStacks" object');

const sourceSchema = z.object({
  brand: z
    .string()
    .trim()
    .min(1, 'must have a non-empty "brand"')
    .regex(SAFE_BRAND_PATTERN, 'must contain only safe characters in "brand"'),
  fileKey: z
    .string()
    .trim()
    .min(1, 'must have a non-empty "fileKey"')
    .regex(/^[A-Za-z0-9_-]+$/, 'must have a valid Figma "fileKey"'),
  fontStacks: fontStacksSchema,
  out: z
    .string()
    .trim()
    .min(1, 'must have a non-empty "out"')
    .regex(SAFE_OUTPUT_PATH_PATTERN, 'must contain only safe characters in "out"'),
});

export const tokensConfigSchema = z.object({
  sources: z.array(sourceSchema).min(1, 'must have at least one token source'),
});

const spiritConfigSchema = z
  .object({
    tokens: z.unknown().optional(),
  })
  .passthrough();

const describeConfigIssues = (error: z.ZodError, configPath: string): string =>
  error.issues
    .map((issue) => {
      if (issue.path[0] === 'sources' && typeof issue.path[1] === 'number') {
        const source = `Config source at index ${issue.path[1]}`;
        const field = issue.path[2];

        if (issue.path.length === 2) {
          return `${source} must be an object.`;
        }

        if (field === 'fileKey') {
          if (issue.message.includes('valid Figma')) {
            return `${source} must have a valid Figma "fileKey".`;
          }

          return `${source} must have a non-empty "fileKey".`;
        }

        if (field === 'brand') {
          if (issue.message.includes('safe characters')) {
            return `${source} must contain only safe characters in "brand".`;
          }

          return `${source} must have a non-empty "brand".`;
        }

        if (field === 'out') {
          if (issue.message.includes('safe characters')) {
            return `${source} must contain only safe characters in "out".`;
          }

          return `${source} must have a non-empty "out".`;
        }

        if (field === 'fontStacks') {
          return `${source} must have a "fontStacks" object mapping Figma families to CSS stacks.`;
        }

        return `${source} ${issue.message}.`;
      }

      if (issue.path[0] === 'sources') {
        return `Tokens config at ${configPath} must have at least one token source.`;
      }

      return `Tokens config at ${configPath} ${issue.message}.`;
    })
    .join(' ');

export const parseTokensConfig = (config: unknown, configPath: string): TokensConfig => {
  const parsedSpiritConfig = spiritConfigSchema.safeParse(config);

  if (!parsedSpiritConfig.success) {
    throw new ConfigError(`Spirit config at ${configPath} must contain a JSON object.`);
  }

  if (parsedSpiritConfig.data.tokens === undefined) {
    throw new ConfigError(`Spirit config at ${configPath} must contain a "tokens" object.`);
  }

  const parsedConfig = tokensConfigSchema.safeParse(parsedSpiritConfig.data.tokens);

  if (!parsedConfig.success) {
    throw new ConfigError(describeConfigIssues(parsedConfig.error, configPath));
  }

  parsedConfig.data.sources.forEach(({ out }) => assertRelativeOutputPath(out));

  return parsedConfig.data;
};
