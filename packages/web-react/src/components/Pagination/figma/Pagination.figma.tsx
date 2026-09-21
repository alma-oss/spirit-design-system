import figma from '@figma/code-connect';
import React from 'react';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkNext from '../PaginationLinkNext';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

figma.connect(Pagination, '<FIGMA_FILE_ID>?node-id=6630%3A6855', {
  props: {},
  variant: { 'State Example': 'First' },
  example: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={1}
          strings={{
            ariaLabel: 'Current Page, Page 1',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={2}
          strings={{
            ariaLabel: 'Go to Page 2',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={3}
          strings={{
            ariaLabel: 'Go to Page 3',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
            ariaLabel: 'Go to Page 4',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
            ariaLabel: 'Go to Page 5',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
});

figma.connect(Pagination, '<FIGMA_FILE_ID>?node-id=6630%3A6855', {
  props: {},
  variant: { 'State Example': 'Second' },
  example: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={2}
          strings={{
            ariaLabel: 'Current Page, Page 2',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={3}
          strings={{
            ariaLabel: 'Go to Page 3',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
            ariaLabel: 'Go to Page 4',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
            ariaLabel: 'Go to Page 5',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
});

figma.connect(Pagination, '<FIGMA_FILE_ID>?node-id=6630%3A6855', {
  props: {},
  variant: { 'State Example': 'Third' },
  example: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={1}
          strings={{
            ariaLabel: 'Go to Page 1',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={2}
          strings={{
            ariaLabel: 'Go to Page 2',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={3}
          strings={{
            ariaLabel: 'Current Page, Page 3',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
            ariaLabel: 'Go to Page 4',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
            ariaLabel: 'Go to Page 5',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
});

figma.connect(Pagination, '<FIGMA_FILE_ID>?node-id=6630%3A6855', {
  props: {},
  variant: { 'State Example': 'Middle' },
  example: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
            ariaLabel: 'Go to Page 5',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={6}
          strings={{
            ariaLabel: 'Go to Page 6',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={7}
          strings={{
            ariaLabel: 'Current Page, Page 7',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={8}
          strings={{
            ariaLabel: 'Go to Page 8',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={9}
          strings={{
            ariaLabel: 'Go to Page 9',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>
  ),
});

figma.connect(Pagination, '<FIGMA_FILE_ID>?node-id=6630%3A6855', {
  props: {},
  variant: { 'State Example': 'Last' },
  example: () => (
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={98}
          strings={{
            ariaLabel: 'Go to Page 98',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={99}
          strings={{
            ariaLabel: 'Go to Page 99',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={100}
          strings={{
            ariaLabel: 'Go to Page 100',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={101}
          strings={{
            ariaLabel: 'Go to Page 101',
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={102}
          strings={{
            ariaLabel: 'Current Page, Page 102',
          }}
        />
      </PaginationItem>
    </Pagination>
  ),
});
