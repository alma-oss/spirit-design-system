'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type ButtonLinkProps,
  type ButtonStyleProps,
  type PolymorphicComponent,
  type PolymorphicRef,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { Spinner } from '../Spinner';
import { useButtonLinkProps } from './useButtonLinkProps';
import { useButtonLinkStyleProps } from './useButtonLinkStyleProps';

const defaultProps = {
  color: 'primary',
  elementType: 'a',
  /**
   * @deprecated "isBlock" property will be removed in the next major version. Please read component's README for more information.
   * @see https://jira.almacareer.tech/browse/DS-1897
   */
  isBlock: false,
  isDisabled: false,
  isLoading: false,
  isSymmetrical: false,
  size: 'medium',
};

const _ButtonLink = <T extends ElementType = 'a', C = void, S = void>(
  props: ButtonLinkProps<T, C, S>,
  ref: PolymorphicRef<T>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { buttonLinkProps } = useButtonLinkProps(restProps);
  const { classProps, props: modifiedProps } = useButtonLinkStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...buttonLinkProps} {...mergedStyleProps} ref={ref}>
      {children}
      {restProps.isLoading && <Spinner />}
    </Component>
  );
};

const ButtonLink = forwardRef(_ButtonLink) as unknown as PolymorphicComponent<
  'a',
  Omit<ButtonStyleProps<void, void>, 'type'>
>;

ButtonLink.spiritComponent = 'ButtonLink';
ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
