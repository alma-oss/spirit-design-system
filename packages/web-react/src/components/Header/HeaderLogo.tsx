'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type HeaderLogoProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritHeaderLogoProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const defaultProps: Partial<SpiritHeaderLogoProps> = {
  elementType: 'a',
};

const _HeaderLogo = <E extends ElementType = 'a'>(
  props: SpiritHeaderLogoProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType as ElementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useHeaderStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.logo, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </Component>
  );
};

const HeaderLogo = forwardRef<HTMLAnchorElement, SpiritHeaderLogoProps<'a'>>(
  _HeaderLogo,
) as unknown as PolymorphicComponent<'a', HeaderLogoProps>;

HeaderLogo.spiritComponent = 'HeaderLogo';
HeaderLogo.displayName = 'HeaderLogo';

export default HeaderLogo;
