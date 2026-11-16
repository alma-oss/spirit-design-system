import type { DeviceTypographyUnit } from './Unit';

export type StylesObjectType = { [key: string]: (string | object) & { moveToTheEnd?: string } };

export type DeviceDimensionValue = {
  measure: number;
  unit: DeviceTypographyUnit;
};

export type DeviceDimensionEntries = Record<string, DeviceDimensionValue>;

export type DeviceDimensionMap = Map<string, DeviceDimensionEntries>;
