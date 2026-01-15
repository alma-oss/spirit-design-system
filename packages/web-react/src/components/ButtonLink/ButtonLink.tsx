'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useLinkClick, useStyleProps } from '../../hooks';
import {
  type ButtonProps,
  type ButtonSizesType,
  type PolymorphicComponent,
  type PolymorphicRef,
  type RouterLinkProps,
  type SpiritButtonLinkProps,
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
  size: 'medium' as ButtonSizesType,
};

const _ButtonLink = <E extends ElementType = 'a', C = void, S = void>(
  props: SpiritButtonLinkProps<E, C, S>,
  ref: PolymorphicRef<E>,
) => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, routerOptions, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { buttonLinkProps } = useButtonLinkProps(propsWithDefaults);
  const { classProps, props: modifiedProps } = useButtonLinkStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  const handleClick = useLinkClick({
    ...restProps,
    routerOptions,
    onClick: buttonLinkProps.onClick,
  });

  return (
    <Component {...otherProps} {...buttonLinkProps} {...mergedStyleProps} onClick={handleClick} ref={ref}>
      {children}
      {restProps.isLoading && <Spinner />}
    </Component>
  );
};

const ButtonLink = forwardRef<HTMLAnchorElement, SpiritButtonLinkProps<'a', void, void>>(
  _ButtonLink,
) as unknown as PolymorphicComponent<'a', Omit<ButtonProps<void, void>, 'type'> & RouterLinkProps>;

ButtonLink.spiritComponent = 'ButtonLink';
ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
