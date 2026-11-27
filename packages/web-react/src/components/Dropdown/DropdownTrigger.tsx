'use client';

import React, { type ElementType, type KeyboardEvent } from 'react';
import { KeyboardKey } from '../../constants';
import { ContextPropsProvider } from '../../context';
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
  const { elementType, children, ...rest } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { id, isOpen, onToggle, fullWidthMode, menuFocusRef, menuId, triggerRef } = useDropdownContext();
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, ...rest });
  const { styleProps: triggerStyleProps, props: transferProps } = useStyleProps(modifiedProps);
  const { onKeyDown: onUserKeyDown, ...otherProps } = transferProps;
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.trigger, triggerStyleProps });
  const hasPopup = otherProps['aria-haspopup'];
  const { triggerProps } = useDropdownAriaProps({
    id,
    isOpen,
    toggleHandler: onToggle,
    fullWidthMode,
    menuId,
    hasPopup: typeof hasPopup === 'string' || typeof hasPopup === 'boolean' ? hasPopup : undefined,
  });

  // A menu opens on its last item with ArrowUp, and on the first item otherwise.
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onUserKeyDown?.(event);

    if (!menuFocusRef || event.defaultPrevented) {
      return;
    }

    menuFocusRef.current = event.key === KeyboardKey.ArrowUp ? 'last' : 'first';

    if (menuId && !isOpen && event.key === KeyboardKey.ArrowUp) {
      event.preventDefault();
      onToggle();
    }
  };

  const handleKeyDown = useOpenOnArrowDown({
    isOpen,
    onToggle,
    onKeyDown: handleMenuKeyDown,
  });
  const mergedProps = { ...otherProps, ...triggerProps, onKeyDown: handleKeyDown };

  return (
    <ContextPropsProvider
      value={{
        navigationAvatar: { elementType: 'button' },
        tag: { elementType: 'button' },
      }}
    >
      <Component {...mergedProps} {...mergedStyleProps} ref={triggerRef}>
        {typeof children === 'function' ? children({ isOpen }) : children}
      </Component>
    </ContextPropsProvider>
  );
};

DropdownTrigger.spiritComponent = 'DropdownTrigger';
DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
