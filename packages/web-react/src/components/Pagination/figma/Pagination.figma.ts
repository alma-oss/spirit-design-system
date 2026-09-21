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
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={1}
          strings={{
pageAria: 'Current Page, Page 1',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={2}
          strings={{
pageAria: 'Go to Page 2',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={3}
          strings={{
pageAria: 'Go to Page 3',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
pageAria: 'Go to Page 4',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
pageAria: 'Go to Page 5',
}}
        />
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
        <PaginationLink
          href="#"
          pageNumber={1}
          strings={{
pageAria: 'Go to Page 1',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={2}
          strings={{
pageAria: 'Current Page, Page 2',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={3}
          strings={{
pageAria: 'Go to Page 3',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
pageAria: 'Go to Page 4',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
pageAria: 'Go to Page 5',
}}
        />
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
        <PaginationLink
          href="#"
          pageNumber={1}
          strings={{
pageAria: 'Go to Page 1',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={2}
          strings={{
pageAria: 'Go to Page 2',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={3}
          strings={{
pageAria: 'Current Page, Page 3',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={4}
          strings={{
pageAria: 'Go to Page 4',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={5}
          strings={{
pageAria: 'Go to Page 5',
}}
        />
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
        <PaginationLink
          href="#"
          pageNumber={6}
          strings={{
pageAria: 'Go to Page 6',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={7}
          strings={{
pageAria: 'Go to Page 7',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={8}
          strings={{
pageAria: 'Current Page, Page 8',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={9}
          strings={{
pageAria: 'Go to Page 9',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={10}
          strings={{
pageAria: 'Go to Page 10',
}}
        />
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
        <PaginationLink
          href="#"
          pageNumber={99}
          strings={{
pageAria: 'Go to Page 99',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={100}
          strings={{
pageAria: 'Go to Page 100',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={101}
          strings={{
pageAria: 'Go to Page 101',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          pageNumber={102}
          strings={{
pageAria: 'Go to Page 102',
}}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          isCurrent
          pageNumber={103}
          strings={{
pageAria: 'Current Page, Page 103',
}}
        />
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
