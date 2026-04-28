'use client';

import React, { type ElementType } from 'react';
import { useOpenOnArrowDown, useStyleProps } from '../../hooks';
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
  const { elementType: ElementTag = 'button', children, ...rest } = propsWithDefaults;
  const { id, isOpen, onToggle, fullWidthMode, triggerRef } = useDropdownContext();
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, ...rest });
  const { styleProps: triggerStyleProps, props: transferProps } = useStyleProps(modifiedProps);
  const { onKeyDown: onUserKeyDown, ...otherProps } = transferProps;
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.trigger, triggerStyleProps });
  const hasPopup = otherProps['aria-haspopup'];
  const { triggerProps } = useDropdownAriaProps({
    id,
    isOpen,
    toggleHandler: onToggle,
    fullWidthMode,
    hasPopup: typeof hasPopup === 'string' || typeof hasPopup === 'boolean' ? hasPopup : undefined,
  });

  const handleKeyDown = useOpenOnArrowDown({
    isOpen,
    onToggle,
    onKeyDown: onUserKeyDown,
  });
  const mergedProps = { ...otherProps, ...triggerProps, onKeyDown: handleKeyDown };

  return (
    <ElementTag {...mergedProps} {...mergedStyleProps} ref={triggerRef}>
      {typeof children === 'function' ? children({ isOpen }) : children}
    </ElementTag>
  );
};

DropdownTrigger.spiritComponent = 'DropdownTrigger';

export default DropdownTrigger;
