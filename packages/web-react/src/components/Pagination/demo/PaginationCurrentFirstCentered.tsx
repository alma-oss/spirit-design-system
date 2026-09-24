import React from 'react';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkNext from '../PaginationLinkNext';

const PaginationCurrentFirstCentered = () => (
  <Pagination UNSAFE_className="text-center">
    <PaginationItem>
      <PaginationLink
        href="#"
        isCurrent
        pageNumber={1}
        strings={{
          ariaLabel: { page: 'Current Page, Page 1' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={2}
        strings={{
          ariaLabel: { page: 'Go to Page 2' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={3}
        strings={{
          ariaLabel: { page: 'Go to Page 3' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={4}
        strings={{
          ariaLabel: { page: 'Go to Page 4' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={5}
        strings={{
          ariaLabel: { page: 'Go to Page 5' },
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLinkNext href="#" />
    </PaginationItem>
  </Pagination>
);

export default PaginationCurrentFirstCentered;
