'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import CloseButtonDisabled from './CloseButtonDisabled';
import CloseButtonSizes from './CloseButtonSizes';
import CloseButtonSubtle from './CloseButtonSubtle';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Sizes" stackAlignment="start">
        <CloseButtonSizes />
      </DocsSection>
      <DocsSection title="Subtle" stackAlignment="start">
        <CloseButtonSubtle />
      </DocsSection>
      <DocsSection title="Disabled" stackAlignment="start">
        <CloseButtonDisabled />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
