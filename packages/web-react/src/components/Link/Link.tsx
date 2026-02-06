'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type PolymorphicRef, type SpiritLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { useLinkStyleProps } from './useLinkStyleProps';

const defaultProps: Partial<SpiritLinkProps> = {
  elementType: 'a',
  color: 'primary',
  hasVisitedStyleAllowed: false,
  underlined: 'hover',
};

const _Link = <E extends ElementType = 'a', T = void>(
  props: SpiritLinkProps<E, T>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const {
    elementType: ElementTag = defaultProps.elementType as ElementType,
    children,
    ...restProps
  } = propsWithDefaults;
  const { href, target, isDisabled, routerOptions, onClick } = restProps;
  const router = useRouter();
  const { classProps, props: modifiedProps } = useLinkStyleProps(restProps);
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps, styleProps, otherProps });

  const handleClick = handleLinkClick({
    router,
    href,
    isDisabled,
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

const Link = forwardRef<HTMLAnchorElement, SpiritLinkProps<ElementType>>(_Link);

Link.spiritComponent = 'Link';

export default Link;
