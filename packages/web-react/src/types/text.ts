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

/** ===== INTERNAL API ===== */
export interface TextProps<S = void, Emph = void, C = void, FW = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    FontWeightProps<FontWeightDictionaryType<FW>>,
    ItalicProps,
    TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritTextProps<
  E extends ElementType = 'p',
  S = void,
  Emph = void,
  C = void,
  FW = void,
> = PolymorphicComponentProps<E, TextProps<S, Emph, C, FW>>;
