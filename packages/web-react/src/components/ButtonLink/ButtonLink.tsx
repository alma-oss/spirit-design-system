'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type ButtonLinkProps, type PolymorphicRef, type SpiritButtonLinkProps, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { Spinner } from '../Spinner';
import { useButtonLinkProps } from './useButtonLinkProps';
import { useButtonLinkStyleProps } from './useButtonLinkStyleProps';

const defaultProps = {
  color: 'primary' as const,
  elementType: 'a' as const,
  /**
   * @deprecated "isBlock" property will be removed in the next major version. Please read component's README for more information.
   * @see https://jira.almacareer.tech/browse/DS-1897
   */
  isBlock: false,
  isDisabled: false,
  isLoading: false,
  isSymmetrical: false,
  size: 'medium' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_ButtonLink'] }] */
const _ButtonLink = <T extends ElementType = 'a', C = void, S = void>(
  props: ButtonLinkProps<T, C, S>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { buttonLinkProps } = useButtonLinkProps(propsWithDefaults);
  const { classProps, props: modifiedProps } = useButtonLinkStyleProps(propsWithDefaults as SpiritButtonLinkProps<T, C, S>);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...buttonLinkProps} {...mergedStyleProps} ref={ref}>
      {children}
      {restProps.isLoading && <Spinner />}
    </Component>
  );
};

const ButtonLink = forwardRef(_ButtonLink) as unknown as (<T extends ElementType = 'a', C = void, S = void>(
  props: ButtonLinkProps<T, C, S> & { ref?: PolymorphicRef<T> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

ButtonLink.spiritComponent = 'ButtonLink';
ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
