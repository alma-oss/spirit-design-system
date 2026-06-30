import { type ElementType } from 'react';
import type {
  ChildrenProps,
  PolymorphicComponentProps,
  SizeProps,
  SizesDictionaryType,
  StyleProps,
  TextColorProps,
  TextColorsType,
  TypographyBaseProps,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface ActionTextProps<C = void>
  extends
    ChildrenProps,
    StyleProps,
    TypographyBaseProps,
    SizeProps<SizesDictionaryType>,
    TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritActionTextProps<E extends ElementType = 'span', C = void> = PolymorphicComponentProps<
  E,
  ActionTextProps<C>
>;
