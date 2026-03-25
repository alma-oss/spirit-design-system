'use client';

import React from 'react';
import { useStyleProps } from '../../hooks';
import { type ToastCloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { useToastBarStyleProps } from './useToastBarStyleProps';

const ToastCloseButton = (props: ToastCloseButtonProps) => {
  const { onClose, isOpen, id, closeLabel, isDismissible, ...restProps } = props;
  const { props: modifiedProps } = useToastBarStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);

  if (isDismissible && onClose) {
    return (
      <ControlButton
        {...otherProps}
        onClick={onClose}
        aria-expanded={isOpen}
        aria-controls={id}
        isSubtle
        isSymmetrical
        UNSAFE_className={styleProps.className}
        UNSAFE_style={styleProps.style}
      >
        <Icon name="close" />
        <VisuallyHidden>{closeLabel}</VisuallyHidden>
      </ControlButton>
    );
  }

  return null;
};

ToastCloseButton.spiritComponent = 'ToastCloseButton';

export default ToastCloseButton;
