'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import LinkColors from './LinkColors';
import LinkDefault from './LinkDefault';
import LinkDisabled from './LinkDisabled';
import LinkUnderlined from './LinkUnderlined';
import LinkVisited from './LinkVisited';
import LinkVisitedDisabled from './LinkVisitedDisabled';

export const Preview = () => (
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
  </StrictMode>
);
