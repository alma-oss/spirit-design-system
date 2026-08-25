import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { PaginationLinkNext } from '@org/design-system';
import { PaginationButtonLink as OtherPaginationButtonLink } from '@other/design-system';

export const Example = () => (
  <>
    <PaginationLinkNext href="/page-2" />
    <OtherPaginationButtonLink direction="previous" href="/page-1" />
  </>
);
