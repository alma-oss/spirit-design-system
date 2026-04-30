'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import HiddenDefault from './HiddenDefault';
import HiddenFrom from './HiddenFrom';
import HiddenOn from './HiddenOn';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <HiddenDefault />
    </DocsSection>

    <DocsSection title="Hidden on Specific Breakpoints">
      <HiddenOn />
    </DocsSection>

    <DocsSection title="Hidden from Breakpoint Onwards">
      <HiddenFrom />
    </DocsSection>
  </StrictMode>
);
