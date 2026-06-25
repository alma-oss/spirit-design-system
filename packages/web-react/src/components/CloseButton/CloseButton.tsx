'use client';

import React, { forwardRef } from 'react';
import { type CloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { useCloseButtonProps } from './useCloseButtonProps';

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { closeButtonProps, label } = useCloseButtonProps(props);

  return (
    <ControlButton {...closeButtonProps} ref={ref}>
      <Icon name="close" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </ControlButton>
  );
});

CloseButton.spiritComponent = 'CloseButton';
CloseButton.displayName = 'CloseButton';

export default CloseButton;
