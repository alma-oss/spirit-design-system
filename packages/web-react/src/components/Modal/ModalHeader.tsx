'use client';

import classNames from 'classnames';
import React from 'react';
import { useDeprecationMessage, useStyleProps } from '../../hooks';
import { type ModalHeaderProps } from '../../types';
import { CloseButton } from '../CloseButton';
import { useModalContext } from './ModalContext';
import { useModalStyleProps } from './useModalStyleProps';

const defaultProps: ModalHeaderProps = {
  hasCloseButton: true,
};

const ModalHeader = (props: ModalHeaderProps) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, closeLabel, hasCloseButton, strings, ...restProps } = propsWithDefaults;
  const { classProps } = useModalStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const { id, isOpen, onClose } = useModalContext();

  useDeprecationMessage({
    method: 'custom',
    trigger: closeLabel != null,
    componentName: 'ModalHeader',
    customText:
      'The "closeLabel" property is deprecated and will be removed in the next major version. Use "strings.ariaLabel.close" instead.',
  });

  return (
    <header {...otherProps} {...styleProps} className={classNames(classProps.header, styleProps.className)}>
      {children && (
        <h2 id={`${id}__title`} className={classProps.title}>
          {children}
        </h2>
      )}
      {hasCloseButton && (
        <CloseButton
          size="xlarge"
          aria-expanded={isOpen}
          aria-controls={id}
          strings={{ ariaLabel: { close: strings?.ariaLabel?.close ?? closeLabel } }}
          onClick={onClose}
        />
      )}
    </header>
  );
};

ModalHeader.spiritComponent = 'ModalHeader';

export default ModalHeader;
