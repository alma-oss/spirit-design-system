// url=<FIGMA_FILE_ID>?node-id=6630%3A6855
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Pagination/Pagination.tsx
// component=Pagination

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const stateExample = instance.getPropertyValue('State Example');

let example;
if (stateExample === 'First') {
  example = figma.code`
    <Pagination>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 1" pageNumber={1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 2" pageNumber={2} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 3" pageNumber={3} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 4" pageNumber={4} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 5" pageNumber={5} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>`;
} else if (stateExample === 'Second') {
  example = figma.code`
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 1" pageNumber={1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 2" pageNumber={2} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 3" pageNumber={3} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 4" pageNumber={4} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 5" pageNumber={5} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>`;
} else if (stateExample === 'Third') {
  example = figma.code`
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 1" pageNumber={1} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 2" pageNumber={2} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 3" pageNumber={3} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 4" pageNumber={4} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 5" pageNumber={5} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>`;
} else if (stateExample === 'Middle') {
  example = figma.code`
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 6" pageNumber={6} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 7" pageNumber={7} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 8" pageNumber={8} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 9" pageNumber={9} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 10" pageNumber={10} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLinkNext href="#" />
      </PaginationItem>
    </Pagination>`;
} else {
  // Last
  example = figma.code`
    <Pagination>
      <PaginationItem>
        <PaginationLinkPrevious href="#" />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 99" pageNumber={99} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 100" pageNumber={100} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 101" pageNumber={101} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" accessibilityLabel="Go to Page 102" pageNumber={102} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#" isCurrent accessibilityLabel="Current Page, Page 103" pageNumber={103} />
      </PaginationItem>
    </Pagination>`;
}

export default {
  id: 'Pagination',
  imports: [
    "import { Pagination, PaginationItem, PaginationLink, PaginationLinkNext, PaginationLinkPrevious } from '@alma-oss/spirit-web-react';",
  ],
  example,
};
