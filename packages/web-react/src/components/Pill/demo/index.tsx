import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import PillColors from './PillColors';
import PillLongText from './PillLongText';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Colors">
      <PillColors />
    </DocsSection>
    <DocsSection title="Long Text">
      <PillLongText />
    </DocsSection>
  </StrictMode>,
);
