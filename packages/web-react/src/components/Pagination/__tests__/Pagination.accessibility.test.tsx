import React from 'react';
import { accessibilityDisabledTest, accessibilityTest } from '@local/tests';
import Pagination from '../Pagination';
import PaginationItem from '../PaginationItem';
import PaginationLink from '../PaginationLink';
import PaginationLinkNext from '../PaginationLinkNext';
import PaginationLinkPrevious from '../PaginationLinkPrevious';

jest.mock('../../../hooks/useIcon');

describe('Pagination accessibility', () => {
  accessibilityTest(
    (props) => (
      <Pagination {...props}>
        <PaginationItem>
          <PaginationLinkPrevious href="#" accessibilityLabel="Previous" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" pageNumber={1} accessibilityLabel="Go to Page 1" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" pageNumber={2} isCurrent accessibilityLabel="Current Page, Page 2" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" pageNumber={3} accessibilityLabel="Go to Page 3" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLinkNext href="#" accessibilityLabel="Next" />
        </PaginationItem>
      </Pagination>
    ),
    'nav',
  );

  describe('PaginationLink', () => {
    accessibilityTest(
      (props) => <PaginationLink href="#" pageNumber={1} accessibilityLabel="Go to Page 1" {...props} />,
      'a',
    );

    accessibilityDisabledTest(
      (props) => <PaginationLink href="#" pageNumber={1} accessibilityLabel="Go to Page 1" {...props} />,
      'a',
    );
  });

  describe('PaginationLinkPrevious', () => {
    accessibilityTest((props) => <PaginationLinkPrevious href="#" accessibilityLabel="Previous" {...props} />, 'a');

    accessibilityDisabledTest(
      (props) => <PaginationLinkPrevious href="#" accessibilityLabel="Previous" {...props} />,
      'a',
    );
  });

  describe('PaginationLinkNext', () => {
    accessibilityTest((props) => <PaginationLinkNext href="#" accessibilityLabel="Next" {...props} />, 'a');

    accessibilityDisabledTest((props) => <PaginationLinkNext href="#" accessibilityLabel="Next" {...props} />, 'a');
  });
});
