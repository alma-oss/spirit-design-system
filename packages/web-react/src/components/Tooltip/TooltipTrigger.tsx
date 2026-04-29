'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type TooltipTriggerProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTooltipContext } from './TooltipContext';

const defaultProps: Partial<TooltipTriggerProps<ElementType>> = {
  elementType: 'button',
  children: null,
};

const TooltipTrigger = <E extends ElementType = 'button'>(props: TooltipTriggerProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { id, isOpen, triggerRef, getReferenceProps } = useTooltipContext();
  const { styleProps: triggerStyleProps, props: transferProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { triggerStyleProps, transferProps });

  return (
    <Component {...transferProps} {...mergedStyleProps} id={id} ref={triggerRef} {...getReferenceProps()}>
      {typeof children === 'function' ? children({ isOpen }) : children}
    </Component>
  );
};

TooltipTrigger.spiritComponent = 'TooltipTrigger';
TooltipTrigger.displayName = 'TooltipTrigger';

export default TooltipTrigger;
