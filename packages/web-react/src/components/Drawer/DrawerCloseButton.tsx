'use client';

import React from 'react';
import { type DrawerCloseButtonProps } from '../../types';
import { CloseButton } from '../CloseButton';
import { useDrawerContext } from './DrawerContext';

const DrawerCloseButton = (props: DrawerCloseButtonProps) => {
  const { label, ...restProps } = props;
  const { id, isOpen, onClose } = useDrawerContext();

  return (
    <CloseButton
      {...restProps}
      label={label}
      size="large"
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onClose}
    />
  );
};

DrawerCloseButton.spiritComponent = 'DrawerCloseButton';

export default DrawerCloseButton;
