import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import ProductLogoDefault from './ProductLogoDefault';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default">
      <ProductLogoDefault />
    </DocsSection>
  </StrictMode>,
);
