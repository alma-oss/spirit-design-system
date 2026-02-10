'use client';

import React, { type ElementType, type ForwardedRef, forwardRef } from 'react';
import { useRouter } from '../../context/RouterContext';
import { type ClickEvent, type SpiritPaginationButtonLinkProps } from '../../types';
import { handleLinkClick } from '../../utils';
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
    routerOptions,
    ...restProps
  } = props as unknown as SpiritPaginationButtonLinkProps;
  const { href, target, isDisabled, onClick } = restProps;
  const router = useRouter();

  const iconType = {
    previous: 'chevron-left',
    next: 'chevron-right',
  };

  const handleClick = handleLinkClick({
    router,
    href,
    isDisabled,
    target,
    routerOptions,
    onClick: onClick as ((event: ClickEvent) => void) | undefined,
  });

  return (
    <ButtonLink color="secondary" isSymmetrical {...restProps} href={href} onClick={handleClick} ref={ref}>
      <Icon name={iconType[direction]} />
      <VisuallyHidden>{accessibilityLabel}</VisuallyHidden>
    </ButtonLink>
  );
};

const PaginationButtonLink = forwardRef<HTMLAnchorElement, SpiritPaginationButtonLinkProps>(_PaginationButtonLink);

PaginationButtonLink.spiritComponent = 'PaginationButtonLink';

export default PaginationButtonLink;
