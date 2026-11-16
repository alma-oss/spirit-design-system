import type { Token, TokenType } from '@supernovaio/sdk-exporters';

/**
 * Format-agnostic typography style. Values are already prepared for the output (quoted strings, rem sizes, ...),
 * but the style knows nothing about SCSS or JS: the output is decided by the formatter.
 */
export type TypographyStyle = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string | number;
  lineHeight?: string | number;
};

export type UnitFormatContext = {
  token: Token;
  tokenType: TokenType;
  baseFontSize: number;
  isFontSizeBaseToken: boolean;
};

export type UnitFormatRule = {
  tokenTypes: TokenType[];
  shouldConvert: (ctx: UnitFormatContext) => boolean;
  converterNames: Array<'pxToRem'>;
};
