'use client';

import React from 'react';
import { useDeprecationMessage, useStringsProp } from '../../hooks';
import { type ClickEvent, type SpiritUncontrolledPaginationProps } from '../../types';
import Pagination from './Pagination';
import PaginationItem from './PaginationItem';
import PaginationLink from './PaginationLink';
import PaginationLinkNext from './PaginationLinkNext';
import PaginationLinkPrevious from './PaginationLinkPrevious';
import { usePagination } from './usePagination';

const UncontrolledPagination = (props: SpiritUncontrolledPaginationProps): JSX.Element => {
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
  const { page: resolvedAccessibilityLabel } = useStringsProp({
    page: { value: strings?.pageAria, deprecated: accessibilityLabel, key: 'pagination.pageAria' },
  });
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
          strings={{ previousAria: strings?.previousAria ?? accessibilityLabelPrevious }}
          onClick={(event: ClickEvent) => {
            event.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        />
      )}
      {pages?.map((pageNumber: number) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            strings={{ pageAria: `${resolvedAccessibilityLabel} ${pageNumber}` }}
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
          strings={{ nextAria: strings?.nextAria ?? accessibilityLabelNext }}
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
