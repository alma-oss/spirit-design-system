'use client';

// @ts-ignore: No declaration file -- @see https://jira.almacareer.tech/browse/DS-561
import icons from '@alma-oss/spirit-icons/icons';
import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import { IconsProvider } from '../../../context';
import TruncateDefault from './TruncateDefault';

export const Preview = () => (
  <StrictMode>
    <IconsProvider value={icons}>
      <DocsSection title="Basic Usage" stackAlignment="stretch">
        <TruncateDefault />
      </DocsSection>
    </IconsProvider>
  </StrictMode>
);
