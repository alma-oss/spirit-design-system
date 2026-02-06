'use client';

import classNames from 'classnames';
import React from 'react';
import { useI18n, useStyleProps } from '../../hooks';
import { type TooltipCloseButtonProps } from '../../types';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import { useTooltipStyleProps } from './useTooltipStyleProps';

const TooltipCloseButton = ({ label, onClick, ...restProps }: TooltipCloseButtonProps) => {
  const { t } = useI18n();
  const closeLabel = label ?? t('common.close');
  const { classProps, props: modifiedProps } = useTooltipStyleProps(restProps);
  const { styleProps } = useStyleProps({ ...modifiedProps });

  return (
    <button
      type="button"
      className={classNames(classProps.closeButtonClassName, styleProps.className)}
      style={styleProps.style}
      onClick={onClick}
      aria-expanded="true"
    >
      <Icon name="close" aria-hidden="true" />
      <VisuallyHidden>{closeLabel}</VisuallyHidden>
    </button>
  );
};

TooltipCloseButton.spiritComponent = 'TooltipCloseButton';

export default TooltipCloseButton;
