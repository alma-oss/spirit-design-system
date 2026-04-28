'use client';

import classNames from 'classnames';
import React, { type KeyboardEvent, type MutableRefObject, useCallback, useRef } from 'react';
import { useClickOutside, useStyleProps } from '../../hooks';
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
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const internalTriggerRef = useRef<HTMLElement | null>(null);
  const triggerRef: MutableRefObject<HTMLElement | null | undefined> = externalTriggerRef ?? internalTriggerRef;

  const closeHandler = (event: Event) => {
    if (!enableAutoClose) {
      return;
    }

    if (!triggerRef?.current?.contains(event?.target as Node)) {
      if (onAutoClose) {
        onAutoClose(event);
      }

      onToggle && isOpen && onToggle();
    }
  };

  useClickOutside({ ref: dropdownRef, callback: closeHandler });

  const escapeHandler = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (isOpen && event.key === 'Escape') {
        event.stopPropagation();
        onToggle();

        Promise.resolve().then(() => {
          triggerRef.current?.focus();
        });
      }
    },
    [isOpen, onToggle, triggerRef],
  );

  return (
    <DropdownProvider value={{ id, isOpen, fullWidthMode, placement, onToggle, dropdownRef, triggerRef }}>
      <div
        ref={dropdownRef}
        className={classNames(classProps.root, styleProps.className)}
        style={styleProps.style}
        onKeyDownCapture={escapeHandler}
        {...otherProps}
      >
        {children}
      </div>
    </DropdownProvider>
  );
};

Dropdown.spiritComponent = 'Dropdown';

export default Dropdown;
