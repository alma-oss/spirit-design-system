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
export interface CaptionTextProps<C = void>
  extends ChildrenProps, StyleProps, TypographyBaseProps, TextColorProps<TextColorsType<C>> {}

/** ===== PUBLIC API ===== */
export type SpiritCaptionTextProps<E extends ElementType = 'span', C = void> = PolymorphicComponentProps<
  E,
  CaptionTextProps<C>
>;
