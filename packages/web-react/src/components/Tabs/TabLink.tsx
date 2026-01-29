'use client';

import classNames from 'classnames';
import React, { type ElementType, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type PolymorphicRef, type SpiritTabLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { useTabsStyleProps } from './useTabsStyleProps';

const defaultProps: SpiritTabLinkProps = {
  itemProps: {},
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_TabLink'] }] */
const _TabLink = <E extends ElementType = 'a'>(props: SpiritTabLinkProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType: ElementTag = 'a', children, itemProps = {}, routerOptions, ...restProps } = propsWithDefaults;
  const { href, target, onClick } = restProps;
  const router = useRouter();
  const { classProps } = useTabsStyleProps();
  const { styleProps: itemStyleProps, props: itemTransferProps } = useStyleProps(itemProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.link });

  const handleClick = handleLinkClick({
    router,
    href,
    target,
    routerOptions,
    onClick: onClick as ((event: ClickEvent) => void) | undefined,
  });

  return (
    <li
      {...itemStyleProps}
      {...itemTransferProps}
      className={classNames(classProps.item, itemStyleProps.className)}
      role="presentation"
    >
      <ElementTag {...restProps} {...mergedStyleProps} href={href} onClick={handleClick} ref={ref}>
        {children}
      </ElementTag>
    </li>
  );
};

const TabLink = forwardRef<HTMLAnchorElement, SpiritTabLinkProps<ElementType>>(_TabLink);

TabLink.spiritComponent = 'TabLink';

export default TabLink;
