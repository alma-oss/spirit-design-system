'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useLinkClick, useStyleProps } from '../../hooks';
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
  const { elementType = 'a', children, isCurrent, routerOptions, ...restProps } = props;
  const { href } = restProps;

  const Component = elementType as ElementType;

  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.headerLink,
    styleProps,
    otherProps,
  });

  const handleClick = useLinkClick({ ...restProps, routerOptions });

  return (
    <Component {...otherProps} {...mergedStyleProps} href={href} onClick={handleClick} ref={ref}>
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
