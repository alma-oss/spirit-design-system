import { breakpoints } from '@alma-oss/spirit-design-tokens';
import type { BreakpointToken } from '../types';

/**
 * Breakpoint tokens ordered from the smallest to the largest breakpoint.
 */
export const breakpointOrder = Object.keys(breakpoints) as readonly BreakpointToken[];
