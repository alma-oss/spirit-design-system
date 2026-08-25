import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  Pagination,
  PaginationButtonLink,
  PaginationItem,
  PaginationLink,
  PaginationLinkNext,
  PaginationLinkPrevious,
  type PaginationButtonLinkProps,
  type SpiritPaginationButtonLinkProps,
} from '@alma-oss/spirit-web-react';

const leftProps: PaginationButtonLinkProps = {
  direction: 'previous',
  href: '/page-1',
};

const nextProps: PaginationButtonLinkProps = {
  direction: 'next',
  href: '/page-2',
};

export const Example = (props: SpiritPaginationButtonLinkProps) => (
  <Pagination>
    <PaginationItem>
      <PaginationButtonLink direction="previous" href="/page-1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkPrevious href="/page-1" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink direction="next" href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationButtonLink color="secondary" size="small" isSymmetrical direction="next" href="/page-2" />
    </PaginationItem>
    <PaginationItem>
      <PaginationButtonLink {...leftProps} />
    </PaginationItem>
    <PaginationItem>
      <PaginationButtonLink {...nextProps} {...props} />
    </PaginationItem>
  </Pagination>
);
