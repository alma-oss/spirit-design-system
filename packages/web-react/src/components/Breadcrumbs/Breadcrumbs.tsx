'use client';

import React, { type ElementType, Fragment } from 'react';
import { useDeprecationMessage, useI18n, useStyleProps } from '../../hooks';
import { resolveComponentString } from '../../translations';
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
  const { t } = useI18n();
  const resolvedBackLabel = resolveComponentString(
    strings?.label?.back ?? goBackTitle ?? { key: 'breadcrumbs.back' },
    t,
  );
  const resolvedAriaLabel = resolveComponentString(strings?.ariaLabel?.nav ?? { key: 'breadcrumbs.ariaLabel' }, t);

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
