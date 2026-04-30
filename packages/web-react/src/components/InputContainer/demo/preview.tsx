'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import InputContainerDefault from './InputContainerDefault';
import InputContainerDisabled from './InputContainerDisabled';
import InputContainerInputSize from './InputContainerInputSize';
import InputContainerSizes from './InputContainerSizes';
import InputContainerValidation from './InputContainerValidation';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <InputContainerDefault />
    </DocsSection>
    <DocsSection title="Sizes">
      <InputContainerSizes />
    </DocsSection>
    <DocsSection title="Disabled">
      <InputContainerDisabled />
    </DocsSection>
    <DocsSection title="Validation State with Validation Text">
      <InputContainerValidation />
    </DocsSection>
    <DocsSection title="Input Size">
      <InputContainerInputSize />
    </DocsSection>
  </StrictMode>
);
