'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useLinkClick, useStyleProps } from '../../hooks';
import {
  type HeaderDialogLinkProps,
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritDialogHeaderLinkProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderDialogLink = <E extends ElementType = 'a'>(
  props: SpiritDialogHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType = 'a', children, isCurrent, routerOptions, ...restProps } = props;

  const Component = elementType as ElementType;

  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, {
    classProps: classProps.headerDialogLink,
    styleProps,
    otherProps,
  });

  const handleClick = useLinkClick({ ...restProps, routerOptions });

  return (
    <Component {...otherProps} {...mergedStyleProps} onClick={handleClick} ref={ref}>
      {children}
    </Component>
  );
};

const HeaderDialogLink = forwardRef<HTMLAnchorElement, SpiritDialogHeaderLinkProps<'a'>>(
  _HeaderDialogLink,
) as unknown as PolymorphicComponent<'a', HeaderDialogLinkProps>;

HeaderDialogLink.spiritComponent = 'HeaderDialogLink';
HeaderDialogLink.displayName = 'HeaderDialogLink';

export default HeaderDialogLink;
