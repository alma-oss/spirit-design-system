'use client';

import React, { forwardRef } from 'react';
import { useDeprecationMessage, useStringsProp } from '../../hooks';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { type CloseButtonProps } from './types';

const defaultProps: Partial<CloseButtonProps> = {
  isSymmetrical: true,
};

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { label, strings, ...restProps } = propsWithDefaults;
  const { closeLabel } = useStringsProp({
    closeLabel: { value: strings?.closeAria, deprecated: label, key: 'common.close' },
  });

  useDeprecationMessage({
    method: 'custom',
    trigger: label != null,
    componentName: 'CloseButton',
    customText:
      'The "label" property is deprecated and will be removed in the next major version. Use "strings.closeAria" instead.',
  });

  return (
    <ControlButton {...restProps} ref={ref}>
      <Icon name="close" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
});

CloseButton.spiritComponent = 'CloseButton';
CloseButton.displayName = 'CloseButton';

export default CloseButton;
