'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import DividerDefault from './DividerDefault';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <DividerDefault />
    </DocsSection>
  </StrictMode>
);
