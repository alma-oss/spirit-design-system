'use client';

import React, { forwardRef, type ElementType, type ReactElement } from 'react';
import { useStyleProps } from '../../hooks';
import { type HeaderLogoProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useUnstableHeaderStyleProps } from './useUnstableHeaderStyleProps';

const defaultProps: Partial<HeaderLogoProps> = {
  elementType: 'a',
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_HeaderLogo'] }] */
const _HeaderLogo = <E extends ElementType = 'a'>(
  props: HeaderLogoProps<E>,
  ref: PolymorphicRef<E>,
): ReactElement => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  
  const Component = elementType as React.ElementType;

  const { classProps, props: modifiedProps } = useUnstableHeaderStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.logo, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </Component>
  );
};

const UNSTABLE_HeaderLogo = forwardRef(_HeaderLogo) as (<E extends ElementType = 'a'>(
  props: HeaderLogoProps<E> & { ref?: PolymorphicRef<E> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

UNSTABLE_HeaderLogo.spiritComponent = 'UNSTABLE_HeaderLogo';
UNSTABLE_HeaderLogo.displayName = 'UNSTABLE_HeaderLogo';

export default UNSTABLE_HeaderLogo;
