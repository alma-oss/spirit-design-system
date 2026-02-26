'use client';

import classNames from 'classnames';
import React from 'react';
import { useStyleProps } from '../../hooks';
import { type ChildrenProps, type StyleProps } from '../../types';
import { useDropdownContext } from './DropdownContext';
import { useDropdownAriaProps } from './useDropdownAriaProps';
import { useDropdownStyleProps } from './useDropdownStyleProps';

interface DropdownPopoverProps extends ChildrenProps, StyleProps {}

const DropdownPopover = (props: DropdownPopoverProps) => {
  const { children, ...rest } = props;
  const { id, isOpen, onToggle, fullWidthMode, placement } = useDropdownContext();
  const { classProps, props: modifiedProps } = useDropdownStyleProps({ isOpen, placement, ...rest });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const { contentProps } = useDropdownAriaProps({ id, isOpen, toggleHandler: onToggle, placement, fullWidthMode });

  return (
    <div
      className={classNames(classProps.popover, styleProps.className)}
      style={styleProps.style}
      {...contentProps}
      {...otherProps}
    >
      {children}
    </div>
  );
};

DropdownPopover.spiritComponent = 'DropdownPopover';

export default DropdownPopover;
