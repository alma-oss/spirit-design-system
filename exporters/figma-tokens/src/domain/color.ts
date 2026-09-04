const HEX_COLOR_REGEX = /#([A-Fa-f0-9]{6,8})\b/g;
const LONG_HEX_WITH_ALPHA_LENGTH = 8;
const SHORT_HEX_WITH_ALPHA_LENGTH = 4;
const SHORT_HEX_WITHOUT_ALPHA_LENGTH = 3;

export const canHexBeShortened = (hex: string): boolean =>
  hex.length % 2 === 0 && [...Array(hex.length / 2)].every((_, index) => hex[2 * index] === hex[2 * index + 1]);

export const shortenHex = (hex: string): string =>
  hex
    .split('')
    .map((char, index) => (index % 2 === 0 ? char : ''))
    .join('');

export const removeAlphaChannel = (hex: string): string => {
  if (hex.length === LONG_HEX_WITH_ALPHA_LENGTH && hex.endsWith('ff')) {
    return hex.slice(0, -2);
  }

  if (hex.length === SHORT_HEX_WITH_ALPHA_LENGTH && hex.endsWith('f')) {
    return hex.slice(0, -1);
  }

  return hex;
};

export const normalizeColor = (hexCode: string): string => {
  const isShortHex = [SHORT_HEX_WITHOUT_ALPHA_LENGTH, SHORT_HEX_WITH_ALPHA_LENGTH].includes(hexCode.length);
  let processedHex = isShortHex || !canHexBeShortened(hexCode) ? hexCode : shortenHex(hexCode);

  processedHex = removeAlphaChannel(processedHex);

  return `#${processedHex.toLowerCase()}`;
};

const clampChannel = (value: number): number => Math.min(1, Math.max(0, value));

const toByte = (value: number): string => Math.round(clampChannel(value) * 255)
  .toString(16)
  .padStart(2, '0');

export const rgbaToHex8 = (color: { r: number; g: number; b: number; a: number }): string =>
  `#${toByte(color.r)}${toByte(color.g)}${toByte(color.b)}${toByte(color.a)}`;

export const rgbaToHex = (color: { r: number; g: number; b: number; a: number }): string =>
  normalizeColor(`${toByte(color.r)}${toByte(color.g)}${toByte(color.b)}${toByte(color.a)}`);

export const findAllHexColorsInStringAndNormalize = (input: string): string =>
  input.replace(HEX_COLOR_REGEX, (match) => normalizeColor(match.slice(1)));

export const transformColorsToVariables = (
  name: string,
  value: string,
  tokenPrefix: string,
  groupName?: string,
): string => {
  let counter = 1;
  const renderGroupName = groupName ? `${groupName}-` : '';

  return value
    .split(',')
    .map((part) =>
      part.replace(HEX_COLOR_REGEX, (match) => {
        const cssVar = `var(--${tokenPrefix}color-${renderGroupName}${name}-color-${counter.toString().padStart(2, '0')}, ${match})`;
        counter += 1;

        return cssVar;
      }),
    )
    .join(',')
    .replace(/0px/g, '0');
};
