import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import TabsDefault from './TabsDefault';
import TabsWithCustomSpacing from './TabsWithCustomSpacing';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <TabsDefault />
    </DocsSection>
    <DocsSection title="Custom Spacing" stackAlignment="stretch">
      <TabsWithCustomSpacing />
    </DocsSection>
  </StrictMode>,
);
