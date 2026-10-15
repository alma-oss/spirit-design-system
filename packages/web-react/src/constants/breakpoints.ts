import { breakpoints } from '@alma-oss/spirit-design-tokens';
import type { BreakpointToken } from '../types';

/**
 * Breakpoint tokens in the order they are defined in the design tokens.
 */
export const breakpointTokens = Object.keys(breakpoints) as readonly BreakpointToken[];
