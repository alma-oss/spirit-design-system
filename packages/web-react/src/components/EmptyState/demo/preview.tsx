'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import EmptyStateDefault from './EmptyStateDefault';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <EmptyStateDefault />
    </DocsSection>
  </StrictMode>
);
