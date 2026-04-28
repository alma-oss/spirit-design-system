'use client';

import classNames from 'classnames';
import React, { useRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritDivElementProps } from '../../types';
import { useDropdownContext } from './DropdownContext';
import { useDropdownAriaProps } from './useDropdownAriaProps';
import { useDropdownPopoverAutoFocus } from './useDropdownPopoverAutoFocus';
import { useDropdownPopoverDialogKeyboard } from './useDropdownPopoverDialogKeyboard';
import { useDropdownStyleProps } from './useDropdownStyleProps';

interface DropdownPopoverProps extends SpiritDivElementProps {}

const DropdownPopover = (props: DropdownPopoverProps) => {
  const { children, ...rest } = props;
  const { id, isOpen, onToggle, fullWidthMode, placement, triggerRef } = useDropdownContext();
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, placement, ...rest });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const { contentProps } = useDropdownAriaProps({ id, isOpen, toggleHandler: onToggle, fullWidthMode });
  const { onPopoverKeyDownCapture } = useDropdownPopoverDialogKeyboard({ isOpen, onToggle, triggerRef });
  const popoverRef = useRef<HTMLDivElement>(null);

  useDropdownPopoverAutoFocus({ isOpen, popoverRef });

  return (
    <div
      ref={popoverRef}
      className={classNames(classProps.popover, styleProps.className)}
      style={styleProps.style}
      onKeyDownCapture={onPopoverKeyDownCapture}
      {...contentProps}
      {...otherProps}
    >
      {children}
    </div>
  );
};

DropdownPopover.spiritComponent = 'DropdownPopover';

export default DropdownPopover;
