'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useDeprecationMessage, useI18n } from '../../hooks';
import { resolveComponentString } from '../../translations';
import {
  type PolymorphicComponent,
  type PolymorphicRef,
  type SpiritPaginationLinkPreviousNextProps,
} from '../../types';
import { Icon } from '../Icon';
import { VisuallyHidden } from '../VisuallyHidden';
import PaginationLink from './PaginationLink';

const _PaginationLinkNext = <E extends ElementType = 'a'>(
  { accessibilityLabel, strings, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { t } = useI18n();
  const label = resolveComponentString(strings?.ariaLabel?.next ?? accessibilityLabel ?? { key: 'pagination.next' }, t);

  useDeprecationMessage({
    method: 'custom',
    trigger: accessibilityLabel != null,
    componentName: 'PaginationLinkNext',
    customText:
      'The "accessibilityLabel" property is deprecated and will be removed in the next major version. Use "strings.ariaLabel.next" instead.',
  });

  return (
    <PaginationLink {...restProps} ref={ref}>
      <Icon name="chevron-right" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </PaginationLink>
  );
};

const PaginationLinkNext = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps<'a'>>(
  _PaginationLinkNext,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkPreviousNextProps<ElementType>>;

PaginationLinkNext.spiritComponent = 'PaginationLinkNext';
PaginationLinkNext.displayName = 'PaginationLinkNext';

export default PaginationLinkNext;
