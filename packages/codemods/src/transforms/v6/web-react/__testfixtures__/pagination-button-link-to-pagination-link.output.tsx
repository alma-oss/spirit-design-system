import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  Pagination,
  PaginationItem,
  PaginationLinkNext,
  PaginationLinkPrevious,
  type PaginationLinkPreviousNextProps,
  type SpiritPaginationLinkPreviousNextProps,
} from '@alma-oss/spirit-web-react';

const leftProps: PaginationLinkPreviousNextProps = {
  href: '/page-1'
};

const nextProps: PaginationLinkPreviousNextProps = {
  href: '/page-2'
};

export const Example = (props: SpiritPaginationLinkPreviousNextProps) => (
  <Pagination>
    <PaginationItem>
      <PaginationLinkPrevious href="/page-1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkPrevious href="/page-1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkPrevious {...leftProps} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext {...nextProps} {...props} />
    </PaginationItem>
  </Pagination>
);
