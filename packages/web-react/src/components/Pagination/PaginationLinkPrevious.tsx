'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useI18n } from '../../hooks';
import { type ForwardRefComponent, type SpiritPaginationLinkPreviousNextProps } from '../../types';
import PaginationButtonLink from './PaginationButtonLink';

const _PaginationLinkPrevious = <E extends ElementType = 'a'>(
  { accessibilityLabel, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const { t } = useI18n();
  const previousLabel = accessibilityLabel ?? t('pagination.previous');

  return <PaginationButtonLink direction="previous" accessibilityLabel={previousLabel} {...restProps} ref={ref} />;
};

const PaginationLinkPrevious = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps>(
  _PaginationLinkPrevious,
) as ForwardRefComponent<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps>;

PaginationLinkPrevious.spiritComponent = 'PaginationLinkPrevious';
PaginationLinkPrevious.displayName = 'PaginationLinkPrevious';

export default PaginationLinkPrevious;
