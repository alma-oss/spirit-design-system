import { type ElementType } from 'react';
import type {
  ChildrenProps,
  EmphasisDictionaryType,
  EmphasisProps,
  SizeExtendedDictionaryType,
  SizeProps,
  StyleProps,
  TextColorProps,
  TextColorsType,
  TransferProps,
  TypographyBaseProps,
} from './shared';

export interface TextElementTypeProps<E extends ElementType = 'p'> {
  /**
   * The HTML element or React element used to render the Text, e.g. 'p'.
   *
   * @default 'p'
   */
  elementType?: E;
}

export interface TextProps<T extends ElementType = 'p'>
  extends TextElementTypeProps<T>, ChildrenProps, StyleProps, TransferProps, TypographyBaseProps {}

export interface SpiritTextProps<T extends ElementType = 'p', S = void, Emph = void, C = void>
  extends
    TextProps<T>,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    TextColorProps<TextColorsType<C>> {}
