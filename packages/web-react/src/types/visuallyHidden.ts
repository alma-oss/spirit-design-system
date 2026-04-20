import { type ElementType } from 'react';
import { type ChildrenProps, type PolymorphicComponentProps, type StyleProps } from './shared';

/** ===== INTERNAL API ===== */
export interface VisuallyHiddenProps extends ChildrenProps, StyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritVisuallyHiddenProps<E extends ElementType = 'span'> = PolymorphicComponentProps<
  E,
  VisuallyHiddenProps
>;
