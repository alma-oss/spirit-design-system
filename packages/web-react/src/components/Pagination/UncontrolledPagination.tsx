'use client';

import React from 'react';
import { useDeprecationMessage, useI18n } from '../../hooks';
import { resolveComponentString } from '../../translations';
import { type ClickEvent, type SpiritUncontrolledPaginationProps } from '../../types';
import Pagination from './Pagination';
import PaginationItem from './PaginationItem';
import PaginationLink from './PaginationLink';
import PaginationLinkNext from './PaginationLinkNext';
import PaginationLinkPrevious from './PaginationLinkPrevious';
import { usePagination } from './usePagination';

const UncontrolledPagination = (props: SpiritUncontrolledPaginationProps): JSX.Element => {
  const { t } = useI18n();
  const {
    accessibilityLabel,
    accessibilityLabelPrevious,
    accessibilityLabelNext,
    defaultPage = 1,
    onChange,
    strings,
    totalPages = 0,
    visiblePages = 5,
    ...rest
  } = props;
  const resolvedAccessibilityLabel = resolveComponentString(
    strings?.ariaLabel ?? accessibilityLabel ?? { key: 'pagination.goToPage' },
    t,
  );
  const { currentPage, pages, handlePageChange } = usePagination({
    defaultPage,
    onChange,
    totalPages,
    visiblePages,
  });

  useDeprecationMessage({
    method: 'custom',
    trigger: accessibilityLabel != null || accessibilityLabelPrevious != null || accessibilityLabelNext != null,
    componentName: 'UncontrolledPagination',
    customText:
      'The "accessibilityLabel", "accessibilityLabelPrevious", and "accessibilityLabelNext" properties are deprecated and will be removed in the next major version. Use the corresponding keys in "strings" instead.',
  });

  return (
    <Pagination {...rest}>
      {currentPage !== 1 && (
        <PaginationLinkPrevious
          strings={{ ariaLabelPrevious: strings?.ariaLabelPrevious ?? accessibilityLabelPrevious }}
          onClick={(event: ClickEvent) => {
            event.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        />
      )}
      {pages?.map((pageNumber: number) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            strings={{ ariaLabel: `${resolvedAccessibilityLabel} ${pageNumber}` }}
            href="#"
            isCurrent={currentPage === pageNumber}
            pageNumber={pageNumber}
            onClick={(event: ClickEvent) => {
              event.preventDefault();
              handlePageChange(pageNumber);
            }}
          />
        </PaginationItem>
      ))}
      {currentPage !== totalPages && (
        <PaginationLinkNext
          strings={{ ariaLabelNext: strings?.ariaLabelNext ?? accessibilityLabelNext }}
          onClick={(event: ClickEvent) => {
            event.preventDefault();
            handlePageChange(currentPage + 1);
          }}
        />
      )}
    </Pagination>
  );
};

UncontrolledPagination.spiritComponent = 'UncontrolledPagination';

export default UncontrolledPagination;
