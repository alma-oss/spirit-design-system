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

const _PaginationLinkPrevious = <E extends ElementType = 'a'>(
  { accessibilityLabel, strings, ...restProps }: SpiritPaginationLinkPreviousNextProps<E>,
  ref: PolymorphicRef<E>,
) => {
  const { t } = useI18n();
  const label = resolveComponentString(
    strings?.ariaLabel?.previous ?? accessibilityLabel ?? { key: 'pagination.previous' },
    t,
  );

  useDeprecationMessage({
    method: 'custom',
    trigger: accessibilityLabel != null,
    componentName: 'PaginationLinkPrevious',
    customText:
      'The "accessibilityLabel" property is deprecated and will be removed in the next major version. Use "strings.ariaLabel.previous" instead.',
  });

  return (
    <PaginationLink {...restProps} ref={ref}>
      <Icon name="chevron-left" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </PaginationLink>
  );
};

const PaginationLinkPrevious = forwardRef<HTMLAnchorElement, SpiritPaginationLinkPreviousNextProps<'a'>>(
  _PaginationLinkPrevious,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkPreviousNextProps<ElementType>>;

PaginationLinkPrevious.spiritComponent = 'PaginationLinkPrevious';
PaginationLinkPrevious.displayName = 'PaginationLinkPrevious';

export default PaginationLinkPrevious;
