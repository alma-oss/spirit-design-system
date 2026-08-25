'use client';

import React, { type ElementType, forwardRef } from 'react';
import { useClick, useI18n, useLinkClick, useStyleProps } from '../../hooks';
import { type PolymorphicComponent, type PolymorphicRef, type SpiritPaginationLinkProps } from '../../types';
import { mergeStyleProps } from '../../utils';
import { VisuallyHidden } from '../VisuallyHidden';
import { usePaginationStyleProps } from './usePaginationStyleProps';

const _PaginationLink = <E extends ElementType = 'a'>(props: SpiritPaginationLinkProps<E>, ref: PolymorphicRef<E>) => {
  const { t } = useI18n();
  const {
    elementType = 'a',
    accessibilityLabel,
    children,
    isCurrent,
    isDisabled,
    pageNumber,
    routerOptions,
    onClick,
    ...restProps
  } = props;
  const isButtonElement = elementType === 'button';
  const visuallyHiddenLabel = accessibilityLabel || `${t('pagination.goToPage')} ${pageNumber}`;

  const Component = elementType as ElementType;

  const { classProps } = usePaginationStyleProps({ isCurrent, isDisabled });
  const { styleProps, props: otherProps } = useStyleProps(restProps);
  const mergedStyleProps = mergeStyleProps(Component, { classProps: classProps.link, styleProps, otherProps });

  const handleDisabledClick = useClick(isDisabled, onClick);
  const handleClick = useLinkClick({ ...restProps, routerOptions, isDisabled, onClick: handleDisabledClick });
  const hasHref = 'href' in restProps && restProps.href != null;

  return (
    <Component
      {...(isCurrent && { 'aria-current': 'page' })}
      {...(elementType === 'a' && !hasHref && { role: 'button' })}
      {...otherProps}
      {...mergedStyleProps}
      {...(isDisabled && isButtonElement && { disabled: true })}
      {...(isDisabled && !isButtonElement && { 'aria-disabled': true })}
      onClick={handleClick}
      ref={ref}
    >
      {children ?? (
        <>
          <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
          <span aria-hidden="true">{pageNumber}</span>
        </>
      )}
    </Component>
  );
};

const PaginationLink = forwardRef<HTMLAnchorElement, SpiritPaginationLinkProps<'a'>>(
  _PaginationLink,
) as unknown as PolymorphicComponent<'a', SpiritPaginationLinkProps<ElementType>>;

PaginationLink.spiritComponent = 'PaginationLink';
PaginationLink.displayName = 'PaginationLink';

export default PaginationLink;
