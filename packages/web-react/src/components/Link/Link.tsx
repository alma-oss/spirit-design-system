'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type LinkProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useLinkStyleProps } from './useLinkStyleProps';

const defaultProps = {
  elementType: 'a' as const,
  color: 'primary' as const,
  hasVisitedStyleAllowed: false,
  underlined: 'hover' as const,
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_Link'] }] */
const _Link = <E extends ElementType = 'a', C = void>(
  props: LinkProps<E, C>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType,
    children,
    ...restProps
  } = propsWithDefaults;

  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps } = useLinkStyleProps(propsWithDefaults);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </Component>
  );
};

const Link = forwardRef(_Link) as unknown as (<E extends ElementType = 'a', C = void>(
  props: LinkProps<E, C> & { ref?: PolymorphicRef<E> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

Link.spiritComponent = 'Link';
Link.displayName = 'Link';

export default Link;
