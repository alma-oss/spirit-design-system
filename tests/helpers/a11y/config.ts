import { COMMON_EXCLUSIONS, WCAG_CONFIG_TAGS } from './constants';
import { type A11yScanOptions } from './types';

export const getCommonExclusions = (): string[] => COMMON_EXCLUSIONS;

/**
 * Default scan options: WCAG 2.2 AA rule set and common exclusions
 */
export const getWcagConfig = (): A11yScanOptions => ({
  withTags: WCAG_CONFIG_TAGS,
  exclude: getCommonExclusions(),
});
