'use client';

import React, { StrictMode } from 'react';
import DocsSection from '../../../../docs/DocsSection';
import HeadingAlignment from './HeadingAlignment';
import HeadingBalanced from './HeadingBalanced';
import HeadingDefault from './HeadingDefault';
import HeadingEmphasis from './HeadingEmphasis';
import HeadingHyphens from './HeadingHyphens';
import HeadingSizes from './HeadingSizes';
import HeadingTextColor from './HeadingTextColor';
import HeadingWordBreak from './HeadingWordBreak';

export const Preview = () => (
  <StrictMode>
    <DocsSection title="Default">
      <HeadingDefault />
    </DocsSection>
    <DocsSection title="Sizes">
      <HeadingSizes />
    </DocsSection>
    <DocsSection title="Emphasis">
      <HeadingEmphasis />
    </DocsSection>
    <DocsSection title="Colors">
      <HeadingTextColor />
    </DocsSection>
    <DocsSection title="Alignment" stackAlignment="stretch">
      <HeadingAlignment />
    </DocsSection>
    <DocsSection title="Balanced Wrapping" stackAlignment="stretch">
      <HeadingBalanced />
    </DocsSection>
    <DocsSection title="Word Break" stackAlignment="stretch">
      <HeadingWordBreak />
    </DocsSection>
    <DocsSection title="Text Hyphens" stackAlignment="stretch">
      <HeadingHyphens />
    </DocsSection>
  </StrictMode>
);
