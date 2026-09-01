import { type ElementType } from 'react';
import type {
  ChildrenProps,
  ItalicProps,
  PolymorphicComponentProps,
  SizeProps,
  SizesDictionaryType,
  StyleProps,
  TextColorProps,
  TextColorsType,
  TypographyBaseProps,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface DisplayHeadingProps<C = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizesDictionaryType>,
    ItalicProps,
    TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritDisplayHeadingProps<E extends ElementType = 'h1', C = void> = PolymorphicComponentProps<
  E,
  DisplayHeadingProps<C>
>;
