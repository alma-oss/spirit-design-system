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

/** ===== INTERNAL API ===== */
export interface TextProps<S = void, Emph = void, C = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizeExtendedDictionaryType<S>>,
    EmphasisProps<EmphasisDictionaryType<Emph>>,
    TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritTextProps<E extends ElementType = 'p', S = void, Emph = void, C = void> = PolymorphicComponentProps<
  E,
  TextProps<S, Emph, C>
>;
