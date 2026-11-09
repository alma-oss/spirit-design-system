/**
 * Format-agnostic typography style. Values are already prepared for the output (quoted strings, rem sizes, ...),
 * but the style knows nothing about SCSS or JS: the output is decided by the writer.
 */
export type TypographyStyle = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  fontWeight: string | number;
  lineHeight?: string | number;
};
