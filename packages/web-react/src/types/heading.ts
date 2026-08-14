import { type ElementType } from 'react';
import type {
  ChildrenProps,
  EmphasisDictionaryType,
  EmphasisProps,
  FontWeightDictionaryType,
  FontWeightProps,
  ItalicProps,
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
export interface HeadingProps<S = void, Emph = void, C = void, FW = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    FontWeightProps<FontWeightDictionaryType<FW>>,
    ItalicProps,
    TextColorProps<HeadingColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritHeadingProps<
  E extends ElementType = 'h1',
  S = void,
  Emph = void,
  C = void,
  FW = void,
> = PolymorphicComponentProps<E, HeadingProps<S, Emph, C, FW>>;
