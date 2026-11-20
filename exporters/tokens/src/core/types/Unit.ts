/** CSS units a device typography dimension can be set in. */
export type DeviceTypographyUnit = 'px' | '%' | 'rem';

/** The base font size in px (the `font-size-base` token) by device, e.g. mobile, tablet, desktop. */
export type FontSizeBaseMap = Map<string, number>;
