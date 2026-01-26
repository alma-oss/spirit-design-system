'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type HeaderLogoBaseProps,
  type HeaderLogoProps,
  type PolymorphicComponent,
  type PolymorphicRef,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useUnstableHeaderStyleProps } from './useUnstableHeaderStyleProps';

const defaultProps: Partial<HeaderLogoProps> = {
  elementType: 'a',
};

const _HeaderLogo = <E extends ElementType = 'a'>(props: HeaderLogoProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType as ElementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useUnstableHeaderStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.logo, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </Component>
  );
};

const UNSTABLE_HeaderLogo = forwardRef(_HeaderLogo) as unknown as PolymorphicComponent<'a', HeaderLogoBaseProps>;

UNSTABLE_HeaderLogo.spiritComponent = 'UNSTABLE_HeaderLogo';
UNSTABLE_HeaderLogo.displayName = 'UNSTABLE_HeaderLogo';

export default UNSTABLE_HeaderLogo;
