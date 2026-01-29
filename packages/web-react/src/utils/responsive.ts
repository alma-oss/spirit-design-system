import type { Responsive } from '../types';

/**
 * Checks if a value is a responsive object (has breakpoint keys).
 *
 * @param value - The value to check.
 * @returns {boolean} True if the value is a responsive object, false otherwise.
 */
export function isResponsive<T>(value: unknown): value is Responsive<T> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Generates responsive class names for a component.
 *
 * @param componentClass - The base component class name.
 * @param value - The responsive value or single value.
 * @returns {string[]} Array of class names.
 */
export function generateResponsiveClassNames<T extends string>(
  componentClass: string,
  value: T | Responsive<T> | undefined,
): string[] {
  if (!value) {
    return [];
  }

  if (isResponsive(value)) {
    return Object.entries(value)
      .map(([breakpoint, breakpointValue]) => {
        if (breakpointValue === undefined) {
          return '';
        }

        if (breakpoint === 'mobile') {
          return `${componentClass}--${breakpointValue}`;
        }

        return `${componentClass}--${breakpoint}--${breakpointValue}`;
      })
      .filter((className) => className !== '');
  }

  return [`${componentClass}--${value}`];
}
