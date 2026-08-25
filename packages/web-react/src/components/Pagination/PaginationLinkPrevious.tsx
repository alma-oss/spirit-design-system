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

const _PaginationLinkPrevious = <E extends ElementType = 'a'>(
  { accessibilityLabel, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { t } = useI18n();

  return (
    <PaginationLink {...restProps} ref={ref}>
      <Icon name="chevron-left" />
      <VisuallyHidden>{accessibilityLabel ?? t('pagination.previous')}</VisuallyHidden>
    </PaginationLink>
  );
};

const PaginationLinkPrevious = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps<'a'>>(
  _PaginationLinkPrevious,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkPreviousNextProps<ElementType>>;

PaginationLinkPrevious.spiritComponent = 'PaginationLinkPrevious';
PaginationLinkPrevious.displayName = 'PaginationLinkPrevious';

export default PaginationLinkPrevious;
