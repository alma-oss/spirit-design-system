'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type PolymorphicRef, type SpiritHeaderLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { useHeaderStyleProps } from './useHeaderStyleProps';

const _HeaderLink = <E extends ElementType = 'a'>(
  props: SpiritHeaderLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const { elementType: ElementTag = 'a', children, isCurrent, routerOptions, ...restProps } = props;
  const { href, target, onClick } = restProps;
  const router = useRouter();
  const { classProps } = useHeaderStyleProps({ isCurrentLink: isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, {
    classProps: classProps.headerLink,
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

const HeaderLink = forwardRef<HTMLAnchorElement, SpiritHeaderLinkProps<ElementType>>(_HeaderLink);

HeaderLink.spiritComponent = 'HeaderLink';

export default HeaderLink;
