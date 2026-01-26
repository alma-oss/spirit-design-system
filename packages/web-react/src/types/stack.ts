import { type ElementType } from 'react';
import { type ChildrenProps, type PolymorphicComponentProps, type SpacingProp, type StyleProps } from './shared';

export interface StackStyleProps extends ChildrenProps, SpacingProp, StyleProps {
  /** Whether the Stack has divider on the end */
  hasEndDivider?: boolean;
  /** Whether the Stack has divider between items */
  hasIntermediateDividers?: boolean;
  /** Whether the Stack has spacing */
  hasSpacing?: boolean;
  /** Whether the Stack has divider on the start */
  hasStartDivider?: boolean;
}

export type StackProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackStyleProps>;

/** @deprecated Use StackProps instead */
export type SpiritStackProps<E extends ElementType = 'div'> = StackProps<E>;

export interface StackItemStyleProps extends ChildrenProps, StyleProps {}

export type StackItemProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackItemStyleProps>;

/** @deprecated Use StackItemProps instead */
export type SpiritStackItemProps<E extends ElementType = 'div'> = StackItemProps<E>;
