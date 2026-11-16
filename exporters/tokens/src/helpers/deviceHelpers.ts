import { toCamelCase } from './stringHelper';
import type { DeviceTheme, DeviceToken } from './types';

/**
 * Updates the property values of each token to include the device theme.
 *
 * @param {Array<object>} tokens - The array of tokens to be updated.
 * @param {string} theme - The device theme code name to be added to the token's property values.
 * @returns {Array<object>} - An array of tokens with updated property values including the device theme.
 */
const updateTokenWithDeviceTheme = <T extends DeviceToken>(tokens: T[], theme: string): T[] => {
  return tokens.map((token) => {
    return {
      ...token,
      propertyValues: {
        ...token.propertyValues,
        device: theme,
      },
    } as unknown as T;
  });
};

/**
 * Merges device-specific tokens with their corresponding themes.
 *
 * @param {Array} allDevices - An array of objects, each containing a theme and an array of device tokens.
 * @returns {Array<object>} - An array of tokens with updated property values that include the device theme.
 */
export const getDeviceThemes = <T extends DeviceToken>(
  allDevices: { theme: DeviceTheme; deviceTokens: T[] }[],
): T[] => {
  return allDevices.reduce((overriddenTokens, { theme, deviceTokens }) => {
    const updatedTokens = updateTokenWithDeviceTheme(deviceTokens, theme.codeName);

    return overriddenTokens.concat(updatedTokens);
  }, [] as T[]);
};

/**
 * Retrieves the device alias from a token.
 *
 * @param token - The token from which to extract the device alias.
 * @returns {string} - The device alias if present, otherwise an empty string.
 */
export const getDeviceAlias = (token: DeviceToken | undefined): string => {
  return String(token?.propertyValues?.device || '');
};

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
