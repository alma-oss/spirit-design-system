import { type ElementType } from 'react';
import { type BreakpointToken, type ChildrenProps, type PolymorphicComponentProps, type StyleProps } from './shared';

export interface HiddenBaseProps extends ChildrenProps, StyleProps {
  /** Hide from breakpoint onwards */
  from?: BreakpointToken;
  /** Hide on specific breakpoints */
  on?: BreakpointToken | BreakpointToken[];
}

export type HiddenProps<E extends ElementType = 'span'> = PolymorphicComponentProps<E, HiddenBaseProps>;

/** @deprecated Use HiddenProps instead */
export type SpiritHiddenProps<E extends ElementType = 'span'> = HiddenProps<E>;
