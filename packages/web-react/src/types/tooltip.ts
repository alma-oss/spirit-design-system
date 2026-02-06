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

export interface TooltipPopoverProps extends ChildrenProps, StyleProps {}

export interface TooltipTriggerProps extends StyleProps, TransferProps {
  elementType?: ElementTypeProp;
  children?: string | ReactNode | ((props: { isOpen: boolean }) => ReactNode);
}

export interface TooltipCloseButtonProps extends StyleProps {
  onClick?: (event: ClickEvent) => void;
  label?: string;
}

export interface TooltipHandlingProps {
  isOpen?: boolean;
  onToggle: (isOpen: boolean) => void;
}

export interface TooltipBaseProps extends ChildrenProps, StyleProps {}

export interface UncontrolledTooltipProps extends TooltipStyleProps {}

/** ===== STYLE API ===== */
export interface TooltipStyleProps extends TooltipBaseProps, TooltipHandlingProps {
  closeLabel?: string;
  id: string;
  isDismissible?: boolean;
  placement?: Placement;
  enableFlipping?: boolean;
  enableFlippingCrossAxis?: boolean;
  enableShifting?: boolean;
  enableSizing?: boolean;
  flipFallbackAxisSideDirection?: 'none' | 'start' | 'end';
  flipFallbackPlacements?: Placement | Placement[];
  isFocusableOnHover?: boolean;
  positionStrategy?: Strategy;
  trigger?: TooltipTriggerType[];
}

/** ===== INTERNAL API ===== */
export interface TooltipProps extends TooltipStyleProps {}

// Backward compatibility with hooks
export interface BaseTooltipProps extends TooltipBaseProps {
  closeLabel?: string;
  id: string;
  isDismissible?: boolean;
  placement?: Placement;
}

export interface TooltipCustomProps extends TooltipHandlingProps {
  enableFlipping?: boolean;
  enableFlippingCrossAxis?: boolean;
  enableShifting?: boolean;
  enableSizing?: boolean;
  flipFallbackAxisSideDirection?: 'none' | 'start' | 'end';
  flipFallbackPlacements?: Placement | Placement[];
  isFocusableOnHover?: boolean;
  positionStrategy?: Strategy;
  trigger?: TooltipTriggerType[];
}

// Generic version for hooks (maintains backward compatibility)
export type TooltipPropsGeneric<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E,
  BaseTooltipProps & TooltipCustomProps
>;

/** ===== PUBLIC API ===== */
export type SpiritTooltipProps<E extends ElementType = 'div'> = PolymorphicComponentProps<E, TooltipProps>;
