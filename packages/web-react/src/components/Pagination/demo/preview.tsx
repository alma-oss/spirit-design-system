'use client';

import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import PaginationCurrentFirst from './PaginationCurrentFirst';
import PaginationCurrentFirstCentered from './PaginationCurrentFirstCentered';
import PaginationCurrentLast from './PaginationCurrentLast';
import PaginationCurrentMiddle from './PaginationCurrentMiddle';
import PaginationDisabled from './PaginationDisabled';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Pagination Current First">
        <PaginationCurrentFirst />
      </DocsSection>
      <DocsSection title="Pagination Current Middle">
        <PaginationCurrentMiddle />
      </DocsSection>
      <DocsSection title="Pagination Current Last">
        <PaginationCurrentLast />
      </DocsSection>
      <DocsSection title="Pagination Current First Centered" stackAlignment="stretch">
        <PaginationCurrentFirstCentered />
      </DocsSection>
      <DocsSection title="Pagination Disabled">
        <PaginationDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
