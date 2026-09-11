import { assetsConfigSchema, describeConfigIssues, readAssetsSection } from '../config/schema';
import { ROOT_CONFIG_FILE } from '../constants';
import type { AssetsConfig } from '../types';

export const tryParseOptInConfig = (value: unknown): { config: AssetsConfig } | { error: string } => {
  const section = readAssetsSection(value, ROOT_CONFIG_FILE);

  if ('error' in section) {
    if (section.error.includes('must contain an "assets" object')) {
      return { error: 'no assets configuration' };
    }

    return { error: section.error };
  }

  const parsedConfig = assetsConfigSchema.safeParse(section.assets);

  if (!parsedConfig.success) {
    return { error: describeConfigIssues(parsedConfig.error, ROOT_CONFIG_FILE) };
  }

  return { config: parsedConfig.data };
};
