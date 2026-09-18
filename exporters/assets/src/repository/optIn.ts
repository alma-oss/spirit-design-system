import { parseAssetsConfig } from '../config/schema';
import { ROOT_CONFIG_FILE } from '../constants';
import { ConfigError } from '../errors';
import type { AssetsConfig } from '../types';

export const tryParseOptInConfig = (
  value: unknown,
  configPath: string = ROOT_CONFIG_FILE,
): { config: AssetsConfig } | { error: string } => {
  try {
    return { config: parseAssetsConfig(value, configPath) };
  } catch (error) {
    /* istanbul ignore if -- Parsing converts all validation failures to ConfigError. */
    if (!(error instanceof ConfigError)) {
      throw error;
    }

    if (error.message.includes('must contain an "assets" object')) {
      return { error: 'no assets configuration' };
    }

    return { error: error.message };
  }
};
