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
  const { children, elementType: ElementTag = 'nav', goBackTitle, items, ...restProps } = propsWithDefaults;
  const { classProps, props: modifiedProps } = useBreadcrumbsStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.root, styleProps });

  const isLast = (index: number, itemsCount: number) => index === itemsCount - 1;

  return (
    <ElementTag {...otherProps} {...mergedStyleProps} aria-label="Breadcrumb">
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
    </ElementTag>
  );
};

Breadcrumbs.spiritComponent = 'Breadcrumbs';

export default Breadcrumbs;
