import {
  accentColorNames,
  colorIntensityNames,
  emotionColorNames,
  textColorNames,
} from '@alma-oss/spirit-design-tokens';
import { ColorPrefixes } from '../constants';
import {
  type AccentColorNamesType,
  type BackgroundAccentColorsType,
  type BackgroundEmotionColorsType,
  type BackgroundNeutralColorsType,
  type BorderAccentColorsType,
  type BorderEmotionColorsType,
  type EmotionColorNamesType,
  type TextAccentColorsType,
  type TextColorsDictionaryType,
  type TextEmotionColorsType,
  type TextNeutralColorsType,
} from '../types';

interface CreateScopedColorTokenNameOptions {
  color: string;
  intensity: string;
}

const includesName = (names: readonly string[], name: string) => names.includes(name);

export const getColorCategory = (color: string) => {
  if (includesName(accentColorNames, color)) {
    return ColorPrefixes.ACCENT;
  }

  if (includesName(emotionColorNames, color)) {
    return ColorPrefixes.EMOTION;
  }

  return undefined;
};

export const createColorTokenName = (color: string, intensity: string, prefix?: string): string =>
  [prefix, color, intensity].filter(Boolean).join('-');

export const createScopedColorTokenName = ({ color, intensity }: CreateScopedColorTokenNameOptions): string =>
  createColorTokenName(color, intensity, getColorCategory(color));

/**
 * Generates a color object by combining color names with color intensities.
 *
 * @template T - The type of the keys in the resulting record.
 * @param {ReadonlyArray<string>} colorNames - Color names, e.g. accent or emotion color names from design tokens.
 * @param {string} prefix - A string prefix to prepend to the generated keys.
 * @param {ReadonlyArray<string>} intensities - Color intensities, defaults to intensities from design tokens.
 * @returns {Record<T, T>} A record where the keys are formatted strings and the values are identical to the keys.
 */
export const generateColorsObject = <T extends string>(
  colorNames: readonly string[],
  prefix: string,
  intensities: readonly string[] = colorIntensityNames,
): Record<T, T> => {
  const result: Record<string, string> = {};

  for (const colorName of colorNames) {
    for (const intensity of intensities) {
      const formattedValue = createColorTokenName(colorName, intensity, prefix);
      const formattedKey = formattedValue.replace(/-/g, '_').toUpperCase();
      result[formattedKey] = formattedValue;
    }
  }

  return result as Record<T, T>;
};

/**
 * Generates an object containing formatted keys for accent text colors.
 *
 * @returns {Record<string, TextAccentColorsType>} A record of formatted accent color keys.
 */
export const getAccentTextColors = (): Record<string, TextAccentColorsType> =>
  generateColorsObject(accentColorNames, 'accent');

/**
 * Generates an object containing formatted keys for emotion text colors.
 *
 * @returns {Record<string, TextEmotionColorsType>} A record of formatted emotion color keys.
 */
export const getEmotionTextColors = (): Record<string, TextEmotionColorsType> =>
  generateColorsObject(emotionColorNames, 'emotion');

/**
 * Generates an object containing formatted keys for accent background colors.
 *
 * @returns {Record<string, BackgroundAccentColorsType>} A record of formatted accent color keys.
 */
export const getAccentBackgroundColors = (): Record<string, BackgroundAccentColorsType> =>
  generateColorsObject(accentColorNames, 'accent');

/**
 * Generates an object containing formatted keys for emotion background colors.
 *
 * @returns {Record<string, BackgroundEmotionColorsType>} A record of formatted accent color keys.
 */
export const getEmotionBackgroundColors = (): Record<string, BackgroundEmotionColorsType> =>
  generateColorsObject(emotionColorNames, 'emotion');

/**
 * Generates an object containing formatted keys for accent border colors.
 *
 * @returns {Record<string, BorderAccentColorsType>} A record of formatted accent color keys.
 */
export const getAccentBorderColors = (): Record<string, BorderAccentColorsType> =>
  generateColorsObject(accentColorNames, 'accent');

/**
 * Generates an object containing formatted keys for emotion border colors.
 *
 * @returns {Record<string, BackgroundEmotionColorsType>} A record of formatted emotion color keys.
 */
export const getEmotionBorderColors = (): Record<string, BorderEmotionColorsType> =>
  generateColorsObject(emotionColorNames, 'emotion');

/**
 * Generates an object containing formatted keys for neutral text colors.
 *
 * @returns {Record<string, TextNeutralColorsType>} A record of formatted neutral color keys.
 */
export const getNeutralTextColors = (): Record<string, TextNeutralColorsType> =>
  ({
    NEUTRAL_BASIC: 'neutral-basic',
    NEUTRAL_SUBTLE: 'neutral-subtle',
  }) as Record<string, TextNeutralColorsType>;

/**
 * Generates an object containing formatted keys for neutral background colors.
 *
 * @returns {Record<string, BackgroundNeutralColorsType>} A record of formatted neutral color keys.
 */
export const getNeutralBackgroundColors = (): Record<string, BackgroundNeutralColorsType> =>
  ({
    NEUTRAL_BASIC: 'neutral-basic',
    NEUTRAL_SUBTLE: 'neutral-subtle',
  }) as Record<string, BackgroundNeutralColorsType>;

export const getAccentColorNames = () => [...accentColorNames] as AccentColorNamesType[];
export const getEmotionColorNames = () => [...emotionColorNames] as EmotionColorNamesType[];
export const getTextColorNames = () => [...textColorNames] as TextColorsDictionaryType[];
