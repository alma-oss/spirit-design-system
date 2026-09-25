import { TokenTypeEnum } from '../../core/types';
import { pxToRemValue } from '../../converters/pxToRem';
import { PX_UNIT } from '../../constants';
import type { TransformationRule } from '../TransformationRule';

export type PxToRemRuleParams = {
  baseFontSize: number;
  isFontSizeBaseToken: boolean;
};

/**
 * Converts a px `NumberValue` to rem, mirroring `UNIT_FORMAT_RULES`'s
 * existing single rule in `config/unitFormatConfig.ts`: applies to the 7
 * dimension-family token types, skipped for the font-size-base token itself
 * or when no valid base font size is available.
 */
export const pxToRemRule: TransformationRule<PxToRemRuleParams> = {
  name: 'px-to-rem',
  tokenTypes: [
    TokenTypeEnum.Dimension,
    TokenTypeEnum.Radius,
    TokenTypeEnum.Space,
    TokenTypeEnum.Size,
    TokenTypeEnum.FontSize,
    TokenTypeEnum.LineHeight,
    TokenTypeEnum.LetterSpacing,
  ],
  shouldApply: (context) => !context.params.isFontSizeBaseToken && context.params.baseFontSize > 0,
  transformers: [
    {
      name: 'pxToRem',
      transform: (value, context) => {
        if (value.type !== 'number' || value.unit !== PX_UNIT) {
          return value;
        }

        return { type: 'number', ...pxToRemValue(value.value, { baseFontSize: context.params.baseFontSize }) };
      },
    },
  ],
};
