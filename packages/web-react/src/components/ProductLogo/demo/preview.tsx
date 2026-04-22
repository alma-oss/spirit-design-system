'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import ProductLogoDefault from './ProductLogoDefault';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <ProductLogoDefault />
    </DocsSection>
  </StrictMode>
);
