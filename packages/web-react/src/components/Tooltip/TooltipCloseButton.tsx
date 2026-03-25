'use client';

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
  const { props: modifiedProps } = useTooltipStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps({ ...modifiedProps });

  return (
    <ControlButton
      {...otherProps}
      onClick={onClick}
      aria-expanded="true"
      isSymmetrical
      isSubtle
      UNSAFE_className={styleProps.className}
      UNSAFE_style={styleProps.style}
    >
      <Icon name="close" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </ControlButton>
  );
};

TooltipCloseButton.spiritComponent = 'TooltipCloseButton';

export default TooltipCloseButton;
