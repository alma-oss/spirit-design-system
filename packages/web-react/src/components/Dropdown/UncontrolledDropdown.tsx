'use client';

import classNames from 'classnames';
import React, { useRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type UncontrolledDropdownProps } from '../../types';
import { DropdownProvider } from './DropdownContext';
import { useDropdown } from './useDropdown';
import { useDropdownStyleProps } from './useDropdownStyleProps';

const UncontrolledDropdown = (props: UncontrolledDropdownProps) => {
  const { children, enableAutoClose = true, fullWidthMode, id, onAutoClose, placement, ...rest } = props;
  const { classProps, props: modifiedProps } = useDropdownStyleProps(rest);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const { isOpen, toggleHandler: onToggle } = useDropdown({ dropdownRef, triggerRef, enableAutoClose, onAutoClose });

  return (
    <DropdownProvider value={{ id, isOpen, fullWidthMode, placement, onToggle, dropdownRef, triggerRef }}>
      <div
        ref={dropdownRef}
        {...styleProps}
        {...otherProps}
        className={classNames(classProps.root, styleProps.className)}
      >
        {children}
      </div>
    </DropdownProvider>
  );
};

UncontrolledDropdown.spiritComponent = 'UncontrolledDropdown';

export default UncontrolledDropdown;
