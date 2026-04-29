'use client';

import React, { type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type DropdownTriggerProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useDropdownContext } from './DropdownContext';
import { useDropdownAriaProps } from './useDropdownAriaProps';
import { useDropdownStyleProps } from './useDropdownStyleProps';

const defaultProps = {
  elementType: 'button',
};

const DropdownTrigger = <E extends ElementType = 'button'>(props: DropdownTriggerProps<E>) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, ...rest } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { id, isOpen, onToggle, fullWidthMode, triggerRef } = useDropdownContext();
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, ...rest });
  const { styleProps: triggerStyleProps, props: transferProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.trigger, triggerStyleProps });
  const { triggerProps } = useDropdownAriaProps({ id, isOpen, toggleHandler: onToggle, fullWidthMode });

  return (
    <Component {...transferProps} {...triggerProps} {...mergedStyleProps} ref={triggerRef}>
      {typeof children === 'function' ? children({ isOpen }) : children}
    </Component>
  );
};

DropdownTrigger.spiritComponent = 'DropdownTrigger';
DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
