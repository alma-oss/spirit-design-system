'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type HeaderLinkProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritHeaderLinkProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderLink = <E extends ElementType = 'a'>(
  props: SpiritHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType = 'a', children, isCurrent, ...restProps } = props;

  const Component = elementType as ElementType;

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

const HeaderLink = forwardRef<HTMLAnchorElement, SpiritHeaderLinkProps<'a'>>(
  _HeaderLink,
) as unknown as PolymorphicComponent<'a', HeaderLinkProps>;

HeaderLink.spiritComponent = 'HeaderLink';
HeaderLink.displayName = 'HeaderLink';

export default HeaderLink;
