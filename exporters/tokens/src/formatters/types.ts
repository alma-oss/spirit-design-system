import type { TokenTypeEnum } from '../core/types';

export type UnitFormatContext = {
  /** Source-agnostic type of the token, `undefined` for a type the model does not know (no rule applies to it). */
  tokenType: TokenTypeEnum | undefined;
  baseFontSize: number;
  isFontSizeBaseToken: boolean;
};

export type UnitFormatRule = {
  tokenTypes: TokenTypeEnum[];
  shouldConvert: (ctx: UnitFormatContext) => boolean;
  converterNames: Array<'pxToRem'>;
};
