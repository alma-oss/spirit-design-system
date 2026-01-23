import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import DocsSection from '../../../../docs/DocsSection';
import LinkColors from './LinkColors';
import LinkDefault from './LinkDefault';
import LinkDisabled from './LinkDisabled';
import LinkUnderlined from './LinkUnderlined';
import LinkVisited from './LinkVisited';
import LinkVisitedDisabled from './LinkVisitedDisabled';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <DocsSection title="Default">
      <LinkDefault />
    </DocsSection>
    <DocsSection title="Colors">
      <LinkColors />
    </DocsSection>
    <DocsSection title="Disabled">
      <LinkDisabled />
    </DocsSection>
    <DocsSection title="Underlined">
      <LinkUnderlined />
    </DocsSection>
    <DocsSection title="Visited">
      <LinkVisited />
    </DocsSection>
    <DocsSection title="Visited Disabled">
      <LinkVisitedDisabled />
    </DocsSection>
  </StrictMode>,
);
