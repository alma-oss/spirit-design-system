'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { useStyleProps } from '../../hooks';
import { type ClickEvent, type PolymorphicRef, type SpiritPaginationLinkProps } from '../../types';
import { handleLinkClick, mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { PAGINATION_LINK_DEFAULT_ACCESSIBILITY_LABEL_PREFIX } from './constants';
import { usePaginationStyleProps } from './usePaginationStyleProps';

/* We need an exception for components exported with forwardRef */
/* eslint no-underscore-dangle: ['error', { allow: ['_PaginationLink'] }] */
const _PaginationLink = <E extends ElementType = 'a'>(props: SpiritPaginationLinkProps<E>, ref: PolymorphicRef<E>) => {
  const {
    elementType: ElementTag = 'a',
    accessibilityLabel,
    isCurrent,
    pageNumber,
    routerOptions,
    ...restProps
  } = props;
  const visuallyHiddenLabel =
    accessibilityLabel || `${PAGINATION_LINK_DEFAULT_ACCESSIBILITY_LABEL_PREFIX} ${pageNumber}`;
  const { href, target, onClick } = restProps;
  const router = useRouter();

  const { classProps } = usePaginationStyleProps({ isCurrent });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(ElementTag, { classProps: classProps.link, styleProps, otherProps });

  const handleClick = handleLinkClick({
    router,
    href,
    target,
    routerOptions,
    onClick: onClick as ((event: ClickEvent) => void) | undefined,
  });

  return (
    <ElementTag {...(isCurrent && { 'aria-current': 'page' })} {...otherProps} {...mergedStyleProps} href={href} onClick={handleClick} ref={ref}>
      <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
      <span aria-hidden="true">{pageNumber}</span>
    </ElementTag>
  );
};

const PaginationLink = forwardRef<HTMLAnchorElement, SpiritPaginationLinkProps<ElementType>>(_PaginationLink);

PaginationLink.spiritComponent = 'PaginationLink';

export default PaginationLink;
