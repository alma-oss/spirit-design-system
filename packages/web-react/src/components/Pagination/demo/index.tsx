// Because there is no `dist` directory during the CI run
/* eslint-disable import/extensions, import/no-unresolved */

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import PaginationCurrentFirst from './PaginationCurrentFirst';
import PaginationCurrentFirstCentered from './PaginationCurrentFirstCentered';
import PaginationCurrentLast from './PaginationCurrentLast';
import PaginationCurrentMiddle from './PaginationCurrentMiddle';

createRoot(document.getElementById('root') as HTMLElement).render(
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
    </IconsProvider>
  </StrictMode>,
);
