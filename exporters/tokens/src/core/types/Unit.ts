/**
 * Names of the units a source may report for a measure, before the adapter turns them into CSS units (`px`, `rem`,
 * ...). Own constants, so the exporter does not need a source's unit enum at runtime.
 *
 * The values are what the Supernova SDK `Unit` enum holds, so its members can be passed in as they are.
 */
export const SOURCE_UNIT = {
  pixels: 'Pixels',
  percent: 'Percent',
  rem: 'Rem',
  ms: 'Ms',
  raw: 'Raw',
} as const;

export type SourceUnit = (typeof SOURCE_UNIT)[keyof typeof SOURCE_UNIT];

/** Units a device typography dimension can be set in. */
export type DeviceTypographyUnit = typeof SOURCE_UNIT.pixels | typeof SOURCE_UNIT.percent | typeof SOURCE_UNIT.rem;
