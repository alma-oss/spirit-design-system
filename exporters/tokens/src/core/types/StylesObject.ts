import type { TypographyStyle } from './TypographyStyle';
import type { DeviceTypographyUnit } from './Unit';

export type StylesObjectType = { [key: string]: (string | object) & { moveToTheEnd?: string } };

export type DeviceDimensionValue = {
  measure: number;
  unit: DeviceTypographyUnit;
};

export type DeviceDimensionEntries = Record<string, DeviceDimensionValue>;

export type DeviceDimensionMap = Map<string, DeviceDimensionEntries>;

/**
 * A typography style placed in the styles object. The object processors only say what the style is, the writer
 * (see `formatters/stylesObjectFormatter.ts`) renders it as an SCSS map or a JS object.
 */
export type TypographyStyleLeaf = { kind: 'typography-style'; style: TypographyStyle };

export const typographyStyleLeaf = (style: TypographyStyle): TypographyStyleLeaf => ({
  kind: 'typography-style',
  style,
});

export const isTypographyStyleLeaf = (value: unknown): value is TypographyStyleLeaf =>
  typeof value === 'object' && value !== null && (value as { kind?: unknown }).kind === 'typography-style';
