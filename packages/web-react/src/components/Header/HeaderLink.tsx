'use client';

import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type HeaderLinkProps, type PolymorphicRef, type SpiritComponentStaticProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_HeaderLink'] }] */
const _HeaderLink = <E extends ElementType = 'a'>(
  props: HeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType = 'a', children, isCurrent, ...restProps } = props;

  const Component = elementType as React.ElementType;

  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.headerLink,
    styleProps,
    otherProps,
  });

  return (
    <Component {...otherProps} {...mergedStyleProps} ref={ref}>
      {children}
    </Component>
  );
};

const HeaderLink = forwardRef(_HeaderLink) as unknown as (<E extends ElementType = 'a'>(
  props: HeaderLinkProps<E> & { ref?: PolymorphicRef<E> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

HeaderLink.spiritComponent = 'HeaderLink';
HeaderLink.displayName = 'HeaderLink';

export default HeaderLink;
