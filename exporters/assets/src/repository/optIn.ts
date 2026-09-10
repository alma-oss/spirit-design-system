import { assetsConfigSchema, describeConfigIssues } from '../config/schema';
import { ROOT_CONFIG_FILE } from '../constants';
import type { AssetsConfig } from '../types';

export const tryParseOptInConfig = (value: unknown): { config: AssetsConfig } | { error: string } => {
  const parsedConfig = assetsConfigSchema.safeParse(value);

  if (!parsedConfig.success) {
    return { error: describeConfigIssues(parsedConfig.error, ROOT_CONFIG_FILE) };
  }

  return { config: parsedConfig.data };
};
