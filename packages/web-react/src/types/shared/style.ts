import { type CSSProperties, type ElementType } from 'react';
import { type SpacingStyleProp } from '../../constants';
import { type TextAlignmentDictionaryType } from './dictionaries';
import { type BreakpointToken, type SingleOrResponsive } from './responsive';
import { type TextHyphensDictionaryType, type TextWordBreakDictionaryType } from './text';
import { type SpaceToken, type ThemeNameType } from './tokens';

export const STYLE_SPACING_AUTO = 'auto' as const;
export type StyleSpacingAuto = typeof STYLE_SPACING_AUTO;

export type SpacingProps = {
  [key in keyof typeof SpacingStyleProp]?: SingleOrResponsive<SpaceToken | StyleSpacingAuto>;
};

export type SpacingType = SingleOrResponsive<SpaceToken>;

export interface SpacingProp {
  spacing?: SpacingType;
}

export interface PaddingProps {
  /** Padding of the element. */
  padding?: SingleOrResponsive<SpaceToken>;
  /** Padding bottom of the element. */
  paddingBottom?: SingleOrResponsive<SpaceToken>;
  /** Padding left of the element. */
  paddingLeft?: SingleOrResponsive<SpaceToken>;
  /** Padding right of the element. */
  paddingRight?: SingleOrResponsive<SpaceToken>;
  /** Padding top of the element. */
  paddingTop?: SingleOrResponsive<SpaceToken>;
  /** Horizontal padding of the element. */
  paddingX?: SingleOrResponsive<SpaceToken>;
  /** Vertical padding of the element. */
  paddingY?: SingleOrResponsive<SpaceToken>;
}

export interface SpacingCSSProperties extends CSSProperties {
  [index: `--${string}`]: string | undefined | number;
}

export type DimensionType = SingleOrResponsive<number>;

export type ElementTypeProp = string | ElementType;

export type DisplayProps = {
  hideOn?: BreakpointToken | BreakpointToken[];
  hideFrom?: BreakpointToken;
};

export interface StyleProps extends SpacingProps, DisplayProps {
  /** Applies a theme class based on the defined design tokens. */
  theme?: ThemeNameType;
  // For backward compatibility!
  /** Sets the CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. Only use as a **last resort**. Use style props instead. */
  UNSAFE_className?: string;
  /** Sets inline [style](https://developer.mozilla.org/en-US/docs/Web/API/Element/style) for the element. Only use as a **last resort**. Use style props instead. */
  UNSAFE_style?: CSSProperties;
}

export type TextAlignmentType = SingleOrResponsive<TextAlignmentDictionaryType>;

export type TextHyphensType = TextHyphensDictionaryType;

export type TextWordBreakType = TextWordBreakDictionaryType;

export type UnsafeStyleProps = 'style' | 'className';

export type OmittedExtendedUnsafeStyleProps<E, P> = Omit<E, UnsafeStyleProps & P>;

export type OverloadStyleProps<E> = Omit<E, UnsafeStyleProps> & StyleProps;
