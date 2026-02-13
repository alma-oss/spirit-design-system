'use client';

import classNames from 'classnames';
import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritTabLinkProps,
  type TabLinkProps,
} from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTabsStyleProps } from './useTabsStyleProps';

const defaultProps: TabLinkProps = {
  itemProps: {},
};

const _TabLink = <E extends ElementType = 'a'>(props: SpiritTabLinkProps<E>, ref: PolymorphicRef<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = 'a', children, itemProps = {}, ...restProps } = propsWithDefaults;

  const Component = elementType as ElementType;

  const { classProps } = useTabsStyleProps();
  const { styleProps: itemStyleProps, props: itemTransferProps } = useStyleProps(itemProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.link });

  return (
    <li
      {...itemStyleProps}
      {...itemTransferProps}
      className={classNames(classProps.item, itemStyleProps.className)}
      role="presentation"
    >
      <Component {...restProps} {...mergedStyleProps} ref={ref}>
        {children}
      </Component>
    </li>
  );
};

const TabLink = forwardRef<HTMLAnchorElement, SpiritTabLinkProps<'a'>>(_TabLink) as unknown as PolymorphicComponent<
  'a',
  TabLinkProps
>;

TabLink.spiritComponent = 'TabLink';
TabLink.displayName = 'TabLink';

export default TabLink;
