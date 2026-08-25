'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useI18n } from '../../hooks';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritPaginationLinkPreviousNextProps,
} from '../../types';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import PaginationLink from './PaginationLink';

const _PaginationLinkNext = <E extends ElementType = 'a'>(
  { accessibilityLabel, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { t } = useI18n();

  return (
    <PaginationLink {...restProps} ref={ref}>
      <Icon name="chevron-right" />
      <VisuallyHidden>{accessibilityLabel ?? t('pagination.next')}</VisuallyHidden>
    </PaginationLink>
  );
};

const PaginationLinkNext = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps<'a'>>(
  _PaginationLinkNext,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkPreviousNextProps<ElementType>>;

PaginationLinkNext.spiritComponent = 'PaginationLinkNext';
PaginationLinkNext.displayName = 'PaginationLinkNext';

export default PaginationLinkNext;
