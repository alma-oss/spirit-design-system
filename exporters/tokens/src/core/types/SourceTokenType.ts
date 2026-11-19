/**
 * Names of the token types a source reports, as the file configuration and the generators refer to them. Own
 * constants, so that they do not need a source's token type enum at runtime.
 *
 * The values are what the Supernova SDK `TokenType` enum holds, so its members can be compared with them as they are.
 * Not to be confused with `TokenTypeEnum`, the source-agnostic type of the internal `DesignToken` model.
 */
export const SOURCE_TOKEN_TYPE = {
  color: 'Color',
  typography: 'Typography',
  shadow: 'Shadow',
  border: 'Border',
  gradient: 'Gradient',
  radius: 'BorderRadius',
  borderWidth: 'BorderWidth',
  fontSize: 'FontSize',
  dimension: 'Dimension',
  letterSpacing: 'LetterSpacing',
  lineHeight: 'LineHeight',
  size: 'Size',
  space: 'Space',
  string: 'String',
} as const;

export type SourceTokenType = (typeof SOURCE_TOKEN_TYPE)[keyof typeof SOURCE_TOKEN_TYPE];
