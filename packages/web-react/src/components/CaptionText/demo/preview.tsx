'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import CaptionTextAlignment from './CaptionTextAlignment';
import CaptionTextBalanced from './CaptionTextBalanced';
import CaptionTextColors from './CaptionTextColors';
import CaptionTextDefault from './CaptionTextDefault';
import CaptionTextHyphens from './CaptionTextHyphens';
import CaptionTextWordBreak from './CaptionTextWordBreak';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <CaptionTextDefault />
    </DocsSection>
    <DocsSection title="Colors">
      <CaptionTextColors />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <CaptionTextAlignment />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <CaptionTextBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <CaptionTextWordBreak />
    </DocsSection>
    <DocsSection title="Hyphens" stackAlignment="stretch">
      <CaptionTextHyphens />
    </DocsSection>
  </StrictMode>
);
