'use client';

import React from 'react';
import { useI18n } from '../../hooks';
import { type TooltipCloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';

const TooltipCloseButton = ({ label, onClick, ...restProps }: TooltipCloseButtonProps) => {
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');

  return (
    <ControlButton {...restProps} isSymmetrical onClick={onClick} aria-expanded="true">
      <Icon name="close" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
};

TooltipCloseButton.spiritComponent = 'TooltipCloseButton';

export default TooltipCloseButton;
