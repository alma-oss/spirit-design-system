import { toCamelCase } from './stringHelper';

/**
 * Generates a device-specific token value by appending the device name to the token value.
 * Optionally converts the result to camelCase if `hasJsOutput` is true.
 *
 * @param {string} tokenValue - The base token value.
 * @param {string} device - The device name to append.
 * @param {boolean} [hasJsOutput] - Whether to convert the result to camelCase.
 * @returns {string} - The device-specific token value.
 */
export const getDeviceTokenValue = (tokenValue: string, device: string, hasJsOutput = false): string => {
  const deviceTokenValue = `${tokenValue}-${device}`;

  return hasJsOutput ? toCamelCase(deviceTokenValue) : deviceTokenValue.toLowerCase();
};
