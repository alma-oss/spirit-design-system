'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type LinkProps, type PolymorphicComponent, type PolymorphicRef, type SpiritLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useLinkStyleProps } from './useLinkStyleProps';

const defaultProps = {
  elementType: 'a',
  color: 'primary',
  hasVisitedStyleAllowed: false,
  underlined: 'hover',
};

const _Link = <E extends ElementType = 'a', C = void>(
  props: SpiritLinkProps<E, C>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = defaultProps.elementType, children, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps, props: modifiedProps } = useLinkStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps, styleProps, otherProps });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={restProps.href} ref={ref}>
      {children}
    </Component>
  );
};

const Link = forwardRef<HTMLAnchorElement, SpiritLinkProps<'a', void>>(_Link) as unknown as PolymorphicComponent<
  'a',
  LinkProps<void>
>;

Link.spiritComponent = 'Link';
Link.displayName = 'Link';

export default Link;
