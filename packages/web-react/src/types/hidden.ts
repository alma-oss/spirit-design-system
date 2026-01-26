import { type ElementType } from 'react';
import { type BreakpointToken, type ChildrenProps, type PolymorphicComponentProps, type StyleProps } from './shared';

/** ===== BASE API ===== */
export interface HiddenBaseProps extends ChildrenProps, StyleProps {}

/** ===== STYLE API ===== */
export interface HiddenStyleProps extends HiddenBaseProps {
  /** Hide from breakpoint onwards */
  from?: BreakpointToken;
  /** Hide on specific breakpoints */
  on?: BreakpointToken | BreakpointToken[];
}

/** ===== INTERNAL API ===== */
export interface HiddenProps extends HiddenStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritHiddenProps<E extends ElementType = 'span'> = PolymorphicComponentProps<E, HiddenProps>;
