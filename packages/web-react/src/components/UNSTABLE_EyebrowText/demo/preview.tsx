'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import EyebrowTextAlignment from './EyebrowTextAlignment';
import EyebrowTextBalanced from './EyebrowTextBalanced';
import EyebrowTextColors from './EyebrowTextColors';
import EyebrowTextDefault from './EyebrowTextDefault';
import EyebrowTextHyphens from './EyebrowTextHyphens';
import EyebrowTextWordBreak from './EyebrowTextWordBreak';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <EyebrowTextDefault />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <EyebrowTextAlignment />
    </DocsSection>
    <DocsSection title="Colors">
      <EyebrowTextColors />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <EyebrowTextBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <EyebrowTextWordBreak />
    </DocsSection>
    <DocsSection title="Text Hyphens" stackAlignment="stretch">
      <EyebrowTextHyphens />
    </DocsSection>
  </StrictMode>
);
