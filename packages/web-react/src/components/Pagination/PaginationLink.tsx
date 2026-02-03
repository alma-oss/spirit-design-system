'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useStyleProps } from '../../hooks';
import { type PolymorphicRef, type SpiritPaginationLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { PAGINATION_LINK_DEFAULT_ACCESSIBILITY_LABEL_PREFIX } from './constants';
import { usePaginationStyleProps } from './usePaginationStyleProps';

const _PaginationLink = <E extends ElementType = 'a'>(props: SpiritPaginationLinkProps<E>, ref: PolymorphicRef<E>) => {
  const { elementType: ElementTag = 'a', accessibilityLabel, isCurrent, pageNumber, ...restProps } = props;
  const visuallyHiddenLabel =
    accessibilityLabel || `${PAGINATION_LINK_DEFAULT_ACCESSIBILITY_LABEL_PREFIX} ${pageNumber}`;

  const { classProps } = usePaginationStyleProps({ isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.link, styleProps, otherProps });

  return (
    <ElementTag {...(isCurrent && { 'aria-current': 'page' })} {...otherProps} {...mergedStyleProps} ref={ref}>
      <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
      <span aria-hidden="true">{pageNumber}</span>
    </ElementTag>
  );
};

const PaginationLink = forwardRef<HTMLAnchorElement, SpiritPaginationLinkProps<ElementType>>(_PaginationLink);

PaginationLink.spiritComponent = 'PaginationLink';

export default PaginationLink;
