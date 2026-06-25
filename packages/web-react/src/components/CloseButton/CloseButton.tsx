'use client';

import React, { forwardRef } from 'react';
import { useI18n } from '../../hooks';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { type CloseButtonProps } from './types';

const defaultProps: Partial<CloseButtonProps> = {
  isSymmetrical: true,
};

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { label, ...restProps } = propsWithDefaults;
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');

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
