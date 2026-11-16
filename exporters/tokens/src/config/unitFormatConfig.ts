import { TokenType } from '@supernovaio/sdk-exporters';
import type { UnitFormatRule } from '../formatters/types';

/**
 * Unit formatting / conversion rules.
 *
 * Single source of truth for what token types are converted to rem and when.
 */
export const UNIT_FORMAT_RULES: UnitFormatRule[] = [
  {
    tokenTypes: [
      TokenType.dimension,
      TokenType.radius,
      TokenType.space,
      TokenType.size,
      TokenType.fontSize,
      TokenType.lineHeight,
      TokenType.letterSpacing,
    ],
    shouldConvert: (ctx) => !ctx.isFontSizeBaseToken && ctx.baseFontSize > 0,
    converterNames: ['pxToRem'],
  },
];
