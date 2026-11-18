import { TokenTypeEnum } from '../core/types';
import type { UnitFormatRule } from '../formatters/types';

/**
 * Unit formatting / conversion rules.
 *
 * Single source of truth for what token types are converted to rem and when.
 */
export const UNIT_FORMAT_RULES: UnitFormatRule[] = [
  {
    tokenTypes: [
      TokenTypeEnum.Dimension,
      TokenTypeEnum.Radius,
      TokenTypeEnum.Space,
      TokenTypeEnum.Size,
      TokenTypeEnum.FontSize,
      TokenTypeEnum.LineHeight,
      TokenTypeEnum.LetterSpacing,
    ],
    shouldConvert: (ctx) => !ctx.isFontSizeBaseToken && ctx.baseFontSize > 0,
    converterNames: ['pxToRem'],
  },
];
