import { COMMON_EXCLUSIONS, WCAG2AA_CONFIG_TAGS } from './constants';
import { type A11yScanOptions } from './types';

export const getCommonExclusions = (): string[] => COMMON_EXCLUSIONS;

export const getWCAG2AAConfig = (): A11yScanOptions => ({
  withTags: WCAG2AA_CONFIG_TAGS,
  exclude: getCommonExclusions(),
});
