import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import DividerDefault from './DividerDefault';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <DividerDefault />
    </DocsSection>
  </StrictMode>,
);
