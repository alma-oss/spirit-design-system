import { type Placement, type Strategy } from '@floating-ui/react';
import type { ElementType, JSXElementConstructor, ReactNode } from 'react';
import type {
  ChildrenProps,
  ClickEvent,
  ElementTypeProp,
  PolymorphicComponentProps,
  PolymorphicRef,
  StyleProps,
  TransferProps,
} from './shared';

export const TOOLTIP_TRIGGER = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  MANUAL: 'manual',
  OUTSIDE_PRESS: 'outside-press',
  ESCAPE_KEY: 'escape-key',
} as const;

export interface TooltipPopoverProps extends ChildrenProps, StyleProps {}

export type TooltipTriggerType = 'click' | 'hover' | 'focus' | 'manual';

export interface TooltipTriggerProps extends StyleProps, TransferProps {
  elementType?: ElementTypeProp;
  children?: string | ReactNode | ((props: { isOpen: boolean }) => ReactNode);
}

export interface UncontrolledTooltipProps extends BaseTooltipProps {}

export interface TooltipCloseButtonProps extends StyleProps {
  onClick?: (event: ClickEvent) => void;
  label?: string;
}

export interface TooltipHandlingProps {
  isOpen?: boolean;
  onToggle: (isOpen: boolean) => void;
}

export interface BaseTooltipProps extends ChildrenProps, StyleProps {
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

export type TooltipProps<E extends ElementType = 'div'> = PolymorphicComponentProps<
  E | JSXElementConstructor<unknown>,
  BaseTooltipProps & TooltipCustomProps
>;

/** @deprecated Use TooltipProps instead */
export type SpiritTooltipProps<E extends ElementType = 'div'> = TooltipProps<E>;

/**
 * @internal
 * Helper type to get the correct ref type for a Tooltip component
 */
export type TooltipRef<E extends ElementType = 'div'> = PolymorphicRef<E>;
