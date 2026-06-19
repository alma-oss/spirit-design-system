'use client';

import React from 'react';
import { useI18n } from '../../hooks';
import { type ModalCloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';

const ModalCloseButton = ({ label, onClose, id, isOpen, ...restProps }: ModalCloseButtonProps) => {
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');

  return (
    <ControlButton
      {...restProps}
      isSymmetrical
      size="xlarge"
      onClick={onClose}
      aria-expanded={isOpen}
      aria-controls={id}
    >
      <Icon name="close" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
};

ModalCloseButton.spiritComponent = 'ModalCloseButton';

export default ModalCloseButton;
