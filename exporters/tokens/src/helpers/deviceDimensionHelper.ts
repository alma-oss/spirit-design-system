import { type Token, type TokenGroup, TokenType } from '@supernovaio/sdk-exporters';
import {
  type DeviceDimensionEntries,
  type DeviceDimensionMap,
  type DeviceDimensionValue,
  SOURCE_UNIT,
} from '../core/types';
import { getDeviceAlias } from './deviceHelpers';
import { readNumericValue } from './numericValueHelper';
import { getOriginName, tokenVariableName } from './tokenHelper';

/** Token types a device can set a dimension for (the values typography is responsive by). */
const DEVICE_DIMENSION_TOKEN_TYPES = [TokenType.dimension, TokenType.fontSize, TokenType.lineHeight];

const isDeviceTypographyUnit = (unit: unknown): unit is DeviceDimensionValue['unit'] => {
  return unit === SOURCE_UNIT.pixels || unit === SOURCE_UNIT.percent || unit === SOURCE_UNIT.rem;
};

const toTypographyUnit = (unit: unknown): DeviceDimensionValue['unit'] | null => {
  return isDeviceTypographyUnit(unit) ? unit : null;
};

/**
 * Collects the dimensions of device tokens by variable name (and by the name of their origin), so a typography
 * can find the value of each device.
 *
 * @param tokens - Device tokens, each with the device it is resolved for
 * @param tokenGroups
 */
export const buildDeviceDimensionMap = (tokens: Token[], tokenGroups: Array<TokenGroup>): DeviceDimensionMap => {
  return tokens.reduce<DeviceDimensionMap>((accumulator, token) => {
    const device = getDeviceAlias(token).toLowerCase();

    if (!DEVICE_DIMENSION_TOKEN_TYPES.includes(token.tokenType) || !device) {
      return accumulator;
    }

    const { measure, unit: sourceUnit } = readNumericValue(token);
    const unit = toTypographyUnit(sourceUnit);

    if (measure === undefined || !unit) {
      return accumulator;
    }

    const variableNameWithDeviceSuffix = tokenVariableName(token, tokenGroups, true);
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
