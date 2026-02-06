import { type Placement, type Strategy } from '@floating-ui/react';
import type { ElementType, ReactNode } from 'react';
import type {
  ChildrenProps,
  ClickEvent,
  ElementTypeProp,
  PolymorphicComponentProps,
  StyleProps,
  TransferProps,
} from './shared';

/** ===== BASE API ===== */
export const TOOLTIP_TRIGGER = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  MANUAL: 'manual',
  OUTSIDE_PRESS: 'outside-press',
  ESCAPE_KEY: 'escape-key',
} as const;

export type TooltipTriggerType = 'click' | 'hover' | 'focus' | 'manual';

export interface TooltipCloseButtonProps extends StyleProps {
  onClick?: (event: ClickEvent) => void;
  label?: string;
}

export interface TooltipState {
  isOpen?: boolean;
  onToggle: (isOpen: boolean) => void;
}

export interface TooltipBaseProps extends ChildrenProps, StyleProps {
  closeLabel?: string;
  id: string;
}

export interface TooltipStateProps {
  enableFlipping?: boolean;
  enableFlippingCrossAxis?: boolean;
  enableShifting?: boolean;
  enableSizing?: boolean;
  flipFallbackAxisSideDirection?: 'none' | 'start' | 'end';
  flipFallbackPlacements?: Placement | Placement[];
  isFocusableOnHover?: boolean;
  positionStrategy?: Strategy;
  trigger?: TooltipTriggerType[];
  placement?: Placement;
}

/** ===== STYLE API ===== */
export interface TooltipStyleProps extends TooltipBaseProps, TooltipState, TooltipStateProps {
  isDismissible?: boolean;
}

/** ===== INTERNAL API ===== */
export interface TooltipProps extends TooltipStyleProps {}

// Sub-components receive props from JSX, but get state/handlers from context
export interface TooltipPopoverProps extends ChildrenProps, StyleProps, TransferProps {}
export interface TooltipTriggerProps extends StyleProps, TransferProps {
  elementType?: ElementTypeProp;
  children?: string | ReactNode | ((props: { isOpen: boolean }) => ReactNode);
}

export interface UncontrolledTooltipProps extends TooltipStyleProps {}

/** ===== PUBLIC API ===== */
export type SpiritTooltipProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, TooltipProps>;
