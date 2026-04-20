'use client';

import React, { type ElementType, Fragment } from 'react';
import { useStyleProps } from '../../hooks';
import { type SpiritBreadcrumbsProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import BreadcrumbsItem from './BreadcrumbsItem';
import { useBreadcrumbsStyleProps } from './useBreadcrumbsStyleProps';

const defaultProps: Partial<SpiritBreadcrumbsProps> = {
  elementType: 'nav',
  items: [],
};

const Breadcrumbs = <E extends ElementType = 'nav'>(props: SpiritBreadcrumbsProps<E>): JSX.Element => {
  const propsWithDefaults = { ...defaultProps, ...props };
  const { children, elementType, goBackTitle, items, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useBreadcrumbsStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps });

  const isLast = (index: number, itemsCount: number) => index === itemsCount - 1;

  return (
    <Component {...otherProps} {...mergedStyleProps} aria-label="Breadcrumb">
      <ol>
        {children ||
          items?.map((item, index) => (
            <Fragment key={`BreadcrumbsItem_${item.title}`}>
              {index === items.length - 2 && goBackTitle && (
                <BreadcrumbsItem href={item.url || undefined} isGoBackOnly>
                  {goBackTitle}
                </BreadcrumbsItem>
              )}
              <BreadcrumbsItem href={item.url || undefined} isCurrent={isLast(index, items?.length)}>
                {item.title}
              </BreadcrumbsItem>
            </Fragment>
          ))}
      </ol>
    </Component>
  );
};

Breadcrumbs.spiritComponent = 'Breadcrumbs';
Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;
