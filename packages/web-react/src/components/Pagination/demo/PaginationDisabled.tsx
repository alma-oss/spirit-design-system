import React from 'react';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkNext from '../PaginationLinkNext';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

const PaginationDisabled = () => (
  <Pagination>
    <PaginationItem>
      <PaginationLinkPrevious href="#" isDisabled />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isDisabled accessibilityLabel="Go to Page 11" pageNumber={11} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 12" pageNumber={12} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" accessibilityLabel="Go to Page 13" pageNumber={13} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="#" isDisabled />
    </PaginationItem>
  </Pagination>
);

export default PaginationDisabled;
