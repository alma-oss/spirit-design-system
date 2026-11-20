import { PX_UNIT } from '../constants';
import { pxToRem } from '../converters/pxToRem';

// prettier-ignore
const PX_VALUE_PATTERN = [
  '(',                // First capturing group - the whole number, passed to the replacer
  '[+-]?',            // Matches an optional sign
  '(?:',              // Non-capturing group
  '\\d+(?:\\.\\d*)?', // Matches an integer with an optional decimal part, e.g. `8`, `100`, `1.5`
  '|',                // or
  '\\.\\d+',          // Matches a decimal without a leading zero, e.g. `.5`
  ')',                // End of non-capturing group
  ')',                // End of first capturing group
  PX_UNIT,            // Matches the `px` unit literally
].join('');

/**
 * Converts every px value in a string (e.g. a shadow `0px 100px 80px 0px`) to rem.
 * Each number is matched as a whole, so zero values become unitless `0` without touching numbers like `100px`.
 *
 * @param value - The string containing px values
 * @param baseFontSize - The base font size used for the px -> rem conversion
 * @returns {string} The string with px values converted to rem, or unchanged when baseFontSize is invalid
 */
export const replacePxWithRem = (value: string, baseFontSize: number): string => {
  if (!baseFontSize || baseFontSize <= 0) {
    return value;
  }

  return value.replace(new RegExp(PX_VALUE_PATTERN, 'g'), (_, number: string) =>
    Number(number) === 0 ? '0' : pxToRem(number, { baseFontSize }),
  );
};
