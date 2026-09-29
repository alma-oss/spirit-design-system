'use client';

import React, { type ElementType, Fragment } from 'react';
import { useDeprecationMessage, useStringProp, useStyleProps } from '../../hooks';
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
  const { children, elementType, goBackTitle, items, strings, ...restProps } = propsWithDefaults;
  const Component = elementType as ElementType;
  const { classProps, props: modifiedProps } = useBreadcrumbsStyleProps({ ...restProps });
  const { styleProps, props: otherProps } = useStyleProps(modifiedProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.root, styleProps });
  const { back: resolvedBackLabel, nav: resolvedAriaLabel } = useStringProp({
    back: { value: strings?.label?.back, deprecated: goBackTitle, key: 'breadcrumbs.back' },
    nav: { value: strings?.ariaLabel?.nav, key: 'breadcrumbs.ariaLabel' },
  });

  useDeprecationMessage({
    method: 'property',
    trigger: goBackTitle != null,
    componentName: 'Breadcrumbs',
    propertyProps: { deprecatedName: 'goBackTitle', newName: 'strings.label.back' },
  });

  const isLast = (index: number, itemsCount: number) => index === itemsCount - 1;

  return (
    <Component {...otherProps} {...mergedStyleProps} aria-label={resolvedAriaLabel}>
      <ol>
        {children ||
          items?.map((item, index) => (
            <Fragment key={`BreadcrumbsItem_${item.title}`}>
              {index === items.length - 2 && resolvedBackLabel && (
                <BreadcrumbsItem href={item.url || undefined} isGoBackOnly>
                  {resolvedBackLabel}
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
