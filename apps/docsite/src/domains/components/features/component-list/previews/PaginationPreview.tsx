'use client';

import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationLinkNext,
  PaginationLinkPrevious,
} from '@alma-oss/spirit-web-react';
import React from 'react';

const PaginationPreview = () => (
  <Pagination aria-label="Page navigation">
    <PaginationItem>
      <PaginationLinkPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isCurrent pageNumber={1} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" pageNumber={2} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" pageNumber={3} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="#" />
    </PaginationItem>
  </Pagination>
);

export default PaginationPreview;
