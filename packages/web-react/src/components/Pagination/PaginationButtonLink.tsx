'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { type SpiritPaginationButtonLinkProps } from '../../types';
import { ButtonLink } from '../Button';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  PAGINATION_NEXT_LINK_DEFAULT_ACCESSIBILITY_LABEL,
  PAGINATION_PREVIOUS_LINK_DEFAULT_ACCESSIBILITY_LABEL,
} from './constants';

const _PaginationButtonLink = <E extends ElementType = 'a'>(
  props: SpiritPaginationButtonLinkProps<E>,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    direction,
    accessibilityLabel = direction === 'previous'
      ? PAGINATION_PREVIOUS_LINK_DEFAULT_ACCESSIBILITY_LABEL
      : PAGINATION_NEXT_LINK_DEFAULT_ACCESSIBILITY_LABEL,
    ...restProps
  } = props as unknown as SpiritPaginationButtonLinkProps;

  const iconType = {
    previous: 'chevron-left',
    next: 'chevron-right',
  };

  return (
    <ButtonLink color="secondary" isSymmetrical {...restProps} ref={ref}>
      <Icon name={iconType[direction]} />
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
    </ButtonLink>
  );
};

const PaginationButtonLink = forwardRef<HTMLAnchorElement, SpiritPaginationButtonLinkProps>(_PaginationButtonLink);

PaginationButtonLink.spiritComponent = 'PaginationButtonLink';

export default PaginationButtonLink;
