'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import SectionBackground from './SectionBackground';
import SectionCustomPadding from './SectionCustomPadding';
import SectionDefault from './SectionDefault';
import SectionSizes from './SectionSizes';
import SectionTextAlignment from './SectionTextAlignment';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default" stackAlignment="stretch" container="heading-only">
      <SectionDefault />
    </DocsSection>
    <DocsSection title="Predefined Sizes" stackAlignment="stretch" container="heading-only">
      <SectionSizes />
    </DocsSection>
    <DocsSection title="Custom Padding" stackAlignment="stretch" container="heading-only">
      <SectionCustomPadding />
    </DocsSection>
    <DocsSection title="Background" stackAlignment="stretch" container="heading-only">
      <SectionBackground />
    </DocsSection>
    <DocsSection title="Text Alignment" stackAlignment="stretch" container="heading-only">
      <SectionTextAlignment />
    </DocsSection>
  </StrictMode>
);
