'use client';

import React from 'react';
import { type ModalCloseButtonProps } from '../../types';
import { CloseButton } from '../CloseButton';

const ModalCloseButton = ({ label, onClose, id, isOpen, ...restProps }: ModalCloseButtonProps) => (
  <CloseButton {...restProps} label={label} size="xlarge" onClick={onClose} aria-expanded={isOpen} aria-controls={id} />
);

ModalCloseButton.spiritComponent = 'ModalCloseButton';

export default ModalCloseButton;
