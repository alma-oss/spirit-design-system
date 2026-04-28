'use client';

import classNames from 'classnames';
import React, { type KeyboardEventHandler, type MutableRefObject, useCallback, useRef } from 'react';
import { useOverlay, useStyleProps } from '../../hooks';
import { type SpiritDropdownProps } from '../../types';
import { DropdownProvider } from './DropdownContext';
import { useDropdownStyleProps } from './useDropdownStyleProps';

const Dropdown = (props: SpiritDropdownProps) => {
  const {
    children,
    enableAutoClose = true,
    fullWidthMode,
    id,
    isOpen = false,
    onAutoClose,
    onToggle,
    placement,
    triggerRef: externalTriggerRef,
    ...rest
  } = props;
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, ...rest });
  const { styleProps, props: transferProps } = useStyleProps(modifiedProps);
  const { onKeyDown: onUserKeyDown, ...otherProps } = transferProps;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const internalTriggerRef = useRef<HTMLElement | null>(null);
  const triggerRef: MutableRefObject<HTMLElement | null | undefined> = externalTriggerRef ?? internalTriggerRef;

  const closeOverlay = useCallback(() => {
    if (!isOpen) {
      return;
    }

    onToggle();

    queueMicrotask(() => {
      triggerRef.current?.focus();
    });
  }, [isOpen, onToggle, triggerRef]);

  const closeOverlayFromOutside = useCallback(
    (event: Event) => {
      if (!isOpen) {
        return;
      }

      onAutoClose?.(event);
      onToggle();
    },
    [isOpen, onAutoClose, onToggle],
  );

  const { onOverlayKeyDown } = useOverlay({
    isOpen,
    overlayRef: dropdownRef,
    onClose: closeOverlay,
    closeOnInteractOutside: enableAutoClose,
    onCloseOnInteractOutside: closeOverlayFromOutside,
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
    <DropdownProvider value={{ id, isOpen, fullWidthMode, placement, onToggle, dropdownRef, triggerRef }}>
      <div
        ref={dropdownRef}
        className={classNames(classProps.root, styleProps.className)}
        style={styleProps.style}
        {...mergedProps}
      >
        {children}
      </div>
    </DropdownProvider>
  );
};

Dropdown.spiritComponent = 'Dropdown';

export default Dropdown;
