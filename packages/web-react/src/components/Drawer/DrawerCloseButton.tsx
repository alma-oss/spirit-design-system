'use client';

import React from 'react';
import { useI18n } from '../../hooks';
import { type DrawerCloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { useDrawerContext } from './DrawerContext';

const DrawerCloseButton = (props: DrawerCloseButtonProps) => {
  const { label, ...restProps } = props;
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');
  const { id, isOpen, onClose } = useDrawerContext();

  return (
    <ControlButton
      {...restProps}
      aria-expanded={isOpen}
      aria-controls={id}
      onClick={onClose}
      isSymmetrical
      size="large"
    >
      <Icon name="close" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
};

DrawerCloseButton.spiritComponent = 'DrawerCloseButton';

export default DrawerCloseButton;
