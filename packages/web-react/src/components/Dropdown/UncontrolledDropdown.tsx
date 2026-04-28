'use client';

import classNames from 'classnames';
import React, { type KeyboardEventHandler, type MutableRefObject, useCallback, useRef } from 'react';
import { useOverlay, useStyleProps } from '../../hooks';
import { type UncontrolledDropdownProps } from '../../types';
import { DropdownProvider } from './DropdownContext';
import { useDropdown } from './useDropdown';
import { useDropdownStyleProps } from './useDropdownStyleProps';

const UncontrolledDropdown = (props: UncontrolledDropdownProps) => {
  const {
    children,
    enableAutoClose = true,
    fullWidthMode,
    id,
    onAutoClose,
    placement,
    triggerRef: externalTriggerRef,
    ...rest
  } = props;
  const { classProps, props: modifiedProps } = useDropdownStyleProps(rest);
  const { styleProps, props: transferProps } = useStyleProps(modifiedProps);
  const { onKeyDown: onUserKeyDown, ...otherProps } = transferProps;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const mergedTriggerRef: MutableRefObject<HTMLElement | null | undefined> = externalTriggerRef ?? triggerRef;

  const { isOpen, toggleHandler: onToggle } = useDropdown({
    dropdownRef,
    triggerRef: mergedTriggerRef,
    enableAutoClose,
    onAutoClose,
  });
  const closeOverlay = useCallback(() => {
    if (!isOpen) {
      return;
    }

    onToggle();

    queueMicrotask(() => {
      mergedTriggerRef.current?.focus();
    });
  }, [isOpen, mergedTriggerRef, onToggle]);

  const { onOverlayKeyDown } = useOverlay({
    isOpen,
    overlayRef: dropdownRef,
    onClose: closeOverlay,
    closeOnInteractOutside: false,
  });

  const handleKeyDown: KeyboardEventHandler<HTMLElement> = useCallback(
    (event) => {
      onUserKeyDown?.(event);
      onOverlayKeyDown(event);
    },
    [onOverlayKeyDown, onUserKeyDown],
  );
  const mergedProps = { ...otherProps, onKeyDown: handleKeyDown };

  return (
    <DropdownProvider
      value={{ id, isOpen, fullWidthMode, placement, onToggle, dropdownRef, triggerRef: mergedTriggerRef }}
    >
      <div
        ref={dropdownRef}
        {...styleProps}
        {...mergedProps}
        className={classNames(classProps.root, styleProps.className)}
      >
        {children}
      </div>
    </DropdownProvider>
  );
};

UncontrolledDropdown.spiritComponent = 'UncontrolledDropdown';

export default UncontrolledDropdown;
