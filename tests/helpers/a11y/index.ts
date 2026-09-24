export type {
  A11yScanOptions,
  A11yScanResult,
  FormattedNode,
  FormattedViolation,
  StringOrStringArray,
  ImpactLevel,
} from './types';

export { IMPACT_BADGES } from './types';

export { getCommonExclusions, getWCAG2AAConfig } from './config';

export { formatViolations, formatNode, formatViolationError, getImpactBadge } from './formatters';

export { runA11yScan, assertNoA11yViolations } from './scanner';
