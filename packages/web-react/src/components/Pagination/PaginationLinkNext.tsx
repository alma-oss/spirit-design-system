'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { type SpiritPaginationLinkPreviousNextProps } from '../../types';
import { PAGINATION_NEXT_LINK_DEFAULT_ACCESSIBILITY_LABEL } from './constants';
import PaginationButtonLink from './PaginationButtonLink';

const _PaginationLinkNext = <E extends ElementType = 'a'>(
  {
    accessibilityLabel = PAGINATION_NEXT_LINK_DEFAULT_ACCESSIBILITY_LABEL,
    ...restProps
  }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => <PaginationButtonLink direction="next" accessibilityLabel={accessibilityLabel} {...restProps} ref={ref} />;

const PaginationLinkNext = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps>(_PaginationLinkNext);

PaginationLinkNext.spiritComponent = 'PaginationLinkNext';

export default PaginationLinkNext;
