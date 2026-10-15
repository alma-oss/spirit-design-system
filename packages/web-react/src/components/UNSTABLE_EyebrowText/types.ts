import { type ElementType } from 'react';
import type {
  ChildrenProps,
  PolymorphicComponentProps,
  StyleProps,
  TextColorProps,
  TextColorsType,
  TypographyBaseProps,
} from '../../types';

/** ===== INTERNAL API ===== */
export interface EyebrowTextProps<C = void>
  extends ChildrenProps, StyleProps, TypographyBaseProps, TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritEyebrowTextProps<E extends ElementType = 'p', C = void> = PolymorphicComponentProps<
  E,
  EyebrowTextProps<C>
>;
