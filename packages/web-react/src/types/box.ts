import { type ElementType } from 'react';
import { type BorderRadiusCorners } from '../constants';
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
  type BreakpointToken,
  type ChildrenProps,
  type ColorSchemeType,
  type PaddingProps,
  type PolymorphicComponentProps,
  type Responsive,
  type SingleOrResponsive,
  type StyleProps,
  type TextColorProps,
} from './shared';

export type BoxBackgroundColorsType =
  | BackgroundColorsDictionaryType
  | BackgroundAccentColorsType
  | BackgroundEmotionColorsType
  | BackgroundNeutralColorsType;

type BoxBorderRadiusCornerKey = (typeof BorderRadiusCorners)[number];

/** Per-corner border radius. Corners use logical directions (`start`/`end`), so they flip in RTL. */
export type BoxBorderRadiusCornersType = {
  [key in BoxBorderRadiusCornerKey]?: SingleOrResponsive<BorderRadiiTokenType>;
} & { [key in BreakpointToken]?: never };

/** Uniform border radius, a single value or a responsive object. It cannot be mixed with the corner keys. */
export type BoxBorderRadiusUniformType =
  BorderRadiiTokenType | (Responsive<BorderRadiiTokenType> & { [key in BoxBorderRadiusCornerKey]?: never });

export interface BoxBaseProps extends ChildrenProps, TextColorProps, PaddingProps, StyleProps {
  /** The background color of the box. */
  backgroundColor?: BoxBackgroundColorsType;
  /** The background gradient of the box. */
  backgroundGradient?: SingleOrResponsive<BackgroundGradientsDictionaryType>;
  /** The border color of the box. */
  borderColor?: BorderAccentColorsType | BorderEmotionColorsType | BorderColorsDictionaryType;
  /** The border radius of the box. Use an object with corner keys to set the radius per corner. */
  borderRadius?: BoxBorderRadiusUniformType | BoxBorderRadiusCornersType;
  /** The border style of the box. */
  borderStyle?: BorderStylesDictionaryType;
  /** The border width of the box. */
  borderWidth?: BorderWidthsDictionaryType;
  /** The color scheme of the box. */
  colorScheme?: ColorSchemeType;
}

export type BoxProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, BoxBaseProps>;

export type SpiritBoxProps<E extends ElementType = 'div'> = BoxProps<E>;
