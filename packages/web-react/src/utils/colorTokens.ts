import { accentColors, emotionColors, textColors } from '@alma-oss/spirit-design-tokens';
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

export const getColorCategory = (color: string) => {
  if (Object.keys(accentColors).includes(color)) {
    return ColorPrefixes.ACCENT;
  }

  if (Object.keys(emotionColors).includes(color)) {
    return ColorPrefixes.EMOTION;
  }

  return undefined;
};

export const createColorTokenName = (color: string, intensity: string, prefix?: string): string =>
  [prefix, color, intensity].filter(Boolean).join('-');

export const createScopedColorTokenName = ({ color, intensity }: CreateScopedColorTokenNameOptions): string =>
  createColorTokenName(color, intensity, getColorCategory(color));

/**
 * Generates a color object by processing a set of colors and filtering their keys based on type.
 *
 * @template T - The type of the keys in the resulting record.
 * @param {Record<string, Record<string, string>>} colors - A record of color categories and their properties.
 * @param {string} type - The type of property to filter (e.g., "content", "border", "background").
 * @param {string} prefix - A string prefix to prepend to the generated keys.
 * @returns {Record<T, T>} A record where the keys are formatted strings and the values are identical to the keys.
 */
export const generateColorsObject = <T extends string>(
  colors: Record<string, Record<string, string>>,
  type: string,
  prefix: string,
): Record<T, T> => {
  const result: Record<string, string> = {};

  for (const [key, properties] of Object.entries(colors)) {
    for (const [property] of Object.entries(properties)) {
      if (property.startsWith(type)) {
        const formattedValue = createColorTokenName(key, property.replace(type, '').toLowerCase(), prefix);
        const formattedKey = formattedValue.replace(/-/g, '_').toUpperCase();
        result[formattedKey] = formattedValue;
      }
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
  generateColorsObject(accentColors, 'content', 'accent');

/**
 * Generates an object containing formatted keys for emotion text colors.
 *
 * @returns {Record<string, TextEmotionColorsType>} A record of formatted emotion color keys.
 */
export const getEmotionTextColors = (): Record<string, TextEmotionColorsType> =>
  generateColorsObject(emotionColors, 'content', 'emotion');

/**
 * Generates an object containing formatted keys for accent background colors.
 *
 * @returns {Record<string, BackgroundAccentColorsType>} A record of formatted accent color keys.
 */
export const getAccentBackgroundColors = (): Record<string, BackgroundAccentColorsType> =>
  generateColorsObject(accentColors, 'background', 'accent');

/**
 * Generates an object containing formatted keys for emotion background colors.
 *
 * @returns {Record<string, BackgroundEmotionColorsType>} A record of formatted accent color keys.
 */
export const getEmotionBackgroundColors = (): Record<string, BackgroundEmotionColorsType> =>
  generateColorsObject(emotionColors, 'background', 'emotion');

/**
 * Generates an object containing formatted keys for accent border colors.
 *
 * @returns {Record<string, BorderAccentColorsType>} A record of formatted accent color keys.
 */
export const getAccentBorderColors = (): Record<string, BorderAccentColorsType> =>
  generateColorsObject(accentColors, 'border', 'accent');

/**
 * Generates an object containing formatted keys for emotion border colors.
 *
 * @returns {Record<string, BackgroundEmotionColorsType>} A record of formatted emotion color keys.
 */
export const getEmotionBorderColors = (): Record<string, BorderEmotionColorsType> =>
  generateColorsObject(emotionColors, 'border', 'emotion');

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

export const getAccentColorNames = () => Object.keys(accentColors) as AccentColorNamesType[];
export const getEmotionColorNames = () => Object.keys(emotionColors) as EmotionColorNamesType[];
export const getTextColorNames = () => Object.keys(textColors) as TextColorsDictionaryType[];
