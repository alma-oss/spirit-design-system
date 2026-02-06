import { type ElementType } from 'react';
import { type ChildrenProps, type PolymorphicComponentProps, type SpacingProp, type StyleProps } from './shared';

/** ===== BASE API ===== */
export interface StackBaseProps extends ChildrenProps, SpacingProp, StyleProps {}

export interface StackItemBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface StackStyleProps extends StackBaseProps {
  /** Whether the Stack has divider on the end */
  hasEndDivider?: boolean;
  /** Whether the Stack has divider between items */
  hasIntermediateDividers?: boolean;
  /** Whether the Stack has spacing */
  hasSpacing?: boolean;
  /** Whether the Stack has divider on the start */
  hasStartDivider?: boolean;
}

export interface StackItemStyleProps extends StackItemBaseProps {}

/** ===== INTERNAL API ===== */
export interface StackProps extends StackStyleProps {}

export interface StackItemProps extends StackItemStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritStackProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackProps>;

export type SpiritStackItemProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackItemProps>;
