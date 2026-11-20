import { PX_UNIT, REM_UNIT } from '../constants';
import { withResolvedValue } from '../core/resolveToken';
import {
  type DesignToken,
  type DeviceDimensionEntries,
  type DeviceDimensionMap,
  type DeviceDimensionValue,
  TokenTypeEnum,
} from '../core/types';
import { getOriginName, tokenVariableName } from './tokenHelper';

/** Token types a device can set a dimension for (the values typography is responsive by). */
const DEVICE_DIMENSION_TOKEN_TYPES = [TokenTypeEnum.Dimension, TokenTypeEnum.FontSize, TokenTypeEnum.LineHeight];

const DEVICE_TYPOGRAPHY_UNITS: Array<string | undefined> = [PX_UNIT, '%', REM_UNIT];

const isDeviceTypographyUnit = (unit: string | undefined): unit is DeviceDimensionValue['unit'] =>
  DEVICE_TYPOGRAPHY_UNITS.includes(unit);

/**
 * Collects the dimensions of device tokens by variable name (and by the name of their origin), so a typography
 * can find the value of each device.
 *
 * @param tokens - Device tokens, each with the device it is resolved for
 */
export const buildDeviceDimensionMap = (tokens: DesignToken[]): DeviceDimensionMap => {
  return tokens.reduce<DeviceDimensionMap>((accumulator, token) => {
    const device = token.metadata.device?.toLowerCase();

    if (!DEVICE_DIMENSION_TOKEN_TYPES.includes(token.type) || !device) {
      return accumulator;
    }

    const { value } = withResolvedValue(token);

    if (value.type !== 'number') {
      return accumulator;
    }

    const { value: measure, unit } = value;

    if (!isDeviceTypographyUnit(unit)) {
      return accumulator;
    }

    const variableNameWithDeviceSuffix = tokenVariableName(token, true);
    const baseVariableName = variableNameWithDeviceSuffix.endsWith(`-${device}`)
      ? variableNameWithDeviceSuffix.slice(0, -(device.length + 1))
      : variableNameWithDeviceSuffix;
    const originKey = getOriginName(token);

    const deviceValues: DeviceDimensionEntries = accumulator.get(baseVariableName) || {};
    deviceValues[device] = { measure, unit };

    accumulator.set(baseVariableName, deviceValues);
    if (originKey) {
      accumulator.set(originKey, deviceValues);
    }

    return accumulator;
  }, new Map<string, DeviceDimensionEntries>());
};
