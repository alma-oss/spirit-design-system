'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useI18n } from '../../hooks';
import { type SpiritPaginationLinkPreviousNextProps } from '../../types';
import PaginationButtonLink from './PaginationButtonLink';

const _PaginationLinkNext = <E extends ElementType = 'a'>(
  { accessibilityLabel, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const { t } = useI18n();
  const nextLabel = accessibilityLabel ?? t('pagination.next');

  return <PaginationButtonLink direction="next" accessibilityLabel={nextLabel} {...restProps} ref={ref} />;
};

const PaginationLinkNext = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps>(_PaginationLinkNext);

PaginationLinkNext.spiritComponent = 'PaginationLinkNext';

export default PaginationLinkNext;
