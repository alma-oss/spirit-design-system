'use client';

import React from 'react';
import { type TooltipCloseButtonProps } from '../../types';
import { CloseButton } from '../CloseButton';

const TooltipCloseButton = ({ label, onClick, ...restProps }: TooltipCloseButtonProps) => (
  <CloseButton {...restProps} label={label} onClick={onClick} aria-expanded="true" />
);

TooltipCloseButton.spiritComponent = 'TooltipCloseButton';

export default TooltipCloseButton;
