import React from 'react';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

const PaginationCurrentLast = () => (
  <Pagination>
    <PaginationItem>
      <PaginationLinkPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={109}
        strings={{
          pageAria: 'Go to Page 109',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={110}
        strings={{
          pageAria: 'Go to Page 110',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={111}
        strings={{
          pageAria: 'Go to Page 111',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        pageNumber={112}
        strings={{
          pageAria: 'Go to Page 112',
        }}
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        isCurrent
        pageNumber={113}
        strings={{
          pageAria: 'Current Page, Page 113',
        }}
      />
    </PaginationItem>
  </Pagination>
);

export default PaginationCurrentLast;
