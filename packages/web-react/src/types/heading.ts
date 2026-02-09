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

export type HeadingColorsType<C = undefined> = TextColorsType<C>;

export interface HeadingElementTypeProps<E extends ElementType> {
  /**
   * The HTML element or React element used to render the Heading, e.g. 'h2'.
   */
  elementType: E;
}

export interface HeadingProps<T extends ElementType>
  extends HeadingElementTypeProps<T>, ChildrenProps, StyleProps, TransferProps, TypographyBaseProps {}

export interface SpiritHeadingProps<T extends ElementType, S = void, Emph = void, C = void>
  extends
    HeadingProps<T>,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    TextColorProps<HeadingColorsType<C>> {}
