import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import ContainerAlignment from './ContainerAlignment';
import ContainerBlockFormattingContext from './ContainerBlockFormattingContext';
import ContainerDefault from './ContainerDefault';
import ContainerFluid from './ContainerFluid';
import ContainerSizes from './ContainerSizes';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch" container="heading-only">
      <ContainerDefault />
    </DocsSection>
    <DocsSection title="Fluid" stackAlignment="stretch" container="heading-only">
      <ContainerFluid />
    </DocsSection>
    <ContainerSizes />
    <DocsSection title="Text Alignment" stackAlignment="stretch" container="heading-only">
      <ContainerAlignment />
    </DocsSection>
    <DocsSection title="Feature Flag: Block Formatting Context" stackAlignment="stretch" container="heading-only">
      <ContainerBlockFormattingContext />
    </DocsSection>
  </StrictMode>,
);
