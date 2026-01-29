'use client';

import classNames from 'classnames';
import React, { forwardRef, type ElementType } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritComponentStaticProps, type TabLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { useTabsStyleProps } from './useTabsStyleProps';

const defaultProps: TabLinkProps = {
  itemProps: {},
};

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_TabLink'] }] */
const _TabLink = <E extends ElementType = 'a'>(
  props: TabLinkProps<E>,
  ref: PolymorphicRef<E>,
): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { elementType = 'a', children, itemProps = {}, ...restProps } = propsWithDefaults;
  
  const Component = elementType as React.ElementType;
  
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

const TabLink = forwardRef(_TabLink) as unknown as (<E extends ElementType = 'a'>(
  props: TabLinkProps<E> & { ref?: PolymorphicRef<E> }
) => React.ReactElement) &
  SpiritComponentStaticProps;

TabLink.spiritComponent = 'TabLink';
TabLink.displayName = 'TabLink';

export default TabLink;
