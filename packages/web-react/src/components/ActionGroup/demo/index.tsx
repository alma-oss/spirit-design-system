import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import ActionLayoutCentered from './ActionLayoutCentered';
import ActionLayoutDefault from './ActionLayoutDefault';
import ActionLayoutReversedOnRight from './ActionLayoutReversedOnRight';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch">
      <ActionLayoutDefault />
    </DocsSection>
    <DocsSection title="Centered" stackAlignment="stretch">
      <ActionLayoutCentered />
    </DocsSection>
    <DocsSection title="On Right Reversed" stackAlignment="stretch">
      <ActionLayoutReversedOnRight />
    </DocsSection>
  </StrictMode>,
);
