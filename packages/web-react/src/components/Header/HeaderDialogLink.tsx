'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type PolymorphicRef, type SpiritDialogHeaderLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_HeaderDialogLink'] }] */
const _HeaderDialogLink = <E extends ElementType = 'a'>(
  props: SpiritDialogHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType: ElementTag = 'a', children, isCurrent, routerOptions, ...restProps } = props;
  const { href, target, onClick } = restProps;
  const router = useRouter();
  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.headerDialogLink,
    styleProps,
    otherProps,
  });

  const handleClick = handleLinkClick({
    router,
    href,
    target,
    routerOptions,
    onClick: onClick as ((event: ClickEvent) => void) | undefined,
  });

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} href={href} onClick={handleClick} ref={ref}>
      {children}
    </ElementTag>
  );
};

const HeaderDialogLink = forwardRef<HTMLAnchorElement, SpiritDialogHeaderLinkProps<ElementType>>(_HeaderDialogLink);

HeaderDialogLink.spiritComponent = 'HeaderDialogLink';

export default HeaderDialogLink;
