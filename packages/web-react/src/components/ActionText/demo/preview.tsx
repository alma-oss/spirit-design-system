'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import ActionTextAlignment from './ActionTextAlignment';
import ActionTextBalanced from './ActionTextBalanced';
import ActionTextColors from './ActionTextColors';
import ActionTextDefault from './ActionTextDefault';
import ActionTextHyphens from './ActionTextHyphens';
import ActionTextSizes from './ActionTextSizes';
import ActionTextWordBreak from './ActionTextWordBreak';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <ActionTextDefault />
    </DocsSection>
    <DocsSection title="Sizes">
      <ActionTextSizes />
    </DocsSection>
    <DocsSection title="Colors">
      <ActionTextColors />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <ActionTextAlignment />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <ActionTextBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <ActionTextWordBreak />
    </DocsSection>
    <DocsSection title="Hyphens" stackAlignment="stretch">
      <ActionTextHyphens />
    </DocsSection>
  </StrictMode>
);
