'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type HeaderLinkBaseProps,
  type HeaderLinkProps,
  type PolymorphicComponent,
  type PolymorphicRef,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderLink = <E extends ElementType = 'a'>(props: HeaderLinkProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
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

const HeaderLink = forwardRef(_HeaderLink) as unknown as PolymorphicComponent<'a', HeaderLinkBaseProps>;

HeaderLink.spiritComponent = 'HeaderLink';
HeaderLink.displayName = 'HeaderLink';

export default HeaderLink;
