import { type ElementType, type ReactNode } from 'react';
import { type PolymorphicComponentProps, type StyleProps } from './shared';

export interface LabelProps {
  children?: ReactNode;
  htmlFor?: string; // for compatibility with React
  for?: string;
}

/** ===== INTERNAL API ===== */
export interface LabelBaseProps extends LabelProps, StyleProps {
  id?: string;
}

/** ===== PUBLIC API ===== */
export type SpiritLabelProps<E extends ElementType = 'label'> = PolymorphicComponentProps<E, LabelBaseProps>;
