'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import TabsDefault from './TabsDefault';
import TabsWithCustomSpacing from './TabsWithCustomSpacing';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <TabsDefault />
    </DocsSection>
    <DocsSection title="Custom Spacing" stackAlignment="stretch">
      <TabsWithCustomSpacing />
    </DocsSection>
  </StrictMode>
);
