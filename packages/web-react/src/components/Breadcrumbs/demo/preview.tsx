'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import BreadcrumbsCurrentWithoutLink from './BreadcrumbsCurrentWithoutLink';
import BreadcrumbsCustom from './BreadcrumbsCustom';
import BreadcrumbsDefault from './BreadcrumbsDefault';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Default">
        <BreadcrumbsDefault />
      </DocsSection>
      <DocsSection title="Custom">
        <BreadcrumbsCustom />
      </DocsSection>
      <DocsSection title="Current page is not a link">
        <BreadcrumbsCurrentWithoutLink />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
