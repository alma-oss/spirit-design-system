import { type CSSProperties } from 'react';
import { type DimensionType, type SpacingCSSProperties } from '../types';

export interface DimensionCSSProperties extends SpacingCSSProperties {}

/**
 * Generates CSS style properties for a given dimension (e.g., columns, rows) based on breakpoints or a single value.
 *
 * @param property - The dimension property, which can be an object with breakpoints or a single number.
 * @param prefix - The CSS variable prefix to use for the generated styles.
 * @returns {CSSProperties} Object containing the generated styles.
 */
export const useDimensionStyle = (property: DimensionType | undefined, prefix: string): CSSProperties => {
  const style: DimensionCSSProperties = {};
  const cssPrefix: string = `--${prefix}`;

  if (typeof property === 'object' && property !== null) {
    Object.keys(property).forEach((key) => {
      const breakpointSuffix = key === 'mobile' ? '' : `-${key}`;
      const value = (property as Record<string, string | undefined>)[key];
      (style as Record<string, string | undefined>)[`${cssPrefix}${breakpointSuffix}`] = `${value?.toString()}`;
    });
  } else if (property) {
    (style as Record<string, string | undefined>)[`${cssPrefix}`] = `${property?.toString()}`;
  }

  return style;
};
