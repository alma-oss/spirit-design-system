import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import SkipLinkDefault from './SkipLinkDefault';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <SkipLinkDefault />
    </DocsSection>
  </StrictMode>,
);
