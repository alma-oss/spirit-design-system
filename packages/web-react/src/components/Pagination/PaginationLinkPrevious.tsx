'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { type SpiritPaginationLinkPreviousNextProps } from '../../types';
import { PAGINATION_PREVIOUS_LINK_DEFAULT_ACCESSIBILITY_LABEL } from './constants';
import PaginationButtonLink from './PaginationButtonLink';

const _PaginationLinkPrevious = <E extends ElementType = 'a'>(
  {
    accessibilityLabel = PAGINATION_PREVIOUS_LINK_DEFAULT_ACCESSIBILITY_LABEL,
    ...restProps
  }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => <PaginationButtonLink direction="previous" accessibilityLabel={accessibilityLabel} {...restProps} ref={ref} />;

const PaginationLinkPrevious = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps>(
  _PaginationLinkPrevious,
);

PaginationLinkPrevious.spiritComponent = 'PaginationLinkPrevious';

export default PaginationLinkPrevious;
