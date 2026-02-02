'use client';

import React from 'react';
import { useI18n } from '../../hooks';
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
    totalPages = 0,
    visiblePages = 5,
    ...rest
  } = props;
  const resolvedAccessibilityLabel = accessibilityLabel ?? t('pagination.goToPage');
  const resolvedAccessibilityLabelPrevious = accessibilityLabelPrevious ?? t('pagination.previous');
  const resolvedAccessibilityLabelNext = accessibilityLabelNext ?? t('pagination.next');
  const { currentPage, pages, handlePageChange } = usePagination({
    defaultPage,
    onChange,
    totalPages,
    visiblePages,
  });

  return (
    <Pagination {...rest}>
      {currentPage !== 1 && (
        <PaginationLinkPrevious
          accessibilityLabel={resolvedAccessibilityLabelPrevious}
          onClick={(event) => {
            event.preventDefault();
            handlePageChange(currentPage - 1);
          }}
        />
      )}
      {pages?.map((pageNumber: number) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            accessibilityLabel={`${resolvedAccessibilityLabel} ${pageNumber}`}
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
          accessibilityLabel={resolvedAccessibilityLabelNext}
          onClick={(event) => {
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
