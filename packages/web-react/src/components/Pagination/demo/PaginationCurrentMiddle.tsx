import React from 'react';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkNext from '../PaginationLinkNext';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

const PaginationCurrentMiddle = () => (
  <Pagination>
    <PaginationItem>
      <PaginationLinkPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={11}
        strings={{
          ariaLabel: 'Go to Page 11',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={12}
        strings={{
          ariaLabel: 'Go to Page 12',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        isCurrent
        pageNumber={13}
        strings={{
          ariaLabel: 'Current Page, Page 13',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={14}
        strings={{
          ariaLabel: 'Go to Page 14',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={15}
        strings={{
          ariaLabel: 'Go to Page 15',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="#" />
    </PaginationItem>
  </Pagination>
);

export default PaginationCurrentMiddle;
