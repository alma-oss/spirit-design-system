'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useI18n, useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritPaginationLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { usePaginationStyleProps } from './usePaginationStyleProps';

const _PaginationLink = <E extends ElementType = 'a'>(props: SpiritPaginationLinkProps<E>, ref: PolymorphicRef<E>) => {
  const { t } = useI18n();
  const { elementType = 'a', accessibilityLabel, isCurrent, pageNumber, ...restProps } = props;
  const visuallyHiddenLabel = accessibilityLabel || `${t('pagination.goToPage')} ${pageNumber}`;

  const Component = elementType as ElementType;

  const { classProps } = usePaginationStyleProps({ isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.link, styleProps, otherProps });

  return (
    <Component {...(isCurrent && { 'aria-current': 'page' })} {...otherProps} {...mergedStyleProps} ref={ref}>
      <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
      <span aria-hidden="true">{pageNumber}</span>
    </Component>
  );
};

const PaginationLink = forwardRef<HTMLAnchorElement, SpiritPaginationLinkProps<'a'>>(
  _PaginationLink,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkProps<ElementType>>;

PaginationLink.spiritComponent = 'PaginationLink';
PaginationLink.displayName = 'PaginationLink';

export default PaginationLink;
