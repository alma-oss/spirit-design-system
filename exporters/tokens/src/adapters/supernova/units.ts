import { PX_UNIT, REM_UNIT } from '../../constants';

/**
 * Names of the units Supernova reports for a measure. Own constants, so that the adapter does not need the SDK `Unit`
 * enum at runtime; the values are what that enum holds, so its members can be passed in as they are.
 */
export const SOURCE_UNIT = {
  pixels: 'Pixels',
  percent: 'Percent',
  rem: 'Rem',
  ms: 'Ms',
  raw: 'Raw',
} as const;

const UNIT_TO_CSS: Record<string, string> = {
  [SOURCE_UNIT.percent]: '%',
  [SOURCE_UNIT.pixels]: PX_UNIT,
  [SOURCE_UNIT.rem]: REM_UNIT,
  [SOURCE_UNIT.raw]: '',
  [SOURCE_UNIT.ms]: 'ms',
};

/**
 * Converts a Supernova unit name (`Unit.pixels`, "Pixels") to the CSS unit string (e.g. "px"). An unknown unit falls
 * back to `px`, the same way Supernova's own `CSSHelper.unitToCSS` did.
 *
 * @param unit - Source unit name, see `SOURCE_UNIT`
 * @returns {string} CSS unit, an empty string for a raw (unit-less) value
 */
export const unitToCss = (unit: string): string => UNIT_TO_CSS[unit] ?? PX_UNIT;
