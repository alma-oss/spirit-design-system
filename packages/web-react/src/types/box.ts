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
  type PolymorphicComponentProps,
  type SingleOrResponsive,
  type SpaceToken,
  type StyleProps,
  type TextColorProps,
} from './shared';

export type BoxBackgroundColorsType =
  | BackgroundColorsDictionaryType
  | BackgroundAccentColorsType
  | BackgroundEmotionColorsType
  | BackgroundNeutralColorsType;

export interface BoxBaseProps extends ChildrenProps, TextColorProps, StyleProps {
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
  /** Padding of the box. */
  padding?: SingleOrResponsive<SpaceToken>;
  /** Horizontal padding of the box. */
  paddingX?: SingleOrResponsive<SpaceToken>;
  /** Vertical padding of the box. */
  paddingY?: SingleOrResponsive<SpaceToken>;
  /** Padding top of the box. */
  paddingTop?: SingleOrResponsive<SpaceToken>;
  /** Padding bottom of the box. */
  paddingBottom?: SingleOrResponsive<SpaceToken>;
  /** Padding left of the box. */
  paddingLeft?: SingleOrResponsive<SpaceToken>;
  /** Padding right of the box. */
  paddingRight?: SingleOrResponsive<SpaceToken>;
}

export type BoxProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, BoxBaseProps>;

/** @deprecated Use BoxProps instead */
export type SpiritBoxProps<E extends ElementType = 'div'> = BoxProps<E>;
