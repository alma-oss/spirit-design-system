'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type CardLinkProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritCardLinkProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useCardStyleProps } from './useCardStyleProps';

const defaultProps = {
  elementType: 'a',
};

const _CardLink = <E extends ElementType = 'a'>(props: SpiritCardLinkProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType, children, href, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps } = useCardStyleProps();
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.link, styleProps, otherProps });

  return (
    <Component {...otherProps} {...styleProps} {...mergedStyleProps} href={href} ref={ref}>
      {children}
    </Component>
  );
};

const CardLink = forwardRef<HTMLAnchorElement, SpiritCardLinkProps<'a'>>(_CardLink) as unknown as PolymorphicComponent<
  'a',
  CardLinkProps
>;

CardLink.spiritComponent = 'CardLink';
CardLink.displayName = 'CardLink';

export default CardLink;
