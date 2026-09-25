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
      <PaginationLink
        href="#"
        isDisabled
        pageNumber={11}
        strings={{
          ariaLabel: { page: 'Go to Page 11' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        isCurrent
        pageNumber={12}
        strings={{
          ariaLabel: { page: 'Current Page, Page 12' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={13}
        strings={{
          ariaLabel: { page: 'Go to Page 13' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="#" isDisabled />
    </PaginationItem>
  </Pagination>
);

export default PaginationDisabled;
