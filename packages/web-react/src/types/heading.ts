import { type ElementType } from 'react';
import type {
  ChildrenProps,
  EmphasisDictionaryType,
  EmphasisProps,
  PolymorphicComponentProps,
  SizeExtendedDictionaryType,
  SizeProps,
  StyleProps,
  TextColorProps,
  TextColorsType,
  TypographyBaseProps,
} from './shared';

export type HeadingColorsType<C = undefined> = TextColorsType<C>;

/** ===== INTERNAL API ===== */
export interface HeadingProps<S = void, Emph = void, C = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    TextColorProps<HeadingColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritHeadingProps<
  E extends ElementType = 'h1',
  S = void,
  Emph = void,
  C = void,
> = PolymorphicComponentProps<E, HeadingProps<S, Emph, C>>;
