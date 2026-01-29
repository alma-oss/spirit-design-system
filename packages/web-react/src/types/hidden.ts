import { type ElementType, type JSXElementConstructor } from 'react';
import {
  type BreakpointToken,
  type ChildrenProps,
  type PolymorphicComponentProps,
  type PolymorphicRef,
  type StyleProps,
} from './shared';

export interface HiddenBaseProps extends ChildrenProps, StyleProps {
  /** Hide from breakpoint onwards */
  from?: BreakpointToken;
  /** Hide on specific breakpoints */
  on?: BreakpointToken | BreakpointToken[];
}

export type HiddenProps<E extends ElementType = 'span'> = PolymorphicComponentProps<
  E | JSXElementConstructor<unknown>,
  HiddenBaseProps
>;

/** @deprecated Use HiddenProps instead */
export type SpiritHiddenProps<E extends ElementType = 'span'> = HiddenProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a Hidden component
 */
export type HiddenRef<E extends ElementType = 'span'> = PolymorphicRef<E>;
