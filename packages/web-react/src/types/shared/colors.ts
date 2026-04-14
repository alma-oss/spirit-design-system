import {
  type accentColors,
  type componentColors,
  type emotionColors,
  type textColors,
} from '@alma-oss/spirit-design-tokens';
import { type ColorPrefixes, type ColorSchemeSurfaceIntensity } from '../../constants';

export type ColorPrefixesType = (typeof ColorPrefixes)[keyof typeof ColorPrefixes];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ComponentKeys<Obj extends Record<string, any>, C = never> = keyof Obj | C;

type MatchingKeys<T, Prefix extends string> = keyof {
  [K in Extract<keyof T, string> as K extends `${Prefix}${string}` ? K : never]: string;
};

type GenerateColorsType<T, Prefix extends string, TokenPrefix extends string, C> = keyof {
  [K in Extract<keyof T, string> as MatchingKeys<T[K], Prefix> extends `${Prefix}${infer Rest}`
    ? `${TokenPrefix}-${K}-${Lowercase<Rest>}`
    : never]: C;
};

export type TextAccentColorsType<C = undefined> = GenerateColorsType<typeof accentColors, 'content', 'accent', C>;
export type BorderAccentColorsType<C = undefined> = GenerateColorsType<typeof accentColors, 'border', 'accent', C>;
export type BackgroundAccentColorsType<C = undefined> = GenerateColorsType<
  typeof accentColors,
  'background',
  'accent',
  C
>;

export type TextEmotionColorsType<C = undefined> = GenerateColorsType<typeof emotionColors, 'content', 'emotion', C>;
export type BorderEmotionColorsType<C = undefined> = GenerateColorsType<typeof emotionColors, 'border', 'emotion', C>;
export type BackgroundEmotionColorsType<C = undefined> = GenerateColorsType<
  typeof emotionColors,
  'background',
  'emotion',
  C
>;

export type TextNeutralColorsType<C = undefined> = 'neutral-basic' | 'neutral-subtle' | C;
export type BackgroundNeutralColorsType<C = undefined> = 'neutral-basic' | 'neutral-subtle' | C;

export type AccentColorNamesType<C = undefined> = ComponentKeys<typeof accentColors, C>;
export type ComponentButtonColorNamesType<C = undefined> = ComponentKeys<typeof componentColors.button, C>;
export type EmotionColorNamesType<C = undefined> = ComponentKeys<typeof emotionColors, C>;
export type TextColorNamesType<C = undefined> = ComponentKeys<typeof textColors, C>;

type ColorSchemeSurfaceIntensityToken = (typeof ColorSchemeSurfaceIntensity)[keyof typeof ColorSchemeSurfaceIntensity];

type ColorSchemeAccentSuffix<C = undefined> = {
  [K in Extract<AccentColorNamesType<C>, string>]: `accent-${K}-${ColorSchemeSurfaceIntensityToken}`;
}[Extract<AccentColorNamesType<C>, string>];

type ColorSchemeEmotionSuffix<C = undefined> = {
  [K in Extract<EmotionColorNamesType<C>, string>]: `emotion-${K}-${ColorSchemeSurfaceIntensityToken}`;
}[Extract<EmotionColorNamesType<C>, string>];

export type ColorSchemeType<C = undefined> =
  | 'disabled'
  | `neutral-${ColorSchemeSurfaceIntensityToken}`
  | `selected-${ColorSchemeSurfaceIntensityToken}`
  | ColorSchemeAccentSuffix<C>
  | ColorSchemeEmotionSuffix<C>;
