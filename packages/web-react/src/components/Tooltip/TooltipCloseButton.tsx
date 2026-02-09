'use client';

import classNames from 'classnames';
import React from 'react';
import { useI18n, useStyleProps } from '../../hooks';
import { type TooltipCloseButtonProps } from '../../types';
import { ControlButton } from '../ControlButton';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { useTooltipStyleProps } from './useTooltipStyleProps';

const TooltipCloseButton = ({ label, onClick, ...restProps }: TooltipCloseButtonProps) => {
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');
  const { classProps, props: modifiedProps } = useTooltipStyleProps(restProps);
  const { styleProps } = useStyleProps({ ...modifiedProps });

  return (
    <ControlButton
      onClick={onClick}
      aria-expanded="true"
      isSymmetrical
      isSubtle
      UNSAFE_className={classNames(classProps.closeButtonClassName, styleProps.className)}
      UNSAFE_style={styleProps.style}
    >
      <Icon name="close" aria-hidden="true" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
};

TooltipCloseButton.spiritComponent = 'TooltipCloseButton';

export default TooltipCloseButton;
