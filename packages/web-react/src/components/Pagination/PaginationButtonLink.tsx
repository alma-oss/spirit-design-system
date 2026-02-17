'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useI18n } from '../../hooks';
import { type ForwardRefComponent, type SpiritPaginationButtonLinkProps } from '../../types';
import { ButtonLink } from '../Button';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';

const _PaginationButtonLink = <E extends ElementType = 'a'>(
  props: SpiritPaginationButtonLinkProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const { t } = useI18n();
  const { direction, accessibilityLabel, ...restProps } = props as unknown as SpiritPaginationButtonLinkProps;
  const directionLabel =
    accessibilityLabel ?? (direction === 'previous' ? t('pagination.previous') : t('pagination.next'));

  const iconType = {
    previous: 'chevron-left',
    next: 'chevron-right',
  };

  return (
    <ButtonLink color="secondary" isSymmetrical {...restProps} ref={ref}>
      <Icon name={iconType[direction]} />
      <VisuallyHidden>{directionLabel}</VisuallyHidden>
    </ButtonLink>
  );
};

const PaginationButtonLink = forwardRef<HTMLAnchorElement, SpiritPaginationButtonLinkProps>(
  _PaginationButtonLink,
) as ForwardRefComponent<HTMLAnchorElement, SpiritPaginationButtonLinkProps>;

PaginationButtonLink.spiritComponent = 'PaginationButtonLink';
PaginationButtonLink.displayName = 'PaginationButtonLink';

export default PaginationButtonLink;
