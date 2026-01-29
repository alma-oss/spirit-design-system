import { type ElementType } from 'react';
import {
  type ChildrenProps,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type SpacingProp,
  type StyleProps,
} from './shared';

export interface StackBaseProps extends ChildrenProps, SpacingProp, StyleProps {
  /** Whether the Stack has divider on the end */
  hasEndDivider?: boolean;
  /** Whether the Stack has divider between items */
  hasIntermediateDividers?: boolean;
  /** Whether the Stack has spacing */
  hasSpacing?: boolean;
  /** Whether the Stack has divider on the start */
  hasStartDivider?: boolean;
}

export type StackProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackBaseProps>;

/** @deprecated Use StackProps instead */
export type SpiritStackProps<E extends ElementType = 'div'> = StackProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a Stack component
 */
export type StackRef<E extends ElementType = 'div'> = PolymorphicRef<E>;

export interface StackItemBaseProps extends ChildrenProps, StyleProps {}

export type StackItemProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, StackItemBaseProps>;

/** @deprecated Use StackItemProps instead */
export type SpiritStackItemProps<E extends ElementType = 'div'> = StackItemProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a StackItem component
 */
export type StackItemRef<E extends ElementType = 'div'> = PolymorphicRef<E>;
