import { type ElementType } from 'react';
import {
  type BackgroundAccentColorsType,
  type BackgroundColorsDictionaryType,
  type BackgroundEmotionColorsType,
  type BackgroundGradientsDictionaryType,
  type BackgroundNeutralColorsType,
  type BorderAccentColorsType,
  type BorderColorsDictionaryType,
  type BorderEmotionColorsType,
  type BorderRadiiTokenType,
  type BorderStylesDictionaryType,
  type BorderWidthsDictionaryType,
  type ChildrenProps,
  type ColorSchemeType,
  type PaddingProps,
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type StyleProps,
  type TextColorProps,
} from './shared';

export type BoxBackgroundColorsType =
  | BackgroundColorsDictionaryType
  | BackgroundAccentColorsType
  | BackgroundEmotionColorsType
  | BackgroundNeutralColorsType;

export interface BoxBaseProps extends ChildrenProps, TextColorProps, PaddingProps, StyleProps {
  /** The background color of the box. */
  backgroundColor?: BoxBackgroundColorsType;
  /** The background gradient of the box. */
  backgroundGradient?: SingleOrResponsive<BackgroundGradientsDictionaryType>;
  /** The border color of the box. */
  borderColor?: BorderAccentColorsType | BorderEmotionColorsType | BorderColorsDictionaryType;
  /** The border radius of the box. */
  borderRadius?: SingleOrResponsive<BorderRadiiTokenType>;
  /** The border style of the box. */
  borderStyle?: BorderStylesDictionaryType;
  /** The border width of the box. */
  borderWidth?: BorderWidthsDictionaryType;
  /** The color scheme of the box. */
  colorScheme?: ColorSchemeType;
}

export type BoxProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, BoxBaseProps>;

export type SpiritBoxProps<E extends ElementType = 'div'> = BoxProps<E>;
