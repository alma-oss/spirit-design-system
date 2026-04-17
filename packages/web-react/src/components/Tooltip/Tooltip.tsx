'use client';

import { cssLengthToPixels } from '@alma-oss/spirit-common/utilities/cssLengthToPixels';
import React, { type ElementType, forwardRef, useRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritTooltipProps,
  type TooltipProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { TooltipProvider } from './TooltipContext';
import { useFloating } from './useFloating';
import { useTooltipStyleProps } from './useTooltipStyleProps';

const _Tooltip = <E extends ElementType = 'div'>(props: SpiritTooltipProps<E>, ref: PolymorphicRef<E>) => {
  const {
    children,
    elementType = 'div',
    enableFlipping: flipProp = true,
    enableFlippingCrossAxis: flipCrossAxis = true,
    enableShifting: shiftProp = true,
    enableSizing: sizeProp = true,
    flipFallbackAxisSideDirection = 'none',
    flipFallbackPlacements = ['bottom', 'top'],
    id,
    isDismissible = false,
    isFocusableOnHover = false,
    isOpen = false,
    onToggle,
    placement: tooltipPlacement,
    positionStrategy = 'absolute',
    trigger = ['click', 'hover'],
    ...restProps
  } = props;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useTooltipStyleProps({
    isDismissible,
    isOpen,
    ...restProps,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- incompatible type
  } as any);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.rootClassName,
    styleProps,
  });

  // Refs for FloatingUI
  const arrowRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(ref);

  // Get `--tooltip-max-width` and `--tooltip-offset` from CSS variables
  let tooltipMaxWidth: number | undefined;
  let tooltipOffset: number | undefined;
  let tooltipCornerOffset: number | undefined;
  let tooltipArrowWidth: number | undefined;
  const tooltipElement = tooltipRef.current?.querySelector('[data-spirit-element="tooltip"]');
  const tooltipArrowElement = tooltipElement?.querySelector('[data-spirit-element="tooltip-arrow"]');

  if (tooltipElement) {
    const tooltipComputedStyle = window.getComputedStyle(tooltipElement);
    const tooltipArrowComputedStyle = tooltipArrowElement && window.getComputedStyle(tooltipArrowElement);
    const maxWidthFromVar = cssLengthToPixels(tooltipComputedStyle.getPropertyValue('--tooltip-max-width').trim());
    tooltipMaxWidth = maxWidthFromVar ?? cssLengthToPixels(tooltipComputedStyle.maxWidth);

    tooltipOffset = cssLengthToPixels(tooltipComputedStyle.getPropertyValue('--tooltip-offset')) ?? 0;
    tooltipCornerOffset = tooltipArrowComputedStyle
      ? (cssLengthToPixels(tooltipArrowComputedStyle.getPropertyValue('--tooltip-arrow-corner-offset')) ?? 0)
      : 0;

    tooltipArrowWidth = 0;
    if (tooltipArrowElement instanceof HTMLElement) {
      const laidOutWidth = tooltipArrowElement.offsetWidth;
      tooltipArrowWidth =
        laidOutWidth > 0 ? laidOutWidth : (cssLengthToPixels(tooltipArrowComputedStyle?.width ?? '') ?? 0);
    }
  }

  // Get props for the FloatingUI hook
  const { getFloatingProps, getReferenceProps, maxWidth, middlewareData, placement, refs, x, y, position } =
    useFloating({
      arrowRef,
      cornerOffset: tooltipCornerOffset,
      flipCrossAxis,
      flipFallbackAxisSideDirection,
      flipFallbackPlacements,
      flipProp,
      isDismissible,
      isFocusableOnHover,
      isOpen,
      offset: tooltipOffset,
      onToggle,
      shiftProp,
      sizeProp,
      positionStrategy,
      tooltipArrowWidth,
      tooltipMaxWidth,
      tooltipPlacement,
      trigger,
    });

  return (
    <TooltipProvider
      value={{
        anchorRef: refs.setPositionReference,
        arrowRef,
        getFloatingProps,
        getReferenceProps,
        id,
        isDismissible,
        isOpen,
        middlewareData,
        onToggle,
        placement,
        sizeMaxWidth: maxWidth,
        tooltipMaxWidth,
        tooltipRef: refs.setFloating,
        triggerRef: refs.setReference,
        x,
        y,
        position,
      }}
    >
      <Component {...otherProps} ref={tooltipRef} {...mergedStyleProps}>
        {children}
      </Component>
    </TooltipProvider>
  );
};

const Tooltip = forwardRef<HTMLDivElement, SpiritTooltipProps<'div'>>(_Tooltip) as unknown as PolymorphicComponent<
  'div',
  TooltipProps
>;

Tooltip.spiritComponent = 'Tooltip';
Tooltip.displayName = 'Tooltip';

export default Tooltip;
