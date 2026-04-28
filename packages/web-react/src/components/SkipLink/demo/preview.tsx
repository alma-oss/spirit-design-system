'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import SkipLinkDefault from './SkipLinkDefault';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <SkipLinkDefault />
    </DocsSection>
  </StrictMode>
);
